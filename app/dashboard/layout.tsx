"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"
import Header from "@/components/layout/header"
import { Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Sidebar */}
      <RoleSidebar role={user.role} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="pt-24 px-4 md:px-6 lg:px-8 pb-8">{children}</main>
      </div>

      {/* Mobile Menu */}
      <RoleMobileMenu role={user.role} />
    </div>
  )
}

