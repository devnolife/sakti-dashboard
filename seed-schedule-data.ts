import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function seedScheduleData() {
  console.log('🌱 Starting schedule data seeding...')

  try {
    // Find existing student
    const existingStudent = await prisma.student.findFirst({
      where: {
        user: {
          nidn: 'MAHASISWA001'
        }
      },
      include: {
        user: true,
        grades: {
          include: {
            course: {
              include: {
                lecturer: {
                  include: {
                    user: true
                  }
                }
              }
            }
          }
        }
      }
    })

    if (!existingStudent) {
      console.log('❌ Student MAHASISWA001 not found')
      return
    }

    console.log('✅ Found student:', existingStudent.user.name)

    // Delete existing academic events to avoid duplicates
    await prisma.academicEvent.deleteMany({
      where: {
        studentId: existingStudent.id
      }
    })

    // Delete existing course schedules to avoid duplicates
    const studentCourseIds = existingStudent.grades.map(g => g.courseId)
    await prisma.courseSchedule.deleteMany({
      where: {
        courseId: {
          in: studentCourseIds
        }
      }
    })

    console.log('🗑️ Cleaned existing schedule data')

    // Create course schedules for student's courses
    const scheduleData = [
      { day: 'Senin', startTime: '08:00', endTime: '10:30', room: 'Ruang 301', building: 'Gedung A' },
      { day: 'Selasa', startTime: '10:00', endTime: '12:30', room: 'Lab Komputer 1', building: 'Gedung B' },
      { day: 'Rabu', startTime: '13:00', endTime: '15:30', room: 'Ruang 205', building: 'Gedung A' },
      { day: 'Kamis', startTime: '08:00', endTime: '10:30', room: 'Lab Komputer 2', building: 'Gedung B' },
      { day: 'Jumat', startTime: '09:00', endTime: '11:30', room: 'Ruang 401', building: 'Gedung C' },
    ]

    // Create schedules for the first 5 courses
    const coursesToSchedule = existingStudent.grades.slice(0, 5)
    for (const [index, grade] of coursesToSchedule.entries()) {
      const schedule = scheduleData[index]
      await prisma.courseSchedule.create({
        data: {
          courseId: grade.courseId,
          day: schedule.day,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
          room: schedule.room,
          building: schedule.building,
          semester: grade.semester,
          academicYear: grade.academicYear
        }
      })
    }

    console.log(`✅ Created ${coursesToSchedule.length} course schedules`)

    // Create academic events
    const academicEvents = [
      {
        title: 'Ujian Proposal Skripsi',
        description: 'Presentasi proposal penelitian tentang Implementasi Machine Learning untuk Prediksi Cuaca',
        startDate: new Date('2025-03-07T14:30:00'),
        endDate: new Date('2025-03-07T16:30:00'),
        location: 'Ruang Seminar A1.2',
        type: 'exam' as const,
        examType: 'proposal' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Bimbingan Skripsi',
        description: 'Diskusi revisi proposal skripsi',
        startDate: new Date('2025-03-12T10:00:00'),
        endDate: new Date('2025-03-12T11:00:00'),
        location: 'Ruang Dosen Lt. 3',
        type: 'consultation' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Seminar Teknologi Blockchain',
        description: 'Pembicara: Dr. Satoshi Nakamoto dari Universitas Tokyo',
        startDate: new Date('2025-03-18T09:00:00'),
        endDate: new Date('2025-03-18T12:00:00'),
        location: 'Auditorium Utama',
        type: 'seminar' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Ujian Tengah Semester',
        description: 'Mata Kuliah: Jaringan Komputer',
        startDate: new Date('2025-03-20T10:00:00'),
        endDate: new Date('2025-03-20T11:30:00'),
        location: 'Ruang 201-205',
        type: 'exam' as const,
        examType: 'midterm' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Workshop UI/UX Design',
        description: 'Fasilitator: Tim Design Google Indonesia',
        startDate: new Date('2025-03-22T09:00:00'),
        endDate: new Date('2025-03-22T16:00:00'),
        location: 'Creative Hub',
        type: 'workshop' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Deadline Pengumpulan Tugas Besar',
        description: 'Mata Kuliah: Pemrograman Web Lanjut',
        startDate: new Date('2025-03-25T23:59:00'),
        endDate: new Date('2025-03-25T23:59:00'),
        location: null,
        type: 'deadline' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Ujian Hasil Skripsi',
        description: 'Presentasi hasil penelitian tentang Analisis Keamanan Jaringan pada Infrastruktur Cloud',
        startDate: new Date('2025-03-28T13:00:00'),
        endDate: new Date('2025-03-28T15:00:00'),
        location: 'Ruang Seminar B2.3',
        type: 'exam' as const,
        examType: 'result' as const,
        status: 'confirmed' as const
      },
      {
        title: 'Rapat Organisasi Mahasiswa',
        description: 'Agenda: Persiapan Acara Dies Natalis Fakultas',
        startDate: new Date('2025-03-15T16:00:00'),
        endDate: new Date('2025-03-15T18:00:00'),
        location: 'Ruang Rapat Himpunan',
        type: 'organization' as const,
        status: 'confirmed' as const
      }
    ]

    // Create academic events
    for (const eventData of academicEvents) {
      await prisma.academicEvent.create({
        data: {
          ...eventData,
          studentId: existingStudent.id
        }
      })
    }

    console.log(`✅ Created ${academicEvents.length} academic events`)

    // Create course-related events (class sessions)
    for (const grade of coursesToSchedule) {
      const course = grade.course
      if (course.lecturer?.user) {
        // Create upcoming class sessions for the next few weeks
        const classDates = [
          new Date('2025-03-05T08:00:00'),
          new Date('2025-03-12T08:00:00'),
          new Date('2025-03-19T08:00:00'),
          new Date('2025-03-26T08:00:00')
        ]

        for (const classDate of classDates) {
          await prisma.academicEvent.create({
            data: {
              title: `Kuliah ${course.name}`,
              description: `Perkuliahan mata kuliah ${course.name}`,
              startDate: classDate,
              endDate: new Date(classDate.getTime() + 2.5 * 60 * 60 * 1000), // +2.5 hours
              location: 'Ruang 301',
              type: 'class',
              status: 'confirmed',
              studentId: existingStudent.id,
              courseId: course.id,
              lecturerId: course.lecturerId
            }
          })
        }
      }
    }

    console.log('✅ Created course-related class events')

    // Verify data
    const totalEvents = await prisma.academicEvent.count({
      where: {
        studentId: existingStudent.id
      }
    })

    const totalSchedules = await prisma.courseSchedule.count({
      where: {
        courseId: {
          in: studentCourseIds
        }
      }
    })

    console.log('📊 Final verification:')
    console.log(`- Student: ${existingStudent.user.name}`)
    console.log(`- Total Academic Events: ${totalEvents}`)
    console.log(`- Total Course Schedules: ${totalSchedules}`)
    console.log(`- Events by type:`)
    
    const eventsByType = await prisma.academicEvent.groupBy({
      by: ['type'],
      where: {
        studentId: existingStudent.id
      },
      _count: {
        id: true
      }
    })

    for (const event of eventsByType) {
      console.log(`  - ${event.type}: ${event._count.id}`)
    }

  } catch (error) {
    console.error('❌ Error seeding schedule data:', error)
    throw error
  }
}

async function main() {
  await seedScheduleData()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
