import { NextRequest, NextResponse } from 'next/server'
import { getStudentAcademicData } from '@/app/actions/academic-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getStudentAcademicData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch academic data' },
      { status: 500 }
    )
  }
}
