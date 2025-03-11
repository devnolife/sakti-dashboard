export type ExamType = "proposal" | "result" | "final" | "other"
export type ExamStatus = "applicant" | "pending" | "scheduled" | "completed" | "passed" | "failed" | "cancelled"
export type DocumentStatus = "verified" | "unverified" | "rejected"

export interface CommitteeMember {
  id: string
  name: string
  role: string
  department: string
  avatarUrl: string
}

export interface Advisor {
  id: string
  name: string
  department: string
  avatarUrl: string
}

export interface ExamDocument {
  id: string
  name: string
  type: "payment_proof" | "transcript" | "proposal" | "supervisor_approval" | "other"
  status: DocumentStatus
  uploadDate: string // ISO string
  verificationDate?: string // ISO string
  fileUrl: string
  fileSize: number // in bytes
  notes?: string
  isSystemGenerated?: boolean
}

export interface Exam {
  id: string
  title: string
  studentName: string
  studentId: string
  date: string
  location: string
  status: string
  type: string
  advisor1?: Advisor
  advisor2?: Advisor
  committee: CommitteeMember[]
  studentNIM?: string
  program?: string
  abstract?: string
  submissionDate?: string // ISO string
  scheduledDate?: string // ISO string
  completionDate?: string // ISO string
  documents?: ExamDocument[]
}

