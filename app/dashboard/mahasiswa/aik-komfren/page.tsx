import type { Metadata } from "next"
import { AIKKomfrenDashboard } from "@/components/aik-komfren/dashboard"

export const metadata: Metadata = {
  title: "AIK Komfren Exam | Student Dashboard",
  description: "Manage your AIK Komfren Examination process",
}

export default function AIKKomfrenPage() {
  return <AIKKomfrenDashboard />
}

