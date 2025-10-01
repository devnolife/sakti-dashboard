import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { kepalaTataUsahaMenuItems } from "@/config/menu-items"

export default function KepalaTataUsahaLayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="kepala_tata_usaha"
      menuItems={kepalaTataUsahaMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}
