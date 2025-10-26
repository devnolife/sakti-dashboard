"use client"

import { useDosenSubRole } from "@/context/dosen-subrole-context"
import DynamicRoleSidebar from "@/components/dosen/dynamic-role-sidebar"
import DynamicRoleMobileMenu from "@/components/dosen/dynamic-role-mobile-menu"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"
import SubRoleSwitcher from "@/components/dosen/sub-role-switcher"
import SubRoleLoading from "@/components/dosen/sub-role-loading"
import { dosenSubRoleConfigs } from "@/types/role"
import type { ReactNode } from "react"
import type { Role } from "@/types/role"

interface DosenLayoutContentProps {
  children: ReactNode
}

export default function DosenLayoutContent({ children }: DosenLayoutContentProps) {
  const { isLoading, currentSubRole } = useDosenSubRole()
  const config = dosenSubRoleConfigs[currentSubRole]

  // Determine the effective role to display
  // For leadership sub-roles, map to the appropriate role
  const getEffectiveRole = (): Role => {
    switch (currentSubRole) {
      case 'dekan':
        return 'dekan'
      case 'gkm':
        return 'gkm'
      case 'prodi':
        return 'prodi'
      // wakil_dekan_*, sekretaris_prodi, and dosen use DynamicRoleSidebar
      default:
        return 'dosen'
    }
  }

  const effectiveRole = getEffectiveRole()
  const useDynamicSidebar = effectiveRole === 'dosen' // Only use dynamic sidebar for dosen role

  return (
    <>
      {isLoading && <SubRoleLoading />}
      <div className="flex min-h-screen">
        {useDynamicSidebar ? (
          <DynamicRoleSidebar key={`dosen-${currentSubRole}`} />
        ) : (
          <RoleSidebar key={`role-${effectiveRole}-${currentSubRole}`} role={effectiveRole} />
        )}
        <div className="flex-1 pt-14">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container flex justify-between items-center p-4 mx-auto md:px-6">
              <div>
                <h1 className="text-xl font-semibold">Dashboard {config.displayName}</h1>
                <p className="text-sm text-muted-foreground">{config.description}</p>
              </div>
              <SubRoleSwitcher />
            </div>
          </div>
          <div className="container p-4 mx-auto md:p-6">{children}</div>
          {useDynamicSidebar ? (
            <DynamicRoleMobileMenu key={`mobile-${currentSubRole}`} />
          ) : (
            <RoleMobileMenu key={`mobile-${effectiveRole}-${currentSubRole}`} role={effectiveRole} />
          )}
        </div>
      </div>
    </>
  )
}
