import { ViceDean1Dashboard } from "@/components/dekan/vice-dean-1/dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard Wakil Dekan 1",
  description: "Dashboard akademik, mahasiswa, penelitian & PKM, dan kerjasama",
}

export default function ViceDean1Page() {
  return <ViceDean1Dashboard />
}
