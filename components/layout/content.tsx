"use client"

import { useRole } from "@/context/role-context"
import { useState } from "react"
import AdminDashboard from "@/components/dashboards/admin-dashboard"
import MahasiswaDashboard from "@/components/dashboards/mahasiswa-dashboard"
import ProdiDashboard from "@/components/dashboards/prodi-dashboard"
import StaffTUDashboard from "@/components/dashboards/staff-tu-dashboard"
import DekanDashboard from "@/components/dashboards/dekan-dashboard"
import StaffKKPDashboard from "@/components/dashboards/staff-kkp-dashboard"
import MobileMenu from "@/components/layout/mobile-menu"
import KkpProdiDashboard from "@/components/kkp/kkp-prodi-dashboard"

interface ContentProps {
  activeSection?: string
  setActiveSection?: (section: string) => void
}

export default function Content({ activeSection, setActiveSection }: ContentProps) {
  const { role } = useRole()
  const [section, setSection] = useState(activeSection || "dashboard")

  // Use the provided setActiveSection or the local state setter
  const handleSectionChange = (newSection: string) => {
    if (setActiveSection) {
      setActiveSection(newSection)
    } else {
      setSection(newSection)
    }
  }

  // Render the appropriate dashboard based on the role and active section
  const renderContent = () => {
    // For staff_tu role, show the KKP dashboard when the active section is "kkp-management"
    if (role === "staff_tu" && (activeSection || section) === "kkp-management") {
      return <StaffKKPDashboard activeSection={activeSection || section} />
    }

    // For prodi role, show the KKP dashboard when the active section is "kkp-management"
    if (role === "prodi" && (activeSection || section) === "kkp-management") {
      return <KkpProdiDashboard />
    }

    // Otherwise, render the appropriate dashboard based on the role
    switch (role) {
      case "admin":
        return <AdminDashboard />
      case "dekan":
        return <DekanDashboard />
      case "prodi":
        return <ProdiDashboard />
      case "staff_tu":
        return <StaffTUDashboard />
      case "mahasiswa":
        return <MahasiswaDashboard />
      default:
        return <MahasiswaDashboard />
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 md:hidden">
        <MobileMenu activeSection={activeSection || section} onNavigate={handleSectionChange} />
      </div>
      <div className="px-4 py-4 md:px-6 lg:px-8 ml-52 lg:ml-0">{renderContent()}</div>
    </div>
  )
}

