import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

async function seedExamRequirements() {
  console.log('🌱 Seeding exam requirements...')

  // Delete existing requirements
  await prisma.examRequirement.deleteMany({})

  // Ujian Proposal Requirements
  const proposalRequirements = [
    {
      title: 'Pembayaran BPP',
      description: 'Bukti pembayaran Biaya Penyelenggaraan Pendidikan',
      order: 1
    },
    {
      title: 'Biaya Komprehensif',
      description: 'Bukti pembayaran biaya ujian komprehensif',
      order: 2
    },
    {
      title: 'Surat SK Pembimbing',
      description: 'Surat Keputusan penunjukan pembimbing skripsi',
      order: 3
    },
    {
      title: 'Surat Keterangan Penyelesaian Laporan KKP',
      description: 'Surat keterangan telah menyelesaikan laporan KKP',
      order: 4
    },
    {
      title: 'Transkrip Nilai minimal 145 SKS',
      description: 'Transkrip nilai yang menunjukkan minimal 145 SKS telah diselesaikan',
      order: 5
    },
    {
      title: 'Praktikum Ilmu Falaq',
      description: 'Sertifikat atau bukti telah menyelesaikan praktikum Ilmu Falaq',
      order: 6
    },
    {
      title: 'Surat Pernyataan Publikasi Produk',
      description: 'Surat pernyataan kesediaan publikasi produk penelitian',
      order: 7
    },
    {
      title: 'Bukti Publish Produk',
      description: 'Bukti publikasi atau rencana publikasi produk penelitian',
      order: 8
    },
    {
      title: 'Surat Keterangan Baca Al-Qur\'an',
      description: 'Surat keterangan kemampuan membaca Al-Qur\'an dengan baik',
      order: 9
    },
    {
      title: 'Sertifikat DAD',
      description: 'Sertifikat Dauroh Arabiyah Diniyah (DAD)',
      order: 10
    },
    {
      title: 'Uji Plagiat Skripsi',
      description: 'Hasil uji plagiat skripsi dengan tingkat similarity yang acceptable',
      order: 11
    },
    {
      title: 'Kartu Kontrol Mengikuti Seminar minimal 10 kali',
      description: 'Kartu kontrol kehadiran seminar akademik minimal 10 kali',
      order: 12
    },
    {
      title: 'Persetujuan Pembimbing 1 & 2',
      description: 'Form persetujuan dari pembimbing 1 dan pembimbing 2',
      order: 13
    }
  ]

  // Ujian Hasil Requirements
  const resultRequirements = [
    {
      title: 'Pembayaran BPP',
      description: 'Bukti pembayaran Biaya Penyelenggaraan Pendidikan',
      order: 1
    },
    {
      title: 'Biaya Ujian Seminar (WD2)',
      description: 'Bukti pembayaran biaya ujian seminar ke WD2',
      order: 2
    },
    {
      title: 'Transkrip Nilai',
      description: 'Transkrip nilai terbaru',
      order: 3
    },
    {
      title: 'Sertifikat Praktikum',
      description: 'Sertifikat penyelesaian seluruh praktikum yang dipersyaratkan',
      order: 4
    },
    {
      title: 'Uji Plagiat Skripsi',
      description: 'Hasil uji plagiat skripsi versi terbaru',
      order: 5
    },
    {
      title: 'Persetujuan Pembimbing 1 & 2',
      description: 'Form persetujuan ujian hasil dari pembimbing 1 dan pembimbing 2',
      order: 6
    },
    {
      title: 'Skripsi Jilid 6 Rangkap',
      description: 'Skripsi yang telah dijilid sebanyak 6 rangkap',
      order: 7
    }
  ]

  // Ujian Tutup Requirements
  const closingRequirements = [
    {
      title: 'Pembayaran BPP',
      description: 'Bukti pembayaran Biaya Penyelenggaraan Pendidikan',
      order: 1
    },
    {
      title: 'Pembayaran Ujian',
      description: 'Bukti pembayaran biaya ujian tertutup',
      order: 2
    },
    {
      title: 'Biaya Tambahan ke WD2',
      description: 'Bukti pembayaran biaya tambahan ke Wakil Dekan 2',
      order: 3
    },
    {
      title: 'Pembayaran Wisuda & Perpustakaan',
      description: 'Bukti pembayaran biaya wisuda dan perpustakaan',
      order: 4
    },
    {
      title: 'Uji Plagiat',
      description: 'Hasil uji plagiat final dengan tingkat similarity yang memenuhi standar',
      order: 5
    },
    {
      title: 'Persetujuan Pembimbing 1 & 2',
      description: 'Form persetujuan ujian tertutup dari pembimbing 1 dan pembimbing 2',
      order: 6
    },
    {
      title: 'Skripsi Jilid 1 Rangkap',
      description: 'Skripsi final yang telah dijilid 1 rangkap untuk perpustakaan',
      order: 7
    },
    {
      title: 'Berkas LoA Submit Jurnal',
      description: 'Letter of Acceptance (LoA) atau bukti submit artikel ke jurnal',
      order: 8
    },
    {
      title: 'Transkrip Nilai minimal 150 SKS',
      description: 'Transkrip nilai final dengan minimal 150 SKS',
      order: 9
    },
    {
      title: 'Berkas Persyaratan Yudisium',
      description: 'Kelengkapan berkas persyaratan untuk yudisium',
      order: 10
    }
  ]

  // Insert Proposal Requirements
  for (const req of proposalRequirements) {
    await prisma.examRequirement.create({
      data: {
        examType: 'proposal',
        ...req
      }
    })
  }

  // Insert Result Requirements
  for (const req of resultRequirements) {
    await prisma.examRequirement.create({
      data: {
        examType: 'result',
        ...req
      }
    })
  }

  // Insert Closing Requirements
  for (const req of closingRequirements) {
    await prisma.examRequirement.create({
      data: {
        examType: 'closing',
        ...req
      }
    })
  }

  console.log('✅ Exam requirements seeded successfully!')
  console.log(`   - Proposal: ${proposalRequirements.length} requirements`)
  console.log(`   - Result: ${resultRequirements.length} requirements`)
  console.log(`   - Closing: ${closingRequirements.length} requirements`)
}

seedExamRequirements()
  .catch((e) => {
    console.error('❌ Error seeding exam requirements:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
