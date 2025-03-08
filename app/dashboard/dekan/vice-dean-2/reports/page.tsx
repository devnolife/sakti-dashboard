import { FinancialReporting } from "@/components/dekan/vice-dean-2/financial-reporting"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Laporan Keuangan",
  description: "Laporan keuangan fakultas",
}

export default function FinancialReportingPage() {
  return <FinancialReporting />
}

