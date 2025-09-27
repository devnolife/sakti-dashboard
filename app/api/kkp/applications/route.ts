import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const createKkpApplicationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  studentId: z.string(),
  companyId: z.string(),
  groupMembers: z.array(z.string()).optional(),
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
    const studentId = searchParams.get('studentId')
    const supervisorId = searchParams.get('supervisorId')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}

    // Role-based filtering
    if (token.role === 'mahasiswa') {
      // Students can only see their own applications
      const student = await prisma.student.findUnique({
        where: { userId: token.sub }
      })
      if (student) {
        where.studentId = student.id
      } else {
        return NextResponse.json({ data: [], pagination: { total: 0, page, limit, totalPages: 0 } })
      }
    } else if (token.role === 'dosen') {
      // Lecturers can see applications they supervise
      if (supervisorId) {
        where.supervisorId = supervisorId
      }
    }

    if (status) {
      where.status = status
    }

    if (studentId && hasPermission(token.role as string, 'read', 'applications')) {
      where.studentId = studentId
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { applicationNumber: { contains: search, mode: 'insensitive' } },
        { student: { user: { name: { contains: search, mode: 'insensitive' } } } }
      ]
    }

    const [applications, total] = await Promise.all([
      prisma.kkpApplication.findMany({
        where,
        skip,
        take: limit,
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            }
          },
          supervisor: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true
                }
              }
            }
          },
          company: true,
          documents: {
            select: {
              id: true,
              name: true,
              type: true,
              status: true,
              uploadDate: true
            }
          },
          approvals: {
            orderBy: { approvedAt: 'desc' }
          }
        },
        orderBy: { submissionDate: 'desc' }
      }),
      prisma.kkpApplication.count({ where })
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
    const lastApplication = await prisma.kkpApplication.findFirst({
      where: {
        applicationNumber: {
          startsWith: `KKP-${currentYear}`
        }
      },
      orderBy: { applicationNumber: 'desc' }
    })

    let nextNumber = 1
    if (lastApplication) {
      const lastNumber = parseInt(lastApplication.applicationNumber.split('-')[2])
      nextNumber = lastNumber + 1
    }

    const applicationNumber = `KKP-${currentYear}-${nextNumber.toString().padStart(3, '0')}`

    // Validate student and company exist
    const [student, company] = await Promise.all([
      prisma.student.findUnique({ where: { id: validatedData.studentId } }),
      prisma.company.findUnique({ where: { id: validatedData.companyId } })
    ])

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Create application with initial approval workflow
    const application = await prisma.kkpApplication.create({
      data: {
        ...validatedData,
        applicationNumber,
        startDate: new Date(validatedData.startDate),
        endDate: new Date(validatedData.endDate),
        groupMembers: validatedData.groupMembers || [],
        approvals: {
          create: [
            {
              approverRole: 'staff_tu',
              status: 'pending'
            }
          ]
        }
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        },
        company: true,
        approvals: true
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