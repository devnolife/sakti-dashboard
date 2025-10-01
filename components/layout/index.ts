/**
 * @fileoverview Professional Layout System - Unified Dashboard Components
 * @author SAKTI Dashboard Team
 * @version 2.0.0
 */

// =============================================================================
// MODERN LAYOUT SYSTEM (Recommended)
// =============================================================================

/**
 * Unified Dashboard Layout - Main entry point
 * Automatically chooses the best layout based on role and configuration
 */
export { default as UnifiedDashboardLayout } from "./unified-dashboard-layout"
export type { UnifiedDashboardLayoutProps } from "./unified-dashboard-layout"

/**
 * Modern Sidebar - Latest sidebar component with advanced features
 * Features: Collapsible, animations, tooltips, mobile-responsive
 */
export { default as ModernSidebar } from "./modern-sidebar"

/**
 * Modern Header - Latest header component with search, notifications, etc.
 * Features: Dynamic title, search, notifications, theme toggle, user menu
 */
export { default as ModernHeader } from "./modern-header"

/**
 * Complete Modern Layout - For direct usage
 * Use when you want to force modern design
 */
export { default as DashboardLayout } from "./dashboard-layout"

// =============================================================================
// LEGACY COMPATIBILITY LAYER
// =============================================================================

/**
 * @deprecated Use UnifiedDashboardLayout instead
 * Legacy sidebar - maintained for backward compatibility
 */
export { default as Sidebar } from "./sidebar"

/**
 * @deprecated Use UnifiedDashboardLayout instead
 * Legacy header - maintained for backward compatibility
 */
export { default as Header } from "./header"

// =============================================================================
// ROLE-BASED COMPONENTS (For specific use cases)
// =============================================================================

/**
 * Role-based sidebar - For when you need role-specific behavior
 * Used internally by UnifiedDashboardLayout
 */
export { default as RoleSidebar } from "../role/role-sidebar"

/**
 * Dynamic role sidebar - For dosen with sub-roles
 * Used internally by UnifiedDashboardLayout
 */
export { default as DynamicRoleSidebar } from "../dosen/dynamic-role-sidebar"

/**
 * Role-based mobile menu
 * Used internally by UnifiedDashboardLayout
 */
export { default as RoleMobileMenu } from "../role/role-mobile-menu"

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Determine if a role should use modern layout by default
 */
export function shouldUseModernLayout(role: string): boolean {
  const modernRoles = ['admin', 'super_admin', 'staff_tu', 'admin_keuangan', 'admin_umum']
  return modernRoles.includes(role)
}

/**
 * Get the appropriate layout component for a role
 */
export function getLayoutForRole(role: string) {
  if (shouldUseModernLayout(role)) {
    return UnifiedDashboardLayout
  }

  // Role-specific layouts
  switch (role) {
    case 'dosen':
      return UnifiedDashboardLayout // Will use dosen-specific layout internally
    case 'mahasiswa':
      return UnifiedDashboardLayout // Will use mahasiswa layout internally
    default:
      return UnifiedDashboardLayout
  }
}

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export interface ModernLayoutProps extends LayoutProps {
  forceModern?: boolean
  showRoleSwitcher?: boolean
  sidebarCollapsed?: boolean
}

export interface LegacyLayoutProps extends LayoutProps {
  role?: string
  activeSection?: string
  setActiveSection?: (section: string) => void
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: '7rem',
  SIDEBAR_WIDTH_EXPANDED: '16rem',
  SIDEBAR_WIDTH_COLLAPSED: '4rem',
  SIDEBAR_WIDTH_MOBILE: '20rem',
  Z_INDEX: {
    SIDEBAR: 40,
    MOBILE_OVERLAY: 45,
    HEADER: 50,
    DROPDOWN: 60,
    MODAL: 70,
    TOAST: 80
  }
} as const

// =============================================================================
// MIGRATION GUIDE
// =============================================================================

/**
 * Migration from old layout system:
 *
 * OLD:
 * ```tsx
 * import Sidebar from "@/components/layout/sidebar"
 * import Header from "@/components/layout/header"
 *
 * <div>
 *   <Sidebar role={role} />
 *   <Header />
 *   <main>{children}</main>
 * </div>
 * ```
 *
 * NEW:
 * ```tsx
 * import { UnifiedDashboardLayout } from "@/components/layout"
 *
 * <UnifiedDashboardLayout>
 *   {children}
 * </UnifiedDashboardLayout>
 * ```
 *
 * MODERN (Forced):
 * ```tsx
 * import { UnifiedDashboardLayout } from "@/components/layout"
 *
 * <UnifiedDashboardLayout forceModern>
 *   {children}
 * </UnifiedDashboardLayout>
 * ```
 *
 * WITH ROLE SWITCHER (for dosen):
 * ```tsx
 * import { UnifiedDashboardLayout } from "@/components/layout"
 *
 * <UnifiedDashboardLayout showRoleSwitcher>
 *   {children}
 * </UnifiedDashboardLayout>
 * ```
 */