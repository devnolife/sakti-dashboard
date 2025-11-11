/**
 * Seed Admin Users
 * Creates essential admin accounts for the system
 * 
 * Usage: npx tsx prisma/seeds/seed-admin-users.ts
 */

import { PrismaClient } from '@/lib/generated/prisma'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding Admin Users...')

  // Password default untuk semua admin (plain text - will be hashed by auth system)
  const defaultPassword = 'admin123'

  // 1. Admin Umum
  console.log('👤 Creating Admin Umum...')
  const adminUmum = await prisma.users.upsert({
    where: { username: 'admin.umum' },
    update: {},
    create: {
      id: nanoid(),
      username: 'admin.umum',
      name: 'Admin Umum',
      password: defaultPassword,
      role: 'admin_umum',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log(`✅ Admin Umum created: ${adminUmum.username}`)

  // 2. Admin Keuangan
  console.log('👤 Creating Admin Keuangan...')
  const adminKeuangan = await prisma.users.upsert({
    where: { username: 'admin.keuangan' },
    update: {},
    create: {
      id: nanoid(),
      username: 'admin.keuangan',
      name: 'Admin Keuangan',
      password: defaultPassword,
      role: 'admin_keuangan',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log(`✅ Admin Keuangan created: ${adminKeuangan.username}`)

  // 3. Get 5 Prodi (take first 5 active prodi)
  const prodiList = await prisma.prodi.findMany({
    take: 5,
    orderBy: { kode: 'asc' }
  })

  if (prodiList.length === 0) {
    console.log('⚠️  No prodi found. Please seed prodi data first.')
    return
  }

  console.log(`📚 Found ${prodiList.length} prodi for admin creation`)

  // 4. Create Admin Prodi for each prodi
  for (const prodi of prodiList) {
    console.log(`👤 Creating Admin for Prodi: ${prodi.nama} (${prodi.kode})...`)

    const username = `admin.prodi.${prodi.kode.toLowerCase()}`

    const adminProdi = await prisma.users.upsert({
      where: { username },
      update: {},
      create: {
        id: nanoid(),
        username,
        name: `Admin Prodi ${prodi.nama}`,
        password: defaultPassword,
        role: 'prodi',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    console.log(`✅ Admin Prodi created: ${adminProdi.username} - ${adminProdi.name}`)
  }

  console.log('\n✅ Admin Users seeded successfully!')
  console.log('\n📋 Summary:')
  console.log('   - 1 Admin Umum')
  console.log('   - 1 Admin Keuangan')
  console.log(`   - ${prodiList.length} Admin Prodi`)
  console.log(`   Total: ${2 + prodiList.length} admin users`)
  console.log('\n🔑 Default Password: admin123')
  console.log('\n📧 Login Credentials:')
  console.log('   Admin Umum: admin.umum / admin123')
  console.log('   Admin Keuangan: admin.keuangan / admin123')
  prodiList.forEach(prodi => {
    console.log(`   Admin Prodi ${prodi.nama}: admin.prodi.${prodi.kode.toLowerCase()} / admin123`)
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding admin users:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
