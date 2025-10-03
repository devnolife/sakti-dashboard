import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Checking users in database...')
  
  const users = await prisma.user.findMany({
    where: {
      role: 'mahasiswa'
    },
    select: {
      id: true,
      nidn: true,
      name: true,
      role: true,
      isActive: true,
      studentProfile: {
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
    console.log(`  Student Profile: ${user.studentProfile ? 'Yes' : 'No'}`)
    if (user.studentProfile) {
      console.log(`  NIM: ${user.studentProfile.nim}`)
      console.log(`  Major: ${user.studentProfile.major}`)
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
