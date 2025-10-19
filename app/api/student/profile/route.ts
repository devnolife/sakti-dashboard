import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true
      }
    })

    if (!user || !user.studentProfile) {
      return NextResponse.json({ error: 'Student profile not found' }, { status: 404 })
    }

    return NextResponse.json(user.studentProfile)
  } catch (error) {
    console.error('Error fetching student profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
