export type Role =
  | "mahasiswa"
  | "dosen"
  | "prodi"
  | "staff_tu"
  | "dekan"
  | "admin"
  | "laboratory_admin"
  | "reading_room_admin"
  | "admin_umum"
  | "admin_keuangan"
  | "gkm"
  | "kepala_tata_usaha"

export type DosenSubRole =
  | "dosen"
  | "dekan"
  | "wakil_dekan_1"
  | "wakil_dekan_2"
  | "wakil_dekan_3"
  | "wakil_dekan_4"
  | "prodi"
  | "sekretaris_prodi"
  | "gkm"

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
    displayName: "Administrasi Prodi",
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
  laboratory_admin: {
    displayName: "Admin Laboratorium",
    description: "Laboratory administrator role with access to lab management and scheduling.",
    icon: "flask",
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
  reading_room_admin: {
    displayName: "Admin Ruang Baca",
    description: "Library administrator role with access to book management and borrowing records.",
    icon: "book",
    color: "text-teal-500",
    bgColor: "bg-teal-100",
  },
  admin_umum: {
    displayName: "Administrasi Umum",
    description: "General staff role with access to basic administrative functions.",
    icon: "users",
    color: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  admin_keuangan: {
    displayName: "Administrasi Keuangan",
    description: "Finance administrator role with access to payment management and financial records.",
    icon: "dollar-sign",
    color: "text-emerald-500",
    bgColor: "bg-emerald-100",
  },
  gkm: {
    displayName: "Gugus Kendali Mutu",
    description: "Quality Control Group with access to quality monitoring, evaluation, and improvement systems.",
    icon: "clipboard-check",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  kepala_tata_usaha: {
    displayName: "Kepala Tata Usaha",
    description: "Head of Administrative Affairs with access to office management and administrative oversight.",
    icon: "crown",
    color: "text-amber-500",
    bgColor: "bg-amber-100",
  },
}

export const roleLabels = {
  mahasiswa: "Mahasiswa",
  staff_tu: "Administasi Prodi",
  prodi: "Kepala Program Studi",
  dekan: "Dekan",
  admin: "Admin",
  dosen: "Dosen",
  kepala_jurusan: "Kepala Jurusan",
  laboratory_admin: "Admin Laboratorium",
  reading_room_admin: "Admin Ruang Baca",
  admin_umum: "Staff Umum",
}

export const dosenSubRoleConfigs: Record<DosenSubRole, RoleConfig> = {
  dosen: {
    displayName: "Dosen",
    description: "Dosen pengajar dengan akses ke materi pengajaran, nilai mahasiswa, dan bimbingan akademik.",
    icon: "book-open",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  dekan: {
    displayName: "Dekan",
    description: "Dekan dengan akses ke manajemen fakultas dan fungsi pengawasan.",
    icon: "award",
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  wakil_dekan_1: {
    displayName: "Wakil Dekan I",
    description: "Wakil Dekan I bidang Akademik dengan akses ke kurikulum dan akademik.",
    icon: "graduation-cap",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  wakil_dekan_2: {
    displayName: "Wakil Dekan II",
    description: "Wakil Dekan II bidang Administrasi Umum, Perencanaan dan Keuangan.",
    icon: "calculator",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  wakil_dekan_3: {
    displayName: "Wakil Dekan III",
    description: "Wakil Dekan III bidang Kemahasiswaan dan Alumni.",
    icon: "users",
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  wakil_dekan_4: {
    displayName: "Wakil Dekan IV",
    description: "Wakil Dekan IV bidang Kerjasama dan Pengembangan.",
    icon: "handshake",
    color: "text-teal-500",
    bgColor: "bg-teal-100",
  },
  gkm: {
    displayName: "Gugus Kendali Mutu",
    description: "Gugus Kendali Mutu dengan akses ke monitoring, evaluasi, dan sistem perbaikan kualitas.",
    icon: "clipboard-check",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  prodi: {
    displayName: "Program Studi",
    description: "Kepala Program Studi dengan akses ke manajemen kurikulum dan administrasi program.",
    icon: "layout",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  sekretaris_prodi: {
    displayName: "Sekretaris Program Studi",
    description: "Sekretaris Program Studi dengan akses ke administrasi program dan dukungan akademik.",
    icon: "user-check",
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  },
}

export function getRolePath(role: Role) {
  // @ts-expect-error
  return roleConfigs[role].path
}

export function getRoleDisplayName(role: Role) {
  return roleConfigs[role].displayName
}

