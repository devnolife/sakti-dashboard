import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from '@/lib/auth-middleware'
import { prisma } from '@/lib/prisma'
import { students } from '@/components/dekan/vice-dean-4/mock-data'

export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Get user with full profile
    const user = await prisma.users.findUnique({
      where: { id: token.userId },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        sub_role: true,
        avatar: true,
        is_active: true,
        created_at: true,
        students: {
          select: {
            id: true,
            nim: true,
            major: true,
            department: true,
            semester: true,
            academic_year: true,
            phone: true,
            gpa: true,
            enroll_date: true,
            status: true
          }
        },
        lecturers: {
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
        staff: {
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

    if (!user || !user.is_active) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user: {
        ...user,
        profile: user.students || user.lecturers || user.staff
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
