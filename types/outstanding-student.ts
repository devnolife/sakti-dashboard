export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  category: "academic" | "competition" | "research" | "community" | "leadership"
  level: "department" | "faculty" | "university" | "regional" | "national" | "international"
}

export interface OutstandingStudent {
  id: string
  name: string
  nim: string
  department: string
  departmentId: string
  year: number
  gpa: number
  photoUrl: string
  achievements: Achievement[]
  bio: string
}

