import { NextRequest, NextResponse } from 'next/server'
import { uploadFile, uploadFromBase64, initializeBucket } from '@/lib/minio-client'

// Initialize bucket on server start
initializeBucket().catch(console.error)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const base64Data = formData.get('base64') as string | null
    const fileName = formData.get('fileName') as string | null

    if (!file && !base64Data) {
      return NextResponse.json(
        { error: 'No file or base64 data provided' },
        { status: 400 }
      )
    }

    let fileUrl: string

    if (file) {
      // Upload from File object
      const buffer = Buffer.from(await file.arrayBuffer())
      const originalFileName = fileName || file.name
      fileUrl = await uploadFile(buffer, originalFileName, file.type)
    } else if (base64Data) {
      // Upload from base64
      const originalFileName = fileName || `file-${Date.now()}`
      fileUrl = await uploadFromBase64(base64Data, originalFileName)
    } else {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      url: fileUrl,
      message: 'File uploaded successfully',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      {
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

// Optional: Handle GET request to check upload status
export async function GET() {
  return NextResponse.json({
    status: 'Upload API is running',
    endpoints: {
      POST: 'Upload file (multipart/form-data or base64)',
    },
  })
}
