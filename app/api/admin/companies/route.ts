import { randomUUID } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasRole } from '@/lib/auth-middleware'
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
  isActive: z.boolean().optional()
})

const companyUpdateSchema = companySchema.partial()

type CompanyPayload = z.infer<typeof companyUpdateSchema>

type CompanyRecord = {
  id: string
  name: string
  address: string
  city: string
  province: string | null
  postal_code: string | null
  contact_person: string
  contact_position: string | null
  contact_email: string | null
  contact_phone: string
  website: string | null
  logo: string | null
  industry: string
  description: string | null
  is_active: boolean
  _count?: { kkp_applications: number }
}

const normalizeCompanyPayload = (input: CompanyPayload) => ({
  ...(input.name !== undefined && { name: input.name }),
  ...(input.address !== undefined && { address: input.address }),
  ...(input.city !== undefined && { city: input.city }),
  ...(input.province !== undefined && { province: input.province }),
  ...(input.postalCode !== undefined && { postal_code: input.postalCode }),
  ...(input.contactPerson !== undefined && { contact_person: input.contactPerson }),
  ...(input.contactPosition !== undefined && { contact_position: input.contactPosition }),
  ...(input.contactEmail !== undefined && { contact_email: input.contactEmail }),
  ...(input.contactPhone !== undefined && { contact_phone: input.contactPhone }),
  ...(input.website !== undefined && { website: input.website }),
  ...(input.logo !== undefined && { logo: input.logo }),
  ...(input.industry !== undefined && { industry: input.industry }),
  ...(input.description !== undefined && { description: input.description }),
  ...(input.isActive !== undefined && { is_active: input.isActive })
})

const mapCompanyResponse = (company: CompanyRecord) => ({
  id: company.id,
  name: company.name,
  address: company.address,
  city: company.city,
  province: company.province,
  postalCode: company.postal_code,
  contactPerson: company.contact_person,
  contactPosition: company.contact_position,
  contactEmail: company.contact_email,
  contactPhone: company.contact_phone,
  website: company.website,
  logo: company.logo,
  industry: company.industry,
  description: company.description,
  isActive: company.is_active,
  kkpApplicationCount: company._count?.kkp_applications ?? 0
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
    const isActiveQuery = searchParams.get('isActive')

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } }
      ]
    }
    if (isActiveQuery !== null) {
      where.is_active = isActiveQuery === 'true'
    }

    const [companies, total] = await Promise.all([
      prisma.companies.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { kkp_applications: true }
          }
        }
      }),
      prisma.companies.count({ where })
    ])

    const formattedCompanies = companies.map(mapCompanyResponse)

    return NextResponse.json({
      data: formattedCompanies,
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

    if (!hasRole(token.role as string, ['admin'])) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = companySchema.parse(body)

    // Ensure all required fields are explicitly provided
    const company = await prisma.companies.create({
      data: {
        id: randomUUID(),
        name: validatedData.name,
        address: validatedData.address,
        city: validatedData.city,
        province: validatedData.province ?? null,
        postal_code: validatedData.postalCode ?? null,
        contact_person: validatedData.contactPerson,
        contact_position: validatedData.contactPosition ?? null,
        contact_email: validatedData.contactEmail ?? null,
        contact_phone: validatedData.contactPhone,
        website: validatedData.website ?? null,
        logo: validatedData.logo ?? null,
        industry: validatedData.industry,
        description: validatedData.description ?? null,
        is_active: validatedData.isActive ?? true
      }
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId,
        action: 'create_company',
        resource: 'companies',
        details: { companyId: company.id, name: company.name },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(mapCompanyResponse({ ...company, _count: { kkp_applications: 0 } }), { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
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

    if (!hasRole(token.role as string, ['admin'])) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Company ID required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = companyUpdateSchema.parse(body)
    const updatePayload = normalizeCompanyPayload(validatedData)

    if (Object.keys(updatePayload).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    await prisma.companies.update({
      where: { id },
      data: updatePayload
    })

    const company = await prisma.companies.findUnique({
      where: { id },
      include: {
        _count: {
          select: { kkp_applications: true }
        }
      }
    })

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId,
        action: 'update_company',
        resource: 'companies',
        details: { companyId: company.id, name: company.name },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(mapCompanyResponse(company))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
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

    if (!hasRole(token.role as string, ['admin'])) {
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
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId,
        action: 'delete_company',
        resource: 'companies',
        details: { companyId: company.id, name: company.name },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true, message: 'Company deleted' })
  } catch (error) {
    console.error('Error deleting company:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
