import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function DELETE(request: NextRequest) {
  try {
    const { requirementId, exam_type } = await request.json()

    if (!requirementId || !examType) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      )
    }

    // TODO: Get file info from database and delete file
    // Example:
    // const requirement = await prisma.examStudentRequirement.findUnique({
    //   where: {
    //     studentId_requirementId: {
    //       student_id: 'current-user-id',
    //       requirementId: requirementId
    //     }
    //   }
    // })

    // if (requirement?.fileUrl) {
    //   const filePath = path.join(process.cwd(), 'public', requirement.fileUrl)
    //   if (existsSync(filePath)) {
    //     await unlink(filePath)
    //   }
    // }

    // await prisma.examStudentRequirement.update({
    //   where: {
    //     studentId_requirementId: {
    //       student_id: 'current-user-id',
    //       requirementId: requirementId
    //     }
    //   },
    //   data: {
    //     completed: false,
    //     fileUrl: null,
    //     fileName: null,
    //     fileSize: null,
    //     uploadedAt: null
    //   }
    // })

    return NextResponse.json({
      success: true,
      message: 'File berhasil dihapus'
    })

  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghapus file' },
      { status: 500 }
    )
  }
}
