"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useTheme } from "next-themes"
import NotificationDropdown from "@/components/notification-dropdown"
import { LanguageSwitcher } from "@/components/language-switcher"

interface AppHeaderProps {
  role: string
  className?: string
}

export function AppHeader({ role, className }: AppHeaderProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs = []

    // Always start with Dashboard
    breadcrumbs.push({
      title: "Dashboard",
      href: `/dashboard/${role}`,
      isActive: pathname === `/dashboard/${role}`
    })

    // Add segments after dashboard/role
    if (segments.length > 2) {
      const roleIndex = segments.indexOf(role)
      const remainingSegments = segments.slice(roleIndex + 1)

      remainingSegments.forEach((segment, index) => {
        const href = `/dashboard/${role}/${remainingSegments.slice(0, index + 1).join('/')}`
        const isLast = index === remainingSegments.length - 1

        breadcrumbs.push({
          title: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
          href,
          isActive: isLast
        })
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className={`flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ${className}`}>
      {/* Left side - Sidebar trigger and breadcrumbs */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem className="hidden md:block">
                  {breadcrumb.isActive ? (
                    <BreadcrumbPage className="text-base font-medium">
                      {breadcrumb.title}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href} className="text-base font-medium hover:text-foreground">
                        {breadcrumb.title}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Center - Search bar (optional, hidden on mobile) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 pr-4 h-9 bg-background/60 border-muted-foreground/20"
          />
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <LanguageSwitcher />

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <NotificationDropdown />
      </div>
    </header>
  )
}
