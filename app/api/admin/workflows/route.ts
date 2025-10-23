import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const workflowStepSchema = z.object({
  order: z.number(),
  role: z.string(),
  required: z.boolean().default(true),
  auto_approve_conditions: z.record(z.any()).optional(),
  timeout_hours: z.number().optional()
})

const workflowSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['kkp', 'exam', 'letter', 'payment']),
  steps: z.array(workflowStepSchema),
  is_active: z.boolean().default(true),
  description: z.string().optional()
})

// GET /api/admin/workflows - Get all approval workflows
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'workflows')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    const where: any = {}
    if (type) where.key = { startsWith: `workflow_${type}` }

    const workflows = await prisma.system_configs.findMany({
      where: {
        category: 'workflow'
      }
    })

    // Parse workflows from system configs
    const parsedWorkflows = workflows.map(w => ({
      id: w.id,
      key: w.key,
      ...JSON.parse(w.value),
      updated_at: w.updated_at
    }))

    return NextResponse.json({
      data: parsedWorkflows,
      total: parsedWorkflows.length
    })
  } catch (error) {
    console.error('Error fetching workflows:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/workflows - Create new workflow
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'workflows')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = workflowSchema.parse(body)

    const workflowKey = `workflow_${validatedData.type}_${Date.now()}`

    const workflow = await prisma.system_configs.create({
      data: {
        id: `cfg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        key: workflowKey,
        value: JSON.stringify(validatedData),
        description: validatedData.description,
        category: 'workflow',
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_workflow',
        resource: 'workflows',
        details: validatedData,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: workflow.id,
      key: workflow.key,
      ...validatedData
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating workflow:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/workflows/[key] - Update workflow
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'workflows')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = workflowSchema.parse(body)

    const workflow = await prisma.system_configs.update({
      where: { key },
      data: {
        value: JSON.stringify(validatedData),
        description: validatedData.description,
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'update_workflow',
        resource: 'workflows',
        details: { key, ...validatedData },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: workflow.id,
      key: workflow.key,
      ...validatedData
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating workflow:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/workflows/[key]
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'workflows')) {
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
        action: 'delete_workflow',
        resource: 'workflows',
        details: { key },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting workflow:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

