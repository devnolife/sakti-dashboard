"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ExamSchedule, Classroom } from "@/types/exam-schedule"
import { mockClassrooms } from "./mock-exam-schedules"

interface ExamScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (schedule: ExamSchedule) => void
  schedule?: ExamSchedule
}

export function ExamScheduleDialog({ open, onOpenChange, onSave, schedule }: ExamScheduleDialogProps) {
  const isEditing = !!schedule

  const [formData, setFormData] = useState<Partial<ExamSchedule>>(
    schedule || {
      courseName: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "08:00",
      endTime: "10:00",
      classroom: mockClassrooms[0],
      studentName: "",
      studentNIM: "",
      instructorName: "",
      examinerName: "",
    },
  )

  const handleChange = (field: keyof ExamSchedule, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (
      !formData.courseName ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.classroom ||
      !formData.studentName ||
      !formData.studentNIM ||
      !formData.instructorName ||
      !formData.examinerName
    ) {
      return
    }

    onSave({
      id: schedule?.id || `schedule-${Date.now()}`,
      courseName: formData.courseName,
      date: new Date(formData.date).toISOString(),
      startTime: formData.startTime,
      endTime: formData.endTime,
      classroom: formData.classroom as Classroom,
      studentName: formData.studentName,
      studentNIM: formData.studentNIM,
      instructorName: formData.instructorName,
      examinerName: formData.examinerName,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Exam Schedule" : "Add Exam Schedule"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the exam schedule here."
              : "Fill in the details to create a new exam schedule."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="studentName" className="text-right">
              Student Name
            </Label>
            <Input
              id="studentName"
              value={formData.studentName}
              onChange={(e) => handleChange("studentName", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="studentNIM" className="text-right">
              Student NIM
            </Label>
            <Input
              id="studentNIM"
              value={formData.studentNIM}
              onChange={(e) => handleChange("studentNIM", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="courseName" className="text-right">
              Course
            </Label>
            <Input
              id="courseName"
              value={formData.courseName}
              onChange={(e) => handleChange("courseName", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instructorName" className="text-right">
              Instructor
            </Label>
            <Input
              id="instructorName"
              value={formData.instructorName}
              onChange={(e) => handleChange("instructorName", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="examinerName" className="text-right">
              Examiner
            </Label>
            <Input
              id="examinerName"
              value={formData.examinerName}
              onChange={(e) => handleChange("examinerName", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date?.toString().split("T")[0]}
              onChange={(e) => handleChange("date", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Input
              id="startTime"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              End Time
            </Label>
            <Input
              id="endTime"
              type="time"
              value={formData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="classroom" className="text-right">
              Classroom
            </Label>
            <Select
              value={formData.classroom?.id}
              onValueChange={(value) => {
                const classroom = mockClassrooms.find((c) => c.id === value)
                if (classroom) {
                  handleChange("classroom", classroom)
                }
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a classroom" />
              </SelectTrigger>
              <SelectContent>
                {mockClassrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name}, {classroom.building}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isEditing ? "Save changes" : "Add schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

