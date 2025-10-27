'use server'

// TODO: Replace with GraphQL query GET_TRANSKRIP_MAHASISWA
// import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'

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
  console.log('⚠️ STUB: getStudentGradesData for user:', user_id)

  // TODO: Implement with GraphQL GET_TRANSKRIP_MAHASISWA
  // Example:
  // const { data } = await executeGraphQLQuery(GET_TRANSKRIP_MAHASISWA, { nim: userNim })
  // return data.transkrip.map(grade => ({ ... }))
  
  return []
}
