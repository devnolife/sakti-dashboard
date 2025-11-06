import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const createKkpApplicationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  student_id: z.string(),
  company_id: z.string(),
  notes: z.string().optional()
})

// GET /api/kkp/applications
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const studentIdParam = searchParams.get('studentId')
    const supervisorIdParam = searchParams.get('supervisorId')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}

    // Role-based filtering
    if (token.role === 'mahasiswa') {
      // Students can only see their own applications
      const student = await prisma.students.findUnique({
        where: { user_id: token.sub }
      })
      if (student) {
        where.student_id = student.id
      } else {
        return NextResponse.json({ data: [], pagination: { total: 0, page, limit, totalPages: 0 } })
      }
    } else if (token.role === 'dosen') {
      // Lecturers can see applications they supervise
      if (supervisorIdParam) {
        where.supervisor_id = supervisorIdParam
      }
    }

    if (status) {
      where.status = status
    }

    if (studentIdParam && hasPermission(token.role as string, 'read', 'applications')) {
      where.student_id = studentIdParam
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { application_number: { contains: search, mode: 'insensitive' } },
        { students: { users: { name: { contains: search, mode: 'insensitive' } } } }
      ]
    }

    const [applications, total] = await Promise.all([
      prisma.kkp_applications.findMany({
        where,
        skip,
        take: limit,
        include: {
          students: {
            include: {
              users: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            }
          },
          lecturers: {
            include: {
              users: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            }
          },
          companies: true,
          kkp_documents: {
            select: {
              id: true,
              name: true,
              type: true,
              status: true,
              upload_date: true
            }
          },
          kkp_approvals: {
            orderBy: { approved_at: 'desc' }
          }
        },
        orderBy: { submission_date: 'desc' }
      }),
      prisma.kkp_applications.count({ where })
    ])

    return NextResponse.json({
      data: applications,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching KKP applications:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/kkp/applications
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check permission
    if (!hasPermission(token.role as string, 'create', 'applications')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createKkpApplicationSchema.parse(body)

    // Generate application number
    const currentYear = new Date().getFullYear()
    const lastApplication = await prisma.kkp_applications.findFirst({
      where: {
        application_number: {
          startsWith: `KKP-${currentYear}`
        }
      },
      orderBy: { application_number: 'desc' }
    })

    let nextNumber = 1
    if (lastApplication) {
      const lastNumber = parseInt(lastApplication.application_number.split('-')[2])
      nextNumber = lastNumber + 1
    }

    const application_number = `KKP-${currentYear}-${nextNumber.toString().padStart(3, '0')}`

    // Validate student and company exist
    const [student, company] = await Promise.all([
      prisma.students.findUnique({ where: { id: validatedData.student_id } }),
      prisma.companies.findUnique({ where: { id: validatedData.company_id } })
    ])

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Create application with initial approval workflow
    const application = await prisma.kkp_applications.create({
      data: {
        id: `kkp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: validatedData.title,
        description: validatedData.description,
        application_number,
        start_date: new Date(validatedData.start_date),
        end_date: new Date(validatedData.end_date),
        student_id: validatedData.student_id,
        company_id: validatedData.company_id,
        notes: validatedData.notes,
        updated_at: new Date()
      },
      include: {
        students: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        },
        companies: true,
        kkp_approvals: true
      }
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating KKP application:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}