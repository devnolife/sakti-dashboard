import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

async function syncProdiFromDatabase() {
  try {
    console.log('🔄 Mengambil data prodi dari mahasiswa yang sudah ada...')

    // Get unique prodi codes from existing students
    const students = await prisma.students.findMany({
      select: {
        major: true,
        department: true
      },
      distinct: ['major']
    })

    if (students.length === 0) {
      console.log('⚠️  Tidak ada data mahasiswa dengan kode prodi')
      console.log('💡 Tip: Login sebagai mahasiswa terlebih dahulu untuk sync data prodi dari GraphQL')
      return
    }

    console.log(`📊 Ditemukan ${students.length} program studi dari data mahasiswa`)

    let created = 0
    let skipped = 0

    for (const student of students) {
      if (!student.major) {
        skipped++
        continue
      }

      const existingProdi = await prisma.prodi.findUnique({
        where: { kode: student.major }
      })

      if (!existingProdi) {
        // Create new prodi with basic info
        await prisma.prodi.create({
          data: {
            kode: student.major,
            nama: student.department || student.major,
            jenjang: 'S1', // Default, will be updated later
            fakultas: 'Fakultas Teknik', // Default, will be updated later
            akreditasi: null
          }
        })
        created++
        console.log(`✅ Created: ${student.major} - ${student.department}`)
      } else {
        skipped++
        console.log(`⏭️  Skipped: ${student.major} - ${student.department} (already exists)`)
      }
    }

    console.log('\n📈 Ringkasan:')
    console.log(`   - Program studi baru: ${created}`)
    console.log(`   - Sudah ada: ${skipped}`)
    console.log('\n✨ Sync prodi selesai!')
    console.log('💡 Untuk data lengkap (jenjang, fakultas, akreditasi), update manual atau via GraphQL dengan authentication')

  } catch (error) {
    console.error('❌ Error saat sync prodi:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

syncProdiFromDatabase()
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })


