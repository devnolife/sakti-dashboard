import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth-middleware'

// GET /api/admin/statistics
export async function GET(request: NextRequest) {
  try {
    // Use requireAdmin middleware
    const context: any = {}
    const authCheck = await requireAdmin()(request, context)
    if (authCheck instanceof NextResponse) return authCheck

    // Get various statistics in parallel for better performance
    const [
      totalUsers,
      activeUsers,
      usersByRole,
      totalStudents,
      totalLecturers,
      totalStaff,
      pendingKkpApplications,
      approvedKkpApplications,
      completedKkpApplications,
      pendingExamApplications,
      pendingPayments,
      completedPayments,
      activeSessions,
      totalCompanies,
      totalBooks,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { is_active: true } }),
      prisma.users.groupBy({
        by: ['role'],
        _count: true,
      }),
      prisma.students.count(),
      prisma.lecturers.count(),
      prisma.staff.count(),
      prisma.kkp_applications.count({ where: { status: 'pending' } }),
      prisma.kkp_applications.count({ where: { status: 'approved' } }),
      prisma.kkp_applications.count({ where: { status: 'completed' } }),
      prisma.exam_applications.count({ where: { status: 'pending' } }),
      prisma.payments.count({ where: { status: 'pending' } }),
      prisma.payments.count({ where: { status: 'completed' } }),
      prisma.sessions.count({
        where: {
          expires_at: {
            gt: new Date()
          }
        }
      }),
      prisma.companies.count(),
      prisma.books.count(),
      prisma.audit_logs.findMany({
        take: 10,
        orderBy: { created_at: 'desc' },
        include: {
          users: {
            select: {
              name: true,
              role: true,
            }
          }
        }
      }),
    ])

    // Format user breakdown by role
    const roleBreakdown = usersByRole.reduce((acc, item) => {
      acc[item.role] = item._count
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        inactive: totalUsers - activeUsers,
        byRole: roleBreakdown,
      },
      breakdown: {
        students: totalStudents,
        lecturers: totalLecturers,
        staff: totalStaff,
        companies: totalCompanies,
        books: totalBooks,
      },
      pendingApprovals: {
        kkp: pendingKkpApplications,
        exams: pendingExamApplications,
        payments: pendingPayments,
        total: pendingKkpApplications + pendingExamApplications + pendingPayments,
      },
      kkpStats: {
        pending: pendingKkpApplications,
        approved: approvedKkpApplications,
        completed: completedKkpApplications,
      },
      paymentStats: {
        pending: pendingPayments,
        completed: completedPayments,
      },
      activeSessions,
      systemHealth: {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      recentActivity: recentAuditLogs.map(log => ({
        id: log.id,
        action: log.action,
        resource: log.resource,
        user: log.users.name,
        userRole: log.users.role,
        timestamp: log.created_at,
        details: log.details,
      })),
    })
  } catch (error) {
    console.error('Error fetching admin statistics:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
