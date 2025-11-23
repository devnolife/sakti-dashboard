import { PrismaClient } from '../../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createSuperAdmin() {
  console.log('🛡️  Creating Super Admin account...')

  const username = 'devnolife'
  const password = 'samaKemarin00'
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    // Check if super admin already exists
    const existingAdmin = await prisma.users.findUnique({
      where: { username }
    })

    if (existingAdmin) {
      console.log('⚠️  Super Admin already exists. Updating password...')

      await prisma.users.update({
        where: { username },
        data: {
          password: hashedPassword,
          role: 'admin',
          is_active: true
        }
      })

      console.log('✅ Super Admin password updated!')
    } else {
      console.log('📝 Creating new Super Admin...')

      const { randomBytes } = await import('crypto')
      const userId = randomBytes(16).toString('hex')

      await prisma.users.create({
        data: {
          id: userId,
          username,
          name: 'DevNoLife - Super Admin',
          password: hashedPassword,
          role: 'admin',
          is_active: true,
          updated_at: new Date()
        }
      })

      console.log('✅ Super Admin created successfully!')
    }

    console.log('\n🎉 Super Admin Details:')
    console.log('   Username: devnolife')
    console.log('   Password: samaKemarin00')
    console.log('   Role: admin')
    console.log('   Access: ALL SYSTEMS')
    console.log('\n🔐 Login URL: /auth/signin\n')

  } catch (error) {
    console.error('❌ Error creating super admin:', error)
    throw error
  }
}

async function main() {
  await createSuperAdmin()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
