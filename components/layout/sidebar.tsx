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
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>
            {isOpen && (
              <div className="py-2 pl-4 mt-2 ml-6 space-y-2 border-l-2 border-gray-200">
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
        <div className="flex flex-col h-full">
          {/* Welcome Section - Fixed Top */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex items-center gap-3 p-4 border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <span className="text-sm font-bold text-white">D</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Dashboard</h3>
                <p className="text-xs text-gray-600">Laboratory Management</p>
              </div>
            </div>
          </div>

          {/* Main Navigation - Scrollable */}
          <div className="flex-1 px-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 transition-colors">
            <nav className="space-y-6 pb-6">
              {/* Quick Access Section */}
              <div>
                <h4 className="px-2 mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sticky top-0 bg-white py-2 z-10">
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
                <h4 className="px-2 mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase sticky top-0 bg-white py-2 z-10">
                  Management
                </h4>
                <div className="space-y-2">
                  {roleMenuItems.slice(3).map((item: any) => renderMenuItem(item))}
                </div>
              </div>
            </nav>
          </div>

          {/* User Profile - Fixed Bottom */}
          <div className="flex-shrink-0 p-6 pt-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 rounded-b-2xl">
            <div className="flex items-center gap-3 p-3 mb-4 bg-white border border-gray-100 shadow-sm rounded-xl">
              <Avatar className="border-2 shadow-md h-11 w-11 border-blue-500/20">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className="font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-600">
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
              className="justify-start w-full text-red-600 transition-all duration-200 border-red-200 hover:text-red-700 hover:bg-red-50 hover:border-red-300 rounded-xl"
              onClick={logout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

