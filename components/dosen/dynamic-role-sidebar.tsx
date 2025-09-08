"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { dosenSubRoleMenuItems, type MenuItem } from "@/config/menu-items"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { motion, AnimatePresence } from "framer-motion"

export default function DynamicRoleSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const { user, logout } = useAuth()
  const { currentSubRole } = useDosenSubRole()

  // Get menu items based on current sub-role
  const menuItems = dosenSubRoleMenuItems[currentSubRole] || []

  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}

    menuItems.forEach((item) => {
      if (pathname.startsWith(item.href)) {
        newOpenMenus[item.id] = true
      }

      if (item.children) {
        item.children.forEach((child) => {
          if (pathname.startsWith(child.href)) {
            newOpenMenus[item.id] = true
            if (child.children) {
              newOpenMenus[`${child.id}`] = true
            }
          }
        })
      }
    })

    setOpenMenus(newOpenMenus)
  }, [pathname, menuItems])

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const isMenuOpen = (id: string) => !!openMenus[id]

  const getMainDashboardPath = (subRole: string) => {
    switch (subRole) {
      case 'dosen':
        return '/dashboard/dosen'
      case 'wakil_dekan_1':
        return '/dashboard/dosen/vice-dean-1'
      case 'wakil_dekan_2':
        return '/dashboard/dosen/vice-dean-2'
      case 'wakil_dekan_3':
        return '/dashboard/dosen/vice-dean-3'
      case 'wakil_dekan_4':
        return '/dashboard/dosen/vice-dean-4'
      case 'dekan':
        return '/dashboard/dekan'
      case 'gkm':
        return '/dashboard/gkm'
      case 'prodi':
        return '/dashboard/prodi'
      default:
        return '/dashboard/dosen'
    }
  }

  const isActive = (href: string) => {
    const mainDashboardPath = getMainDashboardPath(currentSubRole)
    
    // For dashboard links, check exact match with main dashboard path
    if (href === mainDashboardPath && pathname === mainDashboardPath) {
      return true
    }

    if (href !== mainDashboardPath && pathname.startsWith(href)) {
      const nextChar = pathname.charAt(href.length)
      return nextChar === "/" || nextChar === ""
    }

    return false
  }

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isChildActive =
      hasChildren &&
      item.children.some(
        (child: MenuItem) =>
          isActive(child.href) ||
          (child.children && child.children.some((grandchild: MenuItem) => isActive(grandchild.href))),
      )

    return (
      <div
        key={item.id}
        className={cn("py-1 relative", depth > 0 && "ml-3")}
      >
        {/* Active indicator */}
        {(active || isChildActive) && (
          <motion.div
            className="absolute top-0 left-0 w-1 h-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100%" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="w-1 h-full rounded-r-full bg-primary" />
          </motion.div>
        )}

        {hasChildren ? (
          <div>
            <motion.button
              onClick={() => toggleMenu(item.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                active || isChildActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent hover:text-foreground",
              )}
              whileHover={{ scale: 1.01, x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: active || isChildActive ? [0, -10, 0] : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <item.icon
                      className={cn("h-5 w-5", active || isChildActive ? "text-primary" : "text-foreground/70")}
                    />
                  </motion.div>
                )}
                <span>{item.title}</span>
                {item.badge && item.id !== "notifications" && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <Badge variant={item.badge.variant} className="ml-auto">
                      {item.badge.text}
                    </Badge>
                  </motion.div>
                )}
              </div>
              <motion.div animate={{ rotate: isMenuOpen(item.id) ? 90 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {isMenuOpen(item.id) && (
                <motion.div
                  className="py-1 pl-3 mt-1 ml-4 space-y-1 border-l-2 border-muted"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.children.map((child: MenuItem) => renderMenuItem(child, depth + 1))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.01, x: 2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-accent hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: active ? [0, -10, 0] : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <item.icon className={cn("w-5 h-5", active ? "text-primary" : "text-foreground/70")} />
                  </motion.div>
                )}
                <span>{item.title}</span>
                {item.badge && item.id !== "notifications" && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    <Badge variant={item.badge.variant} className="ml-auto">
                      {item.badge.text}
                    </Badge>
                  </motion.div>
                )}
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <motion.div
      className="fixed inset-y-0 left-0 z-30 flex-col hidden w-64 border-r bg-background lg:flex"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
    >
      {/* Logo and App Name */}
      <motion.div
        className="flex items-center justify-center h-20 px-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <Link href="/dashboard/dosen" className="flex items-center gap-3">
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-md bg-primary"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl font-bold text-primary-foreground">S</span>
          </motion.div>
          <motion.span
            className="text-xl font-semibold"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            SINTEKMu
          </motion.span>
        </Link>
      </motion.div>

      <motion.div
        className="flex-1 p-4 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={`${currentSubRole}-${item.id}`}>
              {renderMenuItem(item)}
            </div>
          ))}
        </nav>
      </motion.div>
    </motion.div>
  )
}