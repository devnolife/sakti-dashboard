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

    const latestSurat = await prisma.surat.findFirst({
      where: { id_prodi: prodiId },
      orderBy: { created_at: 'desc' }
    })

    const suratTahunIni = await prisma.surat.count({
      where: {
        id_prodi: prodiId,
        tahun_masehi: tahunSekarang.toString()
      }
    })

    const bulanRomawi = getBulanRomawi()
    const suratBulanIni = await prisma.surat.count({
      where: {
        id_prodi: prodiId,
        tahun_masehi: tahunSekarang.toString(),
        bulan: bulanRomawi
      }
    })

    const letterTypes = await prisma.letter_types.findMany({
      where: {
        OR: [
          { prodi_id: prodiId, is_active: true },
          { is_global: true, is_active: true }
        ]
      },
      include: { jenis_surat_link: true }
    })

    const letterTypeStats = await Promise.all(
      letterTypes.map(async (letterType) => {
        const students = await prisma.students.findMany({
          where: { prodi_id: prodiId },
          select: { id: true }
        })

        const studentIds = students.map(s => s.id)

        const requests = await prisma.correspondence_requests.findMany({
          where: {
            letter_type_id: letterType.id,
            student_id: { in: studentIds }
          },
          select: { id: true }
        })

        const requestIds = requests.map(r => r.id)
        if (requestIds.length === 0) return null

        const latestSuratForType = await prisma.surat.findFirst({
          where: {
            letter_request_id: { in: requestIds },
            id_prodi: prodiId
          },
          orderBy: { created_at: 'desc' }
        })

        if (!latestSuratForType) return null

        return {
          id: letterType.id,
          title: letterType.title,
          nomor_surat: latestSuratForType.nomor_surat,
          jenis_kode: letterType.jenis_surat_link?.kode || '?',
          jenis_nama: letterType.jenis_surat_link?.nama || 'Unknown',
          scope: letterType.scope,
          created_at: latestSuratForType.created_at.toISOString()
        }
      })
    )

    const validStats = letterTypeStats.filter(stat => stat !== null)

    return NextResponse.json({
      success: true,
      data: {
        lastUsed: latestSurat?.nomor_surat || 'Belum ada',
        lastUsedDate: latestSurat?.created_at?.toISOString() || null,
        totalThisMonth: suratBulanIni,
        totalThisYear: suratTahunIni,
        letterTypes: validStats
      }
    })
  } catch (error) {
    console.error('Error fetching surat statistics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
