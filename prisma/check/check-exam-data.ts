import { students } from '@/components/dekan/vice-dean-4/mock-data'
import { PrismaClient } from '../../lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

const prisma = new PrismaClient()

async function checkExamData() {
  const userId = getHardcodedUserId()
  console.log('🔍 Checking exam data for user:', userId)

  try {
    // First, check if user exists and get student data
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        students: true
      }
    })

    if (!user || !user.students) {
      console.log('❌ User or student not found')
      return
    }

    console.log('✅ User found:', {
      name: user.name,
      nidn: user.nidn,
      studentId: user.students.id,
      nim: user.students.nim
    })

    // Check exam applications
    const examApplications = await prisma.examApplication.findMany({
      where: {
        studentId: user.students.id
      },
      include: {
        advisor1: {
          include: {
            user: true
          }
        },
        advisor2: {
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log('\n📋 Exam Applications:', examApplications.length)

    if (examApplications.length === 0) {
      console.log('   No exam applications found')
    } else {
      examApplications.forEach((exam, index) => {
        console.log(`   ${index + 1}. ${exam.title}`)
        console.log(`      Type: ${exam.type}`)
        console.log(`      Status: ${exam.status}`)
        console.log(`      Submission Date: ${exam.submissionDate.toISOString()}`)
        console.log(`      Scheduled Date: ${exam.scheduledDate ? exam.scheduledDate.toISOString() : 'Not scheduled'}`)
        console.log(`      Completion Date: ${exam.completionDate ? exam.completionDate.toISOString() : 'Not completed'}`)
        console.log(`      Location: ${exam.location || 'Not set'}`)
        console.log(`      Advisor 1: ${exam.advisor1 ? exam.advisor1.user.name : 'Not assigned'}`)
        console.log(`      Advisor 2: ${exam.advisor2 ? exam.advisor2.user.name : 'Not assigned'}`)
        console.log(`      Committees: ${exam.committees.length}`)
        exam.committees.forEach((committee, idx) => {
          console.log(`         ${idx + 1}. ${committee.lecturer.user.name} (${committee.role})`)
        })
        console.log(`      Documents: ${exam.documents.length}`)
        exam.documents.forEach((doc, idx) => {
          console.log(`         ${idx + 1}. ${doc.name} (${doc.type}) - ${doc.status}`)
        })
        console.log('')
      })
    }

    // Check available lecturers for committees and advisors
    const lecturers = await prisma.lecturer.findMany({
      where: {
        user: {
          isActive: true
        }
      },
      include: {
        user: true
      },
      take: 10
    })

    console.log('\n👥 Available Lecturers (first 10):', lecturers.length)
    lecturers.forEach((lecturer, index) => {
      console.log(`   ${index + 1}. ${lecturer.user.name} (${lecturer.user.nidn})`)
    })

    // Check exam document types and statuses
    console.log('\n📄 Exam Document Summary:')
    const documentCounts = await prisma.examDocument.groupBy({
      by: ['type', 'status'],
      _count: {
        id: true
      }
    })

    if (documentCounts.length === 0) {
      console.log('   No exam documents found')
    } else {
      documentCounts.forEach(doc => {
        console.log(`   ${doc.type} - ${doc.status}: ${doc._count.id}`)
      })
    }

  } catch (error) {
    console.error('❌ Error checking exam data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkExamData()
