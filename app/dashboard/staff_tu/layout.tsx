import type { ReactNode } from "react"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"

export default function StaffTULayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <RoleSidebar role="staff_tu" />
      <div className="flex-1">
        <div className="container p-4 mx-auto md:p-6">{children}</div>
      </div>
      <RoleMobileMenu role="staff_tu" />
    </div>
  )
}

