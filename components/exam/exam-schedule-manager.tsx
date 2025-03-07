"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamScheduleTable } from "./exam-schedule-table"
import { ExamScheduleDialog } from "./exam-schedule-dialog"
import { mockExamSchedules } from "./mock-exam-schedules"
import type { ExamSchedule } from "@/types/exam-schedule"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ExamScheduleManager() {
  const [schedules, setSchedules] = useState<ExamSchedule[]>(mockExamSchedules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<ExamSchedule | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddSchedule = () => {
    setSelectedSchedule(undefined)
    setIsDialogOpen(true)
  }

  const handleEditSchedule = (schedule: ExamSchedule) => {
    setSelectedSchedule(schedule)
    setIsDialogOpen(true)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((schedule) => schedule.id !== id))
  }

  const handleSaveSchedule = (schedule: ExamSchedule) => {
    if (selectedSchedule) {
      // Edit existing schedule
      setSchedules((prev) => prev.map((s) => (s.id === schedule.id ? schedule : s)))
    } else {
      // Add new schedule
      setSchedules((prev) => [...prev, schedule])
    }
  }

  // Filter schedules based on search query
  const filteredSchedules = schedules.filter((schedule) => {
    const searchLower = searchQuery.toLowerCase()
    return (
      schedule.courseName.toLowerCase().includes(searchLower) ||
      schedule.studentName.toLowerCase().includes(searchLower) ||
      schedule.studentNIM.toLowerCase().includes(searchLower) ||
      schedule.instructorName.toLowerCase().includes(searchLower) ||
      schedule.examinerName.toLowerCase().includes(searchLower) ||
      schedule.classroom.name.toLowerCase().includes(searchLower) ||
      schedule.classroom.building.toLowerCase().includes(searchLower)
    )
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Exam Schedule</CardTitle>
          <CardDescription>Manage and view all exam schedules</CardDescription>
        </div>
        <Button onClick={handleAddSchedule}>Add Schedule</Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schedules..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ExamScheduleTable schedules={filteredSchedules} onEdit={handleEditSchedule} onDelete={handleDeleteSchedule} />
      </CardContent>

      <ExamScheduleDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveSchedule}
        schedule={selectedSchedule}
      />
    </Card>
  )
}

