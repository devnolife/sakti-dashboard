import { NextRequest, NextResponse } from 'next/server'
import { getStudentCoursesData } from '@/app/actions/course-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getStudentCoursesData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses data' },
      { status: 500 }
    )
  }
}
