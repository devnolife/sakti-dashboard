import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { staffTuMenuItems } from "@/config/menu-items"

export default function StaffTULayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="staff_tu"
      menuItems={staffTuMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

