"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"

export default function KepalaTataUsahaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout role="kepala_tata_usaha">
      {children}
    </DashboardLayout>
  )
}
