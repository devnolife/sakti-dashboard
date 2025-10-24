import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'
import { z } from 'zod'
import { generateId } from '@/lib/utils'

const createTitleSchema = z.object({
  title: z.string().min(10),
  abstract: z.string().min(20),
  keywords: z.array(z.string()).optional(),
  department: z.string().optional(),
  student_id: z.string(),
  year: z.number().int().min(2020)
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
      supervisor_id: lecturer.id
    }

    // If lecturer has homebase prodi, filter by that prodi
    if (lecturer.prodi_id && lecturer.is_homebase) {
      whereClause.prodi_id = lecturer.prodi_id
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
            },
            prodi: {
              select: {
                kode: true,
                nama: true
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
        },
        prodi: {
          select: {
            kode: true,
            nama: true,
            jenjang: true
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
      abstract: title.abstract,
      keywords: title.keywords || [],
      status: title.status,
      year: title.year,
      department: title.department,
      prodi: title.prodi,
      student: title.students ? {
        id: title.students.id,
        nim: title.students.nim,
        name: title.students.users.name,
        avatar: title.students.users.avatar,
        prodi: title.students.prodi
      } : null,
      supervisor: title.lecturers ? {
        id: title.lecturers.id,
        name: title.lecturers.users.name
      } : null,
      submission_date: title.submission_date,
      created_at: title.created_at,
      updated_at: title.updated_at
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

    // Get student to populate prodi_id
    const student = await prisma.students.findUnique({
      where: { id: validatedData.student_id },
      select: { prodi_id: true }
    })

    const thesisTitle = await prisma.thesis_titles.create({
      data: {
        id: generateId(),
        author_id: validatedData.student_id,
        supervisor_id: lecturer.id,
        title: validatedData.title,
        abstract: validatedData.abstract,
        keywords: validatedData.keywords || [],
        department: validatedData.department,
        prodi_id: student?.prodi_id || lecturer.prodi_id,
        year: validatedData.year,
        status: 'pending',
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
        },
        students: {
          include: {
            users: {
              select: {
                name: true
              }
            }
          }
        },
        prodi: {
          select: {
            kode: true,
            nama: true
          }
        }
      }
    })

    return NextResponse.json({
      id: thesisTitle.id,
      title: thesisTitle.title,
      abstract: thesisTitle.abstract,
      keywords: thesisTitle.keywords,
      department: thesisTitle.department,
      status: thesisTitle.status,
      prodi: thesisTitle.prodi,
      supervisor: thesisTitle.lecturers ? {
        id: thesisTitle.lecturers.id,
        name: thesisTitle.lecturers.users.name
      } : null,
      student: thesisTitle.students ? {
        id: thesisTitle.students.id,
        nim: thesisTitle.students.nim,
        name: thesisTitle.students.users.name
      } : null,
      created_at: thesisTitle.created_at
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating thesis title:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
