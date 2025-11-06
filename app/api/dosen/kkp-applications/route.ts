import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'

// GET /api/dosen/kkp-applications - Get KKP applications under lecturer's supervision
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (token.role !== 'dosen') {
      return NextResponse.json({ error: 'Forbidden - Dosen access only' }, { status: 403 })
    }

    // Get lecturer profile
    const lecturer = await prisma.lecturers.findFirst({
      where: {
        users: {
          id: token.userId
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const isPlus = searchParams.get('isPlus') === 'true'

    const whereClause: any = {
      supervisor_id: lecturer.id
    }

    if (status) {
      whereClause.status = status
    }

    if (isPlus !== undefined) {
      whereClause.is_plus = isPlus
    }

    const applications = await prisma.kkp_applications.findMany({
      where: whereClause,
      include: {
        students: {
          include: {
            users: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        },
        companies: {
          select: {
            name: true,
            address: true,
            city: true
          }
        },
        lecturers: {
          include: {
            users: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    const formattedApplications = applications.map(app => ({
      id: app.id,
      student: {
        id: app.students.id,
        nim: app.students.nim,
        name: app.students.users?.name || '',
        avatar: app.students.users?.avatar
      },
      company: {
        id: app.company_id,
        name: app.companies?.name || '',
        address: app.companies?.address,
        city: app.companies?.city
      },
      topic: app.topic,
      description: app.description,
      status: app.status,
      start_date: app.start_date,
      end_date: app.end_date,
      location: app.location,
      is_plus: app.is_plus,
      supervisor: app.lecturers ? {
        id: app.lecturers.id,
        name: app.lecturers.users?.name
      } : null,
      created_at: app.created_at,
      updated_at: app.updated_at
    }))

    return NextResponse.json({
      data: formattedApplications,
      total: formattedApplications.length
    })

  } catch (error) {
    console.error('Error fetching KKP applications:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/dosen/kkp-applications - Create new KKP application
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (token.role !== 'dosen') {
      return NextResponse.json({ error: 'Forbidden - Dosen access only' }, { status: 403 })
    }

    // Get lecturer profile
    const lecturer = await prisma.lecturers.findFirst({
      where: {
        users: {
          id: token.userId
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      student_id,
      company_id,
      topic,
      description,
      start_date,
      end_date,
      location,
      is_plus
    } = body

    // Validate required fields
    if (!student_id || !company_id || !topic) {
      return NextResponse.json(
        { error: 'Missing required fields: student_id, company_id, topic' },
        { status: 400 }
      )
    }

    // Verify student exists
    const student = await prisma.students.findUnique({
      where: { id: student_id }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    // Verify company exists
    const company = await prisma.companies.findUnique({
      where: { id: company_id }
    })

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Check if student already has active KKP application
    const existingApplication = await prisma.kkp_applications.findFirst({
      where: {
        student_id,
        status: {
          in: ['pending', 'approved', 'in_progress']
        }
      }
    })

    if (existingApplication) {
      return NextResponse.json(
        { error: 'Student already has an active KKP application' },
        { status: 400 }
      )
    }

    // Create KKP application
    const { randomUUID } = await import('crypto')
    const applicationId = randomUUID()

    const application = await prisma.kkp_applications.create({
      data: {
        id: applicationId,
        student_id,
        company_id,
        supervisor_id: lecturer.id,
        topic,
        description: description || null,
        status: 'approved', // Langsung approved karena dibuat oleh dosen
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
        location: location || null,
        is_plus: is_plus || false,
        created_at: new Date(),
        updated_at: new Date()
      },
      include: {
        students: {
          include: {
            users: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        },
        companies: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'KKP application created successfully',
      data: {
        id: application.id,
        student: {
          id: application.students.id,
          nim: application.students.nim,
          name: application.students.users?.name || ''
        },
        company: {
          id: application.company_id,
          name: application.companies?.name || ''
        },
        topic: application.topic,
        status: application.status,
        is_plus: application.is_plus,
        created_at: application.created_at
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating KKP application:', error)
    return NextResponse.json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
