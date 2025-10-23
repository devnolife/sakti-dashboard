import fs from 'fs'
import path from 'path'

async function createProdiTemplate() {
  try {
    console.log('� Membuat template data prodi...\n')

    const templateData = [
      {
        kode: "57201",
        nama: "Teknik Informatika",
        jenjang: "S1",
        fakultas: "Fakultas Teknik",
        akreditasi: "B"
      },
      {
        kode: "57202",
        nama: "Teknik Elektro",
        jenjang: "S1",
        fakultas: "Fakultas Teknik",
        akreditasi: "B"
      },
      {
        kode: "57203",
        nama: "Teknik Sipil",
        jenjang: "S1",
        fakultas: "Fakultas Teknik",
        akreditasi: "B"
      }
    ]

    const outputDir = path.join(process.cwd(), 'public', 'test-data')
    const outputFile = path.join(outputDir, 'prodi-data.json')

    // Create directory if not exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Write to JSON file
    fs.writeFileSync(
      outputFile,
      JSON.stringify(templateData, null, 2),
      'utf-8'
    )

    console.log('✅ Template data prodi berhasil dibuat di:', outputFile)
    console.log('📝 Total:', templateData.length, 'program studi (template)')
    console.log('\n💡 Edit file JSON tersebut untuk menambah/mengubah data prodi')
    console.log('💡 Lalu jalankan "pnpm import:prodi" untuk import ke database')
    console.log('\n📌 Catatan: Data prodi akan otomatis tersync saat mahasiswa login')
    console.log('   karena query mahasiswa sudah include data prodi dari GraphQL')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    throw error
  }
}

createProdiTemplate()
  .catch((error) => {
    console.error('Fatal error:', error.message)
    process.exit(1)
  })
