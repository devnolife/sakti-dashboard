'use server'

import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'

export interface ScheduleEvent {
  id: string
  title: string
  description?: string
  date: string // ISO string for start date
  start_date: string // ISO string
  end_date: string // ISO string
  location?: string
  type: 'exam' | 'class' | 'lab' | 'consultation' | 'seminar' | 'workshop' | 'deadline' | 'organization'
  examType?: 'proposal' | 'result' | 'final' | 'closing' | 'midterm' | 'other'
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  lecturer?: string
  course?: {
    id: string
    name: string
    code: string
  }
  committee?: Array<{
    name: string
    role: string
  }>
}

export interface ScheduleData {
  events: ScheduleEvent[]
  weeklySchedule: Array<{
    id: string
    day: string
    startTime: string
    endTime: string
    courseName: string
    courseCode: string
    location: string
    lecturer: string
  }>
}

export async function getStudentScheduleData(): Promise<ScheduleData> {
  const user_id = await getServerActionUserId()
  try {
    // Get user with student profile and academic events
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: {
        students: {
          include: {
            academic_events: {
              include: {
                courses: true,
                lecturers: {
                  include: {
                    users: true
                  }
                }
              },
              orderBy: { start_date: 'asc' }
            },
            grades: {
              include: {
                courses: {
                  include: {
                    course_schedules: true,
                    lecturers: {
                      include: {
                        users: true
                      }
                    }
                  }
                }
              },
              where: {
                // Only current academic year courses
                academic_year: new Date().getFullYear().toString()
              }
            }
          }
        }
      }
    })

    if (!user?.students) {
      throw new Error('Student profile not found')
    }

    const student = user.students

    // Transform academic events
    const events: ScheduleEvent[] = student.academic_events.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description || undefined,
      date: event.start_date.toISOString(),
      start_date: event.start_date.toISOString(),
      end_date: event.end_date.toISOString(),
      location: event.location || undefined,
      type: event.type as ScheduleEvent['type'],
      examType: event.exam_type as ScheduleEvent['examType'] || undefined,
      status: event.status as ScheduleEvent['status'],
      lecturer: event.lecturers?.users.name || undefined,
      course: event.courses ? {
        id: event.courses.id,
        name: event.courses.name,
        code: event.courses.code
      } : undefined,
      // Mock committee for exam events - can be made dynamic later
      committee: event.type === 'exam' ? [
        { name: 'Dr. Budi Santoso, M.Sc.', role: 'Ketua' },
        { name: 'Prof. Siti Rahayu, Ph.D.', role: 'Anggota' },
        { name: 'Dr. Ahmad Wijaya, M.T.', role: 'Anggota' }
      ] : undefined
    }))

    // Transform weekly schedule from course schedules
    const weeklySchedule: ScheduleData['weeklySchedule'] = []

    for (const grade of student.grades) {
      const course = grade.courses
      if (course.course_schedules && course.course_schedules.length > 0) {
        for (const schedule of course.course_schedules) {
          weeklySchedule.push({
            id: schedule.id,
            day: schedule.day,
            startTime: schedule.start_time,
            endTime: schedule.end_time,
            courseName: course.name,
            courseCode: course.code,
            location: `${schedule.room}${schedule.building ? `, ${schedule.building}` : ''}`,
            lecturer: course.lecturers?.users.name || 'TBA'
          })
        }
      }
    }

    const scheduleData: ScheduleData = {
      events,
      weeklySchedule
    }

    console.log(`✅ Schedule data loaded for student: ${user.name}`)
    console.log(`- Total Academic Events: ${events.length}`)
    console.log(`- Weekly Schedule Items: ${weeklySchedule.length}`)
    console.log(`- Events by type:`)

    const eventsByType = events.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    for (const [type, count] of Object.entries(eventsByType)) {
      console.log(`  - ${type}: ${count}`)
    }

    return scheduleData

  } catch (error) {
    console.error('Error fetching student schedule data:', error)
    throw error
  }
}
