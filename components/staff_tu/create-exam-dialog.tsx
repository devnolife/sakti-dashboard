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
import { toast } from "@/components/ui/use-toast"

import type { Exam } from "@/types/exam"

interface CreateExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExamCreate: (exam: Exam) => void
}

export function CreateExamDialog({ open, onOpenChange, onExamCreate }: CreateExamDialogProps) {
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    title: "",
    studentName: "",
    studentId: "",
    date: "",
    location: "",
    status: "applicant",
    type: "proposal",
    committee: [],
  })

  const handleInputChange = (field: string, value: string) => {
    setNewExam((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!newExam.title || !newExam.studentName || !newExam.studentId) {
      toast({
        title: "Validasi gagal",
        description: "Mohon lengkapi semua field yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    // Create a new exam with a generated ID
    const createdExam: Exam = {
      id: `exam-${Date.now()}`,
      title: newExam.title || "",
      studentName: newExam.studentName || "",
      studentId: newExam.studentId || "",
      date: newExam.date || "",
      location: newExam.location || "",
      status: newExam.status || "applicant",
      type: newExam.type || "proposal",
      committee: [],
    }

    onExamCreate(createdExam)
    onOpenChange(false)

    // Reset form
    setNewExam({
      title: "",
      studentName: "",
      studentId: "",
      date: "",
      location: "",
      status: "applicant",
      type: "proposal",
      committee: [],
    })

    toast({
      title: "Ujian berhasil dibuat",
      description: "Ujian baru telah berhasil ditambahkan.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Tambah Ujian Baru</DialogTitle>
          <DialogDescription>Isi detail ujian baru untuk mahasiswa</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Judul Ujian
            </Label>
            <Input
              id="title"
              placeholder="Contoh: Ujian Proposal Skripsi"
              value={newExam.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="bg-white dark:bg-card border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="text-sm font-medium">
                Nama Mahasiswa
              </Label>
              <Input
                id="studentName"
                placeholder="Nama lengkap mahasiswa"
                value={newExam.studentName}
                onChange={(e) => handleInputChange("studentName", e.target.value)}
                className="bg-white dark:bg-card border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-sm font-medium">
                NIM
              </Label>
              <Input
                id="studentId"
                placeholder="Nomor Induk Mahasiswa"
                value={newExam.studentId}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
                className="bg-white dark:bg-card border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Tipe Ujian
            </Label>
            <Select value={newExam.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger
                id="type"
                className="bg-white dark:bg-card border border-input shadow-sm focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
              >
                <SelectValue placeholder="Pilih tipe ujian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proposal">Ujian Proposal</SelectItem>
                <SelectItem value="result">Ujian Hasil</SelectItem>
                <SelectItem value="final">Ujian Tutup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select value={newExam.status} onValueChange={(value) => handleInputChange("status", value)}>
              <SelectTrigger
                id="status"
                className="bg-white dark:bg-card border border-input shadow-sm focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
              >
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applicant">Pendaftar</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="scheduled">Terjadwal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {newExam.status !== "applicant" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">
                  Tanggal dan Waktu
                </Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={newExam.date ? new Date(newExam.date).toISOString().slice(0, 16) : ""}
                  onChange={(e) => handleInputChange("date", new Date(e.target.value).toISOString())}
                  className="bg-white dark:bg-card border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">
                  Lokasi
                </Label>
                <Input
                  id="location"
                  placeholder="Contoh: Ruang Sidang A"
                  value={newExam.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-white dark:bg-card border border-input shadow-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                />
              </div>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Buat Ujian
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

