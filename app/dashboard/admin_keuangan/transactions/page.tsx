import type { Metadata } from "next"
import { TransactionsManager } from "@/components/transactions-manager"

export const metadata: Metadata = {
  title: "Transactions | Finance Admin Dashboard",
  description: "Manage and track all financial transactions",
}

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">View, filter, and manage all financial transactions</p>
        </div>
      </div>
      <TransactionsManager />
    </div>
  )
}

