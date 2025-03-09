export type ExamType = "proposal" | "result"
export type ExamStatus = 'not-started' | 'in-progress' | 'passed' | 'failed';

export interface CommitteeMember {
  name: string
  role: string
}

export interface Exam {
  id: string
  studentName: string
  studentNIM: string
  program: string
  title: string
  abstract: string
  submissionDate: string // ISO string
  scheduledDate?: string // ISO string
  completionDate?: string // ISO string
  type: ExamType
  status: ExamStatus
  committee?: CommitteeMember[]
}

