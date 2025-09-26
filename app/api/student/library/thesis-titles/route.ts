import { NextRequest, NextResponse } from 'next/server'
import { getThesisTitlesData } from '@/app/actions/library-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getThesisTitlesData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Thesis titles API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch thesis titles data' },
      { status: 500 }
    )
  }
}
