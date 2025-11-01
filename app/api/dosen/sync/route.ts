import { NextRequest, NextResponse } from 'next/server'
import { getServerAuthSession } from '@/lib/auth'
import { syncDosenDataFromGraphQL, syncMultipleDosenFromGraphQL } from '@/lib/graphql/sync-dosen-data'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/dosen/sync
 * Manually trigger sync for dosen data from GraphQL
 * 
 * Body options:
 * - { nidn: "0905078907" } - Sync single dosen
 * - { all: true } - Sync all dosen in database
 * - { force: true } - Force sync even if recently synced
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only dosen or admin can trigger sync
    if (session.user.role !== 'dosen' && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Only dosen or admin can sync data' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { nidn, all, force } = body

    // Sync single dosen
    if (nidn) {
      // Admin can sync any dosen, regular dosen can only sync themselves
      if (session.user.role === 'dosen' && session.user.username !== nidn) {
        return NextResponse.json(
          { error: 'Forbidden - Can only sync your own data' },
          { status: 403 }
        )
      }

      const result = await syncDosenDataFromGraphQL(nidn)

      if (result.success) {
        return NextResponse.json({
          success: true,
          message: `Dosen data synced successfully`,
          data: result.data
        })
      } else {
        return NextResponse.json({
          success: false,
          error: result.error
        }, { status: 400 })
      }
    }

    // Sync all dosen (admin only)
    if (all) {
      if (session.user.role !== 'admin') {
        return NextResponse.json(
          { error: 'Forbidden - Only admin can sync all dosen' },
          { status: 403 }
        )
      }

      // Get all dosen NIDN from database
      const allDosen = await prisma.lecturers.findMany({
        where: {
          nidn: {
            not: null
          }
        },
        select: {
          nidn: true
        }
      })

      const nidnList = allDosen
        .filter(d => d.nidn)
        .map(d => d.nidn as string)

      const results = await syncMultipleDosenFromGraphQL(nidnList)

      return NextResponse.json({
        success: true,
        message: `Batch sync completed`,
        results: {
          total: results.total,
          success: results.success,
          failed: results.failed,
          errors: results.errors
        }
      })
    }

    return NextResponse.json(
      { error: 'Bad Request - Please provide nidn or all parameter' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Error in dosen sync API:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/dosen/sync
 * Get sync status for current dosen user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerAuthSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (session.user.role !== 'dosen') {
      return NextResponse.json(
        { error: 'Forbidden - Only dosen can check sync status' },
        { status: 403 }
      )
    }

    // Get lecturer data with last sync timestamp
    const lecturer = await prisma.lecturers.findUnique({
      where: {
        user_id: session.user.id
      },
      include: {
        prodi: true,
        users: true
      }
    })

    if (!lecturer) {
      return NextResponse.json(
        { error: 'Lecturer record not found' },
        { status: 404 }
      )
    }

    const lastSync = lecturer.updated_at
    const now = new Date()
    const hoursSinceSync = lastSync
      ? (now.getTime() - new Date(lastSync).getTime()) / (1000 * 60 * 60)
      : null

    return NextResponse.json({
      nidn: lecturer.nidn,
      nama: lecturer.nama,
      lastSync: lastSync,
      hoursSinceSync: hoursSinceSync ? Math.round(hoursSinceSync * 10) / 10 : null,
      needsSync: hoursSinceSync === null || hoursSinceSync > 24,
      dataComplete: !!(
        lecturer.email &&
        lecturer.tempat_lahir &&
        lecturer.tanggal_lahir &&
        lecturer.prodi_id
      )
    })

  } catch (error) {
    console.error('Error in dosen sync status API:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
