import { faker } from "@faker-js/faker/locale/id_ID"

// Set a seed for consistent data generation
faker.seed(123)

// Define types
export type KkpPlusStudent = {
  id: string
  name: string
  nim: string
  department: string
  semester: number
  teamId: string | null
  teamName: string | null
  status: "active" | "completed" | "pending"
  startDate: Date | null
  endDate: Date | null
  grade: string | null
  supervisor: string | null
}

export type KkpPlusTeam = {
  id: string
  name: string
  members: string[] // Student IDs
  workProgram: string
  location: string
  startDate: Date
  endDate: Date
  status: "planning" | "ongoing" | "completed" | "evaluated"
  supervisorId: string
}

export type KkpPlusLocation = {
  id: string
  name: string
  address: string
  city: string
  province: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  capacity: number
  isActive: boolean
  description: string
}

export type KkpPlusSupervisor = {
  id: string
  name: string
  nip: string
  department: string
  specialization: string
  email: string
  phone: string
  currentLoad: number
  maxLoad: number
}

// Generate departments
const departments = [
  "Teknik Pengairan",
  "Teknik Elektro",
  "Arsitektur",
  "Informatika",
  "Perencanaan Wilayah Kota",
]

// Generate supervisors
export const supervisors: KkpPlusSupervisor[] = Array.from({ length: 15 }, (_, i) => ({
  id: `sup-${i + 1}`,
  name: faker.person.fullName(),
  nip: faker.string.numeric("18"),
  department: faker.helpers.arrayElement(departments),
  specialization: faker.helpers.arrayElement([
    "Pengembangan Perangkat Lunak",
    "Jaringan Komputer",
    "Keamanan Sistem",
    "Kecerdasan Buatan",
    "Analisis Data",
    "Interaksi Manusia dan Komputer",
    "Sistem Basis Data",
  ]),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  currentLoad: faker.number.int({ min: 0, max: 5 }),
  maxLoad: 5,
}))

// Generate locations
export const locations: KkpPlusLocation[] = Array.from({ length: 12 }, (_, i) => ({
  id: `loc-${i + 1}`,
  name: faker.company.name(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  province: faker.location.state(),
  contactPerson: faker.person.fullName(),
  contactPhone: faker.phone.number(),
  contactEmail: faker.internet.email(),
  capacity: faker.number.int({ min: 3, max: 10 }),
  isActive: faker.datatype.boolean(0.8),
  description: faker.company.catchPhrase(),
}))

// Generate students
export const students: KkpPlusStudent[] = Array.from({ length: 80 }, (_, i) => ({
  id: `std-${i + 1}`,
  name: faker.person.fullName(),
  nim: `20${faker.string.numeric(8)}`,
  department: faker.helpers.arrayElement(departments),
  semester: faker.number.int({ min: 5, max: 8 }),
  teamId: null,
  teamName: null,
  status: faker.helpers.arrayElement(["active", "completed", "pending"]),
  startDate: faker.date.past({ years: 1 }),
  endDate: faker.date.future({ years: 1 }),
  grade: faker.helpers.arrayElement(["A", "B+", "B", "C+", "C", null]),
  supervisor: faker.helpers.arrayElement(supervisors).name,
}))

// Generate teams
export const teams: KkpPlusTeam[] = Array.from({ length: 20 }, (_, i) => {
  const teamId = `team-${i + 1}`
  const teamName = `Tim KKP Plus ${i + 1}`
  const teamMembers = faker.helpers
    .arrayElements(
      students.filter((s) => s.teamId === null),
      faker.number.int({ min: 3, max: 5 }),
    )
    .map((s) => s.id)

  // Assign team to students
  teamMembers.forEach((memberId) => {
    const student = students.find((s) => s.id === memberId)
    if (student) {
      student.teamId = teamId
      student.teamName = teamName
    }
  })

  return {
    id: teamId,
    name: teamName,
    members: teamMembers,
    workProgram: faker.helpers.arrayElement([
      "Pengembangan Sistem Informasi Desa",
      "Pelatihan Digital Marketing untuk UMKM",
      "Implementasi Jaringan Komputer untuk Sekolah",
      "Pengembangan Aplikasi Mobile untuk Pariwisata Lokal",
      "Sistem Manajemen Inventaris untuk Puskesmas",
      "Digitalisasi Arsip Pemerintahan Desa",
      "Pelatihan Komputer Dasar untuk Masyarakat",
      "Pengembangan Website Desa Wisata",
    ]),
    location: faker.helpers.arrayElement(locations).id,
    startDate: faker.date.past({ years: 1 }),
    endDate: faker.date.future({ years: 1 }),
    status: faker.helpers.arrayElement(["planning", "ongoing", "completed", "evaluated"]),
    supervisorId: faker.helpers.arrayElement(supervisors).id,
  }
})

// Generate historical data (past KKP Plus participants)
export const historicalStudents: KkpPlusStudent[] = Array.from({ length: 120 }, (_, i) => ({
  id: `hist-${i + 1}`,
  name: faker.person.fullName(),
  nim: `${faker.number.int({ min: 15, max: 19 })}${faker.string.numeric(8)}`,
  department: faker.helpers.arrayElement(departments),
  semester: faker.number.int({ min: 5, max: 8 }),
  teamId: `past-team-${faker.number.int({ min: 1, max: 30 })}`,
  teamName: `Tim KKP Plus ${faker.number.int({ min: 1, max: 30 })}`,
  status: "completed",
  startDate: faker.date.past({ years: 3 }),
  endDate: faker.date.past({ years: 2 }),
  grade: faker.helpers.arrayElement(["A", "B+", "B", "C+", "C"]),
  supervisor: faker.helpers.arrayElement(supervisors).name,
}))

// Helper function to get location name by ID
export function getLocationName(locationId: string): string {
  const location = locations.find((loc) => loc.id === locationId)
  return location ? location.name : "Unknown Location"
}

// Helper function to get supervisor name by ID
export function getSupervisorName(supervisorId: string): string {
  const supervisor = supervisors.find((sup) => sup.id === supervisorId)
  return supervisor ? supervisor.name : "Unknown Supervisor"
}

// Helper function to get team members
export function getTeamMembers(teamId: string): KkpPlusStudent[] {
  return students.filter((student) => student.teamId === teamId)
}

