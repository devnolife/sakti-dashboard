/**
 * Quick fix: Update password admin.umum to bcrypt hash
 */
import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function fixPassword() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const result = await prisma.users.update({
    where: { username: 'admin.umum' },
    data: {
      password: hashedPassword,
      updated_at: new Date()
    }
  })

  console.log('✅ Password updated for:', result.username)
  console.log('🔑 New password: password123')
  console.log('🔒 Hash starts with:', result.password.substring(0, 10))
}

fixPassword()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
