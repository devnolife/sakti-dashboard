/**
 * Quick Start Guide - Professional Layout Implementation
 * Copy and paste these examples to migrate your layouts
 */

// =============================================================================
// 1. REPLACE MAIN DASHBOARD LAYOUT
// =============================================================================

// File: app/dashboard/layout.tsx
// Replace the entire file with this:

"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { UnifiedDashboardLayout } from "@/components/layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

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

  return (
    <UnifiedDashboardLayout>
      {children}
    </UnifiedDashboardLayout>
  )
}

// =============================================================================
// 2. DOSEN LAYOUT WITH ROLE SWITCHER
// =============================================================================

// File: app/dashboard/dosen/layout.tsx
// Replace with this:

import type React from "react"
import { DosenSubRoleProvider } from "@/context/dosen-subrole-context"
import { UnifiedDashboardLayout } from "@/components/layout"
import { Toaster } from "@/components/ui/toaster"

export default function DosenLayout({ children }: { children: React.ReactNode }) {
  return (
    <DosenSubRoleProvider>
      <UnifiedDashboardLayout showRoleSwitcher>
        {children}
      </UnifiedDashboardLayout>
      <Toaster />
    </DosenSubRoleProvider>
  )
}

// =============================================================================
// 3. ADMIN LAYOUTS (MODERN DESIGN)
// =============================================================================

// File: app/dashboard/admin_keuangan/layout.tsx
// File: app/dashboard/admin_umum/layout.tsx
// File: app/dashboard/staff_tu/layout.tsx
// Replace with this:

import type React from "react"
import { UnifiedDashboardLayout } from "@/components/layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout forceModern>
      {children}
    </UnifiedDashboardLayout>
  )
}

// =============================================================================
// 4. MAHASISWA LAYOUT (LEGACY COMPATIBLE)
// =============================================================================

// File: app/dashboard/mahasiswa/layout.tsx
// Replace with this:

import type React from "react"
import { UnifiedDashboardLayout } from "@/components/layout"

export default function MahasiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout useLegacy>
      {children}
    </UnifiedDashboardLayout>
  )
}

// =============================================================================
// 5. LABORATORY ADMIN LAYOUT
// =============================================================================

// File: app/dashboard/laboratory_admin/layout.tsx
// Replace with this:

import type React from "react"
import { UnifiedDashboardLayout } from "@/components/layout"

export default function LabAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout forceModern>
      {children}
    </UnifiedDashboardLayout>
  )
}

// =============================================================================
// 6. GENERIC LAYOUT FOR ANY ROLE
// =============================================================================

// Use this template for any other role:

import type React from "react"
import { UnifiedDashboardLayout } from "@/components/layout"

export default function GenericLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout>
      {children}
    </UnifiedDashboardLayout>
  )
}

// =============================================================================
// 7. ADVANCED USAGE EXAMPLES
// =============================================================================

// With custom configuration:
export function AdvancedLayout({ children }: { children: React.ReactNode }) {
  return (
    <UnifiedDashboardLayout
      forceModern={true}
      showRoleSwitcher={false}
      className="custom-layout-class"
    >
      {children}
    </UnifiedDashboardLayout>
  )
}

// With conditional rendering:
export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  const isAdmin = ['admin', 'super_admin'].includes(user?.role || '')
  const isDosen = user?.role === 'dosen'

  return (
    <UnifiedDashboardLayout
      forceModern={isAdmin}
      showRoleSwitcher={isDosen}
    >
      {children}
    </UnifiedDashboardLayout>
  )
}

// =============================================================================
// 8. STEP-BY-STEP MIGRATION
// =============================================================================

/**
 * STEP 1: Backup your current layouts
 *
 * cd app/dashboard
 * mkdir backup
 * cp -r *.tsx backup/
 * cp -r */layout.tsx backup/
 */

/**
 * STEP 2: Replace main layout
 *
 * cp examples/quick-start.tsx app/dashboard/layout.tsx
 * # Edit and keep only the main layout code
 */

/**
 * STEP 3: Replace role-specific layouts
 *
 * # For each role directory, update layout.tsx
 * # Use the appropriate example from above
 */

/**
 * STEP 4: Test each role
 *
 * # Login as different roles and test:
 * # - Sidebar functionality
 * # - Header components
 * # - Mobile responsiveness
 * # - Role switcher (for dosen)
 */

/**
 * STEP 5: Clean up (optional)
 *
 * # Remove unused layout components if desired
 * # Update any direct imports to use unified system
 */

// =============================================================================
// 9. TROUBLESHOOTING
// =============================================================================

/**
 * Common Issues and Solutions:
 *
 * 1. "Module not found" error:
 *    - Make sure you have the latest layout components
 *    - Check import paths are correct
 *
 * 2. Role switcher not showing:
 *    - Add showRoleSwitcher={true} prop
 *    - Ensure DosenSubRoleProvider is wrapped around
 *
 * 3. Layout looks different:
 *    - Add useLegacy={true} for exact legacy appearance
 *    - Or use forceModern={true} for new design
 *
 * 4. Mobile menu not working:
 *    - Check that layout is properly wrapped
 *    - Mobile menu is handled automatically
 *
 * 5. TypeScript errors:
 *    - Import types: import type { UnifiedDashboardLayoutProps } from "@/components/layout"
 *    - Use proper TypeScript interfaces
 */

// =============================================================================
// 10. TESTING CHECKLIST
// =============================================================================

/**
 * Before going live, test these scenarios:
 *
 * ✅ Desktop Layout:
 * - [ ] Sidebar expands/collapses
 * - [ ] Header search works
 * - [ ] User dropdown functions
 * - [ ] Theme toggle works
 * - [ ] Notifications display
 *
 * ✅ Mobile Layout:
 * - [ ] Mobile menu opens/closes
 * - [ ] Responsive design works
 * - [ ] Touch interactions work
 * - [ ] Content doesn't overlap
 *
 * ✅ Role-Specific:
 * - [ ] Each role shows correct sidebar
 * - [ ] Dosen role switcher works
 * - [ ] Permissions are respected
 * - [ ] Navigation links work
 *
 * ✅ Performance:
 * - [ ] Page loads quickly
 * - [ ] Animations are smooth
 * - [ ] No console errors
 * - [ ] Memory usage is reasonable
 */

export default DashboardLayout