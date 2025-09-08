"use client"

import React, { createContext, useContext, useState, type ReactNode } from "react"
import type { DosenSubRole } from "@/types/role"

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
  availableSubRoles = ["dosen", "dekan", "wakil_dekan_1", "wakil_dekan_2", "wakil_dekan_3", "wakil_dekan_4", "gkm", "prodi"]
}: DosenSubRoleProviderProps) {
  const [currentSubRole, setCurrentSubRole] = useState<DosenSubRole>("dosen")
  const [isLoading, setIsLoading] = useState(false)

  const handleSetCurrentSubRole = (subRole: DosenSubRole) => {
    setIsLoading(true)
    setCurrentSubRole(subRole)
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
        availableSubRoles,
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