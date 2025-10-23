import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const notificationTemplateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['email', 'push', 'sms']),
  event: z.string().min(1),
  subject: z.string().optional(),
  body: z.string().min(1),
  variables: z.array(z.string()),
  is_active: z.boolean().default(true)
})

// GET /api/admin/notifications/templates
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'notifications')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const event = searchParams.get('event')

    // Fetch from system_configs with category 'notification_template'
    const templates = await prisma.system_configs.findMany({
      where: {
        category: 'notification_template'
      }
    })

    // Parse and filter templates
    let parsedTemplates = templates.map(t => ({
      id: t.id,
      key: t.key,
      ...JSON.parse(t.value),
      updated_at: t.updated_at
    }))

    if (type) {
      parsedTemplates = parsedTemplates.filter(t => t.type === type)
    }
    if (event) {
      parsedTemplates = parsedTemplates.filter(t => t.event === event)
    }

    return NextResponse.json({
      data: parsedTemplates,
      total: parsedTemplates.length
    })
  } catch (error) {
    console.error('Error fetching notification templates:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/notifications/templates
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'notifications')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = notificationTemplateSchema.parse(body)

    const templateKey = `notif_template_${validatedData.event}_${Date.now()}`

    const template = await prisma.system_configs.create({
      data: {
        id: `cfg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        key: templateKey,
        value: JSON.stringify(validatedData),
        description: `Notification template for ${validatedData.event}`,
        category: 'notification_template',
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_notification_template',
        resource: 'notifications',
        details: validatedData,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: template.id,
      key: template.key,
      ...validatedData
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating notification template:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/notifications/templates/[key]
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'notifications')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = notificationTemplateSchema.parse(body)

    const template = await prisma.system_configs.update({
      where: { key },
      data: {
        value: JSON.stringify(validatedData),
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'update_notification_template',
        resource: 'notifications',
        details: { key, ...validatedData },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: template.id,
      key: template.key,
      ...validatedData
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating notification template:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/notifications/templates/[key]
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'notifications')) {
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
        action: 'delete_notification_template',
        resource: 'notifications',
        details: { key },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting notification template:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

