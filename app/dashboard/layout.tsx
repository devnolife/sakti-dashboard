import type React from "react"
import { cookies } from "next/headers"
import { DashboardLayoutClient } from "./layout-client"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const sidebarState = cookieStore.get("sidebar:state")?.value
  // Default to true (open) if no cookie is set
  const defaultSidebarOpen = sidebarState === undefined ? true : sidebarState === "true"

  return (
    <DashboardLayoutClient
      defaultSidebarOpen={defaultSidebarOpen}
    >
      {children}
    </DashboardLayoutClient>
  )
}
