import type React from "react"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { DosenSubRoleProvider } from "@/context/dosen-subrole-context"
import { UniversalLayout } from "@/components/shared"
import { lecturerMenuItems } from "@/config/menu-items"

export const metadata: Metadata = {
  title: "Dosen Dashboard | SINTEKMu",
  description: "Dosen dashboard with sub-role switching capabilities",
}

interface DosenLayoutProps {
  children: React.ReactNode
}

export default function DosenLayout({ children }: DosenLayoutProps) {
  return (
    <DosenSubRoleProvider>
      <UniversalLayout
        role="dosen"
        menuItems={lecturerMenuItems}
      >
        {children}
      </UniversalLayout>
      <Toaster />
    </DosenSubRoleProvider>
  )
}

