import type { Metadata } from "next"
import { StudentParticipation } from "@/components/laboratory/admin/reports/student-participation"

export const metadata: Metadata = {
  title: "Laporan Laboratorium | Dasbor Admin",
  description: "Analitik dan laporan laboratorium yang komprehensif",
}

export default function LabReportsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Laporan Laboratorium</h1>
        <p className="text-muted-foreground">Analitik dan laporan komprehensif untuk aktivitas laboratorium</p>
      </div>

      <StudentParticipation />
    </div>
  )
}

