/**
 * Production Seed - Real Data from SINTA Only
 *
 * This seed uses REAL data from SINTA GraphQL API:
 * - Lecturers (Dosen) from SINTA database
 * - Students (Mahasiswa) fetched from SINTA API
 * - Real Prodi codes
 *
 * Usage:
 *   npm run db:seed-production
 *   or
 *   npx tsx prisma/seed-production.ts
 */

import { PrismaClient } from '../lib/generated/prisma'
import { graphqlClient, executeGraphQLQuery } from '../lib/graphql/client'
import { GET_MAHASISWA, MahasiswaResponse } from '../lib/graphql/queries'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const PASSWORD = 'password123'

// ============================================
// HELPER FUNCTIONS
// ============================================

async function fetchStudentFromSINTA(nim: string): Promise<any | null> {
  try {
    const { data, error } = await executeGraphQLQuery<MahasiswaResponse>(
      GET_MAHASISWA,
      { nim },
      graphqlClient
    )

    if (error || !data?.mahasiswa) {
      return null
    }

    return data.mahasiswa
  } catch (err) {
    return null
  }
}

async function createStudentFromSINTA(nim: string, prodi_id: string, hashedPassword: string) {
  console.log(`  🔍 Fetching NIM: ${nim}...`)

  const mhsData = await fetchStudentFromSINTA(nim)

  if (!mhsData) {
    console.log(`    ⏭️  Student ${nim} not found in SINTA, skipping...`)
    return null
  }

  console.log(`    ✅ Found: ${mhsData.nama}`)

  // Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: { username: nim }
  })

  if (existingUser) {
    console.log(`    ⏭️  Student ${nim} already exists, skipping...`)
    return existingUser
  }

  // Create user account
  const user = await prisma.users.create({
    data: {
      id: nanoid(),
      username: nim,
      name: mhsData.nama || `Mahasiswa ${nim}`,
      password: hashedPassword,
      role: 'mahasiswa',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  // Create student record
  const student = await prisma.students.create({
    data: {
      id: nanoid(),
      nim: nim,
      prodi_id: prodi_id,
      user_id: user.id,
      angkatan: mhsData.angkatan || parseInt(nim.substring(0, 2)) + 2000,
      semester: mhsData.khs?.length || 1,
      academic_year: `${mhsData.angkatan || 2024}/${(mhsData.angkatan || 2024) + 1}`,
      enroll_date: new Date(),
      status: 'active',
      email: mhsData.email || undefined,
      phone: mhsData.hp || undefined,
    }
  })

  console.log(`    💾 Created: ${mhsData.nama} (${nim})`)
  return user
}

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function main() {
  console.log('🌱 Starting Production Seed (Real Data from SINTA)...\n')
  console.log('='.repeat(60))

  const hashedPassword = await bcrypt.hash(PASSWORD, 10)

  // ============================================
  // 1. MASTER DATA - PRODI (REAL CODES)
  // ============================================
  console.log('\n📚 Seeding Prodi (Real Codes)...')

  const prodiData = [
    { kode: '20201', nama: 'Teknik Elektro', jenjang: 'S1', fakultas: 'Fakultas Teknik', akreditasi: 'B' },
    { kode: '22201', nama: 'Teknik Pengairan', jenjang: 'S1', fakultas: 'Fakultas Teknik', akreditasi: 'B' },
    { kode: '23201', nama: 'Arsitektur', jenjang: 'S1', fakultas: 'Fakultas Teknik', akreditasi: 'B' },
    { kode: '55202', nama: 'Informatika', jenjang: 'S1', fakultas: 'Fakultas Teknik', akreditasi: 'B' },
    { kode: '35201', nama: 'Perencanaan Wilayah dan Kota', jenjang: 'S1', fakultas: 'Fakultas Teknik', akreditasi: 'B' },
  ]

  for (const prodi of prodiData) {
    await prisma.prodi.upsert({
      where: { kode: prodi.kode },
      update: prodi,
      create: prodi,
    })
    console.log(`   ✅ ${prodi.nama} (${prodi.kode})`)
  }

  const prodiList = await prisma.prodi.findMany({ orderBy: { kode: 'asc' } })

  // ============================================
  // 2. ADMIN USERS
  // ============================================
  console.log('\n👤 Creating Admin Users...')

  await prisma.users.upsert({
    where: { username: 'admin.umum' },
    update: { password: hashedPassword, updated_at: new Date() },
    create: {
      id: nanoid(),
      username: 'admin.umum',
      name: 'Admin Umum',
      password: hashedPassword,
      role: 'admin_umum',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log('   ✅ Admin Umum')

  await prisma.users.upsert({
    where: { username: 'admin.keuangan' },
    update: { password: hashedPassword, updated_at: new Date() },
    create: {
      id: nanoid(),
      username: 'admin.keuangan',
      name: 'Admin Keuangan',
      password: hashedPassword,
      role: 'admin_keuangan',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log('   ✅ Admin Keuangan')

  await prisma.users.upsert({
    where: { username: 'staff.tu' },
    update: { password: hashedPassword, updated_at: new Date() },
    create: {
      id: nanoid(),
      username: 'staff.tu',
      name: 'Staff Tata Usaha',
      password: hashedPassword,
      role: 'staff_tu',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log('   ✅ Staff Tata Usaha')

  // ============================================
  // 3. PIMPINAN FAKULTAS (REAL DATA FROM SINTA)
  // ============================================
  console.log('\n🎓 Creating Pimpinan Fakultas (Real Data from SINTA)...')

  const pimpinan = [
    {
      username: '0919017702',
      name: 'MUH SYAFAAT S. KUBA',
      nip: '0919017702',
      role: 'dekan',
      sub_role: 'dekan,dosen',
      position: 'Dekan Fakultas Teknik',
      gelar_depan: '',
      gelar_belakang: 'S.T., M.T.'
    },
    {
      username: '0928088206',
      name: 'IRNAWATY IDRUS',
      nip: '0928088206',
      role: 'dosen',
      sub_role: 'wakil_dekan_1,dosen',
      position: 'Wakil Dekan I (Bidang Akademik)',
      gelar_depan: 'Dr',
      gelar_belakang: 'S.T., M.T.'
    },
    {
      username: '0926048103',
      name: 'ANDI MAKBUL SYAMSURI',
      nip: '0926048103',
      role: 'dosen',
      sub_role: 'wakil_dekan_2,dosen',
      position: 'Wakil Dekan II (Administrasi Umum & Keuangan)',
      gelar_depan: 'Dr Ir',
      gelar_belakang: 'S.T., M.T.'
    },
    {
      username: '0914099203',
      name: 'SOEMITRO EMIN PRAJA',
      nip: '0914099203',
      role: 'dosen',
      sub_role: 'wakil_dekan_3,dosen',
      position: 'Wakil Dekan III (Kemahasiswaan & Alumni)',
      gelar_depan: '',
      gelar_belakang: 'S.T., M.Si'
    }
  ]

  let dekanUser
  for (let i = 0; i < pimpinan.length; i++) {
    const pim = pimpinan[i]

    const user = await prisma.users.upsert({
      where: { username: pim.username },
      update: { password: hashedPassword, updated_at: new Date() },
      create: {
        id: nanoid(),
        username: pim.username,
        name: pim.name,
        password: hashedPassword,
        role: pim.role as any,
        sub_role: pim.sub_role,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.lecturers.upsert({
      where: { user_id: user.id },
      update: {},
      create: {
        id: nanoid(),
        user_id: user.id,
        nip: pim.nip,
        position: pim.position,
        prodi_id: prodiList[0].kode,
      }
    })

    if (i === 0) dekanUser = user
    console.log(`   ✅ ${pim.position}`)
  }

  // ============================================
  // 4. KEPALA PRODI (REAL DATA)
  // ============================================
  console.log('\n👨‍🏫 Creating Kepala Prodi...')

  const kaprodiReal = [
    { prodi: '55202', nidn: '0905078907', name: 'RIZKI YUSLIANA BAKTI', gelar: 'S.T, M.T' },
    { prodi: '23201', nidn: '0927098403', name: 'CITRA AMALIA AMAL', gelar: 'S.T, M.T' },
    { prodi: '22201', nidn: '0912087505', name: 'M. AGUSALIM', gelar: 'S.T, M.T' },
    { prodi: '35201', nidn: '0926048906', name: 'NINI APRIANI RUMATA', gelar: 'S.T, M.T' },
  ]

  for (const kp of kaprodiReal) {
    const prodi = prodiList.find(p => p.kode === kp.prodi)
    if (!prodi) continue

    const user = await prisma.users.upsert({
      where: { username: kp.nidn },
      update: { password: hashedPassword, updated_at: new Date() },
      create: {
        id: nanoid(),
        username: kp.nidn,
        name: kp.name,
        password: hashedPassword,
        role: 'dosen',
        sub_role: 'prodi,dosen',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.lecturers.upsert({
      where: { user_id: user.id },
      update: {},
      create: {
        id: nanoid(),
        user_id: user.id,
        nip: kp.nidn,
        position: `Kepala Program Studi ${prodi.nama}`,
        prodi_id: prodi.kode,
      }
    })
    console.log(`   ✅ Kaprodi ${prodi.nama}`)
  }

  // ============================================
  // 5. ADMIN PRODI (1 per prodi)
  // ============================================
  console.log('\n📚 Creating Admin Prodi...')

  for (const prodi of prodiList) {
    await prisma.users.upsert({
      where: { username: `admin.prodi.${prodi.kode}` },
      update: { password: hashedPassword, updated_at: new Date() },
      create: {
        id: nanoid(),
        username: `admin.prodi.${prodi.kode}`,
        name: `Admin Prodi ${prodi.nama}`,
        password: hashedPassword,
        role: 'prodi',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    console.log(`   ✅ Admin Prodi ${prodi.nama}`)
  }

  // ============================================
  // 6. MAHASISWA (REAL DATA FROM SINTA API)
  // ============================================
  console.log('\n👥 Creating Mahasiswa (Real Data from SINTA)...')
  console.log('   ⏳ This may take a while...\n')

  let totalStudents = 0
  const studentsPerProdi = 3 // 3 students per prodi untuk testing

  // Sample NIM patterns untuk testing
  const nimPatterns = {
    '20201': ['2220201001', '2320201002', '2420201003'], // Teknik Elektro
    '22201': ['2222201001', '2322201002', '2422201003'], // Teknik Pengairan
    '23201': ['2223201001', '2323201002', '2423201003'], // Arsitektur
    '55202': ['2255202001', '2355202002', '2455202003'], // Informatika
    '35201': ['2235201001', '2335201002', '2435201003'], // PWK
  }

  for (const prodi of prodiList) {
    console.log(`   📖 ${prodi.nama}:`)
    const nimList = nimPatterns[prodi.kode as keyof typeof nimPatterns] || []

    for (const nim of nimList) {
      const student = await createStudentFromSINTA(nim, prodi.kode, hashedPassword)
      if (student) totalStudents++

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300))
    }
    console.log()
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log('='.repeat(60))
  console.log('✅ Production Seed Completed!\n')
  console.log('📊 Summary:')
  console.log(`   - ${prodiList.length} Program Studi (Real Codes)`)
  console.log('   - 2 Admin (Umum & Keuangan)')
  console.log('   - 4 Pimpinan Fakultas (Real from SINTA)')
  console.log(`   - ${kaprodiReal.length} Kepala Prodi (Real from SINTA)`)
  console.log(`   - ${prodiList.length} Admin Prodi`)
  console.log(`   - ${totalStudents} Mahasiswa (Real from SINTA API)`)
  console.log('\n🔑 Default Password: password123')
  console.log('\n📧 Login Examples:')
  console.log('   Dekan:       0919017702 / password123')
  console.log('   Kaprodi IF:  0905078907 / password123')
  console.log('   Admin Umum:  admin.umum / password123')
  console.log('\n💡 To add more students, use:')
  console.log('   npm run fetch:students')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\n✨ Done!')
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
