import { PaymentHistoryManager } from "@/components/payment/payment-history-manager"

export default function PaymentHistoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="p-1 rounded-lg bg-gradient-to-br from-white via-blue-50/10 to-white">
        <PaymentHistoryManager />
      </div>
    </div>
  )
}

