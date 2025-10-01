import { cookies } from "next/headers"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { UniversalSidebar, UniversalHeader } from "@/components/shared"
import { roleConfigs } from "@/config/role-configs"

interface UniversalLayoutProps {
  children: React.ReactNode
  role: string
  menuItems: any[]
}

async function UniversalLayoutInner({ children, role, menuItems }: UniversalLayoutProps) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  const config = roleConfigs[role]
  if (!config) {
    throw new Error(`Role configuration not found for: ${role}`)
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <UniversalSidebar
        role={role}
        menuItems={menuItems}
        headerConfig={config.headerConfig}
        user={config.user}
        variant="inset"
      />
      <SidebarInset>
        <UniversalHeader role={role} />
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

export function UniversalLayout({ children, role, menuItems }: UniversalLayoutProps) {
  return <UniversalLayoutInner role={role} menuItems={menuItems}>{children}</UniversalLayoutInner>
}
