/**
 * Script untuk membersihkan detected_fields dari database
 * 
 * Run dengan: npx ts-node scripts/cleanup-detected-fields.ts
 * atau: npx tsx scripts/cleanup-detected-fields.ts
 */

import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function cleanupDetectedFields() {
  console.log('🧹 Memulai pembersihan detected_fields...\n')

  try {
    // Hitung template yang punya detected_fields
    const templatesWithFields = await prisma.template_uploads.count({
      where: {
        detected_fields: { not: null }
      }
    })

    console.log(`📊 Ditemukan ${templatesWithFields} template dengan detected_fields\n`)

    if (templatesWithFields === 0) {
      console.log('✅ Tidak ada data yang perlu dibersihkan!')
      return
    }

    // Update semua detected_fields ke null
    const result = await prisma.template_uploads.updateMany({
      where: {
        detected_fields: { not: null }
      },
      data: {
        detected_fields: null
      }
    })

    console.log(`✅ Berhasil membersihkan ${result.count} template`)
    console.log('\n📝 Catatan:')
    console.log('   - detected_fields sekarang null untuk semua template')
    console.log('   - Variabel bisa didefinisikan manual via Variable Editor')
    console.log('   - Data variabel disimpan di kolom variable_mapping')

  } catch (error) {
    console.error('❌ Error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run script
cleanupDetectedFields()
  .then(() => {
    console.log('\n🎉 Selesai!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Script gagal:', error)
    process.exit(1)
  })
