"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { menuItems } from "@/config/menu-items"
import type { Role } from "@/types/role"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"

interface RoleSidebarProps {
  role: Role
}

export default function RoleSidebar({ role }: RoleSidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const { user, logout } = useAuth()

  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}
    const items = menuItems[role] || []

    items.forEach((item) => {
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
  }, [pathname, role])

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const isMenuOpen = (id: string) => !!openMenus[id]

  const isActive = (href: string) => {
    if (href === `/dashboard/${role}` && pathname === `/dashboard/${role}`) {
      return true
    }

    if (href !== `/dashboard/${role}` && pathname.startsWith(href)) {
      const nextChar = pathname.charAt(href.length)
      return nextChar === "/" || nextChar === ""
    }

    return false
  }

  const renderMenuItem = (item: any, depth = 0) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isChildActive =
      hasChildren &&
      item.children.some(
        (child: any) =>
          isActive(child.href) ||
          (child.children && child.children.some((grandchild: any) => isActive(grandchild.href))),
      )

    return (
      <div key={item.id} className={cn("py-1", depth > 0 && "ml-3")}>
        {hasChildren ? (
          <div>
            <button
              onClick={() => toggleMenu(item.id)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-in-out",
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
                  <Badge variant={item.badge.variant} className="ml-auto">
                    {item.badge.text}
                  </Badge>
                )}
              </div>
              <div className="transition-transform duration-200">
                {isMenuOpen(item.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </button>

            {isMenuOpen(item.id) && (
              <div className="mt-1 space-y-1 border-l-2 border-muted pl-3 ml-4 py-1">
                {item.children.map((child: any) => renderMenuItem(child, depth + 1))}
              </div>
            )}
          </div>
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
              {item.badge && item.id !== "notifications" && (
                <Badge variant={item.badge.variant} className="ml-auto">
                  {item.badge.text}
                </Badge>
              )}
            </div>
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-background lg:flex">
      {/* Logo and App Name */}
      <div className="flex h-20 items-center justify-center border-b px-6">
        <Link href={user ? `/dashboard/${user.role}` : "/"} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <span className="text-xl font-bold text-primary-foreground">S</span>
          </div>
          <span className="font-semibold text-xl">SIAKAD</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">{(menuItems[role] || []).map((item) => renderMenuItem(item))}</nav>
      </div>

      <div className="border-t p-4">
        <div className="mb-4 flex items-center gap-3 p-2 rounded-lg bg-muted/50">
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
              {user?.name?.substring(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name || "User"}</span>
            <span className="text-xs text-muted-foreground">{user?.username || "username"}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

