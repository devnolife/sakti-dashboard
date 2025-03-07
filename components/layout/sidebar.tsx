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

  
  useEffect(() => {
    setMounted(true)
  }, [])

  
  useEffect(() => {
    const sections: Record<string, boolean> = {}

    
    const pathSegments = pathname.split("/").filter(Boolean)

    
    if (pathSegments.length > 1) {
      
      const mainSection = pathSegments[1]
      sections[mainSection] = true

      
      if (pathSegments.length > 2) {
        const subSection = `${mainSection}-${pathSegments[2]}`
        sections[subSection] = true

        
        if (pathSegments.length > 3) {
          const deepSection = `${subSection}-${pathSegments[3]}`
          sections[deepSection] = true
        }
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

    return (
      <div key={item.id} className={cn("flex flex-col", level > 0 && "ml-3")}>
        {hasChildren ? (
          <>
            <button
              onClick={() => toggleSection(item.id)}
              className={cn(
                "flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
                active || isChildActive
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-accent hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                {item.icon && (
                  <item.icon
                    className={cn("h-5 w-5", active || isChildActive ? "text-primary" : "text-foreground/70")}
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
              <div className="py-1 pl-3 mt-1 ml-4 space-y-1 border-l-2 border-muted">
                {item.children?.map((child: any) => renderMenuItem(child, level + 1))}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
              active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-accent hover:text-foreground",
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && <item.icon className={cn("h-5 w-5", active ? "text-primary" : "text-foreground/70")} />}
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
    <aside
      className={cn(
        "fixed left-0 top-16 z-30 hidden h-[calc(100vh-4rem)] w-64 border-r bg-background lg:block",
        className,
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">{roleMenuItems.map((item: any) => renderMenuItem(item))}</nav>
        </div>
      </div>
    </aside>
  )
}

