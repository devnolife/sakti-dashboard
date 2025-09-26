import { NextRequest, NextResponse } from 'next/server'
import { getStudentScheduleData } from '@/app/actions/schedule-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getStudentScheduleData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Schedule API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch schedule data' },
      { status: 500 }
    )
  }
}
