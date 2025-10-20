import { students } from '@/components/dekan/vice-dean-4/mock-data'
import { PrismaClient } from '../../lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

const prisma = new PrismaClient()

async function clearAIKData() {
  try {
    const userId = getHardcodedUserId()
    console.log('Clearing AIK Komfren data for userId:', userId)

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

    const studentId = user.students.id
    console.log('✅ Student found:', user.name, 'NIM:', user.students.nim)

    // Find all AIK exams for this student
    const aikExams = await prisma.examApplication.findMany({
      where: {
        studentId: studentId,
        type: 'other',
        title: {
          contains: 'AIK',
          mode: 'insensitive'
        }
      },
      include: {
        committees: true,
        documents: true
      }
    })

    console.log(`\n📋 Found ${aikExams.length} AIK Komfren exam applications to delete`)

    for (const exam of aikExams) {
      console.log(`\n🗑️  Deleting AIK Exam: ${exam.title} (${exam.status})`)

      // Delete related documents first
      await prisma.examDocument.deleteMany({
        where: { examId: exam.id }
      })
      console.log(`  - Deleted ${exam.documents.length} documents`)

      // Delete related committees
      await prisma.examCommittee.deleteMany({
        where: { examId: exam.id }
      })
      console.log(`  - Deleted ${exam.committees.length} committee members`)

      // Delete the exam application
      await prisma.examApplication.delete({
        where: { id: exam.id }
      })
      console.log(`  - Deleted exam application`)
    }

    console.log('\n🎉 AIK Komfren data cleared successfully!')
    console.log('✅ Ready for fresh registration testing')

  } catch (error) {
    console.error('❌ Error clearing AIK data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearAIKData()
