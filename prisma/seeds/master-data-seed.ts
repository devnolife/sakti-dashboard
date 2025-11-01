import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

export async function seedMasterData() {
  console.log('🌱 Seeding master data...')

  try {
    // Seed Program Studi (Data dari CSV Dosen SINTA - Universitas Muhammadiyah Makassar)
    const prodiData = [
      {
        kode: '55202',
        nama: 'Informatika',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
      {
        kode: '55201',
        nama: 'Teknik Elektro',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
      {
        kode: '55203',
        nama: 'Arsitektur',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
      {
        kode: '55204',
        nama: 'Teknik Sipil',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
      {
        kode: '55205',
        nama: 'Perencanaan Wilayah dan Kota',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
    ]

    for (const prodi of prodiData) {
      await prisma.prodi.upsert({
        where: { kode: prodi.kode },
        update: prodi,
        create: prodi,
      })
      console.log(`✅ Seeded prodi: ${prodi.nama}`)
    }

    console.log('✅ Master data seeding completed!')
  } catch (error) {
    console.error('❌ Error seeding master data:', error)
    throw error
  }
}

// Run if executed directly
if (require.main === module) {
  seedMasterData()
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}

