import type { ReactNode } from "react"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"

export default function StaffTULayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <RoleSidebar role="staff_tu" />
      <div className="flex-1 pt-14">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </div>
      <RoleMobileMenu role="staff_tu" />
    </div>
  )
}

