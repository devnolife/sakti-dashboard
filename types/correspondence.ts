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
  student_id: string
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

export type FieldType = "text" | "number" | "date" | "email" | "phone" | "textarea" | "file" | "select"

export interface DynamicField {
  id: string
  label: string
  type: FieldType
  required: boolean
  placeholder?: string
  helpText?: string
  options?: string[] // For select type
  validation?: {
    min?: number
    max?: number
    pattern?: string
    fileTypes?: string[] // For file type
    maxFileSize?: number // in MB
  }
}

export interface LetterTypeFormData {
  title: string
  description: string
  approval_role: string
  estimated_days: number
  required_documents: string[]
  additional_fields: DynamicField[]
  prodi_id?: string
  is_global: boolean
  template?: string
}

export interface CorrespondenceRequestData {
  id: string
  letter_type_id: string
  student_id: string
  form_data: Record<string, any>
  attachments?: {
    fieldId: string
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
  }[]
  status: "pending" | "approved" | "rejected"
  rejection_note?: string
  approved_by?: string
  approved_at?: string
  created_at: string
  updated_at: string
}
