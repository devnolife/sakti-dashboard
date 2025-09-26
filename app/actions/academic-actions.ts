'use server'

import { prisma } from '@/lib/prisma'
import { getHardcodedStudentId } from '@/lib/auth-utils'

export interface AcademicData {
  student: {
    id: string
    name: string
    nim: string
    major: string
    department: string
    semester: number
    academicYear: string
    gpa: number | null
    status: string
  }
  academicAdvisor: {
    id: string
    name: string
    nip: string
    position: string
    department: string
    phone: string | null
    office: string | null
  } | null
  consultations: {
    id: string
    date: Date | string
    uraian: string
    keterangan: string
    paraf: boolean
    no: number
  }[]
  academicProgress: {
    totalCredits: number
    completedCredits: number
    requiredCredits: number
    progressPercentage: number
    requiredCoursesProgress: number
    electiveCoursesProgress: number
  }
  currentSemesterStats: {
    courses: number
    credits: number
    gpa: number | null
  }
}

export interface ControlCardData {
  student: {
    name: string
    nim: string
    tahun_akademik: string
  }
  academicAdvisor: {
    name: string
  }
  consultations: {
    no: number
    date: string
    uraian: string
    keterangan: string
    paraf: "Sudah" | "Belum"
  }[]
  signatureInfo: {
    tanggal: string
    namaProdi: string
    namaKetuaProdi: string
    nbm: string
  }
}

export async function getStudentAcademicData(): Promise<AcademicData> {
  const userId = getHardcodedStudentId()
  
  console.log('🔍 Fetching student academic data for user:', userId)

  try {
    // Get user with student profile, grades, and consultations
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: {
          include: {
            academicAdvisor: {
              include: {
                user: true
              }
            },
            academicConsultations: {
              include: {
                advisor: {
                  include: {
                    user: true
                  }
                }
              },
              orderBy: { date: 'asc' }
            },
            grades: {
              include: {
                course: true
              },
              orderBy: { createdAt: 'desc' }
            }
          }
        }
      }
    })

    if (!user?.studentProfile) {
      throw new Error('Student profile not found')
    }

    const student = user.studentProfile
    
    // Calculate academic progress
    const totalCredits = student.grades.reduce((sum, grade) => sum + grade.course.credits, 0)
    const requiredCredits = 144 // Standard S1 requirement
    const progressPercentage = Math.round((totalCredits / requiredCredits) * 100)
    
    // Mock required vs elective courses progress (can be enhanced later)
    const requiredCoursesProgress = Math.min(90, progressPercentage + Math.floor(Math.random() * 10))
    const electiveCoursesProgress = Math.max(60, progressPercentage - Math.floor(Math.random() * 20))

    // Current semester stats
    const currentYear = new Date().getFullYear().toString()
    const currentSemester = new Date().getMonth() < 6 ? 'genap' : 'ganjil'
    
    const currentSemesterGrades = student.grades.filter(
      grade => grade.academicYear === currentYear && grade.semester.toLowerCase() === currentSemester.toLowerCase()
    )
    
    const currentSemesterCredits = currentSemesterGrades.reduce((sum, grade) => sum + grade.course.credits, 0)
    const currentSemesterGPA = currentSemesterGrades.length > 0 
      ? currentSemesterGrades.reduce((sum, grade) => {
          const points = getGradePoints(grade.letterGrade)
          return sum + (points * grade.course.credits)
        }, 0) / currentSemesterCredits
      : null

    // Transform consultations data
    const consultations = student.academicConsultations.map((consultation, index) => ({
      id: consultation.id,
      date: consultation.date,
      uraian: consultation.uraian,
      keterangan: consultation.keterangan,
      paraf: consultation.paraf,
      no: index + 1
    }))

    const academicData: AcademicData = {
      student: {
        id: student.id,
        name: user.name,
        nim: student.nim,
        major: student.major,
        department: student.department,
        semester: student.semester,
        academicYear: student.academicYear,
        gpa: student.gpa,
        status: student.status
      },
      academicAdvisor: student.academicAdvisor ? {
        id: student.academicAdvisor.id,
        name: student.academicAdvisor.user.name,
        nip: student.academicAdvisor.nip,
        position: student.academicAdvisor.position,
        department: student.academicAdvisor.department,
        phone: student.academicAdvisor.phone,
        office: student.academicAdvisor.office
      } : null,
      consultations,
      academicProgress: {
        totalCredits,
        completedCredits: totalCredits,
        requiredCredits,
        progressPercentage,
        requiredCoursesProgress,
        electiveCoursesProgress
      },
      currentSemesterStats: {
        courses: currentSemesterGrades.length,
        credits: currentSemesterCredits,
        gpa: currentSemesterGPA
      }
    }

    console.log(`✅ Academic data loaded for student: ${user.name}`)
    console.log(`- Academic Advisor: ${academicData.academicAdvisor?.name || 'Not assigned'}`)
    console.log(`- Total Consultations: ${consultations.length}`)
    console.log(`- Academic Progress: ${progressPercentage}%`)

    return academicData

  } catch (error) {
    console.error('Error fetching student academic data:', error)
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
    'D': 1.0,
    'E': 0.0
  }
  return gradePoints[letterGrade] || 0.0
}

export async function getControlCardData(): Promise<ControlCardData> {
  try {
    const userId = getHardcodedStudentId()
    
    // Get student data with academic advisor and consultations
    const student = await prisma.student.findUnique({
      where: {
        userId: userId
      },
      include: {
        user: true,
        academicAdvisor: {
          include: {
            user: true
          }
        },
        academicConsultations: {
          orderBy: {
            date: 'asc'
          }
        }
      }
    })

    if (!student) {
      throw new Error('Student not found')
    }

    // Format consultations for control card
    const consultations = student.academicConsultations.map((consultation, index) => ({
      no: index + 1,
      date: consultation.date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long', 
        year: 'numeric'
      }),
      uraian: consultation.uraian,
      keterangan: consultation.keterangan,
      paraf: consultation.paraf ? "Sudah" as const : "Belum" as const
    }))

    // Static signature info (can be made dynamic later)
    const signatureInfo = {
      tanggal: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
      namaProdi: "Informatika",
      namaKetuaProdi: "Dr. Ahmad Dahlan, M.Kom",
      nbm: "1234567"
    }

    const controlCardData: ControlCardData = {
      student: {
        name: student.user.name,
        nim: student.nim,
        tahun_akademik: student.academicYear || "2023/2024"
      },
      academicAdvisor: {
        name: student.academicAdvisor?.user.name || "Belum ditentukan"
      },
      consultations,
      signatureInfo
    }

    return controlCardData
  } catch (error) {
    console.error('Error fetching control card data:', error)
    throw new Error('Failed to fetch control card data')
  }
}
