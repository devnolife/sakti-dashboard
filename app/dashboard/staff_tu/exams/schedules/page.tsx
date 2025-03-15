import { ExamScheduleManager } from "@/components/exam/exam-schedule-manager"

export default function ExamSchedulesPage() {
  return (
    <div className="pt-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Penjadwalan Ujian</h1>
        <p className="text-muted-foreground">Kelola dan lihat jadwal ujian</p>
      </div>
      <ExamScheduleManager />
    </div>
  )
}

