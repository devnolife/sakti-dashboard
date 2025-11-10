import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tujuan = await prisma.tujuan.findMany({
      orderBy: {
        id: 'asc'
      }
    })

    return NextResponse.json(tujuan)
  } catch (error) {
    console.error('Error fetching tujuan:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tujuan' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
