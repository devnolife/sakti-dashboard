import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'
import { getCurrentYears, getBulanRomawi } from '@/lib/utils/date-utils'

const prisma = new PrismaClient()

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

    // Get statistics by jenis_surat
    const statistikByJenis = await prisma.surat.groupBy({
      by: ['id_jenis_surat'],
      where: {
        id_prodi: prodiId,
        tahun_masehi: tahunSekarang.toString()
      },
      _count: {
        id: true
      }
    })

    // Get jenis_surat names
    const jenisSurat = await prisma.jenis_surat.findMany()
    const jenisMap = Object.fromEntries(
      jenisSurat.map(j => [j.id, { nama: j.nama, kode: j.kode }])
    )

    const kategorisWithNames = statistikByJenis.map(stat => ({
      id: stat.id_jenis_surat,
      nama: jenisMap[stat.id_jenis_surat || 0]?.nama || 'Unknown',
      kode: jenisMap[stat.id_jenis_surat || 0]?.kode || '?',
      total: stat._count.id
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
