export type PaymentStatus = "pending" | "completed" | "failed" | "refunded"
export type PaymentCategory = "laboratory" | "exam" | "kkp" | "tuition" | "other"

export interface Payment {
  id: string
  amount: number
  description: string
  category: PaymentCategory
  status: PaymentStatus
  dueDate: string
  paidDate?: string
  semester: string
  academicYear: string
  receiptNumber?: string
  paymentMethod?: string
}

export interface PaymentItem {
  id: string
  name: string
  description: string
  amount: number
  category: PaymentCategory
  semester: string
  academicYear: string
  dueDate: string
  isRequired: boolean
  isRecurring: boolean
}

