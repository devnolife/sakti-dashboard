"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRole } from "@/context/role-context"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, LogOut, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { menuItems } from "@/config/menu-items"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ModernSidebarProps {
  className?: string
}

export default function ModernSidebar({ className }: ModernSidebarProps) {
  const pathname = usePathname()
  const { role } = useRole()
  const { user, logout } = useAuth()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize open sections based on current path
  useEffect(() => {
    const sections: Record<string, boolean> = {}
    const pathSegments = pathname.split("/").filter(Boolean)

    if (pathSegments.length > 1) {
      const mainSection = pathSegments[1]
      sections[mainSection] = true

      if (pathSegments.length > 2) {
        const subSection = `${mainSection}-${pathSegments[2]}`
        sections[subSection] = true
      }
    }

    setOpenSections(sections)
  }, [pathname])

  const roleMenuItems = menuItems[role] || menuItems.mahasiswa

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const renderMenuItem = (item: any, level = 0) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isOpen = openSections[item.id]
    const isChildActive = hasChildren && item.children?.some((child: any) => isActive(child.href))

    const ItemIcon = item.icon

    return (
      <motion.div
        key={item.id}
        className={cn("mb-1", level > 0 && "ml-4")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: level * 0.05 }}
      >
        {hasChildren ? (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  onClick={() => toggleSection(item.id)}
                  className={cn(
                    "flex items-center w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                    active || isChildActive
                      ? "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 border border-blue-400/30 ring-1 ring-blue-300/50"
                      : "text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:via-blue-50/30 hover:to-purple-50/20 hover:text-gray-900 hover:shadow-lg hover:shadow-blue-200/30 hover:border hover:border-blue-200/40 hover:ring-1 hover:ring-blue-200/30",
                    isCollapsed && "justify-center px-3 py-3"
                  )}
                  whileHover={{
                    scale: 1.02,
                    x: 2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                    {ItemIcon && (
                      <motion.div
                        animate={{ rotate: (active || isChildActive) ? [0, -10, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ItemIcon className={cn(
                          "h-5 w-5 transition-all duration-300",
                          active || isChildActive
                            ? "text-white drop-shadow-sm"
                            : "text-gray-600 group-hover:text-blue-600 group-hover:scale-110"
                        )} />
                      </motion.div>
                    )}
                    {!isCollapsed && (
                      <>
                        <span className="transition-all duration-300 group-hover:font-semibold">
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.variant}
                            className={cn(
                              "ml-auto text-[10px] px-2 py-0.5 rounded-full transition-all duration-300",
                              active || isChildActive
                                ? "bg-white/20 text-white border-white/30"
                                : "group-hover:scale-105 group-hover:shadow-sm"
                            )}
                          >
                            {item.badge.text}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                  {!isCollapsed && (
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  )}
                </motion.button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="font-medium">
                  {item.title}
                </TooltipContent>
              )}
            </Tooltip>

            <AnimatePresence>
              {isOpen && !isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 ml-6 space-y-2 border-l-2 border-blue-200/60 pl-5 py-2 relative"
                  style={{
                    borderImage: "linear-gradient(to bottom, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.3)) 1"
                  }}
                >
                  {item.children?.map((child: any) => renderMenuItem(child, level + 1))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{
                  scale: 1.02,
                  x: 2,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                    active
                      ? "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 border border-blue-400/30 ring-1 ring-blue-300/50"
                      : "text-gray-700 hover:bg-gradient-to-br hover:from-gray-50 hover:via-blue-50/30 hover:to-purple-50/20 hover:text-gray-900 hover:shadow-lg hover:shadow-blue-200/30 hover:border hover:border-blue-200/40 hover:ring-1 hover:ring-blue-200/30",
                    isCollapsed && "justify-center px-3 py-3"
                  )}
                >
                  <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                    {ItemIcon && (
                      <motion.div
                        animate={{ rotate: active ? [0, -10, 0] : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ItemIcon className={cn(
                          "h-5 w-5 transition-all duration-300",
                          active || isChildActive
                            ? "text-white drop-shadow-sm"
                            : "text-gray-600 group-hover:text-blue-600 group-hover:scale-110"
                        )} />
                      </motion.div>
                    )}
                    {!isCollapsed && (
                      <>
                        <span className="transition-all duration-300 group-hover:font-semibold">
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge
                            variant={item.badge.variant}
                            className={cn(
                              "ml-auto text-[10px] px-2 py-0.5 rounded-full transition-all duration-300",
                              active || isChildActive
                                ? "bg-white/20 text-white border-white/30"
                                : "group-hover:scale-105 group-hover:shadow-sm"
                            )}
                          >
                            {item.badge.text}
                          </Badge>
                        )}
                      </>
                    )}
                  </div>
                </Link>
              </motion.div>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="font-medium">
                {item.title}
              </TooltipContent>
            )}
          </Tooltip>
        )}
      </motion.div>
    )
  }

  if (!mounted) return null

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Header with Logo and Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">SAKTI</h3>
              <p className="text-xs text-gray-600">Dashboard</p>
            </div>
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 rounded-lg hover:bg-gray-100 hidden lg:flex"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(false)}
          className="h-8 w-8 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <TooltipProvider>
          {/* Quick Access */}
          <div>
            {!isCollapsed && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quick Access
                </h4>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
              </div>
            )}
            <div className="space-y-1">
              {roleMenuItems.slice(0, 3).map((item: any) => renderMenuItem(item))}
            </div>
          </div>

          {!isCollapsed && (
            <div className="relative">
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent blur-sm"></div>
            </div>
          )}

          {/* Management */}
          <div>
            {!isCollapsed && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"></div>
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Management
                </h4>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
              </div>
            )}
            <div className="space-y-1">
              {roleMenuItems.slice(3).map((item: any) => renderMenuItem(item))}
            </div>
          </div>
        </TooltipProvider>
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        {!isCollapsed ? (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
              <Avatar className="h-9 w-9 border-2 border-blue-500/20">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-xs">
                  {user?.name?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || "User"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.username || "username"}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </motion.div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-full h-10 rounded-xl"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 text-red-600" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Logout
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Trigger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-sidebar lg:hidden h-10 w-10 rounded-xl bg-white shadow-lg border border-gray-200"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 lg:hidden z-mobile-overlay"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl lg:hidden z-mobile-overlay"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: isCollapsed ? "4rem" : "16rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-sidebar hidden h-full bg-white shadow-xl border-r border-gray-200 lg:block",
          className
        )}
      >
        {sidebarContent}
      </motion.aside>
    </>
  )
}