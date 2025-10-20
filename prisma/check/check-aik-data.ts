import { students } from '@/components/dekan/vice-dean-4/mock-data'
import { PrismaClient } from '../../lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

const prisma = new PrismaClient()

async function checkAIKData() {
  try {
    const userId = getHardcodedUserId()
    console.log('Checking AIK Komfren data for userId:', userId)

    // Get user and student profile
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        students: true
      }
    })

    if (!user || !user.students) {
      console.log('❌ Student not found')
      return
    }

    console.log('✅ Student found:', {
      name: user.name,
      nim: user.students.nim,
      studentId: user.students.id
    })

    // Check for AIK Komfren exam applications (using ExamType.other)
    const aikExams = await prisma.examApplication.findMany({
      where: {
        studentId: user.students.id,
        type: 'other',  // AIK Komfren menggunakan 'other' type
        title: {
          contains: 'AIK',
          mode: 'insensitive'
        }
      },
      include: {
        advisor1: {
          include: {
            user: true
          }
        },
        committees: {
          include: {
            lecturer: {
              include: {
                user: true
              }
            }
          }
        },
        documents: true
      }
    })

    console.log(`\n📋 Found ${aikExams.length} AIK Komfren exam applications`)

    if (aikExams.length === 0) {
      console.log('❌ No AIK Komfren exams found - need to seed data')
    } else {
      aikExams.forEach((exam, index) => {
        console.log(`\n🔍 AIK Exam ${index + 1}:`)
        console.log('  - ID:', exam.id)
        console.log('  - Title:', exam.title)
        console.log('  - Status:', exam.status)
        console.log('  - Submission Date:', exam.submissionDate.toISOString())
        console.log('  - Scheduled Date:', exam.scheduledDate?.toISOString() || 'Not scheduled')
        console.log('  - Location:', exam.location || 'Not assigned')
        console.log('  - Examiner:', exam.advisor1?.user.name || 'Not assigned')
        console.log('  - Documents:', exam.documents.length)
      })
    }

    // Check available lecturers for AIK examiners
    console.log('\n👨‍🏫 Checking available lecturers:')
    const lecturers = await prisma.lecturer.findMany({
      where: {
        user: {
          isActive: true
        }
      },
      include: {
        user: true
      },
      take: 5  // Just show first 5
    })

    console.log(`Found ${lecturers.length} active lecturers`)
    lecturers.slice(0, 3).forEach(lecturer => {
      console.log(`  - ${lecturer.user.name} (NIP: ${lecturer.nip})`)
    })

  } catch (error) {
    console.error('❌ Error checking AIK data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAIKData()
