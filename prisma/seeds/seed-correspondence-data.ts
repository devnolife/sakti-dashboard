import { getHardcodedUserId } from '@/lib/auth-utils'
import { PrismaClient, ApprovalRole, LetterStatus } from '@/lib/generated/prisma'


export async function seedCorrespondenceData(prisma: PrismaClient) {
  const userId  = getHardcodedUserId()

  try {
    console.log('=== SEEDING CORRESPONDENCE DATA ===\n')

    // 1. Seed Letter Types
    console.log('1. Seeding Letter Types...')
    const letterTypes = [
      {
        id: 'letter-type-active-student',
        title: 'Surat Keterangan Aktif Kuliah',
        description: 'Surat keterangan bahwa mahasiswa masih aktif kuliah',
        approvalRole: ApprovalRole.staff_tu,
        estimatedDays: 3,
        requiredDocuments: ['Bukti Pembayaran SPP', 'KTM'],
        additionalFields: {
          fields: [
            {
              name: 'semester',
              label: 'Semester Saat Ini',
              type: 'number',
              required: true
            },
            {
              name: 'purpose',
              label: 'Keperluan',
              type: 'textarea',
              required: true
            }
          ]
        },
        isActive: true
      },
      {
        id: 'letter-type-leave-absence',
        title: 'Surat Cuti Kuliah',
        description: 'Permohonan cuti kuliah sementara',
        approvalRole: ApprovalRole.prodi,
        estimatedDays: 7,
        requiredDocuments: ['Bukti Pembayaran SPP', 'Transkrip Nilai', 'Surat Keterangan Dokter (jika sakit)'],
        additionalFields: {
          fields: [
            {
              name: 'startDate',
              label: 'Tanggal Mulai Cuti',
              type: 'date',
              required: true
            },
            {
              name: 'endDate',
              label: 'Tanggal Selesai Cuti',
              type: 'date',
              required: true
            },
            {
              name: 'reason',
              label: 'Alasan Cuti',
              type: 'textarea',
              required: true
            }
          ]
        },
        isActive: true
      },
      {
        id: 'letter-type-transfer',
        title: 'Surat Pindah Program Studi',
        description: 'Surat keterangan untuk pindah program studi',
        approvalRole: ApprovalRole.dekan,
        estimatedDays: 14,
        requiredDocuments: ['Transkrip Nilai', 'Surat Persetujuan Prodi Tujuan', 'Bukti Pembayaran'],
        additionalFields: {
          fields: [
            {
              name: 'currentMajor',
              label: 'Program Studi Saat Ini',
              type: 'text',
              required: true
            },
            {
              name: 'targetMajor',
              label: 'Program Studi Tujuan',
              type: 'text',
              required: true
            },
            {
              name: 'reason',
              label: 'Alasan Pindah',
              type: 'textarea',
              required: true
            }
          ]
        },
        isActive: true
      },
      {
        id: 'letter-type-survey',
        title: 'Surat Pengantar Survey',
        description: 'Surat pengantar untuk kegiatan survey dan penelitian',
        approvalRole: ApprovalRole.staff_tu,
        estimatedDays: 5,
        requiredDocuments: ['Proposal Penelitian', 'Surat Persetujuan Dosen Pembimbing'],
        additionalFields: {
          fields: [
            {
              name: 'surveyLocation',
              label: 'Lokasi Survey',
              type: 'text',
              required: true
            },
            {
              name: 'surveyPurpose',
              label: 'Tujuan Survey',
              type: 'textarea',
              required: true
            },
            {
              name: 'targetInstitution',
              label: 'Instansi Tujuan',
              type: 'text',
              required: true
            },
            {
              name: 'surveyDate',
              label: 'Tanggal Survey',
              type: 'date',
              required: true
            }
          ]
        },
        isActive: true
      }
    ]

    for (const letterType of letterTypes) {
      await prisma.letterType.upsert({
        where: { id: letterType.id },
        update: letterType,
        create: letterType
      })
      console.log(`   ✓ Created/Updated: ${letterType.title}`)
    }

    // 2. Get target student
    console.log('\n2. Finding target student...')
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true
      }
    })

    if (!targetUser || !targetUser.studentProfile) {
      throw new Error('Target user or student profile not found')
    }

    console.log(`   Found student: ${targetUser.name} (${targetUser.studentProfile.nim})`)

    // 3. Seed Sample Letter Requests
    console.log('\n3. Seeding Letter Requests...')
    const letterRequests = [
      {
        id: 'letter-req-001',
        type: 'active_student',
        title: 'Surat Keterangan Aktif Kuliah',
        purpose: 'Pengajuan Beasiswa Djarum',
        description: 'Surat keterangan aktif kuliah untuk keperluan pengajuan Beasiswa Djarum periode 2024',
        status: LetterStatus.completed,
        requestDate: new Date('2024-08-15T09:30:00Z'),
        approvedDate: new Date('2024-08-17T14:20:00Z'),
        completedDate: new Date('2024-08-18T10:15:00Z'),
        studentId: targetUser.studentProfile.id,
        approvalRole: ApprovalRole.staff_tu,
        approvedBy: 'Budi Santoso, S.Kom.',
        additionalInfo: {
          semester: 5,
          purpose: 'Pengajuan Beasiswa Djarum 2024'
        },
        letterNumber: 'SKA/001/VIII/2024',
        generatedLetter: '/documents/letters/ska-001-2024.pdf'
      },
      {
        id: 'letter-req-002',
        type: 'active_student',
        title: 'Surat Keterangan Aktif Kuliah',
        purpose: 'Keperluan Administrasi Keluarga',
        description: 'Surat keterangan aktif kuliah untuk keperluan administrasi keluarga (asuransi)',
        status: LetterStatus.in_review,
        requestDate: new Date('2024-09-20T13:45:00Z'),
        studentId: targetUser.studentProfile.id,
        approvalRole: ApprovalRole.staff_tu,
        additionalInfo: {
          semester: 5,
          purpose: 'Keperluan Asuransi Kesehatan Keluarga'
        }
      },
      {
        id: 'letter-req-003',
        type: 'survey',
        title: 'Surat Pengantar Survey',
        purpose: 'Survey Penelitian Skripsi',
        description: 'Surat pengantar untuk survey penelitian skripsi tentang implementasi sistem informasi',
        status: LetterStatus.submitted,
        requestDate: new Date('2024-09-25T10:30:00Z'),
        studentId: targetUser.studentProfile.id,
        approvalRole: ApprovalRole.staff_tu,
        additionalInfo: {
          surveyLocation: 'PT. Technology Solutions Indonesia',
          surveyPurpose: 'Penelitian tentang implementasi sistem informasi manajemen pada perusahaan teknologi',
          targetInstitution: 'PT. Technology Solutions Indonesia',
          surveyDate: '2024-10-15'
        }
      }
    ]

    for (const letterRequest of letterRequests) {
      await prisma.letterRequest.upsert({
        where: { id: letterRequest.id },
        update: letterRequest,
        create: letterRequest
      })
      console.log(`   ✓ Created/Updated: ${letterRequest.title} (${letterRequest.status})`)
    }

    // 4. Seed Sample Attachments
    console.log('\n4. Seeding Letter Attachments...')
    const attachments = [
      {
        id: 'att-001',
        name: 'Bukti_Pembayaran_SPP_Semester_5.pdf',
        url: '/uploads/attachments/bukti-spp-sem5.pdf',
        fileSize: 256000,
        mimeType: 'application/pdf',
        requestId: 'letter-req-001'
      },
      {
        id: 'att-002',
        name: 'KTM_Ahmad_Fauzi.jpg',
        url: '/uploads/attachments/ktm-ahmad.jpg',
        fileSize: 128000,
        mimeType: 'image/jpeg',
        requestId: 'letter-req-001'
      },
      {
        id: 'att-003',
        name: 'Bukti_Pembayaran_SPP_Semester_5_Sept.pdf',
        url: '/uploads/attachments/bukti-spp-sem5-sept.pdf',
        fileSize: 245000,
        mimeType: 'application/pdf',
        requestId: 'letter-req-002'
      },
      {
        id: 'att-004',
        name: 'Proposal_Penelitian_Skripsi.pdf',
        url: '/uploads/attachments/proposal-skripsi.pdf',
        fileSize: 512000,
        mimeType: 'application/pdf',
        requestId: 'letter-req-003'
      }
    ]

    for (const attachment of attachments) {
      await prisma.letterAttachment.upsert({
        where: { id: attachment.id },
        update: attachment,
        create: attachment
      })
      console.log(`   ✓ Created/Updated: ${attachment.name}`)
    }

    console.log('\n=== SEEDING COMPLETED SUCCESSFULLY ===')

  } catch (error) {
    console.error('Error seeding correspondence data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// This function is now exported and called from the main seed.ts file
