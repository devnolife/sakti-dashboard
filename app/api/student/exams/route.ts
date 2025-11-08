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

    // Get all exam applications for the student
    const examApplications = await prisma.exam_applications.findMany({
      where: {
        student_id: student_id
      },
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

    // Transform data to match frontend expectations
    const transformedData: {
      proposalExam: any
      resultExam: any
      closingExam: any
      allExams: any[]
    } = {
      proposalExam: null,
      resultExam: null,
      closingExam: null,
      allExams: examApplications.map(exam => ({
        id: exam.id,
        title: exam.title,
        type: exam.type,
        status: exam.status,
        abstract: exam.abstract,
        submission_date: exam.submission_date.toISOString(),
        scheduled_date: exam.scheduled_date?.toISOString(),
        completion_date: exam.completion_date?.toISOString(),
        location: exam.location,
        advisor1: exam.lecturers_exam_applications_advisor_1_id_to_lecturers ? {
          id: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.id,
          name: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.users.name,
          nip: exam.lecturers_exam_applications_advisor_1_id_to_lecturers.nip
        } : null,
        advisor2: exam.lecturers_exam_applications_advisor_2_id_to_lecturers ? {
          id: exam.lecturers_exam_applications_advisor_2_id_to_lecturers.id,
          name: exam.lecturers_exam_applications_advisor_2_id_to_lecturers.users.name,
          nip: exam.lecturers_exam_applications_advisor_2_id_to_lecturers.nip
        } : null,
        committees: exam.exam_committees.map(committee => ({
          id: committee.id,
          name: committee.lecturers.users.name,
          role: committee.role,
          nip: committee.lecturers.nip
        })),
        documents: exam.exam_documents.map(doc => ({
          id: doc.id,
          name: doc.name,
          type: doc.type,
          status: doc.status,
          upload_date: doc.upload_date.toISOString(),
          verification_date: doc.verification_date?.toISOString(),
          file_url: doc.file_url,
          file_size: doc.file_size,
          notes: doc.notes
        })),
        requirements: [] as any[] // Will be populated based on exam type and status
      }))
    }

    // Separate exams by type for easier frontend consumption
    examApplications.forEach(exam => {
      const examData = transformedData.allExams.find(e => e.id === exam.id)
      if (!examData) return

      // Generate requirements based on exam type and status
      examData.requirements = generateRequirements(exam.type, exam.status, exam.exam_documents)

      if (exam.type === 'proposal') {
        transformedData.proposalExam = examData
      } else if (exam.type === 'result') {
        transformedData.resultExam = examData
      } else if (exam.type === 'closing' || exam.type === 'final') {
        transformedData.closingExam = examData
      }
    })

    return NextResponse.json({
      success: true,
      data: transformedData
    })

  } catch (error) {
    console.error('Error fetching exam data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateRequirements(examType: string, examStatus: string, documents: any[]) {
  const baseRequirements = {
    proposal: [
      {
        id: 'prop-req-1',
        title: 'Bukti Pembayaran Ujian',
        description: 'Upload bukti pembayaran ujian proposal',
        completed: documents.some(d => d.type === 'payment_proof' && d.status === 'verified')
      },
      {
        id: 'prop-req-2',
        title: 'Transkrip Nilai',
        description: 'Upload transkrip nilai terkini',
        completed: documents.some(d => d.type === 'transcript' && d.status === 'verified')
      },
      {
        id: 'prop-req-3',
        title: 'Dokumen Proposal',
        description: 'Upload dokumen proposal penelitian',
        completed: documents.some(d => d.type === 'proposal' && d.status === 'verified')
      },
      {
        id: 'prop-req-4',
        title: 'Persetujuan Pembimbing',
        description: 'Dapatkan persetujuan tertulis dari pembimbing',
        completed: documents.some(d => d.type === 'supervisor_approval' && d.status === 'verified')
      }
    ],
    result: [
      {
        id: 'res-req-1',
        title: 'Dokumen Hasil Penelitian',
        description: 'Upload dokumen hasil penelitian lengkap (min. 40 halaman)',
        completed: documents.some(d => d.type === 'proposal' && d.status === 'verified')
      },
      {
        id: 'res-req-2',
        title: 'Analisis Data',
        description: 'Sertakan analisis data dan hasil penelitian yang komprehensif',
        completed: false
      },
      {
        id: 'res-req-3',
        title: 'Slide Presentasi',
        description: 'Persiapkan slide presentasi untuk ujian',
        completed: false
      },
      {
        id: 'res-req-4',
        title: 'Review Pembimbing Final',
        description: 'Dapatkan review dan persetujuan final dari pembimbing',
        completed: documents.some(d => d.type === 'supervisor_approval' && d.status === 'verified')
      },
      {
        id: 'res-req-5',
        title: 'Lulus Ujian Proposal',
        description: 'Harus telah lulus ujian proposal',
        completed: examStatus === 'passed' || examStatus === 'completed'
      }
    ],
    closing: [
      {
        id: 'clo-req-1',
        title: 'Dokumen Final Penelitian',
        description: 'Upload dokumen final penelitian yang telah direvisi',
        completed: documents.some(d => d.type === 'proposal' && d.status === 'verified')
      },
      {
        id: 'clo-req-2',
        title: 'Revisi dari Ujian Hasil',
        description: 'Lengkapi semua revisi dari ujian hasil',
        completed: false
      },
      {
        id: 'clo-req-3',
        title: 'Persetujuan Pembimbing Final',
        description: 'Dapatkan persetujuan final dari pembimbing untuk ujian tertutup',
        completed: documents.some(d => d.type === 'supervisor_approval' && d.status === 'verified')
      },
      {
        id: 'clo-req-4',
        title: 'Lulus Ujian Hasil',
        description: 'Harus telah lulus ujian hasil',
        completed: examStatus === 'passed' || examStatus === 'completed'
      }
    ]
  }

  return baseRequirements[examType as keyof typeof baseRequirements] || []
}
