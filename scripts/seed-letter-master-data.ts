/**
 * Seed Letter Master Data
 * Run: npx tsx scripts/seed-letter-master-data.ts
 */
import { PrismaClient } from '../lib/generated/prisma'
import { seedLetterMasterData } from '../prisma/seeds/letter-master-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting Letter Master Data Seed...\n')

  try {
    await seedLetterMasterData(prisma)
    console.log('\n✨ Done!')
  } catch (error) {
    console.error('\n❌ Error:', error)
    throw error
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('Fatal error:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
