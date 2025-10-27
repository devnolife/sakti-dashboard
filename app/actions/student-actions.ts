'use server'

// TODO: Replace with GraphQL queries
// import { prisma } from '@/lib/prisma'
import { getServerActionUserId } from '@/lib/auth-utils'

export async function getStudentDashboardData() {
  // Get current student user ID
  const user_id = await getServerActionUserId()

  console.log('🔍 Fetching student dashboard data for user:', user_id)

  // TODO: Replace with GraphQL queries
  console.log('⚠️ Using mock data - GraphQL integration pending')

  return {
    success: true,
    data: {
      student: null,
      academicInfo: {
        currentSemester: 0,
        totalCredits: 0,
        gpa: 0,
        currentCredits: 0
      },
      upcomingExams: [],
      pendingPayments: [],
      libraryBorrowings: [],
      weeklySchedule: [],
      activeKKP: null,
      recentLetterRequests: []
    }
  }
}

function getGradePoint(letterGrade: string): number {
  const gradePoints: { [key: string]: number } = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'E': 0.0
  }
  return gradePoints[letterGrade] || 0.0
}

export async function getStudentNotifications() {
  // Get current student user ID
  const userId = await getServerActionUserId()

  // TODO: Replace with GraphQL queries
  console.log('⚠️ Using mock data - GraphQL integration pending')
  return []
}
