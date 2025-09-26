import { NextRequest, NextResponse } from 'next/server'
import { getLaboratoryData } from '@/app/actions/laboratory-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getLaboratoryData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in laboratory API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch laboratory data' },
      { status: 500 }
    )
  }
}
