import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'

// DELETE /api/admin/reading-room-admins/[id] - Remove admin assignment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'reading_room_admins')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if assignment exists
    const existing = await prisma.reading_room_admins.findUnique({
      where: { id: params.id }
    })

    if (!existing) {
      return NextResponse.json({ error: 'Admin assignment not found' }, { status: 404 })
    }

    // Check permission for prodi role
    if (token.role === 'prodi' && token.prodi_id) {
      if (existing.prodi_id && existing.prodi_id !== token.prodi_id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    await prisma.reading_room_admins.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Admin assignment removed successfully' })
  } catch (error) {
    console.error('Error removing reading room admin:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

