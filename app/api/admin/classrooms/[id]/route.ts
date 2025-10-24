import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const updateClassroomSchema = z.object({
  name: z.string().min(1).optional(),
  building: z.string().min(1).optional(),
  floor: z.number().int().optional(),
  capacity: z.number().int().min(1).optional(),
  is_available: z.boolean().optional(),
  facilities: z.array(z.string()).optional()
})

// GET /api/admin/classrooms/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'classrooms')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const classroom = await prisma.classrooms.findUnique({
      where: { id: params.id },
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

    if (!classroom) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id) {
      if (classroom.prodi_id && classroom.prodi_id !== token.prodi_id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    return NextResponse.json(classroom)
  } catch (error) {
    console.error('Error fetching classroom:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/classrooms/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'classrooms')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if classroom exists
    const existing = await prisma.classrooms.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id) {
      if (existing.prodi_id && existing.prodi_id !== token.prodi_id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    const body = await request.json()
    const validatedData = updateClassroomSchema.parse(body)

    const classroom = await prisma.classrooms.update({
      where: { id: params.id },
      data: validatedData,
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

    return NextResponse.json(classroom)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating classroom:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/classrooms/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'classrooms')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if classroom exists
    const existing = await prisma.classrooms.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Classroom not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id) {
      if (existing.prodi_id && existing.prodi_id !== token.prodi_id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    await prisma.classrooms.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Classroom deleted successfully' })
  } catch (error) {
    console.error('Error deleting classroom:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

