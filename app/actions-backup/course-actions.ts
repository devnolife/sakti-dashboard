'use server'

import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'

export interface CourseData {
  id: string
  title: string
  code: string
  instructor: string
  credits: number
  currentGrade?: string
  attendance: string
  progress: number
  status: 'ongoing' | 'completed' | 'upcoming'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  semester: string
  academic_year: string
  schedule: {
    day: string
    time: string
    location: string
  }[]
  description: string
  modules: number
  completedModules: number
  nextClass?: Date
  color: string
  tags: string[]
  likes: number
  views: number
  isBookmarked: boolean
}

export async function getStudentCoursesData(): Promise<CourseData[]> {
  const user_id = await getServerActionUserId()

  console.log('🔍 Fetching student courses data for user:', userId)

  try {
    // Get user with student profile and courses
    const user = await prisma.users.findUnique({
      where: { id: user_id },
      include: {
        students: {
          include: {
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
              orderBy: { created_at: 'desc' }
            }
          }
        }
      }
    })

    if (!user?.students) {
      throw new Error('Student profile not found')
    }

    const student = user.students

    // Current academic year and semester
    const currentAcademicYear = new Date().getFullYear().toString()
    const currentSemester = new Date().getMonth() < 6 ? 'genap' : 'ganjil'

    // Transform grades data to course format
    const courses: CourseData[] = student.grades.map((grade, index) => {
      const course = grade.course
      const schedules = course.schedules.map(schedule => ({
        day: schedule.day,
        time: `${schedule.startTime} - ${schedule.endTime}`,
        location: `${schedule.room}${schedule.building ? `, ${schedule.building}` : ''}`
      }))

      // Determine course status based on semester and grade
      let status: 'ongoing' | 'completed' | 'upcoming' = 'completed'
      if (grade.academicYear === currentAcademicYear && grade.semester.toLowerCase() === currentSemester.toLowerCase()) {
        status = 'ongoing'
      }

      // Determine level based on course code (simple logic)
      let level: 'beginner' | 'intermediate' | 'advanced' | 'expert' = 'intermediate'
      const courseNumber = parseInt(course.code.replace(/\D/g, '')) || 200
      if (courseNumber < 200) level = 'beginner'
      else if (courseNumber < 300) level = 'intermediate'
      else if (courseNumber < 400) level = 'advanced'
      else level = 'expert'

      // Calculate progress (mock for now, could be based on actual completion data)
      const progress = status === 'completed' ? 100 :
        status === 'ongoing' ? Math.floor(Math.random() * 40) + 50 : 0

      // Generate color schemes
      const colors = [
        'from-blue-500 to-purple-600',
        'from-green-500 to-teal-600',
        'from-orange-500 to-red-600',
        'from-pink-500 to-rose-600',
        'from-yellow-500 to-orange-600',
        'from-indigo-500 to-blue-600'
      ]

      // Generate tags based on course name and department
      const tags = []
      if (course.name.toLowerCase().includes('web')) tags.push('Web Dev')
      if (course.name.toLowerCase().includes('programming') || course.name.toLowerCase().includes('pemrograman')) tags.push('Programming')
      if (course.name.toLowerCase().includes('machine learning') || course.name.toLowerCase().includes('ai')) tags.push('AI')
      if (course.name.toLowerCase().includes('data')) tags.push('Data Science')
      if (course.name.toLowerCase().includes('mobile')) tags.push('Mobile')
      if (course.name.toLowerCase().includes('system') || course.name.toLowerCase().includes('sistem')) tags.push('Systems')
      if (course.department) tags.push(course.department.split(' ')[0])

      return {
        id: course.id,
        title: course.name,
        code: course.code,
        instructor: course.lecturer?.user.name || 'TBA',
        credits: course.credits,
        currentGrade: grade.letterGrade,
        attendance: status === 'completed' ? '100%' :
          status === 'ongoing' ? `${Math.floor(Math.random() * 20) + 80}%` : '0%',
        progress,
        status,
        level,
        semester: grade.semester,
        academic_year: grade.academicYear,
        schedule: schedules,
        description: course.description || `Mata kuliah ${course.name} untuk ${course.department}`,
        modules: Math.floor(Math.random() * 8) + 8, // 8-15 modules
        completedModules: Math.floor(progress / 100 * (Math.floor(Math.random() * 8) + 8)),
        nextClass: status === 'ongoing' && schedules.length > 0 ?
          new Date(Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000) : undefined,
        color: colors[index % colors.length],
        tags: tags.length > 0 ? tags : ['Academic'],
        likes: Math.floor(Math.random() * 200) + 50,
        views: Math.floor(Math.random() * 1000) + 100,
        isBookmarked: Math.random() > 0.5
      }
    })

    console.log(`✅ Found ${courses.length} courses for student`)
    return courses

  } catch (error) {
    console.error('Error fetching student courses data:', error)
    throw error
  }
}
