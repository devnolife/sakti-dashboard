import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'

// GET /api/dosen/exams - Get exams as examiner/supervisor
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
    const role = searchParams.get('role') // 'supervisor', 'examiner', 'all'
    const status = searchParams.get('status') // 'pending', 'scheduled', 'completed'
    const exam_type = searchParams.get('examType') // 'proposal', 'result', 'comprehensive'

    const whereClause: any = {
      OR: [
        { advisor_1_id: lecturer.id },
        { advisor_2_id: lecturer.id }
      ]
    }

    // Filter by role
    if (role === 'supervisor') {
      whereClause.OR = [
        { advisor_1_id: lecturer.id },
        { advisor_2_id: lecturer.id }
      ]
    }

    // Filter by status
    if (status) {
      whereClause.status = status
    }

    // Filter by exam type
    if (exam_type) {
      whereClause.type = exam_type
    }

    const exams = await prisma.exam_applications.findMany({
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
        lecturers_exam_applications_advisor_1_id_to_lecturers: {
          include: {
            users: {
              select: { name: true }
            }
          }
        },
        lecturers_exam_applications_advisor_2_id_to_lecturers: {
          include: {
            users: {
              select: { name: true }
            }
          }
        },
        exam_committees: {
          include: {
            lecturers: {
              include: {
                users: {
                  select: { name: true }
                }
              }
            }
          }
        }
      },
      orderBy: [
        { scheduled_date: 'asc' },
        { created_at: 'desc' }
      ]
    })

    const formattedExams = exams.map(exam => {
      // Determine role of current lecturer in this exam
      let lecturerRole = 'unknown'
      if (exam.advisor_1_id === lecturer.id) lecturerRole = 'advisor_1'
      else if (exam.advisor_2_id === lecturer.id) lecturerRole = 'advisor_2'

      // Check if lecturer is in committee
      const committeeRole = exam.exam_committees.find(c => c.lecturer_id === lecturer.id)
      if (committeeRole) lecturerRole = committeeRole.role

      return {
        id: exam.id,
        student: {
          id: exam.students.id,
          nim: exam.students.nim,
          name: exam.students.users.name,
          avatar: exam.students.users.avatar,
          major: exam.students.major
        },
        title: exam.title,
        exam_type: exam.type,
        status: exam.status,
        scheduled_date: exam.scheduled_date,
        completion_date: exam.completion_date,
        location: exam.location,
        abstract: exam.abstract,
        lecturerRole,
        advisor_1: exam.lecturers_exam_applications_advisor_1_id_to_lecturers ? {
          id: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.id,
          name: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.users?.name
        } : null,
        advisor_2: exam.lecturers_exam_applications_advisor_2_id_to_lecturers ? {
          id: exam.lecturers_exam_applications_advisor_2_id_to_lecturers.id,
          name: exam.lecturers_exam_applications_advisor_2_id_to_lecturers.users?.name
        } : null,
        committees: exam.exam_committees.map(c => ({
          id: c.id,
          role: c.role,
          lecturer: {
            id: c.lecturers.id,
            name: c.lecturers.users?.name
          }
        })),
        created_at: exam.created_at,
        updated_at: exam.updated_at
      }
    })

    return NextResponse.json({
      data: formattedExams,
      total: formattedExams.length,
      filters: {
        role: role || 'all',
        status: status || 'all',
        exam_type: exam_type || 'all'
      }
    })
  } catch (error) {
    console.error('Error fetching dosen exams:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/dosen/exams - Create new exam application
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
      title,
      type,
      abstract,
      scheduled_date,
      location
    } = body

    // Validate required fields
    if (!student_id || !title || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: student_id, title, type' },
        { status: 400 }
      )
    }

    // Validate exam type
    const validExamTypes = ['proposal', 'result', 'closing']
    if (!validExamTypes.includes(type)) {
      return NextResponse.json(
        { error: 'Invalid exam type. Must be: proposal, result, or closing' },
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

    // Create exam application
    const { randomUUID } = await import('crypto')
    const examId = randomUUID()

    const exam = await prisma.exam_applications.create({
      data: {
        id: examId,
        title,
        type,
        status: 'pending',
        abstract: abstract || null,
        scheduled_date: scheduled_date ? new Date(scheduled_date) : null,
        submission_date: new Date(),
        completion_date: null,
        location: location || null,
        student_id,
        advisor_1_id: lecturer.id, // Current lecturer as advisor 1
        advisor_2_id: null,
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
        lecturers_exam_applications_advisor_1_id_to_lecturers: {
          include: {
            users: {
              select: { name: true }
            }
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Exam application created successfully',
      data: {
        id: exam.id,
        title: exam.title,
        type: exam.type,
        status: exam.status,
        scheduled_date: exam.scheduled_date,
        location: exam.location,
        student: {
          id: exam.students.id,
          nim: exam.students.nim,
          name: exam.students.users?.name || '',
          avatar: exam.students.users?.avatar || null
        },
        advisor_1: exam.lecturers_exam_applications_advisor_1_id_to_lecturers ? {
          id: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.id,
          name: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.users?.name || ''
        } : null,
        created_at: exam.created_at
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating exam application:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
