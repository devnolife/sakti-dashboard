import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { graphqlClient } from '@/lib/graphql/client'
import { GET_ALL_PRODI, AllProdiResponse } from '@/lib/graphql/queries'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Syncing prodi from GraphQL...')

    // Fetch data from GraphQL
    const data = await graphqlClient.request<AllProdiResponse>(GET_ALL_PRODI)

    if (!data.getAllProdi || data.getAllProdi.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Tidak ada data prodi dari GraphQL'
      }, { status: 404 })
    }

    console.log(`📊 Found ${data.getAllProdi.length} program studi`)

    let created = 0
    let updated = 0

    for (const prodiData of data.getAllProdi) {
      const existingProdi = await prisma.prodi.findUnique({
        where: { kode: prodiData.kode }
      })

      if (existingProdi) {
        await prisma.prodi.update({
          where: { kode: prodiData.kode },
          data: {
            nama: prodiData.nama,
            jenjang: prodiData.jenjang,
            fakultas: prodiData.fakultas,
            akreditasi: prodiData.akreditasi || null
          }
        })
        updated++
      } else {
        await prisma.prodi.create({
          data: {
            kode: prodiData.kode,
            nama: prodiData.nama,
            jenjang: prodiData.jenjang,
            fakultas: prodiData.fakultas,
            akreditasi: prodiData.akreditasi || null
          }
        })
        created++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sync prodi berhasil',
      data: {
        created,
        updated,
        total: data.getAllProdi.length
      }
    })

  } catch (error: any) {
    console.error('❌ Error syncing prodi:', error)
    return NextResponse.json({
      success: false,
      message: 'Error syncing prodi dari GraphQL',
      error: error.message
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const prodiList = await prisma.prodi.findMany({
      orderBy: {
        kode: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      data: prodiList,
      total: prodiList.length
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching prodi',
      error: error.message
    }, { status: 500 })
  }
}
