"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRole } from "@/context/role-context"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { menuItems } from "@/config/menu-items"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

interface SidebarProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
  className?: string
}

export default function Sidebar({ activeSection, setActiveSection, className }: SidebarProps) {
  const pathname = usePathname()
  const { role } = useRole()
  const { user, logout } = useAuth()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize open sections based on current path
  useEffect(() => {
    const sections: Record<string, boolean> = {}

    // Extract path segments to determine which sections should be open
    const pathSegments = pathname.split("/").filter(Boolean)

    // Open sections based on path
    if (pathSegments.length > 1) {
      // First level menu items
      const mainSection = pathSegments[1]
      sections[mainSection] = true

      // Check for deeper paths
      if (pathSegments.length > 2) {
        const subSection = `${mainSection}-${pathSegments[2]}`
        sections[subSection] = true

        // Even deeper paths
        if (pathSegments.length > 3) {
          const deepSection = `${subSection}-${pathSegments[3]}`
          sections[deepSection] = true
        }
      }
    }

    setOpenSections(sections)
  }, [pathname])

  // Get the appropriate menu items for the current role
  const roleMenuItems = menuItems[role] || menuItems.mahasiswa

  // Check if a path is active
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  // Toggle section open/closed state
  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  // Render menu items recursively
  const renderMenuItem = (item: any, level = 0) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openSections[item.id]
    const isChildActive = hasChildren && item.children?.some((child: any) => isActive(child.href))

    return (
      <div key={item.id} className={cn("flex flex-col", level > 0 && "ml-3")}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleSection(item.id)}
              className={cn(
                "flex items-center justify-between w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ease-out group",
                active || isChildActive
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md",
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <item.icon
                    className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                      active || isChildActive ? "text-white" : "text-gray-600")}
                  />
                )}
                <span>{item.title}</span>
                {item.badge && item.id !== "notifications" && (
                  <Badge
                    variant={item.badge.variant}
                    className={cn(
                      "ml-2 text-[10px] px-1 py-0 h-4",
                      item.badge.variant === "outline" ? "bg-primary/10 text-primary" : "",
                    )}
                  >
                    {item.badge.text}
                  </Badge>
                )}
              </div>
              <div className="transition-transform duration-200">
                {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </button>
            {isOpen && (
              <div className="mt-2 space-y-2 border-l-2 border-gray-200 pl-4 ml-6 py-2">
                {item.children?.map((child: any) => renderMenuItem(child, level + 1))}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ease-out group",
              active
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:shadow-md",
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <item.icon
                  className={cn("h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                    active ? "text-white" : "text-gray-600")}
                />
              )}
              <span>{item.title}</span>
            </div>
            {item.badge && item.id !== "notifications" && (
              <Badge
                variant={item.badge.variant}
                className={cn(
                  "text-[10px] px-1 py-0 h-4",
                  item.badge.variant === "outline" ? "bg-primary/10 text-primary" : "",
                )}
              >
                {item.badge.text}
              </Badge>
            )}
          </Link>
        )}
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <aside
        className={cn(
          "fixed left-4 top-20 z-30 hidden h-[calc(100vh-6rem)] w-64 bg-white lg:block rounded-2xl shadow-2xl border border-gray-200/60 backdrop-blur-sm",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 scrollbar-hide">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Dashboard</h3>
                  <p className="text-xs text-gray-600">Laboratory Management</p>
                </div>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-6">
              {/* Quick Access Section */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Quick Access
                </h4>
                <div className="space-y-2">
                  {roleMenuItems.slice(0, 3).map((item: any) => renderMenuItem(item))}
                </div>
              </div>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

              {/* Management Section */}
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Management
                </h4>
                <div className="space-y-2">
                  {roleMenuItems.slice(3).map((item: any) => renderMenuItem(item))}
                </div>
              </div>
            </nav>
          </div>

        {/* User Profile */}
        <div className="border-t border-gray-100 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-2xl">
          <div className="mb-4 flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100">
            <Avatar className="h-11 w-11 border-2 border-blue-500/20 shadow-md">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                {user?.name?.substring(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">{user?.name || "User"}</span>
              <span className="text-xs text-gray-500">{user?.username || "username"}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 rounded-xl transition-all duration-200"
            onClick={logout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
    </>
  )
}

