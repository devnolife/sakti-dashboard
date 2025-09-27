// API client for Jadwal Kuliah API
const BASE_URL = process.env.NEXT_PUBLIC_JADWAL_API_URL || 'http://localhost:8000'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  pagination?: {
    page: number
    size: number
    total: number
    totalPages: number
  }
}

export interface Prodi {
  id: number
  name: string
  code: string
  faculty: string
  has_specialization: boolean
  regular_classes: string[]
  specializations?: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  created_at: string
  updated_at: string
}

export interface Course {
  id: number
  prodi_id: number
  kode_mk: string
  mata_kuliah: string
  sks: number
  semester: number
  kelas: string
  dosen1: string
  dosen2?: string
  is_nr: boolean
  created_at: string
  updated_at: string
}

export interface ScheduleGenerationRequest {
  prodi: string
  semester: number
  academic_year: string
  semester_type: "ganjil" | "genap"
  include_pbo: boolean
  include_semester_7: boolean
  custom_courses: string[]
}

export interface GenerationStatus {
  schedule_id: string
  status: "pending" | "in_progress" | "completed" | "failed"
  progress: number
  message: string
  estimated_completion: string
  created_at: string
}

export interface SystemStats {
  total_prodis: number
  total_courses: number
  active_schedules: number
  system_health: "excellent" | "good" | "warning" | "critical"
}

class JadwalKuliahAPI {
  private baseURL: string

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // System endpoints
  async getHealth(): Promise<ApiResponse<{ status: string }>> {
    return this.request('/api/health')
  }

  async getSystemStats(): Promise<ApiResponse<SystemStats>> {
    return this.request('/api/stats')
  }

  // Prodi endpoints
  async getProdis(page = 1, size = 10): Promise<ApiResponse<Prodi[]>> {
    return this.request(`/api/prodis?page=${page}&size=${size}`)
  }

  async getProdiById(id: number): Promise<ApiResponse<Prodi>> {
    return this.request(`/api/prodis/${id}`)
  }

  async createProdi(prodi: Omit<Prodi, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Prodi>> {
    return this.request('/api/prodis', {
      method: 'POST',
      body: JSON.stringify(prodi),
    })
  }

  async updateProdi(id: number, prodi: Partial<Prodi>): Promise<ApiResponse<Prodi>> {
    return this.request(`/api/prodis/${id}`, {
      method: 'PUT',
      body: JSON.stringify(prodi),
    })
  }

  async getProdiStats(id: number): Promise<ApiResponse<{
    total_courses: number
    active_schedules: number
    total_students: number
  }>> {
    return this.request(`/api/prodis/${id}/stats`)
  }

  // Course endpoints
  async getCourses(params: {
    page?: number
    size?: number
    prodi_id?: number
    semester?: number
    kelas?: string
  } = {}): Promise<ApiResponse<Course[]>> {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })

    return this.request(`/api/courses?${queryParams.toString()}`)
  }

  async createCourse(course: Omit<Course, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<Course>> {
    return this.request('/api/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    })
  }

  async createMultipleCourses(courses: Omit<Course, 'id' | 'created_at' | 'updated_at'>[]): Promise<ApiResponse<Course[]>> {
    return this.request('/api/courses/bulk', {
      method: 'POST',
      body: JSON.stringify({ courses }),
    })
  }

  async updateCourse(id: number, course: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.request(`/api/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    })
  }

  async deleteCourse(id: number): Promise<ApiResponse<void>> {
    return this.request(`/api/courses/${id}`, {
      method: 'DELETE',
    })
  }

  // Schedule Generation endpoints
  async generateSchedule(request: ScheduleGenerationRequest): Promise<ApiResponse<{ schedule_id: string }>> {
    return this.request('/api/generate/schedule', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  }

  async getGenerationStatus(scheduleId: string): Promise<ApiResponse<GenerationStatus>> {
    return this.request(`/api/generate/status/${scheduleId}`)
  }

  async generatePBOCourses(prodiId: number, classes: string[]): Promise<ApiResponse<Course[]>> {
    return this.request(`/api/generate/pbo?prodi_id=${prodiId}`, {
      method: 'POST',
      body: JSON.stringify(classes),
    })
  }

  async generateSemester7Courses(prodiId: number, classes: string[]): Promise<ApiResponse<Course[]>> {
    return this.request(`/api/generate/semester7?prodi_id=${prodiId}`, {
      method: 'POST',
      body: JSON.stringify(classes),
    })
  }

  // File Management endpoints
  async uploadFile(file: File, fileType: string): Promise<ApiResponse<{ filename: string, url: string }>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.request(`/api/upload?file_type=${fileType}`, {
      method: 'POST',
      headers: {}, // Remove Content-Type header to let browser set it with boundary
      body: formData,
    })
  }

  async getUploadedFiles(page = 1, size = 10, fileType?: string): Promise<ApiResponse<{
    filename: string
    file_type: string
    size: number
    uploaded_at: string
  }[]>> {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() })
    if (fileType) params.append('file_type', fileType)

    return this.request(`/api/uploads?${params.toString()}`)
  }

  // Download & Export endpoints
  async downloadSchedule(
    prodiCode: string,
    academicYear: string,
    semesterType: string,
    format: 'xlsx' | 'pdf' | 'json' = 'xlsx'
  ): Promise<Response> {
    const url = `${this.baseURL}/api/download/schedule/${prodiCode}?academic_year=${academicYear}&semester_type=${semesterType}&format=${format}`
    return fetch(url)
  }

  async downloadAllSchedules(
    academicYear: string,
    semesterType: string,
    format: 'xlsx' | 'pdf' | 'json' = 'xlsx'
  ): Promise<Response> {
    const url = `${this.baseURL}/api/download/all-schedules?academic_year=${academicYear}&semester_type=${semesterType}&format=${format}`
    return fetch(url)
  }

  // Configuration endpoints
  async getSystemConfig(): Promise<ApiResponse<{
    key: string
    value: any
    description: string
  }[]>> {
    return this.request('/api/config')
  }

  async updateSystemConfig(key: string, config: {
    value: any
    description: string
  }): Promise<ApiResponse<void>> {
    return this.request(`/api/config/${key}`, {
      method: 'PUT',
      body: JSON.stringify(config),
    })
  }
}

// Export singleton instance
export const jadwalKuliahAPI = new JadwalKuliahAPI()
export default jadwalKuliahAPI
