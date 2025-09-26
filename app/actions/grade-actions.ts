'use server'

import { prisma } from '@/lib/prisma'
import { getHardcodedStudentId } from '@/lib/auth-utils'

export interface GradeData {
  id: string
  score: number
  letterGrade: string
  semester: string
  academicYear: string
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
  createdAt: Date | string
}

export async function getStudentGradesData(): Promise<GradeData[]> {
  const userId = getHardcodedStudentId()
  
  console.log('🔍 Fetching student grades data for user:', userId)

  try {
    // Get user with student profile and grades
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
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
                { academicYear: 'desc' },
                { semester: 'desc' },
                { createdAt: 'desc' }
              ]
            }
          }
        }
      }
    })

    if (!user?.studentProfile) {
      throw new Error('Student profile not found')
    }

    const student = user.studentProfile
    
    // Transform grades data
    const grades: GradeData[] = student.grades.map((grade) => ({
      id: grade.id,
      score: grade.score,
      letterGrade: grade.letterGrade,
      semester: grade.semester,
      academicYear: grade.academicYear,
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
      createdAt: grade.createdAt
    }))

    console.log(`✅ Found ${grades.length} grades for student`)
    return grades

  } catch (error) {
    console.error('Error fetching student grades data:', error)
    throw error
  }
}
