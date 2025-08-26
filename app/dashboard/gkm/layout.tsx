"use client"
import DashboardLayout from "@/components/layout/dashboard-layout"
export default function GKMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout role="gkm">
      {children}
    </DashboardLayout>
  )
}
