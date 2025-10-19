import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const examType = formData.get('examType') as string
    const requirementId = formData.get('requirementId') as string

    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      )
    }

    if (!examType || !requirementId) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Hanya file PDF yang diperbolehkan' },
        { status: 400 }
      )
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Ukuran file maksimal 10MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create directory based on exam type
    const examTypeDir = `ujian-${examType}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', examTypeDir)
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${cleanFileName}`
    const filePath = path.join(uploadDir, fileName)

    // Write file
    await writeFile(filePath, buffer)

    // Generate file URL
    const fileUrl = `/uploads/${examTypeDir}/${fileName}`

    // TODO: Save to database
    // Here you would save the file metadata to your database
    // Example:
    // await prisma.examStudentRequirement.upsert({
    //   where: { 
    //     studentId_requirementId: { 
    //       studentId: 'current-user-id', 
    //       requirementId: requirementId 
    //     } 
    //   },
    //   update: {
    //     completed: true,
    //     fileUrl: fileUrl,
    //     fileName: file.name,
    //     fileSize: file.size,
    //     uploadedAt: new Date()
    //   },
    //   create: {
    //     studentId: 'current-user-id',
    //     requirementId: requirementId,
    //     completed: true,
    //     fileUrl: fileUrl,
    //     fileName: file.name,
    //     fileSize: file.size,
    //     uploadedAt: new Date()
    //   }
    // })

    return NextResponse.json({
      success: true,
      fileUrl: fileUrl,
      fileName: file.name,
      fileSize: file.size,
      message: 'File berhasil diunggah'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengunggah file' },
      { status: 500 }
    )
  }
}
