import { prisma } from '../../lib/prisma'

async function seedJenisSurat() {
  console.log('🌱 Seeding jenis_surat...')

  const jenisSurat = [
    { nama: 'Kuliah Kerja Profesi', kode: 'KKP' },
    { nama: 'Akademik', kode: 'AKD' },
    { nama: 'Umum', kode: 'UMM' },
    { nama: 'Riset', kode: 'RST' },
    { nama: 'Kepegawaian', kode: 'KPG' },
  ]

  for (const surat of jenisSurat) {
    await prisma.jenis_surat.upsert({
      where: { kode: surat.kode },
      update: {},
      create: surat,
    })
    console.log(`✅ Created/Updated jenis_surat: ${surat.nama} (${surat.kode})`)
  }

  console.log('✅ Seeding jenis_surat completed')
}

seedJenisSurat()
  .catch((e) => {
    console.error('❌ Error seeding jenis_surat:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
