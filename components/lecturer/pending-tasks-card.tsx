import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

export function PendingTasksCard() {
  const totalTasks = pendingTasks.length
  const highPriorityTasks = pendingTasks.filter((task) => task.priority === "high").length

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Tugas Tertunda</CardTitle>
          <Badge variant="outline">{totalTasks} Total</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-md bg-amber-50 dark:bg-amber-950">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <div className="text-sm">
                <span className="font-medium text-amber-600 dark:text-amber-400">{highPriorityTasks}</span> Prioritas
                Tinggi
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 dark:bg-blue-950">
              <Clock className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="font-medium text-blue-600 dark:text-blue-400">5</span> Tenggat Hari Ini
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {pendingTasks.slice(0, 3).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>

          {totalTasks > 3 && (
            <Button variant="outline" size="sm" className="w-full">
              Lihat {totalTasks - 3} tugas lainnya
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface Task {
  id: string
  title: string
  type: string
  dueDate: string
  priority: "low" | "medium" | "high"
}

function TaskItem({ task }: { task: Task }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-md bg-muted/40">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{task.title}</span>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>{task.type}</span>
          <span>•</span>
          <span>{task.dueDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <PriorityBadge priority={task.priority} />
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: "low" | "medium" | "high" }) {
  const variant = priority === "high" ? "destructive" : priority === "medium" ? "default" : "outline"

  const label = priority === "high" ? "Tinggi" : priority === "medium" ? "Sedang" : "Rendah"

  return <Badge variant={variant}>{label}</Badge>
}

// Mock data
const pendingTasks: Task[] = [
  {
    id: "1",
    title: "Review Proposal Skripsi",
    type: "Dokumen",
    dueDate: "Hari ini",
    priority: "high",
  },
  {
    id: "2",
    title: "Evaluasi Laporan KKP",
    type: "Dokumen",
    dueDate: "Besok",
    priority: "medium",
  },
  {
    id: "3",
    title: "Persetujuan Judul Skripsi",
    type: "Persetujuan",
    dueDate: "3 hari lagi",
    priority: "high",
  },
  {
    id: "4",
    title: "Penilaian Ujian Tengah Semester",
    type: "Penilaian",
    dueDate: "5 hari lagi",
    priority: "medium",
  },
  {
    id: "5",
    title: "Konsultasi Akademik",
    type: "Jadwal",
    dueDate: "Minggu depan",
    priority: "low",
  },
]

