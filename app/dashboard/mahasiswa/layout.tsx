import type { ReactNode } from "react"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"

export default function MahasiswaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 pt-14 bg-background/50">
      <RoleSidebar role="mahasiswa" />
      <div>
        <div className="container px-3 pb-3 mx-auto md:px-6 md:pb-6 md:pt-3 lg:px-8 lg:pb-8 lg:pt-4">{children}</div>
      </div>
      <RoleMobileMenu role="mahasiswa" />
    </div>
  )
}

