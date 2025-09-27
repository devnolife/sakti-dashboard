import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  try {
    const userId = getHardcodedUserId()
    
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

    // Get student's exam history to determine available exams
    const examHistory = await prisma.examApplication.findMany({
      where: {
        studentId: studentId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get available lecturers for supervisors
    const lecturers = await prisma.lecturer.findMany({
      where: {
        user: {
          isActive: true
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
    const userId = getHardcodedUserId()
    const body = await request.json()
    
    const { examType, title, abstract, preferredDate, preferredTime, supervisorId, notes } = body

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

    // Validate exam type
    const validExamTypes = ['proposal', 'result', 'closing', 'final']
    if (!validExamTypes.includes(examType)) {
      return NextResponse.json(
        { error: 'Invalid exam type' },
        { status: 400 }
      )
    }

    // Check if student already has a pending exam of the same type
    const existingExam = await prisma.examApplication.findFirst({
      where: {
        studentId: studentId,
        type: examType,
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
    const scheduledDate = preferredDate && preferredTime 
      ? new Date(`${preferredDate}T${preferredTime}:00Z`)
      : null

    const examApplication = await prisma.examApplication.create({
      data: {
        studentId: studentId,
        title: title,
        type: examType,
        abstract: abstract,
        status: 'applicant',
        scheduledDate: scheduledDate,
        advisor1Id: supervisorId || null
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: examApplication.id,
        title: examApplication.title,
        type: examApplication.type,
        status: examApplication.status,
        submissionDate: examApplication.submissionDate.toISOString()
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
