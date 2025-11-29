import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Prodi ID is required' },
        { status: 400 }
      )
    }

    const prodi = await prisma.prodi.findUnique({
      where: { kode: id },
      select: {
        kode: true,
        nama: true,
        jenjang: true,
        fakultas: true,
        akreditasi: true,
      },
    })

    if (!prodi) {
      return NextResponse.json(
        { error: 'Prodi not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: prodi,
    })
  } catch (error) {
    console.error('Prodi fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prodi' },
      { status: 500 }
    )
  }
}
