import { ExamsDashboard } from "@/components/staff_tu/exams-dashboard"

export default function FinalExamsPage() {
  return (
    <div className="container py-6 mx-auto">
      <ExamsDashboard initialFilter="final" />
    </div>
  )
}

