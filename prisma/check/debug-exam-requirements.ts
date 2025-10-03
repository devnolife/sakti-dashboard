import { PrismaClient } from '../../lib/generated/prisma'
import { getHardcodedUserId } from '../../lib/auth-utils'

const prisma = new PrismaClient()

async function debugExamRequirements() {
  try {
    console.log('🔍 Debug: Checking exam requirements data...')

    const userId = getHardcodedUserId()
    console.log(`Using userId: ${userId}`)
    
    // Get student ID from userId
    const studentData = await prisma.student.findUnique({
      where: { userId },
      include: { user: true }
    })

    if (!studentData) {
      console.log('❌ Student not found for this userId!')
      return
    }

    const studentId = studentData.id
    console.log(`Found student: ${studentData.user.name} (${studentData.nim}) - ID: ${studentId}`)

    const examType = 'proposal'

    // 1. Check if exam requirements exist
    const requirements = await prisma.examRequirement.findMany({
      where: {
        examType: examType
      },
      orderBy: {
        order: 'asc'
      }
    })

    console.log('\n📋 Exam Requirements in Database:')
    console.log(`Found ${requirements.length} requirements for ${examType}:`)
    requirements.forEach((req, index) => {
      console.log(`${index + 1}. ${req.title} (ID: ${req.id})`)
      console.log(`   Description: ${req.description || 'No description'}`)
      console.log(`   Order: ${req.order}`)
    })

    // 2. Check student requirements
    const studentRequirements = await prisma.examStudentRequirement.findMany({
      where: {
        studentId: studentId
      },
      include: {
        requirement: true
      }
    })

    console.log('\n👨‍🎓 Student Requirements Status:')
    console.log(`Found ${studentRequirements.length} student requirements:`)
    studentRequirements.forEach((req, index) => {
      console.log(`${index + 1}. ${req.requirement.title}`)
      console.log(`   Completed: ${req.completed}`)
      console.log(`   File: ${req.fileName || 'No file'}`)
      console.log(`   Uploaded: ${req.uploadedAt || 'Not uploaded'}`)
    })

    // 3. Check combined data (like API endpoint)
    const combinedData = await prisma.examRequirement.findMany({
      where: {
        examType: examType
      },
      include: {
        studentRequirements: {
          where: {
            studentId: studentId
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    console.log('\n🔄 Combined Data (API Response Format):')
    const transformedData = combinedData.map(requirement => {
      const studentRequirement = requirement.studentRequirements[0]
      return {
        id: requirement.id,
        title: requirement.title,
        description: requirement.description,
        completed: studentRequirement?.completed || false,
        fileUrl: studentRequirement?.fileUrl,
        fileName: studentRequirement?.fileName,
        uploadedAt: studentRequirement?.uploadedAt?.toISOString()
      }
    })

    console.log('Transformed data that API would return:')
    console.log(JSON.stringify(transformedData, null, 2))

  } catch (error) {
    console.error('❌ Debug error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugExamRequirements()
