import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentYears, getBulanRomawi } from '@/lib/utils/date-utils'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const prodiId = searchParams.get('prodiId')

    if (!prodiId) {
      return NextResponse.json(
        { error: 'prodiId is required' },
        { status: 400 }
      )
    }

    const { gregorian: tahunSekarang } = getCurrentYears()
    const bulanSekarang = new Date().getMonth() + 1

    // Get all surat for this prodi
    const allSurat = await prisma.surat.findMany({
      where: {
        id_prodi: prodiId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 1
    })

    // Count surat this year
    const suratTahunIni = await prisma.surat.count({
      where: {
        id_prodi: prodiId,
        tahun_masehi: tahunSekarang.toString()
      }
    })

    // Count surat this month
    const bulanRomawi = getBulanRomawi()
    const suratBulanIni = await prisma.surat.count({
      where: {
        id_prodi: prodiId,
        tahun_masehi: tahunSekarang.toString(),
        bulan: bulanRomawi
      }
    })

    // Get latest surat per letter_type (ketentuan surat)
    const suratWithLetterType = await prisma.surat.findMany({
      where: {
        id_prodi: prodiId,
        letter_request_id: { not: null }
      },
      select: {
        id: true,
        nomor_surat: true,
        letter_request_id: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    // Get letter_requests to map to letter_types
    const letterRequestIds = suratWithLetterType
      .map(s => s.letter_request_id)
      .filter((id): id is string => id !== null)

    const letterRequests = await prisma.correspondence_requests.findMany({
      where: {
        id: { in: letterRequestIds }
      },
      select: {
        id: true,
        letter_type_id: true,
        letter_types: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    const letterRequestMap = Object.fromEntries(
      letterRequests.map(lr => [lr.id, { letter_type_id: lr.letter_type_id, title: lr.letter_types.title }])
    )

    // Group by letter_type and get latest nomor_surat
    const letterTypeMap = new Map<string, { title: string; nomor_surat: string; created_at: Date }>()

    for (const surat of suratWithLetterType) {
      if (!surat.letter_request_id) continue
      const letterInfo = letterRequestMap[surat.letter_request_id]
      if (!letterInfo) continue

      const existing = letterTypeMap.get(letterInfo.letter_type_id)
      if (!existing || surat.created_at > existing.created_at) {
        letterTypeMap.set(letterInfo.letter_type_id, {
          title: letterInfo.title,
          nomor_surat: surat.nomor_surat,
          created_at: surat.created_at
        })
      }
    }

    const kategorisWithNames = Array.from(letterTypeMap.entries()).map(([id, data]) => ({
      id,
      title: data.title,
      nomor_surat: data.nomor_surat,
      created_at: data.created_at
    }))

    // Get latest surat number
    const latestSurat = allSurat[0]

    // Get next counter for preview
    const counters = await prisma.count_surat.findMany({
      where: {
        prodi_id: prodiId,
        tahun: tahunSekarang.toString()
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        lastUsed: latestSurat?.nomor_surat || 'Belum ada',
        lastUsedDate: latestSurat?.created_at || null,
        totalThisMonth: suratBulanIni,
        totalThisYear: suratTahunIni,
        categories: kategorisWithNames,
        counters: counters
      }
    })
  } catch (error) {
    console.error('Error fetching surat statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
