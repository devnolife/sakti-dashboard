import { NextRequest, NextResponse } from 'next/server'
import { getLibraryData } from '@/app/actions/library-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getLibraryData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Library API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch library data' },
      { status: 500 }
    )
  }
}
