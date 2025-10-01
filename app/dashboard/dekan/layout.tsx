import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { dekanMenuItems } from "@/config/menu-items"

export default function DekanLayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="dekan"
      menuItems={dekanMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

