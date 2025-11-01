"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, AppHeader } from "@/components/shared"
import { roleConfigs } from "@/config/role-configs"
import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { menuItems as allMenuItems } from "@/config/menu-items"
import SubRoleSwitcher from "@/components/dosen/sub-role-switcher"
import type { Role } from "@/types/role"

interface AppLayoutProps {
  children: React.ReactNode
  role: string
  menuItems: any[]
  defaultSidebarOpen?: boolean
}

export function AppLayout({ children, role, menuItems: initialMenuItems, defaultSidebarOpen = true }: AppLayoutProps) {
  const { currentSubRole, availableSubRoles } = useDosenSubRole()
  
  // Determine effective role based on currentSubRole
  // If user has multiple sub-roles and is switching, use the currentSubRole
  let effectiveRole: Role = role as Role
  let effectiveMenuItems = initialMenuItems
  
  // Only apply sub-role logic if user is dosen or has dosen-related sub-roles
  if (role === 'dosen' || availableSubRoles.length > 0) {
    // Map sub-roles to their effective roles
    switch (currentSubRole) {
      case 'dekan':
        effectiveRole = 'dekan'
        effectiveMenuItems = allMenuItems['dekan'] || initialMenuItems
        break
      case 'gkm':
        effectiveRole = 'gkm'
        effectiveMenuItems = allMenuItems['gkm'] || initialMenuItems
        break
      case 'prodi':
        effectiveRole = 'prodi'
        effectiveMenuItems = allMenuItems['prodi'] || initialMenuItems
        break
      case 'wakil_dekan_1':
      case 'wakil_dekan_2':
      case 'wakil_dekan_3':
      case 'wakil_dekan_4':
      case 'sekretaris_prodi':
      case 'dosen':
        effectiveRole = 'dosen'
        effectiveMenuItems = allMenuItems['dosen'] || initialMenuItems
        break
      default:
        effectiveRole = role as Role
        effectiveMenuItems = initialMenuItems
    }
  }

  const config = roleConfigs[effectiveRole]
  if (!config) {
    throw new Error(`Role configuration not found for: ${effectiveRole}`)
  }

  // Check if user has multiple sub-roles (show switcher)
  const showSubRoleSwitcher = availableSubRoles.length > 1

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AppSidebar
        role={effectiveRole}
        menuItems={effectiveMenuItems}
        headerConfig={config.headerConfig}
        user={config.user}
        variant="inset"
      />
      <SidebarInset>
        <div className="flex items-center justify-between gap-4 px-4 h-16">
          <AppHeader role={effectiveRole} />
          {showSubRoleSwitcher && (
            <div className="flex-shrink-0">
              <SubRoleSwitcher />
            </div>
          )}
        </div>
        <div
          className="@container/main flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6"
          style={
            {
              "--sidebar-width": "18rem",
              "--sidebar-width-icon": "3rem",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
