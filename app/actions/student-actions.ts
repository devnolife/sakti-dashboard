'use server'

import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { students } from '@/components/dekan/vice-dean-4/mock-data'

export async function getStudentDashboardData() {
  // Get current student user ID
  const userId = await getServerActionUserId()

  console.log('🔍 Fetching student dashboard data for user:', userId)

  try {
    // Get user with student profile
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        students: {
          include: {
            kkpApplications: {
              include: {
                company: true,
                supervisor: {
                  include: {
                    user: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' },
              take: 1
            },
            examApplications: {
              orderBy: { createdAt: 'desc' },
              take: 5
            },
            letterRequests: {
              orderBy: { createdAt: 'desc' },
              take: 5
            },
            payments: {
              where: {
                status: { in: ['pending', 'failed'] }
              },
              orderBy: { dueDate: 'asc' },
              take: 5
            },
            grades: {
              include: {
                course: {
                  include: {
                    lecturer: {
                      include: {
                        user: true
                      }
                    },
                    schedules: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' }
            },
            bookBorrowings: {
              where: {
                status: { in: ['active', 'overdue'] }
              },
              include: {
                book: true
              },
              orderBy: { borrowDate: 'desc' },
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
      grade.academicYear === currentAcademicYear &&
      grade.semester.toLowerCase().includes(currentSemester)
    )

    // Get current semester credits
    const currentCredits = currentCourses.reduce((sum, grade) => sum + grade.course.credits, 0)

    // Get active KKP application
    const activeKkp = student.kkpApplications.length > 0 ? student.kkpApplications[0] : null

    // Get upcoming deadlines (combine different sources)
    const upcomingDeadlines = [
      ...student.examApplications
        .filter(exam => exam.scheduledDate && new Date(exam.scheduledDate) > new Date())
        .map(exam => ({
          id: exam.id,
          title: `${exam.type === 'proposal' ? 'Ujian Proposal' : exam.type === 'result' ? 'Ujian Hasil' : 'Ujian Akhir'} - ${exam.title}`,
          date: exam.scheduledDate,
          type: 'exam',
          urgent: new Date(exam.scheduledDate!).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000 // 7 days
        })),
      ...student.payments
        .filter(payment => payment.dueDate && new Date(payment.dueDate) > new Date())
        .map(payment => ({
          id: payment.id,
          title: `Pembayaran ${payment.description}`,
          date: payment.dueDate,
          type: 'payment',
          urgent: new Date(payment.dueDate).getTime() - new Date().getTime() < 3 * 24 * 60 * 60 * 1000 // 3 days
        })),
      ...student.bookBorrowings
        .filter(borrowing => borrowing.dueDate && new Date(borrowing.dueDate) > new Date())
        .map(borrowing => ({
          id: borrowing.id,
          title: `Pengembalian Buku: ${borrowing.book.title}`,
          date: borrowing.dueDate,
          type: 'library',
          urgent: new Date(borrowing.dueDate).getTime() - new Date().getTime() < 2 * 24 * 60 * 60 * 1000 // 2 days
        }))
    ].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateA - dateB
    })

    // Get weekly schedule from current courses
    const weeklySchedule = currentCourses.reduce((schedule: any[], grade) => {
      grade.course.schedules.forEach(courseSchedule => {
        schedule.push({
          day: courseSchedule.day,
          courseName: grade.course.name,
          courseCode: grade.course.code,
          time: `${courseSchedule.startTime} - ${courseSchedule.endTime}`,
          location: `${courseSchedule.room}${courseSchedule.building ? `, ${courseSchedule.building}` : ''}`,
          lecturer: grade.course.lecturer?.user.name || 'TBA',
          credits: grade.course.credits
        })
      })
      return schedule
    }, [])

    return {
      student: {
        id: student.id,
        nim: student.nim,
        name: user.name,
        major: student.major,
        department: student.department,
        semester: student.semester,
        academicYear: student.academicYear,
        gpa: student.gpa, // Gunakan GPA dari database, bukan perhitungan ulang
        status: student.status
      },
      currentSemester: {
        courses: currentCourses.length,
        credits: currentCredits,
        academicYear: currentAcademicYear,
        period: currentSemester
      },
      kkpStatus: activeKkp ? {
        status: activeKkp.status,
        title: activeKkp.title,
        company: activeKkp.company?.name,
        supervisor: activeKkp.supervisor?.user.name,
        submissionDate: activeKkp.submissionDate
      } : null,
      upcomingDeadlines: upcomingDeadlines.slice(0, 10),
      currentCourses: currentCourses.map(grade => ({
        id: grade.course.id,
        code: grade.course.code,
        name: grade.course.name,
        credits: grade.course.credits,
        lecturer: grade.course.lecturer?.user.name || 'TBA',
        grade: grade.letterGrade,
        semester: grade.semester,
        schedules: grade.course.schedules
      })),
      weeklySchedule,
      pendingPayments: student.payments.length,
      activeBorrowings: student.bookBorrowings.length,
      letterRequests: student.letterRequests.length
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
    const notifications = await prisma.notification.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    })

    return notifications
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return []
  }
}
