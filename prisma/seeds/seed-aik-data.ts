import { students } from '@/components/dekan/vice-dean-4/mock-data'
import { PrismaClient } from '../../lib/generated/prisma'
import { getHardcodedUserId } from '@/lib/auth-utils'

export async function seedAIKData(prisma: PrismaClient) {
  try {
    const userId = getHardcodedUserId()
    console.log('Seeding AIK Komfren data for userId:', userId)

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

    // Get a lecturer to be the examiner (preferably from Islamic Studies)
    // We'll use the first available lecturer as the examiner
    const examiner = await prisma.lecturer.findFirst({
      where: {
        user: {
          isActive: true
        }
      },
      include: {
        user: true
      }
    })

    if (!examiner) {
      console.log('❌ No lecturers available for examiner assignment')
      return
    }

    console.log('📝 Using examiner:', examiner.user.name)

    // Check if AIK exam already exists
    const existingAIKExam = await prisma.examApplication.findFirst({
      where: {
        studentId: studentId,
        type: 'other',
        title: {
          contains: 'AIK Komfren',
          mode: 'insensitive'
        }
      }
    })

    if (existingAIKExam) {
      console.log('⚠️  AIK Komfren exam already exists with ID:', existingAIKExam.id)
      return
    }

    // Create AIK Komfren exam application
    const aikExam = await prisma.examApplication.create({
      data: {
        title: 'AIK Komfren Examination',
        type: 'other',
        status: 'scheduled',
        abstract: 'Ujian AIK (Al-Islam dan Kemuhammadiyahan) dan Komfren (Kemuhammadiyahan dan Profesi) sebagai syarat kelulusan mahasiswa.',
        submissionDate: new Date('2025-03-01'),
        scheduledDate: new Date('2025-03-15T10:00:00Z'),
        location: 'Room 301, Islamic Studies Building',
        studentId: studentId,
        advisor1Id: examiner.id, // Using advisor1 as the examiner for AIK
      }
    })

    console.log('✅ Created AIK Komfren exam application:', aikExam.id)

    // Create exam committee (the examiner)
    const committee = await prisma.examCommittee.create({
      data: {
        examId: aikExam.id,
        lecturerId: examiner.id,
        role: 'examiner'
      }
    })

    console.log('✅ Created exam committee with examiner')

    // Create sample documents (payment proof as example)
    const paymentDoc = await prisma.examDocument.create({
      data: {
        examId: aikExam.id,
        name: 'Bukti Pembayaran Konsumsi AIK Komfren',
        type: 'payment_proof',
        status: 'verified',
        uploadDate: new Date('2025-03-02'),
        verificationDate: new Date('2025-03-03'),
        fileUrl: '/uploads/aik-payment-proof.pdf',
        fileSize: 256000,
        notes: 'Pembayaran konsumsi ujian AIK Komfren telah diverifikasi'
      }
    })

    console.log('✅ Created payment document')

    // Create another sample exam with different status (for testing different states)
    const completedAIKExam = await prisma.examApplication.create({
      data: {
        title: 'AIK Komfren Examination - Previous Attempt',
        type: 'other',
        status: 'completed',
        abstract: 'Previous attempt at AIK Komfren examination (completed but result pending).',
        submissionDate: new Date('2024-12-01'),
        scheduledDate: new Date('2024-12-15T14:00:00Z'),
        completionDate: new Date('2024-12-15T15:00:00Z'),
        location: 'Room 205, Islamic Studies Building',
        studentId: studentId,
        advisor1Id: examiner.id,
      }
    })

    console.log('✅ Created additional completed AIK exam for testing')

    console.log('\n🎉 AIK Komfren seed data completed successfully!')
    console.log('📋 Summary:')
    console.log('  - Created 2 AIK Komfren exam applications')
    console.log('  - Assigned examiner:', examiner.user.name)
    console.log('  - Created exam committee')
    console.log('  - Created sample payment document')
    console.log('\n✅ Ready for frontend integration!')

  } catch (error) {
    console.error('❌ Error seeding AIK data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// This function is now exported and called from the main seed.ts file
