"use client"

import type React from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { UniversalLayout } from "@/components/shared"
import { DosenSubRoleProvider } from "@/context/dosen-subrole-context"
import { Toaster } from "@/components/ui/toaster"
import { 
  adminUmumMenuItems,
  lecturerMenuItems,
  staffTuMenuItems,
  dekanMenuItems,
  mahasiswaMenuItems,
  financeAdminMenuItems,
  kepalaTataUsahaMenuItems,
  prodiMenuItems,
  gkmMenuItems,
  laboratoryAdminMenuItems,
  readingRoomAdminMenuItems,
  simakMenuItems
} from "@/config/menu-items"

// Role menu mapping
const roleMenuMapping = {
  admin_umum: adminUmumMenuItems,
  dosen: lecturerMenuItems,
  staff_tu: staffTuMenuItems,
  dekan: dekanMenuItems,
  mahasiswa: mahasiswaMenuItems,
  admin_keuangan: financeAdminMenuItems,
  kepala_tata_usaha: kepalaTataUsahaMenuItems,
  prodi: prodiMenuItems,
  gkm: gkmMenuItems,
  laboratory_admin: laboratoryAdminMenuItems,
  reading_room_admin: readingRoomAdminMenuItems,
  simak: simakMenuItems
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Extract role from pathname
  const roleFromPath = pathname.split('/')[2] // /dashboard/[role]/...

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    )
  }

  if (!user || !roleFromPath) {
    return null
  }

  // Get menu items for the current role
  const menuItems = roleMenuMapping[roleFromPath as keyof typeof roleMenuMapping] || []

  // Special handling for dosen role that needs context provider
  if (roleFromPath === 'dosen') {
    return (
      <DosenSubRoleProvider>
        <UniversalLayout 
          role={roleFromPath} 
          menuItems={menuItems}
        >
          {children}
        </UniversalLayout>
        <Toaster />
      </DosenSubRoleProvider>
    )
  }

  // Standard layout for all other roles
  return (
    <UniversalLayout 
      role={roleFromPath} 
      menuItems={menuItems}
    >
      {children}
    </UniversalLayout>
  )
}

