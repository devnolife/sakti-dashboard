import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const integrationSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['graphql', 'rest', 'soap']),
  endpoint: z.string().url(),
  auth_type: z.enum(['none', 'basic', 'bearer', 'api_key']),
  credentials: z.record(z.any()).optional(),
  sync_enabled: z.boolean().default(false),
  sync_interval: z.number().optional(),
  is_active: z.boolean().default(true)
})

// GET /api/admin/integrations
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'integrations')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const isActive = searchParams.get('is_active')

    // Fetch from system_configs with category 'integration'
    const integrations = await prisma.system_configs.findMany({
      where: {
        category: 'integration'
      }
    })

    // Parse integrations
    let parsedIntegrations = integrations.map(i => ({
      id: i.id,
      key: i.key,
      ...JSON.parse(i.value),
      updated_at: i.updated_at
    }))

    // Apply filters
    if (type) {
      parsedIntegrations = parsedIntegrations.filter(i => i.type === type)
    }
    if (isActive !== null) {
      parsedIntegrations = parsedIntegrations.filter(i => i.is_active === (isActive === 'true'))
    }

    return NextResponse.json({
      data: parsedIntegrations,
      total: parsedIntegrations.length
    })
  } catch (error) {
    console.error('Error fetching integrations:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/integrations
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'integrations')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = integrationSchema.parse(body)

    const integrationKey = `integration_${validatedData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`

    const integration = await prisma.system_configs.create({
      data: {
        id: `cfg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        key: integrationKey,
        value: JSON.stringify(validatedData),
        description: `Integration: ${validatedData.name}`,
        category: 'integration',
        updated_at: new Date()
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_integration',
        resource: 'integrations',
        details: { name: validatedData.name, type: validatedData.type },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: integration.id,
      key: integration.key,
      ...validatedData
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating integration:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/integrations/[key]
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'integrations')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = integrationSchema.parse(body)

    const integration = await prisma.system_configs.update({
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
        action: 'update_integration',
        resource: 'integrations',
        details: { key, ...validatedData },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({
      id: integration.id,
      key: integration.key,
      ...validatedData
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error updating integration:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/integrations/[key]/test - Test integration connection
export async function PATCH(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'integrations')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    const action = searchParams.get('action')

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 })
    }

    const integration = await prisma.system_configs.findUnique({
      where: { key }
    })

    if (!integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 })
    }

    const integrationData = JSON.parse(integration.value)

    if (action === 'test') {
      // Test connection
      try {
        const response = await fetch(integrationData.endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        return NextResponse.json({
          success: response.ok,
          status: response.status,
          statusText: response.statusText
        })
      } catch (error: any) {
        return NextResponse.json({
          success: false,
          error: error.message
        })
      }
    } else if (action === 'sync') {
      // Trigger sync
      // This would trigger the actual sync logic
      await prisma.system_configs.update({
        where: { key },
        data: {
          value: JSON.stringify({
            ...integrationData,
            last_sync: new Date().toISOString()
          }),
          updated_at: new Date()
        }
      })

      return NextResponse.json({ success: true, message: 'Sync triggered' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error testing integration:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/integrations/[key]
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'integrations')) {
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
        action: 'delete_integration',
        resource: 'integrations',
        details: { key },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting integration:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

