import { ExamScheduleManager } from "@/components/exam/exam-schedule-manager"

export default function ExamSchedulesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Schedules</h1>
        <p className="text-muted-foreground">Manage and view examination schedules</p>
      </div>
      <ExamScheduleManager />
    </div>
  )
}

