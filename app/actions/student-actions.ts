'use server'

import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { students } from '@/components/dekan/vice-dean-4/mock-data'

export async function getStudentDashboardData() {
  // Get current student user ID
  const user_id = await getServerActionUserId()

  console.log('🔍 Fetching student dashboard data for user:', user_id)

  try {
    // Get user with student profile
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: {
        students: {
          include: {
            kkp_applications: {
              include: {
                companies: true,
                lecturers: {
                  include: {
                    users: true
                  }
                }
              },
              orderBy: { created_at: 'desc' },
              take: 1
            },
            exam_applications: {
              orderBy: { created_at: 'desc' },
              take: 5
            },
            letter_requests: {
              orderBy: { created_at: 'desc' },
              take: 5
            },
            payments: {
              where: {
                status: { in: ['pending', 'failed'] }
              },
              orderBy: { due_date: 'asc' },
              take: 5
            },
            grades: {
              include: {
                courses: {
                  include: {
                    lecturers: {
                      include: {
                        users: true
                      }
                    },
                    course_schedules: true
                  }
                }
              },
              orderBy: { created_at: 'desc' }
            },
            book_borrowings: {
              where: {
                status: { in: ['active', 'overdue'] }
              },
              include: {
                books: true
              },
              orderBy: { borrow_date: 'desc' },
              take: 5
            }
          }
        }
      }
    })

    if (!user?.students) {
      throw new Error('Student profile not found')
    }

    const student = user.students

    // Calculate current semester courses
    const currentAcademicYear = new Date().getFullYear().toString()
    const currentSemester = new Date().getMonth() < 6 ? 'genap' : 'ganjil'

    const currentCourses = student.grades.filter(grade =>
      grade.academic_year === currentAcademicYear &&
      grade.semester.toLowerCase().includes(currentSemester)
    )

    // Get current semester credits
    const currentCredits = currentCourses.reduce((sum, grade) => sum + grade.courses.credits, 0)

    // Get active KKP application
    const activeKkp = student.kkp_applications.length > 0 ? student.kkp_applications[0] : null

    // Get upcoming deadlines (combine different sources)
    const upcomingDeadlines = [
      ...student.exam_applications
        .filter(exam => exam.scheduled_date && new Date(exam.scheduled_date) > new Date())
        .map(exam => ({
          id: exam.id,
          title: `${exam.type === 'proposal' ? 'Ujian Proposal' : exam.type === 'result' ? 'Ujian Hasil' : 'Ujian Akhir'} - ${exam.title}`,
          date: exam.scheduled_date,
          type: 'exam',
          urgent: new Date(exam.scheduled_date!).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 // 7 days
        })),
      ...student.payments
        .filter(payment => payment.due_date && new Date(payment.due_date) > new Date())
        .map(payment => ({
          id: payment.id,
          title: `Pembayaran ${payment.description}`,
          date: payment.due_date,
          type: 'payment',
          urgent: new Date(payment.due_date).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 // 3 days
        })),
      ...student.book_borrowings
        .filter(borrowing => borrowing.due_date && new Date(borrowing.due_date) > new Date())
        .map(borrowing => ({
          id: borrowing.id,
          title: `Pengembalian Buku: ${borrowing.books.title}`,
          date: borrowing.due_date,
          type: 'library',
          urgent: new Date(borrowing.due_date).getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000 // 2 days
        }))
    ].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateA - dateB
    })

    // Get weekly schedule from current courses
    const weeklySchedule = currentCourses.reduce((schedule: any[], grade) => {
      grade.courses.course_schedules.forEach(courseSchedule => {
        schedule.push({
          day: courseSchedule.day,
          courseName: grade.courses.name,
          courseCode: grade.courses.code,
          time: `${courseSchedule.start_time} - ${courseSchedule.end_time}`,
          location: `${courseSchedule.room}${courseSchedule.building ? `, ${courseSchedule.building}` : ''}`,
          lecturer: grade.courses.lecturers?.users.name || 'TBA',
          credits: grade.courses.credits
        })
      })
      return schedule
    }, [])

    return {
      student: {
        id: student.id,
        nim: student.nim,
        name: user.name,
        major: student.major || 'Belum diatur',
        department: student.department || 'Belum diatur',
        semester: student.semester,
        angkatan: student.angkatan,
        academic_year: student.academic_year,
        semester_awal: student.semester_awal,
        jenis_kelamin: student.jenis_kelamin,
        tempat_lahir: student.tempat_lahir,
        tanggal_lahir: student.tanggal_lahir,
        nik: student.nik,
        phone: student.phone,
        email: student.email,
        address: student.address,
        enroll_date: student.enroll_date,
        gpa: student.gpa || 0,
        status: student.status,
        tahun_akademik_lulus: student.tahun_akademik_lulus,
        tanggal_lulus: student.tanggal_lulus,
        lulus: student.lulus,
        no_seri_ijazah: student.no_seri_ijazah,
        masa_studi: student.masa_studi,
        last_sync_at: student.last_sync_at,
        prodi_id: student.prodi_id
      },
      currentSemester: {
        courses: currentCourses.length,
        credits: currentCredits,
        academic_year: currentAcademicYear,
        period: currentSemester
      },
      kkpStatus: activeKkp ? {
        status: activeKkp.status,
        title: activeKkp.title,
        company: activeKkp.companies?.name,
        supervisor: activeKkp.lecturers?.users.name,
        submission_date: activeKkp.submission_date
      } : null,
      upcomingDeadlines: upcomingDeadlines.slice(0, 10),
      currentCourses: currentCourses.map(grade => ({
        id: grade.courses.id,
        code: grade.courses.code,
        name: grade.courses.name,
        credits: grade.courses.credits,
        lecturer: grade.courses.lecturers?.users.name || 'TBA',
        grade: grade.letter_grade,
        semester: grade.semester,
        schedules: grade.courses.course_schedules
      })),
      weeklySchedule,
      pendingPayments: student.payments.length,
      activeBorrowings: student.book_borrowings.length,
      letterRequests: student.letter_requests.length
    }
  } catch (error) {
    console.error('Error fetching student dashboard data:', error)
    throw error
  }
}

function getGradePoint(letterGrade: string): number {
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

export async function getStudentNotifications() {
  // Get current student user ID
  const userId = await getServerActionUserId()

  try {
    const notifications = await prisma.notifications.findMany({
      where: {
        user_id: userId
      },
      orderBy: {
        created_at: 'desc'
      },
      take: 10
    })

    return notifications
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}
