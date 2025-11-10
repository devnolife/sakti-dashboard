import { NextRequest, NextResponse } from 'next/server'
import { getLetterRequestsByProdi } from '@/app/actions/correspondence/letter-requests'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const prodiId = searchParams.get('prodiId')

    if (!prodiId) {
      return NextResponse.json(
        { error: 'Prodi ID is required' },
        { status: 400 }
      )
    }

    const letterRequests = await getLetterRequestsByProdi(prodiId)
    return NextResponse.json(letterRequests)
  } catch (error) {
    console.error('Error fetching letter requests by prodi:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
      )
  }
}
