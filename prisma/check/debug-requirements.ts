import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

async function debugRequirements() {
  const studentId = "cmg3rxcbi00019yl0b38jhy03"
  
  console.log('🔍 Debugging requirements data...')
  console.log('Student ID:', studentId)
  
  // Check if student exists
  const student = await prisma.student.findUnique({
    where: { id: studentId }
  })
  console.log('Student exists:', !!student, student?.id)
  
  // Check exam requirements
  const examRequirements = await prisma.examRequirement.findMany({
    where: { examType: 'proposal' }
  })
  console.log('Proposal requirements:', examRequirements.length)
  examRequirements.forEach(req => {
    console.log(`- ${req.title} (${req.id})`)
  })
  
  // Check student requirements
  const studentRequirements = await prisma.examStudentRequirement.findMany({
    where: { studentId }
  })
  console.log('Student requirements:', studentRequirements.length)
  studentRequirements.forEach(req => {
    console.log(`- ${req.requirementId}: completed=${req.completed}, file=${req.fileName}`)
  })
  
  // Test the full query used by API
  const requirements = await prisma.examRequirement.findMany({
    where: {
      examType: 'proposal'
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
  
  console.log('API query result:')
  requirements.forEach(req => {
    const studentReq = req.studentRequirements[0]
    console.log(`- ${req.title}:`, {
      hasStudentData: !!studentReq,
      completed: studentReq?.completed || false,
      fileName: studentReq?.fileName || null
    })
  })
}

debugRequirements()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
