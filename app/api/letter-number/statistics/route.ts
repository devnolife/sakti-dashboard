import { NextRequest, NextResponse } from 'next/server'
import { getLetterStatistics } from '@/lib/utils/letter-number'

/**
 * GET /api/letter-number/statistics
 * Get letter statistics for a prodi
 *
 * Query params:
 * - prodiId: Prodi ID (e.g., '55202')
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const prodiId = searchParams.get('prodiId')

    if (!prodiId) {
      return NextResponse.json(
        { error: 'prodiId is required' },
        { status: 400 }
      )
    }

    const statistics = await getLetterStatistics(prodiId)

    return NextResponse.json({
      success: true,
      statistics
    })
  } catch (error) {
    console.error('Error getting letter statistics:', error)
    return NextResponse.json(
      { error: 'Failed to get statistics' },
      { status: 500 }
    )
  }
}
