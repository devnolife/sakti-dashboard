import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const documentTemplateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['letter', 'certificate', 'report']),
  category: z.string().min(1),
  file_url: z.string().url().optional(),
  content: z.string().optional(),
  variables: z.array(z.string()),
  description: z.string().optional(),
  is_active: z.boolean().default(true)
})

// GET /api/admin/document-templates
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'document_templates')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const category = searchParams.get('category')
    const isActive = searchParams.get('is_active')

    // Fetch from system_configs with category 'document_template'
    const templates = await prisma.system_configs.findMany({
      where: {
        category: 'document_template'
      }
    })

    // Parse templates
    let parsedTemplates = templates.map(t => ({
      id: t.id,
      key: t.key,
      ...JSON.parse(t.value),
      updated_at: t.updated_at
    }))

    // Apply filters
    if (type) {
      parsedTemplates = parsedTemplates.filter(t => t.type === type)
    }
    if (category) {
      parsedTemplates = parsedTemplates.filter(t => t.category === category)
    }
    if (isActive !== null) {
      parsedTemplates = parsedTemplates.filter(t => t.is_active === (isActive === 'true'))
    }

    return NextResponse.json({
      data: parsedTemplates,
      total: parsedTemplates.length
    })
  } catch (error) {
    console.error('Error fetching document templates:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/document-templates
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'document_templates')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = documentTemplateSchema.parse(body)

    const templateKey = `doc_template_${validatedData.type}_${validatedData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`

    const template = await prisma.system_configs.create({
      data: {
        id: `cfg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        key: templateKey,
        value: JSON.stringify(validatedData),
        description: validatedData.description || `Document template: ${validatedData.name}`,
        category: 'document_template',
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_document_template',
        resource: 'document_templates',
        details: { name: validatedData.name, type: validatedData.type, category: validatedData.category },
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
    console.error('Error creating document template:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/document-templates/[key]
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'document_templates')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = documentTemplateSchema.parse(body)

    const template = await prisma.system_configs.update({
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
        action: 'update_document_template',
        resource: 'document_templates',
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
    console.error('Error updating document template:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/document-templates/[key]
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'document_templates')) {
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
        action: 'delete_document_template',
        resource: 'document_templates',
        details: { key },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting document template:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

