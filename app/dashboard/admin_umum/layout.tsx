import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { adminUmumMenuItems } from "@/config/menu-items"

export default function AdminUmumLayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="admin_umum"
      menuItems={adminUmumMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

