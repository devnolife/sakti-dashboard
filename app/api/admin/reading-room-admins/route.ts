import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import { generateId } from '@/lib/utils'

const assignAdminSchema = z.object({
  user_id: z.string(),
  prodi_id: z.string().optional(),
  is_primary: z.boolean().default(false)
})

// GET /api/admin/reading-room-admins
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'reading_room_admins')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const prodi_id = searchParams.get('prodi_id')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const skip = (page - 1) * limit

    const where: any = {}

    // Prodi role can only see admins for their prodi
    if (token.role === 'prodi' && token.prodi_id) {
      where.prodi_id = token.prodi_id
    } else if (prodi_id) {
      where.prodi_id = prodi_id
    }

    const [admins, total] = await Promise.all([
      prisma.reading_room_admins.findMany({
        where,
        skip,
        take: limit,
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
              role: true,
              is_active: true
            }
          },
          prodi: {
            select: {
              kode: true,
              nama: true,
              jenjang: true,
              fakultas: true
            }
          }
        },
        orderBy: [
          { is_primary: 'desc' },
          { assigned_at: 'desc' }
        ]
      }),
      prisma.reading_room_admins.count({ where })
    ])

    return NextResponse.json({
      data: admins,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching reading room admins:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/reading-room-admins - Assign admin to prodi
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'reading_room_admins')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = assignAdminSchema.parse(body)

    // Check if user exists
    const user = await prisma.users.findUnique({
      where: { id: validatedData.user_id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // If role is prodi, auto-assign prodi_id
    if (token.role === 'prodi' && token.prodi_id) {
      validatedData.prodi_id = token.prodi_id
    }

    // Check if assignment already exists
    const existing = await prisma.reading_room_admins.findFirst({
      where: {
        user_id: validatedData.user_id,
        prodi_id: validatedData.prodi_id
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'User is already assigned to this prodi' }, { status: 400 })
    }

    const admin = await prisma.reading_room_admins.create({
      data: {
        id: generateId(),
        user_id: validatedData.user_id,
        prodi_id: validatedData.prodi_id,
        is_primary: validatedData.is_primary,
        assigned_by: token.userId
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
            role: true
          }
        },
        prodi: {
          select: {
            kode: true,
            nama: true,
            jenjang: true
          }
        }
      }
    })

    return NextResponse.json(admin, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error assigning reading room admin:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

