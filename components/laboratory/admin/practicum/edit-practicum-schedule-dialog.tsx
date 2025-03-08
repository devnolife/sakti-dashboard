"use client"

import type React from "react"

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
import type { PracticumSchedule } from "./types"
import { mockLabAssistants } from "../assistants/mock-lab-assistants"

interface EditPracticumScheduleDialogProps {
  schedule: PracticumSchedule
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (schedule: PracticumSchedule) => void
}

export default function EditPracticumScheduleDialog({
  schedule,
  open,
  onOpenChange,
  onUpdate,
}: EditPracticumScheduleDialogProps) {
  const [title, setTitle] = useState(schedule.title)
  const [course, setCourse] = useState(schedule.course)
  const [day, setDay] = useState(schedule.day)
  const [startTime, setStartTime] = useState(schedule.startTime)
  const [endTime, setEndTime] = useState(schedule.endTime)
  const [lab, setLab] = useState(schedule.lab)
  const [selectedAssistants, setSelectedAssistants] = useState<string[]>(schedule.assistants)
  const [status, setStatus] = useState(schedule.status)

  useEffect(() => {
    if (open) {
      setTitle(schedule.title)
      setCourse(schedule.course)
      setDay(schedule.day)
      setStartTime(schedule.startTime)
      setEndTime(schedule.endTime)
      setLab(schedule.lab)
      setSelectedAssistants(schedule.assistants)
      setStatus(schedule.status)
    }
  }, [open, schedule])

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
  const statuses = [
    { value: "active", label: "Aktif" },
    { value: "upcoming", label: "Akan Datang" },
    { value: "completed", label: "Selesai" },
    { value: "cancelled", label: "Dibatalkan" },
  ]

  const assistants = mockLabAssistants.map((assistant) => assistant.name)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedSchedule: PracticumSchedule = {
      ...schedule,
      title,
      course,
      day,
      startTime,
      endTime,
      lab,
      assistants: selectedAssistants,
      status,
    }

    onUpdate(updatedSchedule)
    onOpenChange(false)
  }

  const handleAssistantChange = (assistant: string) => {
    setSelectedAssistants((prev) => {
      if (prev.includes(assistant)) {
        return prev.filter((a) => a !== assistant)
      } else {
        return [...prev, assistant]
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Jadwal Praktikum</DialogTitle>
            <DialogDescription>Ubah detail jadwal praktikum. Klik simpan ketika selesai.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Judul
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Mata Kuliah
              </Label>
              <Input
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="day" className="text-right">
                Hari
              </Label>
              <Select value={day} onValueChange={setDay} required>
                <SelectTrigger id="day" className="col-span-3">
                  <SelectValue placeholder="Pilih hari" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime" className="text-right">
                Waktu Mulai
              </Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endTime" className="text-right">
                Waktu Selesai
              </Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lab" className="text-right">
                Laboratorium
              </Label>
              <Input id="lab" value={lab} onChange={(e) => setLab(e.target.value)} className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Asisten Lab</Label>
              <div className="col-span-3 border rounded-md p-2 max-h-[150px] overflow-y-auto">
                {assistants.map((assistant) => (
                  <div key={assistant} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      id={`assistant-edit-${assistant}`}
                      checked={selectedAssistants.includes(assistant)}
                      onChange={() => handleAssistantChange(assistant)}
                      className="rounded"
                    />
                    <Label htmlFor={`assistant-edit-${assistant}`}>{assistant}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger id="status" className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

