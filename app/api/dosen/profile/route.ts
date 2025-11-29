import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Get user ID from session token
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Find session and get user ID
    const session = await prisma.sessions.findUnique({
      where: { token },
      include: { users: true }
    })

    if (!session || !session.users) {
      return NextResponse.json(
        { error: 'Invalid session' },
        { status: 401 }
      )
    }

    const userId = session.user_id

    // Fetch lecturer profile with prodi information
    const lecturer = await prisma.lecturers.findFirst({
      where: {
        user_id: userId
      },
      include: {
        prodi: true,
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            role: true,
            sub_role: true,
          }
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json(
        { error: 'Lecturer profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ lecturer })
  } catch (error) {
    console.error('Error fetching lecturer profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
