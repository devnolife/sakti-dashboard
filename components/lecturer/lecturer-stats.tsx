import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function LecturerStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik Semester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Bimbingan Akademik</div>
            <div className="text-sm text-muted-foreground">12/15</div>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Bimbingan Ujian</div>
            <div className="text-sm text-muted-foreground">8/10</div>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Bimbingan KKP</div>
            <div className="text-sm text-muted-foreground">4/5</div>
          </div>
          <Progress value={80} className="h-2" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Bimbingan KKP Plus</div>
            <div className="text-sm text-muted-foreground">2/3</div>
          </div>
          <Progress value={67} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

