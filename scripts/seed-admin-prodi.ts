/**
 * Seed Admin Prodi Only
 * Username: admin.prodi.{kode_prodi}
 * Password: password123
 */

import { PrismaClient } from '../lib/generated/prisma'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const PASSWORD = 'password123'

async function seedAdminProdi() {
  console.log('🌱 Seeding Admin Prodi...\n')

  try {
    const hashedPassword = await bcrypt.hash(PASSWORD, 10)

    // Get all prodi
    const prodiList = await prisma.prodi.findMany({
      select: {
        kode: true,
        nama: true
      }
    })

    if (prodiList.length === 0) {
      console.log('⚠️  No prodi found in database!')
      return
    }

    console.log(`📚 Found ${prodiList.length} prodi\n`)

    // Create/Update Admin Prodi for each prodi
    for (const prodi of prodiList) {
      const username = `admin.prodi.${prodi.kode}`

      const user = await prisma.users.upsert({
        where: { username },
        update: {
          password: hashedPassword,
          updated_at: new Date(),
          is_active: true
        },
        create: {
          id: nanoid(),
          username,
          name: `Admin Prodi ${prodi.nama}`,
          password: hashedPassword,
          role: 'prodi',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      })

      console.log(`   ✅ ${username} - ${prodi.nama}`)
    }

    console.log('\n✅ Admin Prodi seeded successfully!\n')
    console.log('📋 Login Credentials:')
    console.log('   Username: admin.prodi.{kode_prodi}')
    console.log('   Password: password123')
    console.log('\n📝 Examples:')
    prodiList.forEach(prodi => {
      console.log(`   - admin.prodi.${prodi.kode} (${prodi.nama})`)
    })
    console.log('')

  } catch (error) {
    console.error('❌ Error seeding admin prodi:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedAdminProdi()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
