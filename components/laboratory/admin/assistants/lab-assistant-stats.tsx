import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Clock, AlertTriangle } from "lucide-react"
import type { LabAssistant } from "./types"

interface LabAssistantStatsProps {
  assistants: LabAssistant[]
}

export function LabAssistantStats({ assistants }: LabAssistantStatsProps) {
  // Menghitung statistik
  const totalAssistants = assistants.length
  const activeAssistants = assistants.filter((a) => a.status === "active").length
  const seniorAssistants = assistants.filter((a) => a.experience >= 2).length
  const assistantsOnProbation = assistants.filter((a) => a.status === "probation").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Asisten</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssistants}</div>
          <p className="text-xs text-muted-foreground">Dari semua laboratorium</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Asisten Aktif</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeAssistants}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((activeAssistants / totalAssistants) * 100)}% dari total asisten
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Asisten Senior</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{seniorAssistants}</div>
          <p className="text-xs text-muted-foreground">Dengan pengalaman 2+ semester</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Masa Percobaan</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assistantsOnProbation}</div>
          <p className="text-xs text-muted-foreground">Asisten yang memerlukan perhatian</p>
        </CardContent>
      </Card>
    </div>
  )
}

