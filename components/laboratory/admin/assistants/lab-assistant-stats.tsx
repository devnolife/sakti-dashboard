import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Award, Clock, AlertTriangle } from "lucide-react"
import type { LabAssistant } from "./types"

interface LabAssistantStatsProps {
  assistants: LabAssistant[]
}

export function LabAssistantStats({ assistants }: LabAssistantStatsProps) {
  // Calculate statistics
  const totalAssistants = assistants.length
  const activeAssistants = assistants.filter((a) => a.status === "active").length
  const seniorAssistants = assistants.filter((a) => a.experience >= 2).length
  const assistantsOnProbation = assistants.filter((a) => a.status === "probation").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Assistants</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssistants}</div>
          <p className="text-xs text-muted-foreground">Across all laboratories</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Assistants</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeAssistants}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((activeAssistants / totalAssistants) * 100)}% of total assistants
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Senior Assistants</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{seniorAssistants}</div>
          <p className="text-xs text-muted-foreground">With 2+ semesters experience</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">On Probation</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assistantsOnProbation}</div>
          <p className="text-xs text-muted-foreground">Assistants requiring attention</p>
        </CardContent>
      </Card>
    </div>
  )
}

