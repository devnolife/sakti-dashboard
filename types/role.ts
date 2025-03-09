export type Role = "mahasiswa" | "staff_tu" | "prodi" | "dekan" | "admin" | "lecturer | admin_laboratorium"

export const roleConfigs = {
  mahasiswa: {
    path: "/dashboard/mahasiswa",
    displayName: "Mahasiswa",
  },
  staff_tu: {
    path: "/dashboard/staff_tu",
    displayName: "Prodi TU",
  },
  prodi: {
    path: "/dashboard/prodi",
    displayName: "Ketua Prodi",
  },
  dekan: {
    path: "/dashboard/dekan",
    displayName: "Dekan",
  },
  admin: {
    path: "/dashboard/admin",
    displayName: "Admin",
  },
  lecturer: {
    path: "/dashboard/lecturer",
    displayName: "Dosen",
  },
  laboratory_admin: {
    path :"/dashboard/laboratory_admin",
    displayName: "Admin Laboratorium"
  }
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

