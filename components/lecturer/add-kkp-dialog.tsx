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

interface Company {
  id: string
  name: string
}

interface AddKkpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  isPlus?: boolean // untuk membedakan KKP biasa atau KKP Plus
}

export function AddKkpDialog({ open, onOpenChange, onSuccess, isPlus = false }: AddKkpDialogProps) {
  const [loading, setLoading] = useState(false)
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [loadingCompanies, setLoadingCompanies] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [companies, setCompanies] = useState<Company[]>([])

  const [formData, setFormData] = useState({
    student_id: "",
    company_id: "",
    topic: "",
    description: "",
    start_date: undefined as Date | undefined,
    end_date: undefined as Date | undefined,
    location: ""
  })

  // Fetch students (mahasiswa bimbingan)
  useEffect(() => {
    if (open) {
      fetchStudents()
      fetchCompanies()
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

  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true)
      const response = await fetch('/api/admin/companies')

      if (!response.ok) {
        throw new Error('Failed to fetch companies')
      }

      const data = await response.json()
      setCompanies(data.data || [])
    } catch (error) {
      console.error('Error fetching companies:', error)
      toast({
        title: "Error",
        description: "Gagal memuat daftar perusahaan",
        variant: "destructive"
      })
    } finally {
      setLoadingCompanies(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.student_id || !formData.topic || !formData.company_id) {
      toast({
        title: "Error",
        description: "Mohon lengkapi field yang wajib diisi (Mahasiswa, Perusahaan, dan Topik)",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)

      console.log('Submitting KKP data:', formData)

      const response = await fetch('/api/dosen/kkp-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          is_plus: isPlus,
          start_date: formData.start_date?.toISOString(),
          end_date: formData.end_date?.toISOString()
        })
      })

      const data = await response.json()
      console.log('Response from API:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create KKP application')
      }

      toast({
        title: "Berhasil! 🎉",
        description: `Mahasiswa berhasil ditambahkan ke bimbingan ${isPlus ? 'KKP Plus' : 'KKP'}`
      })

      // Reset form
      setFormData({
        student_id: "",
        company_id: "",
        topic: "",
        description: "",
        start_date: undefined,
        end_date: undefined,
        location: ""
      })

      onOpenChange(false)
      onSuccess?.()

    } catch (error) {
      console.error('Error creating KKP application:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal menambahkan mahasiswa. Silakan coba lagi.",
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
          <DialogTitle>Tambah Mahasiswa Bimbingan {isPlus ? 'KKP Plus' : 'KKP'}</DialogTitle>
          <DialogDescription>
            Tambahkan mahasiswa baru ke dalam bimbingan {isPlus ? 'KKP Plus' : 'KKP'} Anda
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

          {/* Company Selection */}
          <div className="space-y-2">
            <Label htmlFor="company">Perusahaan <span className="text-red-500">*</span></Label>
            {loadingCompanies ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Memuat perusahaan...</span>
              </div>
            ) : (
              <Select
                value={formData.company_id}
                onValueChange={(value) => setFormData({ ...formData, company_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih perusahaan" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic">Topik KKP <span className="text-red-500">*</span></Label>
            <Input
              id="topic"
              placeholder="Topik/judul KKP"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Deskripsi singkat tentang topik KKP (opsional)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start_date">Tanggal Mulai</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.start_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.start_date ? (
                    format(formData.start_date, "PPP", { locale: id })
                  ) : (
                    <span>Pilih tanggal mulai</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.start_date}
                  onSelect={(date) => setFormData({ ...formData, start_date: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end_date">Tanggal Selesai</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.end_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.end_date ? (
                    format(formData.end_date, "PPP", { locale: id })
                  ) : (
                    <span>Pilih tanggal selesai</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.end_date}
                  onSelect={(date) => setFormData({ ...formData, end_date: date })}
                  initialFocus
                  disabled={(date) => formData.start_date ? date < formData.start_date : false}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Lokasi</Label>
            <Input
              id="location"
              placeholder="Lokasi pelaksanaan KKP"
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
              Tambah Mahasiswa
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
