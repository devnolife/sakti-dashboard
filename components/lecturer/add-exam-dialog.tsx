"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface Student {
  id: string
  nim: string
  name: string
}

interface AddExamDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function AddExamDialog({ open, onOpenChange, onSuccess }: AddExamDialogProps) {
  const [loading, setLoading] = useState(false)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [students, setStudents] = useState<Student[]>([])

  const [formData, setFormData] = useState({
    student_id: "",
    title: "",
    type: "",
    abstract: "",
    scheduled_date: undefined as Date | undefined,
    location: ""
  })

  // Fetch students (mahasiswa bimbingan)
  useEffect(() => {
    if (open) {
      fetchStudents()
    }
  }, [open])

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true)
      const response = await fetch('/api/dosen/students')

      if (!response.ok) {
        throw new Error('Failed to fetch students')
      }

      const data = await response.json()
      setStudents(data.data || [])
    } catch (error) {
      console.error('Error fetching students:', error)
      toast({
        title: "Error",
        description: "Gagal memuat daftar mahasiswa",
        variant: "destructive"
      })
    } finally {
      setLoadingStudents(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.student_id || !formData.title || !formData.type) {
      toast({
        title: "Error",
        description: "Mohon lengkapi field yang wajib diisi (Mahasiswa, Judul, dan Jenis Ujian)",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)

      console.log('Submitting exam data:', formData)

      const response = await fetch('/api/dosen/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          scheduled_date: formData.scheduled_date?.toISOString()
        })
      })

      const data = await response.json()
      console.log('Response from API:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create exam')
      }

      toast({
        title: "Berhasil! 🎉",
        description: "Ujian berhasil ditambahkan"
      })

      // Reset form
      setFormData({
        student_id: "",
        title: "",
        type: "",
        abstract: "",
        scheduled_date: undefined,
        location: ""
      })

      onOpenChange(false)
      onSuccess?.()

    } catch (error) {
      console.error('Error creating exam:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menambahkan ujian. Silakan coba lagi.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Ujian Baru</DialogTitle>
          <DialogDescription>
            Tambahkan jadwal ujian untuk mahasiswa bimbingan Anda
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student Selection */}
          <div className="space-y-2">
            <Label htmlFor="student">Mahasiswa <span className="text-red-500">*</span></Label>
            {loadingStudents ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Memuat mahasiswa...</span>
              </div>
            ) : (
              <Select
                value={formData.student_id}
                onValueChange={(value) => setFormData({ ...formData, student_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mahasiswa" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.nim} - {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Exam Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Jenis Ujian <span className="text-red-500">*</span></Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih jenis ujian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proposal">Proposal</SelectItem>
                <SelectItem value="result">Hasil</SelectItem>
                <SelectItem value="closing">Skripsi/Tutup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Judul <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              placeholder="Judul penelitian/skripsi"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstrak</Label>
            <Textarea
              id="abstract"
              placeholder="Ringkasan penelitian (opsional)"
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              rows={4}
            />
          </div>

          {/* Scheduled Date */}
          <div className="space-y-2">
            <Label htmlFor="scheduled_date">Tanggal Ujian</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.scheduled_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.scheduled_date ? (
                    format(formData.scheduled_date, "PPP", { locale: id })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.scheduled_date}
                  onSelect={(date) => setFormData({ ...formData, scheduled_date: date })}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              placeholder="Ruang/tempat ujian"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Tambah Ujian
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
