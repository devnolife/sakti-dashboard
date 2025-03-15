export type Role = 
  |"mahasiswa" 
  | "staff_tu" 
  | "prodi" 
  | "dekan" 
  | "admin" 
  | "lecturer" 
  | "admin_laboratorium"
  | "admin_umum"

export const roleConfigs = {
  mahasiswa: {
    path: "/dashboard/mahasiswa",
    displayName: "Mahasiswa",
  },
  staff_tu: {
    path: "/dashboard/staff_tu",
    displayName: "Administrasi Prodi",
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
  },
  admin_umum: {
     path :"/dashboard/admin_umum",
     displayName: "Administrasi Umum"
  },
}

export const roleLabels = {
  mahasiswa: "Mahasiswa",
  staff_tu: "Admin Prodi",
  prodi: "Ketua Program Studi",
  dekan: "Dekan",
  admin: "Admin",
  lecturer: "Dosen",
  laboratory_admin: "Admin Laboratorium",
  admin_umum: "Admin Umum"
}

export function getRolePath(role: Role) {
  return roleConfigs[role].path
}

export function getRoleDisplayName(role: Role) {
  return roleConfigs[role].displayName
}

