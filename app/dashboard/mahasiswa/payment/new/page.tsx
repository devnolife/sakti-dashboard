import { Suspense } from "react"
import type { Metadata } from "next"
import NewPayment from "@/components/payment/new-payment"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Pembayaran Baru | Dashboard Mahasiswa",
  description: "Buat pembayaran baru untuk biaya kuliah Anda",
}

export default function NewPaymentPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pembayaran Baru
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">Buat pembayaran baru untuk biaya kuliah Anda.</p>
      </div>

      <Suspense fallback={<NewPaymentSkeleton />}>
        <NewPayment />
      </Suspense>
    </div>
  )
}

function NewPaymentSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-[400px] rounded-xl" />
    </div>
  )
}

