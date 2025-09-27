import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const createStudentSchema = z.object({
  userId: z.string(),
  nim: z.string(),
  major: z.string(),
  department: z.string(),
  semester: z.number().int().min(1).max(14),
  academicYear: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  guardian: z.any().optional(),
  enrollDate: z.string().datetime(),
  gpa: z.number().min(0).max(4).optional()
})

// GET /api/students
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check permission
    if (!hasPermission(token.role as string, 'read', 'students')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const department = searchParams.get('department')
    const major = searchParams.get('major')
    const semester = searchParams.get('semester')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {}

    if (department) {
      where.department = department
    }

    if (major) {
      where.major = major
    }

    if (semester) {
      where.semester = parseInt(semester)
    }

    if (search) {
      where.OR = [
        { nim: { contains: search, mode: 'insensitive' } },
        { user: { name: { contains: search, mode: 'insensitive' } } }
      ]
    }

    const [students, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              isActive: true
            }
          }
        },
        orderBy: { enrollDate: 'desc' }
      }),
      prisma.student.count({ where })
    ])

    return NextResponse.json({
      data: students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/students
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check permission
    if (!hasPermission(token.role as string, 'create', 'students')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createStudentSchema.parse(body)

    // Check if NIM already exists
    const existingStudent = await prisma.student.findUnique({
      where: { nim: validatedData.nim }
    })

    if (existingStudent) {
      return NextResponse.json({ error: 'NIM already exists' }, { status: 400 })
    }

    // Check if user exists and doesn't already have a student profile
    const user = await prisma.user.findUnique({
      where: { id: validatedData.userId },
      include: { studentProfile: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.studentProfile) {
      return NextResponse.json({ error: 'User already has a student profile' }, { status: 400 })
    }

    const student = await prisma.student.create({
      data: {
        ...validatedData,
        enrollDate: new Date(validatedData.enrollDate)
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            isActive: true
          }
        }
      }
    })

    return NextResponse.json(student, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating student:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}