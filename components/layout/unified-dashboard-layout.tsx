"use client"

import { useState, useEffect, ReactNode } from "react"
import { useAuth } from "@/context/auth-context"
import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import type { Role } from "@/types/role"

// Modern components
import ModernSidebar from "./modern-sidebar"
import ModernHeader from "./modern-header"

// Legacy/Role-specific components (for backward compatibility)
import RoleSidebar from "@/components/role/role-sidebar"
import DynamicRoleSidebar from "@/components/dosen/dynamic-role-sidebar"
import SubRoleSwitcher from "@/components/dosen/sub-role-switcher"

// Mobile menus
import RoleMobileMenu from "@/components/role/role-mobile-menu"
import DynamicRoleMobileMenu from "@/components/dosen/dynamic-role-mobile-menu"

// Styles
import "./layout-styles.css"

interface UnifiedDashboardLayoutProps {
  children: ReactNode
  forceModern?: boolean // Force use modern layout
  useLegacy?: boolean // Force use legacy layout
  showRoleSwitcher?: boolean // Show role switcher (for dosen)
  className?: string
}

export default function UnifiedDashboardLayout({
  children,
  forceModern = false,
  useLegacy = false,
  showRoleSwitcher = false,
  className
}: UnifiedDashboardLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const { isLoading: dosenLoading, currentSubRole } = useDosenSubRole()
  const [mounted, setMounted] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.style.setProperty('--header-height', '7rem')
  }, [])

  // Loading state
  if (isLoading || !mounted) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return null
  }

  // Dosen with sub-role loading
  if (user.role === 'dosen' && dosenLoading && !forceModern) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading role...</span>
      </div>
    )
  }

  // Determine which layout to use
  const useModernLayout = forceModern || (!useLegacy && shouldUseModernLayout(user.role))

  if (useModernLayout) {
    return (
      <ModernLayoutWrapper
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        showRoleSwitcher={showRoleSwitcher}
        className={className}
      >
        {children}
      </ModernLayoutWrapper>
    )
  }

  // Legacy layout for backward compatibility
  return (
    <LegacyLayoutWrapper
      user={user}
      showRoleSwitcher={showRoleSwitcher}
      className={className}
    >
      {children}
    </LegacyLayoutWrapper>
  )
}

// Modern layout wrapper
function ModernLayoutWrapper({
  children,
  sidebarCollapsed,
  setSidebarCollapsed,
  showRoleSwitcher,
  className
}: {
  children: ReactNode
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
  showRoleSwitcher: boolean
  className?: string
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Modern Sidebar */}
      <ModernSidebar className={className} />

      {/* Modern Header */}
      <ModernHeader
        sidebarCollapsed={sidebarCollapsed}
        onMobileMenuToggle={() => { }}
        showRoleSwitcher={showRoleSwitcher}
      />

      {/* Header Spacer for mobile */}
      <div className="header-spacer lg:hidden" />

      {/* Main Content */}
      <main
        className={cn(
          "main-content transition-all duration-300",
          "pb-8 custom-scrollbar",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-68",
          "px-4 lg:px-8"
        )}
      >
        <div className="mx-auto max-w-7xl">
          <div className="content-spacing">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

// Legacy layout wrapper
function LegacyLayoutWrapper({
  children,
  user,
  showRoleSwitcher,
  className
}: {
  children: ReactNode
  user: any
  showRoleSwitcher: boolean
  className?: string
}) {
  const { currentSubRole } = useDosenSubRole()

  // Determine the effective role to display
  // For dosen with leadership sub-roles, map to the appropriate role
  const getEffectiveRole = (): Role => {
    if (user.role === 'dosen' && currentSubRole) {
      // Map leadership sub-roles to their corresponding roles
      switch (currentSubRole) {
        case 'dekan':
          return 'dekan'
        case 'gkm':
          return 'gkm'
        case 'prodi':
          return 'prodi'
        // wakil_dekan_* and other sub-roles should use DynamicRoleSidebar
        default:
          return user.role
      }
    }
    return user.role
  }

  const effectiveRole = getEffectiveRole()
  const useDynamicSidebar = user.role === 'dosen' &&
    showRoleSwitcher &&
    effectiveRole === 'dosen' // Only use dynamic sidebar for actual dosen role

  // Dosen layout with dynamic sidebar (for dosen, wakil dekan, sekretaris prodi)
  if (useDynamicSidebar) {
    return (
      <div className="flex min-h-screen">
        <DynamicRoleSidebar key={`dosen-${currentSubRole}`} />
        <div className="flex-1 pt-14">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container flex items-center justify-between p-4 mx-auto md:px-6">
              <div>
                <h1 className="text-xl font-semibold">Dashboard Dosen</h1>
                <p className="text-sm text-muted-foreground">Kelola peran dan akses sesuai jabatan Anda</p>
              </div>
              <SubRoleSwitcher />
            </div>
          </div>
          <div className="container p-4 mx-auto md:p-6">{children}</div>
          <DynamicRoleMobileMenu key={`mobile-${currentSubRole}`} />
        </div>
      </div>
    )
  }

  // Standard role-based layout (for dekan, gkm, prodi when they are sub-roles of dosen)
  return (
    <div className={cn(
      "relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50",
      className
    )}>
      <RoleSidebar key={`role-${effectiveRole}-${currentSubRole || ''}`} role={effectiveRole} />

      <div className="lg:pl-64">
        {showRoleSwitcher && user.role === 'dosen' && (
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container flex items-center justify-between p-4 mx-auto md:px-6">
              <div>
                <h1 className="text-xl font-semibold">Dashboard {effectiveRole === 'dekan' ? 'Dekan' : effectiveRole === 'gkm' ? 'GKM' : 'Prodi'}</h1>
                <p className="text-sm text-muted-foreground">Kelola peran dan akses sesuai jabatan Anda</p>
              </div>
              <SubRoleSwitcher />
            </div>
          </div>
        )}
        <div className="px-4 pb-8 md:px-6 lg:px-8">
          {children}
        </div>
      </div>

      <RoleMobileMenu key={`mobile-${effectiveRole}-${currentSubRole || ''}`} role={effectiveRole} />
    </div>
  )
}

// Utility function to determine modern layout usage
function shouldUseModernLayout(role: string): boolean {
  // Add roles that should use modern layout by default
  const modernRoles = ['admin', 'super_admin', 'staff_tu']
  return modernRoles.includes(role)
}

// Export individual components for direct usage
export { ModernSidebar, ModernHeader }
export type { UnifiedDashboardLayoutProps }
