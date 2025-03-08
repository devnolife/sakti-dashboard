import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock, GraduationCap, Briefcase } from "lucide-react"

export function UpcomingSchedule() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jadwal Mendatang</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <CalendarClock className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Bimbingan Akademik</p>
            <p className="text-xs text-muted-foreground">Hari ini, 10:00 - 11:30</p>
            <p className="text-xs font-medium">Ruang Dosen 2.3</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Ujian Proposal</p>
            <p className="text-xs text-muted-foreground">Besok, 13:00 - 15:00</p>
            <p className="text-xs font-medium">Ruang Sidang 1</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary/10 p-2">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Monitoring KKP</p>
            <p className="text-xs text-muted-foreground">Lusa, 09:00 - 11:00</p>
            <p className="text-xs font-medium">Online (Zoom)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

