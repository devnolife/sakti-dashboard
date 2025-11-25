import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth-middleware'

// GET - List all prodi with account statistics
export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all prodi with counts
    const prodiList = await prisma.prodi.findMany({
      orderBy: { nama: 'asc' },
      include: {
        _count: {
          select: {
            students: true,
            lecturers: true,
            staff: true,
            laboratory_admins: true,
          }
        }
      }
    })

    // Calculate statistics for each prodi
    const prodiWithStats = await Promise.all(
      prodiList.map(async (prodi) => {
        // Count active and inactive accounts
        const [activeStudents, activeStaff, activeLecturers] = await Promise.all([
          prisma.students.count({
            where: {
              prodi_id: prodi.kode,
              status: 'active'
            }
          }),
          prisma.staff.count({
            where: {
              prodi_id: prodi.kode,
              users: { is_active: true }
            }
          }),
          prisma.lecturers.count({
            where: {
              prodi_id: prodi.kode,
              users: { is_active: true }
            }
          }),
        ])

        const totalAccounts = prodi._count.students + prodi._count.lecturers + prodi._count.staff + prodi._count.laboratory_admins
        const activeAccounts = activeStudents + activeStaff + activeLecturers

        return {
          kode: prodi.kode,
          nama: prodi.nama,
          jenjang: prodi.jenjang,
          fakultas: prodi.fakultas,
          akreditasi: prodi.akreditasi,
          statistics: {
            totalAccounts,
            activeAccounts,
            inactiveAccounts: totalAccounts - activeAccounts,
            breakdown: {
              students: prodi._count.students,
              lecturers: prodi._count.lecturers,
              staff: prodi._count.staff,
              labAdmins: prodi._count.laboratory_admins,
            }
          }
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: prodiWithStats
    })
  } catch (error) {
    console.error('Error fetching prodi list:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
