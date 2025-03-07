import type { ReactNode } from "react"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"

export default function MahasiswaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background/50">
      <RoleSidebar role="mahasiswa" />
      <div className="flex-1">
        <div className="container p-4 mx-auto md:p-6 lg:p-8">{children}</div>
      </div>
      <RoleMobileMenu role="mahasiswa" />
    </div>
  )
}

