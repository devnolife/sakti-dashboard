"use client"

import type React from "react"

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
import type { PracticumSchedule } from "./types"
import { mockLabAssistants } from "../assistants/mock-lab-assistants"

interface AddPracticumScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (schedule: PracticumSchedule) => void
  labs: string[]
}

export default function AddPracticumScheduleDialog({
  open,
  onOpenChange,
  onAdd,
  labs,
}: AddPracticumScheduleDialogProps) {
  const [title, setTitle] = useState("")
  const [course, setCourse] = useState("")
  const [day, setDay] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [lab, setLab] = useState("")
  const [selectedAssistants, setSelectedAssistants] = useState<string[]>([])
  const [status, setStatus] = useState("upcoming")

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

    const newSchedule: Omit<PracticumSchedule, "id"> = {
      title,
      course,
      day,
      startTime,
      endTime,
      lab,
      assistants: selectedAssistants,
      status,
    }

    onAdd(newSchedule as PracticumSchedule)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setCourse("")
    setDay("")
    setStartTime("")
    setEndTime("")
    setLab("")
    setSelectedAssistants([])
    setStatus("upcoming")
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Praktikum</DialogTitle>
            <DialogDescription>Tambahkan jadwal praktikum baru. Klik simpan ketika selesai.</DialogDescription>
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
              <Select value={lab} onValueChange={setLab} required>
                <SelectTrigger id="lab" className="col-span-3">
                  <SelectValue placeholder="Pilih laboratorium" />
                </SelectTrigger>
                <SelectContent>
                  {labs.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Asisten Lab</Label>
              <div className="col-span-3 border rounded-md p-2 max-h-[150px] overflow-y-auto">
                {assistants.map((assistant) => (
                  <div key={assistant} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                      id={`assistant-${assistant}`}
                      checked={selectedAssistants.includes(assistant)}
                      onChange={() => handleAssistantChange(assistant)}
                      className="rounded"
                    />
                    <Label htmlFor={`assistant-${assistant}`}>{assistant}</Label>
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
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

