import { ExamsDashboard } from "@/components/staff_tu/exams-dashboard"

export default function FinalExamsPage() {
  return (
    <div className="container mx-auto py-6">
      <ExamsDashboard initialFilter="final" />
    </div>
  )
}

