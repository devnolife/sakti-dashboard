import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

export async function GET(request: NextRequest) {
  try {
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!userId) { try { user_id = await getServerActionUserId() } catch { } }
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Get user and student profile
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: {
        students: true
      }
    })

    if (!user || !user.students) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    const student_id = user.students.id

    // Get student's exam history to determine available exams
    const examHistory = await prisma.exam_applications.findMany({
      where: {
        student_id: studentId
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    // Get available lecturers for supervisors
    const lecturers = await prisma.lecturers.findMany({
      where: {
        user: {
          is_active: true
        }
      },
      include: {
        user: true
      }
    })

    // Determine available exam types based on student's progress
    const hasPassedProposal = examHistory.some(exam =>
      exam.type === 'proposal' && (exam.status === 'passed' || exam.status === 'completed')
    )

    const hasPassedResult = examHistory.some(exam =>
      exam.type === 'result' && (exam.status === 'passed' || exam.status === 'completed')
    )

    const availableExams = [
      {
        id: 'proposal-exam',
        title: 'Ujian Proposal',
        description: 'Ujian untuk mempresentasikan proposal penelitian Anda',
        icon: 'FileCheck',
        color: 'bg-blue-500',
        requirements: [
          'Telah menyelesaikan minimal 100 SKS',
          'Telah lulus mata kuliah Metodologi Penelitian',
          'Memiliki proposal penelitian yang telah disetujui oleh pembimbing'
        ],
        available: true,
        reason: null
      },
      {
        id: 'result-exam',
        title: 'Ujian Hasil',
        description: 'Ujian untuk mempresentasikan hasil penelitian Anda',
        icon: 'GraduationCap',
        color: 'bg-purple-500',
        requirements: [
          'Telah lulus Ujian Proposal',
          'Telah menyelesaikan penelitian',
          'Memiliki draft hasil penelitian yang telah disetujui oleh pembimbing'
        ],
        available: hasPassedProposal,
        reason: hasPassedProposal ? null : 'Anda belum lulus Ujian Proposal'
      },
      {
        id: 'closing-exam',
        title: 'Ujian Tertutup',
        description: 'Ujian akhir untuk menyelesaikan penelitian Anda',
        icon: 'Users',
        color: 'bg-teal-500',
        requirements: [
          'Telah lulus Ujian Hasil',
          'Telah menyelesaikan revisi penelitian',
          'Memiliki draft final yang telah disetujui oleh pembimbing'
        ],
        available: hasPassedResult,
        reason: hasPassedResult ? null : 'Anda belum lulus Ujian Hasil'
      }
    ]

    return NextResponse.json({
      success: true,
      data: {
        availableExams,
        supervisors: lecturers.map(lecturer => ({
          id: lecturer.id,
          name: lecturer.user.name,
          nip: lecturer.nip,
          department: lecturer.department
        }))
      }
    })

  } catch (error) {
    console.error('Error fetching exam registration data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!userId) { try { user_id = await getServerActionUserId() } catch { } }
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()

    const { exam_type, title, abstract, preferredDate, preferredTime, supervisor_id, notes } = body

    // Get user and student profile
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: {
        students: true
      }
    })

    if (!user || !user.students) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    const student_id = user.students.id

    // Validate exam type
    const validExamTypes = ['proposal', 'result', 'closing', 'final']
    if (!validExamTypes.includes(examType)) {
      return NextResponse.json(
        { error: 'Invalid exam type' },
        { status: 400 }
      )
    }

    // Check if student already has a pending exam of the same type
    const existingExam = await prisma.exam_applications.findFirst({
      where: {
        student_id: student_id,
        type: exam_type,
        status: {
          in: ['pending', 'scheduled', 'applicant']
        }
      }
    })

    if (existingExam) {
      return NextResponse.json(
        { error: 'You already have a pending exam application of this type' },
        { status: 400 }
      )
    }

    // Create the exam application
    const scheduled_date = preferredDate && preferredTime
      ? new Date(`${preferredDate}T${preferredTime}:00Z`)
      : null

    const examApplication = await prisma.exam_applications.create({
      data: {
        student_id: student_id,
        title: title,
        type: exam_type,
        abstract: abstract,
        status: 'applicant',
        scheduled_date: scheduled_date,
        advisor1Id: supervisor_id || null
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: examApplication.id,
        title: examApplication.title,
        type: examApplication.type,
        status: examApplication.status,
        submission_date: examApplication.submissionDate.toISOString()
      }
    })

  } catch (error) {
    console.error('Error creating exam application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
