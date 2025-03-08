import { Suspense } from "react"
import type { Metadata } from "next"
import PaymentHistory from "@/components/payment/payment-history"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Riwayat Pembayaran | Dashboard Mahasiswa",
  description: "Lihat riwayat pembayaran kuliah Anda",
}

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Riwayat Pembayaran
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Lihat dan kelola riwayat pembayaran kuliah Anda</p>
      </div>

      <Suspense fallback={<PaymentHistorySkeleton />}>
        <PaymentHistory />
      </Suspense>
    </div>
  )
}

function PaymentHistorySkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[500px] rounded-xl" />
    </div>
  )
}

