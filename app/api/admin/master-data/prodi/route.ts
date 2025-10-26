import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth-middleware'

// POST - Create new prodi
export async function POST(req: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { code, name, fakultas, jenjang, akreditasi } = body

    // Validate required fields
    if (!code || !name) {
      return NextResponse.json(
        { error: 'Code and name are required' },
        { status: 400 }
      )
    }

    // Create prodi
    const prodi = await prisma.prodi.create({
      data: {
        kode: code,
        nama: name,
        fakultas: fakultas || 'Fakultas Teknik',
        jenjang: jenjang || 'S1',
        akreditasi: akreditasi || null,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: prodi.kode,
        code: prodi.kode,
        name: prodi.nama,
        status: 'active',
        created_at: prodi.created_at.toISOString(),
        updated_at: prodi.updated_at.toISOString(),
      }
    })
  } catch (error: any) {
    console.error('Error creating prodi:', error)

    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Kode prodi sudah digunakan' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update prodi
export async function PUT(req: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { id, code, name, fakultas, jenjang, akreditasi } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    // Update prodi
    const prodi = await prisma.prodi.update({
      where: { kode: id },
      data: {
        nama: name,
        fakultas: fakultas,
        jenjang: jenjang,
        akreditasi: akreditasi,
        updated_at: new Date(),
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        id: prodi.kode,
        code: prodi.kode,
        name: prodi.nama,
        status: 'active',
        created_at: prodi.created_at.toISOString(),
        updated_at: prodi.updated_at.toISOString(),
      }
    })
  } catch (error: any) {
    console.error('Error updating prodi:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Prodi tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete prodi
export async function DELETE(req: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }

    // Check if prodi has related data
    const relatedData = await prisma.students.count({
      where: { prodi_id: id }
    })

    if (relatedData > 0) {
      return NextResponse.json(
        { error: 'Tidak dapat menghapus prodi yang memiliki data mahasiswa terkait' },
        { status: 400 }
      )
    }

    // Delete prodi
    await prisma.prodi.delete({
      where: { kode: id }
    })

    return NextResponse.json({
      success: true,
      message: 'Prodi berhasil dihapus'
    })
  } catch (error: any) {
    console.error('Error deleting prodi:', error)

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Prodi tidak ditemukan' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
