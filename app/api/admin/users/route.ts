import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const role = searchParams.get('role') || 'all'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (search) {
      where.OR = [
        { username: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (role !== 'all') {
      where.role = role
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.users.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        select: {
          id: true,
          username: true,
          name: true,
          role: true,
          sub_role: true,
          is_active: true,
          created_at: true,
          lecturers: {
            select: {
              position: true,
              department: true,
              prodi_id: true
            }
          },
          staff: {
            select: {
              position: true,
              department: true,
              prodi_id: true
            }
          },
          students: {
            select: {
              major: true,
              semester: true,
              prodi_id: true
            }
          }
        }
      }),
      prisma.users.count({ where })
    ])

    // Get statistics
    const [totalUsers, activeUsers, inactiveUsers] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { is_active: true } }),
      prisma.users.count({ where: { is_active: false } })
    ])

    // Get new users this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const newThisMonth = await prisma.users.count({
      where: {
        created_at: {
          gte: startOfMonth
        }
      }
    })

    return NextResponse.json({
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      },
      stats: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        newThisMonth
      }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
