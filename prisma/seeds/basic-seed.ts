import { PrismaClient, Role } from '../../lib/generated/prisma'
import bcrypt from 'bcryptjs'

export async function seedBasicData(prisma: PrismaClient) {
  const defaultPassword = await bcrypt.hash('password123', 10)

  // Create admin user
  console.log('Creating admin user...')
  const adminUser = await prisma.users.create({
    data: {
      id: 'user-admin-1',
      username: 'admin',
      password: defaultPassword,
      name: 'Administrator',
      role: Role.admin,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  // Create a dosen user with profile
  console.log('Creating dosen user...')
  const dosenUser = await prisma.users.create({
    data: {
      id: 'user-dosen-1',
      username: '0123456789', // NIDN
      password: defaultPassword,
      name: 'Dr. Ahmad Fauzi, S.Kom., M.T.',
      role: Role.dosen,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      lecturers: {
        create: {
          id: 'lecturer-1',
          nip: '0123456789',
          department: 'Teknik Informatika',
          position: 'Dosen',
          specialization: 'Artificial Intelligence',
          email: 'ahmad.fauzi@unismuh.ac.id'
        }
      }
    }
  })

  // Create a mahasiswa user with profile
  console.log('Creating mahasiswa user...')
  const mahasiswaUser = await prisma.users.create({
    data: {
      id: 'user-mahasiswa-1',
      username: '105841101220', // NIM
      password: defaultPassword,
      name: 'Budi Santoso',
      role: Role.mahasiswa,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      students: {
        create: {
          id: 'student-1',
          nim: '105841101220',
          major: 'Teknik Informatika',
          department: 'Fakultas Teknik',
          semester: 5,
          academic_year: '2023/2024',
          enroll_date: new Date('2022-08-01'),
          status: 'active',
          gpa: 3.5
        }
      }
    }
  })

  console.log('Basic users created:', {
    admin: adminUser.username,
    dosen: dosenUser.username,
    mahasiswa: mahasiswaUser.username
  })

  return {
    adminUser,
    dosenUser,
    mahasiswaUser
  }
}
