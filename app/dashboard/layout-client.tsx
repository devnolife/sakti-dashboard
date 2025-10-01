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

  // Function to get menu items based on role
  const getMenuItems = (role: string) => {
    return menuItems[role as Role] || []
  }

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  if (!user || !roleFromPath) {
    return null
  }

  return (
    <AppLayout
      role={roleFromPath}
      menuItems={getMenuItems(roleFromPath)}
      defaultSidebarOpen={defaultSidebarOpen}
    >
      {children}
    </AppLayout>
  )
}
