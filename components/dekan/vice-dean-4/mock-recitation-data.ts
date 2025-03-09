export type RecitationTest = {
  id: string
  studentId: string
  studentName: string
  department: string
  testDate: string
  score: number
  grade: "A" | "B" | "C" | "D" | "E"
  evaluationDetails: string
  staffId: string
  staffName: string
  status: "passed" | "failed"
}

export type RecitationStaff = {
  id: string
  name: string
  department: string
  position: string
  qualification: string
  testsAdministered: number
  dateAdded: string
  status: "active" | "inactive"
}

export const mockRecitationTests: RecitationTest[] = [
  {
    id: "RT001",
    studentId: "TI18001",
    studentName: "Ahmad Fauzi",
    department: "Informatika",
    testDate: "2023-09-15",
    score: 92,
    grade: "A",
    evaluationDetails: "Hafalan lancar, tajwid baik, makharijul huruf sempurna",
    staffId: "STF001",
    staffName: "Dr. Hasan Basri",
    status: "passed",
  },
  {
    id: "RT002",
    studentId: "SI18045",
    studentName: "Siti Aisyah",
    department: "Sistem Informasi",
    testDate: "2023-09-16",
    score: 88,
    grade: "B",
    evaluationDetails: "Hafalan lancar, tajwid perlu perbaikan minor",
    staffId: "STF002",
    staffName: "Dr. Fatimah Azzahra",
    status: "passed",
  },
  {
    id: "RT003",
    studentId: "TK18023",
    studentName: "Muhammad Rizki",
    department: "Teknik Komputer",
    testDate: "2023-09-17",
    score: 95,
    grade: "A",
    evaluationDetails: "Hafalan sangat lancar, tajwid dan makharijul huruf sempurna",
    staffId: "STF001",
    staffName: "Dr. Hasan Basri",
    status: "passed",
  },
  {
    id: "RT004",
    studentId: "TE18078",
    studentName: "Anisa Rahma",
    department: "Teknik Elektro",
    testDate: "2023-09-18",
    score: 85,
    grade: "B",
    evaluationDetails: "Hafalan cukup lancar, tajwid baik",
    staffId: "STF003",
    staffName: "Dr. Abdullah Mahmud",
    status: "passed",
  },
  {
    id: "RT005",
    studentId: "MI18102",
    studentName: "Budi Santoso",
    department: "Manajemen Informatika",
    testDate: "2023-09-19",
    score: 78,
    grade: "C",
    evaluationDetails: "Hafalan perlu ditingkatkan, tajwid cukup",
    staffId: "STF002",
    staffName: "Dr. Fatimah Azzahra",
    status: "passed",
  },
  {
    id: "RT006",
    studentId: "TI18056",
    studentName: "Dewi Lestari",
    department: "Informatika",
    testDate: "2023-09-20",
    score: 90,
    grade: "A",
    evaluationDetails: "Hafalan lancar, tajwid sangat baik",
    staffId: "STF003",
    staffName: "Dr. Abdullah Mahmud",
    status: "passed",
  },
  {
    id: "RT007",
    studentId: "SI18089",
    studentName: "Eko Prasetyo",
    department: "Sistem Informasi",
    testDate: "2023-09-21",
    score: 82,
    grade: "B",
    evaluationDetails: "Hafalan baik, tajwid perlu perbaikan",
    staffId: "STF001",
    staffName: "Dr. Hasan Basri",
    status: "passed",
  },
  {
    id: "RT008",
    studentId: "TK18112",
    studentName: "Fitriani Putri",
    department: "Teknik Komputer",
    testDate: "2023-09-22",
    score: 87,
    grade: "B",
    evaluationDetails: "Hafalan lancar, tajwid baik",
    staffId: "STF002",
    staffName: "Dr. Fatimah Azzahra",
    status: "passed",
  },
]

export const mockRecitationStaff: RecitationStaff[] = [
  {
    id: "STF001",
    name: "Dr. Hasan Basri",
    department: "Fakultas Agama",
    position: "Dosen Senior",
    qualification: "Hafiz Quran 30 Juz",
    testsAdministered: 24,
    dateAdded: "2022-01-15",
    status: "active",
  },
  {
    id: "STF002",
    name: "Dr. Fatimah Azzahra",
    department: "Fakultas Agama",
    position: "Dosen",
    qualification: "Hafizah Quran 30 Juz",
    testsAdministered: 18,
    dateAdded: "2022-02-20",
    status: "active",
  },
  {
    id: "STF003",
    name: "Dr. Abdullah Mahmud",
    department: "Fakultas Pendidikan",
    position: "Dosen",
    qualification: "Hafiz Quran 30 Juz",
    testsAdministered: 15,
    dateAdded: "2022-03-10",
    status: "active",
  },
]

