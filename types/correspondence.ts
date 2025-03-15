export type LetterStatus =
  | "submitted" // Just submitted, waiting for review
  | "in-review" // Being reviewed by staff/prodi/dekan
  | "approved" // Approved but letter not yet generated
  | "completed" // Letter has been generated and ready for pickup/download
  | "rejected" // Request was rejected

export type ApprovalRole = "staff_tu" | "prodi" | "dekan" | "none"

export interface LetterAttachment {
  id: string
  name: string
  uploadDate: string
  url?: string
}

export interface LetterRequest {
  id: string
  type: string
  title: string
  purpose: string
  description: string
  status: LetterStatus
  requestDate: string
  approvedDate?: string
  completedDate?: string
  studentId: string
  studentName: string
  studentNIM: string
  studentMajor: string
  approvalRole: ApprovalRole
  approvedBy?: string
  rejectedReason?: string
  additionalInfo?: Record<string, any>
  attachments?: LetterAttachment[]
}

export interface LetterType {
  id: string
  title: string
  description: string
  approvalRole: ApprovalRole
  estimatedDays: number
  requiredDocuments?: string[]
  additionalFields?: Array<{
    name: string
    label: string
    type: "text" | "date" | "select" | "textarea" | "number"
    options?: string[]
    required?: boolean
  }>
}

