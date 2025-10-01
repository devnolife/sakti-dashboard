import type React from "react"
import type { Metadata } from "next"
import { UniversalLayout } from "@/components/shared"
import { financeAdminMenuItems } from "@/config/menu-items"

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
    <UniversalLayout
      role="admin_keuangan"
      menuItems={financeAdminMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

