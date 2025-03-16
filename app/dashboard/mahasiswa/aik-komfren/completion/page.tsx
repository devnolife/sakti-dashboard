import type { Metadata } from "next"
import { AIKKomfrenCompletion } from "@/components/aik-komfren/completion"

export const metadata: Metadata = {
  title: "AIK Komfren Completion | Student Dashboard",
  description: "Complete your AIK Komfren Examination process",
}

export default function AIKKomfrenCompletionPage() {
  return <AIKKomfrenCompletion />
}

