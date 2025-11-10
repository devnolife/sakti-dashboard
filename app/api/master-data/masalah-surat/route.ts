import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const masalahSurat = await prisma.masalah_surat.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return NextResponse.json(masalahSurat)
  } catch (error) {
    console.error('Error fetching masalah_surat:', error)
    return NextResponse.json(
      { error: 'Failed to fetch masalah_surat' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
