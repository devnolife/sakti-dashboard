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
    let lecturer = await prisma.lecturers.findFirst({
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
      await syncDosenFromGraphQL(token.username, sessionToken)
      // Don't replace lecturer object - it already has the data we need with proper includes
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
      prisma.students.count({
        where: {
          academic_advisor_id: lecturer.id
        }
      }),

      // KKP bimbingan aktif
      prisma.kkp_applications.count({
        where: {
          supervisor_id: lecturer.id,
          status: {
            in: ['approved', 'in_progress']
          }
        }
      }),

      // Thesis bimbingan aktif
      prisma.thesis_titles.count({
        where: {
          supervisor_id: lecturer.id,
          status: 'approved'
        }
      }),

      // Thesis titles yang direkomendasikan
      prisma.thesis_titles.count({
        where: {
          supervisor_id: lecturer.id
        }
      }),

      // Exams pending (as advisor or committee member)
      prisma.exam_applications.count({
        where: {
          OR: [
            { advisor_1_id: lecturer.id },
            { advisor_2_id: lecturer.id },
            {
              exam_committees: {
                some: {
                  lecturer_id: lecturer.id
                }
              }
            }
          ],
          status: {
            in: ['pending', 'scheduled']
          },
          scheduled_date: {
            gte: new Date()
          }
        }
      }),

      // Exams completed this month
      prisma.exam_applications.count({
        where: {
          OR: [
            { advisor_1_id: lecturer.id },
            { advisor_2_id: lecturer.id },
            {
              exam_committees: {
                some: {
                  lecturer_id: lecturer.id
                }
              }
            }
          ],
          status: 'completed',
          completion_date: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            lte: new Date()
          }
        }
      }),

      // Courses this semester (as lecturer)
      prisma.courses.count({
        where: {
          lecturer_id: lecturer.id,
          semester: getCurrentSemesterNumber()
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

// Helper function to get current semester number (1-8)
function getCurrentSemesterNumber() {
  // For now, return a placeholder value
  // You might want to implement proper semester calculation based on your academic calendar
  return 7 // Default semester 7
}

// Helper function to get current semester string
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
  const kkpSubmissions = await prisma.kkp_applications.findMany({
    where: {
      supervisor_id: lecturerId,
      status: 'pending',
    },
    take: 3,
    orderBy: { created_at: 'desc' },
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
    time: formatRelativeTime(kkp.created_at),
    status: 'pending',
    date: kkp.created_at
  })))

  // Upcoming exams
  const upcomingExams = await prisma.exam_applications.findMany({
    where: {
      OR: [
        { advisor_1_id: lecturerId },
        { advisor_2_id: lecturerId },
        {
          exam_committees: {
            some: {
              lecturer_id: lecturerId
            }
          }
        }
      ],
      status: {
        in: ['pending', 'scheduled']
      },
      scheduled_date: {
        gte: new Date(),
        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      }
    },
    take: 3,
    orderBy: { scheduled_date: 'asc' },
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
    title: `Ujian ${exam.type}`,
    student: exam.students.users.name,
    time: formatRelativeTime(exam.scheduled_date || exam.submission_date),
    status: 'scheduled',
    date: exam.scheduled_date || exam.submission_date
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
  const consultations = await prisma.academic_consultations.findMany({
    where: {
      advisor_id: lecturerId,
      date: {
        gte: new Date()
      }
    },
    take: 5,
    orderBy: { date: 'asc' },
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
    time: new Date(consult.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    date: formatDate(consult.date),
    type: 'bimbingan'
  })))

  // Exams
  const exams = await prisma.exam_applications.findMany({
    where: {
      OR: [
        { advisor_1_id: lecturerId },
        { advisor_2_id: lecturerId },
        {
          exam_committees: {
            some: {
              lecturer_id: lecturerId
            }
          }
        }
      ],
      scheduled_date: {
        gte: new Date(),
        lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      status: {
        in: ['pending', 'scheduled']
      }
    },
    take: 5,
    orderBy: { scheduled_date: 'asc' },
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
    title: `Ujian ${exam.type}`,
    student: exam.students.users.name,
    time: exam.scheduled_date ? new Date(exam.scheduled_date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-',
    date: formatDate(exam.scheduled_date || exam.submission_date),
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
