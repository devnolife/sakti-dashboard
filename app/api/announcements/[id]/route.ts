import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware } from '@/lib/auth-middleware'
import { z } from 'zod'

const updateAnnouncementSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  published: z.boolean().optional(),
  expires_at: z.string().datetime().optional().nullable()
})

// GET /api/announcements/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const announcement = await prisma.announcements.findUnique({
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

    if (!announcement) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }

    // Check if user can view this announcement
    if (!announcement.is_global && announcement.prodi_id !== token.prodi_id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('Error fetching announcement:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/announcements/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!['admin', 'prodi'].includes(token.role as string)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if announcement exists
    const existing = await prisma.announcements.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }

    // Prodi can only edit their own announcements
    if (token.role === 'prodi' && existing.created_by !== token.userId) {
      return NextResponse.json({ error: 'Forbidden - Can only edit your own announcements' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateAnnouncementSchema.parse(body)

    const updateData: any = { ...validatedData }

    // If publishing for the first time, set published_at
    if (validatedData.published && !existing.published) {
      updateData.published_at = new Date()
    }

    // Handle expires_at
    if (validatedData.expires_at !== undefined) {
      updateData.expires_at = validatedData.expires_at ? new Date(validatedData.expires_at) : null
    }

    const announcement = await prisma.announcements.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(announcement)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating announcement:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/announcements/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!['admin', 'prodi'].includes(token.role as string)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if announcement exists
    const existing = await prisma.announcements.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 })
    }

    // Prodi can only delete their own announcements
    if (token.role === 'prodi' && existing.created_by !== token.userId) {
      return NextResponse.json({ error: 'Forbidden - Can only delete your own announcements' }, { status: 403 })
    }

    await prisma.announcements.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Announcement deleted successfully' })
  } catch (error) {
    console.error('Error deleting announcement:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

