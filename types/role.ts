export type Role = "mahasiswa" | "staff_tu" | "prodi" | "dekan" | "admin" | "staff_kkp" | "lecturer" | "kepala_jurusan"

export const roleConfigs = {
  mahasiswa: {
    path: "/dashboard/mahasiswa",
    displayName: "Mahasiswa",
  },
  staff_tu: {
    path: "/dashboard/staff_tu",
    displayName: "Staff TU",
  },
  prodi: {
    path: "/dashboard/prodi",
    displayName: "Kepala Program Studi",
  },
  dekan: {
    path: "/dashboard/dekan",
    displayName: "Dekan",
  },
  admin: {
    path: "/dashboard/admin",
    displayName: "Admin",
  },
  staff_kkp: {
    path: "/dashboard/staff_kkp",
    displayName: "Staff KKP",
  },
  lecturer: {
    path: "/dashboard/lecturer",
    displayName: "Dosen",
  },
  kepala_jurusan: {
    path: "/dashboard/kepala_jurusan",
    displayName: "Kepala Jurusan",
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
}

export function getRolePath(role: Role) {
  return roleConfigs[role].path
}

export function getRoleDisplayName(role: Role) {
  return roleConfigs[role].displayName
}

