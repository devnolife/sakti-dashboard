import { PrismaClient } from './lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creating test users...')
  
  const testPassword = 'password123'
  const hashedPassword = await bcrypt.hash(testPassword, 10)
  
  console.log('Password to hash:', testPassword)
  console.log('Hashed password:', hashedPassword)
  
  // Test the hash immediately
  const testCompare = await bcrypt.compare(testPassword, hashedPassword)
  console.log('Immediate test comparison:', testCompare)
  
  const testUsers = [
    // Admin role
    {
      nidn: 'ADMIN001',
      name: 'Administrator System',
      role: 'admin' as const,
      subRole: null,
    },
    
    // Mahasiswa role
    {
      nidn: 'MAHASISWA001', 
      name: 'Ahmad Fauzi',
      role: 'mahasiswa' as const,
      subRole: null,
    },
    
    // Dosen role with subroles
    {
      nidn: 'DOSEN001',
      name: 'Dr. Siti Rahayu', 
      role: 'dosen' as const,
      subRole: 'dosen',
    },
    {
      nidn: 'DEKAN001',
      name: 'Prof. Dr. Ahmad Susanto, M.T.',
      role: 'dosen' as const,
      subRole: 'dekan',
    },
    {
      nidn: 'WD001',
      name: 'Dr. Budiman Santoso, M.T.',
      role: 'dosen' as const,
      subRole: 'wakil_dekan_1',
    },
    {
      nidn: 'WD002',
      name: 'Dr. Sari Mulyani, M.M.',
      role: 'dosen' as const,
      subRole: 'wakil_dekan_2',
    },
    {
      nidn: 'WD003',
      name: 'Dr. Indra Wijaya, M.Pd.',
      role: 'dosen' as const,
      subRole: 'wakil_dekan_3',
    },
    {
      nidn: 'WD004',
      name: 'Dr. Maya Kartika, M.Sc.',
      role: 'dosen' as const,
      subRole: 'wakil_dekan_4',
    },
    {
      nidn: 'PRODI001',
      name: 'Dr. Rudi Hartono, M.T.',
      role: 'dosen' as const,
      subRole: 'prodi',
    },
    {
      nidn: 'SEKPRODI001',
      name: 'Dr. Fitri Rahmawati, M.Kom.',
      role: 'dosen' as const,
      subRole: 'sekretaris_prodi',
    },
    {
      nidn: 'GKM001',
      name: 'Dr. Hasan Basri, M.T.',
      role: 'dosen' as const,
      subRole: 'gkm',
    },
    
    // Test user with multiple subroles (dosen + dekan)
    {
      nidn: 'MULTISUBROLE001',
      name: 'Prof. Dr. Bambang Sutrisno, M.T.',
      role: 'dosen' as const,
      subRole: 'dekan,wakil_dekan_1',
    },
    
    // Test user with dosen + prodi subroles
    {
      nidn: 'MULTISUBROLE002',
      name: 'Dr. Ani Setiawati, M.Kom.',
      role: 'dosen' as const,
      subRole: 'prodi,gkm',
    },
    
    // Staff TU role
    {
      nidn: 'STAFFTU001',
      name: 'Siti Aminah, S.Pd.',
      role: 'staff_tu' as const,
      subRole: null,
    },
    
    // Laboratory Admin role
    {
      nidn: 'LABADMIN001',
      name: 'Bambang Suryadi, S.T.',
      role: 'laboratory_admin' as const,
      subRole: null,
    },
    
    // Reading Room Admin role
    {
      nidn: 'PERPUS001',
      name: 'Dewi Kusuma, S.I.Pust.',
      role: 'reading_room_admin' as const,
      subRole: null,
    },
    
    // Admin Umum role
    {
      nidn: 'ADMINUMUM001',
      name: 'Agus Setiawan, S.E.',
      role: 'admin_umum' as const,
      subRole: null,
    },
    
    // Admin Keuangan role
    {
      nidn: 'ADMINKEU001',
      name: 'Ratna Sari, S.E., M.M.',
      role: 'admin_keuangan' as const,
      subRole: null,
    },
    
    // Kepala Tata Usaha role
    {
      nidn: 'KEPALA001',
      name: 'Drs. Supriyanto, M.M.',
      role: 'kepala_tata_usaha' as const,
      subRole: null,
    }
  ]
  
  for (const userData of testUsers) {
    try {
      const user = await prisma.user.upsert({
        where: { nidn: userData.nidn },
        update: {
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
          subRole: userData.subRole,
          isActive: true
        },
        create: {
          nidn: userData.nidn,
          password: hashedPassword,
          name: userData.name,
          role: userData.role,
          subRole: userData.subRole,
          isActive: true
        }
      })
      const roleInfo = userData.subRole ? `${userData.role} (${userData.subRole})` : userData.role
      console.log(`✅ Created/Updated: ${userData.nidn} (${roleInfo})`)
    } catch (error) {
      console.error(`❌ Failed to create ${userData.nidn}:`, error)
    }
  }
  
  console.log('🎉 All test users created successfully!')
  console.log('\n📋 Login Credentials (all passwords: password123):')
  console.log('='.repeat(60))
  console.log('\n👑 ADMIN ROLE:')
  console.log('ADMIN001 / password123 - Administrator System')
  
  console.log('\n🎓 STUDENT ROLE:')
  console.log('MAHASISWA001 / password123 - Ahmad Fauzi')
  
  console.log('\n👨‍🏫 LECTURER ROLES:')
  console.log('DOSEN001 / password123 - Dr. Siti Rahayu (Dosen)')
  console.log('DEKAN001 / password123 - Prof. Dr. Ahmad Susanto, M.T. (Dekan)')
  console.log('WAKDEKAN001 / password123 - Dr. Budiman Santoso, M.T. (Wakil Dekan I - Akademik)')
  console.log('WAKDEKAN002 / password123 - Dr. Sari Mulyani, M.M. (Wakil Dekan II - Administrasi & Keuangan)')
  console.log('WAKDEKAN003 / password123 - Dr. Indra Wijaya, M.Pd. (Wakil Dekan III - Kemahasiswaan)')
  console.log('WAKDEKAN004 / password123 - Dr. Maya Kartika, M.Sc. (Wakil Dekan IV - Kerjasama & Pengembangan)')
  console.log('PRODI001 / password123 - Dr. Rudi Hartono, M.T. (Kepala Program Studi)')
  console.log('SEKPRODI001 / password123 - Dr. Fitri Rahmawati, M.Kom. (Sekretaris Program Studi)')
  console.log('GKM001 / password123 - Dr. Hasan Basri, M.T. (Gugus Kendali Mutu)')
  
  console.log('\n👥 ADMINISTRATIVE ROLES:')
  console.log('STAFFTU001 / password123 - Siti Aminah, S.Pd. (Staff Tata Usaha)')
  console.log('LABADMIN001 / password123 - Bambang Suryadi, S.T. (Administrator Laboratorium)')
  console.log('PERPUS001 / password123 - Dewi Kusuma, S.I.Pust. (Administrator Ruang Baca)')
  console.log('ADMINUMUM001 / password123 - Agus Setiawan, S.E. (Administrator Umum)')
  console.log('ADMINKEU001 / password123 - Ratna Sari, S.E., M.M. (Administrator Keuangan)')
  console.log('KEPALA001 / password123 - Drs. Supriyanto, M.M. (Kepala Tata Usaha)')
  
  console.log('\n' + '='.repeat(60))
  console.log('Total users created: ' + testUsers.length)
}

main()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
