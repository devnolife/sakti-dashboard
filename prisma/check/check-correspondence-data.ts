import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

async function checkCorrespondenceData() {
  try {
    console.log('=== CORRESPONDENCE DATA CHECK ===\n')

    // Check if correspondence tables exist and have data
    console.log('1. Checking LetterRequest table...')
    const letterRequestsCount = await prisma.letterRequest.count()
    console.log(`   Found ${letterRequestsCount} letter requests`)

    if (letterRequestsCount > 0) {
      const letterRequests = await prisma.letterRequest.findMany({
        include: {
          student: {
            include: {
              user: true
            }
          },
          attachments: true
        },
        take: 5
      })
      console.log('   Sample letter requests:')
      letterRequests.forEach((req: any) => {
        console.log(`   - ${req.id}: ${req.title} (${req.status}) - Student: ${req.student.user.name}`)
      })
    }

    console.log('\n2. Checking LetterType table...')
    const letterTypesCount = await prisma.letterType.count()
    console.log(`   Found ${letterTypesCount} letter types`)

    if (letterTypesCount > 0) {
      const letterTypes = await prisma.letterType.findMany()
      console.log('   Available letter types:')
      letterTypes.forEach((type: any) => {
        console.log(`   - ${type.id}: ${type.title} (${type.approvalRole})`)
      })
    }

    console.log('\n3. Checking LetterAttachment table...')
    const attachmentsCount = await prisma.letterAttachment.count()
    console.log(`   Found ${attachmentsCount} letter attachments`)

    console.log('\n4. Checking Student table for user: cmfz4q41z00019yo0urpkhgyf')
    const targetUser = await prisma.user.findUnique({
      where: { id: 'cmfz4q41z00019yo0urpkhgyf' },
      include: {
        studentProfile: {
          include: {
            letterRequests: {
              include: {
                attachments: true
              }
            }
          }
        }
      }
    })

    if (targetUser && targetUser.studentProfile) {
      console.log(`   User found: ${targetUser.name} (${targetUser.nidn})`)
      console.log(`   Student ID: ${targetUser.studentProfile.id}`)
      console.log(`   Student NIM: ${targetUser.studentProfile.nim}`)
      console.log(`   Student Major: ${targetUser.studentProfile.major}`)
      console.log(`   Letter requests count: ${targetUser.studentProfile.letterRequests.length}`)
      
      if (targetUser.studentProfile.letterRequests.length > 0) {
        console.log('   Letter requests:')
        targetUser.studentProfile.letterRequests.forEach((req: any) => {
          console.log(`   - ${req.id}: ${req.title} (${req.status})`)
        })
      }
    } else {
      console.log('   User not found or has no student profile')
    }

    console.log('\n=== END CHECK ===')

  } catch (error) {
    console.error('Error checking correspondence data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCorrespondenceData()
