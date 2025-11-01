'use server'

import { cookies } from 'next/headers'
import { executeGraphQLQuery, createAuthenticatedClient } from '@/lib/graphql/client'
import { 
  GET_KRS_MAHASISWA, 
  GET_KHS_MAHASISWA, 
  GET_TRANSKRIP_MAHASISWA 
} from '@/lib/graphql/queries-superapps'
import { getServerActionUserId } from '@/lib/auth-utils'

export interface AcademicData {
  student: {
    id: string
    name: string
    nim: string
    major: string
    department: string
    semester: number
    academic_year: string
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
  const user_id = await getServerActionUserId()
  console.log('⚠️ STUB: getStudentAcademicData for user:', user_id)

  // TODO: Implement with GraphQL GET_MAHASISWA_BY_NIM, GET_TRANSKRIP_MAHASISWA
  return {
    student: {
      id: user_id || '',
      name: 'Student Name',
      nim: '105841100000',
      major: 'Teknik Informatika',
      department: 'Fakultas Teknik',
      semester: 5,
      academic_year: '2024/2025',
      gpa: 3.5,
      status: 'Aktif'
    },
    academicAdvisor: {
      id: '1',
      name: 'Dr. Advisor Name',
      nip: '1234567890',
      position: 'Dosen Pembimbing Akademik',
      department: 'Teknik Informatika',
      phone: null,
      office: null
    },
    consultations: [],
    academicProgress: {
      totalCredits: 120,
      completedCredits: 80,
      requiredCredits: 144,
      progressPercentage: 55,
      requiredCoursesProgress: 60,
      electiveCoursesProgress: 40
    },
    currentSemesterStats: {
      courses: 6,
      credits: 18,
      gpa: 3.5
    }
  }
}

export async function getControlCardData(): Promise<ControlCardData> {
  const user_id = await getServerActionUserId()
  console.log('⚠️ STUB: getControlCardData for user:', user_id)

  // TODO: Implement with GraphQL queries
  return {
    student: {
      name: 'Student Name',
      nim: '105841100000',
      tahun_akademik: '2024/2025'
    },
    academicAdvisor: {
      name: 'Dr. Advisor Name'
    },
    consultations: [],
    signatureInfo: {
      tanggal: new Date().toLocaleDateString('id-ID'),
      namaProdi: 'Teknik Informatika',
      namaKetuaProdi: 'Dr. Ketua Prodi',
      nbm: '1234567890'
    }
  }
}

/**
 * Get student courses (KRS) from GraphQL
 * Menggantikan /api/student/courses
 */
export async function getStudentCoursesGraphQL(nim: string | null = null, periode_krs: string | null = null) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token')?.value || cookieStore.get('session-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated', data: null }
    }

    // Get profile to extract nim if not provided
    if (!nim) {
      const { GET_PROFILE } = await import('@/lib/graphql/mutations-superapps')
      const profileData = await executeGraphQLQuery<any>(GET_PROFILE, {}, createAuthenticatedClient(token))
      nim = profileData.data?.profile?.username || ''
    }

    // Default to current period if not provided
    if (!periode_krs) {
      periode_krs = '20251' // Default to 2025 Ganjil
    }

    console.log('📚 Fetching courses from GraphQL for:', nim, periode_krs)

    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<any>(
      GET_KRS_MAHASISWA,
      { nim, periode_krs },
      client
    )

    if (error || !data?.getKrsMahasiswa) {
      console.error('❌ Failed to fetch KRS:', error)
      return { success: false, error: error || 'Failed to fetch courses', data: null }
    }

    console.log('✅ Courses fetched:', data.getKrsMahasiswa.header?.total_matakuliah || 0)
    return { success: true, data: data.getKrsMahasiswa }
  } catch (error) {
    console.error('❌ Error fetching courses:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      data: null 
    }
  }
}

/**
 * Get student grades (KHS) from GraphQL
 * Menggantikan /api/student/grades
 */
export async function getStudentGradesGraphQL(nim: string | null = null, periode_krs: string | null = null) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token')?.value || cookieStore.get('session-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated', data: null }
    }

    // Get profile to extract nim if not provided
    if (!nim) {
      const { GET_PROFILE } = await import('@/lib/graphql/mutations-superapps')
      const profileData = await executeGraphQLQuery<any>(GET_PROFILE, {}, createAuthenticatedClient(token))
      nim = profileData.data?.profile?.username || ''
    }

    // Default to current period if not provided
    if (!periode_krs) {
      periode_krs = '20251' // Default to 2025 Ganjil
    }

    console.log('📊 Fetching grades from GraphQL for:', nim, periode_krs)

    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<any>(
      GET_KHS_MAHASISWA,
      { nim, periode_krs },
      client
    )

    if (error || !data?.getKhsMahasiswa) {
      console.error('❌ Failed to fetch KHS:', error)
      return { success: false, error: error || 'Failed to fetch grades', data: null }
    }

    console.log('✅ Grades fetched:', data.getKhsMahasiswa.header?.total_matakuliah || 0)
    return { success: true, data: data.getKhsMahasiswa }
  } catch (error) {
    console.error('❌ Error fetching grades:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      data: null 
    }
  }
}

/**
 * Get student transcript from GraphQL
 * Data akademik lengkap untuk halaman academic
 */
export async function getStudentTranscriptGraphQL(nim: string) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('graphql-token')?.value || cookieStore.get('session-token')?.value

    if (!token) {
      return { success: false, error: 'Not authenticated', data: null }
    }

    console.log('📋 Fetching transcript from GraphQL for:', nim)

    const client = createAuthenticatedClient(token)
    const { data, error } = await executeGraphQLQuery<any>(
      GET_TRANSKRIP_MAHASISWA,
      { nim },
      client
    )

    if (error || !data?.getAllTranskripMahasiswa) {
      console.error('❌ Failed to fetch transcript:', error)
      return { success: false, error: error || 'Failed to fetch transcript', data: null }
    }

    console.log('✅ Transcript fetched successfully')
    return { success: true, data: data.getAllTranskripMahasiswa }
  } catch (error) {
    console.error('❌ Error fetching transcript:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error', 
      data: null 
    }
  }
}
