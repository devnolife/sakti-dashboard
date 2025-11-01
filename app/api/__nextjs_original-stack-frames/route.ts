import { NextRequest, NextResponse } from 'next/server'

/**
 * Handler untuk request __nextjs_original-stack-frames
 * Mengatasi 404 error yang terjadi karena Next.js error overlay
 * mencoba fetch source maps untuk debugging
 */
export async function POST(request: NextRequest) {
  try {
    // Cek jika request dari error overlay
    const body = await request.json().catch(() => ({}))
    
    // Return empty response atau response yang sesuai dengan format Next.js
    // Ini akan menghentikan request berulang tanpa error
    return NextResponse.json(
      {
        frames: [],
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    // Jika ada error, tetap return response kosong
    return NextResponse.json(
      {
        frames: [],
      },
      {
        status: 200,
      }
    )
  }
}

// Handle GET request juga (untuk berjaga-jaga)
export async function GET() {
  return NextResponse.json(
    {
      frames: [],
    },
    {
      status: 200,
    }
  )
}

