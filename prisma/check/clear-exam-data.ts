import { PrismaClient } from '../../lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

const prisma = new PrismaClient()

async function clearExamData() {
  const userId = getHardcodedUserId()
  console.log('🗑️ Clearing exam data for user:', userId)

  try {
    // Get user and student profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true
      }
    })

    if (!user || !user.studentProfile) {
      console.log('❌ User or student not found')
      return
    }

    const studentId = user.studentProfile.id
    console.log('👤 Student ID:', studentId)

    // Get all exam applications for this student
    const examApplications = await prisma.examApplication.findMany({
      where: {
        studentId: studentId
      },
      include: {
        committees: true,
        documents: true
      }
    })

    console.log(`📋 Found ${examApplications.length} exam applications to delete`)

    // Delete related data first (due to foreign key constraints)
    for (const exam of examApplications) {
      console.log(`\n🔄 Processing exam: ${exam.title}`)

      // Delete exam documents
      const documentsDeleted = await prisma.examDocument.deleteMany({
        where: {
          examId: exam.id
        }
      })
      console.log(`   📄 Deleted ${documentsDeleted.count} documents`)

      // Delete exam committees
      const committeesDeleted = await prisma.examCommittee.deleteMany({
        where: {
          examId: exam.id
        }
      })
      console.log(`   👥 Deleted ${committeesDeleted.count} committee members`)
    }

    // Delete exam applications
    const examsDeleted = await prisma.examApplication.deleteMany({
      where: {
        studentId: studentId
      }
    })
    console.log(`\n✅ Deleted ${examsDeleted.count} exam applications`)

    console.log('\n🎉 All exam data cleared successfully!')
    console.log('💡 You can now try adding exam data manually through the frontend')

  } catch (error) {
    console.error('❌ Error clearing exam data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearExamData()
