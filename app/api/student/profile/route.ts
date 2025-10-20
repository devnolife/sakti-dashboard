import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { students } from '@/components/dekan/vice-dean-4/mock-data'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        students: true
      }
    })

    if (!user || !user.students) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    return NextResponse.json(user.students)
  } catch (error) {
    console.error('Error fetching student profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
