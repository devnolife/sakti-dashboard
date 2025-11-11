'use server'

import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'
import { students } from '@/components/dekan/vice-dean-4/mock-data'

export interface GradeData {
  id: string
  score: number
  letterGrade: string
  semester: string
  academic_year: string
  course: {
    id: string
    name: string
    code: string
    credits: number
    department: string | null
    lecturer: {
      name: string
    } | null
  }
  created_at: Date | string
}

export async function getStudentGradesData(): Promise<GradeData[]> {
  const user_id = await getServerActionUserId()

  console.log('🔍 Fetching student grades data for user:', userId)

  try {
    // Get user with student profile and grades
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
                    }
                  }
                }
              },
              orderBy: [
                { academic_year: 'desc' },
                { semester: 'desc' },
                { created_at: 'desc' }
              ]
            }
          }
        }
      }
    })

    if (!user?.students) {
      throw new Error('Student profile not found')
    }

    const student = user.students

    // Transform grades data
    const grades: GradeData[] = students?.grades.map((grade) => ({
      id: grade.id,
      score: grade.score,
      letterGrade: grade.letterGrade,
      semester: grade.semester,
      academic_year: grade.academicYear,
      course: {
        id: grade.course.id,
        name: grade.course.name,
        code: grade.course.code,
        credits: grade.course.credits,
        department: grade.course.department,
        lecturer: grade.course.lecturer?.user ? {
          name: grade.course.lecturer.user.name
        } : null
      },
      created_at: grade.createdAt
    }))

    console.log(`✅ Found ${grades.length} grades for student`)
    return grades

  } catch (error) {
    console.error('Error fetching student grades data:', error)
    throw error
  }
}
