import type React from "react"
import { cookies } from "next/headers"
import { DashboardLayoutClient } from "./layout-client"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultSidebarOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <DashboardLayoutClient
      defaultSidebarOpen={defaultSidebarOpen}
    >
      {children}
    </DashboardLayoutClient>
  )
}
