import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: number
  description: string
}

function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

interface ExamStatsProps {
  stats: Array<{
    title: string
    value: number
    description: string
  }>
}

export function ExamStats({ stats }: ExamStatsProps) {
  return (
    <>
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} description={stat.description} />
      ))}
    </>
  )
}

