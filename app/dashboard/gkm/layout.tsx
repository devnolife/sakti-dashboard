import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { gkmMenuItems } from "@/config/menu-items"

export default function GKMLayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="gkm"
      menuItems={gkmMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}
