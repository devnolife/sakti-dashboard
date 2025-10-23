import { PrismaClient } from '@/lib/generated/prisma'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

interface ProdiData {
  kode: string
  nama: string
  jenjang: string
  fakultas: string
  akreditasi?: string | null
}

async function importProdiFromJSON() {
  try {
    const jsonFile = path.join(process.cwd(), 'public', 'test-data', 'prodi-data.json')

    // Check if file exists
    if (!fs.existsSync(jsonFile)) {
      console.log('❌ File prodi-data.json tidak ditemukan!')
      console.log('💡 Jalankan "pnpm fetch:prodi" terlebih dahulu untuk mengambil data dari GraphQL')
      return
    }

    console.log('📂 Reading data dari:', jsonFile)

    // Read JSON file
    const fileContent = fs.readFileSync(jsonFile, 'utf-8')
    const prodiList: ProdiData[] = JSON.parse(fileContent)

    if (!prodiList || prodiList.length === 0) {
      console.log('⚠️  File JSON kosong atau tidak valid')
      return
    }

    console.log(`📊 Ditemukan ${prodiList.length} program studi di JSON\n`)

    let created = 0
    let updated = 0
    let skipped = 0

    for (const prodi of prodiList) {
      try {
        const existingProdi = await prisma.prodi.findUnique({
          where: { kode: prodi.kode }
        })

        if (existingProdi) {
          // Update existing prodi
          await prisma.prodi.update({
            where: { kode: prodi.kode },
            data: {
              nama: prodi.nama,
              jenjang: prodi.jenjang,
              fakultas: prodi.fakultas,
              akreditasi: prodi.akreditasi || null
            }
          })
          updated++
          console.log(`✏️  Updated: ${prodi.kode} - ${prodi.nama}`)
        } else {
          // Create new prodi
          await prisma.prodi.create({
            data: {
              kode: prodi.kode,
              nama: prodi.nama,
              jenjang: prodi.jenjang,
              fakultas: prodi.fakultas,
              akreditasi: prodi.akreditasi || null
            }
          })
          created++
          console.log(`✅ Created: ${prodi.kode} - ${prodi.nama}`)
        }
      } catch (error: any) {
        skipped++
        console.log(`⏭️  Skipped: ${prodi.kode} - Error: ${error.message}`)
      }
    }

    console.log('\n📈 Ringkasan:')
    console.log(`   - Program studi baru: ${created}`)
    console.log(`   - Program studi diupdate: ${updated}`)
    console.log(`   - Gagal/skip: ${skipped}`)
    console.log(`   - Total diproses: ${prodiList.length}`)
    console.log('\n✨ Import prodi selesai!')

  } catch (error: any) {
    console.error('❌ Error saat import prodi:', error.message)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

importProdiFromJSON()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
