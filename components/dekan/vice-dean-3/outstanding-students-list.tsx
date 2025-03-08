"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Award, ChevronRight, Medal, Trophy } from "lucide-react"
import type { OutstandingStudent } from "@/types/outstanding-student"
import { getOutstandingStudentsByDepartment } from "./mock-outstanding-students"
import { StudentAchievementDialog } from "./student-achievement-dialog"

interface OutstandingStudentsListProps {
  departmentId: string
}

export function OutstandingStudentsList({ departmentId }: OutstandingStudentsListProps) {
  const [selectedStudent, setSelectedStudent] = useState<OutstandingStudent | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const students = getOutstandingStudentsByDepartment(departmentId)

  const handleOpenDialog = (student: OutstandingStudent) => {
    setSelectedStudent(student)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case "academic":
        return <Award className="h-4 w-4" />
      case "competition":
        return <Trophy className="h-4 w-4" />
      default:
        return <Medal className="h-4 w-4" />
    }
  }

  const getDepartmentColor = (departmentId: string) => {
    const colors: Record<string, string> = {
      civil: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      electrical: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      architecture: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      informatics: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      urban: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300",
    }
    return colors[departmentId] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {students.map((student) => (
          <Card
            key={student.id}
            className="overflow-hidden border-none shadow-md bg-white dark:bg-gray-900 transition-all duration-200 hover:shadow-lg"
          >
            <CardContent className="p-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-800">
                  <Avatar className="h-12 w-12 border-2 border-primary-100 dark:border-primary-900">
                    <AvatarImage src={student.photoUrl} alt={student.name} />
                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold truncate">{student.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{student.nim}</p>
                  </div>
                  <Badge className={`${getDepartmentColor(student.departmentId)}`}>{student.department}</Badge>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">IPK: {student.gpa.toFixed(2)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Tahun ke-{student.year}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{student.bio}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {student.achievements.slice(0, 2).map((achievement) => (
                      <Badge key={achievement.id} variant="outline" className="flex items-center gap-1 text-xs">
                        {getAchievementIcon(achievement.category)}
                        <span className="truncate max-w-[150px]">{achievement.title}</span>
                      </Badge>
                    ))}
                    {student.achievements.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{student.achievements.length - 2} lainnya
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 border-primary-200 hover:border-primary-300 hover:bg-primary-50 dark:border-primary-800 dark:hover:border-primary-700 dark:hover:bg-primary-950"
                    onClick={() => handleOpenDialog(student)}
                  >
                    <span>Lihat Detail</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedStudent && (
        <StudentAchievementDialog student={selectedStudent} open={dialogOpen} onClose={handleCloseDialog} />
      )}
    </>
  )
}

