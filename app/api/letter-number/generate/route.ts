import { NextRequest, NextResponse } from 'next/server'
import { generateLetterNumber } from '@/lib/utils/letter-number'
import { prisma } from '@/lib/prisma'
import { getBulanRomawi, getCurrentYears } from '@/lib/utils/date-utils'

/**
 * POST /api/letter-number/generate
 * Generate new letter number and increment counter
 *
 * Body:
 * {
 *   "jenisSurat": "SKA",
 *   "prodiKode": "IF",
 *   "prodiId": "55202",
 *   "perihal": "Surat Keterangan Aktif Kuliah",
 *   "keterangan": "Optional description",
 *   "letterRequestId": "optional-uuid",
 *   "signedDocumentId": "optional-uuid"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      jenisSurat,
      prodiKode,
      prodiId,
      perihal,
      keterangan,
      letterRequestId,
      signedDocumentId
    } = body

    // Validate required fields
    if (!jenisSurat || !prodiKode || !prodiId || !perihal) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          required: ['jenisSurat', 'prodiKode', 'prodiId', 'perihal']
        },
        { status: 400 }
      )
    }

    // Generate letter number (this will increment counter)
    const nomorSurat = await generateLetterNumber(jenisSurat, prodiKode, prodiId)

    // Get date components
    const bulanRomawi = getBulanRomawi()
    const years = getCurrentYears()

    // Save to surat table
    const surat = await prisma.surat.create({
      data: {
        nomor_surat: nomorSurat,
        id_prodi: prodiId,
        perihal,
        keterangan: keterangan || null,
        bulan: bulanRomawi,
        tahun_hijriah: years.hijri.toString(),
        tahun_masehi: years.gregorian.toString(),
        letter_request_id: letterRequestId || null,
        signed_document_id: signedDocumentId || null
      }
    })

    return NextResponse.json({
      success: true,
      surat: {
        id: surat.id,
        nomor_surat: surat.nomor_surat,
        perihal: surat.perihal,
        created_at: surat.created_at
      }
    })
  } catch (error) {
    console.error('Error generating letter number:', error)
    return NextResponse.json(
      { error: 'Failed to generate letter number' },
      { status: 500 }
    )
  }
}
