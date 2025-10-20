import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const bookCategorySchema = z.object({
  code: z.string().min(1).max(10),
  name: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
})

// GET /api/admin/book-categories
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

    const categories = await prisma.booksCategory.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { books: true }
        }
      }
    })

    return NextResponse.json({ data: categories })
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

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = bookCategorySchema.parse(body)

    // Check if code already exists
    const existing = await prisma.booksCategory.findUnique({
      where: { code: validatedData.code }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Category code already exists' },
        { status: 400 }
      )
    }

    const category = await prisma.booksCategory.create({
      data: validatedData
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'CREATE',
        resource: 'BookCategory',
        details: { categoryId: category.id, name: category.name },
      }
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
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

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = bookCategorySchema.partial().parse(body)

    // Don't allow code to be changed
    delete (validatedData as any).code

    const category = await prisma.booksCategory.update({
      where: { id },
      data: validatedData
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'UPDATE',
        resource: 'BookCategory',
        details: { categoryId: category.id, name: category.name },
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
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

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Category ID required' }, { status: 400 })
    }

    // Check if category has books
    const booksCount = await prisma.books.count({
      where: { categoryId: id }
    })

    if (booksCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${booksCount} books. Please reassign books first.` },
        { status: 400 }
      )
    }

    const category = await prisma.booksCategory.delete({
      where: { id }
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'DELETE',
        resource: 'BookCategory',
        details: { categoryId: category.id, name: category.name },
      }
    })

    return NextResponse.json({ success: true, message: 'Category deleted' })
  } catch (error) {
    console.error('Error deleting book category:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
