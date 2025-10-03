import { getStudentDashboardData } from '../../app/actions/student-actions'

async function testAction() {
  console.log('🧪 Testing getStudentDashboardData...')
  try {
    const data = await getStudentDashboardData()
    console.log('✅ Success! Data received:')
    console.log('Student name:', data.student.name)
    console.log('Student NIM:', data.student.nim) 
    console.log('Student major:', data.student.major)
    console.log('Current courses:', data.currentSemester.courses)
    console.log('GPA:', data.student.gpa)
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

testAction()
