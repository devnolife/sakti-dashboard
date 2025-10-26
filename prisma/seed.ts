import { PrismaClient } from '../lib/generated/prisma'
import { seedMasterData } from './seeds/master-data-seed'
import { seedUsers } from './seeds/users'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // 1. Seed master data first (prodi, etc)
    console.log('\n📊 Seeding Master Data...')
    await seedMasterData()

    // 2. Seed all users with their roles and sub-roles
    console.log('\n👥 Seeding Users...')
    await seedUsers(prisma)

    console.log('\n✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('\n❌ Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
