import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'
import { generateId } from '@/lib/utils'

const addCourseSchema = z.object({
  course_id: z.string(),
  is_mandatory: z.boolean().default(true),
  semester: z.number().int().min(1).max(14)
})

// GET /api/admin/curriculum/[id]/courses
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'curriculum')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check curriculum exists
    const curriculum = await prisma.curriculum.findUnique({
      where: { id: params.id },
      select: { prodi_id: true }
    })

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id && curriculum.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const courses = await prisma.curriculum_courses.findMany({
      where: { curriculum_id: params.id },
      include: {
        courses: {
          select: {
            id: true,
            code: true,
            name: true,
            description: true,
            credits: true,
            semester: true
          }
        }
      },
      orderBy: {
        semester: 'asc'
      }
    })

    return NextResponse.json({ data: courses })
  } catch (error) {
    console.error('Error fetching curriculum courses:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/curriculum/[id]/courses - Add course to curriculum
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'curriculum')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check curriculum exists
    const curriculum = await prisma.curriculum.findUnique({
      where: { id: params.id }
    })

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id && curriculum.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = addCourseSchema.parse(body)

    // Check if course already exists in curriculum
    const existing = await prisma.curriculum_courses.findFirst({
      where: {
        curriculum_id: params.id,
        course_id: validatedData.course_id
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'Course already exists in this curriculum' }, { status: 400 })
    }

    const curriculumCourse = await prisma.curriculum_courses.create({
      data: {
        id: generateId(),
        curriculum_id: params.id,
        ...validatedData
      },
      include: {
        courses: true
      }
    })

    return NextResponse.json(curriculumCourse, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error adding course to curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/curriculum/[id]/courses/[courseId]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'curriculum')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const course_id = searchParams.get('course_id')

    if (!course_id) {
      return NextResponse.json({ error: 'course_id is required' }, { status: 400 })
    }

    // Check curriculum exists
    const curriculum = await prisma.curriculum.findUnique({
      where: { id: params.id }
    })

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id && curriculum.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.curriculum_courses.deleteMany({
      where: {
        curriculum_id: params.id,
        course_id: course_id
      }
    })

    return NextResponse.json({ message: 'Course removed from curriculum successfully' })
  } catch (error) {
    console.error('Error removing course from curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

