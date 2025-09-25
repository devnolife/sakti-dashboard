import { PrismaClient } from './lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding student data...')
  
  try {
    // Find the student user
    const studentUser = await prisma.user.findUnique({
      where: { nidn: 'MAHASISWA001' }
    })
    
    if (!studentUser) {
      console.error('❌ Student user MAHASISWA001 not found')
      return
    }
    
    // Create or update student profile
    const studentProfile = await prisma.student.upsert({
      where: { userId: studentUser.id },
      update: {
        nim: '2021010001',
        major: 'Teknik Informatika',
        department: 'Fakultas Teknik',
        semester: 5,
        academicYear: '2021',
        status: 'active',
        enrollDate: new Date('2021-08-01'),
        gpa: 3.75
      },
      create: {
        userId: studentUser.id,
        nim: '2021010001',
        major: 'Teknik Informatika',
        department: 'Fakultas Teknik',
        semester: 5,
        academicYear: '2021',
        status: 'active',
        enrollDate: new Date('2021-08-01'),
        gpa: 3.75
      }
    })
    
    console.log('✅ Created/Updated student profile for:', studentUser.name)
    
    // Create some sample courses and lecturers
    const dosen1 = await prisma.user.findUnique({
      where: { nidn: 'DOSEN001' }
    })
    
    let lecturer1 = null
    if (dosen1) {
      lecturer1 = await prisma.lecturer.upsert({
        where: { userId: dosen1.id },
        update: {
          nip: 'NIP001234567890',
          department: 'Fakultas Teknik',
          position: 'Lektor',
          specialization: 'Machine Learning'
        },
        create: {
          userId: dosen1.id,
          nip: 'NIP001234567890',
          department: 'Fakultas Teknik',
          position: 'Lektor',
          specialization: 'Machine Learning'
        }
      })
      
      // Create sample courses
      const courses = [
        {
          code: 'TIF101',
          name: 'Pemrograman Web',
          credits: 3,
          semester: 5,
          department: 'Fakultas Teknik',
          description: 'Mata kuliah tentang pengembangan aplikasi web'
        },
        {
          code: 'TIF102',
          name: 'Basis Data',
          credits: 3,
          semester: 5,
          department: 'Fakultas Teknik',
          description: 'Mata kuliah tentang sistem basis data'
        },
        {
          code: 'TIF103',
          name: 'Algoritma dan Struktur Data',
          credits: 3,
          semester: 5,
          department: 'Fakultas Teknik',
          description: 'Mata kuliah tentang algoritma dan struktur data'
        },
        {
          code: 'TIF104',
          name: 'Sistem Operasi',
          credits: 3,
          semester: 5,
          department: 'Fakultas Teknik',
          description: 'Mata kuliah tentang sistem operasi komputer'
        }
      ]
      
      for (const courseData of courses) {
        const course = await prisma.course.upsert({
          where: { code: courseData.code },
          update: {
            name: courseData.name,
            credits: courseData.credits,
            semester: courseData.semester,
            department: courseData.department,
            description: courseData.description,
            lecturerId: lecturer1.id
          },
          create: {
            code: courseData.code,
            name: courseData.name,
            credits: courseData.credits,
            semester: courseData.semester,
            department: courseData.department,
            description: courseData.description,
            lecturerId: lecturer1.id
          }
        })
        
        // Create course schedules
        const schedules = [
          { day: 'Senin', startTime: '08:00', endTime: '10:30', room: 'Lab-101', building: 'Gedung A', semester: 'Ganjil', academicYear: '2023' },
          { day: 'Rabu', startTime: '10:30', endTime: '13:00', room: 'Ruang-201', building: 'Gedung B', semester: 'Ganjil', academicYear: '2023' },
          { day: 'Jumat', startTime: '13:00', endTime: '15:30', room: 'Lab-102', building: 'Gedung A', semester: 'Ganjil', academicYear: '2023' },
          { day: 'Selasa', startTime: '15:30', endTime: '18:00', room: 'Ruang-301', building: 'Gedung C', semester: 'Ganjil', academicYear: '2023' }
        ]
        
        const scheduleIndex = courses.indexOf(courseData)
        if (scheduleIndex < schedules.length) {
          const scheduleData = schedules[scheduleIndex]
          await prisma.courseSchedule.create({
            data: {
              courseId: course.id,
              day: scheduleData.day,
              startTime: scheduleData.startTime,
              endTime: scheduleData.endTime,
              room: scheduleData.room,
              building: scheduleData.building,
              semester: scheduleData.semester,
              academicYear: scheduleData.academicYear
            }
          })
        }
        
        // Create grades for the student
        const grades = ['A', 'B+', 'A-', 'B']
        const scores = [4.0, 3.3, 3.7, 3.0]
        const gradeIndex = courses.indexOf(courseData)
        const grade = grades[gradeIndex]
        const score = scores[gradeIndex]
        
        await prisma.grade.upsert({
          where: {
            studentId_courseId_semester_academicYear: {
              studentId: studentProfile.id,
              courseId: course.id,
              semester: 'Ganjil',
              academicYear: '2023'
            }
          },
          update: {
            letterGrade: grade,
            score: score
          },
          create: {
            studentId: studentProfile.id,
            courseId: course.id,
            semester: 'Ganjil',
            academicYear: '2023',
            letterGrade: grade,
            score: score
          }
        })
        
        console.log(`✅ Created course: ${courseData.code} - ${courseData.name} (Grade: ${grade})`)
      }
    }
    
    // Create sample KKP application
    let kkpCompany = await prisma.company.findFirst({
      where: { name: 'PT Tech Innovation' }
    })
    
    if (!kkpCompany) {
      kkpCompany = await prisma.company.create({
        data: {
          name: 'PT Tech Innovation',
          address: 'Jl. Teknologi No. 123',
          city: 'Jakarta',
          province: 'DKI Jakarta',
          contactPerson: 'Budi Santoso',
          contactPhone: '021-1234567',
          contactEmail: 'info@techinnovation.com',
          industry: 'Technology'
        }
      })
    }
    
    if (lecturer1) {
      await prisma.kkpApplication.create({
        data: {
          applicationNumber: 'KKP2023001',
          title: 'Pengembangan Sistem Manajemen Inventori',
          description: 'Mengembangkan sistem manajemen inventori berbasis web untuk meningkatkan efisiensi operasional perusahaan.',
          status: 'approved',
          submissionDate: new Date('2023-09-15'),
          startDate: new Date('2023-10-01'),
          endDate: new Date('2023-12-31'),
          studentId: studentProfile.id,
          companyId: kkpCompany.id,
          supervisorId: lecturer1.id
        }
      })
    }
    
    console.log('✅ Created KKP application')
    
    // Create sample payments
    const paymentTypes = [
      { 
        description: 'SPP Semester Ganjil 2023/2024', 
        amount: 5000000, 
        dueDate: new Date('2023-12-31'), 
        status: 'pending',
        category: 'tuition',
        semester: 'Ganjil',
        academicYear: '2023'
      },
      { 
        description: 'Biaya Praktikum', 
        amount: 500000, 
        dueDate: new Date('2023-11-30'), 
        status: 'pending',
        category: 'laboratory',
        semester: 'Ganjil',
        academicYear: '2023'
      }
    ]
    
    for (const payment of paymentTypes) {
      await prisma.payment.create({
        data: {
          studentId: studentProfile.id,
          description: payment.description,
          amount: payment.amount,
          dueDate: payment.dueDate,
          status: payment.status as any,
          category: payment.category as any,
          semester: payment.semester,
          academicYear: payment.academicYear
        }
      })
    }
    
    console.log('✅ Created sample payments')
    
    // Create sample exam applications
    await prisma.examApplication.create({
      data: {
        studentId: studentProfile.id,
        type: 'proposal',
        title: 'Proposal KKP: Sistem Manajemen Inventori',
        status: 'scheduled',
        scheduledDate: new Date('2023-11-15'),
        abstract: 'Proposal ini membahas pengembangan sistem manajemen inventori berbasis web.'
      }
    })
    
    console.log('✅ Created exam application')
    
    // Create sample book category and books
    const bookCategory = await prisma.bookCategory.upsert({
      where: { code: 'CS' },
      update: {
        name: 'Computer Science',
        description: 'Buku-buku tentang ilmu komputer'
      },
      create: {
        code: 'CS',
        name: 'Computer Science',
        description: 'Buku-buku tentang ilmu komputer'
      }
    })
    
    const books = [
      { title: 'Pemrograman Web dengan PHP', author: 'John Doe', isbn: '978-1234567890' },
      { title: 'Database Systems Concepts', author: 'Abraham Silberschatz', isbn: '978-0987654321' }
    ]
    
    for (const bookData of books) {
      const book = await prisma.book.upsert({
        where: { isbn: bookData.isbn },
        update: {
          title: bookData.title,
          author: bookData.author
        },
        create: {
          title: bookData.title,
          author: bookData.author,
          isbn: bookData.isbn,
          publisher: 'Tech Publishing',
          publicationYear: 2023,
          categoryId: bookCategory.id,
          location: 'Rak A-1',
          status: 'available'
        }
      })
      
      // Create borrowing record
      await prisma.bookBorrowing.create({
        data: {
          studentId: studentProfile.id,
          bookId: book.id,
          borrowDate: new Date(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
          status: 'active'
        }
      })
    }
    
    console.log('✅ Created sample book borrowings')
    
    console.log('🎉 Student data seeding completed!')
    
  } catch (error) {
    console.error('❌ Error seeding student data:', error)
    throw error
  }
}

function getGradePoints(letterGrade: string): number {
  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'E': 0.0
  }
  return gradePoints[letterGrade] || 0.0
}

main()
  .catch((e) => {
    console.error('Error:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
