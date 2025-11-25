import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id_jenis, id_masalah, id_tujuan, kode, nama, is_global = true, prodi_id = null } = body

    if (!id_jenis || !id_masalah || !id_tujuan || !kode || !nama) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate: if not global, prodi_id is required
    if (!is_global && !prodi_id) {
      return NextResponse.json(
        { error: 'Prodi ID required for prodi-specific ketentuan' },
        { status: 400 }
      )
    }

    // Check if ketentuan with same nama already exists
    const existing = await prisma.ketentuan_surat.findUnique({
      where: { nama }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Ketentuan dengan nama ini sudah ada' },
        { status: 409 }
      )
    }

    // Check if combination already exists
    const existingCombo = await prisma.ketentuan_surat.findFirst({
      where: {
        id_jenis,
        id_masalah,
        id_tujuan
      }
    })

    if (existingCombo) {
      return NextResponse.json(
        { error: 'Kombinasi jenis, masalah, dan tujuan ini sudah ada' },
        { status: 409 }
      )
    }

    const ketentuan = await prisma.ketentuan_surat.create({
      data: {
        id_jenis,
        id_masalah,
        id_tujuan,
        kode,
        nama,
        is_global,
        prodi_id: is_global ? null : prodi_id
      },
      include: {
        tujuan: true,
        masalah: true,
        jenis: true,
        prodi: true
      }
    })

    return NextResponse.json(ketentuan)
  } catch (error: any) {
    console.error('Error creating ketentuan surat:', error)

    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Data dengan nilai ini sudah ada di database' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create ketentuan surat' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
