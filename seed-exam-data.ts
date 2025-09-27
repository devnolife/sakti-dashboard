import { PrismaClient } from './lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

const prisma = new PrismaClient()

async function seedExamData() {
  const userId = getHardcodedUserId()
  console.log('🌱 Seeding exam data for user:', userId)

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

    // Get available lecturers for advisors and committees
    const lecturers = await prisma.lecturer.findMany({
      where: {
        user: {
          isActive: true
        }
      },
      include: {
        user: true
      },
      take: 8
    })

    if (lecturers.length < 4) {
      console.log('❌ Not enough lecturers available for committees')
      return
    }

    // Get existing exam applications
    const existingExams = await prisma.examApplication.findMany({
      where: {
        studentId: studentId
      }
    })

    console.log(`📋 Found ${existingExams.length} existing exam applications`)

    // Update existing exams with advisors and committees
    for (const exam of existingExams) {
      console.log(`\n🔄 Updating exam: ${exam.title}`)

      // Assign advisors (first 2 lecturers)
      const advisor1 = lecturers[0]
      const advisor2 = lecturers[1]

      await prisma.examApplication.update({
        where: { id: exam.id },
        data: {
          advisor1Id: advisor1.id,
          advisor2Id: advisor2.id,
          location: exam.type === 'proposal' ? 'Ruang Seminar A1.2' : 'Ruang Seminar B2.3'
        }
      })

      console.log(`   ✅ Assigned advisors: ${advisor1.user.name}, ${advisor2.user.name}`)

      // Create committee members (3 members including chairman)
      const committeeMembers = [
        { lecturer: lecturers[2], role: 'chairman' },
        { lecturer: lecturers[3], role: 'member' },
        { lecturer: lecturers[4], role: 'member' }
      ]

      for (const member of committeeMembers) {
        await prisma.examCommittee.create({
          data: {
            examId: exam.id,
            lecturerId: member.lecturer.id,
            role: member.role
          }
        })
      }

      console.log(`   ✅ Created ${committeeMembers.length} committee members`)

      // Create exam documents
      const documents = [
        {
          name: 'Bukti Pembayaran Ujian',
          type: 'payment_proof' as const,
          status: 'verified' as const,
          fileUrl: `/uploads/payment_${exam.id}.pdf`,
          fileSize: 256000
        },
        {
          name: 'Transkrip Nilai',
          type: 'transcript' as const,
          status: 'verified' as const,
          fileUrl: `/uploads/transcript_${exam.id}.pdf`,
          fileSize: 512000
        },
        {
          name: 'Dokumen Proposal',
          type: 'proposal' as const,
          status: 'pending' as const,
          fileUrl: `/uploads/proposal_${exam.id}.pdf`,
          fileSize: 1024000
        },
        {
          name: 'Persetujuan Pembimbing',
          type: 'supervisor_approval' as const,
          status: 'verified' as const,
          fileUrl: `/uploads/approval_${exam.id}.pdf`,
          fileSize: 128000
        }
      ]

      for (const doc of documents) {
        await prisma.examDocument.create({
          data: {
            examId: exam.id,
            ...doc
          }
        })
      }

      console.log(`   ✅ Created ${documents.length} exam documents`)
    }

    // Create additional exam applications for different types
    const additionalExams = [
      {
        title: 'Ujian Hasil: Sistem Manajemen Dashboard',
        type: 'result' as const,
        status: 'pending' as const,
        abstract: 'Hasil penelitian mengenai implementasi sistem manajemen dashboard untuk meningkatkan efisiensi operasional perusahaan.',
        scheduledDate: new Date('2024-02-15T08:00:00Z')
      },
      {
        title: 'Ujian Tertutup: Sistem Manajemen Dashboard',
        type: 'closing' as const,
        status: 'pending' as const,
        abstract: 'Ujian akhir untuk menyelesaikan penelitian sistem manajemen dashboard.',
        scheduledDate: new Date('2024-03-20T10:00:00Z')
      }
    ]

    for (const examData of additionalExams) {
      const newExam = await prisma.examApplication.create({
        data: {
          studentId: studentId,
          advisor1Id: lecturers[0].id,
          advisor2Id: lecturers[1].id,
          location: examData.type === 'result' ? 'Ruang Seminar C1.1' : 'Ruang Seminar D2.2',
          ...examData
        }
      })

      console.log(`\n✅ Created new exam: ${newExam.title}`)

      // Create committee for new exam
      const committeeMembers = [
        { lecturer: lecturers[5], role: 'chairman' },
        { lecturer: lecturers[6], role: 'member' },
        { lecturer: lecturers[7], role: 'member' }
      ]

      for (const member of committeeMembers) {
        await prisma.examCommittee.create({
          data: {
            examId: newExam.id,
            lecturerId: member.lecturer.id,
            role: member.role
          }
        })
      }

      console.log(`   ✅ Created committee for ${newExam.title}`)
    }

    console.log('\n🎉 Exam data seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding exam data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedExamData()
