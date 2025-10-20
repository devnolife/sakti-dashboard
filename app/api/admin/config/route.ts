import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const configSchema = z.object({
  key: z.string(),
  value: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
})

// GET /api/admin/config
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: any = {}
    if (category) {
      where.category = category
    }

    const configs = await prisma.systemConfig.findMany({
      where,
      orderBy: [
        { category: 'asc' },
        { key: 'asc' }
      ]
    })

    // Group by category
    const grouped = configs.reduce((acc: any, config) => {
      const cat = config.category || 'other'
      if (!acc[cat]) {
        acc[cat] = []
      }
      acc[cat].push(config)
      return acc
    }, {})

    return NextResponse.json({
      configs,
      grouped
    })
  } catch (error) {
    console.error('Error fetching system configs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/config
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = configSchema.parse(body)

    const config = await prisma.systemConfig.upsert({
      where: { key: validatedData.key },
      update: {
        value: validatedData.value,
        description: validatedData.description,
        category: validatedData.category,
      },
      create: validatedData
    })

    // Create audit log
    await prisma.audit_logs.create({
      data: {
        user_id: token.sub!,
        action: 'UPDATE',
        resource: 'SystemConfig',
        details: {
          key: validatedData.key,
          value: validatedData.value
        },
      }
    })

    return NextResponse.json(config)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating system config:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
