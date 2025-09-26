'use server'

import { prisma } from '@/lib/prisma'
import { getHardcodedStudentId } from '@/lib/auth-utils'

export interface ScheduleEvent {
  id: string
  title: string
  description?: string
  date: string // ISO string for start date
  startDate: string // ISO string
  endDate: string // ISO string
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
  const userId = getHardcodedStudentId()
  
  console.log('🔍 Fetching student schedule data for user:', userId)

  try {
    // Get user with student profile and academic events
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            academicEvents: {
              include: {
                course: true,
                lecturer: {
                  include: {
                    user: true
                  }
                }
              },
              orderBy: { startDate: 'asc' }
            },
            grades: {
              include: {
                course: {
                  include: {
                    schedules: true,
                    lecturer: {
                      include: {
                        user: true
                      }
                    }
                  }
                }
              },
              where: {
                // Only current academic year courses
                academicYear: new Date().getFullYear().toString()
              }
            }
          }
        }
      }
    })

    if (!user?.studentProfile) {
      throw new Error('Student profile not found')
    }

    const student = user.studentProfile

    // Transform academic events
    const events: ScheduleEvent[] = student.academicEvents.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description || undefined,
      date: event.startDate.toISOString(),
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString(),
      location: event.location || undefined,
      type: event.type as ScheduleEvent['type'],
      examType: event.examType as ScheduleEvent['examType'] || undefined,
      status: event.status as ScheduleEvent['status'],
      lecturer: event.lecturer?.user.name || undefined,
      course: event.course ? {
        id: event.course.id,
        name: event.course.name,
        code: event.course.code
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
      const course = grade.course
      if (course.schedules && course.schedules.length > 0) {
        for (const schedule of course.schedules) {
          weeklySchedule.push({
            id: schedule.id,
            day: schedule.day,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            courseName: course.name,
            courseCode: course.code,
            location: `${schedule.room}${schedule.building ? `, ${schedule.building}` : ''}`,
            lecturer: course.lecturer?.user.name || 'TBA'
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
