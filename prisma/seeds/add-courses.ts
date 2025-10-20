import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

async function addCourseData() {
  console.log('📚 Adding course data for current semester...')

  // Get student
  const student = await prisma.students.findFirst({
    where: {
      nim: '2021010001'
    }
  })

  if (!student) {
    console.error('Student not found')
    return
  }

  // Get or create lecturer
  const dosen = await prisma.users.findFirst({
    where: { role: 'dosen' }
  })

  let lecturer = null
  if (dosen) {
    lecturer = await prisma.lecturers.upsert({
      where: { user_id: dosen.id },
      update: {},
      create: {
        user_id: dosen.id,
        nip: 'NIP001234567890',
        department: 'Fakultas Teknik',
        position: 'Lektor',
        specialization: 'Machine Learning'
      }
    })
  }

  if (!lecturer) {
    console.error('Lecturer not found')
    return
  }

  // Current academic year and semester
  const currentYear = new Date().getFullYear().toString()
  const currentSemester = new Date().getMonth() < 6 ? 'Genap' : 'Ganjil'

  // Create courses for current semester
  const coursesData = [
    {
      code: 'TIF201',
      name: 'Pemrograman Web Lanjut',
      credits: 3,
      description: 'Mata kuliah lanjutan tentang pengembangan aplikasi web'
    },
    {
      code: 'TIF202',
      name: 'Machine Learning',
      credits: 3,
      description: 'Pengenalan konsep dan algoritma machine learning'
    },
    {
      code: 'TIF203',
      name: 'Mobile Programming',
      credits: 3,
      description: 'Pengembangan aplikasi mobile Android dan iOS'
    },
    {
      code: 'TIF204',
      name: 'Software Engineering',
      credits: 3,
      description: 'Metodologi pengembangan perangkat lunak'
    }
  ]

  const grades = ['A', 'A-', 'B+', 'B']
  const scores = [4.0, 3.7, 3.3, 3.0]

  for (let i = 0; i < coursesData.length; i++) {
    const courseData = coursesData[i]

    // Create course
    const course = await prisma.courses.upsert({
      where: { code: courseData.code },
      update: {
        name: courseData.name,
        credits: courseData.credits,
        description: courseData.description,
        lecturer_id: lecturer.id,
        semester: 5,
        department: 'Fakultas Teknik'
      },
      create: {
        code: courseData.code,
        name: courseData.name,
        credits: courseData.credits,
        description: courseData.description,
        lecturer_id: lecturer.id,
        semester: 5,
        department: 'Fakultas Teknik'
      }
    })

    // Create schedule for current semester
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis']
    const times = [
      { start: '08:00', end: '10:30' },
      { start: '10:30', end: '13:00' },
      { start: '13:00', end: '15:30' },
      { start: '15:30', end: '18:00' }
    ]
    const rooms = ['Lab-201', 'Ruang-301', 'Lab-202', 'Ruang-401']

    // Check if schedule exists, if not create it
    const existingSchedule = await prisma.coursesSchedule.findFirst({
      where: {
        courseId: course.id,
        day: days[i],
        semester: currentSemester,
        academic_year: currentYear
      }
    })

    if (!existingSchedule) {
      await prisma.coursesSchedule.create({
        data: {
          courseId: course.id,
          day: days[i],
          startTime: times[i].start,
          endTime: times[i].end,
          room: rooms[i],
          building: 'Gedung Teknik',
          semester: currentSemester,
          academic_year: currentYear
        }
      })
    }

    // Create grade for current semester
    await prisma.grade.upsert({
      where: {
        studentId_courseId_semester_academicYear: {
          student_id: student.id,
          courseId: course.id,
          semester: currentSemester,
          academic_year: currentYear
        }
      },
      update: {
        letterGrade: grades[i],
        score: scores[i]
      },
      create: {
        student_id: student.id,
        courseId: course.id,
        semester: currentSemester,
        academic_year: currentYear,
        letterGrade: grades[i],
        score: scores[i]
      }
    })

    console.log(`✅ Added course: ${courseData.code} - ${courseData.name} (${grades[i]})`)
  }

  console.log(`🎉 Added ${coursesData.length} courses for ${currentSemester} ${currentYear}`)
}

addCourseData()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
