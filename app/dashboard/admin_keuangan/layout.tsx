import type React from "react"
import type { Metadata } from "next"

import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"

export const metadata: Metadata = {
  title: "Admin Keuangan Dashboard | Faculty Dashboard",
  description: "Finance administration dashboard for managing student payments",
}

export default function AdminKeuanganLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <RoleSidebar role="admin_keuangan" />
     <div className="flex-1 pt-14">
        <RoleMobileMenu role="admin_keuangan" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

