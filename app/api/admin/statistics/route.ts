import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'

// GET /api/admin/statistics
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check admin permission
    if (!hasPermission(token.role as string, '*')) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 })
    }

    // Get various statistics
    const [
      totalUsers,
      activeUsers,
      totalStudents,
      totalLecturers,
      totalStaff,
      pendingKkpApplications,
      pendingExamApplications,
      pendingPayments,
      activeSessions,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.student.count(),
      prisma.lecturer.count(),
      prisma.staff.count(),
      prisma.kkpApplication.count({ where: { status: 'pending' } }),
      prisma.examApplication.count({ where: { status: 'pending' } }),
      prisma.payment.count({ where: { status: 'pending' } }),
      prisma.session.count({
        where: {
          expiresAt: {
            gt: new Date()
          }
        }
      }),
    ])

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
      },
      breakdown: {
        students: totalStudents,
        lecturers: totalLecturers,
        staff: totalStaff,
      },
      pendingApprovals: {
        kkp: pendingKkpApplications,
        exams: pendingExamApplications,
        payments: pendingPayments,
        total: pendingKkpApplications + pendingExamApplications + pendingPayments,
      },
      activeSessions,
    })
  } catch (error) {
    console.error('Error fetching admin statistics:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
