"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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

  if (isLoading || !isAuthenticated || user?.role !== "reading_room_admin") {
    return null
  }

  return <>{children}</>
}

