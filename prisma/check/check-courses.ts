import { PrismaClient } from '../../lib/generated/prisma'

const prisma = new PrismaClient()

async function checkCourses() {
  const student = await prisma.student.findFirst({
    where: { nim: '2021010001' },
    include: {
      grades: {
        include: {
          course: {
            include: {
              lecturer: {
                include: { user: true }
              },
              schedules: true
            }
          }
        }
      }
    }
  })
  
  if (!student) {
    console.log('Student not found')
    return
  }
  
  console.log('📚 Courses with grades:')
  student.grades.forEach(grade => {
    console.log({
      code: grade.course.code,
      name: grade.course.name,
      credits: grade.course.credits,
      grade: grade.letterGrade,
      lecturer: grade.course.lecturer?.user.name,
      schedules: grade.course.schedules.length,
      semester: grade.semester,
      academicYear: grade.academicYear
    })
  })
  
  await prisma.$disconnect()
}

checkCourses()
