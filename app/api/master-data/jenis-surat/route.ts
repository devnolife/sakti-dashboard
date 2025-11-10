import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const jenisSurat = await prisma.jenis_surat.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return NextResponse.json(jenisSurat)
  } catch (error) {
    console.error('Error fetching jenis_surat:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jenis_surat' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
