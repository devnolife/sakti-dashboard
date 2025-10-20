import { PrismaClient } from '../lib/generated/prisma'
import { seedBasicData } from './seeds/basic-seed'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    console.log('👥 Seeding basic users and profiles...')
    await seedBasicData(prisma)

    console.log('✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
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