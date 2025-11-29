"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/context/auth-context"
import { usePathname } from "next/navigation"
import type { DosenSubRole } from "@/types/role"
import { parseUserSubRoles } from "@/lib/subrole-utils"

interface DosenSubRoleContextType {
  currentSubRole: DosenSubRole
  setCurrentSubRole: (subRole: DosenSubRole) => void
  availableSubRoles: DosenSubRole[]
  isLoading: boolean
}

const DosenSubRoleContext = createContext<DosenSubRoleContextType | undefined>(undefined)

interface DosenSubRoleProviderProps {
  children: ReactNode
  availableSubRoles?: DosenSubRole[]
}

export function DosenSubRoleProvider({
  children,
  availableSubRoles
}: DosenSubRoleProviderProps) {
  const { user } = useAuth()
  const pathname = usePathname()

  // Get user's available subroles from user data, only use provided ones as fallback
  // This ensures we only show subroles that the user actually has access to
  const userAvailableSubRoles = user?.subRole ? parseUserSubRoles(user.subRole) : (availableSubRoles || ["dosen"])

  // Determine subrole from current path
  const getSubRoleFromPath = (path: string): DosenSubRole => {
    if (path === '/dashboard/dekan') return 'dekan'
    if (path === '/dashboard/gkm') return 'gkm'
    if (path === '/dashboard/prodi') return 'prodi'
    if (path.startsWith('/dashboard/dosen/vice-dean-1')) return 'wakil_dekan_1'
    if (path.startsWith('/dashboard/dosen/vice-dean-2')) return 'wakil_dekan_2'
    if (path.startsWith('/dashboard/dosen/vice-dean-3')) return 'wakil_dekan_3'
    if (path.startsWith('/dashboard/dosen/vice-dean-4')) return 'wakil_dekan_4'
    return 'dosen'
  }

  // Initialize from path or localStorage or default to "dosen" as base role
  const [currentSubRole, setCurrentSubRole] = useState<DosenSubRole>(() => {
    const pathBasedSubRole = getSubRoleFromPath(pathname)
    if (pathBasedSubRole !== 'dosen' && userAvailableSubRoles.includes(pathBasedSubRole)) {
      return pathBasedSubRole
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("current-subrole")
      if (saved && userAvailableSubRoles.includes(saved as DosenSubRole)) {
        return saved as DosenSubRole
      }
    }
    // Always default to "dosen" as base role if available, otherwise first available
    return userAvailableSubRoles.includes("dosen") ? "dosen" : (userAvailableSubRoles[0] || "dosen")
  })
  const [isLoading, setIsLoading] = useState(false)

  // Sync subrole with current path - only update if user has access to the detected subrole
  useEffect(() => {
    if (!user || userAvailableSubRoles.length === 0) return

    const pathBasedSubRole = getSubRoleFromPath(pathname)

    // Only update if the path-based subrole is different, available to user, and not just a dosen path
    if (pathBasedSubRole !== currentSubRole &&
      pathBasedSubRole !== 'dosen' &&
      userAvailableSubRoles.includes(pathBasedSubRole)) {
      setCurrentSubRole(pathBasedSubRole)
      if (typeof window !== "undefined") {
        localStorage.setItem("current-subrole", pathBasedSubRole)
      }
    }
    // If we're on a dosen path and current is not dosen, update to dosen (if available)
    else if (pathBasedSubRole === 'dosen' &&
      currentSubRole !== 'dosen' &&
      pathname === '/dashboard/dosen' &&
      userAvailableSubRoles.includes('dosen')) {
      setCurrentSubRole('dosen')
      if (typeof window !== "undefined") {
        localStorage.setItem("current-subrole", 'dosen')
      }
    }
  }, [pathname, currentSubRole, userAvailableSubRoles, user])

  const handleSetCurrentSubRole = (subRole: DosenSubRole) => {
    setIsLoading(true)
    setCurrentSubRole(subRole)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("current-subrole", subRole)
    }

    // Short delay to show loading then hide it
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <DosenSubRoleContext.Provider
      value={{
        currentSubRole,
        setCurrentSubRole: handleSetCurrentSubRole,
        availableSubRoles: userAvailableSubRoles,
        isLoading,
      }}
    >
      {children}
    </DosenSubRoleContext.Provider>
  )
}

export function useDosenSubRole() {
  const context = useContext(DosenSubRoleContext)
  if (context === undefined) {
    throw new Error("useDosenSubRole must be used within a DosenSubRoleProvider")
  }
  return context
}
