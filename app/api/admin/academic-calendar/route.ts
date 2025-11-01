import { randomUUID } from 'crypto'
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

type AcademicYearInput = z.infer<typeof academicYearSchema>

type StoredAcademicYear = {
  year: string
  semester: 'ganjil' | 'genap'
  start_date: string
  end_date: string
  is_active: boolean
  registration_start: string | null
  registration_end: string | null
  exam_start: string | null
  exam_end: string | null
}

type AcademicYearRecord = StoredAcademicYear & {
  id: string
  key: string
  updated_at: Date
}

const serializeAcademicYear = (data: AcademicYearInput): StoredAcademicYear => ({
  year: data.year,
  semester: data.semester,
  start_date: data.start_date.toISOString(),
  end_date: data.end_date.toISOString(),
  is_active: data.is_active,
  registration_start: data.registration_start ? data.registration_start.toISOString() : null,
  registration_end: data.registration_end ? data.registration_end.toISOString() : null,
  exam_start: data.exam_start ? data.exam_start.toISOString() : null,
  exam_end: data.exam_end ? data.exam_end.toISOString() : null
})

const safeParseAcademicYearValue = (value: string): StoredAcademicYear | null => {
  try {
    const parsed = JSON.parse(value) as Partial<StoredAcademicYear>

    if (!parsed || typeof parsed !== 'object') {
      return null
    }

    if (!parsed.year || !parsed.semester || !parsed.start_date || !parsed.end_date) {
      return null
    }

    return {
      year: parsed.year,
      semester: parsed.semester as 'ganjil' | 'genap',
      start_date: parsed.start_date,
      end_date: parsed.end_date,
      is_active: parsed.is_active ?? false,
      registration_start: parsed.registration_start ?? null,
      registration_end: parsed.registration_end ?? null,
      exam_start: parsed.exam_start ?? null,
      exam_end: parsed.exam_end ?? null
    }
  } catch (error) {
    console.warn('Failed to parse academic year config value:', error)
    return null
  }
}

const buildAcademicYearRecord = (config: { id: string; key: string; value: string; updated_at: Date }): AcademicYearRecord | null => {
  const parsed = safeParseAcademicYearValue(config.value)
  if (!parsed) {
    return null
  }

  return {
    id: config.id,
    key: config.key,
    updated_at: config.updated_at,
    ...parsed
  }
}

const deactivateOtherAcademicYears = async (excludeKey?: string) => {
  const existingConfigs = await prisma.system_configs.findMany({
    where: {
      category: 'academic_year',
      ...(excludeKey ? { key: { not: excludeKey } } : {})
    }
  })

  const updates = existingConfigs
    .map(config => {
      const parsed = safeParseAcademicYearValue(config.value)

      if (!parsed?.is_active) {
        return null
      }

      const updatedValue = JSON.stringify({ ...parsed, is_active: false })

      return prisma.system_configs.update({
        where: { id: config.id },
        data: {
          value: updatedValue,
          updated_at: new Date()
        }
      })
    })
    .filter(Boolean) as Promise<unknown>[]

  if (updates.length > 0) {
    await Promise.all(updates)
  }
}

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
    let parsedYears = academicYears
      .map(buildAcademicYearRecord)
      .filter((record): record is AcademicYearRecord => record !== null)

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

    const serializedValue = serializeAcademicYear(validatedData)

    // If setting as active, deactivate others
    if (validatedData.is_active) {
      await deactivateOtherAcademicYears()
    }

    const academicYear = await prisma.system_configs.create({
      data: {
        id: randomUUID(),
        key: academicKey,
        value: JSON.stringify(serializedValue),
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
        details: serializedValue,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: academicYear.id,
      key: academicYear.key,
      ...serializedValue
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

    const serializedValue = serializeAcademicYear(validatedData)

    // If setting as active, deactivate others
    if (validatedData.is_active) {
      await deactivateOtherAcademicYears(key)
    }

    const academicYear = await prisma.system_configs.update({
      where: { key },
      data: {
        value: JSON.stringify(serializedValue),
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
        details: { key, ...serializedValue },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: academicYear.id,
      key: academicYear.key,
      ...serializedValue
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

