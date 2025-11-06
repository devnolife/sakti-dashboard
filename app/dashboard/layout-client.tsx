"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { AppLayout } from "@/components/shared"
import { menuItems, dosenSubRoleMenuItems } from "@/config/menu-items"
import type { Role, DosenSubRole } from "@/types/role"
import { DosenSubRoleProvider } from "@/context/dosen-subrole-context"
import { GlobalLoading } from "@/components/ui/global-loading"

interface DashboardLayoutClientProps {
  children: React.ReactNode
  defaultSidebarOpen: boolean
}

export function DashboardLayoutClient({
  children,
  defaultSidebarOpen,
}: DashboardLayoutClientProps) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const roleFromPath = pathname.split('/')[2] // /dashboard/[role]/...
  const userRole = user?.role

  // Function to get menu items based on role and sub-role
  const getMenuItems = (role: string) => {
    // For dosen role, check if user has sub-role and determine menu based on current path
    if (role === 'dosen' && user?.subRole) {
      // Extract sub-role from path for wakil dekan routes
      // e.g., /dashboard/dosen/vice-dean-1 -> wakil_dekan_1
      if (pathname.includes('/vice-dean-1')) {
        return dosenSubRoleMenuItems.wakil_dekan_1
      }
      if (pathname.includes('/vice-dean-2')) {
        return dosenSubRoleMenuItems.wakil_dekan_2
      }
      if (pathname.includes('/vice-dean-3')) {
        return dosenSubRoleMenuItems.wakil_dekan_3
      }
      if (pathname.includes('/vice-dean-4')) {
        return dosenSubRoleMenuItems.wakil_dekan_4
      }

      // For other dosen sub-roles, use their primary sub-role menu
      const primarySubRole = user.subRole.split(',')[0].trim() as DosenSubRole
      return dosenSubRoleMenuItems[primarySubRole] || menuItems.dosen
    }

    return menuItems[role as Role] || []
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Redirect to role-specific dashboard if accessing /dashboard without role
  useEffect(() => {
    if (!isLoading && user && pathname === "/dashboard" && userRole) {
      router.push(`/dashboard/${userRole}`)
    }
  }, [isLoading, user, pathname, userRole, router])

  if (isLoading) {
    return <GlobalLoading text="Loading..." className="h-screen" />
  }

  if (!user) {
    return null
  }

  // Use roleFromPath or fallback to user's role
  const effectiveRole = roleFromPath || userRole

  if (!effectiveRole) {
    return null
  }

  return (
    <DosenSubRoleProvider>
      <AppLayout
        role={effectiveRole}
        menuItems={getMenuItems(effectiveRole)}
        defaultSidebarOpen={defaultSidebarOpen}
      >
        {children}
      </AppLayout>
    </DosenSubRoleProvider>
  )
}
