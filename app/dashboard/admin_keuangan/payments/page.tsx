import type { Metadata } from "next"
import { PaymentListManager } from "@/components/payment-list-manager"

export const metadata: Metadata = {
  title: "Payment Management",
  description: "Manage student payments across all study programs",
}

export default function PaymentManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Management</h2>
          <p className="text-muted-foreground">
            View, create, and update payment records for students across all study programs
          </p>
        </div>
      </div>
      <PaymentListManager />
    </div>
  )
}

