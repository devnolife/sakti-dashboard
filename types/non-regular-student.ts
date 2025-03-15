export type StudentStatus = "active" | "inactive" | "graduated" | "on_leave" | "transferred" | "dropped_out"

export type PaymentStatus = "paid" | "partial" | "unpaid" | "overdue" | "waived"

export type Program = "extension" | "weekend" | "evening" | "online" | "executive" | "international"

export interface NonRegularStudent {
  id: string
  nim: string
  name: string
  gender: "male" | "female"
  email: string
  phone: string
  address: string
  program: Program
  department: string
  entryYear: number
  semester: number
  status: StudentStatus
  paymentStatus: PaymentStatus
  lastPaymentDate?: string
  gpa: number
  totalCredits: number
  birthDate: string
  birthPlace: string
  religion: string
  nationality: string
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  documents: {
    id: string
    name: string
    type: string
    uploadDate: string
    verified: boolean
    url: string
  }[]
  notes?: string
  createdAt: string
  updatedAt: string
}

