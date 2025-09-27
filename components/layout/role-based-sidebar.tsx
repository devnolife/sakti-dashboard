"use client"

import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  DollarSign,
  Handshake,
  School,
  BookOpen,
  User,
  Settings,
  BookMarked,
  Flask,
  CheckCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { getMenuForUser, getRoleDisplayName, MenuItem } from '@/lib/menu-config'

// Icon mapping
const iconMap: Record<string, any> = {
  LayoutDashboard,
  GraduationCap,
  Users,
  DollarSign,
  Handshake,
  School,
  BookOpen,
  User,
  Settings,
  BookMarked,
  Flask,
  CheckCircle,
  TrendingUp: LayoutDashboard, // Fallback
  PieChart: DollarSign, // Fallback
  CreditCard: DollarSign, // Fallback
  Building2: Handshake, // Fallback
  Briefcase: School, // Fallback
  FileCheck: CheckCircle, // Fallback
  Calendar: Settings, // Fallback
  Book: BookOpen, // Fallback
  UserCheck: Users, // Fallback
  ClipboardCheck: CheckCircle, // Fallback
  Award: User, // Fallback
  FileText: Settings, // Fallback
  Mail: Settings, // Fallback
  Search: BookMarked, // Fallback
  Package: BookMarked, // Fallback
  History: BookMarked, // Fallback
  Wrench: Flask, // Fallback
  ClipboardList: CheckCircle, // Fallback
  BarChart3: CheckCircle, // Fallback
  Cog: Settings // Fallback
}

interface RoleBasedSidebarProps {
  className?: string
}

export function RoleBasedSidebar({ className }: RoleBasedSidebarProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [openItems, setOpenItems] = useState<string[]>([])

  if (!session?.user) {
    return null
  }

  const userRole = session.user.role
  const userSubRole = session.user.subRole
  const userName = session.user.name
  const roleDisplayName = getRoleDisplayName(userRole, userSubRole)

  const menuItems = getMenuForUser(userRole, userSubRole)

  const toggleItem = (itemId: string) => {
    setOpenItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isOpen = openItems.includes(item.id)
    const isActive = item.href === pathname
    const Icon = iconMap[item.icon] || Settings

    if (item.children && item.children.length > 0) {
      return (
        <Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleItem(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto py-2 px-3",
                level > 0 && "pl-6",
                isActive && "bg-primary/10 text-primary"
              )}
            >
              <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2">
                  {item.badge}
                </Badge>
              )}
              {isOpen ? (
                <ChevronDown className="h-4 w-4 ml-2" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={cn(
          "w-full justify-start h-auto py-2 px-3",
          level > 0 && "pl-6",
          isActive && "bg-primary/10 text-primary font-medium"
        )}
        onClick={() => item.href && handleNavigation(item.href)}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <Badge variant="secondary" className="ml-2">
            {item.badge}
          </Badge>
        )}
      </Button>
    )
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* User Info Header */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {roleDisplayName}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground text-center">
          SIMTEK FT UNSRI v1.0
        </div>
      </div>
    </div>
  )
}

// Hook untuk mendapatkan menu items berdasarkan role
export function useRoleBasedMenu() {
  const { data: session } = useSession()

  if (!session?.user) {
    return []
  }

  return getMenuForUser(session.user.role, session.user.subRole)
}

// Component untuk menampilkan role badge
export function RoleBadge({ className }: { className?: string }) {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const roleDisplayName = getRoleDisplayName(session.user.role, session.user.subRole)

  return (
    <Badge variant="outline" className={className}>
      {roleDisplayName}
    </Badge>
  )
}