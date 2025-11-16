import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAuth } from "@/lib/auth-middleware"

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)

    if (!auth.authenticated || !auth.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Only staff_tu/prodi role should access this endpoint
    if (auth.user.role !== "prodi") {
      return NextResponse.json(
        { error: "Forbidden: Only prodi staff can access this endpoint" },
        { status: 403 }
      )
    }

    // Get lecturer's prodi information
    const lecturer = await prisma.lecturers.findUnique({
      where: { user_id: auth.user.id },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      }
    })

    if (!lecturer || !lecturer.prodi) {
      return NextResponse.json(
        { error: "Prodi information not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: lecturer.prodi
    })
  } catch (error) {
    console.error("Get user prodi error:", error)
    return NextResponse.json(
      { error: "Failed to get prodi information" },
      { status: 500 }
    )
  }
}
