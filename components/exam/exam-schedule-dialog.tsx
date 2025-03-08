"use client"

import { useState, useEffect } from "react"
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
import { DatePicker } from "@/components/ui/date-picker"
import type { ExamSchedule, Classroom } from "@/types/exam-schedule"
import { mockClassrooms } from "./mock-exam-schedules"

interface ExamScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (schedule: ExamSchedule) => void
  schedule: ExamSchedule | null
}

export function ExamScheduleDialog({ open, onOpenChange, onSave, schedule }: ExamScheduleDialogProps) {
  const [courseName, setCourseName] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState("10:00")
  const [selectedBuilding, setSelectedBuilding] = useState("all-buildings")
  const [selectedClassroom, setSelectedClassroom] = useState("")
  const [availableClassrooms, setAvailableClassrooms] = useState<Classroom[]>(mockClassrooms)
  const [formError, setFormError] = useState("")

  // Get unique buildings
  const buildings = ["all-buildings", ...Array.from(new Set(mockClassrooms.map((c) => c.building)))]

  // Reset form when dialog opens/closes or editing schedule changes
  useEffect(() => {
    if (open && schedule) {
      setCourseName(schedule.courseName)
      setDate(new Date(schedule.date))
      setStartTime(schedule.startTime)
      setEndTime(schedule.endTime)
      setSelectedBuilding(schedule.classroom.building)
      setSelectedClassroom(schedule.classroom.id)
    } else if (open && !schedule) {
      setCourseName("")
      setDate(new Date())
      setStartTime("08:00")
      setEndTime("10:00")
      setSelectedBuilding("all-buildings")
      setSelectedClassroom("")
    }
  }, [open, schedule])

  // Filter classrooms when building changes
  useEffect(() => {
    if (selectedBuilding === "all-buildings") {
      setAvailableClassrooms(mockClassrooms)
    } else {
      setAvailableClassrooms(mockClassrooms.filter((c) => c.building === selectedBuilding))
    }
    setSelectedClassroom("")
  }, [selectedBuilding])

  const handleSave = () => {
    // Validate form
    if (!courseName) {
      setFormError("Course name is required")
      return
    }
    if (!date) {
      setFormError("Date is required")
      return
    }
    if (!startTime) {
      setFormError("Start time is required")
      return
    }
    if (!endTime) {
      setFormError("End time is required")
      return
    }
    if (!selectedClassroom) {
      setFormError("Classroom is required")
      return
    }

    // Check if end time is after start time
    if (startTime >= endTime) {
      setFormError("End time must be after start time")
      return
    }

    const classroom = mockClassrooms.find((c) => c.id === selectedClassroom)
    if (!classroom) {
      setFormError("Invalid classroom selected")
      return
    }

    const newSchedule: ExamSchedule = {
      id: schedule?.id || "",
      courseName,
      date: date.toISOString(),
      startTime,
      endTime,
      classroom,
    }

    onSave(newSchedule)
    setFormError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{schedule ? "Edit Exam Schedule" : "Add Exam Schedule"}</DialogTitle>
          <DialogDescription>Enter the details for the exam schedule.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g. Computer Science 101"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Exam Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="building">Building</Label>
            <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
              <SelectTrigger id="building">
                <SelectValue placeholder="Select building" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-buildings">All Buildings</SelectItem>
                {buildings
                  .filter((b) => b !== "all-buildings")
                  .map((building) => (
                    <SelectItem key={building} value={building}>
                      {building}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="classroom">Classroom</Label>
            <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
              <SelectTrigger id="classroom">
                <SelectValue placeholder="Select classroom" />
              </SelectTrigger>
              <SelectContent>
                {availableClassrooms.map((classroom) => (
                  <SelectItem key={classroom.id} value={classroom.id}>
                    {classroom.name} ({classroom.building})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {formError && <p className="text-sm text-red-500">{formError}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

