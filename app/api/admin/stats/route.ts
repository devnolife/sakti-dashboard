import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    console.log("🔐 Admin Stats API - Session Check:", {
      hasSession: !!session,
      username: session?.user?.username,
      role: session?.user?.role,
      timestamp: new Date().toISOString()
    })

    if (!session) {
      console.log("❌ No NextAuth session found")
      return NextResponse.json(
        { error: "Unauthorized - No session found. Please login first." },
        { status: 401 }
      )
    }

    if (session.user.role !== "admin") {
      console.log("❌ Access denied - Not super admin role:", {
        currentRole: session.user.role,
        requiredRole: "admin"
      })
      return NextResponse.json(
        {
          error: "Forbidden - Super admin access required",
          currentRole: session.user.role,
          requiredRole: "admin",
          message: "Halaman ini khusus untuk super admin (role: 'admin'). Role Anda: '" + session.user.role + "'"
        },
        { status: 403 }
      )
    }

    console.log("✅ Super admin access granted:", session.user.username)

    // User statistics
    const [
      totalUsers,
      activeUsers,
      inactiveUsers,
      mahasiswaCount,
      dosenCount,
      staffTuCount,
      prodiCount,
      dekanCount,
      labAdminCount,
      adminUmumCount,
      adminKeuanganCount,
      kepalaTataUsahaCount
    ] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { is_active: true } }),
      prisma.users.count({ where: { is_active: false } }),
      prisma.users.count({ where: { role: "mahasiswa" } }),
      prisma.users.count({ where: { role: "dosen" } }),
      prisma.users.count({ where: { role: "staff_tu" } }),
      prisma.users.count({ where: { role: "prodi" } }),
      prisma.users.count({ where: { role: "dekan" } }),
      prisma.users.count({ where: { role: "laboratory_admin" } }),
      prisma.users.count({ where: { role: "admin_umum" } }),
      prisma.users.count({ where: { role: "admin_keuangan" } }),
      prisma.users.count({ where: { role: "kepala_tata_usaha" } })
    ])

    // New users this month
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const newThisMonth = await prisma.users.count({
      where: {
        created_at: { gte: startOfMonth }
      }
    })

    // Get prodi statistics
    const prodiStats = await prisma.prodi.findMany({
      select: {
        kode: true,
        nama: true,
        _count: {
          select: {
            students: true,
            lecturers: true,
            laboratory_admins: true,
            staff_tu: true
          }
        }
      }
    })

    // Recent activities (last 10 users created)
    const recentUsers = await prisma.users.findMany({
      take: 10,
      orderBy: {
        created_at: "desc"
      },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        created_at: true
      }
    })

    // Get total counts for other entities
    const [
      totalLetterRequests,
      pendingLetterRequests,
      totalCertificates,
      totalLaboratories
    ] = await Promise.all([
      prisma.letter_requests.count(),
      prisma.letter_requests.count({ where: { status: "pending" } }),
      prisma.laboratory_certificates.count(),
      prisma.laboratories.count()
    ])

    return NextResponse.json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          active: activeUsers,
          inactive: inactiveUsers,
          newThisMonth,
          byRole: {
            mahasiswa: mahasiswaCount,
            dosen: dosenCount,
            staff_tu: staffTuCount,
            prodi: prodiCount,
            dekan: dekanCount,
            laboratory_admin: labAdminCount,
            admin_umum: adminUmumCount,
            admin_keuangan: adminKeuanganCount,
            kepala_tata_usaha: kepalaTataUsahaCount
          }
        },
        prodi: prodiStats,
        system: {
          letterRequests: totalLetterRequests,
          pendingLetters: pendingLetterRequests,
          certificates: totalCertificates,
          laboratories: totalLaboratories
        },
        recentUsers
      }
    })

  } catch (error: any) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch statistics" },
      { status: 500 }
    )
  }
}
