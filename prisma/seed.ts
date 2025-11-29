import { PrismaClient } from '../lib/generated/prisma'
import { seedMasterData } from './seeds/master-data-seed'
import { seedUsers } from './seeds/users'
import { seedLetterMasterData } from './seeds/letter-master-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  console.log('='.repeat(50))

  try {
    // 1. Seed Master Data (Prodi) - HARUS PERTAMA
    console.log('\n📚 Step 1: Seeding Master Data (Prodi)...')
    await seedMasterData(prisma)

    // 2. Seed Users dan Profiles (depends on prodi)
    console.log('\n👥 Step 2: Seeding Users and Profiles...')
    await seedUsers(prisma)

    // 3. Seed Letter Master Data (depends on prodi & users)
    console.log('\n📋 Step 3: Seeding Letter Master Data...')
    await seedLetterMasterData(prisma)

    console.log('\n' + '='.repeat(50))
    console.log('✅ Database seeding completed successfully!')
    console.log('='.repeat(50))
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
