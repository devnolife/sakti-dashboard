import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { z } from 'zod'

const prodiSchema = z.object({
  kode: z.string().min(1),
  nama: z.string().min(1),
  jenjang: z.string().min(1),
  fakultas: z.string().min(1),
  akreditasi: z.string().optional()
})

// GET /api/admin/master-data/prodi
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'master_data')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const fakultas = searchParams.get('fakultas')
    const jenjang = searchParams.get('jenjang')
    const search = searchParams.get('search')

    const where: any = {}
    if (fakultas) where.fakultas = fakultas
    if (jenjang) where.jenjang = jenjang
    if (search) {
      where.OR = [
        { nama: { contains: search, mode: 'insensitive' } },
        { kode: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [prodi, total] = await Promise.all([
      prisma.prodi.findMany({
        where,
        orderBy: { nama: 'asc' }
      }),
      prisma.prodi.count({ where })
    ])

    return NextResponse.json({
      data: prodi,
      total
    })
  } catch (error) {
    console.error('Error fetching prodi:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/admin/master-data/prodi
export async function POST(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'create', 'master_data')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = prodiSchema.parse(body)

    // Check if kode already exists
    const existing = await prisma.prodi.findUnique({
      where: { kode: validatedData.kode }
    })

    if (existing) {
      return NextResponse.json({ error: 'Kode prodi already exists' }, { status: 400 })
    }

    const prodi = await prisma.prodi.create({
      data: validatedData
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'create_prodi',
        resource: 'master_data',
        details: validatedData,
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(prodi, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('Error creating prodi:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT /api/admin/master-data/prodi/[kode]
export async function PUT(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'update', 'master_data')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const kode = searchParams.get('kode')

    if (!kode) {
      return NextResponse.json({ error: 'Kode is required' }, { status: 400 })
    }

    const body = await request.json()
    const { nama, jenjang, fakultas, akreditasi } = body

    const prodi = await prisma.prodi.update({
      where: { kode },
      data: {
        nama,
        jenjang,
        fakultas,
        akreditasi
      }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'update_prodi',
        resource: 'master_data',
        details: { kode, ...body },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json(prodi)
  } catch (error) {
    console.error('Error updating prodi:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE /api/admin/master-data/prodi/[kode]
export async function DELETE(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'delete', 'master_data')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const kode = searchParams.get('kode')

    if (!kode) {
      return NextResponse.json({ error: 'Kode is required' }, { status: 400 })
    }

    await prisma.prodi.delete({
      where: { kode }
    })

    // Audit log
    await prisma.audit_logs.create({
      data: {
        id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: token.userId as string,
        action: 'delete_prodi',
        resource: 'master_data',
        details: { kode },
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting prodi:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

