import { NextRequest, NextResponse } from 'next/server'
import { getStudentGradesData } from '@/app/actions/grade-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getStudentGradesData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grades data' },
      { status: 500 }
    )
  }
}
