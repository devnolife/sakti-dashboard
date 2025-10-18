import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const letterTypeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  approvalRole: z.enum(['staff_tu', 'prodi', 'dekan', 'none']),
  estimatedDays: z.number().int().min(1).max(30),
  requiredDocuments: z.array(z.string()).default([]),
  additionalFields: z.any().optional(),
  template: z.string().optional(),
  isActive: z.boolean().default(true),
})

// GET /api/admin/letter-types
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const where: any = {}
    if (!includeInactive) {
      where.isActive = true
    }

    const letterTypes = await prisma.letterType.findMany({
      where,
      orderBy: { title: 'asc' }
    })

    return NextResponse.json({ data: letterTypes })
  } catch (error) {
    console.error('Error fetching letter types:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/letter-types
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = letterTypeSchema.parse(body)

    // Check if title already exists
    const existing = await prisma.letterType.findUnique({
      where: { title: validatedData.title }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Letter type with this title already exists' },
        { status: 400 }
      )
    }

    const letterType = await prisma.letterType.create({
      data: validatedData
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: token.sub!,
        action: 'CREATE',
        resource: 'LetterType',
        details: { letterTypeId: letterType.id, title: letterType.title },
      }
    })

    return NextResponse.json(letterType, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating letter type:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/letter-types/:id
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Letter Type ID required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = letterTypeSchema.partial().parse(body)

    const letterType = await prisma.letterType.update({
      where: { id },
      data: validatedData
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: token.sub!,
        action: 'UPDATE',
        resource: 'LetterType',
        details: { letterTypeId: letterType.id, title: letterType.title },
      }
    })

    return NextResponse.json(letterType)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating letter type:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/letter-types/:id
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Letter Type ID required' }, { status: 400 })
    }

    // Check if letter type is being used
    const requestsCount = await prisma.letterRequest.count({
      where: { type: id }
    })

    if (requestsCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete letter type with ${requestsCount} requests. Consider deactivating instead.` },
        { status: 400 }
      )
    }

    const letterType = await prisma.letterType.delete({
      where: { id }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: token.sub!,
        action: 'DELETE',
        resource: 'LetterType',
        details: { letterTypeId: letterType.id, title: letterType.title },
      }
    })

    return NextResponse.json({ success: true, message: 'Letter type deleted' })
  } catch (error) {
    console.error('Error deleting letter type:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
