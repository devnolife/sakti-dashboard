import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const createUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.enum(['mahasiswa', 'dosen', 'prodi', 'staff_tu', 'dekan', 'admin', 'laboratory_admin', 'reading_room_admin', 'admin_umum', 'admin_keuangan', 'gkm', 'kepala_tata_usaha']),
  sub_role: z.string().optional(),
  avatar: z.string().optional(),
  is_active: z.boolean().optional()
})

// GET /api/users
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/users - Request received')
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) {
      console.log('Auth middleware returned NextResponse (error)')
      return token
    }

    console.log('Token extracted:', { role: token.role, sub: token.sub })

    // Check permission
    if (!hasPermission(token.role as string, 'read', 'users')) {
      console.log('Permission denied for role:', token.role)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    console.log('Permission granted for role:', token.role)

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
        { username: { contains: search, mode: 'insensitive' } }
      ]
    }

    console.log('Querying database with where clause:', where)

    const [users, total] = await Promise.all([
      prisma.users.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          username: true,
          name: true,
          role: true,
          sub_role: true,
          avatar: true,
          is_active: true,
          created_at: true,
          students: {
            select: {
              nim: true,
              major: true,
              department: true,
              semester: true
            }
          },
          lecturers: {
            select: {
              nip: true,
              department: true,
              position: true,
              specialization: true
            }
          },
          staff: {
            select: {
              nip: true,
              department: true,
              position: true
            }
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.users.count({ where })
    ])

    console.log(`Found ${users.length} users, total: ${total}`)

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

    // Check if username already exists
    const existingUser = await prisma.users.findUnique({
      where: { username: validatedData.username }
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    const user = await prisma.users.create({
      data: {
        ...validatedData,
        password: hashedPassword
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        sub_role: true,
        avatar: true,
        is_active: true,
        created_at: true
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
