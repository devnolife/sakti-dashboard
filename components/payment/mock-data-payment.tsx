export type Department = "Pengairan" | "Elektro" | "Arsitektur" | "Informatika" | "PWK"
export type PaymentStatus = "pending" | "verified" | "rejected"
export type PaymentType = "Tuition" | "Laboratory" | "Registration" | "Exam" | "Other"

export interface StudentPayment {
  id: string
  studentId: string
  name: string
  department: Department
  amount: number
  date: string
  status: PaymentStatus
  paymentType: PaymentType
  notes?: string
  email: string
  semester: number
}

// Department colors for visual distinction - updated with softer palette
export const departmentColors: Record<Department, string> = {
  Pengairan: "bg-blue-50 text-blue-700 border-blue-100",
  Elektro: "bg-amber-50 text-amber-700 border-amber-100",
  Arsitektur: "bg-purple-50 text-purple-700 border-purple-100",
  Informatika: "bg-emerald-50 text-emerald-700 border-emerald-100",
  PWK: "bg-orange-50 text-orange-700 border-orange-100",
}

// Status colors - updated with softer palette
export const statusColors: Record<PaymentStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-100",
  verified: "bg-emerald-50 text-emerald-700 border-emerald-100",
  rejected: "bg-rose-50 text-rose-700 border-rose-100",
}

// Generate random date within the last 30 days
const getRandomDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * 30))
  return date.toISOString().split("T")[0]
}

// Generate random amount between 500k and 5M
const getRandomAmount = () => {
  return Math.floor(Math.random() * 4500000) + 500000
}

// Generate random student ID
const getRandomStudentId = (department: Department, year: number) => {
  const deptCode = {
    Pengairan: "01",
    Elektro: "02",
    Arsitektur: "03",
    Informatika: "04",
    PWK: "05",
  }[department]

  const yearCode = year.toString().slice(-2)
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")

  return `${yearCode}${deptCode}${randomNum}`
}

// List of Indonesian names for mock data
const indonesianNames = [
  "Budi Santoso",
  "Siti Rahayu",
  "Ahmad Wijaya",
  "Dewi Susanti",
  "Eko Prasetyo",
  "Rina Wati",
  "Joko Widodo",
  "Ani Yudhoyono",
  "Bambang Supriadi",
  "Lina Marlina",
  "Dedi Kurniawan",
  "Wati Sulistiawati",
  "Agus Salim",
  "Yuni Shara",
  "Hendra Setiawan",
  "Maya Sari",
  "Rudi Hartono",
  "Nina Agustina",
  "Dodi Sudrajat",
  "Lia Indah",
  "Firman Utama",
  "Sari Indah",
  "Budi Hartono",
  "Rina Novita",
  "Adi Nugroho",
  "Putri Anggraini",
  "Rizki Pratama",
  "Dian Sastro",
  "Surya Darma",
  "Mega Wati",
]

// Generate mock student payments
export const generateMockStudentPayments = (count: number): StudentPayment[] => {
  const departments: Department[] = ["Pengairan", "Elektro", "Arsitektur", "Informatika", "PWK"]
  const statuses: PaymentStatus[] = ["pending", "verified", "rejected"]
  const paymentTypes: PaymentType[] = ["Tuition", "Laboratory", "Registration", "Exam", "Other"]

  return Array.from({ length: count }).map((_, index) => {
    const department = departments[Math.floor(Math.random() * departments.length)]
    const name = indonesianNames[Math.floor(Math.random() * indonesianNames.length)]
    const year = Math.floor(Math.random() * 4) + 2020 // Students from 2020-2023
    const studentId = getRandomStudentId(department, year)
    const firstName = name.split(" ")[0].toLowerCase()

    return {
      id: `PAY-${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`,
      studentId,
      name,
      department,
      amount: getRandomAmount(),
      date: getRandomDate(),
      status: index < count * 0.7 ? "pending" : index < count * 0.9 ? "verified" : "rejected", // 70% pending, 20% verified, 10% rejected
      paymentType: paymentTypes[Math.floor(Math.random() * paymentTypes.length)],
      notes: Math.random() > 0.7 ? "Special consideration needed" : undefined,
      email: `${firstName}.${studentId}@student.ac.id`,
      semester: Math.floor(Math.random() * 8) + 1,
    }
  })
}

// Generate 50 mock student payments
export const mockStudentPayments = generateMockStudentPayments(50)

