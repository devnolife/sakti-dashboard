/**
 * Seed Khusus: Akun Pimpinan Fakultas Teknik
 * 
 * Script ini membuat akun untuk:
 * - 1 Dekan
 * - 3 Wakil Dekan (WD1, WD2, WD3)
 * - 2 Admin (Admin Umum, Admin Keuangan)
 * 
 * Semua akun menggunakan password: password123
 * 
 * Usage: npx tsx prisma/seed-pimpinan-only.ts
 */

import { PrismaClient } from '../lib/generated/prisma'
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()
const PASSWORD = 'password123'

async function main() {
  console.log('🎓 Creating Pimpinan Fakultas Accounts...\n')
  console.log('='.repeat(60))

  const hashedPassword = await bcrypt.hash(PASSWORD, 10)

  // Get first prodi for default assignment
  const firstProdi = await prisma.prodi.findFirst({ orderBy: { kode: 'asc' } })
  if (!firstProdi) {
    console.log('⚠️  No prodi found! Please seed master data first.')
    return
  }

  // ============================================
  // 1. ADMIN USERS
  // ============================================
  console.log('👤 Admin Accounts:')
  console.log('')

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
  console.log('   ✅ Username: admin.umum')
  console.log('      Password: password123')
  console.log('      Role: Admin Umum')
  console.log('')

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
  console.log('   ✅ Username: admin.keuangan')
  console.log('      Password: password123')
  console.log('      Role: Admin Keuangan')
  console.log('')

  // ============================================
  // 2. PIMPINAN FAKULTAS (DATA REAL DARI SINTA)
  // ============================================
  console.log('='.repeat(60))
  console.log('🎓 Pimpinan Fakultas (Data Real dari SINTA):')
  console.log('')

  const pimpinan = [
    {
      username: '0919017702',
      name: 'MUH SYAFAAT S. KUBA',
      nip: '0919017702',
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

  // Create Dekan
  const dekan = pimpinan[0]
  const dekanUser = await prisma.users.upsert({
    where: { username: dekan.username },
    update: {
      password: hashedPassword,
      updated_at: new Date()
    },
    create: {
      id: nanoid(),
      username: dekan.username,
      name: dekan.name,
      password: hashedPassword,
      role: dekan.role as any,
      sub_role: dekan.sub_role,
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
      nip: dekan.nip,
      position: dekan.position,
      prodi_id: firstProdi.kode,
    }
  })

  console.log('   ✅ DEKAN FAKULTAS TEKNIK')
  console.log(`      Nama: ${dekan.name}`)
  console.log(`      NIDN: ${dekan.username}`)
  console.log('      Password: password123')
  console.log(`      Gelar: ${dekan.gelar_belakang}`)
  console.log('')

  // Create Wakil Dekan
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
        prodi_id: firstProdi.kode,
      }
    })

    const wdNumber = i === 1 ? 'I' : i === 2 ? 'II' : 'III'
    console.log(`   ✅ WAKIL DEKAN ${wdNumber}`)
    console.log(`      Nama: ${wd.name}`)
    console.log(`      NIDN: ${wd.username}`)
    console.log('      Password: password123')
    console.log(`      Gelar: ${wd.gelar_depan} ${wd.gelar_belakang}`.trim())
    console.log(`      Posisi: ${wd.position}`)
    console.log('')
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log('='.repeat(60))
  console.log('✅ Seed Pimpinan Complete!\n')
  console.log('📊 Summary:')
  console.log('   - 2 Admin (Umum, Keuangan)')
  console.log('   - 1 Dekan')
  console.log('   - 3 Wakil Dekan (WD1, WD2, WD3)')
  console.log('')
  console.log('🔑 Default Password untuk Semua Akun: password123')
  console.log('')
  console.log('📧 Login Credentials:')
  console.log('   ┌─────────────────────────────────────────────────────────┐')
  console.log('   │ ADMIN ACCOUNTS                                          │')
  console.log('   ├─────────────────────────────────────────────────────────┤')
  console.log('   │ Admin Umum:     admin.umum / password123               │')
  console.log('   │ Admin Keuangan: admin.keuangan / password123           │')
  console.log('   └─────────────────────────────────────────────────────────┘')
  console.log('')
  console.log('   ┌─────────────────────────────────────────────────────────┐')
  console.log('   │ PIMPINAN FAKULTAS (NIDN from SINTA)                    │')
  console.log('   ├─────────────────────────────────────────────────────────┤')
  console.log('   │ Dekan:          0919017702 / password123              │')
  console.log('   │                 MUH SYAFAAT S. KUBA, S.T., M.T.        │')
  console.log('   ├─────────────────────────────────────────────────────────┤')
  console.log('   │ Wakil Dekan I:  0928088206 / password123              │')
  console.log('   │                 Dr IRNAWATY IDRUS, S.T., M.T.          │')
  console.log('   ├─────────────────────────────────────────────────────────┤')
  console.log('   │ Wakil Dekan II: 0926048103 / password123              │')
  console.log('   │                 Dr Ir ANDI MAKBUL SYAMSURI, S.T., M.T. │')
  console.log('   ├─────────────────────────────────────────────────────────┤')
  console.log('   │ Wakil Dekan III: 0914099203 / password123             │')
  console.log('   │                  SOEMITRO EMIN PRAJA, S.T., M.Si      │')
  console.log('   └─────────────────────────────────────────────────────────┘')
  console.log('')
  console.log('🔗 Dashboard URLs:')
  console.log('   Admin Umum:     /dashboard/admin_umum')
  console.log('   Admin Keuangan: /dashboard/admin_keuangan')
  console.log('   Dekan/WD1:      /dashboard/wd1/correspondence')
  console.log('')
  console.log('📝 Notes:')
  console.log('   - Semua NIDN adalah data real dari SINTA')
  console.log('   - Password dapat diubah setelah login pertama')
  console.log('   - Untuk workflow approval, gunakan akun Dekan sebagai WD1')
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
