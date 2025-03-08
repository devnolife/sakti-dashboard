export interface LabAssistant {
  id: string
  name: string
  studentId: string
  email: string
  phone?: string
  avatar?: string
  lab: string
  experience: number
  skills?: string
  status: "active" | "inactive" | "probation"
  courses?: string[]
  schedule?: {
    day: string
    time: string
    course: string
    room: string
  }[]
  ratings?: {
    studentFeedback: number
    technicalKnowledge: number
    communication: number
    reliability: number
  }
  attendance?: {
    present: number
    absent: number
    late: number
  }
}

