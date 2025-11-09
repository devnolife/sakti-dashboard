import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerAuthSession } from "@/lib/auth"

// GET - Fetch all letter types
export async function GET(request: NextRequest) {
  try {
    const session = await getServerAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get("isActive")
    const prodiId = searchParams.get("prodiId")

    const where: any = {}

    if (isActive !== null) {
      where.is_active = isActive === "true"
    }

    if (prodiId) {
      where.OR = [
        { prodi_id: prodiId },
        { is_global: true }
      ]
    }

    const letterTypes = await prisma.letter_types.findMany({
      where,
      include: {
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

// POST - Create new letter type
export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin-umum
    const user = await prisma.users.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (user?.role !== "admin_umum") {
      return NextResponse.json(
        { error: "Forbidden - Only Admin Umum can create letter types" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      title,
      description,
      approval_role,
      estimated_days,
      required_documents,
      additional_fields,
      prodi_id,
      is_global,
      template
    } = body

    // Validation
    if (!title || !description || !approval_role || !estimated_days) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if title already exists
    const existing = await prisma.letter_types.findUnique({
      where: { title }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Letter type with this title already exists" },
        { status: 409 }
      )
    }

    const letterType = await prisma.letter_types.create({
      data: {
        id: `lt-${Date.now()}`,
        title,
        description,
        approval_role,
        estimated_days: parseInt(estimated_days),
        required_documents: required_documents || [],
        additional_fields: additional_fields || null,
        prodi_id: prodi_id || null,
        is_global: is_global || false,
        is_active: true,
        template: template || null
      },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: "Letter type created successfully",
      data: letterType
    }, { status: 201 })

  } catch (error) {
    console.error("Error creating letter type:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create letter type" },
      { status: 500 }
    )
  }
}
