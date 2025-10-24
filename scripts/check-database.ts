/**
 * Test script to check database and student records
 * Run: npx tsx scripts/check-database.ts
 */

import { prisma } from '../lib/prisma'

async function checkDatabase() {
  console.log('🔍 Checking Database...')
  console.log('='.repeat(50))

  try {
    // Check database connection
    console.log('\n📊 Step 1: Testing database connection...')
    await prisma.$connect()
    console.log('✅ Database connected!')

    // Count total students
    console.log('\n📊 Step 2: Counting students...')
    const studentCount = await prisma.students.count()
    console.log(`Total students in database: ${studentCount}`)

    // Get first 5 students
    console.log('\n📊 Step 3: Fetching sample students...')
    const students = await prisma.students.findMany({
      take: 5,
      select: {
        nim: true,
        users: {
          select: {
            name: true,
            username: true
          }
        },
        prodi_id: true,
        angkatan: true,
        jenis_kelamin: true,
        phone: true,
        email: true,
        last_sync_at: true
      }
    })

    if (students.length === 0) {
      console.log('⚠️  No students found in database')
    } else {
      console.log('\n📋 Sample students:')
      students.forEach((student, index) => {
        console.log(`\n${index + 1}. ${student.users.name}`)
        console.log(`   NIM: ${student.nim}`)
        console.log(`   Username: ${student.users.username}`)
        console.log(`   Prodi: ${student.prodi_id || 'N/A'}`)
        console.log(`   Angkatan: ${student.angkatan || 'N/A'}`)
        console.log(`   Gender: ${student.jenis_kelamin || 'N/A'}`)
        console.log(`   Phone: ${student.phone || 'N/A'}`)
        console.log(`   Email: ${student.email || 'N/A'}`)
        console.log(`   Last Sync: ${student.last_sync_at ? student.last_sync_at.toISOString() : 'Never'}`)
      })
    }

    // Check specific NIM if provided
    const testNim = process.argv[2]
    if (testNim) {
      console.log(`\n📊 Step 4: Checking specific NIM: ${testNim}`)
      const specificStudent = await prisma.students.findUnique({
        where: { nim: testNim },
        include: {
          users: true,
          prodi: true,
          lecturers: {
            include: {
              users: true
            }
          }
        }
      })

      if (!specificStudent) {
        console.log(`❌ Student with NIM ${testNim} not found`)
      } else {
        console.log('\n✅ Student found:')
        console.log(JSON.stringify(specificStudent, null, 2))
      }
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }

  console.log('\n' + '='.repeat(50))
  console.log('✅ Database check completed!')
}

// Run the check
checkDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
