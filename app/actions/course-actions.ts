'use server'

// TODO: Replace with GraphQL queries
// Available: GET_MATAKULIAH, GET_KRS_MAHASISWA, GET_JADWAL_KULIAH
import { getServerActionUserId } from '@/lib/auth-utils'

export interface CourseData {
  id: string
  name: string
  code: string
  credits: number
  semester: string
  academic_year: string
  schedules: {
    day: string
    startTime: string
    endTime: string
    room: string | null
  }[]
  lecturer: {
    name: string
    nip: string | null
  } | null
  grade: {
    score: number | null
    letterGrade: string | null
  } | null
}

export async function getStudentCoursesData(): Promise<CourseData[]> {
  const user_id = await getServerActionUserId()
  console.log('⚠️ STUB: getStudentCoursesData for user:', user_id)

  // TODO: Implement with GraphQL GET_KRS_MAHASISWA
  return []
}
