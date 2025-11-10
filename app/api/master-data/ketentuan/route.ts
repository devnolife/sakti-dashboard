import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const ketentuan = await prisma.ketentuan_surat.findMany({
      include: {
        tujuan: true,
        masalah: true,
        jenis: true
      },
      orderBy: { id: 'asc' }
    })

    return NextResponse.json(ketentuan)
  } catch (error) {
    console.error('Error fetching ketentuan surat:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ketentuan surat' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
