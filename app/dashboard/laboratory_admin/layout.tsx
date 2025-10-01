import type React from "react"
import { UniversalLayout } from "@/components/shared"
import { laboratoryAdminMenuItems } from "@/config/menu-items"

export default function LaboratoryAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UniversalLayout
      role="laboratory_admin"
      menuItems={laboratoryAdminMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

