import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'
import { z } from 'zod'

const createTitleSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(20),
  keywords: z.array(z.string()).optional(),
  requiredSkills: z.array(z.string()).optional(),
  maxStudents: z.number().min(1).max(3).default(1),
  category: z.string().optional(),
})

// GET /api/dosen/thesis-titles - Get thesis title recommendations
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (token.role !== 'dosen') {
      return NextResponse.json({ error: 'Forbidden - Dosen access only' }, { status: 403 })
    }

    // Get lecturer profile
    const lecturer = await prisma.lecturers.findFirst({
      where: {
        users: {
          id: token.sub
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') // 'available', 'taken', 'all'
    const search = searchParams.get('search')

    const whereClause: any = {
      lecturer_id: lecturer.id
    }

    if (status === 'available') {
      whereClause.status = 'available'
    } else if (status === 'taken') {
      whereClause.status = {
        in: ['approved', 'in_progress', 'completed']
      }
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const thesisTitles = await prisma.thesis_titles.findMany({
      where: whereClause,
      include: {
        students: {
          include: {
            users: {
              select: {
                name: true,
                avatar: true
              }
            }
          }
        },
        lecturers: {
          include: {
            users: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        { status: 'asc' },
        { created_at: 'desc' }
      ]
    })

    const formattedTitles = thesisTitles.map(title => ({
      id: title.id,
      title: title.title,
      description: title.description,
      keywords: title.keywords || [],
      requiredSkills: title.requiredSkills || [],
      maxStudents: title.maxStudents || 1,
      category: title.category,
      status: title.status,
      student: title.students ? {
        id: title.students.id,
        nim: title.students.nim,
        name: title.students.users.name,
        avatar: title.students.users.avatar
      } : null,
      lecturer: {
        id: title.lecturers.id,
        name: title.lecturers.users.name
      },
      submission_date: title.submissionDate,
      approvalDate: title.approvalDate,
      created_at: title.createdAt,
      updated_at: title.updatedAt
    }))

    // Summary statistics
    const summary = {
      total: formattedTitles.length,
      available: formattedTitles.filter(t => t.status === 'available').length,
      taken: formattedTitles.filter(t => ['approved', 'in_progress'].includes(t.status || '')).length,
      completed: formattedTitles.filter(t => t.status === 'completed').length,
      rejected: formattedTitles.filter(t => t.status === 'rejected').length,
    }

    return NextResponse.json({
      data: formattedTitles,
      summary,
      filters: {
        status: status || 'all',
        search: search || null
      }
    })
  } catch (error) {
    console.error('Error fetching thesis titles:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/dosen/thesis-titles - Create new thesis title recommendation
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (token.role !== 'dosen') {
      return NextResponse.json({ error: 'Forbidden - Dosen access only' }, { status: 403 })
    }

    // Get lecturer profile
    const lecturer = await prisma.lecturers.findFirst({
      where: {
        users: {
          id: token.sub
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = createTitleSchema.parse(body)

    const thesisTitle = await prisma.thesis_titles.create({
      data: {
        lecturer_id: lecturer.id,
        title: validatedData.title,
        description: validatedData.description,
        keywords: validatedData.keywords,
        requiredSkills: validatedData.requiredSkills,
        maxStudents: validatedData.maxStudents,
        category: validatedData.category,
        status: 'available',
      },
      include: {
        lecturers: {
          include: {
            users: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      id: thesisTitle.id,
      title: thesisTitle.title,
      description: thesisTitle.description,
      keywords: thesisTitle.keywords,
      requiredSkills: thesisTitle.requiredSkills,
      maxStudents: thesisTitle.maxStudents,
      category: thesisTitle.category,
      status: thesisTitle.status,
      lecturer: {
        id: thesisTitle.lecturers.id,
        name: thesisTitle.lecturers.users.name
      },
      created_at: thesisTitle.createdAt
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating thesis title:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
