export type PracticumStatus = "pending" | "approved" | "rejected" | "in_progress" | "completed"

export interface PracticumEnrollment {
  id: string
  studentId: string
  studentName: string
  courseName: string
  courseCode: string
  enrollmentDate: string
  status: PracticumStatus
  labSection: string
  scheduleDay: string
  scheduleTime: string
  instructor: string
  notes?: string
  paymentStatus: "paid" | "unpaid" | "partial"
  paymentAmount: number
  requirements: {
    id: string
    name: string
    completed: boolean
  }[]
  attendance: {
    date: string
    status: "present" | "absent" | "late" | "excused"
    notes?: string
  }[]
  grades: {
    assignmentName: string
    score: number
    maxScore: number
    weight: number
    date: string
  }[]
}

export interface PracticumCourse {
  id: string
  name: string
  code: string
  semester: string
  academicYear: string
  credits: number
  description: string
  maxCapacity: number
  currentEnrollment: number
  instructors: string[]
  schedule: {
    day: string
    startTime: string
    endTime: string
    location: string
  }[]
  prerequisites: string[]
  materials: {
    name: string
    required: boolean
  }[]
  status: "active" | "upcoming" | "completed"
}

export interface PracticumSession {
  id: string
  courseId: string
  courseName: string
  date: string
  startTime: string
  endTime: string
  location: string
  instructor: string
  assistants: string[]
  topic: string
  materials: string[]
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  attendanceCount: number
  totalEnrolled: number
  notes?: string
}

export interface PracticumSchedule {
  id: string
  title: string
  course: string
  day: string
  startTime: string
  endTime: string
  lab: string
  assistants: string[]
  status: "active" | "upcoming" | "completed" | "cancelled"
}

export interface PracticumMaterial {
  id: string
  name: string
  category: string
  course: string
  quantity: number
  unit: string
  threshold: number
  description: string
  createdAt: string
  updatedAt: string
}

export interface MaterialRequest {
  id: string
  materialId: string
  requesterName: string
  requesterRole: "instructor" | "assistant" | "student"
  course: string
  quantity: number
  requestDate: string
  status: "pending" | "approved" | "rejected"
  notes?: string
  approvedDate?: string
  rejectedDate?: string
  rejectionReason?: string
}

// Extend the existing PracticumEnrollment type to include more grade details
export interface StudentGrade {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  labSection: string
  scores: {
    midterm: number
    final: number
    assignments: number
    labReports: number
    attendance: number
  }
  finalGrade: number
  comments?: string
  assignments: {
    id: string
    name: string
    dueDate: string
    submittedDate?: string
    score: number
    maxScore: number
    feedback?: string
  }[]
  attendance: {
    date: string
    topic: string
    status: "present" | "absent" | "late" | "excused"
    notes?: string
  }[]
}

