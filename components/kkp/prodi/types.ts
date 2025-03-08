export type KkpStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "in-progress"
  | "completed"
  | "submitted"
  | "revision-needed"

export type KkpLocationType = "company" | "government" | "education" | "research" | "non-profit" | "other"

export interface Student {
  id: string
  name: string
  nim: string
  major: string
  semester: number
  email: string
  phone: string
  avatar?: string
}

export interface Supervisor {
  id: string
  name: string
  nip: string
  department: string
  email: string
  phone?: string
  specialization?: string
  avatar?: string
}

export interface KkpLocation {
  id: string
  name: string
  type: KkpLocationType
  address: string
  city: string
  province: string
  postalCode?: string
  contactPerson: string
  contactPosition?: string
  contactEmail: string
  contactPhone: string
  website?: string
  description?: string
  submittedBy: Student
  submissionDate: string
  status: KkpStatus
  reviewedBy?: string
  reviewDate?: string
  feedback?: string
  availablePositions?: string[]
  requiredSkills?: string[]
}

export interface KkpTeam {
  id: string
  name: string
  location: KkpLocation
  members: Student[]
  leader: Student
  supervisor?: Supervisor
  companyMentor?: {
    name: string
    position: string
    email: string
    phone: string
  }
  startDate: string
  endDate: string
  submissionDate: string
  status: KkpStatus
  reviewedBy?: string
  reviewDate?: string
  feedback?: string
  projectTitle?: string
  projectDescription?: string
}

export interface StudentKkpRecord {
  id: string
  student: Student
  location: KkpLocation
  team?: KkpTeam
  supervisor?: Supervisor
  companyMentor?: {
    name: string
    position: string
    email: string
    phone: string
  }
  startDate: string
  endDate?: string
  status: KkpStatus
  projectTitle?: string
  projectDescription?: string
  grade?: string
  reportSubmissionDate?: string
  presentationDate?: string
  completionDate?: string
  feedback?: string
  documents?: {
    id: string
    name: string
    type: string
    url: string
    uploadDate: string
    status: "pending" | "verified" | "rejected"
  }[]
}

