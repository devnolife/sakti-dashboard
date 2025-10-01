"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"

// Import the new unified layout system
import { UnifiedDashboardLayout } from "@/components/layout"

/**
 * Modern Dashboard Layout - Replace existing layout.tsx with this
 *
 * This is a drop-in replacement for the current dashboard layout
 * that provides a unified, modern experience across all roles.
 */
export default function ModernDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

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

  if (!user) {
    return null
  }

  // Determine if we should show role switcher (for dosen)
  const showRoleSwitcher = user.role === 'dosen'

  // Force modern layout for certain roles
  const forceModern = ['admin', 'super_admin', 'staff_tu'].includes(user.role)

  return (
    <UnifiedDashboardLayout
      forceModern={forceModern}
      showRoleSwitcher={showRoleSwitcher}
    >
      {children}
    </UnifiedDashboardLayout>
  )
}

/**
 * Usage Instructions:
 *
 * 1. Replace the current /app/dashboard/layout.tsx with this file
 * 2. Rename this file to layout.tsx
 * 3. Delete the old layout.tsx
 *
 * This will provide:
 * - Modern layout for admin roles
 * - Role-specific layouts for existing roles
 * - Backward compatibility
 * - Professional design system
 */
