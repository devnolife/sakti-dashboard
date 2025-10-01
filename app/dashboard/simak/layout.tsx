import { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { simakMenuItems } from "@/config/menu-items"

interface SimakLayoutProps {
  children: ReactNode
}

export default function SimakLayout({ children }: SimakLayoutProps) {
  return (
    <UniversalLayout
      role="simak"
      menuItems={simakMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}
