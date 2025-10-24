import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import { generateId } from '@/lib/utils'

const createClassroomSchema = z.object({
  name: z.string().min(1),
  building: z.string().min(1),
  floor: z.number().int().optional(),
  capacity: z.number().int().min(1),
  prodi_id: z.string().optional(),
  is_available: z.boolean().default(true),
  facilities: z.array(z.string()).default([])
})

// GET /api/admin/classrooms
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'classrooms')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const prodi_id = searchParams.get('prodi_id')
    const building = searchParams.get('building')
    const is_available = searchParams.get('is_available')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const skip = (page - 1) * limit

    const where: any = {}

    // Prodi role can only see their own classrooms or shared ones
    if (token.role === 'prodi' && token.prodi_id) {
      where.OR = [
        { prodi_id: token.prodi_id },
        { prodi_id: null } // Shared classrooms
      ]
    } else if (prodi_id) {
      where.prodi_id = prodi_id
    }

    if (building) {
      where.building = building
    }

    if (is_available !== null) {
      where.is_available = is_available === 'true'
    }

    const [classrooms, total] = await Promise.all([
      prisma.classrooms.findMany({
        where,
        skip,
        take: limit,
        include: {
          prodi: {
            select: {
              kode: true,
              nama: true,
              jenjang: true
            }
          }
        },
        orderBy: [
          { building: 'asc' },
          { floor: 'asc' },
          { name: 'asc' }
        ]
      }),
      prisma.classrooms.count({ where })
    ])

    return NextResponse.json({
      data: classrooms,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching classrooms:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/classrooms
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'classrooms')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createClassroomSchema.parse(body)

    // If role is prodi, auto-assign prodi_id
    if (token.role === 'prodi' && token.prodi_id) {
      validatedData.prodi_id = token.prodi_id
    }

    const classroom = await prisma.classrooms.create({
      data: {
        id: generateId(),
        ...validatedData
      },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true,
            jenjang: true
          }
        }
      }
    })

    return NextResponse.json(classroom, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating classroom:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

