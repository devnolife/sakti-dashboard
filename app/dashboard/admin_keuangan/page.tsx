import type { Metadata } from "next"
import { FinanceAdminDashboard } from "@/components/admin_keuangan/finance-admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Keuangan Dashboard",
  description: "Manage student payments and financial records",
}

export default function AdminKeuanganPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Keuangan Dashboard</h2>
          <p className="text-muted-foreground">
            Manage student payments, generate payment lists, and track financial records
          </p>
        </div>
      </div>
      <FinanceAdminDashboard />
    </div>
  )
}

