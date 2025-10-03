"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

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
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { NavUser } from "@/components/shared/nav-user"
import { iconMap, type IconName } from "@/config/role-configs"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  role: string
  menuItems: any[]
  headerConfig: {
    title: string
    subtitle: string
    iconName: IconName
  }
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function AppSidebar({
  role,
  menuItems,
  headerConfig,
  user,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname()
  const { title, subtitle, iconName } = headerConfig
  const HeaderIcon = iconMap[iconName]
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null)

  // Set initial open menu based on active path
  React.useEffect(() => {
    const activeItem = menuItems.find((item) => {
      if (!item.children || item.children.length === 0) return false
      const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
      const hasActiveChild = item.children.some(
        (child: any) => pathname === child.href || pathname.startsWith(child.href + "/")
      )
      return isActive || hasActiveChild
    })
    if (activeItem) {
      setOpenMenuId(activeItem.id)
    }
  }, [pathname, menuItems])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/dashboard/${role}`} className="flex items-center gap-3 py-3">
                <div className="flex aspect-square size-10 items-center justify-center">
                  <Image
                    src="/logo/logo.png"
                    alt="SintekMu Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0 leading-tight">
                  <span className="font-bold text-xl tracking-tight">SintekMu</span>
                  <span className="text-xs text-muted-foreground">Dashboard System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold">Menu</SidebarGroupLabel>
          <SidebarMenu className="gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              // Dashboard should only be active on exact match
              const isActive = item.id === 'dashboard'
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href + "/")

              // Item without children
              if (!item.children || item.children.length === 0) {
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive} className="h-10 text-base">
                      <Link href={item.href}>
                        {Icon && <Icon className="size-5" />}
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              }

              // Item with children (collapsible)
              const hasActiveChild = item.children.some(
                (child: any) => pathname === child.href || pathname.startsWith(child.href + "/")
              )
              const isOpen = openMenuId === item.id

              return (
                <Collapsible
                  key={item.id}
                  open={isOpen}
                  onOpenChange={(open) => {
                    setOpenMenuId(open ? item.id : null)
                  }}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton isActive={isActive || hasActiveChild} className="h-10 text-base">
                        {Icon && <Icon className="size-5" />}
                        <span className="font-medium">{item.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="gap-1 px-2 py-2 ml-3 mt-1 border-l-2 border-gray-200">
                        {item.children.map((child: any) => {
                          const isChildActive = pathname === child.href
                          return (
                            <SidebarMenuSubItem key={child.id}>
                              <SidebarMenuSubButton asChild isActive={isChildActive} className="h-8 rounded-md hover:bg-gray-100">
                                <Link href={child.href} className="flex items-center gap-2">
                                  {isChildActive && (
                                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                  )}
                                  {!isChildActive && (
                                    <span className="w-2 h-2 rounded-full border border-gray-300 flex-shrink-0" />
                                  )}
                                  <span className="text-sm">{child.title}</span>
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
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
