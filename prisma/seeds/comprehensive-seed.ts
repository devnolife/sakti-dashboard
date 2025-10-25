import { PrismaClient, Role } from '../../lib/generated/prisma'
import bcrypt from 'bcryptjs'

export async function seedComprehensiveData(prisma: PrismaClient) {
  const defaultPassword = await bcrypt.hash('password123', 10)

  console.log('🌱 Starting comprehensive seed...')

  // Clean up existing data
  console.log('🧹 Cleaning existing data...')
  await prisma.audit_logs.deleteMany({})
  await prisma.notifications.deleteMany({})
  await prisma.system_configs.deleteMany({})
  await prisma.letter_types.deleteMany({})
  await prisma.books.deleteMany({})
  await prisma.book_categories.deleteMany({})
  await prisma.kkp_applications.deleteMany({})
  await prisma.companies.deleteMany({})
  await prisma.academic_consultations.deleteMany({})
  await prisma.grades.deleteMany({})
  await prisma.course_schedules.deleteMany({})
  await prisma.courses.deleteMany({})
  await prisma.students.deleteMany({})
  await prisma.lecturers.deleteMany({})
  await prisma.users.deleteMany({})

  // 1. Create Admin
  console.log('👤 Creating admin...')
  const adminUser = await prisma.users.create({
    data: {
      id: 'admin-1',
      username: 'admin',
      password: defaultPassword,
      name: 'Administrator',
      role: Role.admin,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  // 2. Create Dosen (Lecturer)
  console.log('👨‍🏫 Creating dosen...')
  const dosenUser = await prisma.users.create({
    data: {
      id: 'dosen-1',
      username: '0123456789',
      password: defaultPassword,
      name: 'Dr. Ahmad Fauzi, S.Kom., M.T.',
      role: Role.dosen,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      lecturers: {
        create: {
          id: 'lecturer-1',
          nip: '0123456789',
          department: 'Teknik Informatika',
          position: 'Dosen',
          specialization: 'Artificial Intelligence',
          email: 'ahmad.fauzi@unismuh.ac.id',
          phone: '081234567890',
          office: 'Gedung B Lt. 3'
        }
      }
    }
  })

  // 3. Create Mahasiswa
  console.log('👨‍🎓 Creating mahasiswa...')
  const mahasiswaUser = await prisma.users.create({
    data: {
      id: 'mahasiswa-1',
      username: '105841101220',
      password: defaultPassword,
      name: 'Budi Santoso',
      role: Role.mahasiswa,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      students: {
        create: {
          id: 'student-1',
          nim: '105841101220',
          major: 'Teknik Informatika',
          department: 'Fakultas Teknik',
          semester: 5,
          academic_year: '2023/2024',
          enroll_date: new Date('2022-08-01'),
          status: 'active',
          gpa: 3.65,
          academic_advisor_id: 'lecturer-1',
          phone: '081234567891',
          address: 'Makassar'
        }
      }
    }
  })

  // 4. Create Courses
  console.log('📚 Creating courses...')
  const courses = [
    { id: 'course-1', code: 'IF101', name: 'Pemrograman Dasar', credits: 3, semester: 1, department: 'Informatika' },
    { id: 'course-2', code: 'IF102', name: 'Struktur Data', credits: 3, semester: 2, department: 'Informatika' },
    { id: 'course-3', code: 'IF201', name: 'Basis Data', credits: 3, semester: 3, department: 'Informatika' },
    { id: 'course-4', code: 'IF202', name: 'Pemrograman Web', credits: 3, semester: 4, department: 'Informatika' },
    { id: 'course-5', code: 'IF301', name: 'Kecerdasan Buatan', credits: 3, semester: 5, department: 'Informatika' },
    { id: 'course-6', code: 'IF302', name: 'Machine Learning', credits: 3, semester: 5, department: 'Informatika' },
  ]

  for (const course of courses) {
    await prisma.courses.create({
      data: {
        ...course,
        is_active: true,
        lecturer_id: 'lecturer-1'
      }
    })
  }

  // 5. Create Course Schedules
  console.log('📅 Creating course schedules...')
  await prisma.course_schedules.create({
    data: {
      id: 'schedule-1',
      course_id: 'course-5',
      day: 'Senin',
      start_time: '08:00',
      end_time: '10:30',
      room: 'Lab 1',
      building: 'Gedung B',
      academic_year: '2023/2024',
      semester: 'Ganjil'
    }
  })

  await prisma.course_schedules.create({
    data: {
      id: 'schedule-2',
      course_id: 'course-6',
      day: 'Rabu',
      start_time: '13:00',
      end_time: '15:30',
      room: 'Lab 2',
      building: 'Gedung B',
      academic_year: '2023/2024',
      semester: 'Ganjil'
    }
  })

  // 6. Create Grades
  console.log('📊 Creating grades...')
  const gradeData = [
    { course_id: 'course-1', score: 85, letter_grade: 'A', semester: 'Ganjil', academic_year: '2022/2023' },
    { course_id: 'course-2', score: 78, letter_grade: 'B+', semester: 'Genap', academic_year: '2022/2023' },
    { course_id: 'course-3', score: 88, letter_grade: 'A', semester: 'Ganjil', academic_year: '2023/2024' },
    { course_id: 'course-4', score: 82, letter_grade: 'A-', semester: 'Genap', academic_year: '2023/2024' },
    { course_id: 'course-5', score: 90, letter_grade: 'A', semester: 'Ganjil', academic_year: '2024/2025' },
  ]

  for (const grade of gradeData) {
    await prisma.grades.create({
      data: {
        id: `grade-${grade.course_id}`,
        student_id: 'student-1',
        ...grade,
        created_at: new Date()
      }
    })
  }

  // 7. Create Academic Consultations
  console.log('💬 Creating academic consultations...')
  const consultations = [
    { date: new Date('2024-09-01'), uraian: 'Konsultasi Pengambilan Mata Kuliah', keterangan: 'Semester 5', paraf: true },
    { date: new Date('2024-09-15'), uraian: 'Konsultasi Persiapan KKP', keterangan: 'Diskusi topik KKP', paraf: true },
    { date: new Date('2024-10-01'), uraian: 'Monitoring Akademik', keterangan: 'Pembahasan IPK', paraf: true },
    { date: new Date('2024-10-15'), uraian: 'Bimbingan KKP', keterangan: 'Progress KKP', paraf: false },
  ]

  for (let i = 0; i < consultations.length; i++) {
    await prisma.academic_consultations.create({
      data: {
        id: `consultation-${i + 1}`,
        student_id: 'student-1',
        advisor_id: 'lecturer-1',
        ...consultations[i],
        created_at: new Date(),
        updated_at: new Date()
      }
    })
  }

  // 8. Create Company for KKP
  console.log('🏢 Creating companies...')
  await prisma.companies.create({
    data: {
      id: 'company-1',
      name: 'PT. Tech Indonesia',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      contact_person: 'John Doe',
      contact_phone: '081234567892',
      industry: 'Technology',
      description: 'Software Development Company'
    }
  })

  // 9. Create KKP Application
  console.log('📝 Creating KKP application...')
  await prisma.kkp_applications.create({
    data: {
      id: 'kkp-1',
      application_number: 'KKP/2024/001',
      title: 'Pengembangan Sistem Informasi Akademik',
      description: 'Membangun sistem informasi akademik berbasis web',
      submission_date: new Date('2024-09-20'),
      start_date: new Date('2024-11-01'),
      end_date: new Date('2025-01-31'),
      status: 'in_progress',
      student_id: 'student-1',
      supervisor_id: 'lecturer-1',
      company_id: 'company-1',
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  // 10. Create Book Category
  console.log('📖 Creating book categories...')
  await prisma.book_categories.create({
    data: {
      id: 'category-1',
      code: 'CS',
      name: 'Computer Science',
      description: 'Buku-buku tentang ilmu komputer',
      is_active: true
    }
  })

  // 11. Create Books
  console.log('📚 Creating books...')
  await prisma.books.create({
    data: {
      id: 'book-1',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publisher: 'MIT Press',
      publication_year: 2009,
      isbn: '978-0262033848',
      category_id: 'category-1',
      location: 'Rak A-1',
      status: 'available',
      added_date: new Date(),
      borrow_count: 0
    }
  })

  // 12. Create Letter Types
  console.log('📋 Creating letter types...')
  await prisma.letter_types.create({
    data: {
      id: 'letter-1',
      title: 'Surat Keterangan Aktif Kuliah',
      description: 'Surat keterangan mahasiswa aktif',
      approval_role: 'staff_tu',
      estimated_days: 3,
      required_documents: ['KTM', 'KRS'],
      is_active: true
    }
  })

  // 13. Create System Config
  console.log('⚙️ Creating system config...')
  await prisma.system_configs.create({
    data: {
      id: 'config-1',
      key: 'academic_year',
      value: '2024/2025',
      description: 'Tahun akademik aktif',
      updated_at: new Date()
    }
  })

  // 14. Create Notifications
  console.log('🔔 Creating notifications...')
  await prisma.notifications.create({
    data: {
      id: 'notif-1',
      user_id: 'mahasiswa-1',
      title: 'Selamat Datang!',
      message: 'Selamat datang di Sistem Informasi Akademik',
      type: 'info',
      is_read: false,
      created_at: new Date()
    }
  })

  await prisma.notifications.create({
    data: {
      id: 'notif-2',
      user_id: 'mahasiswa-1',
      title: 'KKP Disetujui',
      message: 'Pengajuan KKP Anda telah disetujui',
      type: 'success',
      is_read: false,
      created_at: new Date()
    }
  })

  console.log('✅ Comprehensive seed completed!')
  console.log('📊 Summary:')
  console.log('- Users: 3 (Admin, Dosen, Mahasiswa)')
  console.log('- Courses: 6')
  console.log('- Grades: 5')
  console.log('- Consultations: 4')
  console.log('- KKP Applications: 1')
  console.log('- Books: 1')
  console.log('- Notifications: 2')
}
