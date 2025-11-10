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
  
  // Check if admin already exists
  let adminUser = await prisma.users.findUnique({
    where: { username: 'admin' }
  })

  if (adminUser) {
    console.log(`⏭️  Admin user already exists, skipping...`)
  } else {
    adminUser = await prisma.users.create({
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
  }

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
    nidn?: string
    gelar_depan?: string
    gelar_belakang?: string
  }> = [
      // Dekan (Data Real dari SINTA)
      {
        username: '0919017702', // NIDN
        name: 'MUH SYAFAAT S. KUBA',
        sub_role: 'dekan,dosen',
        position: 'Dekan Fakultas Teknik',
        prodi_id: null,
        nidn: '0919017702',
        gelar_depan: '',
        gelar_belakang: 'S.T., M.T.'
      },

      // Wakil Dekan 1-3 (Data Real dari SINTA)
      {
        username: '0928088206', // NIDN - IRNAWATY IDRUS
        name: 'IRNAWATY IDRUS',
        sub_role: 'wakil_dekan_1,dosen',
        position: 'Wakil Dekan I (Bidang Akademik)',
        prodi_id: null,
        nidn: '0928088206',
        gelar_depan: 'Dr',
        gelar_belakang: 'S.T., M.T.'
      },
      {
        username: '0926048103', // NIDN - ANDI MAKBUL SYAMSURI
        name: 'ANDI MAKBUL SYAMSURI',
        sub_role: 'wakil_dekan_2,dosen',
        position: 'Wakil Dekan II (Administrasi Umum & Keuangan)',
        prodi_id: null,
        nidn: '0926048103',
        gelar_depan: 'Dr Ir',
        gelar_belakang: 'S.T., M.T.'
      },
      {
        username: '0914099203', // NIDN - SOEMITRO EMIN PRAJA
        name: 'SOEMITRO EMIN PRAJA',
        sub_role: 'wakil_dekan_3,dosen',
        position: 'Wakil Dekan III (Kemahasiswaan & Alumni)',
        prodi_id: null,
        nidn: '0914099203',
        gelar_depan: '',
        gelar_belakang: 'S.T., M.Si'
      },

      // GKM (tetap data dummy untuk sekarang)
      {
        username: 'gkm',
        name: 'Dr. Indra Gunawan, S.T., M.T.',
        sub_role: 'gkm,dosen',
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
    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { username: dosenData.username }
    })

    if (existingUser) {
      console.log(`  ⏭️  Skipping ${dosenData.position} (${dosenData.username}) - already exists`)
      continue
    }

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
        nip: dosenData.nidn || `NIP${Date.now()}${Math.floor(Math.random() * 1000)}`, // Gunakan NIDN jika ada
        department: dosenData.prodi_id ? allProdi.find(p => p.kode === dosenData.prodi_id)?.nama : 'Fakultas Teknik',
        prodi_id: dosenData.prodi_id || undefined,
        position: dosenData.position,
        specialization: dosenData.prodi_id ? getSpecialization(allProdi.find(p => p.kode === dosenData.prodi_id)?.nama || '') : 'Management',
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Gedung Dekanat Lantai 2`,
        email: `${dosenData.username}@ft.unsri.ac.id`
      }
    })

    const nidnInfo = dosenData.nidn ? ` (NIDN: ${dosenData.nidn})` : ''
    console.log(`  ✅ ${dosenData.position}: ${dosenData.name}${nidnInfo}`)
  }

  // ========================================
  // 3. CREATE REGULAR DOSEN (Data Real dari SINTA CSV)
  // ========================================
  console.log('\n👨‍🏫 Creating regular Dosen (Real Data from SINTA)...')
  
  // Dosen Real dari CSV dosen_teknik.csv
  const realDosen = [
    { nidn: '0930048304', nama: 'MUHAMMAD FAISAL', prodi: 'S1 Informatika', jabatan: 'Lektor Kepala', gelar_depan: 'Ir', gelar_belakang: 'S.SI, M.T, Ph.D' },
    { nidn: '0905078907', nama: 'RIZKI YUSLIANA BAKTI', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0903058406', nama: 'TITIN WAHYUNI', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.Pd, S.Pd, M.T' },
    { nidn: '0917109102', nama: 'LUKMAN ANAS', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0916088803', nama: 'FAHRIM IRHAMNAH RACHMAN', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0931087901', nama: 'MUHYIDDIN', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.T.' },
    { nidn: '0019086209', nama: 'ABDUL HAFID', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor Kepala', gelar_depan: 'Ir', gelar_belakang: 'M.T' },
    { nidn: '0903068203', nama: 'RAHMANIA', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0907118201', nama: 'ADRIANI', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0927097401', nama: 'ANDI ABD. HALIK LATEKO', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T, Ph.D.' },
    { nidn: '0907017301', nama: 'ROHANA', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0929068304', nama: 'ANDI ANNISA AMALIA', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.Si' },
    { nidn: '0922108804', nama: 'SITI FUADILLAH ALHUMAIRAH AMIN', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0917117201', nama: 'SAHABUDDIN', prodi: 'S1 Arsitektur', jabatan: 'Lektor Kepala', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0030116004', nama: 'SUKMASARI ANTARIA', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor Kepala', gelar_depan: 'Dr Ir', gelar_belakang: 'M.Si' },
    { nidn: '0930047504', nama: 'FAUZAN HAMDI', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Ir.', gelar_belakang: 'S.T, M.T' },
    { nidn: '0916036801', nama: 'NENNY', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor Kepala', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0904126802', nama: 'HAMZAH AL-IMRAN', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0916108605', nama: 'FATHURRAHMAN BURHANUDDIN', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, S.T, M.T' },
    { nidn: '0901118502', nama: 'M. NURHIDAYAT', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
  ]

  for (const dosen of realDosen) {
    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { username: dosen.nidn }
    })

    if (existingUser) {
      console.log(`  ⏭️  Skipping ${dosen.nama} (NIDN: ${dosen.nidn}) - already exists`)
      continue
    }

    // Cari prodi yang sesuai (mapping dari nama CSV ke kode prodi)
    let prodi_kode = '55202' // Default Informatika
    if (dosen.prodi.includes('Informatika')) prodi_kode = '55202'
    else if (dosen.prodi.includes('Elektro')) prodi_kode = '55201'
    else if (dosen.prodi.includes('Arsitektur')) prodi_kode = '55203'
    else if (dosen.prodi.includes('Pengairan')) prodi_kode = '55204'
    else if (dosen.prodi.includes('Perencanaan')) prodi_kode = '55205'

    const prodi = allProdi.find(p => p.kode === prodi_kode)
    if (!prodi) continue

    const fullName = dosen.gelar_depan 
      ? `${dosen.gelar_depan} ${dosen.nama}, ${dosen.gelar_belakang}`
      : `${dosen.nama}, ${dosen.gelar_belakang}`

    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username: dosen.nidn,
        password: defaultPassword,
        name: fullName,
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
        nip: dosen.nidn, // Gunakan NIDN sebagai NIP
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: dosen.jabatan,
        specialization: getSpecialization(prodi.nama),
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Gedung ${prodi.nama.split(' ').pop()} Ruang Dosen`,
        email: `${dosen.nidn}@ft.unsri.ac.id`
      }
    })
    console.log(`  ✅ ${dosen.jabatan}: ${fullName} (NIDN: ${dosen.nidn})`)
  }
  console.log(`✅ Created ${realDosen.length} real dosen from SINTA database`)

  // ========================================
  // 4. CREATE STAFF ROLES
  // ========================================
  console.log('\n👥 Creating Staff users...')

  // Staff TU / Admin Prodi (Real Data - one per prodi)
  const staffTuData = [
    {
      username: 'admin_if',
      name: 'Siti Nurhaliza, S.Kom',
      prodi_kode: '55202', // Informatika
      phone: '+628126543210'
    },
    {
      username: 'admin_te',
      name: 'Ahmad Fauzi, S.T',
      prodi_kode: '55201', // Teknik Elektro
      phone: '+628126543211'
    },
    {
      username: 'admin_ar',
      name: 'Dewi Lestari, S.T',
      prodi_kode: '55203', // Arsitektur
      phone: '+628126543212'
    },
    {
      username: 'admin_tp',
      name: 'Budi Santoso, S.T',
      prodi_kode: '55204', // Teknik Pengairan
      phone: '+628126543213'
    },
    {
      username: 'admin_pwk',
      name: 'Rina Wulandari, S.T',
      prodi_kode: '55205', // Perencanaan Wilayah dan Kota
      phone: '+628126543214'
    }
  ]

  for (const staffData of staffTuData) {
    const prodi = allProdi.find(p => p.kode === staffData.prodi_kode)
    if (!prodi) {
      console.log(`  ⚠️  Prodi ${staffData.prodi_kode} not found, skipping ${staffData.username}`)
      continue
    }

    // Check if user already exists
    const existingUser = await prisma.users.findUnique({
      where: { username: staffData.username }
    })

    if (existingUser) {
      console.log(`  ⏭️  Skipping ${staffData.username} - already exists`)
      continue
    }

    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        username: staffData.username,
        password: defaultPassword,
        name: staffData.name,
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
        nip: `STAFF${Date.now()}${Math.floor(Math.random() * 10000)}`, // Generate unique NIP untuk staff
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: `Admin Prodi ${prodi.nama}`,
        phone: staffData.phone,
        office: `Sekretariat ${prodi.nama}`
      }
    })
    console.log(`  ✅ Admin Prodi ${prodi.nama}: ${staffData.name} (${staffData.username})`)
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
