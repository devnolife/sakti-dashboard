import type { StudentGrade } from "./types"

// Names for generating mock data
const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Emily",
  "David",
  "Sarah",
  "Robert",
  "Lisa",
  "William",
  "Jessica",
  "Richard",
  "Jennifer",
  "Joseph",
  "Linda",
  "Thomas",
  "Maria",
  "Charles",
  "Patricia",
  "Daniel",
  "Barbara",
]

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
]

// Function to generate a random number between min and max (inclusive)
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Function to generate a random date in the last month
const getRandomDate = () => {
  const today = new Date()
  const lastMonth = new Date(today)
  lastMonth.setMonth(today.getMonth() - 1)

  const randomDate = new Date(lastMonth.getTime() + Math.random() * (today.getTime() - lastMonth.getTime()))

  return randomDate.toISOString().split("T")[0]
}

// Generate a mock student grade
const generateMockStudentGrade = (courseId: string, index: number): StudentGrade => {
  const studentId = `${Math.floor(1000000 + Math.random() * 9000000)}`
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const studentName = `${firstName} ${lastName}`

  const labSections = ["Lab A", "Lab B", "Lab C"]
  const labSection = labSections[Math.floor(Math.random() * labSections.length)]

  const midterm = getRandomNumber(60, 100)
  const final = getRandomNumber(60, 100)
  const assignments = getRandomNumber(65, 100)
  const labReports = getRandomNumber(70, 100)
  const attendance = getRandomNumber(80, 100)

  // Calculate weighted final grade
  const finalGrade = Math.round(midterm * 0.25 + final * 0.3 + assignments * 0.2 + labReports * 0.15 + attendance * 0.1)

  // Generate 3-5 assignments
  const assignmentCount = getRandomNumber(3, 5)
  const assignments_array = []

  for (let i = 0; i < assignmentCount; i++) {
    const dueDate = getRandomDate()
    const maxScore = 100
    const score = getRandomNumber(60, 100)

    assignments_array.push({
      id: `ass-${courseId}-${index}-${i}`,
      name: `Assignment ${i + 1}`,
      dueDate,
      submittedDate: getRandomNumber(1, 10) > 2 ? dueDate : undefined,
      score,
      maxScore,
      feedback: getRandomNumber(1, 10) > 3 ? "Good work, but could improve on methodology." : undefined,
    })
  }

  // Generate 5-8 attendance records
  const attendanceCount = getRandomNumber(5, 8)
  const attendance_array = []
  const statuses: ("present" | "absent" | "late" | "excused")[] = ["present", "absent", "late", "excused"]
  const topics = [
    "Lab Introduction",
    "Basic Measurements",
    "Data Analysis",
    "Error Analysis",
    "Circuit Design",
    "System Testing",
    "Project Planning",
    "Final Presentation",
    "Peer Review",
  ]

  for (let i = 0; i < attendanceCount; i++) {
    // Weighted randomness to make "present" more common
    const statusIndex = Math.floor(Math.random() * 10)
    const status = statusIndex < 7 ? "present" : statusIndex < 8 ? "late" : statusIndex < 9 ? "excused" : "absent"

    attendance_array.push({
      date: getRandomDate(),
      topic: topics[i % topics.length],
      status,
      notes: status !== "present" ? "Student notified instructor in advance." : undefined,
    })
  }

  // Comments only for students with lower grades
  let comments
  if (finalGrade < 70) {
    comments =
      "Student needs to improve understanding of core concepts. Additional study resources have been recommended."
  } else if (finalGrade < 80) {
    comments = "Showing progress but needs to focus more on lab reports and attendance."
  }

  return {
    id: `grade-${courseId}-${index}`,
    studentId,
    studentName,
    courseId,
    courseName: `Practicum in Laboratory Techniques ${courseId.slice(-1)}`,
    labSection,
    scores: {
      midterm,
      final,
      assignments,
      labReports,
      attendance,
    },
    finalGrade,
    comments,
    assignments: assignments_array,
    attendance: attendance_array,
  }
}

// Generate an array of mock student grades for a specific course
export const generateMockStudentGrades = (courseId: string): StudentGrade[] => {
  const studentCount = getRandomNumber(15, 30)
  const grades: StudentGrade[] = []

  for (let i = 0; i < studentCount; i++) {
    grades.push(generateMockStudentGrade(courseId, i))
  }

  return grades
}

