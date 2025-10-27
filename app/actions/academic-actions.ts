'use server'

// TODO: Replace with GraphQL queries from lib/graphql/queries-superapps.ts
// Available queries: GET_MAHASISWA_BY_NIM, GET_TRANSKRIP_MAHASISWA, etc.
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
