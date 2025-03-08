import { Suspense } from "react"
import type { Metadata } from "next"
import PaymentDashboard from "@/components/payment/payment-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Pembayaran | Dashboard Mahasiswa",
  description: "Kelola pembayaran kuliah Anda",
}

export default function PaymentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Pembayaran</span>
        </h1>
        <p className="text-muted-foreground mt-2">Kelola pembayaran kuliah Anda dengan mudah dan aman.</p>
      </div>

      <Suspense fallback={<PaymentDashboardSkeleton />}>
        <PaymentDashboard />
      </Suspense>
    </div>
  )
}

function PaymentDashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[140px] rounded-xl" />
          ))}
      </div>

      <Skeleton className="h-[400px] rounded-xl" />

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
      </div>
    </div>
  )
}

