import { PrismaClient } from '../../lib/generated/prisma'

export async function seedLetterMasterData(prisma: PrismaClient) {
  console.log('🌱 Seeding letter master data...')

  // 1. Seed jenis_surat (Jenis surat keluar/masuk)
  console.log('\n📝 Seeding jenis_surat...')
  const jenisSuratData = [
    { id: 1, nama: 'UNSUR PIMPINAN', kode: 'A' },
    { id: 2, nama: 'Berhubungan dengan Muhammadiyah', kode: 'B' },
    { id: 3, nama: 'PERGURUAN TINGGI & INSTANSI SEPIHAK', kode: 'C' },
    { id: 4, nama: 'SURAT KELUAR', kode: 'D' }
  ]

  for (const jenis of jenisSuratData) {
    await prisma.jenis_surat.upsert({
      where: { id: jenis.id },
      update: jenis,
      create: jenis
    })
    console.log(`  ✅ ${jenis.nama} (${jenis.kode})`)
  }

  // 2. Seed masalah_surat (Kategori/Masalah surat)
  console.log('\n📂 Seeding masalah_surat...')
  const masalahSuratData = [
    { id: 1, masalah: 'Masalah Pimpinan', kode: 'I' },
    { id: 2, masalah: 'Perlengkapan dan Pengajaran', kode: 'II' },
    { id: 3, masalah: 'Perlengkapan', kode: 'III' },
    { id: 4, masalah: 'Personal', kode: 'IV' },
    { id: 5, masalah: 'Publikasi dan Dokumentasi', kode: 'V' },
    { id: 6, masalah: 'Kemahasiswaan', kode: 'VI' },
    { id: 7, masalah: 'Keuangan', kode: 'VII' },
    { id: 8, masalah: 'Dan Lain-lain', kode: 'VIII' }
  ]

  for (const masalah of masalahSuratData) {
    await prisma.masalah_surat.upsert({
      where: { id: masalah.id },
      update: masalah,
      create: masalah
    })
    console.log(`  ✅ ${masalah.masalah} (${masalah.kode})`)
  }

  // 3. Seed tujuan (Instansi tujuan)
  console.log('\n🎯 Seeding tujuan...')
  const tujuanData = [
    // Internal (id_jenis: 1)
    { id: 15, nama: 'Rektor', kode: 'A.1', id_jenis: 1 },
    { id: 16, nama: 'Badan Pelaksana Harian (BPH)', kode: 'A.1', id_jenis: 1 },
    { id: 17, nama: 'Wakil Rektor', kode: 'A.1', id_jenis: 1 },
    { id: 18, nama: 'Dekan', kode: 'A.2', id_jenis: 1 },
    { id: 19, nama: 'Karyawan', kode: 'A.3', id_jenis: 1 },
    { id: 20, nama: 'Dosen', kode: 'A.4', id_jenis: 1 },
    { id: 21, nama: 'Mahasiswa', kode: 'A.5', id_jenis: 1 },
    { id: 22, nama: 'Dan Lain-lain', kode: 'A.6', id_jenis: 1 },

    // Muhammadiyah (id_jenis: 2)
    { id: 23, nama: 'Pimpinan Pusat Muhammadiyah', kode: 'B.1', id_jenis: 2 },
    { id: 24, nama: 'Pimpinan Wilayah Muhammadiyah', kode: 'B.2', id_jenis: 2 },
    { id: 25, nama: 'Ortom Muhammadiyah', kode: 'B.3', id_jenis: 2 },
    { id: 26, nama: 'Dan Lain-lain', kode: 'B.4', id_jenis: 2 },

    // External (id_jenis: 3)
    { id: 27, nama: 'Kopertis Wilayah IX', kode: 'C.1', id_jenis: 3 },
    { id: 28, nama: 'Kopertis Wilayah VII', kode: 'C.2', id_jenis: 3 },
    { id: 29, nama: 'Perguruan Tinggi Negeri/Swasta', kode: 'C.3', id_jenis: 3 },
    { id: 30, nama: 'Instansi Pemerintah Yang Terkait', kode: 'C.4', id_jenis: 3 },
    { id: 31, nama: 'Instansi Swasta Yang Terkait', kode: 'C.5', id_jenis: 3 },
    { id: 32, nama: 'Dan Lain-lain', kode: 'C.6', id_jenis: 3 },

    // Undangan (id_jenis: 4)
    { id: 33, nama: 'Undangan', kode: 'D.1', id_jenis: 4 },
    { id: 34, nama: 'Atas Nama Perorangan', kode: 'D.2', id_jenis: 4 },
    { id: 35, nama: 'Dan Lain-lain', kode: 'D.3', id_jenis: 4 }
  ]

  for (const tujuan of tujuanData) {
    await prisma.tujuan.upsert({
      where: { id: tujuan.id },
      update: tujuan,
      create: tujuan
    })
    console.log(`  ✅ ${tujuan.nama} (${tujuan.kode})`)
  }

  // 4. Seed ketentuan_surat (Aturan format)
  console.log('\n⚙️  Seeding ketentuan_surat...')
  const ketentuanData = [
    {
      id: 1,
      id_tujuan: 30,
      id_masalah: 2,
      kode: 'KKP',
      nama: 'Kuliah Kerja Profesi',
      id_jenis: 3,
      format_template: '{counter}/{prodi}/UIN/EXT-KP/{bulan}/{tahun_h}/{tahun_m}'
    },
    {
      id: 2,
      id_tujuan: 21,
      id_masalah: 6,
      kode: 'SK',
      nama: 'Surat Keputusan',
      id_jenis: 2,
      format_template: '{counter}/{prodi}/MUH/SK-MHS/{bulan}/{tahun_h}/{tahun_m}'
    },
    {
      id: 3,
      id_tujuan: 21,
      id_masalah: 6,
      kode: 'SKA',
      nama: 'Surat Keterangan Aktif',
      id_jenis: 1,
      format_template: '{counter}/{prodi}/UIN/INT-SKA/{bulan}/{tahun_h}/{tahun_m}'
    }
  ]

  for (const ketentuan of ketentuanData) {
    await prisma.ketentuan_surat.upsert({
      where: { id: ketentuan.id },
      update: ketentuan,
      create: ketentuan
    })
    console.log(`  ✅ ${ketentuan.nama} (${ketentuan.kode})`)
  }

  console.log('\n✅ Letter master data seeding completed!')
}
