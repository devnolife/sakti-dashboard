import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const prodiId = searchParams.get('prodiId')
    const limit = parseInt(searchParams.get('limit') || '50')

    if (!prodiId) {
      return NextResponse.json(
        { error: 'prodiId is required' },
        { status: 400 }
      )
    }

    // Get all surat for this prodi with relations
    const suratList = await prisma.surat.findMany({
      where: {
        id_prodi: prodiId
      },
      include: {
        jenis_surat: true,
        masalah_surat: true,
        tujuan: true
      },
      orderBy: {
        created_at: 'desc'
      },
      take: limit
    })

    // Get letter request details if available
    const formattedList = await Promise.all(suratList.map(async (surat) => {
      let mahasiswaName = '-'
      let nim = '-'

      if (surat.letter_request_id) {
        try {
          const letterRequest = await prisma.letter_requests.findUnique({
            where: { id: surat.letter_request_id },
            include: {
              students: {
                include: {
                  users: true
                }
              }
            }
          })

          if (letterRequest?.students?.users) {
            mahasiswaName = letterRequest.students.users.name || '-'
            nim = letterRequest.students.nim || '-'
          }
        } catch (error) {
          console.error('Error fetching letter request:', error)
        }
      }

      return {
        id: surat.id,
        nomorSurat: surat.nomor_surat,
        perihal: surat.perihal,
        jenisSurat: surat.jenis_surat?.nama || '-',
        kodejenis: surat.jenis_surat?.kode || '-',
        masalahSurat: surat.masalah_surat?.nama || '-',
        kodeMasalah: surat.masalah_surat?.kode || '-',
        tujuan: surat.tujuan?.nama || '-',
        kodeTujuan: surat.tujuan?.kode || '-',
        bulan: surat.bulan,
        tahunHijriah: surat.tahun_hijriah,
        tahunMasehi: surat.tahun_masehi,
        createdAt: surat.created_at,
        mahasiswa: mahasiswaName,
        nim: nim
      }
    }))

    return NextResponse.json({
      success: true,
      data: formattedList,
      total: formattedList.length
    })
  } catch (error) {
    console.error('Error fetching surat list:', error)
    return NextResponse.json(
      { error: 'Failed to fetch surat list' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
