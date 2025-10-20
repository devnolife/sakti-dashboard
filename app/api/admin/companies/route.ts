import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const companySchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  contactPerson: z.string().min(1),
  contactPosition: z.string().optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().min(1),
  website: z.string().url().optional(),
  logo: z.string().optional(),
  industry: z.string().min(1),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
})

// GET /api/admin/companies
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search')
    const is_active = searchParams.get('isActive')

    const skip = (page - 1) * limit

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (isActive !== null && is_active !== undefined) {
      where.isActive = is_active === 'true'
    }

    const [companies, total] = await Promise.all([
      prisma.companies.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { kkpApplications: true }
          }
        }
      }),
      prisma.companies.count({ where })
    ])

    return NextResponse.json({
      data: companies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/companies
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = companySchema.parse(body)

    const company = await prisma.companies.create({
      data: validatedData
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'CREATE',
        resource: 'Company',
        details: { companyId: company.id, name: company.name },
      }
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating company:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/companies/:id
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
      return NextResponse.json({ error: 'Company ID required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = companySchema.partial().parse(body)

    const company = await prisma.companies.update({
      where: { id },
      data: validatedData
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'UPDATE',
        resource: 'Company',
        details: { companyId: company.id, name: company.name },
      }
    })

    return NextResponse.json(company)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating company:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/companies/:id
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
      return NextResponse.json({ error: 'Company ID required' }, { status: 400 })
    }

    const company = await prisma.companies.delete({
      where: { id }
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'DELETE',
        resource: 'Company',
        details: { companyId: company.id, name: company.name },
      }
    })

    return NextResponse.json({ success: true, message: 'Company deleted' })
  } catch (error) {
    console.error('Error deleting company:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
