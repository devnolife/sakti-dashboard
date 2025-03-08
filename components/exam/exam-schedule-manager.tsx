"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExamScheduleTable } from "./exam-schedule-table"
import { ExamScheduleDialog } from "./exam-schedule-dialog"
import { mockExamSchedules } from "./mock-exam-schedules"
import type { ExamSchedule } from "@/types/exam-schedule"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function ExamScheduleManager() {
  const [schedules, setSchedules] = useState<ExamSchedule[]>(mockExamSchedules)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSchedule, setEditingSchedule] = useState<ExamSchedule | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleAddSchedule = (schedule: ExamSchedule) => {
    if (editingSchedule) {
      // Update existing schedule
      setSchedules(schedules.map((s) => (s.id === schedule.id ? schedule : s)))
    } else {
      // Add new schedule
      setSchedules([...schedules, { ...schedule, id: `schedule-${Date.now()}` }])
    }
    setIsDialogOpen(false)
    setEditingSchedule(null)
  }

  const handleEditSchedule = (schedule: ExamSchedule) => {
    setEditingSchedule(schedule)
    setIsDialogOpen(true)
  }

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id))
  }

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.classroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.classroom.building.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Exam Schedules</CardTitle>
          <CardDescription>Manage and view all examination schedules</CardDescription>
        </div>
        <Button
          onClick={() => {
            setEditingSchedule(null)
            setIsDialogOpen(true)
          }}
        >
          Add Schedule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schedules..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ExamScheduleTable schedules={filteredSchedules} onEdit={handleEditSchedule} onDelete={handleDeleteSchedule} />

        <ExamScheduleDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleAddSchedule}
          schedule={editingSchedule}
        />
      </CardContent>
    </Card>
  )
}

