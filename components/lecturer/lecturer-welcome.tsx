import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Bell } from "lucide-react"

export function LecturerWelcome() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Selamat Datang, Dr. Ahmad</h2>
            <p className="text-muted-foreground">
              Anda memiliki <span className="font-medium">7 jadwal</span> dan{" "}
              <span className="font-medium">12 tugas tertunda</span> minggu ini
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="gap-2">
              <CalendarDays className="h-4 w-4" />
              Jadwal Hari Ini
            </Button>
            <Button variant="outline" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              5 Notifikasi
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

