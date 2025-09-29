import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { unlink } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

// DELETE: Hapus file persyaratan KKP
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Cari requirement yang akan dihapus
    const requirement = await prisma.kkpRequirement.findUnique({
      where: { id }
    })

    if (!requirement) {
      return NextResponse.json(
        { error: "Requirement not found" },
        { status: 404 }
      )
    }

    // Hapus file dari sistem file
    const fullPath = path.join(process.cwd(), "public", requirement.filePath)
    if (existsSync(fullPath)) {
      await unlink(fullPath)
    }

    // Hapus record dari database
    await prisma.kkpRequirement.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: "File deleted successfully"
    })

  } catch (error) {
    console.error("Error deleting KKP requirement:", error)
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    )
  }
}
