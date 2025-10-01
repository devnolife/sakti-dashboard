import type { ReactNode } from "react"
import { UniversalLayout } from "@/components/shared"
import { mahasiswaMenuItems } from "@/config/menu-items"

export default function MahasiswaLayout({ children }: { children: ReactNode }) {
  return (
    <UniversalLayout
      role="mahasiswa"
      menuItems={mahasiswaMenuItems}
    >
      {children}
    </UniversalLayout>
  )
}

