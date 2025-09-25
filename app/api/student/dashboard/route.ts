import { NextRequest, NextResponse } from 'next/server'
import { getStudentDashboardData } from '@/app/actions/student-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getStudentDashboardData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch student data' },
      { status: 500 }
    )
  }
}
