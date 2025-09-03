import type { Metadata } from "next"
import { FinanceAdminDashboard } from "@/components/admin_keuangan/finance-admin-dashboard"

export const metadata: Metadata = {
  title: "Dasbor Admin Keuangan",
  description: "Kelola pembayaran siswa dan catatan keuangan",
}

export default function AdminKeuanganPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dasbor Admin Keuangan</h2>
          <p className="text-muted-foreground">
            Kelola pembayaran siswa, buat daftar pembayaran, dan lacak catatan keuangan
          </p>
        </div>
      </div>
      <FinanceAdminDashboard />
    </div>
  )
}

