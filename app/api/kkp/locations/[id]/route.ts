import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth-middleware"
import { getServerActionUserId } from "@/lib/auth-utils"

// DELETE - Hapus lokasi KKP (hanya yang dibuat oleh mahasiswa)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) {
      user_id = token.sub
    }
    if (!user_id) {
      try { user_id = await getServerActionUserId() } catch {}
    }
    if (!user_id) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const locationId = params.id

    // Find the location and check ownership
    const location = await prisma.kkp_locations.findUnique({
      where: { id: locationId },
      include: {
        students: {
          select: {
            user_id: true,
          },
        },
      },
    })

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          error: "Location not found",
        },
        { status: 404 }
      )
    }

    // Check if the current user is the creator of this location
    if (location.students.user_id !== user_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Anda tidak dapat menghapus lokasi KKP karena bukan Anda yang membuatnya",
        },
        { status: 403 }
      )
    }

    // Delete the location (this will cascade delete sub-locations and documents)
    await prisma.kkp_locations.delete({
      where: { id: locationId },
    })

    return NextResponse.json({
      success: true,
      message: "Lokasi KKP berhasil dihapus",
    })
  } catch (error) {
    console.error("Error deleting KKP location:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete KKP location",
      },
      { status: 500 }
    )
  }
}

// GET - Ambil detail lokasi KKP spesifik
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const locationId = params.id

    const location = await prisma.kkp_locations.findUnique({
      where: {
        id: locationId,
        is_active: true,
      },
      include: {
        companies: true,
        students: {
          select: {
            id: true,
            nim: true,
            users: {
              select: {
                name: true,
              },
            },
          },
        },
        kkp_sub_locations: true,
        kkp_documents: {
          select: {
            id: true,
            name: true,
            type: true,
            upload_date: true,
            status: true,
            file_size: true,
            mime_type: true,
          },
        },
        _count: {
          select: {
            kkp_documents: true,
          },
        },
      },
    })

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          error: "Location not found",
        },
        { status: 404 }
      )
    }

    // Transform the data to ensure positions is always an array
    const transformedLocation = {
      ...location,
      positions: Array.isArray(location.positions) 
        ? location.positions 
        : (typeof location.positions === 'string' 
          ? JSON.parse(location.positions) 
          : (location.positions as any) || [])
    }

    return NextResponse.json({
      success: true,
      data: transformedLocation,
    })
  } catch (error) {
    console.error("Error fetching KKP location:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KKP location",
      },
      { status: 500 }
    )
  }
}

// PUT - Update lokasi KKP
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) {
      return token
    }

    const locationId = params.id
    const body = await request.json()

    // Find the location and check ownership
    const existingLocation = await prisma.kkp_locations.findUnique({
      where: { id: locationId },
      include: {
        students: {
          select: {
            user_id: true,
          },
        },
      },
    })

    if (!existingLocation) {
      return NextResponse.json(
        {
          success: false,
          error: "Location not found",
        },
        { status: 404 }
      )
    }

    // Check if the current user is the creator of this location
    if (existingLocation.students.user_id !== token.sub) {
      return NextResponse.json(
        {
          success: false,
          error: "You can only update locations you created",
        },
        { status: 403 }
      )
    }

    const {
      name,
      address,
      city,
      province,
      industry,
      positions,
      quota,
      contactPerson,
      contactEmail,
      contactPhone,
      description,
      companyId,
      subLocations = [],
    } = body

    // Update the location with sub-locations in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update the main location
      const updatedLocation = await tx.kkp_locations.update({
        where: { id: locationId },
        data: {
          name,
          address,
          city,
          province,
          industry,
          positions,
          quota,
          remaining: quota, // Reset remaining when quota changes
          contact_person: contactPerson,
          contact_email: contactEmail,
          contact_phone: contactPhone,
          description,
          company_id: companyId,
        },
      })

      // Delete existing sub-locations
      await tx.kkp_sub_locations.deleteMany({
        where: { location_id: locationId },
      })

      // Create new sub-locations if provided
      if (subLocations.length > 0) {
        await tx.kkp_sub_locations.createMany({
          data: subLocations.map((subLoc: any) => ({
            ...subLoc,
            location_id: locationId,
          })),
        })
      }

      // Fetch the complete updated location with relations
      return await tx.kkp_locations.findUnique({
        where: { id: locationId },
        include: {
          companies: true,
          students: {
            select: {
              id: true,
              nim: true,
              users: {
                select: {
                  name: true,
                },
              },
            },
          },
          kkp_sub_locations: true,
          _count: {
            select: {
              kkp_documents: true,
            },
          },
        },
      })
    })

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error("Error updating KKP location:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update KKP location",
      },
      { status: 500 }
    )
  }
}
