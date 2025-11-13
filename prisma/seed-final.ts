/**
 * Complete Seed - Dosen Real Data + Minimal Students + Workflow Test
 * 
 * Usage: npx tsx prisma/seed-final.ts
 */

import { PrismaClient } from '../lib/generated/prisma'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const PASSWORD = 'password123'

async function main() {
  console.log('🌱 Starting Complete Seed...\n')
  console.log('='.repeat(60))

  const hashedPassword = await bcrypt.hash(PASSWORD, 10)

  // Get prodi
  const prodiList = await prisma.prodi.findMany({ orderBy: { kode: 'asc' } })
  if (prodiList.length === 0) {
    console.log('⚠️  No prodi found!')
    return
  }

  console.log(`📚 Found ${prodiList.length} prodi\n`)

  // ============================================
  // 1. ADMIN USERS
  // ============================================
  console.log('👤 Creating Admin Users...')

  // Admin Umum
  const adminUmum = await prisma.users.upsert({
    where: { username: 'admin.umum' },
    update: {
      password: hashedPassword,
      updated_at: new Date()
    },
    create: {
      id: nanoid(),
      username: 'admin.umum',
      name: 'Admin Umum',
      password: hashedPassword,
      role: 'admin_umum',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log('   ✅ Admin Umum')

  // Admin Keuangan
  const adminKeuangan = await prisma.users.upsert({
    where: { username: 'admin.keuangan' },
    update: {
      password: hashedPassword,
      updated_at: new Date()
    },
    create: {
      id: nanoid(),
      username: 'admin.keuangan',
      name: 'Admin Keuangan',
      password: hashedPassword,
      role: 'admin_keuangan',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })
  console.log('   ✅ Admin Keuangan')

  // ============================================
  // 2. PIMPINAN FAKULTAS (DATA REAL DARI SINTA)
  // ============================================
  console.log('🎓 Creating Pimpinan Fakultas (Real Data)...')

  const pimpinan = [
    {
      username: '0919017702',
      name: 'MUH SYAFAAT S. KUBA',
      nip: '  ',
      role: 'dekan',
      sub_role: 'dekan,dosen',
      position: 'Dekan Fakultas Teknik',
      gelar_depan: '',
      gelar_belakang: 'S.T., M.T.'
    },
    {
      username: '0928088206',
      name: 'IRNAWATY IDRUS',
      nip: '0928088206',
      role: 'dosen',
      sub_role: 'wakil_dekan_1,dosen',
      position: 'Wakil Dekan I (Bidang Akademik)',
      gelar_depan: 'Dr',
      gelar_belakang: 'S.T., M.T.'
    },
    {
      username: '0926048103',
      name: 'ANDI MAKBUL SYAMSURI',
      nip: '0926048103',
      role: 'dosen',
      sub_role: 'wakil_dekan_2,dosen',
      position: 'Wakil Dekan II (Administrasi Umum & Keuangan)',
      gelar_depan: 'Dr Ir',
      gelar_belakang: 'S.T., M.T.'
    },
    {
      username: '0914099203',
      name: 'SOEMITRO EMIN PRAJA',
      nip: '0914099203',
      role: 'dosen',
      sub_role: 'wakil_dekan_3,dosen',
      position: 'Wakil Dekan III (Kemahasiswaan & Alumni)',
      gelar_depan: '',
      gelar_belakang: 'S.T., M.Si'
    }
  ]

  const dekanUser = await prisma.users.upsert({
    where: { username: pimpinan[0].username },
    update: {
      password: hashedPassword,
      updated_at: new Date()
    },
    create: {
      id: nanoid(),
      username: pimpinan[0].username,
      name: pimpinan[0].name,
      password: hashedPassword,
      role: pimpinan[0].role as any,
      sub_role: pimpinan[0].sub_role,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await prisma.lecturers.upsert({
    where: { user_id: dekanUser.id },
    update: {},
    create: {
      id: nanoid(),
      user_id: dekanUser.id,
      nip: pimpinan[0].nip,
      position: pimpinan[0].position,
      prodi_id: prodiList[0].kode,
    }
  })
  console.log(`   ✅ ${pimpinan[0].position}`)

  // Wakil Dekan
  for (let i = 1; i < pimpinan.length; i++) {
    const wd = pimpinan[i]
    const user = await prisma.users.upsert({
      where: { username: wd.username },
      update: {
        password: hashedPassword,
        updated_at: new Date()
      },
      create: {
        id: nanoid(),
        username: wd.username,
        name: wd.name,
        password: hashedPassword,
        role: wd.role as any,
        sub_role: wd.sub_role,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.lecturers.upsert({
      where: { user_id: user.id },
      update: {},
      create: {
        id: nanoid(),
        user_id: user.id,
        nip: wd.nip,
        position: wd.position,
        prodi_id: prodiList[0].kode,
      }
    })
    console.log(`   ✅ ${wd.position}`)
  }
  console.log()

  // ============================================
  // 3. KEPALA PRODI (1 per prodi)
  // ============================================
  console.log('👨‍🏫 Creating Kepala Prodi...')

  const kaprodiData = [
    { prodi: '20201', name: 'AHMAD FAUZI', nip: 'KP20201' },
    { prodi: '22201', name: 'DEWI SUSANTI', nip: 'KP22201' },
    { prodi: '23201', name: 'BUDI SANTOSO', nip: 'KP23201' },
    { prodi: '55202', name: 'SITI RAHAYU', nip: 'KP55202' },
    { prodi: '35201', name: 'EKO PRASETYO', nip: 'KP35201' },
  ]

  for (const kp of kaprodiData) {
    const prodi = prodiList.find(p => p.kode === kp.prodi)
    if (!prodi) continue

    const user = await prisma.users.upsert({
      where: { username: `kaprodi.${kp.prodi}` },
      update: {
        password: hashedPassword,
        updated_at: new Date()
      },
      create: {
        id: nanoid(),
        username: `kaprodi.${kp.prodi}`,
        name: kp.name,
        password: hashedPassword,
        role: 'dosen',
        sub_role: 'prodi',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await prisma.lecturers.upsert({
      where: { user_id: user.id },
      update: {},
      create: {
        id: nanoid(),
        user_id: user.id,
        nip: kp.nip,
        position: `Kepala Program Studi ${prodi.nama}`,
        prodi_id: prodi.kode,
      }
    })
    console.log(`   ✅ Kaprodi ${prodi.nama}`)
  }
  console.log()

  // ============================================
  // 4. ADMIN PRODI (1 per prodi)
  // ============================================
  console.log('📚 Creating Admin Prodi...')
  for (const prodi of prodiList) {
    await prisma.users.upsert({
      where: { username: `admin.prodi.${prodi.kode}` },
      update: {
        password: hashedPassword,
        updated_at: new Date()
      },
      create: {
        id: nanoid(),
        username: `admin.prodi.${prodi.kode}`,
        name: `Admin Prodi ${prodi.nama}`,
        password: hashedPassword,
        role: 'prodi',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    console.log(`   ✅ Admin Prodi ${prodi.nama}`)
  }
  console.log()

  // ============================================
  // 5. MAHASISWA (3 per prodi - MINIMAL)
  // ============================================
  console.log('👥 Creating Mahasiswa (3 per prodi)...')
  const currentYear = '25'
  let studentCount = 0

  for (const prodi of prodiList) {
    for (let i = 1; i <= 3; i++) {
      const nim = `${currentYear}${prodi.kode}${String(i).padStart(3, '0')}`

      const existing = await prisma.users.findUnique({ where: { username: nim } })
      if (existing) {
        console.log(`   ⏭️  ${nim} exists, skipping...`)
        continue
      }

      const user = await prisma.users.create({
        data: {
          id: nanoid(),
          username: nim,
          name: `Mahasiswa ${prodi.nama} ${i}`,
          password: hashedPassword,
          role: 'mahasiswa',
          is_active: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      })

      await prisma.students.create({
        data: {
          id: nanoid(),
          nim,
          prodi_id: prodi.kode,
          user_id: user.id,
          angkatan: 2025,
          semester: 1,
          academic_year: '2025/2026',
          enroll_date: new Date(),
          status: 'active',
        }
      })
      studentCount++
      console.log(`   ✅ ${nim} - ${user.name}`)
    }
  }
  console.log()

  // ============================================
  // 6. WORKFLOW TEST DATA
  // ============================================
  console.log('📝 Creating Workflow Test Data...')

  const student = await prisma.students.findFirst({ include: { users: true } })
  if (!student) {
    console.log('   ⚠️  No student found, skipping workflow test data')
  } else {
    console.log(`   Using student: ${student.nim}`)

    // Clean existing test data
    await prisma.workflow_history.deleteMany({
      where: { letter_requests: { title: { contains: '[TEST]' } } }
    })
    await prisma.letter_requests.deleteMany({
      where: { title: { contains: '[TEST]' } }
    })

    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)

    // Initial Review (3 requests)
    for (let i = 1; i <= 3; i++) {
      const id = nanoid()
      await prisma.letter_requests.create({
        data: {
          id,
          type: 'aktif',
          title: `[TEST] Surat Aktif ${i}`,
          purpose: `Testing workflow - initial review ${i}`,
          description: 'Test workflow system',
          student_id: student.id,
          approval_role: 'staff_tu',
          status: 'submitted',
          workflow_stage: 'initial_review',
          assigned_to: adminUmum.id,
          request_date: twoDaysAgo,
          updated_at: twoDaysAgo,
        }
      })

      await prisma.workflow_history.create({
        data: {
          id: nanoid(),
          letter_request_id: id,
          action: 'submitted',
          actor_id: student.id,
          actor_role: 'student',
          notes: 'Permohonan diajukan',
          created_at: twoDaysAgo,
        }
      })
    }
    console.log('   ✅ 3 requests in initial_review')

    // WD1 Approval (2 requests)
    for (let i = 1; i <= 2; i++) {
      const id = nanoid()
      await prisma.letter_requests.create({
        data: {
          id,
          type: 'kkp',
          title: `[TEST] Surat KKP ${i}`,
          purpose: `Testing workflow - WD1 approval ${i}`,
          description: 'Test workflow system',
          student_id: student.id,
          approval_role: 'staff_tu',
          status: 'in_review',
          workflow_stage: 'wd1_approval',
          assigned_to: dekanUser.id,
          forwarded_by: adminUmum.id,
          forwarded_at: yesterday,
          request_date: twoDaysAgo,
          updated_at: yesterday,
        }
      })

      await prisma.workflow_history.createMany({
        data: [
          {
            id: nanoid(),
            letter_request_id: id,
            action: 'submitted',
            actor_id: student.id,
            actor_role: 'student',
            created_at: twoDaysAgo,
          },
          {
            id: nanoid(),
            letter_request_id: id,
            action: 'forwarded',
            actor_id: adminUmum.id,
            actor_role: 'admin_umum',
            notes: 'Diteruskan ke WD1',
            created_at: yesterday,
          }
        ]
      })
    }
    console.log('   ✅ 2 requests in wd1_approval')

    // Completed (1 request)
    const completedId = nanoid()
    await prisma.letter_requests.create({
      data: {
        id: completedId,
        type: 'cuti',
        title: '[TEST] Surat Cuti',
        purpose: 'Testing workflow - completed',
        description: 'Test workflow system',
        student_id: student.id,
        approval_role: 'staff_tu',
        status: 'approved',
        workflow_stage: 'completed',
        assigned_to: dekanUser.id,
        forwarded_by: adminUmum.id,
        forwarded_at: yesterday,
        wd1_approved_by: dekanUser.id,
        wd1_approved_at: now,
        wd1_notes: 'Disetujui',
        request_date: twoDaysAgo,
        updated_at: now,
      }
    })

    await prisma.workflow_history.createMany({
      data: [
        {
          id: nanoid(),
          letter_request_id: completedId,
          action: 'submitted',
          actor_id: student.id,
          actor_role: 'student',
          created_at: twoDaysAgo,
        },
        {
          id: nanoid(),
          letter_request_id: completedId,
          action: 'forwarded',
          actor_id: adminUmum.id,
          actor_role: 'admin_umum',
          created_at: yesterday,
        },
        {
          id: nanoid(),
          letter_request_id: completedId,
          action: 'approved',
          actor_id: dekanUser.id,
          actor_role: 'dekan',
          notes: 'Disetujui',
          created_at: now,
        }
      ]
    })
    console.log('   ✅ 1 completed request')
  }
  console.log()

  // ============================================
  // SUMMARY
  // ============================================
  console.log('='.repeat(60))
  console.log('✅ Complete Seed Finished!\n')
  console.log('📊 Summary:')
  console.log('   - 1 Admin Umum')
  console.log('   - 1 Admin Keuangan')
  console.log('   - 1 Dekan')
  console.log('   - 3 Wakil Dekan (WD1, WD2, WD3)')
  console.log(`   - ${prodiList.length} Kepala Prodi`)
  console.log(`   - ${prodiList.length} Admin Prodi`)
  console.log(`   - ${studentCount} Mahasiswa (3 per prodi)`)
  console.log('   - 6 Workflow Test Requests')
  console.log('\n🔑 Password: password123')
  console.log('\n📧 Login Credentials:')
  console.log('   Admin Umum:  admin.umum / password123')
  console.log('   Admin Keu:   admin.keuangan / password123')
  console.log('   Dekan:       0919017702 / password123')
  console.log('   WD1:         0928088206 / password123')
  console.log('   Mahasiswa:   2555202001 / password123')
  console.log('\n🔗 Dashboard URLs:')
  console.log('   Admin Umum:  /dashboard/admin_umum/correspondence')
  console.log('   WD1/Dekan:   /dashboard/wd1/correspondence')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('\n✨ Done!')
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
