import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

export async function POST(request: NextRequest) {
  try {
    let userId: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) userId = token.sub
    if (!userId) { try { userId = await getServerActionUserId() } catch {} }
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json()
    
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

    // Check if student already has an active AIK exam
    const existingAIKExam = await prisma.examApplication.findFirst({
      where: {
        studentId: studentId,
        type: 'other',
        title: {
          contains: 'AIK',
          mode: 'insensitive'
        },
        status: {
          in: ['applicant', 'pending', 'scheduled', 'completed']
        }
      }
    })

    if (existingAIKExam) {
      let statusMessage = ''
      switch (existingAIKExam.status) {
        case 'applicant':
        case 'pending':
          statusMessage = 'Your AIK Komfren exam application is currently being processed. Please wait for admin approval.'
          break
        case 'scheduled':
          statusMessage = 'Your AIK Komfren exam has already been scheduled. Please check your schedule.'
          break
        case 'completed':
          statusMessage = 'Your AIK Komfren exam has been completed and is awaiting results.'
          break
        default:
          statusMessage = 'You already have an active AIK Komfren exam application.'
      }
      
      return NextResponse.json(
        { 
          error: 'Registration not allowed',
          message: statusMessage,
          existingExam: {
            id: existingAIKExam.id,
            status: existingAIKExam.status,
            submissionDate: existingAIKExam.submissionDate.toISOString(),
            scheduledDate: existingAIKExam.scheduledDate?.toISOString()
          }
        },
        { status: 400 }
      )
    }

    // Additional validation: Check if student has passed AIK exam before
    const passedAIKExam = await prisma.examApplication.findFirst({
      where: {
        studentId: studentId,
        type: 'other',
        title: {
          contains: 'AIK',
          mode: 'insensitive'
        },
        status: 'passed'
      }
    })

    if (passedAIKExam) {
      return NextResponse.json(
        { 
          error: 'Registration not allowed',
          message: 'You have already passed the AIK Komfren exam. No need to register again.',
          passedExam: {
            id: passedAIKExam.id,
            completionDate: passedAIKExam.completionDate?.toISOString()
          }
        },
        { status: 400 }
      )
    }

    // Validate required fields
    const { name, nim, email, phone, semester, preferredDate, preferredTime, notes, termsAccepted } = body

    if (!name || !nim || !email || !phone || !semester || !termsAccepted) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create AIK Komfren exam application
    const aikExam = await prisma.examApplication.create({
      data: {
        title: 'AIK Komfren Examination',
        type: 'other',
        status: 'applicant',
        abstract: 'Ujian AIK (Al-Islam dan Kemuhammadiyahan) dan Komfren (Kemuhammadiyahan dan Profesi) sebagai syarat kelulusan mahasiswa.',
        submissionDate: new Date(),
        studentId: studentId,
        // Note: examiner will be assigned later by admin
      }
    })

    // If there are preferred dates/times, store them in notes
    const examNotes = []
    if (preferredDate) examNotes.push(`Preferred Date: ${preferredDate}`)
    if (preferredTime) examNotes.push(`Preferred Time: ${preferredTime}`)
    if (notes) examNotes.push(`Student Notes: ${notes}`)

    if (examNotes.length > 0) {
      await prisma.examApplication.update({
        where: { id: aikExam.id },
        data: {
          abstract: `${aikExam.abstract}\n\nPreferences:\n${examNotes.join('\n')}`
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        examId: aikExam.id,
        status: aikExam.status,
        message: 'AIK Komfren exam registration submitted successfully. Please proceed with payment.'
      }
    })

  } catch (error) {
    console.error('Error registering AIK exam:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    let userId: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) userId = token.sub
    if (!userId) { try { userId = await getServerActionUserId() } catch {} }
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
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

    // Return pre-filled form data
    const formData = {
      name: user.name,
      nim: user.studentProfile.nim,
      email: user.nidn, // Using nidn as email placeholder (this might need adjustment)
      phone: user.studentProfile.phone || '',
      semester: user.studentProfile.semester.toString(),
      canRegister: true, // For now, allow all students to register
      registrationFee: 50000, // 50,000 IDR consumption fee
    }

    return NextResponse.json({
      success: true,
      data: formData
    })

  } catch (error) {
    console.error('Error fetching registration data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
