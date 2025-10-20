import { PrismaClient } from '../../lib/generated/prisma'

export async function seedAcademicData(prisma: PrismaClient) {
  console.log('🌱 Starting academic data seeding...')

  try {
    // Find existing student
    const existingStudent = await prisma.student.findFirst({
      where: {
        user: {
          nidn: 'MAHASISWA001'
        }
      },
      include: {
        user: true
      }
    })

    if (!existingStudent) {
      console.log('❌ Student MAHASISWA001 not found')
      return
    }

    console.log('✅ Found student:', existingStudent.user.name)

    // Find or create academic advisor (lecturer)
    let advisor = await prisma.lecturer.findFirst({
      include: {
        user: true
      }
    })

    if (!advisor) {
      // Create academic advisor user
      const advisorUser = await prisma.users.create({
        data: {
          nidn: 'DOSEN001',
          name: 'Dr. Budi Santoso, M.Kom',
          role: 'dosen',
          password: '$2b$10$CqN.WHiKEkfJ.x3.L1.rHuYyLDZKo3zGXfY0zJzBwlFwQ1TGRJFjC', // password123
          isActive: true
        }
      })

      // Create lecturer profile
      advisor = await prisma.lecturer.create({
        data: {
          userId: advisorUser.id,
          nip: '198501012010031001',
          department: 'Teknik Informatika',
          position: 'Lektor',
          specialization: 'Software Engineering',
          phone: '+62812-3456-7890',
          office: 'Gedung E Lt. 3 R. 301'
        },
        include: {
          user: true
        }
      })

      console.log('✅ Created academic advisor:', advisor.user.name)
    }

    // Update student to have academic advisor
    await prisma.student.update({
      where: { id: existingStudent.id },
      data: {
        academicAdvisorId: advisor.id
      }
    })

    console.log('✅ Assigned academic advisor to student')

    // Create academic consultation entries
    const consultations = [
      {
        date: new Date('2023-09-10'),
        uraian: 'Konsultasi KRS Semester Ganjil',
        keterangan: 'Pengambilan 21 SKS untuk semester ganjil 2023/2024',
        paraf: true
      },
      {
        date: new Date('2023-09-25'),
        uraian: 'Konsultasi Topik Tugas Akhir',
        keterangan: 'Pembahasan ide awal untuk tugas akhir',
        paraf: true
      },
      {
        date: new Date('2023-10-10'),
        uraian: 'Konsultasi Progres Studi',
        keterangan: 'Evaluasi nilai UTS dan progress akademik',
        paraf: true
      },
      {
        date: new Date('2023-10-25'),
        uraian: 'Konsultasi Persiapan UAS',
        keterangan: 'Pembahasan strategi dan materi ujian akhir semester',
        paraf: false
      },
      {
        date: new Date('2023-11-10'),
        uraian: 'Konsultasi Rencana Semester Depan',
        keterangan: 'Perencanaan mata kuliah semester genap 2023/2024',
        paraf: false
      }
    ]

    // Delete existing consultations to avoid duplicates
    await prisma.academicConsultation.deleteMany({
      where: {
        studentId: existingStudent.id
      }
    })

    // Create consultation records
    for (const [index, consultation] of consultations.entries()) {
      await prisma.academicConsultation.create({
        data: {
          ...consultation,
          studentId: existingStudent.id,
          advisorId: advisor.id
        }
      })
    }

    console.log(`✅ Created ${consultations.length} consultation records`)

    // Verify data
    const consultationCount = await prisma.academicConsultation.count({
      where: {
        studentId: existingStudent.id
      }
    })

    const studentWithAdvisor = await prisma.student.findUnique({
      where: { id: existingStudent.id },
      include: {
        user: true,
        academicAdvisor: {
          include: {
            user: true
          }
        },
        academicConsultations: {
          orderBy: { date: 'asc' }
        }
      }
    })

    console.log('📊 Final verification:')
    console.log(`- Student: ${studentWithAdvisor?.user.name}`)
    console.log(`- Academic Advisor: ${studentWithAdvisor?.academicAdvisor?.user.name}`)
    console.log(`- Total Consultations: ${consultationCount}`)
    console.log(`- Completed Consultations: ${studentWithAdvisor?.academicConsultations.filter(c => c.paraf).length}`)

  } catch (error) {
    console.error('❌ Error seeding academic data:', error)
    throw error
  }
}

// This function is now exported and called from the main seed.ts file
