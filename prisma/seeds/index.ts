import { PrismaClient } from '../../lib/generated/prisma'
import { seedUsers } from './users'
import { seedCompanies } from './companies'
import { seedBookCategories } from './books'
import { seedLetterTypes } from './letters'
import { seedSystemConfigs } from './system'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Seed in specific order due to dependencies
    console.log('👥 Seeding users and profiles...')
    await seedUsers(prisma)

    console.log('🏢 Seeding companies...')
    await seedCompanies(prisma)

    console.log('📚 Seeding book categories...')
    await seedBookCategories(prisma)

    console.log('📋 Seeding letter types...')
    await seedLetterTypes(prisma)

    console.log('⚙️ Seeding system configurations...')
    await seedSystemConfigs(prisma)

    console.log('✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })