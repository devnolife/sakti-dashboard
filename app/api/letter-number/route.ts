import { NextRequest, NextResponse } from 'next/server'
import { previewLetterNumber, getLetterStatistics } from '@/lib/utils/letter-number'

/**
 * GET /api/letter-number
 * Preview next letter number without incrementing counter
 *
 * Query params:
 * - jenisSurat: Type of letter (e.g., 'SKA', 'SIP')
 * - prodiKode: Prodi code short (e.g., 'IF', 'TE')
 * - prodiId: Prodi ID (e.g., '55202')
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const jenisSurat = searchParams.get('jenisSurat')
    const prodiKode = searchParams.get('prodiKode')
    const prodiId = searchParams.get('prodiId')

    if (!jenisSurat || !prodiKode || !prodiId) {
      return NextResponse.json(
        {
          error: 'Missing required parameters',
          required: ['jenisSurat', 'prodiKode', 'prodiId']
        },
        { status: 400 }
      )
    }

    const nomorSurat = await previewLetterNumber(jenisSurat, prodiKode, prodiId)

    return NextResponse.json({
      success: true,
      nomorSurat,
      preview: true,
      params: {
        jenisSurat,
        prodiKode,
        prodiId
      }
    })
  } catch (error) {
    console.error('Error previewing letter number:', error)
    return NextResponse.json(
      { error: 'Failed to preview letter number' },
      { status: 500 }
    )
  }
}
