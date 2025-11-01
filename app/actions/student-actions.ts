'use server'

import { cookies } from 'next/headers'
import { executeGraphQLQuery, createAuthenticatedClient } from '@/lib/graphql/client'
import { GET_PROFILE } from '@/lib/graphql/mutations-superapps'
import { GET_KRS_MAHASISWA, GET_KHS_MAHASISWA } from '@/lib/graphql/queries-superapps'

// GraphQL Profile Response
interface ProfileResponse {
  profile: {
    id: string
    username: string | null
    name: string | null
    email: string | null
    phone: string | null
    role: string | null
    department: {
      kode: string
      nama: string
    } | null
  }
}

export async function getStudentDashboardData() {
  console.log('🔍 Fetching student dashboard data from GraphQL...')

  try {
    // Get token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token')?.value ||
      cookieStore.get('session-token')?.value

    if (!token) {
      console.error('❌ No authentication token found')
      return {
        success: false,
        error: 'Not authenticated',
        data: null
      }
    }

    // Fetch profile from GraphQL
    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<ProfileResponse>(
      GET_PROFILE,
      {},
      client
    )

    if (error || !data?.profile) {
      console.error('❌ Failed to fetch profile:', error)
      return {
        success: false,
        error: error || 'Failed to fetch profile',
        data: null
      }
    }

    const profile = data.profile
    console.log('✅ Profile fetched:', profile.username)

    // Map profile data to student format
    const student = {
      id: profile.id,
      nim: profile.username || 'N/A',
      name: profile.name || profile.username || 'Student',
      email: profile.email || null,
      phone: profile.phone || null,
      role: profile.role || 'mahasiswa'
    }

    // TODO: Fetch academic data from GraphQL (KHS, KRS, etc)
    return {
      success: true,
      data: {
        student,
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
  } catch (error) {
    console.error('❌ Error fetching dashboard data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null
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
  console.log('🔔 Fetching student notifications...')

  // TODO: Implement with GraphQL notifications query when available
  console.log('⚠️ Using empty notifications - GraphQL integration pending')
  return []
}

// Fetch KRS (Kartu Rencana Studi) data
export async function getStudentKRS(nim: string | null = null, periode_krs: string | null = null) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token')?.value || cookieStore.get('session-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated', data: null }
    }

    // Decode token to get user info if nim not provided
    if (!nim) {
      // TODO: Extract nim from token or profile
      const profileData = await executeGraphQLQuery<any>(GET_PROFILE, {}, createAuthenticatedClient(token))
      nim = profileData.data?.profile?.username || ''
    }

    // Default to current period if not provided
    if (!periode_krs) {
      periode_krs = '20251' // Default to 2025 Ganjil
    }

    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<any>(
      GET_KRS_MAHASISWA,
      { nim, periode_krs },
      client
    )

    if (error || !data?.getKrsMahasiswa) {
      return { success: false, error: error || 'Failed to fetch KRS', data: null }
    }

    return { success: true, data: data.getKrsMahasiswa }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: null }
  }
}

// Fetch KHS (Kartu Hasil Studi) data
export async function getStudentKHS(nim: string | null = null, periode_krs: string | null = null) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token')?.value || cookieStore.get('session-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated', data: null }
    }

    // Decode token to get user info if nim not provided
    if (!nim) {
      // TODO: Extract nim from token or profile
      const profileData = await executeGraphQLQuery<any>(GET_PROFILE, {}, createAuthenticatedClient(token))
      nim = profileData.data?.profile?.username || ''
    }

    // Default to current period if not provided
    if (!periode_krs) {
      periode_krs = '20251' // Default to 2025 Ganjil
    }

    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<any>(
      GET_KHS_MAHASISWA,
      { nim, periode_krs },
      client
    )

    if (error || !data?.getKhsMahasiswa) {
      return { success: false, error: error || 'Failed to fetch KHS', data: null }
    }

    return { success: true, data: data.getKhsMahasiswa }
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error', data: null }
  }
}
