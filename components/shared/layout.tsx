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

  // Use the menu items that were already correctly determined by layout-client.tsx
  // Don't override them here - layout-client.tsx already handles path-based menu selection
  let effectiveRole: Role = role as Role
  let effectiveMenuItems = initialMenuItems

  // Only change role for header/config purposes, but keep the menuItems from layout-client
  if (role === 'dosen' || availableSubRoles.length > 0) {
    // Map sub-roles to their effective roles (for header display only)
    switch (currentSubRole) {
      case 'dekan':
        effectiveRole = 'dekan'
        // Don't override menuItems - use what was passed from layout-client
        break
      case 'gkm':
        effectiveRole = 'gkm'
        // Don't override menuItems - use what was passed from layout-client
        break
      case 'prodi':
        effectiveRole = 'prodi'
        // Don't override menuItems - use what was passed from layout-client
        break
      case 'wakil_dekan_1':
      case 'wakil_dekan_2':
      case 'wakil_dekan_3':
      case 'wakil_dekan_4':
      case 'sekretaris_prodi':
      case 'dosen':
        effectiveRole = 'dosen'
        // Don't override menuItems - use what was passed from layout-client
        break
      default:
        effectiveRole = role as Role
        // Don't override menuItems - use what was passed from layout-client
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
