import { students } from '@/components/dekan/vice-dean-4/mock-data'
import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Checking users in database...')

  const users = await prisma.users.findMany({
    where: {
      role: 'mahasiswa'
    },
    select: {
      id: true,
      nidn: true,
      name: true,
      role: true,
      isActive: true,
      students: {
        select: {
          nim: true,
          major: true
        }
      }
    }
  })

  console.log('📊 Found mahasiswa users:', users.length)
  users.forEach(user => {
    console.log(`- ID: ${user.id}`)
    console.log(`  NIDN: ${user.nidn}`)
    console.log(`  Name: ${user.name}`)
    console.log(`  Role: ${user.role}`)
    console.log(`  Active: ${user.isActive}`)
    console.log(`  Student Profile: ${user.students ? 'Yes' : 'No'}`)
    if (user.students) {
      console.log(`  NIM: ${user.students.nim}`)
      console.log(`  Major: ${user.students.major}`)
    }
    console.log('')
  })
}

main()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
