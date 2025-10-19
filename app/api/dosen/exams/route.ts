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
    const lecturer = await prisma.lecturer.findFirst({
      where: {
        users: {
          id: token.sub
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const role = searchParams.get('role') // 'supervisor', 'examiner', 'all'
    const status = searchParams.get('status') // 'pending', 'scheduled', 'completed'
    const examType = searchParams.get('examType') // 'proposal', 'result', 'comprehensive'

    const whereClause: any = {
      OR: [
        { mainSupervisorId: lecturer.id },
        { mainExaminerId: lecturer.id },
        { coExaminer1Id: lecturer.id },
        { coExaminer2Id: lecturer.id },
      ]
    }

    // Filter by role
    if (role === 'supervisor') {
      whereClause.OR = [{ mainSupervisorId: lecturer.id }]
    } else if (role === 'examiner') {
      whereClause.OR = [
        { mainExaminerId: lecturer.id },
        { coExaminer1Id: lecturer.id },
        { coExaminer2Id: lecturer.id },
      ]
    }

    // Filter by status
    if (status) {
      whereClause.status = status
    }

    // Filter by exam type
    if (examType) {
      whereClause.examType = examType
    }

    const exams = await prisma.examApplication.findMany({
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
        mainSupervisor: {
          include: {
            users: {
              select: { name: true }
            }
          }
        },
        mainExaminer: {
          include: {
            users: {
              select: { name: true }
            }
          }
        },
        coExaminer1: {
          include: {
            users: {
              select: { name: true }
            }
          }
        },
        coExaminer2: {
          include: {
            users: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: [
        { examDate: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    const formattedExams = exams.map(exam => {
      // Determine role of current lecturer in this exam
      let lecturerRole = 'unknown'
      if (exam.mainSupervisorId === lecturer.id) lecturerRole = 'supervisor'
      else if (exam.mainExaminerId === lecturer.id) lecturerRole = 'main_examiner'
      else if (exam.coExaminer1Id === lecturer.id) lecturerRole = 'co_examiner_1'
      else if (exam.coExaminer2Id === lecturer.id) lecturerRole = 'co_examiner_2'

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
        examType: exam.examType,
        status: exam.status,
        examDate: exam.examDate,
        examTime: exam.examTime,
        location: exam.location,
        score: exam.score,
        grade: exam.grade,
        notes: exam.notes,
        lecturerRole,
        supervisor: exam.mainSupervisor ? {
          id: exam.mainSupervisor.id,
          name: exam.mainSupervisor.users.name
        } : null,
        mainExaminer: exam.mainExaminer ? {
          id: exam.mainExaminer.id,
          name: exam.mainExaminer.users.name
        } : null,
        coExaminer1: exam.coExaminer1 ? {
          id: exam.coExaminer1.id,
          name: exam.coExaminer1.users.name
        } : null,
        coExaminer2: exam.coExaminer2 ? {
          id: exam.coExaminer2.id,
          name: exam.coExaminer2.users.name
        } : null,
        createdAt: exam.createdAt,
        updatedAt: exam.updatedAt
      }
    })

    return NextResponse.json({
      data: formattedExams,
      total: formattedExams.length,
      filters: {
        role: role || 'all',
        status: status || 'all',
        examType: examType || 'all'
      }
    })
  } catch (error) {
    console.error('Error fetching dosen exams:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
