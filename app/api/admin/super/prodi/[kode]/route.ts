import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth-middleware'

// GET - Get prodi detail with full information
export async function GET(
  req: NextRequest,
  { params }: { params: { kode: string } }
) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { kode } = params

    const prodi = await prisma.prodi.findUnique({
      where: { kode },
      include: {
        _count: {
          select: {
            students: true,
            lecturers: true,
            staff: true,
            laboratory_admins: true,
          }
        }
      }
    })

    if (!prodi) {
      return NextResponse.json({ error: 'Prodi not found' }, { status: 404 })
    }

    // Get ketua prodi (if exists)
    const ketuaProdi = await prisma.lecturers.findFirst({
      where: {
        prodi_id: kode,
        users: {
          sub_role: {
            contains: 'prodi'
          }
        }
      },
      include: {
        users: {
          select: {
            name: true,
            username: true,
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        kode: prodi.kode,
        nama: prodi.nama,
        jenjang: prodi.jenjang,
        fakultas: prodi.fakultas,
        akreditasi: prodi.akreditasi,
        ketuaProdi: ketuaProdi ? {
          name: ketuaProdi.users.name,
          nip: ketuaProdi.nip,
        } : null,
        counts: {
          students: prodi._count.students,
          lecturers: prodi._count.lecturers,
          staff: prodi._count.staff,
          labAdmins: prodi._count.laboratory_admins,
          total: prodi._count.students + prodi._count.lecturers + prodi._count.staff + prodi._count.laboratory_admins
        }
      }
    })
  } catch (error) {
    console.error('Error fetching prodi detail:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update prodi information
export async function PUT(
  req: NextRequest,
  { params }: { params: { kode: string } }
) {
  try {
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { kode } = params
    const body = await req.json()
    const { nama, kode: newKode, jenjang, fakultas, akreditasi } = body

    // Validate required fields
    if (!nama) {
      return NextResponse.json({ error: 'Nama prodi is required' }, { status: 400 })
    }

    // Check if prodi exists
    const existingProdi = await prisma.prodi.findUnique({ where: { kode } })
    if (!existingProdi) {
      return NextResponse.json({ error: 'Prodi not found' }, { status: 404 })
    }

    // If kode is being changed, check if new kode already exists
    if (newKode && newKode !== kode) {
      const kodeExists = await prisma.prodi.findUnique({ where: { kode: newKode } })
      if (kodeExists) {
        return NextResponse.json({ error: 'Kode prodi already exists' }, { status: 400 })
      }
    }

    // Update prodi
    const updatedProdi = await prisma.prodi.update({
      where: { kode },
      data: {
        ...(newKode && { kode: newKode }),
        nama,
        jenjang: jenjang || existingProdi.jenjang,
        fakultas: fakultas || existingProdi.fakultas,
        akreditasi: akreditasi || existingProdi.akreditasi,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Prodi updated successfully',
      data: updatedProdi
    })
  } catch (error) {
    console.error('Error updating prodi:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
