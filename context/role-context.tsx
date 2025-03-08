"use client"

import { useState, useEffect } from "react"
import { createContext, useContext, type ReactNode } from "react"

// Define the available roles
export type Role =
  | "mahasiswa"
  | "staff_tu"
  | "prodi"
  | "dekan"
  | "admin"
  | "staff_kkp"
  | "lecturer"
  | "kepala_jurusan"
  | "laboratory_admin"

// Configuration for each role
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
  laboratory_admin: {
    path: "/dashboard/laboratory_admin",
    displayName: "Admin Laboratorium",
  },
}

// Labels for role selection
export const roleLabels: Record<Role, string> = {
  mahasiswa: "Mahasiswa",
  staff_tu: "Staff TU",
  prodi: "Kepala Program Studi",
  dekan: "Dekan",
  admin: "Admin",
  staff_kkp: "Staff KKP",
  lecturer: "Dosen",
  kepala_jurusan: "Kepala Jurusan",
  laboratory_admin: "Admin Laboratorium",
}

interface RoleContextType {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({
  children,
  initialRole = "mahasiswa",
}: {
  children: ReactNode
  initialRole?: Role
}) {
  const [role, setRole] = useState<Role>(initialRole)

  // Check for user in localStorage and sync role
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          if (user && user.role) {
            setRole(user.role)
          }
        } catch (error) {
          console.error("Error parsing user from localStorage:", error)
        }
      }
    }
  }, [])

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

export function getRolePath(role: Role) {
  return roleConfigs[role].path
}

export function getRoleDisplayName(role: Role) {
  return roleConfigs[role].displayName
}

