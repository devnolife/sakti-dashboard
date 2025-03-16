import type { Metadata } from "next"
import { AIKKomfrenRegistration } from "@/components/aik-komfren/registration"

export const metadata: Metadata = {
  title: "AIK Komfren Registration | Student Dashboard",
  description: "Register and pay for your AIK Komfren Examination",
}

export default function AIKKomfrenRegistrationPage() {
  return <AIKKomfrenRegistration />
}

