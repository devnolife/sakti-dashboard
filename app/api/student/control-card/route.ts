import { NextResponse } from 'next/server'
import { getControlCardData } from '@/app/actions/academic-actions'

export async function GET() {
  try {
    const controlCardData = await getControlCardData()
    return NextResponse.json(controlCardData)
  } catch (error) {
    console.error('Error in control card API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch control card data' },
      { status: 500 }
    )
  }
}
