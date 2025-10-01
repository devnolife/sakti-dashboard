"use client"

import type React from "react"
import { UniversalLayout } from "@/components/shared"
import { readingRoomAdminMenuItems } from "@/config/menu-items"
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
    <UniversalLayout
      role="reading_room_admin"
      menuItems={readingRoomAdminMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

