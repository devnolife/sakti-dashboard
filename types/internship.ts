export type InternshipStatus = "pending" | "approved" | "rejected" | "in_progress" | "completed"

export interface InternshipApplication {
  id: string
  studentId: string
  studentName: string
  studentNIM: string
  companyName: string
  companyAddress: string
  position: string
  startDate: Date
  endDate: Date
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

