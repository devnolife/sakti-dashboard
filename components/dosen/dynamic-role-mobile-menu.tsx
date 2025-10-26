"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { dosenSubRoleMenuItems, type MenuItem } from "@/config/menu-items"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useDosenSubRole } from "@/context/dosen-subrole-context"
import { motion, AnimatePresence } from "framer-motion"

export default function DynamicRoleMobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})
  const pathname = usePathname()
  const { currentSubRole } = useDosenSubRole()

  // Get menu items based on current sub-role
  const menuItems = dosenSubRoleMenuItems[currentSubRole] || []

  // Reset submenu state when sub-role changes
  useEffect(() => {
    setOpenSubMenus({})
  }, [currentSubRole])

  const toggleMobileMenu = () => setIsOpen(!isOpen)

  const toggleSubMenu = (id: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const isActive = (href: string) => {
    if (href === `/dashboard/dosen` && pathname === `/dashboard/dosen`) {
      return true
    }
    if (href !== `/dashboard/dosen` && pathname.startsWith(href)) {
      const nextChar = pathname.charAt(href.length)
      return nextChar === "/" || nextChar === ""
    }
    return false
  }

  const renderMobileMenuItem = (item: MenuItem, level = 0) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id} className={cn("", level > 0 && "ml-4")}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleSubMenu(item.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                active ? "bg-primary/10 text-primary" : "hover:bg-accent"
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.title}</span>
                {item.badge && (
                  <Badge variant={item.badge.variant} size="sm">
                    {item.badge.text}
                  </Badge>
                )}
              </div>
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                openSubMenus[item.id] && "rotate-180"
              )} />
            </button>
            <AnimatePresence>
              {openSubMenus[item.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 space-y-1"
                >
                  {item.children.map((child) => renderMobileMenuItem(child, level + 1))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
              active ? "bg-primary/10 text-primary" : "hover:bg-accent"
            )}
          >
            {item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.title}</span>
            {item.badge && (
              <Badge variant={item.badge.variant} size="sm" className="ml-auto">
                {item.badge.text}
              </Badge>
            )}
          </Link>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r shadow-lg lg:hidden"
            >
              <div className="flex items-center justify-center h-16 border-b">
                <Link href="/dashboard/dosen" className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
                    <span className="text-lg font-bold text-primary-foreground">S</span>
                  </div>
                  <span className="text-lg font-semibold">SINTEKMu</span>
                </Link>
              </div>

              <nav className="p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => renderMobileMenuItem(item))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
