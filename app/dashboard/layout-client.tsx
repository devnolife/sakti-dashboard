"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useMemo } from "react"
import { AppLayout } from "@/components/shared"
import { menuItems, dosenSubRoleMenuItems, type MenuItem } from "@/config/menu-items"
import type { Role, DosenSubRole } from "@/types/role"
import { DosenSubRoleProvider } from "@/context/dosen-subrole-context"
import { GlobalLoading } from "@/components/ui/global-loading"
import { useKkpMenu } from "@/hooks/use-kkp-menu"

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

  // Use KKP menu hook for mahasiswa role
  const { menuItems: dynamicKkpMenuItems, isLoading: kkpMenuLoading } = useKkpMenu()

  // Function to get menu items based on role and sub-role
  const getMenuItems = (role: string): MenuItem[] => {
    // For dosen role, determine menu based on current path OR user's sub-role
    if (role === 'dosen') {
      // First priority: Check current path for specific wakil dekan routes
      // This allows any dosen to see the correct menu when navigating to WD pages
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
      if (pathname.includes('/dekan') && !pathname.includes('/vice-dean')) {
        return dosenSubRoleMenuItems.dekan
      }
      if (pathname.includes('/gkm')) {
        return dosenSubRoleMenuItems.gkm
      }
      if (pathname.includes('/prodi')) {
        return dosenSubRoleMenuItems.prodi
      }
      if (pathname.includes('/sekretaris-prodi')) {
        return dosenSubRoleMenuItems.sekretaris_prodi
      }

      // Second priority: If user has sub-role, use their primary sub-role menu
      if (user?.subRole) {
        const primarySubRole = user.subRole.split(',')[0].trim() as DosenSubRole
        return dosenSubRoleMenuItems[primarySubRole] || menuItems.dosen
      }

      // Default: regular dosen menu
      return menuItems.dosen
    }

    // For mahasiswa role, merge dynamic KKP menu with static menu items
    if (role === 'mahasiswa') {
      const staticMenuItems = menuItems.mahasiswa || []

      // Replace KKP menu item with dynamic KKP menu if available and loaded
      if (dynamicKkpMenuItems.length > 0 && !kkpMenuLoading) {
        return staticMenuItems.map(item => {
          if (item.id === 'kkp') {
            // Return dynamic KKP menu with proper structure
            return dynamicKkpMenuItems[0]
          }
          return item
        })
      }

      // Return static menu items while dynamic menu is loading or if failed to load
      return staticMenuItems
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

  const currentMenuItems = getMenuItems(effectiveRole)

  return (
    <DosenSubRoleProvider>
      <AppLayout
        role={effectiveRole}
        menuItems={currentMenuItems}
        defaultSidebarOpen={defaultSidebarOpen}
      >
        {children}
      </AppLayout>
    </DosenSubRoleProvider>
  )
}
