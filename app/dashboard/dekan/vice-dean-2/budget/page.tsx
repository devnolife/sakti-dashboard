import { BudgetManagement } from "@/components/dekan/vice-dean-2/budget-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Manajemen Anggaran",
  description: "Manajemen anggaran fakultas",
}

export default function BudgetManagementPage() {
  return <BudgetManagement />
}

