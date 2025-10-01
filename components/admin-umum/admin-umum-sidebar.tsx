"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Building2 } from "lucide-react"
import { adminUmumMenuItems } from "@/config/menu-items"
import { NavUser } from "./nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function AdminUmumSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard/admin_umum">
                <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Building2 className="size-6" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-lg">Admin Umum</span>
                  <span className="text-sm text-muted-foreground">SIMAK FT</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium">Menu</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {adminUmumMenuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

              // Item without children
              if (!item.children || item.children.length === 0) {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive} className="text-base py-2 h-auto">
                      <Link href={item.href}>
                        {Icon && <Icon className="size-6" />}
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              // Item with children (collapsible)
              const hasActiveChild = item.children.some(
                (child) => pathname === child.href || pathname.startsWith(child.href + "/")
              )
              const defaultOpen = isActive || hasActiveChild

              return (
                <Collapsible
                  key={item.id}
                  defaultOpen={defaultOpen}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive || hasActiveChild} className="text-base py-2 h-auto">
                        {Icon && <Icon className="size-6" />}
                        <span className="font-medium">{item.title}</span>
                        <ChevronRight className="ml-auto size-6 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="gap-1 px-2 py-1">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href || pathname.startsWith(child.href + "/")
                          return (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton asChild isActive={isChildActive} className="text-base py-1.5">
                                <Link href={child.href}>
                                  <span>{child.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={{
          name: "Admin Umum",
          email: "admin@simak.ft",
          avatar: "/avatars/admin.jpg"
        }} />
      </SidebarFooter>
    </Sidebar>
  )
}
