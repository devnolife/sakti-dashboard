import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authMiddleware } from "@/lib/auth-middleware"
import { getServerActionUserId } from "@/lib/auth-utils"

// GET - Ambil semua lokasi KKP yang tersedia
export async function GET() {
  try {
    const locations = await prisma.kkpLocation.findMany({
      where: {
        is_active: true,
      },
      include: {
        company: true,
        createdBy: {
          select: {
            id: true,
            nim: true,
            user_id: true,
            user: {
              select: {
                id: true,
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
      orderBy: {
        created_at: "desc",
      },
    })

    // Transform the data to ensure positions is always an array
    const transformedLocations = locations.map(location => ({
      ...location,
      positions: Array.isArray(location.positions) 
        ? location.positions 
        : (typeof location.positions === 'string' 
          ? JSON.parse(location.positions) 
          : (location.positions as any) || [])
    }))

    return NextResponse.json({
      success: true,
      data: transformedLocations,
    })
  } catch (error) {
    console.error("Error fetching KKP locations:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch KKP locations",
      },
      { status: 500 }
    )
  }
}

// POST - Tambah lokasi KKP baru
export async function POST(request: NextRequest) {
  try {
    // Gunakan authMiddleware terlebih dahulu (Bearer / NextAuth)
    let user_id: string | null = null
    const token = await authMiddleware(request)
    if (!(token instanceof NextResponse)) {
      user_id = token.sub
    }
    // Fallback ke cookie JWT server action helper bila authMiddleware gagal (token adalah NextResponse)
    if (!userId) {
      try { user_id = await getServerActionUserId() } catch {}
    }
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    
    // Check if user is a student
    const student = await prisma.students.findUnique({
      where: { user_id },
    })

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          error: "Only students can create KKP locations",
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    console.log('🔍 Frontend POST data received:', JSON.stringify(body, null, 2))
    
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

    // Validate required fields
    if (!name || !address || !city || !industry) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, address, city, and industry are required",
        },
        { status: 400 }
      )
    }

    // Clean up optional fields - convert empty strings to null
    const cleanCompanyId = companyId && companyId.trim() ? companyId : null
    const cleanProvince = province && province.trim() ? province : null
    const cleanContactPerson = contactPerson && contactPerson.trim() ? contactPerson : null
    const cleanContactEmail = contactEmail && contactEmail.trim() ? contactEmail : null
    const cleanContactPhone = contactPhone && contactPhone.trim() ? contactPhone : null
    const cleanDescription = description && description.trim() ? description : null

    // Check for duplicate location (same name and address)
    const existingLocation = await prisma.kkpLocation.findFirst({
      where: {
        name,
        address,
      },
    })

    if (existingLocation) {
      return NextResponse.json(
        {
          success: false,
          error: "A location with the same name and address already exists",
        },
        { status: 400 }
      )
    }

    // Create the location with sub-locations in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const location = await tx.kkpLocation.create({
        data: {
          name,
          address,
          city,
          province: cleanProvince,
          industry,
          positions,
          quota: quota || 0,
          remaining: quota || 0,
          contactPerson: cleanContactPerson,
          contactEmail: cleanContactEmail,
          contactPhone: cleanContactPhone,
          description: cleanDescription,
          companyId: cleanCompanyId,
          createdById: student.id,
        },
      })

      // Create sub-locations if provided
      if (subLocations.length > 0) {
        await tx.kkpSubLocation.createMany({
          data: subLocations.map((subLoc: any) => ({
            ...subLoc,
            locationId: location.id,
          })),
        })
      }

      // Fetch the complete location with relations
      return await tx.kkpLocation.findUnique({
        where: { id: location.id },
        include: {
          company: true,
          createdBy: {
            select: {
              id: true,
              nim: true,
              user_id: true,
              user: {
                select: {
                  id: true,
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

    // Transform the result to ensure positions is always an array
    const transformedResult = result ? {
      ...result,
      positions: Array.isArray(result.positions) 
        ? result.positions 
        : (typeof result.positions === 'string' 
          ? JSON.parse(result.positions) 
          : (result.positions as any) || [])
    } : null

    return NextResponse.json({
      success: true,
      data: transformedResult,
    })
  } catch (error) {
    console.error("Error creating KKP location:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create KKP location",
      },
      { status: 500 }
    )
  }
}
