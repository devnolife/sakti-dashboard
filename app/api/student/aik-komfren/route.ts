import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

export async function GET(request: NextRequest) {
  try {
    let userId: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) userId = token.sub
    if (!userId) {
      try { userId = await getServerActionUserId() } catch {}
    }
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get user and student profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true
      }
    })

    if (!user || !user.studentProfile) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    const studentId = user.studentProfile.id

    // Get AIK Komfren exam applications
    const aikExams = await prisma.examApplication.findMany({
      where: {
        studentId: studentId,
        type: 'other',
        title: {
          contains: 'AIK',
          mode: 'insensitive'
        }
      },
      include: {
        advisor1: {
          include: {
            user: true
          }
        },
        committees: {
          include: {
            lecturer: {
              include: {
                user: true
              }
            }
          }
        },
        documents: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get the most recent/active AIK exam
    const currentAIKExam = aikExams.find(exam => 
      exam.status === 'scheduled' || 
      exam.status === 'pending' || 
      exam.status === 'applicant'
    ) || aikExams[0] // fallback to most recent

    // Transform data for frontend
    const aikData = {
      studentInfo: {
        name: user.name,
        nim: user.studentProfile.nim,
        faculty: user.studentProfile.department || 'Faculty of Computer Science',
        program: user.studentProfile.major || 'Computer Science',
        semester: user.studentProfile.semester || 6,
      },
      currentExam: currentAIKExam ? {
        id: currentAIKExam.id,
        title: currentAIKExam.title,
        status: currentAIKExam.status,
        submissionDate: currentAIKExam.submissionDate.toISOString(),
        scheduledDate: currentAIKExam.scheduledDate?.toISOString(),
        completionDate: currentAIKExam.completionDate?.toISOString(),
        location: currentAIKExam.location,
        examiner: currentAIKExam.advisor1 ? {
          id: currentAIKExam.advisor1.id,
          name: currentAIKExam.advisor1.user.name,
          nip: currentAIKExam.advisor1.nip,
          nidn: currentAIKExam.advisor1.user.nidn,
          position: 'Senior Lecturer',
          department: 'Islamic Studies Department'
        } : null,
        documents: currentAIKExam.documents.map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.type,
          status: doc.status,
          uploadDate: doc.uploadDate.toISOString(),
          verificationDate: doc.verificationDate?.toISOString(),
          fileUrl: doc.fileUrl,
          notes: doc.notes
        }))
      } : null,
      examHistory: aikExams.map(exam => ({
        id: exam.id,
        title: exam.title,
        status: exam.status,
        submissionDate: exam.submissionDate.toISOString(),
        scheduledDate: exam.scheduledDate?.toISOString(),
        completionDate: exam.completionDate?.toISOString(),
        location: exam.location
      })),
      // Determine what the student needs to do next
      nextAction: determineNextAction(currentAIKExam),
      examStatus: determineExamStatus(aikExams)
    }

    return NextResponse.json({
      success: true,
      data: aikData
    })

  } catch (error) {
    console.error('Error fetching AIK data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function determineExamStatus(exams: any[]): string {
  if (exams.length === 0) {
    return 'not_registered'
  }

  const latestExam = exams[0]
  
  // Map database status to frontend status
  switch (latestExam.status) {
    case 'applicant':
    case 'pending':
      return 'registered'
    case 'scheduled':
      return 'scheduled'
    case 'completed':
      return 'completed'
    case 'passed':
      return 'passed'
    case 'failed':
      return 'failed'
    default:
      return 'not_registered'
  }
}

function determineNextAction(exam: any): string {
  if (!exam) {
    return 'register'
  }

  switch (exam.status) {
    case 'applicant':
    case 'pending':
      return 'wait_schedule'
    case 'scheduled':
      return 'prepare_exam'
    case 'completed':
      return 'wait_results'
    case 'passed':
      return 'get_certificate'
    case 'failed':
      return 'retake_exam'
    default:
      return 'register'
  }
}
