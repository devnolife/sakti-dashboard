import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import { generateId } from '@/lib/utils'

const createCurriculumSchema = z.object({
  prodi_id: z.string(),
  name: z.string().min(3),
  academic_year: z.string(),
  semester: z.number().int().min(1).max(14),
  is_active: z.boolean().default(true)
})

// GET /api/admin/curriculum
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'curriculum')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const prodi_id = searchParams.get('prodi_id')
    const is_active = searchParams.get('is_active')
    const academic_year = searchParams.get('academic_year')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const skip = (page - 1) * limit

    const where: any = {}

    // Prodi role can only see their own curriculum
    if (token.role === 'prodi' && token.prodi_id) {
      where.prodi_id = token.prodi_id
    } else if (prodi_id) {
      where.prodi_id = prodi_id
    }

    if (is_active !== null) {
      where.is_active = is_active === 'true'
    }

    if (academic_year) {
      where.academic_year = academic_year
    }

    const [curriculums, total] = await Promise.all([
      prisma.curriculum.findMany({
        where,
        skip,
        take: limit,
        include: {
          prodi: {
            select: {
              kode: true,
              nama: true,
              jenjang: true,
              fakultas: true
            }
          },
          curriculum_courses: {
            include: {
              courses: {
                select: {
                  id: true,
                  code: true,
                  name: true,
                  credits: true
                }
              }
            }
          }
        },
        orderBy: [
          { is_active: 'desc' },
          { created_at: 'desc' }
        ]
      }),
      prisma.curriculum.count({ where })
    ])

    return NextResponse.json({
      data: curriculums,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/curriculum
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'curriculum')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createCurriculumSchema.parse(body)

    // If role is prodi, ensure they can only create for their own prodi
    if (token.role === 'prodi' && token.prodi_id) {
      if (validatedData.prodi_id !== token.prodi_id) {
        return NextResponse.json({ error: 'Forbidden - Can only create curriculum for your own prodi' }, { status: 403 })
      }
    }

    const curriculum = await prisma.curriculum.create({
      data: {
        id: generateId(),
        ...validatedData
      },
      include: {
        prodi: {
          select: {
            kode: true,
            nama: true,
            jenjang: true,
            fakultas: true
          }
        }
      }
    })

    return NextResponse.json(curriculum, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

