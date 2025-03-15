"use client"

import type React from "react"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ReadingRoomAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    } else if (!isLoading && isAuthenticated && user?.role !== "reading_room_admin") {
      router.push("/dashboard")
    }
  }, [isLoading, isAuthenticated, router, user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "reading_room_admin") {
    return null
  }

  return (
    <div className="flex-1 pt-16 bg-background/50">
      <RoleSidebar role="reading_room_admin" />
      <div>
        <div className="container px-3 pb-3 mx-auto md:px-6 md:pb-6 md:pt-3 lg:px-8 lg:pb-8 lg:pt-4">{children}</div>
      </div>
      <RoleMobileMenu role="reading_room_admin" />
    </div>
  )
}

