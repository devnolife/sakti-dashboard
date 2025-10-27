import { NextRequest, NextResponse } from 'next/server'

// TODO: Replace with GraphQL GET_PROFILE query
export async function POST(request: NextRequest) {
  console.warn('⚠️ STUB: student/profile API - Replace with GraphQL')
  return NextResponse.json({ 
    student: null,
    message: 'Use GraphQL GET_PROFILE query instead' 
  })
}
