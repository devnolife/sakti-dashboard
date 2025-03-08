export interface ThesisSubmission {
  id: string
  title: string
  studentName: string
  studentId: string
  program: string
  submissionDate: string
  status: "pending" | "approved" | "rejected" | "revision"
  abstract: string
  keywords: string[]
  feedback?: string
  similarityScore: number
  similarTheses?: {
    title: string
    author: string
    year: string
    similarityPercentage: number
  }[]
}

export interface ExamSchedule {
  id: string
  title: string
  studentName: string
  studentId: string
  program: string
  examType: "proposal" | "result" | "final"
  scheduledDate: string
  duration: number
  location: string
  verificationStatus: "pending" | "verified" | "rescheduled" | "cancelled"
  notes?: string
  committee?: {
    id: string
    name: string
    role: string
    avatarUrl: string
  }[]
}

export interface Lecturer {
  id: string
  name: string
  department: string
  expertise: string
  avatarUrl: string
  role?: string
}

export interface SupervisorExaminerData {
  id: string
  title: string
  studentName: string
  studentId: string
  program: string
  examType: "proposal" | "result" | "final"
  status: "pending" | "complete" | "partial"
  supervisors?: Lecturer[]
  examiners?: Lecturer[]
}

