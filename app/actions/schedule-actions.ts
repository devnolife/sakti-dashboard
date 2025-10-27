'use server'

// TODO: Replace with GraphQL queries
import { getServerActionUserId } from '@/lib/auth-utils'

export interface ScheduleData {
  id: string
  day: string
  startTime: string
  endTime: string
  room: string | null
  course: {
    name: string
    code: string
    credits: number
  }
  lecturer: {
    name: string
  } | null
}

export async function getStudentSchedules(): Promise<ScheduleData[]> {
  const user_id = await getServerActionUserId()
  console.log('⚠️ STUB: getStudentSchedules for user:', user_id)
  
  // TODO: Implement with GraphQL GET_JADWAL_KULIAH
  return []
}
