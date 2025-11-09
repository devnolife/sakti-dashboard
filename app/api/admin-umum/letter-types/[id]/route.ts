import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"

// GET - Fetch single letter type
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const letterType = await prisma.letter_types.findUnique({
      where: { id: params.id },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      }
    })

    if (!letterType) {
      return NextResponse.json(
        { error: "Letter type not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: letterType
    })
  } catch (error) {
    console.error("Error fetching letter type:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch letter type" },
      { status: 500 }
    )
  }
}

// PUT - Update letter type
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
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
        { error: "Forbidden - Only Admin Umum can update letter types" },
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
      is_active,
      template
    } = body

    // Check if letter type exists
    const existing = await prisma.letter_types.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Letter type not found" },
        { status: 404 }
      )
    }

    // Check if new title conflicts with another record
    if (title && title !== existing.title) {
      const titleConflict = await prisma.letter_types.findUnique({
        where: { title }
      })

      if (titleConflict) {
        return NextResponse.json(
          { error: "Letter type with this title already exists" },
          { status: 409 }
        )
      }
    }

    const letterType = await prisma.letter_types.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(approval_role && { approval_role }),
        ...(estimated_days && { estimated_days: parseInt(estimated_days) }),
        ...(required_documents && { required_documents }),
        ...(additional_fields !== undefined && { additional_fields }),
        ...(prodi_id !== undefined && { prodi_id }),
        ...(is_global !== undefined && { is_global }),
        ...(is_active !== undefined && { is_active }),
        ...(template !== undefined && { template })
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
      message: "Letter type updated successfully",
      data: letterType
    })

  } catch (error) {
    console.error("Error updating letter type:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update letter type" },
      { status: 500 }
    )
  }
}

// DELETE - Delete letter type
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
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
        { error: "Forbidden - Only Admin Umum can delete letter types" },
        { status: 403 }
      )
    }

    // Check if letter type exists
    const existing = await prisma.letter_types.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json(
        { error: "Letter type not found" },
        { status: 404 }
      )
    }

    // Soft delete - set is_active to false instead of actual deletion
    await prisma.letter_types.update({
      where: { id: params.id },
      data: { is_active: false }
    })

    return NextResponse.json({
      success: true,
      message: "Letter type deactivated successfully"
    })

  } catch (error) {
    console.error("Error deleting letter type:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete letter type" },
      { status: 500 }
    )
  }
}
