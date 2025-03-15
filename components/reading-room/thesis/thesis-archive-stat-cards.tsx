import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Archive, BookOpen, FileDigit, Library } from "lucide-react"

interface ThesisArchiveStatCardsProps {
  stats: {
    total: number
    byDepartment: Array<{ department: string; count: number }>
    byYear: Array<{ year: number; count: number }>
    digitalCopies: number
  }
}

export function ThesisArchiveStatCards({ stats }: ThesisArchiveStatCardsProps) {
  // Find the department with the most theses
  const topDepartment = stats.byDepartment.reduce((prev, current) => (prev.count > current.count ? prev : current), {
    department: "",
    count: 0,
  })

  // Find the year with the most theses
  const topYear = stats.byYear.reduce((prev, current) => (prev.count > current.count ? prev : current), {
    year: 0,
    count: 0,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Archives</CardTitle>
          <Archive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">All archived thesis documents</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Digital Copies</CardTitle>
          <FileDigit className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.digitalCopies}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.digitalCopies / stats.total) * 100)}% of archives digitized
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Department</CardTitle>
          <Library className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topDepartment.department}</div>
          <p className="text-xs text-muted-foreground">
            {topDepartment.count} theses ({Math.round((topDepartment.count / stats.total) * 100)}%)
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Active Year</CardTitle>
          <BookOpen className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topYear.year}</div>
          <p className="text-xs text-muted-foreground">{topYear.count} theses archived</p>
        </CardContent>
      </Card>
    </div>
  )
}

