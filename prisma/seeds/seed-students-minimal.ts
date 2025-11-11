/**
 * Seed Student Users (Minimal)
 * Creates 5 students per prodi for testing
 * 
 * Usage: npx tsx prisma/seeds/seed-students-minimal.ts
 */

import { PrismaClient } from '@/lib/generated/prisma'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Student Users (Minimal)...')

  // Password default untuk semua mahasiswa (plain text - will be hashed by auth system)
  const defaultPassword = 'mahasiswa123'

  // Get all prodi
  const prodiList = await prisma.prodi.findMany({
    orderBy: { kode: 'asc' }
  })

  if (prodiList.length === 0) {
    console.log('⚠️  No prodi found. Please seed prodi data first.')
    return
  }

  console.log(`📚 Found ${prodiList.length} prodi`)

  let totalStudents = 0

  // Create 5 students per prodi
  for (const prodi of prodiList) {
    console.log(`\n👥 Creating 5 students for ${prodi.nama} (${prodi.kode})...`)

    // Get current year for NIM generation
    const currentYear = new Date().getFullYear().toString().slice(-2) // e.g., "25" for 2025

    for (let i = 1; i <= 5; i++) {
      const nimSuffix = String(i).padStart(3, '0') // 001, 002, 003, etc.
      const nim = `${currentYear}${prodi.kode}${nimSuffix}` // e.g., 2555202001

      // Check if student already exists
      const existingUser = await prisma.users.findUnique({
        where: { username: nim }
      })

      if (existingUser) {
        console.log(`   ⏭️  Student ${nim} already exists, skipping...`)
        continue
      }

      // Create user
      const user = await prisma.users.create({
        data: {
          id: nanoid(),
          username: nim,
          name: `Mahasiswa ${prodi.nama} ${i}`,
          password: defaultPassword,
          role: 'mahasiswa',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      })

      // Create student record
      await prisma.students.create({
        data: {
          id: nanoid(),
          nim,
          prodi_id: prodi.kode, // Use kode as prodi_id (FK reference)
          user_id: user.id,
          angkatan: parseInt(`20${currentYear}`), // e.g., 2025
          semester: 1,
          academic_year: `20${currentYear}/20${parseInt(currentYear) + 1}`,
          enroll_date: new Date(),
          status: 'active', // Use 'active' from StudentStatus enum
        }
      })

      console.log(`   ✅ Created: ${nim} - ${user.name}`)
      totalStudents++
    }
  }

  console.log('\n✅ Student Users seeded successfully!')
  console.log('\n📋 Summary:')
  console.log(`   - ${prodiList.length} Prodi`)
  console.log(`   - ${totalStudents} Students (5 per prodi)`)
  console.log('\n🔑 Default Password: mahasiswa123')
  console.log('\n📧 Login Format:')
  console.log('   Username: [NIM]')
  console.log('   Password: mahasiswa123')
  console.log('\n   Example: 2555202001 / mahasiswa123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding students:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
