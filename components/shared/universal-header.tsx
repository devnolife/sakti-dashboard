"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

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

interface UniversalHeaderProps {
  role: string
  className?: string
}

export function UniversalHeader({ role, className }: UniversalHeaderProps) {
  const pathname = usePathname()

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
    <header className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 ${className}`}>
      <div className="flex items-center gap-2 px-4">
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
    </header>
  )
}
