"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { mockRecitationStaff } from "./mock-recitation-data"

interface AddStaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStaffDialog({ open, onOpenChange }: AddStaffDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    position: "",
    qualification: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add new staff to the mock data (in a real app, this would be an API call)
      const newStaff = {
        id: `STF${(mockRecitationStaff.length + 1).toString().padStart(3, "0")}`,
        name: formData.name,
        department: formData.department,
        position: formData.position,
        qualification: formData.qualification,
        testsAdministered: 0,
        dateAdded: new Date().toISOString().split("T")[0],
        status: "active" as const,
      }

      // In a real app, you would update the state or make an API call
      console.log("New staff added:", newStaff)

      toast({
        title: "Staff Penguji Berhasil Ditambahkan",
        description: `${formData.name} telah ditambahkan sebagai staff penguji baru.`,
      })

      // Reset form and close dialog
      setFormData({
        name: "",
        department: "",
        position: "",
        qualification: "",
      })
      setIsSubmitting(false)
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-background to-background/80">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
            Tambah Staff Penguji Baru
          </DialogTitle>
          <DialogDescription>
            Tambahkan staff yang memiliki kualifikasi untuk menguji hafalan mahasiswa
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
              className="border-primary-100 focus-visible:ring-primary-200"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Fakultas/Jurusan</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => handleSelectChange("department", value)}
              required
            >
              <SelectTrigger className="border-primary-100 focus-visible:ring-primary-200">
                <SelectValue placeholder="Pilih fakultas/jurusan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fakultas Agama">Fakultas Agama</SelectItem>
                <SelectItem value="Fakultas Pendidikan">Fakultas Pendidikan</SelectItem>
                <SelectItem value="Fakultas Teknik">Fakultas Teknik</SelectItem>
                <SelectItem value="Fakultas Ekonomi">Fakultas Ekonomi</SelectItem>
                <SelectItem value="Fakultas Hukum">Fakultas Hukum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Jabatan</Label>
            <Select value={formData.position} onValueChange={(value) => handleSelectChange("position", value)} required>
              <SelectTrigger className="border-primary-100 focus-visible:ring-primary-200">
                <SelectValue placeholder="Pilih jabatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dosen">Dosen</SelectItem>
                <SelectItem value="Dosen Senior">Dosen Senior</SelectItem>
                <SelectItem value="Kepala Jurusan">Kepala Jurusan</SelectItem>
                <SelectItem value="Dekan">Dekan</SelectItem>
                <SelectItem value="Staff Pengajar">Staff Pengajar</SelectItem>
                <SelectItem value="Ustadz/Ustadzah">Ustadz/Ustadzah</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Kualifikasi</Label>
            <Textarea
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Contoh: Hafiz Quran 30 Juz, Sertifikasi Tahfidz, dll."
              required
              className="border-primary-100 focus-visible:ring-primary-200 min-h-[100px]"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-primary-100 hover:bg-primary-50 hover:text-primary-700"
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary-600">
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

