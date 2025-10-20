import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'
import { z } from 'zod'

const gradingSchema = z.object({
  examId: z.string(),
  score: z.number().min(0).max(100),
  grade: z.string().optional(),
  notes: z.string().optional(),
  feedback: z.string().optional(),
})

// GET /api/dosen/exams/grading - Get exams for grading
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
          id: token.sub
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'pending', 'graded'

    const exams = await prisma.exam_applications.findMany({
      where: {
        OR: [
          { main_examiner_id: lecturer.id },
          { co_examiner_1_id: lecturer.id },
          { co_examiner_2_id: lecturer.id },
        ],
        status: status === 'graded' ? 'completed' : {
          in: ['scheduled', 'in_progress']
        },
        exam_date: {
          lte: new Date() // Only past exams for grading
        }
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
        mainSupervisor: {
          include: {
            users: {
              select: { name: true }
            }
          }
        }
      },
      orderBy: { exam_date: 'desc' }
    })

    const formattedExams = exams.map(exam => ({
      id: exam.id,
      student: {
        id: exam.students.id,
        nim: exam.students.nim,
        name: exam.students.users.name,
        avatar: exam.students.users.avatar,
        major: exam.students.major
      },
      title: exam.title,
      exam_type: exam.examType,
      exam_date: exam.examDate,
      examTime: exam.examTime,
      location: exam.location,
      score: exam.score,
      grade: exam.grade,
      notes: exam.notes,
      supervisor: exam.mainSupervisor ? {
        name: exam.mainSupervisor.users.name
      } : null,
      status: exam.status,
      isGraded: exam.score !== null && exam.grade !== null
    }))

    return NextResponse.json({
      data: formattedExams,
      total: formattedExams.length,
      pending: formattedExams.filter(e => !e.isGraded).length,
      graded: formattedExams.filter(e => e.isGraded).length
    })
  } catch (error) {
    console.error('Error fetching exams for grading:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/dosen/exams/grading - Submit grade for exam
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
          id: token.sub
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = gradingSchema.parse(body)

    // Check if lecturer is examiner for this exam
    const exam = await prisma.exam_applications.findUnique({
      where: { id: validatedData.examId }
    })

    if (!exam) {
      return NextResponse.json({ error: 'Exam not found' }, { status: 404 })
    }

    const isExaminer = exam.mainExaminerId === lecturer.id ||
                       exam.coExaminer1Id === lecturer.id ||
                       exam.coExaminer2Id === lecturer.id

    if (!isExaminer) {
      return NextResponse.json({ error: 'You are not an examiner for this exam' }, { status: 403 })
    }

    // Calculate letter grade if not provided
    let grade = validatedData.grade
    if (!grade) {
      grade = calculateLetterGrade(validatedData.score)
    }

    // Update exam with grade
    const updatedExam = await prisma.exam_applications.update({
      where: { id: validatedData.examId },
      data: {
        score: validatedData.score,
        grade,
        notes: validatedData.notes,
        status: 'completed'
      },
      include: {
        students: {
          include: {
            users: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    // Log audit
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub,
        action: 'grade_exam',
        resource: 'exam',
        details: {
          examId: updatedExam.id,
          studentNim: updatedExam.students.nim,
          studentName: updatedExam.students.users.name,
          score: validatedData.score,
          grade
        }
      }
    })

    return NextResponse.json({
      id: updatedExam.id,
      score: updatedExam.score,
      grade: updatedExam.grade,
      notes: updatedExam.notes,
      status: updatedExam.status,
      message: 'Grade submitted successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error submitting grade:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Helper function to calculate letter grade from score
function calculateLetterGrade(score: number): string {
  if (score >= 85) return 'A'
  if (score >= 80) return 'A-'
  if (score >= 75) return 'B+'
  if (score >= 70) return 'B'
  if (score >= 65) return 'B-'
  if (score >= 60) return 'C+'
  if (score >= 55) return 'C'
  if (score >= 50) return 'C-'
  if (score >= 45) return 'D'
  return 'E'
}
