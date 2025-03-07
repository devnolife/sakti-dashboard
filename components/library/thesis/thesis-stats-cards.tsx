import { BookOpen, CheckCircle, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockThesisTitles } from "./mock-thesis-data"

export function ThesisStatsCards() {
  // Calculate stats from mock data
  const totalTheses = mockThesisTitles.length
  const approvedTheses = mockThesisTitles.filter(
    (thesis) => thesis.status === "approved" || thesis.status === "completed",
  ).length
  const pendingTheses = mockThesisTitles.filter((thesis) => thesis.status === "pending").length
  const uniqueFields = new Set(mockThesisTitles.map((thesis) => thesis.field)).size

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Judul</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTheses}</div>
          <p className="text-xs text-muted-foreground">Judul skripsi yang telah diajukan</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Judul Disetujui</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvedTheses}</div>
          <p className="text-xs text-muted-foreground">Judul yang telah disetujui</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingTheses}</div>
          <p className="text-xs text-muted-foreground">Judul yang sedang diproses</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bidang Penelitian</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueFields}</div>
          <p className="text-xs text-muted-foreground">Bidang penelitian yang tersedia</p>
        </CardContent>
      </Card>
    </div>
  )
}

