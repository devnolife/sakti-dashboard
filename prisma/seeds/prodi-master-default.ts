/**
 * PRODI MASTER DATA - DEFAULT BACKUP
 * 
 * File ini berisi data resmi kode prodi Fakultas Teknik
 * Universitas Muhammadiyah Makassar
 * 
 * JANGAN DIHAPUS! File ini adalah backup master data prodi resmi.
 * 
 * Kode Prodi Resmi:
 * - 20201: Teknik Elektro
 * - 22201: Teknik Pengairan
 * - 23201: Arsitektur
 * - 55202: Informatika
 * - 35201: Perencanaan Wilayah dan Kota
 * 
 * Usage:
 *   npm run seed:prodi-master
 *   atau
 *   npx tsx prisma/seeds/prodi-master-default.ts
 */

import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

/**
 * DATA PRODI RESMI FAKULTAS TEKNIK UNISMUH MAKASSAR
 * Verified: November 2025
 */
export const PRODI_MASTER_DATA = [
  {
    kode: '20201',
    nama: 'Teknik Elektro',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B',
  },
  {
    kode: '22201',
    nama: 'Teknik Pengairan',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B',
  },
  {
    kode: '23201',
    nama: 'Arsitektur',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B',
  },
  {
    kode: '55202',
    nama: 'Informatika',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B',
  },
  {
    kode: '35201',
    nama: 'Perencanaan Wilayah dan Kota',
    jenjang: 'S1',
    fakultas: 'Fakultas Teknik',
    akreditasi: 'B',
  },
] as const

/**
 * KEPALA PRODI RESMI
 * Data dari SINTA - November 2025
 */
export const KAPRODI_MASTER_DATA = [
  {
    prodi: '55202',
    nidn: '0905078907',
    name: 'RIZKI YUSLIANA BAKTI',
    gelar: 'S.T, M.T',
    position: 'Kepala Program Studi Informatika',
  },
  {
    prodi: '23201',
    nidn: '0927098403',
    name: 'CITRA AMALIA AMAL',
    gelar: 'S.T, M.T',
    position: 'Kepala Program Studi Arsitektur',
  },
  {
    prodi: '22201',
    nidn: '0912087505',
    name: 'M. AGUSALIM',
    gelar: 'S.T, M.T',
    position: 'Kepala Program Studi Teknik Pengairan',
  },
  {
    prodi: '35201',
    nidn: '0926048906',
    name: 'NINI APRIANI RUMATA',
    gelar: 'S.T, M.T',
    position: 'Kepala Program Studi Perencanaan Wilayah dan Kota',
  },
] as const

/**
 * Seed function untuk restore data prodi master
 */
async function seedProdiMaster() {
  console.log('🌱 Seeding PRODI MASTER DATA (Official Backup)...\n')
  console.log('='.repeat(60))

  try {
    console.log('\n📚 Restoring Program Studi (Official Codes)...')

    for (const prodi of PRODI_MASTER_DATA) {
      await prisma.prodi.upsert({
        where: { kode: prodi.kode },
        update: prodi,
        create: prodi,
      })
      console.log(`   ✅ ${prodi.nama} (${prodi.kode})`)
    }

    console.log('\n✅ Prodi Master Data Restored Successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - ${PRODI_MASTER_DATA.length} Program Studi`)
    console.log('   - 20201: Teknik Elektro')
    console.log('   - 22201: Teknik Pengairan')
    console.log('   - 23201: Arsitektur')
    console.log('   - 55202: Informatika')
    console.log('   - 35201: Perencanaan Wilayah dan Kota')
    console.log('\n💾 Data has been safely restored from master backup!')

  } catch (error) {
    console.error('❌ Error seeding prodi master:', error)
    throw error
  }
}

// Run if executed directly
if (require.main === module) {
  seedProdiMaster()
    .then(async () => {
      await prisma.$disconnect()
      console.log('\n✨ Done!')
    })
    .catch(async (e) => {
      console.error('❌ Error:', e)
      await prisma.$disconnect()
      process.exit(1)
    })
}

export default seedProdiMaster
