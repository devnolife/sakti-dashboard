import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'

// GET /api/admin/dashboard/comprehensive - Get comprehensive dashboard data
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    if (!hasPermission(token.role as string, 'read', 'dashboard')) {
      // Allow admin to always access
      if (token.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    // Fetch comprehensive stats
    const [
      totalUsers,
      activeUsers,
      totalConfigs,
      totalProdi,
      totalCourses,
      totalCompanies,
      totalBooks,
      pendingKKP,
      pendingExams,
      pendingPayments,
      activeSessions,
      recentAudits
    ] = await Promise.all([
      // User stats
      prisma.users.count(),
      prisma.users.count({ where: { is_active: true } }),

      // System configs
      prisma.system_configs.count(),

      // Master data
      prisma.prodi.count(),
      prisma.courses.count(),
      prisma.companies.count(),
      prisma.books.count(),

      // Pending items
      prisma.kkp_applications.count({ where: { status: 'pending' } }),
      prisma.exam_applications.count({ where: { status: 'pending' } }),
      prisma.payments.count({ where: { status: 'pending' } }),

      // Active sessions (last 24 hours)
      prisma.sessions.count({
        where: {
          expires_at: {
            gte: new Date()
          }
        }
      }),

      // Recent audit logs
      prisma.audit_logs.findMany({
        take: 20,
        orderBy: { created_at: 'desc' },
        include: {
          users: {
            select: {
              name: true,
              role: true
            }
          }
        }
      })
    ])

    // Calculate system stats
    const systemStats = {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalConfigs,
      masterData: {
        prodi: totalProdi,
        courses: totalCourses,
        companies: totalCompanies,
        books: totalBooks
      },
      pendingApprovals: {
        kkp: pendingKKP,
        exams: pendingExams,
        payments: pendingPayments,
        total: pendingKKP + pendingExams + pendingPayments
      },
      activeSessions
    }

    // System health
    const systemHealth = {
      status: 'operational',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memory: {
        used: process.memoryUsage().heapUsed,
        total: process.memoryUsage().heapTotal
      },
      services: {
        database: 'healthy',
        api: 'healthy',
        storage: 'healthy'
      }
    }

    // Format recent activities
    const recentActivities = recentAudits.map(audit => ({
      id: audit.id,
      action: audit.action,
      resource: audit.resource,
      user: audit.users.name,
      userRole: audit.users.role,
      timestamp: audit.created_at.toISOString(),
      details: audit.details
    }))

    return NextResponse.json({
      stats: systemStats,
      systemHealth,
      recentActivities,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching comprehensive dashboard:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

