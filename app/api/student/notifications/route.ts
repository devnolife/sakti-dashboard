import { NextRequest, NextResponse } from 'next/server'
import { getStudentNotifications } from '@/app/actions/student-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getStudentNotifications()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
