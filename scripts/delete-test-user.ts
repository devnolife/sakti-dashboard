/**
 * Delete test user from database
 * Run: npx tsx scripts/delete-test-user.ts 105841101818
 */

import { prisma } from '../lib/prisma'

async function deleteTestUser() {
  const nim = process.argv[2]

  if (!nim) {
    console.error('❌ Please provide NIM')
    console.log('Usage: npx tsx scripts/delete-test-user.ts <NIM>')
    process.exit(1)
  }

  console.log(`🗑️  Deleting test user with NIM: ${nim}`)
  console.log('='.repeat(50))

  try {
    await prisma.$connect()

    // Find student
    const student = await prisma.students.findUnique({
      where: { nim },
      include: { users: true }
    })

    if (!student) {
      console.log('⚠️  Student not found')
      process.exit(0)
    }

    console.log(`Found student: ${student.users.name}`)
    console.log(`User ID: ${student.user_id}`)

    // Delete audit logs first
    const deletedLogs = await prisma.audit_logs.deleteMany({
      where: { user_id: student.user_id }
    })
    console.log(`✅ Deleted ${deletedLogs.count} audit logs`)

    // Delete student (FK constraint)
    await prisma.students.delete({
      where: { nim }
    })
    console.log('✅ Student deleted')

    // Delete user
    await prisma.users.delete({
      where: { id: student.user_id }
    })
    console.log('✅ User deleted')

    console.log('\n✅ Test user completely removed!')

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

deleteTestUser()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
