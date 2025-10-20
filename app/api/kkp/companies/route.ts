import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const createCompanySchema = z.object({
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
  industry: z.string().min(1),
  description: z.string().optional()
})

// GET /api/kkp/companies
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const industry = searchParams.get('industry')
    const city = searchParams.get('city')

    const skip = (page - 1) * limit

    const where: any = {
      is_active: true
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { contactPerson: { contains: search, mode: 'insensitive' } },
        { industry: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (industry) {
      where.industry = industry
    }

    if (city) {
      where.city = city
    }

    const [companies, total] = await Promise.all([
      prisma.companies.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              kkpApplications: true
            }
          }
        },
        orderBy: { name: 'asc' }
      }),
      prisma.companies.count({ where })
    ])

    // Get industry list for filters
    const industries = await prisma.companies.groupBy({
      by: ['industry'],
      where: { is_active: true },
      _count: { industry: true },
      orderBy: { industry: 'asc' }
    })

    // Get city list for filters
    const cities = await prisma.companies.groupBy({
      by: ['city'],
      where: { is_active: true },
      _count: { city: true },
      orderBy: { city: 'asc' }
    })

    return NextResponse.json({
      data: companies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      filters: {
        industries: industries.map(i => ({
          value: i.industry,
          count: i._count.industry
        })),
        cities: cities.map(c => ({
          value: c.city,
          count: c._count.city
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/kkp/companies
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check permission
    if (!hasPermission(token.role as string, 'create', 'companies')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = createCompanySchema.parse(body)

    // Check if company name already exists
    const existingCompany = await prisma.companies.findFirst({
      where: {
        name: validatedData.name,
        is_active: true
      }
    })

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company with this name already exists' },
        { status: 400 }
      )
    }

    const company = await prisma.companies.create({
      data: validatedData,
      include: {
        _count: {
          select: {
            kkpApplications: true
          }
        }
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