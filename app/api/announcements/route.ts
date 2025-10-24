import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import { generateId } from '@/lib/utils'

const createAnnouncementSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  prodi_id: z.string().optional(),
  is_global: z.boolean().default(false),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  published: z.boolean().default(false),
  expires_at: z.string().datetime().optional()
})

// GET /api/announcements - Get announcements (global + user's prodi)
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const priority = searchParams.get('priority')
    const prodi_id = searchParams.get('prodi_id')

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      published: true,
      OR: []
    }

    // Always show global announcements
    where.OR.push({ is_global: true })

    // If user has prodi_id (from token or student/lecturer profile), show prodi-specific announcements
    if (token.prodi_id) {
      where.OR.push({ prodi_id: token.prodi_id })
    } else if (prodi_id) {
      where.OR.push({ prodi_id })
    }

    // Filter by priority if specified
    if (priority) {
      where.priority = priority
    }

    // Only show non-expired announcements or those without expiry
    where.OR.push(
      { expires_at: null },
      { expires_at: { gte: new Date() } }
    )

    const [announcements, total] = await Promise.all([
      prisma.announcements.findMany({
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
          { priority: 'desc' },
          { published_at: 'desc' }
        ]
      }),
      prisma.announcements.count({ where })
    ])

    return NextResponse.json({
      data: announcements,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/announcements - Create announcement (admin/prodi)
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Only admin and prodi can create announcements
    if (!['admin', 'prodi'].includes(token.role as string)) {
      return NextResponse.json({ error: 'Forbidden - Admin or Prodi access required' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createAnnouncementSchema.parse(body)

    // If role is prodi, auto-assign prodi_id and prevent is_global
    if (token.role === 'prodi') {
      if (!token.prodi_id) {
        return NextResponse.json({ error: 'Prodi ID not found in session' }, { status: 400 })
      }
      validatedData.prodi_id = token.prodi_id
      validatedData.is_global = false
    }

    const announcement = await prisma.announcements.create({
      data: {
        id: generateId(),
        ...validatedData,
        created_by: token.userId,
        published_at: validatedData.published ? new Date() : null,
        expires_at: validatedData.expires_at ? new Date(validatedData.expires_at) : null
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

    return NextResponse.json(announcement, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating announcement:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

