import type React from "react"
import type { Metadata } from "next"
import RoleSidebar from "@/components/role/role-sidebar"
import RoleMobileMenu from "@/components/role/role-mobile-menu"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Lecturer Dashboard | SAKTI",
  description: "Lecturer dashboard for managing academic guidance, exams, and KKP supervision",
}

interface LecturerLayoutProps {
  children: React.ReactNode
}

export default function LecturerLayout({ children }: LecturerLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <RoleSidebar role="lecturer" />
      <div className="flex-1 pt-14">
        <div className="container p-4 mx-auto md:p-6">{children}</div>
        <RoleMobileMenu role="lecturer" />
      </div>
      <Toaster />
    </div>
  )
}

