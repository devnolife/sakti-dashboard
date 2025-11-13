/**
 * Seed Single Student from SINTA
 * Usage: npx tsx scripts/seed-single-student.ts [NIM] [PASSWORD]
 * Example: npx tsx scripts/seed-single-student.ts 105841108421 GNUT6K
 */

import { PrismaClient } from '../lib/generated/prisma'
import { graphqlClient, executeGraphQLQuery } from '../lib/graphql/client'
import { GET_MAHASISWA, MahasiswaResponse } from '../lib/graphql/queries'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function seedStudent(nim: string, password: string) {
  console.log(`🌱 Seeding student from SINTA...`)
  console.log(`   NIM: ${nim}`)
  console.log(`   Password: ${password}\n`)

  try {
    // Fetch data from SINTA
    console.log('🔍 Fetching from SINTA GraphQL...')
    const { data, error } = await executeGraphQLQuery<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim },
      graphqlClient
    )

    if (error || !data?.mahasiswa) {
      console.error('❌ Student not found in SINTA:', error)
      return
    }

    const mhs = data.mahasiswa
    console.log(`✅ Found: ${mhs.nama}\n`)

    // Check if prodi exists
    const prodi = await prisma.prodi.findUnique({
      where: { kode: mhs.kodeProdi || '55202' }
    })

    if (!prodi) {
      console.error(`❌ Prodi ${mhs.kodeProdi} not found in database`)
      console.log('💡 Run: npm run seed:master-data first')
      return
    }

    console.log(`📚 Prodi: ${prodi.nama} (${prodi.kode})`)

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { username: nim }
    })

    if (existingUser) {
      console.log(`⚠️  User already exists, updating password...`)

      // Update password
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.users.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          updated_at: new Date()
        }
      })

      console.log('✅ Password updated!')
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user account
    console.log('\n👤 Creating user account...')
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username: nim,
        name: mhs.nama || `Student ${nim}`,
        password: hashedPassword,
        role: 'mahasiswa',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    console.log(`   ✅ User created: ${user.name}`)

    // Create student record
    console.log('🎓 Creating student record...')
    const student = await prisma.students.create({
      data: {
        id: nanoid(),
        nim: nim,
        prodi_id: prodi.kode,
        user_id: user.id,
        angkatan: mhs.angkatan || parseInt(nim.substring(0, 4)),
        semester: mhs.khs?.length || 1,
        academic_year: `${mhs.angkatan || 2021}/${(mhs.angkatan || 2021) + 1}`,
        enroll_date: new Date(),
        status: 'active',
        email: mhs.email || undefined,
        phone: mhs.hp || undefined,
      }
    })
    console.log(`   ✅ Student record created`)

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('✅ Student seeded successfully!\n')
    console.log('📊 Details:')
    console.log(`   NIM:       ${nim}`)
    console.log(`   Name:      ${mhs.nama}`)
    console.log(`   Prodi:     ${prodi.nama}`)
    console.log(`   Angkatan:  ${mhs.angkatan}`)
    console.log(`   Semester:  ${mhs.khs?.length || 1}`)
    console.log(`   Email:     ${mhs.email || 'N/A'}`)
    console.log(`   HP:        ${mhs.hp || 'N/A'}`)
    console.log(`   IPK:       ${mhs.khs?.[0]?.ipk || 'N/A'}`)
    if (mhs.dosenPenasehat) {
      console.log(`   Dosen PA:  ${mhs.dosenPenasehat.nama}`)
    }
    console.log('\n🔑 Login Credentials:')
    console.log(`   Username: ${nim}`)
    console.log(`   Password: ${password}`)

  } catch (err) {
    console.error('❌ Error seeding student:', err)
    throw err
  }
}

// Main
async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error('❌ Usage: npx tsx scripts/seed-single-student.ts [NIM] [PASSWORD]')
    console.error('   Example: npx tsx scripts/seed-single-student.ts 105841108421 GNUT6K')
    process.exit(1)
  }

  const nim = args[0]
  const password = args[1]

  await seedStudent(nim, password)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\n✨ Done!')
  })
  .catch(async (err) => {
    console.error('Fatal error:', err)
    await prisma.$disconnect()
    process.exit(1)
  })
