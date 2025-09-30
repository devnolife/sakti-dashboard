import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { PrismaClient } from '@/lib/generated/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { authMiddleware } from '@/lib/auth-middleware'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const requirementId = formData.get('requirementId') as string
    let userId: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) userId = token.sub
    if (!userId) { try { userId = await getServerActionUserId() } catch {} }
    if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    
    console.log(`📤 Upload attempt - UserId: ${userId}, RequirementId: ${requirementId}`)
    
    const student = await prisma.student.findUnique({
      where: { userId },
      select: { id: true, nim: true }
    })

    if (!student) {
      console.log(`❌ Student not found for userId: ${userId}`)
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const studentId = student.id
    console.log(`✅ Found student ID: ${studentId} (NIM: ${student.nim})`)

    if (!file || !requirementId || !studentId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Get requirement details to determine exam type
    const requirement = await prisma.examRequirement.findUnique({
      where: { id: requirementId }
    })

    if (!requirement) {
      return NextResponse.json(
        { success: false, error: 'Requirement not found' },
        { status: 404 }
      )
    }

    // Create directory structure based on exam type
    const examTypeFolder = `ujian-${requirement.examType}`
    const uploadDir = join(process.cwd(), 'public', 'uploads', examTypeFolder)
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${studentId}_${requirementId}_${timestamp}_${sanitizedFileName}`
    const filePath = join(uploadDir, fileName)
    const fileUrl = `/uploads/${examTypeFolder}/${fileName}`

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Update or create student requirement record
    console.log(`💾 Upserting student requirement - StudentId: ${studentId}, RequirementId: ${requirementId}`)
    
    const studentRequirement = await prisma.examStudentRequirement.upsert({
      where: {
        studentId_requirementId: {
          studentId,
          requirementId
        }
      },
      update: {
        completed: true,
        completedAt: new Date(),
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date()
      },
      create: {
        studentId,
        requirementId,
        completed: true,
        completedAt: new Date(),
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date()
      }
    })

    console.log(`✅ Student requirement updated successfully:`, {
      id: studentRequirement.id,
      completed: studentRequirement.completed,
      fileName: studentRequirement.fileName
    })

    return NextResponse.json({
      success: true,
      data: {
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: studentRequirement.uploadedAt
      }
    })

  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const requirementId = searchParams.get('requirementId')

    if (!requirementId) {
      return NextResponse.json(
        { success: false, error: 'Missing requirement ID' },
        { status: 400 }
      )
    }

    // Get studentId from authenticated user
    let userId: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) userId = token.sub
    if (!userId) { try { userId = await getServerActionUserId() } catch {} }
    if (!userId) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const student = await prisma.student.findUnique({
      where: { userId },
      select: { id: true }
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const studentId = student.id
    console.log(`🗑️ Delete attempt - StudentId: ${studentId}, RequirementId: ${requirementId}`)

    // Find the student requirement record
    const studentRequirement = await prisma.examStudentRequirement.findUnique({
      where: {
        studentId_requirementId: {
          studentId,
          requirementId
        }
      }
    })

    if (!studentRequirement) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      )
    }

    // Delete physical file if exists
    if (studentRequirement.fileUrl) {
      const filePath = join(process.cwd(), 'public', studentRequirement.fileUrl)
      try {
        const fs = await import('fs/promises')
        await fs.unlink(filePath)
      } catch (error) {
        console.error('Error deleting physical file:', error)
        // Continue with database cleanup even if file deletion fails
      }
    }

    // Update database record
    await prisma.examStudentRequirement.update({
      where: {
        studentId_requirementId: {
          studentId,
          requirementId
        }
      },
      data: {
        completed: false,
        completedAt: null,
        fileUrl: null,
        fileName: null,
        fileSize: null,
        uploadedAt: null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('File deletion error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
