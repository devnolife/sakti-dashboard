import { prisma } from '../../lib/prisma'
import { getCurrentYears, getBulanRomawi, arabicToLatin } from '../../lib/utils/date-utils'

async function seedSuratNomor() {
  console.log('🌱 Seeding nomor surat...')

  try {
    // Get current dates
    const { hijri, gregorian } = getCurrentYears()
    const bulanRomawi = getBulanRomawi()
    const tahunMasehi = gregorian.toString()
    const tahunHijri = arabicToLatin(hijri.toString())

    // Get jenis_surat yang ada
    const jenisSurat = await prisma.jenis_surat.findMany({
      orderBy: { kode: 'asc' }
    })

    if (jenisSurat.length === 0) {
      console.log('⚠️  Tidak ada jenis_surat, jalankan seed-jenis-surat.ts terlebih dahulu')
      return
    }

    // Get prodi untuk testing (55202)
    const prodiKode = '55202'
    const prodi = await prisma.prodi.findUnique({
      where: {
        kode: prodiKode
      }
    })

    if (!prodi) {
      console.log(`⚠️  Prodi dengan kode ${prodiKode} tidak ditemukan, skip seeding`)
      return
    }

    console.log(`📍 Menggunakan Prodi: ${prodi.nama} (${prodi.kode})`)

    // Create surat dan update counter untuk setiap jenis
    for (const jenis of jenisSurat) {
      // Cek apakah sudah ada counter untuk jenis ini
      let counter = await prisma.count_surat.findUnique({
        where: {
          jenis_tahun_prodi_id: {
            jenis: jenis.kode,
            tahun: tahunMasehi,
            prodi_id: prodi.kode
          }
        }
      })

      // Jika belum ada, buat counter baru
      if (!counter) {
        counter = await prisma.count_surat.create({
          data: {
            jenis: jenis.kode,
            counter: 0,
            tahun: tahunMasehi,
            prodi_id: prodi.kode
          }
        })
        console.log(`✅ Created counter for ${jenis.kode}: 0`)
      }

      // Buat 3-5 surat untuk setiap jenis
      const jumlahSurat = Math.floor(Math.random() * 3) + 3 // 3-5 surat

      for (let i = 1; i <= jumlahSurat; i++) {
        const newCounter = counter.counter + i
        const paddedCounter = newCounter.toString().padStart(3, '0')

        // Format nomor surat: XXX/KODE/BULAN/HIJRI/MASEHI
        const nomorSurat = `${paddedCounter}/${jenis.kode}/${bulanRomawi}/${tahunHijri}/${tahunMasehi}`

        // Cek apakah nomor surat sudah ada
        const existing = await prisma.surat.findUnique({
          where: { nomor_surat: nomorSurat }
        })

        if (existing) {
          console.log(`⏭️  Skip ${nomorSurat} (sudah ada)`)
          continue
        }

        // Buat surat baru
        await prisma.surat.create({
          data: {
            nomor_surat: nomorSurat,
            id_jenis_surat: counter.id,
            id_kode_kategori: jenis.id,
            bulan: bulanRomawi,
            tahun_hijriah: tahunHijri,
            tahun_masehi: tahunMasehi,
            perihal: `Surat ${jenis.nama} ${newCounter}`,
            keterangan: `Surat testing untuk jenis ${jenis.nama}`,
            id_prodi: prodi.kode,
            created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random dalam 30 hari terakhir
          }
        })

        console.log(`✅ Created surat: ${nomorSurat}`)
      }

      // Update counter ke nomor terakhir
      await prisma.count_surat.update({
        where: { id: counter.id },
        data: { counter: counter.counter + jumlahSurat }
      })

      console.log(`✅ Updated counter ${jenis.kode}: ${counter.counter} → ${counter.counter + jumlahSurat}`)
    }

    console.log('\n✅ Seeding nomor surat completed!')
    console.log(`📊 Total jenis surat: ${jenisSurat.length}`)
    console.log(`📝 Format nomor: XXX/${jenisSurat[0]?.kode || 'KODE'}/${bulanRomawi}/${tahunHijri}/${tahunMasehi}`)

  } catch (error) {
    console.error('❌ Error seeding nomor surat:', error)
    throw error
  }
}

seedSuratNomor()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
