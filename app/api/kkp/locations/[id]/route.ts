import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth-middleware"
import { getHardcodedUserId } from "@/lib/auth-utils"

// DELETE - Hapus lokasi KKP (hanya yang dibuat oleh mahasiswa)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // For development: use hardcoded user ID
    const isDevelopment = process.env.NODE_ENV === 'development'
    let userId: string
    
    if (isDevelopment) {
      userId = getHardcodedUserId()
    } else {
      const token = await authMiddleware(request)
      if (token instanceof NextResponse) {
        return token
      }
      userId = token.sub
    }

    const locationId = params.id

    // Find the location and check ownership
    const location = await prisma.kkpLocation.findUnique({
      where: { id: locationId },
      include: {
        createdBy: {
          select: {
            userId: true,
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
    if (location.createdBy.userId !== userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Anda tidak dapat menghapus lokasi KKP karena bukan Anda yang membuatnya",
        },
        { status: 403 }
      )
    }

    // Delete the location (this will cascade delete sub-locations and documents)
    await prisma.kkpLocation.delete({
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

    const location = await prisma.kkpLocation.findUnique({
      where: { 
        id: locationId,
        isActive: true,
      },
      include: {
        company: true,
        createdBy: {
          select: {
            id: true,
            nim: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        subLocations: true,
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            uploadDate: true,
            status: true,
            fileSize: true,
            mimeType: true,
          },
        },
        _count: {
          select: {
            documents: true,
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
    const existingLocation = await prisma.kkpLocation.findUnique({
      where: { id: locationId },
      include: {
        createdBy: {
          select: {
            userId: true,
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
    if (existingLocation.createdBy.userId !== token.sub) {
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
      const updatedLocation = await tx.kkpLocation.update({
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
          contactPerson,
          contactEmail,
          contactPhone,
          description,
          companyId,
        },
      })

      // Delete existing sub-locations
      await tx.kkpSubLocation.deleteMany({
        where: { locationId },
      })

      // Create new sub-locations if provided
      if (subLocations.length > 0) {
        await tx.kkpSubLocation.createMany({
          data: subLocations.map((subLoc: any) => ({
            ...subLoc,
            locationId,
          })),
        })
      }

      // Fetch the complete updated location with relations
      return await tx.kkpLocation.findUnique({
        where: { id: locationId },
        include: {
          company: true,
          createdBy: {
            select: {
              id: true,
              nim: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
          subLocations: true,
          _count: {
            select: {
              documents: true,
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
