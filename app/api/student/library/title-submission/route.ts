import { NextRequest, NextResponse } from 'next/server'
import { getThesisSubmissionData, submitThesisTitle } from '@/app/actions/library-actions'

export async function GET(request: NextRequest) {
  try {
    const data = await getThesisSubmissionData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Thesis submission API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch thesis submission data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, abstract, keywords, supervisor_id } = body

    if (!title || !abstract || !keywords || !Array.isArray(keywords)) {
      return NextResponse.json(
        { error: 'Missing required fields: title, abstract, keywords' },
        { status: 400 }
      )
    }

    const result = await submitThesisTitle({
      title,
      abstract,
      keywords,
      supervisorId
    })

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Thesis submission API error:', error)
    return NextResponse.json(
      { error: 'Failed to submit thesis title' },
      { status: 500 }
    )
  }
}
