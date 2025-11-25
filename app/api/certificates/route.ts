import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user is laboratory_admin
    if (session.user.role !== "laboratory_admin") {
      return NextResponse.json(
        { error: "Only laboratory admins can view certificates" },
        { status: 403 }
      )
    }

    // Get prodi from laboratory_admin
    const labAdmin = await prisma.laboratory_admins.findFirst({
      where: {
        user_id: session.user.id
      },
      select: {
        prodi_id: true
      }
    })

    if (!labAdmin || !labAdmin.prodi_id) {
      return NextResponse.json(
        { error: "Laboratory admin prodi not found" },
        { status: 404 }
      )
    }

    // Get query parameters for pagination and filtering
    const searchParams = req.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      prodi_id: labAdmin.prodi_id
    }

    if (search) {
      where.OR = [
        { participant_name: { contains: search, mode: "insensitive" } },
        { program_name: { contains: search, mode: "insensitive" } },
        { certificate_title: { contains: search, mode: "insensitive" } },
        { verification_id: { contains: search, mode: "insensitive" } }
      ]
    }

    // Get total count
    const total = await prisma.laboratory_certificates.count({ where })

    // Get certificates with pagination
    const certificates = await prisma.laboratory_certificates.findMany({
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
        created_at: "desc"
      },
      skip,
      take: limit
    })

    return NextResponse.json({
      success: true,
      data: certificates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })

  } catch (error: any) {
    console.error("Error fetching certificates:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch certificates" },
      { status: 500 }
    )
  }
}
