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
  const [studentName, setStudentName] = useState("")
  const [studentNIM, setStudentNIM] = useState("")
  const [instructorName, setInstructorName] = useState("")
  const [examinerName, setExaminerName] = useState("")
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
      setStudentName(schedule.studentName || "")
      setStudentNIM(schedule.studentNIM || "")
      setInstructorName(schedule.instructorName || "")
      setExaminerName(schedule.examinerName || "")
      setDate(new Date(schedule.date))
      setStartTime(schedule.startTime)
      setEndTime(schedule.endTime)
      setSelectedBuilding(schedule.classroom.building)
      setSelectedClassroom(schedule.classroom.id)
    } else if (open && !schedule) {
      setCourseName("")
      setStudentName("")
      setStudentNIM("")
      setInstructorName("")
      setExaminerName("")
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
      setFormError("Judul skripsi diperlukan")
      return
    }
    if (!studentName) {
      setFormError("Nama mahasiswa diperlukan")
      return
    }
    if (!studentNIM) {
      setFormError("NIM mahasiswa diperlukan")
      return
    }
    if (!date) {
      setFormError("Tanggal diperlukan")
      return
    }
    if (!startTime) {
      setFormError("Waktu mulai diperlukan")
      return
    }
    if (!endTime) {
      setFormError("Waktu selesai diperlukan")
      return
    }
    if (!selectedClassroom) {
      setFormError("Ruangan diperlukan")
      return
    }

    // Check if end time is after start time
    if (startTime >= endTime) {
      setFormError("Waktu selesai harus setelah waktu mulai")
      return
    }

    const classroom = mockClassrooms.find((c) => c.id === selectedClassroom)
    if (!classroom) {
      setFormError("Ruangan tidak valid")
      return
    }

    const newSchedule: ExamSchedule = {
      id: schedule?.id || "",
      courseName,
      studentName,
      studentNIM,
      instructorName,
      examinerName,
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
          <DialogTitle>{schedule ? "Edit Jadwal Ujian" : "Tambah Jadwal Ujian"}</DialogTitle>
          <DialogDescription>Masukkan detail untuk jadwal ujian skripsi.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="courseName">Judul Skripsi</Label>
            <Input
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Contoh: Analisis Performa Algoritma Machine Learning"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="studentName">Nama Mahasiswa</Label>
            <Input
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nama lengkap mahasiswa"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="studentNIM">NIM Mahasiswa</Label>
            <Input
              id="studentNIM"
              value={studentNIM}
              onChange={(e) => setStudentNIM(e.target.value)}
              placeholder="Nomor Induk Mahasiswa"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instructorName">Nama Pembimbing</Label>
            <Input
              id="instructorName"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              placeholder="Nama pembimbing utama"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="examinerName">Nama Penguji</Label>
            <Input
              id="examinerName"
              value={examinerName}
              onChange={(e) => setExaminerName(e.target.value)}
              placeholder="Nama penguji utama"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Tanggal Ujian</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={date ? date.toISOString().split('T')[0] : ''}
                onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Waktu Mulai</Label>
              <Input id="startTime" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">Waktu Selesai</Label>
              <Input id="endTime" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="building">Gedung</Label>
            <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
              <SelectTrigger id="building">
                <SelectValue placeholder="Pilih gedung" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-buildings">Semua Gedung</SelectItem>
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
            <Label htmlFor="classroom">Ruangan</Label>
            <Select value={selectedClassroom} onValueChange={setSelectedClassroom}>
              <SelectTrigger id="classroom">
                <SelectValue placeholder="Pilih ruangan" />
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
            Batal
          </Button>
          <Button onClick={handleSave}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

