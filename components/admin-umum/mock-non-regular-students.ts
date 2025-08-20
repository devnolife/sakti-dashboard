import type { NonRegularStudent, Program, StudentStatus, PaymentStatus } from "@/types/non-regular-student"

const departments = [
  "Informatika",
  "Teknik Pengairan",
  "Teknik Elektro",
  "Arsitektur",
  "Perencanaan Wilayah Kota",
  "Psikologi",
  "Hukum",
  "Kedokteran",
]

const programs: Program[] = ["extension", "weekend", "evening", "online", "executive", "international"]

const statuses: StudentStatus[] = ["active", "inactive", "graduated", "on_leave", "transferred", "dropped_out"]

const paymentStatuses: PaymentStatus[] = ["paid", "partial", "unpaid", "overdue", "waived"]

const religions = ["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"]

const documentTypes = ["KTP", "Ijazah", "Transkrip", "Foto", "Surat Rekomendasi", "Bukti Pembayaran", "Sertifikat"]

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split("T")[0]
}

function generateRandomPhone(): string {
  return `08${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(9, "0")}`
}

function generateRandomGPA(): number {
  return Number.parseFloat((Math.random() * 1.5 + 2.5).toFixed(2))
}

function generateRandomDocuments(): NonRegularStudent["documents"] {
  const count = Math.floor(Math.random() * 4) + 1
  return Array.from({ length: count }, (_, i) => {
    const type = documentTypes[Math.floor(Math.random() * documentTypes.length)]
    return {
      id: `doc-${Math.random().toString(36).substring(2, 9)}`,
      name: `${type} - ${Math.random().toString(36).substring(2, 9)}`,
      type,
      uploadDate: generateRandomDate(new Date(2020, 0, 1), new Date()),
      verified: Math.random() > 0.3,
      url: `/documents/${Math.random().toString(36).substring(2, 9)}.pdf`,
    }
  })
}

export const mockNonRegularStudents: NonRegularStudent[] = Array.from({ length: 100 }, (_, i) => {
  const id = `${i + 1}`.padStart(3, "0")
  const entryYear = Math.floor(Math.random() * 5) + 2018
  const gender = Math.random() > 0.5 ? "male" : "female"
  const firstName =
    gender === "male"
      ? ["Ahmad", "Budi", "Dedi", "Eko", "Fajar", "Gunawan", "Hadi", "Irfan", "Joko", "Kurniawan"][
      Math.floor(Math.random() * 10)
      ]
      : ["Ani", "Bintang", "Citra", "Dewi", "Eka", "Fitri", "Gita", "Hana", "Indah", "Juwita"][
      Math.floor(Math.random() * 10)
      ]

  const lastName = [
    "Wijaya",
    "Santoso",
    "Kusuma",
    "Hidayat",
    "Nugroho",
    "Saputra",
    "Wibowo",
    "Setiawan",
    "Suryadi",
    "Pratama",
  ][Math.floor(Math.random() * 10)]
  const name = `${firstName} ${lastName}`

  const department = departments[Math.floor(Math.random() * departments.length)]
  const program = programs[Math.floor(Math.random() * programs.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)]
  const semester = Math.floor(Math.random() * 8) + 1
  const totalCredits = Math.min(semester * 20, 144)
  const birthYear = 2000 - Math.floor(Math.random() * 10)

  return {
    id: `NR${entryYear}${id}`,
    nim: `${entryYear}${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`,
    name,
    gender,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.university.ac.id`,
    phone: generateRandomPhone(),
    address: `Jl. ${["Merdeka", "Sudirman", "Gatot Subroto", "Diponegoro", "Ahmad Yani"][Math.floor(Math.random() * 5)]} No. ${Math.floor(Math.random() * 100) + 1}, ${["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Semarang"][Math.floor(Math.random() * 5)]}`,
    program,
    department,
    entryYear,
    semester,
    status,
    paymentStatus,
    lastPaymentDate: paymentStatus !== "unpaid" ? generateRandomDate(new Date(2022, 0, 1), new Date()) : undefined,
    gpa: generateRandomGPA(),
    totalCredits,
    birthDate: generateRandomDate(new Date(birthYear, 0, 1), new Date(birthYear, 11, 31)),
    birthPlace: [
      "Jakarta",
      "Bandung",
      "Surabaya",
      "Yogyakarta",
      "Semarang",
      "Medan",
      "Makassar",
      "Palembang",
      "Denpasar",
      "Padang",
    ][Math.floor(Math.random() * 10)],
    religion: religions[Math.floor(Math.random() * religions.length)],
    nationality:
      Math.random() > 0.9
        ? ["Malaysia", "Singapura", "Thailand", "Vietnam", "Filipina"][Math.floor(Math.random() * 5)]
        : "Indonesia",
    emergencyContact: {
      name: `${["Bapak", "Ibu"][Math.floor(Math.random() * 2)]} ${lastName}`,
      relationship: ["Ayah", "Ibu", "Kakak", "Paman", "Bibi"][Math.floor(Math.random() * 5)],
      phone: generateRandomPhone(),
    },
    documents: generateRandomDocuments(),
    notes:
      Math.random() > 0.7
        ? `Catatan untuk ${name}: ${["Memerlukan bimbingan khusus", "Aktif dalam kegiatan kampus", "Pernah mengajukan cuti", "Penerima beasiswa", "Memiliki prestasi akademik"][Math.floor(Math.random() * 5)]}`
        : undefined,
    createdAt: generateRandomDate(new Date(entryYear, 6, 1), new Date(entryYear, 8, 30)),
    updatedAt: generateRandomDate(new Date(2023, 0, 1), new Date()),
  }
})

