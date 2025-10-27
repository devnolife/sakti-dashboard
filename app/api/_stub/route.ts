import { NextRequest, NextResponse } from 'next/server'

/**
 * STUB API Route
 * TODO: Replace with GraphQL queries
 * 
 * This is a temporary stub while we migrate to GraphQL.
 * Returns empty/mock data to prevent build errors.
 */
export async function GET(request: NextRequest) {
  console.warn('⚠️ STUB API called - Replace with GraphQL')
  return NextResponse.json({ data: [] })
}

export async function POST(request: NextRequest) {
  console.warn('⚠️ STUB API called - Replace with GraphQL')
  return NextResponse.json({ success: true })
}

export async function PUT(request: NextRequest) {
  console.warn('⚠️ STUB API called - Replace with GraphQL')
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest) {
  console.warn('⚠️ STUB API called - Replace with GraphQL')
  return NextResponse.json({ success: true })
}
