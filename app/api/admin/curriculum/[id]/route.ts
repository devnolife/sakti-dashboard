import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const updateCurriculumSchema = z.object({
  name: z.string().min(3).optional(),
  academic_year: z.string().optional(),
  semester: z.number().int().min(1).max(14).optional(),
  is_active: z.boolean().optional()
})

// GET /api/admin/curriculum/[id]
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

    const curriculum = await prisma.curriculum.findUnique({
      where: { id: params.id },
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
                description: true,
                credits: true,
                semester: true
              }
            }
          },
          orderBy: {
            semester: 'asc'
          }
        }
      }
    })

    if (!curriculum) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
    }

    // Check if prodi role can access this curriculum
    if (token.role === 'prodi' && token.prodi_id && curriculum.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(curriculum)
  } catch (error) {
    console.error('Error fetching curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/curriculum/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'curriculum')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if curriculum exists and permission
    const existing = await prisma.curriculum.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
    }

    if (token.role === 'prodi' && token.prodi_id && existing.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateCurriculumSchema.parse(body)

    const curriculum = await prisma.curriculum.update({
      where: { id: params.id },
      data: validatedData,
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

    return NextResponse.json(curriculum)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/curriculum/[id]
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

    // Check if curriculum exists and permission
    const existing = await prisma.curriculum.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Curriculum not found' }, { status: 404 })
    }

    if (token.role === 'prodi' && token.prodi_id && existing.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.curriculum.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Curriculum deleted successfully' })
  } catch (error) {
    console.error('Error deleting curriculum:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

