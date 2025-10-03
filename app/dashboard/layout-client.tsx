"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { AppLayout } from "@/components/shared"
import { menuItems } from "@/config/menu-items"
import type { Role } from "@/types/role"

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

  // Function to get menu items based on role
  const getMenuItems = (role: string) => {
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
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
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
    <AppLayout
      role={effectiveRole}
      menuItems={getMenuItems(effectiveRole)}
      defaultSidebarOpen={defaultSidebarOpen}
    >
      {children}
    </AppLayout>
  )
}
