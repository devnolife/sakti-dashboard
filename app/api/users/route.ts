import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const createUserSchema = z.object({
  nidn: z.string().min(1),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['mahasiswa', 'dosen', 'prodi', 'staff_tu', 'dekan', 'admin', 'laboratory_admin', 'reading_room_admin', 'admin_umum', 'admin_keuangan', 'gkm', 'kepala_tata_usaha']),
  subRole: z.string().optional(),
  avatar: z.string().optional()
})

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check permission
    if (!hasPermission(token.role as string, 'read', 'users')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const role = searchParams.get('role')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}

    if (role) {
      where.role = role
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nidn: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          nidn: true,
          name: true,
          role: true,
          subRole: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          studentProfile: {
            select: {
              nim: true,
              major: true,
              department: true,
              semester: true
            }
          },
          lecturerProfile: {
            select: {
              nip: true,
              department: true,
              position: true,
              specialization: true
            }
          },
          staffProfile: {
            select: {
              nip: true,
              department: true,
              position: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ])

    return NextResponse.json({
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check permission
    if (!hasPermission(token.role as string, 'create', 'users')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createUserSchema.parse(body)

    // Check if NIDN already exists
    const existingUser = await prisma.user.findUnique({
      where: { nidn: validatedData.nidn }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'NIDN already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword
      },
      select: {
        id: true,
        nidn: true,
        name: true,
        role: true,
        subRole: true,
        avatar: true,
        isActive: true,
        createdAt: true
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}