// Type definitions untuk menggantikan Prisma generated types

export enum Role {
  STUDENT = 'STUDENT',
  LECTURER = 'LECTURER',
  STAFF = 'STAFF',
  DEKAN = 'DEKAN',
  ADMIN = 'ADMIN',
  ADMIN_KEUANGAN = 'ADMIN_KEUANGAN',
  ADMIN_UMUM = 'ADMIN_UMUM',
  KEPALA_TATA_USAHA = 'KEPALA_TATA_USAHA',
  STAFF_TU = 'STAFF_TU',
  GKM = 'GKM',
  AIK_KOMFREN = 'AIK_KOMFREN'
}

export enum EventType {
  ACADEMIC = 'ACADEMIC',
  EXAM = 'EXAM',
  HOLIDAY = 'HOLIDAY',
  SEMINAR = 'SEMINAR',
  OTHER = 'OTHER'
}

export enum EventStatus {
  pending = 'pending',
  confirmed = 'confirmed',
  cancelled = 'cancelled'
}

export enum ExamType {
  UTS = 'UTS',
  UAS = 'UAS',
  REMEDIAL = 'REMEDIAL',
  SUSULAN = 'SUSULAN'
}

export type User = {
  id: string
  name: string
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: Role
  nim?: string | null
  nip?: string | null
  createdAt: Date
  updatedAt: Date
}

export type Student = {
  id: string
  nim: string
  name: string
  email: string | null
  phone: string | null
  prodi_id: string | null
  advisor_id: string | null
  ipk: number | null
  total_sks: number | null
  semester: number | null
  status: string | null
  user_id: string
  createdAt: Date
  updatedAt: Date
}

export type Lecturer = {
  id: string
  nip: string
  nidn: string | null
  name: string
  email: string | null
  phone: string | null
  prodi_id: string | null
  user_id: string
  createdAt: Date
  updatedAt: Date
}

export type Prodi = {
  kode: string
  nama: string
  jenjang: string
  fakultas: string | null
  akreditasi: string | null
  createdAt: Date
  updatedAt: Date
}

export type Book = {
  id: string
  title: string
  author: string | null
  publisher: string | null
  year: number | null
  isbn: string | null
  category_id: string | null
  quantity: number
  available: number
  location: string | null
  createdAt: Date
  updatedAt: Date
}

export type BookCategory = {
  id: string
  name: string
  description: string | null
  createdAt: Date
  updatedAt: Date
}

export type BookBorrowing = {
  id: string
  book_id: string
  user_id: string
  borrowed_at: Date
  due_date: Date
  returned_at: Date | null
  status: string
  createdAt: Date
  updatedAt: Date
}

export type ThesisTitle = {
  id: string
  title: string
  student_id: string
  advisor_id: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export type Laboratory = {
  id: string
  name: string
  code: string
  capacity: number
  description: string | null
  building: string | null
  floor: string | null
  status: string
  createdAt: Date
  updatedAt: Date
}

export type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  read: boolean
  createdAt: Date
  updatedAt: Date
}

export type AcademicEvent = {
  id: string
  title: string
  description: string | null
  start_date: Date
  end_date: Date
  location: string | null
  type: EventType
  exam_type: ExamType | null
  status: EventStatus
  prodi_id: string | null
  is_global: boolean
  student_id: string | null
  course_id: string | null
  lecturer_id: string | null
  createdAt: Date
  updatedAt: Date
}

// GraphQL Response Types
export type GraphQLResponse<T> = {
  data: T | null
  error: string | null
}

// Common Query Variables
export type PaginationInput = {
  page?: number
  limit?: number
  offset?: number
}

export type FilterInput = {
  search?: string
  prodi_id?: string
  status?: string
}
