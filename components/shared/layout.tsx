"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, AppHeader } from "@/components/shared"
import { roleConfigs } from "@/config/role-configs"

interface AppLayoutProps {
  children: React.ReactNode
  role: string
  menuItems: any[]
  defaultSidebarOpen?: boolean
}

export function AppLayout({ children, role, menuItems, defaultSidebarOpen = true }: AppLayoutProps) {

  const config = roleConfigs[role]
  if (!config) {
    throw new Error(`Role configuration not found for: ${role}`)
  }

  return (
    <SidebarProvider defaultOpen={defaultSidebarOpen}>
      <AppSidebar
        role={role}
        menuItems={menuItems}
        headerConfig={config.headerConfig}
        user={config.user}
        variant="inset"
      />
      <SidebarInset>
        <AppHeader role={role} />
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
