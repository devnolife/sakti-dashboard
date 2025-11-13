import { PrismaClient } from '../lib/generated/prisma'
import { seedMasterData } from './seeds/master-data-seed'
import { seedUsers } from './seeds/users'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding (Dosen Only)...')

  try {
    // 1. Seed Master Data (Prodi)
    console.log('\n📊 Seeding Master Data...')
    await seedMasterData()

    // 2. Seed Users (akan kita modifikasi untuk dosen only)
    console.log('\n👥 Seeding Dosen Only...')
    await seedDosenOnly(prisma)

    console.log('\n✅ Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

async function seedDosenOnly(prisma: PrismaClient) {
  // Import function dari users.ts tapi skip bagian staff dan mahasiswa
  const bcrypt = require('bcryptjs')
  const { nanoid } = require('nanoid')
  const { Role } = require('../lib/generated/prisma')

  const defaultPassword = await bcrypt.hash('password123', 10)

  // Get all prodi
  const allProdi = await prisma.prodi.findMany()

  // ========================================
  // 1. CREATE ADMIN USER
  // ========================================
  console.log('👤 Creating Admin user...')

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
    prodi_id?: string | null
    nidn?: string
    gelar_depan?: string
    gelar_belakang?: string
  }> = [
      // Dekan (Data Real dari SINTA)
      {
        username: '0919017702',
        name: 'MUH SYAFAAT S. KUBA',
        sub_role: 'dekan,dosen',
        position: 'Dekan Fakultas Teknik',
        prodi_id: null,
        nidn: '0919017702',
        gelar_depan: '',
        gelar_belakang: 'S.T., M.T.'
      },

      // Wakil Dekan 1-3
      {
        username: '0928088206',
        name: 'IRNAWATY IDRUS',
        sub_role: 'wakil_dekan_1,dosen',
        position: 'Wakil Dekan I (Bidang Akademik)',
        prodi_id: null,
        nidn: '0928088206',
        gelar_depan: 'Dr',
        gelar_belakang: 'S.T., M.T.'
      },
      {
        username: '0926048103',
        name: 'ANDI MAKBUL SYAMSURI',
        sub_role: 'wakil_dekan_2,dosen',
        position: 'Wakil Dekan II (Administrasi Umum & Keuangan)',
        prodi_id: null,
        nidn: '0926048103',
        gelar_depan: 'Dr Ir',
        gelar_belakang: 'S.T., M.T.'
      },
      {
        username: '0914099203',
        name: 'SOEMITRO EMIN PRAJA',
        sub_role: 'wakil_dekan_3,dosen',
        position: 'Wakil Dekan III (Kemahasiswaan & Alumni)',
        prodi_id: null,
        nidn: '0914099203',
        gelar_depan: '',
        gelar_belakang: 'S.T., M.Si'
      },

      // GKM
      {
        username: 'gkm',
        name: 'Dr. Indra Gunawan, S.T., M.T.',
        sub_role: 'gkm,dosen',
        position: 'Ketua Gugus Kendali Mutu',
        prodi_id: null
      }
    ]

  // Kepala Prodi dan Sekretaris Prodi (Data Real dari SINTA)
  // Informatika (55202)
  dosenLeadership.push({
    username: '0905078907',
    name: 'RIZKI YUSLIANA BAKTI',
    sub_role: 'prodi,dosen',
    position: 'Kepala Program Studi Informatika',
    prodi_id: '55202',
    nidn: '0905078907',
    gelar_depan: '',
    gelar_belakang: 'S.T, M.T'
  })

  dosenLeadership.push({
    username: '0903058406',
    name: 'TITIN WAHYUNI',
    sub_role: 'sekretaris_prodi,dosen',
    position: 'Sekretaris Program Studi Informatika',
    prodi_id: '55202',
    nidn: '0903058406',
    gelar_depan: '',
    gelar_belakang: 'S.Pd, M.T'
  })

  // Teknik Elektro (55201) - akan diisi nanti jika ada data
  dosenLeadership.push({
    username: 'kaprodi_55201',
    name: 'Dr. Ahmad Fauzi, S.T., M.T.',
    sub_role: 'prodi,dosen',
    position: 'Kepala Program Studi Teknik Elektro',
    prodi_id: '55201'
  })

  dosenLeadership.push({
    username: 'sekprodi_55201',
    name: 'Siti Rahayu, S.T., M.T.',
    sub_role: 'sekretaris_prodi,dosen',
    position: 'Sekretaris Program Studi Teknik Elektro',
    prodi_id: '55201'
  })

  // Arsitektur (55203)
  dosenLeadership.push({
    username: '0927098403',
    name: 'CITRA AMALIA AMAL',
    sub_role: 'prodi,dosen',
    position: 'Kepala Program Studi Arsitektur',
    prodi_id: '55203',
    nidn: '0927098403',
    gelar_depan: '',
    gelar_belakang: 'S.T, M.T'
  })

  dosenLeadership.push({
    username: 'sekprodi_55203',
    name: 'Budi Santoso, S.T., M.T.',
    sub_role: 'sekretaris_prodi,dosen',
    position: 'Sekretaris Program Studi Arsitektur',
    prodi_id: '55203'
  })

  // Teknik Sipil (55204)
  dosenLeadership.push({
    username: '0912087505',
    name: 'M. AGUSALIM',
    sub_role: 'prodi,dosen',
    position: 'Kepala Program Studi Teknik Sipil',
    prodi_id: '55204',
    nidn: '0912087505',
    gelar_depan: '',
    gelar_belakang: 'S.T, M.T'
  })

  dosenLeadership.push({
    username: 'sekprodi_55204',
    name: 'Dewi Susanti, S.T., M.T.',
    sub_role: 'sekretaris_prodi,dosen',
    position: 'Sekretaris Program Studi Teknik Sipil',
    prodi_id: '55204'
  })

  // Perencanaan Wilayah dan Kota (55205)
  dosenLeadership.push({
    username: '0926048906',
    name: 'NINI APRIANI RUMATA',
    sub_role: 'prodi,dosen',
    position: 'Kepala Program Studi Perencanaan Wilayah dan Kota',
    prodi_id: '55205',
    nidn: '0926048906',
    gelar_depan: '',
    gelar_belakang: 'S.T, M.T'
  })

  dosenLeadership.push({
    username: 'sekprodi_55205',
    name: 'Eko Prasetyo, S.T., M.T.',
    sub_role: 'sekretaris_prodi,dosen',
    position: 'Sekretaris Program Studi Perencanaan Wilayah dan Kota',
    prodi_id: '55205'
  })

  for (const dosenData of dosenLeadership) {
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
        nip: dosenData.nidn || `NIP${Date.now()}${Math.floor(Math.random() * 1000)}`,
        department: dosenData.prodi_id ? allProdi.find(p => p.kode === dosenData.prodi_id)?.nama : 'Fakultas Teknik',
        prodi_id: dosenData.prodi_id || undefined,
        position: dosenData.position,
        specialization: 'Management',
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Gedung Dekanat Lantai 2`,
        email: `${dosenData.username}@ft.unismuh.ac.id`
      }
    })

    const nidnInfo = dosenData.nidn ? ` (NIDN: ${dosenData.nidn})` : ''
    console.log(`  ✅ ${dosenData.position}: ${dosenData.name}${nidnInfo}`)
  }

  // ========================================
  // 3. CREATE REGULAR DOSEN (Data Real dari SINTA CSV)
  // ========================================
  console.log('\n👨‍🏫 Creating regular Dosen (Real Data from SINTA)...')

  const realDosen = [
    // Teknik Informatika
    { nidn: '0930048304', nama: 'MUHAMMAD FAISAL', prodi: 'S1 Informatika', jabatan: 'Lektor Kepala', gelar_depan: 'Ir', gelar_belakang: 'S.SI, M.T, Ph.D' },
    { nidn: '0905078907', nama: 'RIZKI YUSLIANA BAKTI', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0903058406', nama: 'TITIN WAHYUNI', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.Pd, M.T' },
    { nidn: '0917109102', nama: 'LUKMAN ANAS', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0916088803', nama: 'FAHRIM IRHAMNAH RACHMAN', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0931087901', nama: 'MUHYIDDIN', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0431037702', nama: 'CHYQUITHA DANUPUTRI', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.Kom' },
    { nidn: '0921098306', nama: 'LUKMAN', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0912119601', nama: 'DESI ANGGREANI', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '8262760000000', nama: 'DARNIATI', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '7158760000000', nama: 'IDA MULYADI', prodi: 'S1 Informatika', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '4149780000000', nama: 'EMIL AGUSALIM HABI TALIB', prodi: 'S1 Informatika', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Pd, M.Eng' },

    // Teknik Elektro
    { nidn: '0019086209', nama: 'ABDUL HAFID', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor Kepala', gelar_depan: 'Ir', gelar_belakang: 'M.T' },
    { nidn: '0903068203', nama: 'RAHMANIA', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0030106704', nama: 'ANDI FAHARUDDIN', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0907118201', nama: 'ADRIANI', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0927097401', nama: 'ANDI ABD. HALIK LATEKO', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T, Ph.D' },
    { nidn: '0918056902', nama: 'ANTARISSUBHI', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Dr Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0901048102', nama: 'SURYANI', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0011056601', nama: 'ANDI RAHMAT', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'M.T' },
    { nidn: '0901019009', nama: 'RIDWANG', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: 'Dr Ir', gelar_belakang: 'S.Kom, M.T' },
    { nidn: '0914069102', nama: 'ST KHADIJAH', prodi: 'S1 Teknik Elektro', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.T, M.Kom' },
    { nidn: '0426087901', nama: 'LISA FITRIANI ISHAK', prodi: 'S1 Teknik Elektro', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },

    // Arsitektur
    { nidn: '0907017301', nama: 'ROHANA', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0929068304', nama: 'ANDI ANNISA AMALIA', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.Si' },
    { nidn: '0922108804', nama: 'SITI FUADILLAH ALHUMAIRAH AMIN', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0901038304', nama: 'KHILDA WILDANA NUR', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0927098403', nama: 'CITRA AMALIA AMAL', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0927128905', nama: 'FITRAWAN UMAR', prodi: 'S1 Arsitektur', jabatan: 'Asisten Ahli', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.Sc' },
    { nidn: '0917117201', nama: 'SAHABUDDIN', prodi: 'S1 Arsitektur', jabatan: 'Lektor Kepala', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0922099003', nama: 'NURHIKMAH PADDIYATU', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0906068406', nama: 'ASHARI ABDULLAH', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: 'Dr Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '1216097102', nama: 'MUHAMMAD SYARIF', prodi: 'S1 Arsitektur', jabatan: 'Lektor Kepala', gelar_depan: 'Dr Ir', gelar_belakang: 'S.T, M.H, M.M, M.T' },
    { nidn: '0927017501', nama: 'ANDI YUSRI', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0912118501', nama: 'A. SYAHRIYUNITA SYAHRUDDIN', prodi: 'S1 Arsitektur', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0931128411', nama: 'SALMIAH ZAINUDIN H', prodi: 'S1 Arsitektur', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.T, M.Ars' },

    // Teknik Sipil/Pengairan
    { nidn: '0030116004', nama: 'SUKMASARI ANTARIA', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor Kepala', gelar_depan: 'Dr Ir', gelar_belakang: 'M.Si' },
    { nidn: '0930047504', nama: 'FAUZAN HAMDI', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0916036801', nama: 'NENNY', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor Kepala', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0904126802', nama: 'HAMZAH AL-IMRAN', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0923048801', nama: 'FATRIADY MR', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Dr Ir', gelar_belakang: 'S.T, M.T' },
    { nidn: '0913117801', nama: 'LUTFI HAIR DJUNUR', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0925066905', nama: 'MARUPAH', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Dr', gelar_belakang: 'S.P, M.P' },
    { nidn: '0917126801', nama: 'MAHMUDDIN', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0912087505', nama: 'M. AGUSALIM', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0914108804', nama: 'KASMAWATI', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0910076502', nama: 'MUH AMIR', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0926127601', nama: 'FAUSIAH LATIF', prodi: 'S1 Teknik Pengairan', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0919067904', nama: 'INDRIYANTI', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0014017902', nama: 'ASNITA VIRLAYANI', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0919046801', nama: 'FARIDA G', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.M' },
    { nidn: '0916036401', nama: 'ISRAIL', prodi: 'S1 Teknik Pengairan', jabatan: 'Lektor', gelar_depan: 'Dr', gelar_belakang: 'S.T, M.T' },
    { nidn: '0906067401', nama: 'ANDI BUNGA TONGENG ANAS', prodi: 'S1 Teknik Pengairan', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.T, M.T' },

    // Perencanaan Wilayah dan Kota
    { nidn: '0916108605', nama: 'FATHURRAHMAN BURHANUDDIN', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0901118502', nama: 'M. NURHIDAYAT', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0926048906', nama: 'NINI APRIANI RUMATA', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Lektor', gelar_depan: '', gelar_belakang: 'S.T, M.T' },
    { nidn: '0927118703', nama: 'FIRDAUS', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Lektor', gelar_depan: 'Ir', gelar_belakang: 'S.T, M.T, M.Si' },
    { nidn: '0906108905', nama: 'LUCKE AYURINDRA MARGIE DAYANA', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.T, M.Si' },
    { nidn: '0007018506', nama: 'ZULKIFLI', prodi: 'S1 Perencanaan Wilayah dan Kota', jabatan: 'Asisten Ahli', gelar_depan: '', gelar_belakang: 'S.Si, M.Si' }
  ]

  function getSpecialization(department: string): string {
    const specializations: Record<string, string[]> = {
      'Informatika': ['Artificial Intelligence', 'Software Engineering', 'Data Science'],
      'Teknik Elektro': ['Power Systems', 'Electronics', 'Control Systems'],
      'Arsitektur': ['Arsitektur Tropis', 'Urban Design', 'Building Technology'],
      'Teknik Sipil': ['Struktur', 'Geoteknik', 'Sumber Daya Air'],
      'Perencanaan Wilayah dan Kota': ['Urban Planning', 'Regional Development', 'GIS']
    }

    let key = 'Informatika'
    if (department.includes('Informatika')) key = 'Informatika'
    else if (department.includes('Elektro')) key = 'Teknik Elektro'
    else if (department.includes('Arsitektur')) key = 'Arsitektur'
    else if (department.includes('Pengairan') || department.includes('Sipil')) key = 'Teknik Sipil'
    else if (department.includes('Perencanaan')) key = 'Perencanaan Wilayah dan Kota'

    const deptSpecs = specializations[key] || ['General Engineering']
    return deptSpecs[Math.floor(Math.random() * deptSpecs.length)]
  }

  for (const dosen of realDosen) {
    const existingUser = await prisma.users.findUnique({
      where: { username: dosen.nidn }
    })

    if (existingUser) {
      console.log(`  ⏭️  Skipping ${dosen.nama} (NIDN: ${dosen.nidn}) - already exists`)
      continue
    }

    // Mapping prodi
    let prodi_kode = '55202'
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
        nip: dosen.nidn,
        department: prodi.nama,
        prodi_id: prodi.kode,
        position: dosen.jabatan,
        specialization: getSpecialization(prodi.nama),
        phone: `+62813${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
        office: `Gedung ${prodi.nama.split(' ').pop()} Ruang Dosen`,
        email: `${dosen.nidn}@ft.unismuh.ac.id`
      }
    })
    console.log(`  ✅ ${dosen.jabatan}: ${fullName} (NIDN: ${dosen.nidn})`)
  }

  console.log(`\n✅ Total Dosen: ${dosenLeadership.length + realDosen.length}`)
  console.log(`   - Admin: 1`)
  console.log(`   - Dosen Leadership: ${dosenLeadership.length}`)
  console.log(`   - Regular Dosen: ${realDosen.length}`)
  console.log(`\n🔑 Default password for all users: password123`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
