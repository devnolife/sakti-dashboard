import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

// GET - Fetch available letter types for students/lecturers
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const prodiId = searchParams.get("prodiId")

    const where: any = {
      is_active: true
    }

    // Filter by prodi or global
    if (prodiId) {
      where.OR = [
        { prodi_id: prodiId },
        { is_global: true }
      ]
    } else {
      where.is_global = true
    }

    const letterTypes = await prisma.letter_types.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        approval_role: true,
        estimated_days: true,
        required_documents: true,
        additional_fields: true,
        prodi_id: true,
        is_global: true,
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      },
      orderBy: {
        title: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: letterTypes
    })
  } catch (error) {
    console.error("Error fetching letter types:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch letter types" },
      { status: 500 }
    )
  }
}
