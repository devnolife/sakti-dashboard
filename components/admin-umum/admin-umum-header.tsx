"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"

export function AdminUmumHeader() {
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs: { label: string; href: string }[] = []

    // Start from dashboard/admin_umum
    if (paths.length >= 2 && paths[0] === "dashboard" && paths[1] === "admin_umum") {
      breadcrumbs.push({ label: "Dashboard", href: "/dashboard/admin_umum" })

      // Add subsequent paths
      for (let i = 2; i < paths.length; i++) {
        const label = paths[i]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        const href = `/dashboard/admin_umum/${paths.slice(2, i + 1).join("/")}`
        breadcrumbs.push({ label, href })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.length === 0 ? (
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink asChild>
                          <Link href={crumb.href}>{crumb.label}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </>
                  )}
                </React.Fragment>
              ))
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-8">
          <Bell className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <User className="size-4" />
        </Button>
      </div>
    </header>
  )
}
