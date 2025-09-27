import { PrismaClient } from './lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

const prisma = new PrismaClient()

async function verifyAIKData() {
  try {
    const userId = getHardcodedUserId()
    console.log('🔍 Verifying AIK Komfren data for userId:', userId)
    console.log('=' .repeat(60))

    // Get user and student profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true
      }
    })

    if (!user || !user.studentProfile) {
      console.log('❌ Student not found')
      return
    }

    console.log('👤 Student Info:')
    console.log(`   Name: ${user.name}`)
    console.log(`   NIM: ${user.studentProfile.nim}`)
    console.log(`   Student ID: ${user.studentProfile.id}`)
    console.log('')

    // Get AIK Komfren exam applications
    const aikExams = await prisma.examApplication.findMany({
      where: {
        studentId: user.studentProfile.id,
        type: 'other',
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`📋 AIK Komfren Exam Applications: ${aikExams.length} found`)
    console.log('')

    if (aikExams.length === 0) {
      console.log('✅ No AIK exams found - ready for fresh registration test')
    } else {
      aikExams.forEach((exam, index) => {
        console.log(`📝 Exam ${index + 1}:`)
        console.log(`   ID: ${exam.id}`)
        console.log(`   Title: ${exam.title}`)
        console.log(`   Status: ${exam.status}`)
        console.log(`   Submission Date: ${exam.submissionDate.toISOString()}`)
        console.log(`   Scheduled Date: ${exam.scheduledDate?.toISOString() || 'Not scheduled'}`)
        console.log(`   Completion Date: ${exam.completionDate?.toISOString() || 'Not completed'}`)
        console.log(`   Location: ${exam.location || 'Not assigned'}`)
        console.log(`   Examiner: ${exam.advisor1?.user.name || 'Not assigned'}`)
        console.log(`   Committee Members: ${exam.committees.length}`)
        console.log(`   Documents: ${exam.documents.length}`)
        
        if (exam.documents.length > 0) {
          console.log('   📄 Documents:')
          exam.documents.forEach(doc => {
            console.log(`      - ${doc.name} (${doc.type}, ${doc.status})`)
          })
        }
        
        console.log('')
      })
    }

    // Check validation: can student register?
    const hasActiveExam = aikExams.some(exam => 
      ['applicant', 'pending', 'scheduled', 'completed'].includes(exam.status)
    )

    console.log('🎯 Registration Validation:')
    if (hasActiveExam) {
      console.log('   ❌ Student CANNOT register - has active AIK exam')
      console.log('   📍 Active exam statuses found:', 
        aikExams
          .filter(exam => ['applicant', 'pending', 'scheduled', 'completed'].includes(exam.status))
          .map(exam => exam.status)
          .join(', ')
      )
    } else {
      console.log('   ✅ Student CAN register - no active AIK exam found')
    }

    console.log('')
    console.log('📊 Summary:')
    console.log(`   Total AIK exams: ${aikExams.length}`)
    console.log(`   Active exams: ${aikExams.filter(exam => ['applicant', 'pending', 'scheduled', 'completed'].includes(exam.status)).length}`)
    console.log(`   Completed exams: ${aikExams.filter(exam => ['passed', 'failed'].includes(exam.status)).length}`)
    console.log(`   Can register new: ${!hasActiveExam ? 'YES' : 'NO'}`)

  } catch (error) {
    console.error('❌ Error verifying AIK data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifyAIKData()
