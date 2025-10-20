export type InternshipStatus = "pending" | "approved" | "rejected" | "in_progress" | "completed"

export interface InternshipApplication {
  id: string
  student_id: string
  studentName: string
  studentNIM: string
  companyName: string
  companyAddress: string
  position: string
  start_date: Date
  end_date: Date
  status: InternshipStatus
  applicationDate: Date
  documents: {
    id: string
    name: string
    url: string
    type: string
  }[]
  feedback?: string
  reviewedBy?: string
  reviewedAt?: Date
}

