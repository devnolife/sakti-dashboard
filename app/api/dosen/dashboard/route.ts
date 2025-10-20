import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authMiddleware, hasPermission } from '@/lib/auth-middleware'
import { syncDosenFromGraphQL, getMahasiswaPaWithSync } from '@/lib/sync/dosen-sync'

// GET /api/dosen/dashboard
export async function GET(request: NextRequest) {
  try {
    const token = await authMiddleware(request)
    if (token instanceof NextResponse) return token

    // Check if user is dosen
    if (token.role !== 'dosen') {
      return NextResponse.json({ error: 'Forbidden - Dosen access only' }, { status: 403 })
    }

    // Get lecturer profile
    let lecturer = await prisma.lecturer.findFirst({
      where: {
        users: {
          id: token.sub
        }
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    if (!lecturer) {
      return NextResponse.json({ error: 'Lecturer profile not found' }, { status: 404 })
    }

    // Sync dosen data from GraphQL if needed
    const authHeader = request.headers.get('authorization')
    const sessionToken = authHeader?.replace('Bearer ', '')
    if (sessionToken && token.username) {
      console.log('Syncing dosen data from GraphQL...')
      const syncResult = await syncDosenFromGraphQL(token.username, sessionToken)
      if (syncResult) {
        lecturer = syncResult.lecturer
      }
    }

    // Sync mahasiswa PA from GraphQL
    if (sessionToken) {
      console.log('Syncing mahasiswa PA from GraphQL...')
      await getMahasiswaPaWithSync(lecturer.id, sessionToken)
    }

    // Get statistics in parallel
    const [
      totalMahasiswaBimbingan,
      bimbinganAktifKKP,
      bimbinganAktifThesis,
      thesisTitlesRecommended,
      examsPending,
      examsCompleted,
      coursesThisSemester,
      recentActivities,
      upcomingSchedules,
    ] = await Promise.all([
      // Total mahasiswa bimbingan (PA)
      prisma.student.count({
        where: {
          academicAdvisorId: lecturer.id
        }
      }),

      // KKP bimbingan aktif
      prisma.kkpApplication.count({
        where: {
          supervisorId: lecturer.id,
          status: {
            in: ['approved', 'in_progress']
          }
        }
      }),

      // Thesis bimbingan aktif
      prisma.thesisTitle.count({
        where: {
          supervisorId: lecturer.id,
          status: 'approved'
        }
      }),

      // Thesis titles yang direkomendasikan
      prisma.thesisTitle.count({
        where: {
          lecturerId: lecturer.id
        }
      }),

      // Exams pending (as examiner/supervisor)
      prisma.examApplication.count({
        where: {
          OR: [
            { mainExaminerId: lecturer.id },
            { coExaminer1Id: lecturer.id },
            { coExaminer2Id: lecturer.id },
          ],
          status: {
            in: ['approved', 'scheduled']
          },
          examDate: {
            gte: new Date()
          }
        }
      }),

      // Exams completed this month
      prisma.examApplication.count({
        where: {
          OR: [
            { mainExaminerId: lecturer.id },
            { coExaminer1Id: lecturer.id },
            { coExaminer2Id: lecturer.id },
          ],
          status: 'completed',
          examDate: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lte: new Date()
          }
        }
      }),

      // Courses this semester (as lecturer)
      prisma.course.count({
        where: {
          lecturerId: lecturer.id,
          semester: getCurrentSemester()
        }
      }),

      // Recent activities (last 10)
      getRecentActivities(lecturer.id),

      // Upcoming schedules
      getUpcomingSchedules(lecturer.id),
    ])

    // Calculate rating (simplified - you might want to implement actual rating system)
    const ratingDosen = 4.5 // Placeholder - implement actual rating calculation

    return NextResponse.json({
      lecturer: {
        id: lecturer.id,
        nip: lecturer.nip,
        name: lecturer.users.name,
        department: lecturer.department,
        position: lecturer.position,
        specialization: lecturer.specialization,
        avatar: lecturer.users.avatar,
      },
      stats: {
        totalMahasiswa: totalMahasiswaBimbingan,
        bimbinganAktif: bimbinganAktifKKP + bimbinganAktifThesis,
        bimbinganKKP: bimbinganAktifKKP,
        bimbinganThesis: bimbinganAktifThesis,
        rekomendasiJudul: thesisTitlesRecommended,
        examsPending,
        examsCompleted,
        ratingDosen,
        totalMataKuliah: coursesThisSemester,
      },
      recentActivities,
      upcomingSchedule: upcomingSchedules,
      quickStats: [
        { title: 'Pending Review', count: examsPending, color: 'text-orange-600', bgColor: 'bg-orange-100' },
        { title: 'Jadwal Hari Ini', count: upcomingSchedules.filter((s: any) => isToday(new Date(s.date))).length, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { title: 'Bimbingan Aktif', count: bimbinganAktifKKP + bimbinganAktifThesis, color: 'text-green-600', bgColor: 'bg-green-100' },
        { title: 'Selesai Bulan Ini', count: examsCompleted, color: 'text-green-600', bgColor: 'bg-green-100' },
      ]
    })
  } catch (error) {
    console.error('Error fetching dosen dashboard:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// Helper function to get current semester
function getCurrentSemester() {
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()

  // Ganjil: August - January, Genap: February - July
  if (month >= 8 || month <= 1) {
    return `Ganjil ${year}/${year + 1}`
  } else {
    return `Genap ${year - 1}/${year}`
  }
}

// Helper to check if date is today
function isToday(date: Date) {
  const today = new Date()
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
}

// Get recent activities
async function getRecentActivities(lecturerId: string) {
  const activities = []

  // KKP submissions
  const kkpSubmissions = await prisma.kkpApplication.findMany({
    where: {
      supervisorId: lecturerId,
      status: 'pending',
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: {
      students: {
        include: {
          users: {
            select: { name: true }
          }
        }
      }
    }
  })

  activities.push(...kkpSubmissions.map(kkp => ({
    id: kkp.id,
    type: 'submission',
    title: 'Pengajuan KKP',
    student: kkp.students.users.name,
    time: formatRelativeTime(kkp.createdAt),
    status: 'pending',
    date: kkp.createdAt
  })))

  // Upcoming exams
  const upcomingExams = await prisma.examApplication.findMany({
    where: {
      OR: [
        { mainExaminerId: lecturerId },
        { coExaminer1Id: lecturerId },
        { coExaminer2Id: lecturerId },
      ],
      status: {
        in: ['approved', 'scheduled']
      },
      examDate: {
        gte: new Date(),
        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      }
    },
    take: 3,
    orderBy: { examDate: 'asc' },
    include: {
      students: {
        include: {
          users: {
            select: { name: true }
          }
        }
      }
    }
  })

  activities.push(...upcomingExams.map(exam => ({
    id: exam.id,
    type: 'exam',
    title: `Ujian ${exam.examType}`,
    student: exam.students.users.name,
    time: formatRelativeTime(exam.examDate),
    status: 'scheduled',
    date: exam.examDate
  })))

  // Sort by date and return latest 10
  return activities
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)
}

// Get upcoming schedules
async function getUpcomingSchedules(lecturerId: string) {
  const schedules = []

  // Academic consultations
  const consultations = await prisma.academicConsultation.findMany({
    where: {
      lecturerId,
      scheduledDate: {
        gte: new Date()
      },
      status: 'scheduled'
    },
    take: 5,
    orderBy: { scheduledDate: 'asc' },
    include: {
      students: {
        include: {
          users: {
            select: { name: true }
          }
        }
      }
    }
  })

  schedules.push(...consultations.map(consult => ({
    id: consult.id,
    title: 'Bimbingan Akademik',
    student: consult.students.users.name,
    time: new Date(consult.scheduledDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    date: formatDate(consult.scheduledDate),
    type: 'bimbingan'
  })))

  // Exams
  const exams = await prisma.examApplication.findMany({
    where: {
      OR: [
        { mainExaminerId: lecturerId },
        { coExaminer1Id: lecturerId },
        { coExaminer2Id: lecturerId },
      ],
      examDate: {
        gte: new Date(),
        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      status: {
        in: ['approved', 'scheduled']
      }
    },
    take: 5,
    orderBy: { examDate: 'asc' },
    include: {
      students: {
        include: {
          users: {
            select: { name: true }
          }
        }
      }
    }
  })

  schedules.push(...exams.map(exam => ({
    id: exam.id,
    title: `Ujian ${exam.examType}`,
    student: exam.students.users.name,
    time: new Date(exam.examDate).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    date: formatDate(exam.examDate),
    type: 'ujian'
  })))

  return schedules
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10)
}

// Format relative time
function formatRelativeTime(date: Date) {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} menit yang lalu`
  if (hours < 24) return `${hours} jam yang lalu`
  if (days === 1) return '1 hari yang lalu'
  return `${days} hari yang lalu`
}

// Format date
function formatDate(date: Date) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const dateObj = new Date(date)

  if (isToday(dateObj)) return 'Hari ini'
  if (dateObj.toDateString() === tomorrow.toDateString()) return 'Besok'

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  return days[dateObj.getDay()]
}
