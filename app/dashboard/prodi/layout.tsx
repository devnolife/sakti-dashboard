import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { prodiMenuItems } from "@/config/menu-items"

export default function ProdiLayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="prodi"
      menuItems={prodiMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

