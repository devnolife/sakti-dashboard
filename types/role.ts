export type Role =
  | "mahasiswa"
  | "dosen"
  | "prodi"
  | "staff_tu"
  | "dekan"
  | "admin"
  | "staff_kkp"
  | "laboratory_admin"
  | "reading_room_admin"
  | "staff_umum"
  | "admin_keuangan"

export interface RoleConfig {
  displayName: string
  description: string
  icon: string
  color: string
  bgColor: string
}

export const roleConfigs: Record<Role, RoleConfig> = {
  mahasiswa: {
    displayName: "Mahasiswa",
    description: "Student role with access to academic information, course registration, and grades.",
    icon: "user",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  dosen: {
    displayName: "Dosen",
    description: "Lecturer role with access to teaching materials, student grades, and academic advising.",
    icon: "book-open",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  prodi: {
    displayName: "Program Studi",
    description: "Department role with access to curriculum management and program administration.",
    icon: "layout",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  staff_tu: {
    displayName: "Staff TU",
    description: "Administrative staff role with access to student records and administrative functions.",
    icon: "clipboard",
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  dekan: {
    displayName: "Dekan",
    description: "Dean role with access to faculty management and oversight functions.",
    icon: "award",
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  admin: {
    displayName: "Admin",
    description: "System administrator role with full access to all system functions.",
    icon: "settings",
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  },
  staff_kkp: {
    displayName: "Staff KKP",
    description: "KKP staff role with access to internship and practical work management.",
    icon: "briefcase",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  laboratory_admin: {
    displayName: "Laboratory Admin",
    description: "Laboratory administrator role with access to lab management and scheduling.",
    icon: "flask",
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  reading_room_admin: {
    displayName: "Reading Room Admin",
    description: "Library administrator role with access to book management and borrowing records.",
    icon: "book",
    color: "text-teal-500",
    bgColor: "bg-teal-100",
  },
  staff_umum: {
    displayName: "Staff Umum",
    description: "General staff role with access to basic administrative functions.",
    icon: "users",
    color: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  admin_keuangan: {
    displayName: "Admin Keuangan",
    description: "Finance administrator role with access to payment management and financial records.",
    icon: "dollar-sign",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
}

export const roleLabels = {
  mahasiswa: "Mahasiswa",
  staff_tu: "Staff TU",
  prodi: "Kepala Program Studi",
  dekan: "Dekan",
  admin: "Admin",
  staff_kkp: "Staff KKP",
  lecturer: "Dosen",
  kepala_jurusan: "Kepala Jurusan",
  laboratory_admin: "Admin Laboratorium",
  reading_room_admin: "Admin Ruang Baca",
  staff_umum: "Staff Umum",
}

export function getRolePath(role: Role) {
  // @ts-expect-error
  return roleConfigs[role].path
}

export function getRoleDisplayName(role: Role) {
  return roleConfigs[role].displayName
}

