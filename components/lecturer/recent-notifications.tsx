import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function RecentNotifications() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Notifikasi Terbaru</CardTitle>
        <Badge variant="outline">5 Baru</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-500/10 p-2">
            <Bell className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Pengajuan Bimbingan Baru</p>
            <p className="text-xs text-muted-foreground">Budi Santoso mengajukan bimbingan akademik</p>
            <p className="text-xs text-muted-foreground">10 menit yang lalu</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-500/10 p-2">
            <Bell className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Jadwal Ujian Diperbarui</p>
            <p className="text-xs text-muted-foreground">Jadwal ujian proposal telah diperbarui</p>
            <p className="text-xs text-muted-foreground">1 jam yang lalu</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-blue-500/10 p-2">
            <Bell className="h-4 w-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Dokumen Baru</p>
            <p className="text-xs text-muted-foreground">Ani Wijaya mengunggah laporan KKP</p>
            <p className="text-xs text-muted-foreground">3 jam yang lalu</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

