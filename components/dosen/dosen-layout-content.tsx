"use client"

import { useDosenSubRole } from "@/context/dosen-subrole-context"
import DynamicRoleSidebar from "@/components/dosen/dynamic-role-sidebar"
import DynamicRoleMobileMenu from "@/components/dosen/dynamic-role-mobile-menu"
import SubRoleSwitcher from "@/components/dosen/sub-role-switcher"
import SubRoleLoading from "@/components/dosen/sub-role-loading"
import type { ReactNode } from "react"

interface DosenLayoutContentProps {
  children: ReactNode
}

export default function DosenLayoutContent({ children }: DosenLayoutContentProps) {
  const { isLoading } = useDosenSubRole()

  return (
    <>
      {isLoading && <SubRoleLoading />}
      <div className="flex min-h-screen">
        <DynamicRoleSidebar />
        <div className="flex-1 pt-14">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container flex items-center justify-between p-4 mx-auto md:px-6">
              <div>
                <h1 className="text-xl font-semibold">Dashboard Dosen</h1>
                <p className="text-sm text-muted-foreground">Kelola peran dan akses sesuai jabatan Anda</p>
              </div>
              <SubRoleSwitcher />
            </div>
          </div>
          <div className="container p-4 mx-auto md:p-6">{children}</div>
          <DynamicRoleMobileMenu />
        </div>
      </div>
    </>
  )
}