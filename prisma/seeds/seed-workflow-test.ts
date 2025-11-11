/**
 * Seed workflow test data
 * Creates letter requests in various workflow stages for testing
 * 
 * Usage: npx tsx prisma/seeds/seed-workflow-test.ts
 */

import { PrismaClient } from '@/lib/generated/prisma'
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding workflow test data...')

  // Get first student for testing
  const student = await prisma.students.findFirst({
    include: { prodi: true }
  })

  if (!student) {
    console.error('❌ No student found. Please seed students first.')
    return
  }

  // Get admin users for workflow testing
  const adminUmum = await prisma.users.findFirst({
    where: { role: 'admin_umum' }
  })

  // For WD1, we'll use dekan role as it's the closest equivalent
  // If no dekan, use admin_umum for both roles for testing
  let wd1 = await prisma.users.findFirst({
    where: { role: 'dekan' }
  })

  if (!adminUmum) {
    console.log('⚠️  Admin Umum user not found.')
    console.log('   Please run: npx tsx prisma/seeds/seed-admin-users.ts')
    return
  }

  if (!wd1) {
    console.log('⚠️  Dekan user not found. Using Admin Umum as WD1 for testing.')
    wd1 = adminUmum // Use admin_umum for both roles if no dekan exists
  }

  console.log(`📝 Using student: ${student.nim} - ${student.users?.name}`)
  console.log(`👤 Admin Umum: ${adminUmum.username} (${adminUmum.id})`)
  console.log(`👤 WD1: ${wd1.username} (${wd1.id})`)  // Clean up existing test data
  console.log('🧹 Cleaning up existing workflow test data...')
  await prisma.workflow_history.deleteMany({
    where: {
      letter_requests: {
        student_id: student.id,
        title: { contains: '[TEST]' }
      }
    }
  })
  await prisma.letter_requests.deleteMany({
    where: {
      student_id: student.id,
      title: { contains: '[TEST]' }
    }
  })

  // Create requests in different workflow stages
  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)

  // 1. Initial Review Stage (5 requests) - Assigned to Admin Umum
  console.log('📋 Creating requests in initial_review stage...')
  for (let i = 1; i <= 5; i++) {
    const requestId = nanoid()

    await prisma.letter_requests.create({
      data: {
        id: requestId,
        type: 'aktif',
        title: `[TEST] Surat Keterangan Aktif ${i}`,
        purpose: `Testing workflow - initial review stage ${i}`,
        description: 'Surat ini untuk keperluan testing workflow sistem',
        student_id: student.id,
        approval_role: 'staff_tu',
        status: 'submitted',
        workflow_stage: 'initial_review',
        assigned_to: adminUmum.id,
        request_date: twoDaysAgo,
        updated_at: twoDaysAgo,
      }
    })

    // Add workflow history
    await prisma.workflow_history.create({
      data: {
        id: nanoid(),
        letter_request_id: requestId,
        action: 'submitted',
        actor_id: student.id,
        actor_role: 'student',
        notes: 'Permohonan surat diajukan oleh mahasiswa',
        created_at: twoDaysAgo,
      }
    })
  }

  // 2. WD1 Approval Stage (3 requests) - Already forwarded to WD1
  console.log('📋 Creating requests in wd1_approval stage...')
  for (let i = 1; i <= 3; i++) {
    const requestId = nanoid()

    await prisma.letter_requests.create({
      data: {
        id: requestId,
        type: 'kkp',
        title: `[TEST] Surat KKP ${i}`,
        purpose: `Testing workflow - WD1 approval stage ${i}`,
        description: 'Surat ini untuk keperluan testing workflow sistem',
        student_id: student.id,
        approval_role: 'staff_tu',
        status: 'in_review',
        workflow_stage: 'wd1_approval',
        assigned_to: wd1.id,
        forwarded_by: adminUmum.id,
        forwarded_at: yesterday,
        request_date: twoDaysAgo,
        updated_at: yesterday,
      }
    })

    // Add workflow history - submitted
    await prisma.workflow_history.create({
      data: {
        id: nanoid(),
        letter_request_id: requestId,
        action: 'submitted',
        actor_id: student.id,
        actor_role: 'student',
        notes: 'Permohonan surat diajukan oleh mahasiswa',
        created_at: twoDaysAgo,
      }
    })

    // Add workflow history - forwarded
    await prisma.workflow_history.create({
      data: {
        id: nanoid(),
        letter_request_id: requestId,
        action: 'forwarded',
        actor_id: adminUmum.id,
        actor_role: 'admin_umum',
        notes: `Permohonan telah direview dan diteruskan ke WD1`,
        created_at: yesterday,
      }
    })
  }

  // 3. Completed Stage (2 requests) - Approved by WD1
  console.log('📋 Creating completed requests...')
  for (let i = 1; i <= 2; i++) {
    const requestId = nanoid()

    await prisma.letter_requests.create({
      data: {
        id: requestId,
        type: 'cuti',
        title: `[TEST] Surat Cuti ${i}`,
        purpose: `Testing workflow - completed stage ${i}`,
        description: 'Surat ini untuk keperluan testing workflow sistem',
        student_id: student.id,
        approval_role: 'staff_tu',
        status: 'approved',
        workflow_stage: 'completed',
        assigned_to: wd1.id,
        forwarded_by: adminUmum.id,
        forwarded_at: yesterday,
        wd1_approved_by: wd1.id,
        wd1_approved_at: now,
        wd1_notes: 'Disetujui',
        request_date: twoDaysAgo,
        updated_at: now,
      }
    })

    // Add workflow history - submitted
    await prisma.workflow_history.create({
      data: {
        id: nanoid(),
        letter_request_id: requestId,
        action: 'submitted',
        actor_id: student.id,
        actor_role: 'student',
        created_at: twoDaysAgo,
      }
    })

    // Add workflow history - forwarded
    await prisma.workflow_history.create({
      data: {
        id: nanoid(),
        letter_request_id: requestId,
        action: 'forwarded',
        actor_id: adminUmum.id,
        actor_role: 'admin_umum',
        notes: 'Diteruskan ke WD1',
        created_at: yesterday,
      }
    })

    // Add workflow history - approved
    await prisma.workflow_history.create({
      data: {
        id: nanoid(),
        letter_request_id: requestId,
        action: 'approved',
        actor_id: wd1.id,
        actor_role: 'wd1',
        notes: 'Permohonan disetujui oleh WD1',
        created_at: now,
      }
    })
  }

  // 4. Rejected Stage (1 request)
  console.log('📋 Creating rejected request...')
  const rejectedId = nanoid()
  await prisma.letter_requests.create({
    data: {
      id: rejectedId,
      type: 'ujian',
      title: '[TEST] Surat Ujian (Ditolak)',
      purpose: 'Testing workflow - rejected stage',
      description: 'Surat ini untuk keperluan testing workflow sistem - ditolak',
      student_id: student.id,
      approval_role: 'staff_tu',
      status: 'rejected',
      workflow_stage: 'rejected',
      assigned_to: adminUmum.id,
      request_date: twoDaysAgo,
      updated_at: yesterday,
    }
  })

  // Add workflow history - submitted
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: rejectedId,
      action: 'submitted',
      actor_id: student.id,
      actor_role: 'student',
      created_at: twoDaysAgo,
    }
  })

  // Add workflow history - rejected
  await prisma.workflow_history.create({
    data: {
      id: nanoid(),
      letter_request_id: rejectedId,
      action: 'rejected',
      actor_id: adminUmum.id,
      actor_role: 'admin_umum',
      notes: 'Permohonan ditolak: dokumen persyaratan tidak lengkap',
      created_at: yesterday,
    }
  })

  console.log('✅ Workflow test data seeded successfully!')
  console.log('📊 Summary:')
  console.log('   - 5 requests in initial_review (assigned to Admin Umum)')
  console.log('   - 3 requests in wd1_approval (assigned to WD1)')
  console.log('   - 2 completed requests')
  console.log('   - 1 rejected request')
  console.log('   Total: 11 test requests')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding workflow test data:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
