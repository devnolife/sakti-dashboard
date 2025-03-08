import { ArrowDown, ArrowUp, LineChart, Percent, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StudentGrade } from "./types"

interface PracticumGradeStatsProps {
  grades: StudentGrade[]
}

export default function PracticumGradeStats({ grades }: PracticumGradeStatsProps) {
  // Calculate statistics
  const totalStudents = grades.length
  const averageGrade = totalStudents ? grades.reduce((sum, grade) => sum + grade.finalGrade, 0) / totalStudents : 0

  const passingGrades = grades.filter((grade) => grade.finalGrade >= 70)
  const passingRate = totalStudents ? (passingGrades.length / totalStudents) * 100 : 0

  // Calculate grade distribution
  const excellent = grades.filter((grade) => grade.finalGrade >= 85).length
  const good = grades.filter((grade) => grade.finalGrade >= 70 && grade.finalGrade < 85).length
  const satisfactory = grades.filter((grade) => grade.finalGrade >= 60 && grade.finalGrade < 70).length
  const needsImprovement = grades.filter((grade) => grade.finalGrade < 60).length

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStudents}</div>
          <p className="text-xs text-muted-foreground">Enrolled in selected practicum</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageGrade.toFixed(2)}</div>
          <div className="flex items-center pt-1">
            {averageGrade > 75 ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-xs ${averageGrade > 75 ? "text-green-500" : "text-red-500"}`}>
              {averageGrade > 75 ? "Above" : "Below"} target average
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Passing Rate</CardTitle>
          <Percent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{passingRate.toFixed(2)}%</div>
          <div className="flex items-center pt-1">
            {passingRate > 80 ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-xs ${passingRate > 80 ? "text-green-500" : "text-red-500"}`}>
              {passingRate > 80 ? "Above" : "Below"} target passing rate
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <div className="h-2 w-2 rounded-full bg-yellow-500" />
            <div className="h-2 w-2 rounded-full bg-red-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs">Excellent</span>
            <span className="text-xs font-bold">{excellent}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Good</span>
            <span className="text-xs font-bold">{good}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Satisfactory</span>
            <span className="text-xs font-bold">{satisfactory}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Needs Improvement</span>
            <span className="text-xs font-bold">{needsImprovement}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

