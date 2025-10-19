import { PrismaClient } from '../lib/generated/prisma'
// import { seedUsers } from './seeds/users'
// import { seedCompanies } from './seeds/companies'
// import { seedBookCategories } from './seeds/books'
// import { seedLetterTypes } from './seeds/letters'
// import { seedSystemConfigs } from './seeds/system'
import { seedAcademicData } from './seeds/seed-academic-data'
import { seedStudentData } from './seeds/seed-student-data'
import { seedLibraryData } from './seeds/seed-library-data'
import { seedExamData } from './seeds/seed-exam-data'
import { seedExamRequirements } from './seeds/seed-exam-requirements'
import { seedLaboratoryData } from './seeds/seed-laboratory-data'
import { seedScheduleData } from './seeds/seed-schedule-data'
import { seedCorrespondenceData } from './seeds/seed-correspondence-data'
import { seedAIKData } from './seeds/seed-aik-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting comprehensive database seeding...')

  try {
    // Seed basic data first (users, system configs, etc.)
    // console.log('👥 Seeding users and profiles...')
    // await seedUsers(prisma)

    // console.log('🏢 Seeding companies...')
    // await seedCompanies(prisma)

    // console.log('📚 Seeding book categories...')
    // await seedBookCategories(prisma)

    // console.log('📋 Seeding letter types...')
    // await seedLetterTypes(prisma)

    // console.log('⚙️ Seeding system configurations...')
    // await seedSystemConfigs(prisma)

    // Seed academic-related data
    console.log('🎓 Seeding academic data...')
    await seedAcademicData(prisma)

    console.log('👨‍🎓 Seeding student data...')
    await seedStudentData(prisma)

    // Seed exam-related data
    console.log('📝 Seeding exam requirements...')
    await seedExamRequirements(prisma)

    console.log('🎯 Seeding exam data...')
    await seedExamData(prisma)

    // Seed other modules
    console.log('📖 Seeding library data...')
    await seedLibraryData(prisma)

    console.log('🧪 Seeding laboratory data...')
    await seedLaboratoryData(prisma)

    console.log('📅 Seeding schedule data...')
    await seedScheduleData(prisma)

    console.log('📨 Seeding correspondence data...')
    await seedCorrespondenceData(prisma)

    console.log('🕌 Seeding AIK data...')
    await seedAIKData(prisma)

    console.log('✅ Comprehensive database seeding completed successfully!')
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