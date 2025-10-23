import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const academicYearSchema = z.object({
  year: z.string().min(1),
  semester: z.enum(['ganjil', 'genap']),
  start_date: z.string().transform(str => new Date(str)),
  end_date: z.string().transform(str => new Date(str)),
  is_active: z.boolean().default(true),
  registration_start: z.string().transform(str => new Date(str)).optional(),
  registration_end: z.string().transform(str => new Date(str)).optional(),
  exam_start: z.string().transform(str => new Date(str)).optional(),
  exam_end: z.string().transform(str => new Date(str)).optional()
})

// GET /api/admin/academic-calendar
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'academic_config')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const semester = searchParams.get('semester')
    const isActive = searchParams.get('is_active')

    // Fetch from system_configs with category 'academic_year'
    const academicYears = await prisma.system_configs.findMany({
      where: {
        category: 'academic_year'
      }
    })

    // Parse academic years
    let parsedYears = academicYears.map(ay => ({
      id: ay.id,
      key: ay.key,
      ...JSON.parse(ay.value),
      updated_at: ay.updated_at
    }))

    // Apply filters
    if (year) {
      parsedYears = parsedYears.filter(ay => ay.year === year)
    }
    if (semester) {
      parsedYears = parsedYears.filter(ay => ay.semester === semester)
    }
    if (isActive !== null) {
      parsedYears = parsedYears.filter(ay => ay.is_active === (isActive === 'true'))
    }

    return NextResponse.json({
      data: parsedYears,
      total: parsedYears.length
    })
  } catch (error) {
    console.error('Error fetching academic calendar:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/academic-calendar
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'academic_config')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = academicYearSchema.parse(body)

    const academicKey = `academic_year_${validatedData.year}_${validatedData.semester}`

    // Check if already exists
    const existing = await prisma.system_configs.findUnique({
      where: { key: academicKey }
    })

    if (existing) {
      return NextResponse.json({ error: 'Academic year and semester already exists' }, { status: 400 })
    }

    // If setting as active, deactivate others
    if (validatedData.is_active) {
      await prisma.system_configs.updateMany({
        where: {
          category: 'academic_year'
        },
        data: {
          value: prisma.raw('jsonb_set(value, \'{is_active}\', \'false\')') as any
        }
      })
    }

    const academicYear = await prisma.system_configs.create({
      data: {
        id: `cfg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        key: academicKey,
        value: JSON.stringify({
          ...validatedData,
          start_date: validatedData.start_date.toISOString(),
          end_date: validatedData.end_date.toISOString(),
          registration_start: validatedData.registration_start?.toISOString(),
          registration_end: validatedData.registration_end?.toISOString(),
          exam_start: validatedData.exam_start?.toISOString(),
          exam_end: validatedData.exam_end?.toISOString()
        }),
        description: `Academic Year ${validatedData.year} - ${validatedData.semester}`,
        category: 'academic_year',
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_academic_year',
        resource: 'academic_calendar',
        details: validatedData,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: academicYear.id,
      key: academicYear.key,
      ...validatedData
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating academic year:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/academic-calendar/[key]
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'academic_config')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = academicYearSchema.parse(body)

    // If setting as active, deactivate others
    if (validatedData.is_active) {
      await prisma.system_configs.updateMany({
        where: {
          category: 'academic_year',
          key: { not: key }
        },
        data: {
          value: prisma.raw('jsonb_set(value, \'{is_active}\', \'false\')') as any
        }
      })
    }

    const academicYear = await prisma.system_configs.update({
      where: { key },
      data: {
        value: JSON.stringify({
          ...validatedData,
          start_date: validatedData.start_date.toISOString(),
          end_date: validatedData.end_date.toISOString(),
          registration_start: validatedData.registration_start?.toISOString(),
          registration_end: validatedData.registration_end?.toISOString(),
          exam_start: validatedData.exam_start?.toISOString(),
          exam_end: validatedData.exam_end?.toISOString()
        }),
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'update_academic_year',
        resource: 'academic_calendar',
        details: { key, ...validatedData },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: academicYear.id,
      key: academicYear.key,
      ...validatedData
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating academic year:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/academic-calendar/[key]
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'academic_config')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    await prisma.system_configs.delete({
      where: { key }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'delete_academic_year',
        resource: 'academic_calendar',
        details: { key },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting academic year:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

