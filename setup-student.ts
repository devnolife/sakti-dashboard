import { PrismaClient } from './lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Ensuring student user exists...')
  
  // Create or find student user
  const hashedPassword = await bcrypt.hash('password123', 10)
  
  const studentUser = await prisma.user.upsert({
    where: { nidn: 'MAHASISWA001' },
    update: {
      isActive: true
    },
    create: {
      nidn: 'MAHASISWA001',
      name: 'Ahmad Fauzi',

      password: hashedPassword,
      role: 'mahasiswa',
      isActive: true
    }
  })
  
  console.log('✅ Student user:', studentUser.name, '(ID:', studentUser.id, ')')
  
  // Create or update student profile
  const studentProfile = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {
      nim: '2021010001',
      major: 'Teknik Informatika',
      department: 'Fakultas Teknik',
      semester: 5,
      academicYear: '2021',
      status: 'active',
      enrollDate: new Date('2021-08-01'),
      gpa: 3.75
    },
    create: {
      userId: studentUser.id,
      nim: '2021010001',
      major: 'Teknik Informatika',
      department: 'Fakultas Teknik',
      semester: 5,
      academicYear: '2021',
      status: 'active',
      enrollDate: new Date('2021-08-01'),
      gpa: 3.75
    }
  })
  
  console.log('✅ Student profile created/updated for NIM:', studentProfile.nim)
  
  // Verify login credentials work
  const user = await prisma.user.findUnique({
    where: { nidn: 'MAHASISWA001' },
    include: {
      studentProfile: true
    }
  })
  
  if (user) {
    const passwordMatch = await bcrypt.compare('password123', user.password)
    console.log('✅ Login credentials valid:', passwordMatch)
    console.log('✅ User active:', user.isActive)
    console.log('✅ Has student profile:', !!user.studentProfile)
  }
  
  console.log('')
  console.log('🎯 Login credentials:')
  console.log('   NIDN: MAHASISWA001')
  console.log('   Password: password123')
  console.log('   Role: mahasiswa')
}

main()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
