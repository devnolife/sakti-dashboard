export type KkpStatus = "pending" | "approved" | "rejected" | "in-progress" | "completed"

export type KkpDocumentType =
  | "application-letter"
  | "proposal"
  | "transcript"
  | "acceptance-letter"
  | "supervisor-letter"
  | "report"
  | "evaluation"

export type KkpDocumentStatus = "pending" | "verified" | "rejected"

export interface KkpDocument {
  id: string
  name: string
  type: KkpDocumentType
  url: string
  uploadDate: Date
  status: KkpDocumentStatus
  notes?: string
}

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

export interface Lecturer {
  id: string
  name: string
  nip: string
  department: string
  email: string
  phone?: string
  avatar?: string
  specialization?: string
}

export interface Company {
  id: string
  name: string
  address: string
  city: string
  province?: string
  postalCode?: string
  contactPerson: string
  contactPosition?: string
  contactEmail?: string
  contactPhone: string
  website?: string
  logo?: string
  industry: string
  description?: string
}

export interface KkpApplication {
  id: string
  applicationNumber: string
  title: string
  description: string
  submissionDate: Date
  startDate: Date
  endDate: Date
  status: KkpStatus
  student: Student
  groupMembers?: Student[]
  supervisor?: Lecturer
  company: Company
  documents: KkpDocument[]
  notes?: string
  approvedBy?: string
  approvedDate?: Date
  rejectedBy?: string
  rejectedDate?: Date
  rejectionReason?: string
}

