export interface Classroom {
  id: string
  name: string
  building: string
  capacity: number
}

export interface ExamSchedule {
  id: string
  courseName: string
  date: string // ISO string
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  classroom: Classroom
}

