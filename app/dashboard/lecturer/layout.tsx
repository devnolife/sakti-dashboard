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
    <div className="flex flex-col min-h-screen">
      <RoleSidebar role="lecturer" />
      <div className="flex flex-col flex-1 lg:pl-64">
        <RoleMobileMenu role="lecturer" />
        <main className="flex-1">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}

