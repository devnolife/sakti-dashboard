import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const certificate = await prisma.laboratory_certificates.findUnique({
      where: {
        id: params.id
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

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      )
    }

    // Check if user has access to this certificate (must be from same prodi)
    if (session.user.role === "laboratory_admin") {
      const labAdmin = await prisma.laboratory_admins.findFirst({
        where: {
          user_id: session.user.id
        },
        select: {
          prodi_id: true
        }
      })

      if (!labAdmin || labAdmin.prodi_id !== certificate.prodi_id) {
        return NextResponse.json(
          { error: "Forbidden: Certificate not from your prodi" },
          { status: 403 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      data: certificate
    })

  } catch (error: any) {
    console.error("Error fetching certificate:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch certificate" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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
        { error: "Only laboratory admins can delete certificates" },
        { status: 403 }
      )
    }

    // Get certificate
    const certificate = await prisma.laboratory_certificates.findUnique({
      where: {
        id: params.id
      }
    })

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      )
    }

    // Check if user has access to this certificate (must be from same prodi)
    const labAdmin = await prisma.laboratory_admins.findFirst({
      where: {
        user_id: session.user.id
      },
      select: {
        prodi_id: true
      }
    })

    if (!labAdmin || labAdmin.prodi_id !== certificate.prodi_id) {
      return NextResponse.json(
        { error: "Forbidden: Cannot delete certificate from another prodi" },
        { status: 403 }
      )
    }

    // Delete certificate
    await prisma.laboratory_certificates.delete({
      where: {
        id: params.id
      }
    })

    return NextResponse.json({
      success: true,
      message: "Certificate deleted successfully"
    })

  } catch (error: any) {
    console.error("Error deleting certificate:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete certificate" },
      { status: 500 }
    )
  }
}
