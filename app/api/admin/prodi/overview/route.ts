import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth-middleware'

// GET - Fetch prodi overview statistics
export async function GET(req: NextRequest) {
  try {
    // Verify authentication and admin role
    const authResult = await verifyAuth(req)
    if (!authResult.authenticated || authResult.user?.role !== 'admin') {
      console.log('Unauthorized access attempt to prodi overview')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Fetching prodi list...')
    // Fetch all prodi
    const prodiList = await prisma.prodi.findMany({
      orderBy: { nama: 'asc' }
    })
    console.log(`Found ${prodiList.length} prodi`)

    // Calculate stats for each prodi
    const prodiStats = await Promise.all(
      prodiList.map(async (prodi) => {
        try {
          // Count accounts (users) per prodi
          // For students
          const studentCount = await prisma.students.count({
            where: { prodi_id: prodi.kode }
          }).catch(() => 0)

          const activeStudentCount = await prisma.students.count({
            where: {
              prodi_id: prodi.kode,
              status: 'active'
            }
          }).catch(() => 0)

          // Count dosen per prodi (based on department/major)
          const dosenCount = await prisma.lecturers.count({
            where: {
              prodi_id: prodi.kode
            }
          }).catch(() => 0)

          // For now, we'll consider all lecturers as active
          const activeDosenCount = dosenCount

          // Count documents - simplified to avoid complex queries
          // Just count related applications for now
          const kkpAppCount = await prisma.kkp_applications.count({
            where: {
              student: {
                prodi_id: prodi.kode
              }
            }
          }).catch(() => 0)

          const examAppCount = await prisma.exam_applications.count({
            where: {
              student: {
                prodi_id: prodi.kode
              }
            }
          }).catch(() => 0)

          const totalDocuments = kkpAppCount + examAppCount
          const requiredDocuments = studentCount * 2 // Example: 2 documents per student
          const completedDocuments = totalDocuments

          // Total accounts = students
          const totalAccounts = studentCount
          const activeAccounts = activeStudentCount

          return {
            id: prodi.kode,
            code: prodi.kode,
            name: prodi.nama,
            faculty: prodi.fakultas,
            totalAccounts,
            activeAccounts,
            totalDosen: dosenCount,
            activeDosen: activeDosenCount,
            totalDocuments,
            requiredDocuments,
            completedDocuments,
            systemStatus: 'active' as const,
            jenjang: prodi.jenjang,
            akreditasi: prodi.akreditasi,
          }
        } catch (error) {
          console.error(`Error calculating stats for prodi ${prodi.kode}:`, error)
          // Return default values if error occurs
          return {
            id: prodi.kode,
            code: prodi.kode,
            name: prodi.nama,
            faculty: prodi.fakultas,
            totalAccounts: 0,
            activeAccounts: 0,
            totalDosen: 0,
            activeDosen: 0,
            totalDocuments: 0,
            requiredDocuments: 0,
            completedDocuments: 0,
            systemStatus: 'active' as const,
            jenjang: prodi.jenjang,
            akreditasi: prodi.akreditasi,
          }
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: prodiStats
    })
  } catch (error) {
    console.error('Error fetching prodi overview:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

