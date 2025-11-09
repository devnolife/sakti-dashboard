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
    const requirement_id = formData.get('requirementId') as string
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!user_id) { try { user_id = await getServerActionUserId() } catch {} }
    if (!user_id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

    console.log(`📤 Upload attempt - UserId: ${user_id}, RequirementId: ${requirement_id}`)

    const student = await prisma.students.findUnique({
      where: { user_id },
      select: { id: true, nim: true }
    })

    if (!student) {
      console.log(`❌ Student not found for user_id: ${user_id}`)
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const student_id = student.id
    console.log(`✅ Found student ID: ${student_id} (NIM: ${student.nim})`)

    if (!file || !requirement_id || !student_id) {
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
    const requirement = await prisma.exam_requirements.findUnique({
      where: { id: requirement_id }
    })

    if (!requirement) {
      return NextResponse.json(
        { success: false, error: 'Requirement not found' },
        { status: 404 }
      )
    }

    // Create directory structure based on exam type
    const examTypeFolder = `ujian-${requirement.exam_type}`
    const uploadDir = join(process.cwd(), 'public', 'uploads', examTypeFolder)

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${student_id}_${requirement_id}_${timestamp}_${sanitizedFileName}`
    const filePath = join(uploadDir, fileName)
    const fileUrl = `/uploads/${examTypeFolder}/${fileName}`

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Update or create student requirement record
    console.log(`💾 Upserting student requirement - StudentId: ${student_id}, RequirementId: ${requirement_id}`)

    const studentRequirement = await prisma.exam_student_requirements.upsert({
      where: {
        student_id_requirement_id: {
          student_id,
          requirement_id
        }
      },
      update: {
        completed: true,
        completed_at: new Date(),
        file_url: fileUrl,
        file_name: file.name,
        file_size: file.size,
        uploaded_at: new Date()
      },
      create: {
        id: `examstureq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        student_id,
        requirement_id,
        completed: true,
        completed_at: new Date(),
        file_url: fileUrl,
        file_name: file.name,
        file_size: file.size,
        uploaded_at: new Date()
      }
    })

    console.log(`✅ Student requirement updated successfully:`, {
      id: studentRequirement.id,
      completed: studentRequirement.completed,
      file_name: studentRequirement.file_name
    })

    return NextResponse.json({
      success: true,
      data: {
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: studentRequirement.uploaded_at
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
    const requirement_id = searchParams.get('requirementId')

    if (!requirement_id) {
      return NextResponse.json(
        { success: false, error: 'Missing requirement ID' },
        { status: 400 }
      )
    }

    // Get student_id from authenticated user
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) user_id = token.sub
    if (!user_id) { try { user_id = await getServerActionUserId() } catch {} }
    if (!user_id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    const student = await prisma.students.findUnique({
      where: { user_id },
      select: { id: true }
    })

    if (!student) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      )
    }

    const student_id = student.id
    console.log(`🗑️ Delete attempt - StudentId: ${student_id}, RequirementId: ${requirement_id}`)

    // Find the student requirement record
    const studentRequirement = await prisma.exam_student_requirements.findUnique({
      where: {
        student_id_requirement_id: {
          student_id,
          requirement_id
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
    if (studentRequirement.file_url) {
      const filePath = join(process.cwd(), 'public', studentRequirement.file_url)
      try {
        const fs = await import('fs/promises')
        await fs.unlink(filePath)
      } catch (error) {
        console.error('Error deleting physical file:', error)
        // Continue with database cleanup even if file deletion fails
      }
    }

    // Update database record
    await prisma.exam_student_requirements.update({
      where: {
        student_id_requirement_id: {
          student_id,
          requirement_id
        }
      },
      data: {
        completed: false,
        completed_at: null,
        file_url: null,
        file_name: null,
        file_size: null,
        uploaded_at: null
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
