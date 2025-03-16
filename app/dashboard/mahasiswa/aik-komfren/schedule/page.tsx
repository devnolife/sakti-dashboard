import type { Metadata } from "next"
import { AIKKomfrenSchedule } from "@/components/aik-komfren/schedule"

export const metadata: Metadata = {
  title: "AIK Komfren Schedule | Student Dashboard",
  description: "View your AIK Komfren Examination schedule and examiner information",
}

export default function AIKKomfrenSchedulePage() {
  return <AIKKomfrenSchedule />
}

