import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerAuthSession } from "@/lib/auth"

// GET - Fetch all correspondence requests for the logged-in student
export async function GET(request: NextRequest) {
  try {
    const session = await getServerAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get student record
    const student = await prisma.students.findUnique({
      where: { user_id: session.user.id },
      select: { id: true }
    })

    if (!student) {
      return NextResponse.json(
        { error: "Student record not found" },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where: any = { student_id: student.id }
    if (status) {
      where.status = status
    }

    const requests = await prisma.correspondence_requests.findMany({
      where,
      include: {
        letter_types: {
          select: {
            id: true,
            title: true,
            approval_role: true,
            estimated_days: true,
          }
        },
        approver: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: requests
    })
  } catch (error) {
    console.error("Error fetching correspondence requests:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch requests" },
      { status: 500 }
    )
  }
}

// POST - Create new correspondence request
export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get student record
    const student = await prisma.students.findUnique({
      where: { user_id: session.user.id },
      select: { id: true }
    })

    if (!student) {
      return NextResponse.json(
        { error: "Student record not found" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { letter_type_id, form_data, attachments } = body

    // Validation
    if (!letter_type_id || !form_data) {
      return NextResponse.json(
        { error: "Missing required fields: letter_type_id, form_data" },
        { status: 400 }
      )
    }

    // Verify letter type exists and is active
    const letterType = await prisma.letter_types.findUnique({
      where: { id: letter_type_id, is_active: true }
    })

    if (!letterType) {
      return NextResponse.json(
        { error: "Letter type not found or inactive" },
        { status: 404 }
      )
    }

    // Create correspondence request
    const newRequest = await prisma.correspondence_requests.create({
      data: {
        id: `cr-${Date.now()}`,
        letter_type_id,
        student_id: student.id,
        form_data,
        attachments: attachments || null,
        status: "pending"
      },
      include: {
        letter_types: {
          select: {
            title: true,
            approval_role: true,
            estimated_days: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: "Pengajuan surat berhasil dibuat",
      data: newRequest
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating correspondence request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create request" },
      { status: 500 }
    )
  }
}
