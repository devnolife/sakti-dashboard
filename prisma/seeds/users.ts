import { PrismaClient, Role } from '../../lib/generated/prisma'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

export async function seedUsers(prisma: PrismaClient) {
  console.log('🌱 Seeding users...')

  // Indonesian names for realistic data
  const indonesianNames = [
    'Ahmad Fauzi', 'Siti Rahayu', 'Budi Santoso', 'Dewi Susanti', 'Eko Prasetyo',
    'Rina Wati', 'Joko Widodo', 'Ani Yudhoyono', 'Bambang Supriadi', 'Lina Marlina',
    'Dedi Kurniawan', 'Wati Sulistiawati', 'Agus Salim', 'Yuni Shara', 'Hendra Setiawan',
    'Maya Sari', 'Rudi Hartono', 'Nina Agustina', 'Dodi Sudrajat', 'Lia Indah',
    'Firman Utama', 'Sari Indah', 'Rizki Pratama', 'Dian Sastro', 'Surya Darma',
    'Mega Wati', 'Indra Gunawan', 'Putri Anggraini', 'Fajar Nugroho', 'Sinta Dewi',
    'Andi Rahman', 'Sri Mulyani', 'Faisal Abdullah', 'Ratna Sari', 'Hadi Wijaya'
  ]

  // Get all prodi for assignment
  const allProdi = await prisma.prodi.findMany()
  if (allProdi.length === 0) {
    throw new Error('⚠️  No prodi found. Please run master-data-seed first!')
  }

  const departments = allProdi.map(p => p.nama)
  const defaultPassword = await bcrypt.hash('password123', 10)

  // ========================================
  // 1. CREATE ADMIN USER
  // ========================================
  console.log('👤 Creating Admin user...')
  const adminUser = await prisma.users.create({
    data: {
      id: nanoid(),
      username: 'admin',
      password: defaultPassword,
      name: 'Administrator Sistem',
      role: Role.admin,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log(`✅ Created admin: ${adminUser.username}`)

  // ========================================
  // 2. CREATE DOSEN WITH SUB-ROLES
  // ========================================
  console.log('\n👨‍🏫 Creating Dosen with leadership roles...')

  const dosenLeadership: Array<{
    username: string
    name: string
    sub_role: string
    position: string
    prodi_id: string | null
  }> = [
      // Dekan
      {
        username: 'dekan',
        name: 'Prof. Dr. Ahmad Dekan, S.T., M.T.',
        sub_role: 'dekan',
        position: 'Dekan Fakultas Teknik',
        prodi_id: null
      },

      // Wakil Dekan 1-4
      {
        username: 'wd1',
        name: 'Dr. Budi Santoso, S.T., M.T.',
        sub_role: 'wakil_dekan_1',
        position: 'Wakil Dekan I (Bidang Akademik)',
        prodi_id: null
      },
      {
        username: 'wd2',
        name: 'Dr. Siti Rahayu, S.E., M.M.',
        sub_role: 'wakil_dekan_2',
        position: 'Wakil Dekan II (Administrasi Umum & Keuangan)',
        prodi_id: null
      },
      {
        username: 'wd3',
        name: 'Dr. Eko Prasetyo, S.T., M.T.',
        sub_role: 'wakil_dekan_3',
        position: 'Wakil Dekan III (Kemahasiswaan & Alumni)',
        prodi_id: null
      },
      {
        username: 'wd4',
        name: 'Dr. Rina Wati, S.T., M.Sc.',
        sub_role: 'wakil_dekan_4',
        position: 'Wakil Dekan IV (Kerjasama & Pengembangan)',
        prodi_id: null
      },

      // GKM
      {
        username: 'gkm',
        name: 'Dr. Indra Gunawan, S.T., M.T.',
        sub_role: 'gkm',
        position: 'Ketua Gugus Kendali Mutu',
        prodi_id: null
      }
    ]

  // Create Kepala Prodi and Sekretaris for each prodi
  for (let i = 0; i < allProdi.length; i++) {
    const prodi = allProdi[i]
    const prodiShortCode = prodi.kode.toLowerCase()

    dosenLeadership.push({
      username: `kaprodi_${prodiShortCode}`,
      name: `Dr. ${indonesianNames[i]}, S.T., M.T.`,
      sub_role: 'prodi',
      position: `Kepala Program Studi ${prodi.nama}`,
      prodi_id: prodi.kode
    })

    dosenLeadership.push({
      username: `sekprodi_${prodiShortCode}`,
      name: `${indonesianNames[i + 5]}, S.T., M.T.`,
      sub_role: 'sekretaris_prodi',
      position: `Sekretaris Program Studi ${prodi.nama}`,
      prodi_id: prodi.kode
    })
  }

  for (const dosenData of dosenLeadership) {
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username: dosenData.username,
        password: defaultPassword,
        name: dosenData.name,
        role: Role.dosen,
        sub_role: dosenData.sub_role,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.lecturers.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `NIP${Date.now()}${Math.floor(Math.random() * 1000)}`,
        department: dosenData.prodi_id ? allProdi.find(p => p.kode === dosenData.prodi_id)?.nama : 'Fakultas Teknik',
        prodi_id: dosenData.prodi_id || undefined,
        position: dosenData.position,
        specialization: dosenData.prodi_id ? getSpecialization(allProdi.find(p => p.kode === dosenData.prodi_id)?.nama || '') : 'Management',
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Gedung Dekanat Lantai 2`,
        email: `${dosenData.username}@ft.unsri.ac.id`
      }
    })

    console.log(`  ✅ ${dosenData.position}: ${dosenData.name}`)
  }

  // ========================================
  // 3. CREATE REGULAR DOSEN (20 lecturers)
  // ========================================
  console.log('\n👨‍🏫 Creating regular Dosen...')
  for (let i = 0; i < 20; i++) {
    const prodi = allProdi[i % allProdi.length]
    const username = `dosen${(i + 1).toString().padStart(3, '0')}`

    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username,
        password: defaultPassword,
        name: `${indonesianNames[(i + 10) % indonesianNames.length]}, S.T., M.T.`,
        role: Role.dosen,
        sub_role: 'dosen',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.lecturers.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `${19800000 + i * 1000 + Math.floor(Math.random() * 1000)}`,
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: getLecturerPosition(),
        specialization: getSpecialization(prodi.nama),
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Gedung ${prodi.nama.substring(0, 4)} Ruang ${Math.floor(i / 5) + 1}`,
        email: `${username}@ft.unsri.ac.id`
      }
    })
  }
  console.log(`✅ Created 20 regular dosen`)

  // ========================================
  // 4. CREATE STAFF ROLES
  // ========================================
  console.log('\n👥 Creating Staff users...')

  // Staff TU (one per prodi)
  for (const prodi of allProdi) {
    const username = `stafftu_${prodi.kode.toLowerCase()}`
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username,
        password: defaultPassword,
        name: `${indonesianNames[Math.floor(Math.random() * indonesianNames.length)]}`,
        role: Role.staff_tu,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.staff.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `NIPTU${Date.now()}${Math.floor(Math.random() * 1000)}`,
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: `Staff Tata Usaha ${prodi.nama}`,
        phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Sekretariat ${prodi.nama}`
      }
    })
    console.log(`  ✅ Staff TU: ${prodi.nama}`)
  }

  // Kepala Tata Usaha
  const ktuUser = await prisma.users.create({
    data: {
      id: nanoid(),
      username: 'kepala_tu',
      password: defaultPassword,
      name: 'Drs. Bambang Supriadi, M.M.',
      role: Role.kepala_tata_usaha,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await prisma.staff.create({
    data: {
      id: nanoid(),
      user_id: ktuUser.id,
      nip: `NIPKTU${Date.now()}`,
      department: 'Fakultas Teknik',
      position: 'Kepala Tata Usaha',
      phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
      office: 'Gedung Dekanat'
    }
  })
  console.log(`  ✅ Kepala Tata Usaha`)

  // Admin Keuangan (2 users)
  for (let i = 0; i < 2; i++) {
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username: `admin_keuangan${i + 1}`,
        password: defaultPassword,
        name: indonesianNames[Math.floor(Math.random() * indonesianNames.length)],
        role: Role.admin_keuangan,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.staff.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `NIPKEU${Date.now()}${i}`,
        department: 'Fakultas Teknik',
        position: 'Administrator Keuangan',
        phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: 'Bagian Keuangan'
      }
    })
  }
  console.log(`  ✅ Admin Keuangan (2 users)`)

  // Admin Umum (2 users)
  for (let i = 0; i < 2; i++) {
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username: `admin_umum${i + 1}`,
        password: defaultPassword,
        name: indonesianNames[Math.floor(Math.random() * indonesianNames.length)],
        role: Role.admin_umum,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.staff.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `NIPUMUM${Date.now()}${i}`,
        department: 'Fakultas Teknik',
        position: 'Administrator Umum',
        phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: 'Bagian Umum'
      }
    })
  }
  console.log(`  ✅ Admin Umum (2 users)`)

  // Laboratory Admin (one per prodi)
  for (const prodi of allProdi) {
    const username = `labadmin_${prodi.kode.toLowerCase()}`
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username,
        password: defaultPassword,
        name: indonesianNames[Math.floor(Math.random() * indonesianNames.length)],
        role: Role.laboratory_admin,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.staff.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `NIPLAB${Date.now()}${Math.floor(Math.random() * 1000)}`,
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: `Administrator Laboratorium ${prodi.nama}`,
        phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Laboratorium ${prodi.nama}`
      }
    })
    console.log(`  ✅ Lab Admin: ${prodi.nama}`)
  }

  // Reading Room Admin (one per prodi)
  for (const prodi of allProdi) {
    const username = `rradmin_${prodi.kode.toLowerCase()}`
    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username,
        password: defaultPassword,
        name: indonesianNames[Math.floor(Math.random() * indonesianNames.length)],
        role: Role.reading_room_admin,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.staff.create({
      data: {
        id: nanoid(),
        user_id: user.id,
        nip: `NIPRR${Date.now()}${Math.floor(Math.random() * 1000)}`,
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: `Administrator Ruang Baca ${prodi.nama}`,
        phone: `+62812${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Ruang Baca ${prodi.nama}`
      }
    })
    console.log(`  ✅ Reading Room Admin: ${prodi.nama}`)
  }

  // ========================================
  // 5. CREATE STUDENTS (50 per prodi)
  // ========================================
  console.log('\n🎓 Creating Students...')
  let totalStudents = 0

  for (const prodi of allProdi) {
    for (let i = 0; i < 50; i++) {
      const year = 2020 + (i % 5) // Students from 2020-2024
      const nim = `${year}${prodi.kode}${(i + 1).toString().padStart(4, '0')}`

      const user = await prisma.users.create({
        data: {
          id: nanoid(),
          username: nim,
          password: defaultPassword,
          name: indonesianNames[i % indonesianNames.length],
          role: Role.mahasiswa,
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      })

      await prisma.students.create({
        data: {
          id: nanoid(),
          user_id: user.id,
          nim,
          major: prodi.nama,
          department: prodi.nama,
          prodi_id: prodi.kode,
          angkatan: year,
          semester: Math.min(Math.floor((2025 - year) * 2) + 1, 8),
          academic_year: `${year}/${year + 1}`,
          jenis_kelamin: i % 2 === 0 ? 'Laki-laki' : 'Perempuan',
          phone: `+62814${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
          email: `${nim}@student.ft.unsri.ac.id`,
          address: `Jl. Contoh No. ${i + 1}, Palembang`,
          enroll_date: new Date(year, 7, 1), // August 1st
          semester_awal: `Ganjil ${year}/${year + 1}`,
          gpa: parseFloat((2.5 + Math.random() * 1.5).toFixed(2)),
          guardian: {
            name: `Orang Tua ${indonesianNames[i % indonesianNames.length]}`,
            phone: `+6281${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            relationship: 'Orang Tua'
          }
        }
      })
      totalStudents++
    }
    console.log(`  ✅ Created 50 students for ${prodi.nama}`)
  }

  console.log(`\n✅ Total users seeded: ${totalStudents + dosenLeadership.length + 20 + allProdi.length * 3 + 5}`)
  console.log(`   - Admin: 1`)
  console.log(`   - Dosen Leadership: ${dosenLeadership.length}`)
  console.log(`   - Regular Dosen: 20`)
  console.log(`   - Staff TU: ${allProdi.length}`)
  console.log(`   - Kepala TU: 1`)
  console.log(`   - Admin Keuangan: 2`)
  console.log(`   - Admin Umum: 2`)
  console.log(`   - Lab Admin: ${allProdi.length}`)
  console.log(`   - Reading Room Admin: ${allProdi.length}`)
  console.log(`   - Students: ${totalStudents}`)

  console.log(`\n🔑 Default password for all users: password123`)
}

// Helper functions
function getLecturerPosition(): string {
  const positions = ['Asisten Ahli', 'Lektor', 'Lektor Kepala', 'Profesor']
  return positions[Math.floor(Math.random() * positions.length)]
}

function getSpecialization(department: string): string {
  const specializations: Record<string, string[]> = {
    'Teknik Informatika': ['Artificial Intelligence', 'Software Engineering', 'Data Science', 'Cybersecurity', 'Computer Networks'],
    'Teknik Sipil': ['Struktur', 'Geoteknik', 'Transportasi', 'Manajemen Konstruksi', 'Teknik Lingkungan'],
    'Teknik Elektro': ['Power Systems', 'Electronics', 'Telecommunications', 'Control Systems', 'Renewable Energy'],
    'Teknik Mesin': ['Termodinamika', 'Mekanika Fluida', 'Material', 'Manufaktur', 'Energi'],
    'Arsitektur': ['Design Theory', 'Urban Planning', 'Building Technology', 'Heritage Conservation', 'Green Architecture']
  }

  const deptSpecs = specializations[department] || ['General Engineering']
  return deptSpecs[Math.floor(Math.random() * deptSpecs.length)]
}
