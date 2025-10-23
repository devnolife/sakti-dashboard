import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// Sample data prodi untuk Fakultas Teknik Unismuh
const prodiData = [
  {
    kode: '57201',
    nama: 'Teknik Informatika',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B'
  },
  {
    kode: '57202',
    nama: 'Teknik Elektro',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B'
  },
  {
    kode: '57203',
    nama: 'Teknik Sipil',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B'
  },
  {
    kode: '57204',
    nama: 'Teknik Arsitektur',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B'
  },
  {
    kode: '57205',
    nama: 'Teknik Mesin',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B'
  }
]

async function seedProdi() {
  try {
    console.log('🌱 Seeding data prodi...\n')

    let created = 0
    let skipped = 0

    for (const prodi of prodiData) {
      const existingProdi = await prisma.prodi.findUnique({
        where: { kode: prodi.kode }
      })

      if (!existingProdi) {
        await prisma.prodi.create({
          data: prodi
        })
        created++
        console.log(`✅ Created: ${prodi.kode} - ${prodi.nama}`)
      } else {
        // Update existing prodi
        await prisma.prodi.update({
          where: { kode: prodi.kode },
          data: prodi
        })
        skipped++
        console.log(`✏️  Updated: ${prodi.kode} - ${prodi.nama}`)
      }
    }

    console.log('\n📈 Ringkasan:')
    console.log(`   - Program studi baru: ${created}`)
    console.log(`   - Program studi diupdate: ${skipped}`)
    console.log(`   - Total: ${prodiData.length}`)
    console.log('\n✨ Seed prodi selesai!')
    console.log('💡 Edit file scripts/seed-prodi.ts untuk menambah/mengubah data prodi')

  } catch (error) {
    console.error('❌ Error saat seed prodi:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedProdi()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
