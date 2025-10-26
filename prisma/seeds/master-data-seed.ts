import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

export async function seedMasterData() {
  console.log('🌱 Seeding master data...')

  try {
    // Seed Program Studi
    const prodiData = [
      {
        kode: 'S1TI',
        nama: 'S1 Teknik Informatika',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'A',
      },
      {
        kode: 'S1SI',
        nama: 'S1 Sistem Informasi',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'A',
      },
      {
        kode: 'S1TE',
        nama: 'S1 Teknik Elektro',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
      {
        kode: 'S1TM',
        nama: 'S1 Teknik Mesin',
        jenjang: 'S1',
        fakultas: 'Fakultas Teknik',
        akreditasi: 'B',
      },
      {
        kode: 'S1AK',
        nama: 'S1 Akuntansi',
        jenjang: 'S1',
        fakultas: 'Fakultas Ekonomi',
        akreditasi: 'A',
      },
      {
        kode: 'S1MN',
        nama: 'S1 Manajemen',
        jenjang: 'S1',
        fakultas: 'Fakultas Ekonomi',
        akreditasi: 'A',
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

