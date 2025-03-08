import type { Metadata } from "next"
import { StudentParticipation } from "@/components/laboratory/admin/reports/student-participation"

export const metadata: Metadata = {
  title: "Laboratory Reports | Admin Dashboard",
  description: "Comprehensive laboratory reports and analytics",
}

export default function LabReportsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Laboratory Reports</h1>
        <p className="text-muted-foreground">Comprehensive analytics and reports for laboratory activities</p>
      </div>

      <StudentParticipation />
    </div>
  )
}

