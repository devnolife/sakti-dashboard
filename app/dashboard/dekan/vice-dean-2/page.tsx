import { ViceDean2Dashboard } from "@/components/dekan/vice-dean-2/dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Wakil Dekan 2",
  description: "Dashboard keuangan dan akademik fakultas",
}

export default function ViceDean2Page() {
  return <ViceDean2Dashboard />
}

