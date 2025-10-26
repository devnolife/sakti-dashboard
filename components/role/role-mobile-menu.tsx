"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { menuItems } from "@/config/menu-items"
import type { Role } from "@/types/role"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ChevronDown, ChevronRight, Search, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

interface RoleMobileMenuProps {
  role: Role
}

export default function RoleMobileMenu({ role }: RoleMobileMenuProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const { user, logout } = useAuth()

  // Close the mobile menu when navigating
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Reset open menus when role changes to ensure proper re-render
  useEffect(() => {
    setOpenMenus({})
  }, [role])

  // Initialize open menus based on current path
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}

    // Get the menu items for the current role
    const items = menuItems[role] || []

    // Check each menu item to see if it or its children match the current path
    items.forEach((item) => {
      // Check if the current path starts with this item's href
      if (pathname.startsWith(item.href)) {
        newOpenMenus[item.id] = true
      }

      // Check children if they exist
      if (item.children) {
        item.children.forEach((child) => {
          if (pathname.startsWith(child.href)) {
            newOpenMenus[item.id] = true

            // If this child also has children, check them too
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

  const isMenuOpen = (id: string) => {
    return !!openMenus[id]
  }

  const isActive = (href: string) => {
    // Exact match for dashboard root
    if (href === `/dashboard/${role}` && pathname === `/dashboard/${role}`) {
      return true
    }

    // For other pages, check if the pathname starts with the href
    // But make sure it's not just a partial match of a parent route
    if (href !== `/dashboard/${role}` && pathname.startsWith(href)) {
      // Check if the next character after href in pathname is '/' or nothing
      const nextChar = pathname.charAt(href.length)
      return nextChar === "/" || nextChar === ""
    }

    return false
  }

  const roleItems = menuItems[role] || []

  // Recursive function to render menu items and their children
  const renderMenuItem = (item: any, depth = 0) => {
    const active = isActive(item.href)
    const hasChildren = item.children && item.children.length > 0

    // Check if any child is active
    const isChildActive =
      hasChildren &&
      item.children.some(
        (child: any) =>
          isActive(child.href) ||
          (child.children && child.children.some((grandchild: any) => isActive(grandchild.href))),
      )

    return (
      <div key={item.id} className={cn("py-1", depth > 0 && "pl-4")}>
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
                  <Badge variant={item.badge.variant} className="ml-2">
                    {item.badge.text}
                  </Badge>
                )}
              </div>
              <div className="transition-transform duration-200">
                {isMenuOpen(item.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            {isMenuOpen(item.id) && (
              <div className="py-1 pl-2 mt-1 ml-4 space-y-1 border-l-2 border-muted">
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
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-40 flex items-center justify-center rounded-full shadow-lg bottom-4 right-4 h-14 w-14 bg-primary text-primary-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary">
                <span className="text-lg font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-xl font-semibold">SINTEKMu</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Section */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-4">
              <Avatar className="border-2 h-14 w-14 border-primary/10">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "User"} />
                <AvatarFallback className="font-medium bg-primary/10 text-primary">
                  {user?.name?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">{user?.name || "User"}</h3>
                <p className="text-sm text-muted-foreground">{user?.username || "username"}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            <button className="flex-1 py-3 font-medium text-center border-b-2 text-primary border-primary">Menu</button>
          </div>

          <div className="h-[calc(100vh-13rem)] overflow-y-auto p-4">
            <nav className="space-y-2">{roleItems.map((item) => renderMenuItem(item))}</nav>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm" className="text-muted-foreground">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

