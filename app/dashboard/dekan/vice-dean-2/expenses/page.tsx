import { ExpenseTracking } from "@/components/dekan/vice-dean-2/expense-tracking"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pelacakan Pengeluaran",
  description: "Pelacakan pengeluaran fakultas",
}

export default function ExpenseTrackingPage() {
  return <ExpenseTracking />
}

