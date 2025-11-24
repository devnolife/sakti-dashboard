import { NextRequest, NextResponse } from 'next/server';
import { getCounterReportAPI, displayCounterReport } from '@/lib/letter-counter';

/**
 * GET /api/letter-counters
 * Returns the latest counter numbers for all prodi and fakultas
 */
export async function GET(request: NextRequest) {
  try {
    const result = await getCounterReportAPI();

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    console.error('Error in letter-counters API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch letter counters' },
      { status: 500 }
    );
  }
}
