import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function seedLaboratoryData() {
  try {
    console.log('🧪 Seeding laboratory data...')

    // Get student with username MAHASISWA001
    const student = await prisma.student.findFirst({
      where: { 
        user: {
          nidn: 'MAHASISWA001'
        }
      },
      include: {
        user: true
      }
    })

    if (!student) {
      throw new Error('Student with username MAHASISWA001 not found')
    }

    // Get some lecturers to be instructors
    const lecturers = await prisma.lecturer.findMany({
      take: 6
    })

    if (lecturers.length === 0) {
      throw new Error('No lecturers found. Please seed lecturer data first.')
    }

    // Create laboratories
    const laboratories = [
      {
        code: 'LAB001',
        name: 'Laboratorium Jaringan Komputer',
        description: 'Pelajari tentang protokol jaringan, konfigurasi, dan teknik pemecahan masalah.',
        image: '/placeholder.svg?height=200&width=400',
        capacity: 30,
        credits: 2,
        semester: 'Ganjil 2023/2024',
        department: 'Teknik Informatika',
        location: 'Gedung A, Ruang 101',
        category: 'Inti',
        status: 'active' as const,
        instructorId: lecturers[0]?.id,
      },
      {
        code: 'LAB002',
        name: 'Laboratorium Sistem Basis Data',
        description: 'Implementasi praktis dari desain basis data, kueri SQL, dan manajemen basis data.',
        image: '/placeholder.svg?height=200&width=400',
        capacity: 25,
        credits: 2,
        semester: 'Ganjil 2023/2024',
        department: 'Teknik Informatika',
        location: 'Gedung B, Ruang 203',
        category: 'Inti',
        status: 'active' as const,
        instructorId: lecturers[1]?.id,
      },
      {
        code: 'LAB003',
        name: 'Laboratorium Kecerdasan Buatan',
        description: 'Pengalaman langsung dengan algoritma pembelajaran mesin dan aplikasi kecerdasan buatan.',
        image: '/placeholder.svg?height=200&width=400',
        capacity: 20,
        credits: 3,
        semester: 'Ganjil 2023/2024',
        department: 'Teknik Informatika',
        location: 'Gedung C, Ruang 305',
        category: 'Pilihan',
        status: 'active' as const,
        instructorId: lecturers[2]?.id,
      },
      {
        code: 'LAB004',
        name: 'Laboratorium Pengembangan Web',
        description: 'Membangun aplikasi web responsif menggunakan framework dan teknologi modern.',
        image: '/placeholder.svg?height=200&width=400',
        capacity: 30,
        credits: 2,
        semester: 'Ganjil 2023/2024',
        department: 'Teknik Informatika',
        location: 'Gedung A, Ruang 102',
        category: 'Inti',
        status: 'active' as const,
        instructorId: lecturers[3]?.id,
      },
      {
        code: 'LAB005',
        name: 'Laboratorium Keamanan Siber',
        description: 'Pelajari tentang kerentanan keamanan, enkripsi, dan teknik peretasan etis.',
        image: '/placeholder.svg?height=200&width=400',
        capacity: 20,
        credits: 3,
        semester: 'Ganjil 2023/2024',
        department: 'Teknik Informatika',
        location: 'Gedung B, Ruang 204',
        category: 'Pilihan',
        status: 'active' as const,
        instructorId: lecturers[4]?.id,
      },
      {
        code: 'LAB006',
        name: 'Laboratorium Pengembangan Aplikasi Mobile',
        description: 'Membuat aplikasi mobile native dan lintas platform untuk iOS dan Android.',
        image: '/placeholder.svg?height=200&width=400',
        capacity: 25,
        credits: 3,
        semester: 'Ganjil 2023/2024',
        department: 'Teknik Informatika',
        location: 'Gedung C, Ruang 306',
        category: 'Pilihan',
        status: 'active' as const,
        instructorId: lecturers[5]?.id,
      },
    ]

    // Create laboratories
    console.log('Creating laboratories...')
    const createdLabs = []
    for (const labData of laboratories) {
      const lab = await prisma.laboratory.upsert({
        where: { code: labData.code },
        update: labData,
        create: labData,
      })
      createdLabs.push(lab)
      console.log(`✅ Created/Updated laboratory: ${lab.name}`)
    }

    // Create lab registrations for student
    console.log('Creating lab registrations...')
    const registrations = [
      {
        laboratoryId: createdLabs[0].id, // Jaringan Komputer
        studentId: student.id,
        status: 'completed' as const,
        progress: 100,
        grade: 'A',
        completedAt: new Date('2023-12-15'),
      },
      {
        laboratoryId: createdLabs[1].id, // Sistem Basis Data
        studentId: student.id,
        status: 'approved' as const,
        progress: 75,
        grade: null,
        completedAt: null,
      },
      {
        laboratoryId: createdLabs[3].id, // Pengembangan Web
        studentId: student.id,
        status: 'pending' as const,
        progress: 0,
        grade: null,
        completedAt: null,
      },
    ]

    for (const regData of registrations) {
      const registration = await prisma.labRegistration.upsert({
        where: {
          studentId_laboratoryId: {
            studentId: regData.studentId,
            laboratoryId: regData.laboratoryId,
          },
        },
        update: regData,
        create: regData,
      })
      console.log(`✅ Created/Updated lab registration for lab ID: ${registration.laboratoryId}`)
    }

    // Create lab sessions
    console.log('Creating lab sessions...')
    const sessions = []
    for (let i = 0; i < createdLabs.length; i++) {
      const lab = createdLabs[i]
      const labSessions = [
        {
          title: `Pertemuan 1 - Pengenalan ${lab.name}`,
          description: `Pengenalan dasar dan overview ${lab.name}`,
          sessionDate: new Date('2024-01-10'),
          startTime: '10:00',
          endTime: '12:00',
          location: lab.location,
          status: 'completed' as const,
          laboratoryId: lab.id,
        },
        {
          title: `Pertemuan 2 - Praktikum Dasar`,
          description: `Praktikum dasar untuk ${lab.name}`,
          sessionDate: new Date('2024-01-17'),
          startTime: '10:00',
          endTime: '12:00',
          location: lab.location,
          status: 'completed' as const,
          laboratoryId: lab.id,
        },
        {
          title: `Pertemuan 3 - Praktikum Lanjutan`,
          description: `Praktikum lanjutan untuk ${lab.name}`,
          sessionDate: new Date('2024-01-24'),
          startTime: '10:00',
          endTime: '12:00',
          location: lab.location,
          status: 'scheduled' as const,
          laboratoryId: lab.id,
        },
      ]
      sessions.push(...labSessions)
    }

    for (const sessionData of sessions) {
      const session = await prisma.labSession.create({
        data: sessionData,
      })
      console.log(`✅ Created lab session: ${session.title}`)
    }

    // Create lab assignments
    console.log('Creating lab assignments...')
    const assignments = []
    for (let i = 0; i < createdLabs.length; i++) {
      const lab = createdLabs[i]
      const labAssignments = [
        {
          title: `Tugas 1 - ${lab.name}`,
          description: `Tugas praktikum pertama untuk ${lab.name}`,
          dueDate: new Date('2024-01-20'),
          maxScore: 100,
          laboratoryId: lab.id,
        },
        {
          title: `Tugas 2 - ${lab.name}`,
          description: `Tugas praktikum kedua untuk ${lab.name}`,
          dueDate: new Date('2024-02-05'),
          maxScore: 100,
          laboratoryId: lab.id,
        },
      ]
      assignments.push(...labAssignments)
    }

    const createdAssignments = []
    for (const assignmentData of assignments) {
      const assignment = await prisma.labAssignment.create({
        data: assignmentData,
      })
      createdAssignments.push(assignment)
      console.log(`✅ Created lab assignment: ${assignment.title}`)
    }

    // Create assignment submissions for registered labs
    console.log('Creating assignment submissions...')
    const registeredLabs = await prisma.labRegistration.findMany({
      where: { studentId: student.id },
      include: { laboratory: true },
    })

    for (const registration of registeredLabs) {
      const labAssignments = createdAssignments.filter(
        (assignment) => assignment.laboratoryId === registration.laboratoryId
      )

      for (const assignment of labAssignments) {
        const submission = await prisma.labAssignmentSubmission.create({
          data: {
            studentId: student.id,
            assignmentId: assignment.id,
            registrationId: registration.id,
            score: registration.status === 'completed' ? 85 : null,
            feedback: registration.status === 'completed' ? 'Pekerjaan bagus!' : null,
            fileUrl: '/uploads/assignment-sample.pdf',
          },
        })
        console.log(`✅ Created assignment submission for: ${assignment.title}`)
      }
    }

    // Create lab materials
    console.log('Creating lab materials...')
    for (const lab of createdLabs) {
      const materials = [
        {
          title: `Modul ${lab.name}`,
          description: `Modul pembelajaran untuk ${lab.name}`,
          type: 'pdf',
          fileUrl: '/materials/modul-sample.pdf',
          laboratoryId: lab.id,
        },
        {
          title: `Video Tutorial ${lab.name}`,
          description: `Video tutorial untuk ${lab.name}`,
          type: 'video',
          externalUrl: 'https://youtube.com/watch?v=sample',
          laboratoryId: lab.id,
        },
      ]

      for (const materialData of materials) {
        const material = await prisma.labMaterial.create({
          data: materialData,
        })
        console.log(`✅ Created lab material: ${material.title}`)
      }
    }

    // Create lab announcements
    console.log('Creating lab announcements...')
    for (const lab of createdLabs) {
      const announcements = [
        {
          title: `Pengumuman ${lab.name}`,
          content: `Selamat datang di ${lab.name}! Pastikan untuk membaca semua materi sebelum praktikum.`,
          isImportant: true,
          laboratoryId: lab.id,
        },
        {
          title: `Jadwal Praktikum ${lab.name}`,
          content: `Jadwal praktikum untuk ${lab.name} telah tersedia. Silakan cek di menu jadwal.`,
          isImportant: false,
          laboratoryId: lab.id,
        },
      ]

      for (const announcementData of announcements) {
        const announcement = await prisma.labAnnouncement.create({
          data: announcementData,
        })
        console.log(`✅ Created lab announcement: ${announcement.title}`)
      }
    }

    console.log('✅ Laboratory data seeding completed successfully!')

  } catch (error) {
    console.error('❌ Error seeding laboratory data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seedLaboratoryData()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
