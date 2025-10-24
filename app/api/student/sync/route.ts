import { NextRequest, NextResponse } from 'next/server'
import { getServerAuthSession } from '@/lib/auth'
import { syncStudentDataFromGraphQL, getEnrichedStudentProfile } from '@/lib/graphql/sync-student-data'

/**
 * GET /api/student/sync
 * Sync student data from GraphQL and return enriched profile
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerAuthSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Only students can access this endpoint
    if (session.user.role !== 'mahasiswa') {
      return NextResponse.json(
        { error: 'Access denied. This endpoint is only for students.' },
        { status: 403 }
      )
    }

    // Get NIM from session profile
    const nim = session.user.profile?.nim

    if (!nim) {
      return NextResponse.json(
        { error: 'NIM not found in session' },
        { status: 400 }
      )
    }

    // Check if this is a sync request or just retrieve
    const { searchParams } = new URL(req.url)
    const forceSync = searchParams.get('sync') === 'true'

    if (forceSync) {
      // Force sync from GraphQL
      const syncResult = await syncStudentDataFromGraphQL(nim)

      if (!syncResult.success) {
        return NextResponse.json(
          { error: syncResult.error },
          { status: 500 }
        )
      }

      return NextResponse.json({
        message: 'Student data synced successfully',
        data: syncResult.data
      })
    } else {
      // Just retrieve enriched profile
      const profile = await getEnrichedStudentProfile(nim)

      if (!profile) {
        return NextResponse.json(
          { error: 'Failed to retrieve student profile' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        message: 'Student profile retrieved successfully',
        data: profile
      })
    }
  } catch (error: any) {
    console.error('Error in student sync API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/student/sync
 * Force sync student data from GraphQL (admin can sync for any student)
 */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { nim } = body

    // Students can only sync their own data
    if (session.user.role === 'mahasiswa') {
      const sessionNim = session.user.profile?.nim

      if (nim && nim !== sessionNim) {
        return NextResponse.json(
          { error: 'You can only sync your own data' },
          { status: 403 }
        )
      }
    }

    const targetNim = nim || session.user.profile?.nim

    if (!targetNim) {
      return NextResponse.json(
        { error: 'NIM is required' },
        { status: 400 }
      )
    }

    // Sync student data
    const syncResult = await syncStudentDataFromGraphQL(targetNim)

    if (!syncResult.success) {
      return NextResponse.json(
        { error: syncResult.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Student data synced successfully',
      data: syncResult.data
    })
  } catch (error: any) {
    console.error('Error in student sync API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
