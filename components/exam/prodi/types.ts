export interface ThesisSubmission {
  id: string
  title: string
  studentName: string
  student_id: string
  program: string
  submission_date: string
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
  student_id: string
  program: string
  exam_type: "proposal" | "result" | "final"
  scheduled_date: string
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
  student_id: string
  program: string
  exam_type: "proposal" | "result" | "final"
  status: "pending" | "complete" | "partial"
  supervisors?: Lecturer[]
  examiners?: Lecturer[]
}

