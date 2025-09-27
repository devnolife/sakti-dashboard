import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Get user with full profile
    const user = await prisma.user.findUnique({
      where: { id: token.sub },
      select: {
        id: true,
        nidn: true,
        name: true,
        role: true,
        subRole: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        studentProfile: {
          select: {
            id: true,
            nim: true,
            major: true,
            department: true,
            semester: true,
            academicYear: true,
            phone: true,
            gpa: true,
            enrollDate: true,
            status: true
          }
        },
        lecturerProfile: {
          select: {
            id: true,
            nip: true,
            department: true,
            position: true,
            specialization: true,
            phone: true,
            office: true
          }
        },
        staffProfile: {
          select: {
            id: true,
            nip: true,
            department: true,
            position: true,
            phone: true,
            office: true
          }
        }
      }
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        ...user,
        profile: user.studentProfile || user.lecturerProfile || user.staffProfile
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}