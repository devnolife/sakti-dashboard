import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasRole } from '@/lib/auth-middleware'
import { z } from 'zod'

const bookCategorySchema = z.object({
  code: z.string().min(1).max(10),
  name: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().optional(),
  isActive: z.boolean().optional()
})

const bookCategoryUpdateSchema = bookCategorySchema.partial()

type BookCategoryPayload = z.infer<typeof bookCategoryUpdateSchema>

type BookCategoryRecord = {
  id: string
  code: string
  name: string
  description: string | null
  is_active: boolean
  _count?: { books: number }
}

const normalizeBookCategoryPayload = (input: BookCategoryPayload) => {
  const normalizedIsActive = input.isActive ?? input.is_active

  return {
    ...(input.code !== undefined && { code: input.code }),
    ...(input.name !== undefined && { name: input.name }),
    ...(input.description !== undefined && { description: input.description }),
    ...(normalizedIsActive !== undefined && { is_active: normalizedIsActive })
  }
}

const mapCategoryResponse = (category: BookCategoryRecord) => ({
  id: category.id,
  code: category.code,
  name: category.name,
  description: category.description,
  is_active: category.is_active,
  isActive: category.is_active,
  bookCount: category._count?.books ?? 0
})

// GET /api/admin/book-categories
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const { searchParams } = new URL(request.url)
    const includeInactive = searchParams.get('includeInactive') === 'true'

    const where: Record<string, unknown> = {}
    if (!includeInactive) {
      where.is_active = true
    }

    const categories = await prisma.book_categories.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { books: true }
        }
      }
    })

    const formatted = categories.map(mapCategoryResponse)

    return NextResponse.json({ data: formatted })
  } catch (error) {
    console.error('Error fetching book categories:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/book-categories
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasRole(token.role as string, ['admin'])) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = bookCategorySchema.parse(body)
    // Ensure required fields exist explicitly (code, name). is_active fallback handled here.
    const dataForPrisma = {
      code: validatedData.code,
      name: validatedData.name,
      description: validatedData.description ?? null,
      is_active: (validatedData.isActive ?? validatedData.is_active) ?? true
    }

    // Check if code already exists
    const existing = await prisma.book_categories.findUnique({
      where: { code: validatedData.code }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Category code already exists' },
        { status: 400 }
      )
    }

    const category = await prisma.book_categories.create({
      data: {
        id: randomUUID(),
        code: dataForPrisma.code,
        name: dataForPrisma.name,
        description: dataForPrisma.description,
        is_active: dataForPrisma.is_active
      }
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId,
        action: 'create_book_category',
        resource: 'book_category',
        details: { categoryId: category.id, code: category.code, name: category.name },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(mapCategoryResponse({ ...category, _count: { books: 0 } }), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating book category:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/book-categories/:id
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasRole(token.role as string, ['admin'])) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = bookCategoryUpdateSchema.parse(body)

    // Don't allow code to be changed
    const { code, ...payload } = validatedData
    const updatePayload = normalizeBookCategoryPayload(payload)

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    await prisma.book_categories.update({
      where: { id },
      data: updatePayload
    })

    const category = await prisma.book_categories.findUnique({
      where: { id },
      include: {
        _count: {
          select: { books: true }
        }
      }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId,
        action: 'update_book_category',
        resource: 'book_category',
        details: { categoryId: category.id, name: category.name },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(mapCategoryResponse(category))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating book category:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/book-categories/:id
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasRole(token.role as string, ['admin'])) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
    }

    // Check if category has books
    const booksCount = await prisma.books.count({
      where: { category_id: id }
    })

    if (booksCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${booksCount} books. Please reassign books first.` },
        { status: 400 }
      )
    }

    const category = await prisma.book_categories.delete({
      where: { id }
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId,
        action: 'delete_book_category',
        resource: 'book_category',
        details: { categoryId: category.id, name: category.name },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true, message: 'Category deleted' })
  } catch (error) {
    console.error('Error deleting book category:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
