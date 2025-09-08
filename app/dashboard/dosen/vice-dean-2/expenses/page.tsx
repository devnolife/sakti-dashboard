import { ExpenseTracking } from "@/components/dekan/vice-dean-2/expense-tracking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pengeluaran",
  description: "Tracking pengeluaran fakultas",
}

export default function DosenExpenseTrackingPage() {
  return <ExpenseTracking />
}