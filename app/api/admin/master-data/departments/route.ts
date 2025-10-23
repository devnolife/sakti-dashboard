import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const departmentSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  faculty: z.string().min(1),
  head_id: z.string().optional(),
  is_active: z.boolean().default(true)
})

// GET /api/admin/master-data/departments
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'master_data')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const faculty = searchParams.get('faculty')
    const isActive = searchParams.get('is_active')

    const where: any = {}
    if (faculty) where.faculty = faculty
    if (isActive) where.is_active = isActive === 'true'

    // Since we don't have departments table yet, let's get unique departments from students
    const departments = await prisma.students.findMany({
      select: {
        department: true,
        major: true
      },
      distinct: ['department']
    })

    // Format as department structure
    const formattedDepartments = departments.map((dept, idx) => ({
      id: `dept_${idx}`,
      code: dept.department.replace(/\s+/g, '_').toUpperCase(),
      name: dept.department,
      faculty: 'Fakultas Teknik',
      is_active: true
    }))

    return NextResponse.json({
      data: formattedDepartments,
      total: formattedDepartments.length
    })
  } catch (error) {
    console.error('Error fetching departments:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/master-data/departments
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'master_data')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = departmentSchema.parse(body)

    // For now, return mock data since we need to create departments table
    const department = {
      id: `dept_${Date.now()}`,
      ...validatedData,
      created_at: new Date()
    }

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_department',
        resource: 'master_data',
        details: validatedData,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(department, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating department:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

