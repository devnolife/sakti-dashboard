import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'
import { students } from '@/components/dekan/vice-dean-4/mock-data'

export async function GET(request: NextRequest) {
  try {
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!user_id) { try { user_id = await getServerActionUserId() } catch { } }
    if (!user_id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // all, pending, approved, completed, rejected

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

    // Build where clause based on status filter
    let whereClause: any = {
      student_id: student_id
    }

    if (status && status !== 'all') {
      if (status === 'approved') {
        whereClause.status = 'scheduled'
      } else if (status === 'pending') {
        whereClause.status = { in: ['pending', 'applicant'] }
      } else if (status === 'completed') {
        whereClause.status = { in: ['completed', 'passed'] }
      } else if (status === 'rejected') {
        whereClause.status = { in: ['rejected', 'failed', 'cancelled'] }
      }
    }

    // Get exam applications/submissions
    const examSubmissions = await prisma.exam_applications.findMany({
      where: whereClause,
      include: {
        lecturers_exam_applications_advisor_1_id_to_lecturers: {
          include: {
            users: true
          }
        },
        lecturers_exam_applications_advisor_2_id_to_lecturers: {
          include: {
            users: true
          }
        },
        exam_committees: {
          include: {
            lecturers: {
              include: {
                users: true
              }
            }
          }
        },
        exam_documents: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    // Transform data for frontend
    const transformedSubmissions = examSubmissions.map(exam => ({
      id: exam.id,
      exam_type: exam.type === 'proposal' ? 'Ujian Proposal' :
        exam.type === 'result' ? 'Ujian Hasil' :
          exam.type === 'closing' ? 'Ujian Tertutup' : 'Ujian Lainnya',
      title: exam.title,
      submittedDate: exam.submission_date.toISOString().split('T')[0],
      scheduled_date: exam.scheduled_date ? exam.scheduled_date.toISOString().split('T')[0] : null,
      scheduledTime: exam.scheduled_date ?
        `${exam.scheduled_date.getHours().toString().padStart(2, '0')}:${exam.scheduled_date.getMinutes().toString().padStart(2, '0')} - ${(exam.scheduled_date.getHours() + 2).toString().padStart(2, '0')}:${exam.scheduled_date.getMinutes().toString().padStart(2, '0')}` : null,
      status: mapStatus(exam.status),
      location: exam.location,
      committee: exam.exam_committees.map(committee => ({
        name: committee.lecturers.users.name,
        role: committee.role === 'chairman' ? 'Ketua' :
          committee.role === 'secretary' ? 'Sekretaris' : 'Anggota'
      })),
      notes: generateNotes(exam.status, exam.type),
      result: exam.status === 'completed' || exam.status === 'passed' ? {
        score: Math.floor(Math.random() * 15) + 85, // Random score between 85-100
        grade: 'A',
        feedback: 'Presentasi sangat baik dengan metodologi yang jelas. Penelitian menunjukkan hasil yang signifikan.'
      } : null,
      reason: exam.status === 'cancelled' ?
        'Dokumen yang diajukan perlu perbaikan. Silakan hubungi pembimbing untuk revisi.' : null
    }))

    return NextResponse.json({
      success: true,
      data: transformedSubmissions
    })

  } catch (error) {
    console.error('Error fetching exam submissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!userId) { try { user_id = await getServerActionUserId() } catch { } }
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { searchParams } = new URL(request.url)
    const examId = searchParams.get('id')

    if (!examId) {
      return NextResponse.json(
        { error: 'Exam ID is required' },
        { status: 400 }
      )
    }

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

    // Check if exam belongs to student and is cancellable
    const exam = await prisma.exam_applications.findFirst({
      where: {
        id: examId,
        student_id: studentId
      }
    })

    if (!exam) {
      return NextResponse.json(
        { error: 'Exam application not found' },
        { status: 404 }
      )
    }

    // Only allow cancellation of pending or applicant status exams
    if (!['pending', 'applicant'].includes(exam.status)) {
      return NextResponse.json(
        { error: 'Cannot cancel exam application with current status' },
        { status: 400 }
      )
    }

    // Update status to cancelled
    await prisma.exam_applications.update({
      where: { id: examId },
      data: { status: 'cancelled' }
    })

    return NextResponse.json({
      success: true,
      message: 'Exam application cancelled successfully'
    })

  } catch (error) {
    console.error('Error cancelling exam application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function mapStatus(status: string): string {
  const statusMap: { [key: string]: string } = {
    'applicant': 'pending',
    'pending': 'pending',
    'scheduled': 'approved',
    'completed': 'completed',
    'passed': 'completed',
    'failed': 'rejected',
    'rejected': 'rejected',
    'cancelled': 'rejected'
  }
  return statusMap[status] || 'pending'
}

function generateNotes(status: string, type: string): string {
  if (status === 'pending' || status === 'applicant') {
    return 'Pengajuan Anda sedang dalam proses review oleh program studi.'
  } else if (status === 'scheduled') {
    return 'Silakan mempersiapkan presentasi dan dokumen pendukung untuk ujian.'
  } else if (status === 'completed' || status === 'passed') {
    if (type === 'proposal') {
      return 'Revisi harus diselesaikan dalam 2 minggu.'
    } else if (type === 'result') {
      return 'Persiapkan dokumen untuk ujian tertutup.'
    } else {
      return 'Selamat! Anda telah menyelesaikan ujian dengan baik.'
    }
  } else if (status === 'failed' || status === 'rejected') {
    return 'Silakan hubungi bagian akademik untuk informasi lebih lanjut.'
  }
  return 'Status ujian Anda sedang diproses.'
}
