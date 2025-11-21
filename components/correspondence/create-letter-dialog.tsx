"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, UserCheck, FileText, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { searchStudents, createLetterRequestForStudent } from "@/app/actions/correspondence-actions"

interface Student {
  id: string
  nim: string
  users: {
    name: string
  }
  prodi?: {
    nama: string
  }
}

interface CreateLetterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateLetterDialog({ open, onOpenChange, onSuccess }: CreateLetterDialogProps) {
  const { toast } = useToast()
  const [step, setStep] = useState<"search" | "form">("search")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form states
  const [letterType, setLetterType] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [purpose, setPurpose] = useState("")

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setStep("search")
      setSearchQuery("")
      setSearchResults([])
      setSelectedStudent(null)
      setLetterType("")
      setTitle("")
      setDescription("")
      setPurpose("")
    }
  }, [open])

  // Handle search students
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Masukkan NIM atau nama mahasiswa",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      const results = await searchStudents(searchQuery)
      setSearchResults(results)

      if (results.length === 0) {
        toast({
          title: "Tidak ditemukan",
          description: "Mahasiswa tidak ditemukan",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error searching students:", error)
      toast({
        title: "Error",
        description: "Gagal mencari mahasiswa",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  // Handle select student
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student)
    setStep("form")
  }

  // Handle letter type change
  const handleLetterTypeChange = (value: string) => {
    setLetterType(value)
    // Auto-fill title based on letter type
    const titles: Record<string, string> = {
      active_student: "Surat Keterangan Aktif Kuliah",
      leave_absence: "Surat Cuti Kuliah",
      loan_application: "Surat Keterangan untuk Pengajuan Pinjaman",
      tuition_extension: "Surat Perpanjangan Pembayaran SPP",
      internship_recommendation: "Surat Rekomendasi Magang",
      scholarship_recommendation: "Surat Rekomendasi Beasiswa",
      transcript_request: "Surat Permintaan Transkrip Nilai",
      research_permission: "Surat Izin Penelitian",
      graduation_confirmation: "Surat Keterangan Lulus",
    }
    setTitle(titles[value] || "")
  }

  // Handle submit
  const handleSubmit = async () => {
    if (!selectedStudent || !letterType || !title) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const result = await createLetterRequestForStudent({
        studentId: selectedStudent.id,
        type: letterType,
        title,
        description: description || undefined,
        purpose: purpose || undefined,
      })

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Surat berhasil dibuat untuk mahasiswa",
        })
        onSuccess()
        onOpenChange(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Gagal membuat surat",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating letter:", error)
      toast({
        title: "Error",
        description: "Gagal membuat surat",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === "search" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Cari Mahasiswa
              </DialogTitle>
              <DialogDescription>
                Cari mahasiswa berdasarkan NIM atau nama untuk membuat surat
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Masukkan NIM atau nama mahasiswa..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Mencari...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Cari
                    </>
                  )}
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Hasil Pencarian:</p>
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {searchResults.map((student) => (
                      <div
                        key={student.id}
                        className="p-4 transition-colors border rounded-lg cursor-pointer hover:bg-accent"
                        onClick={() => handleSelectStudent(student)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{student.users.name}</p>
                            <p className="text-sm text-muted-foreground">NIM: {student.nim}</p>
                            {student.prodi && (
                              <p className="text-sm text-muted-foreground">Prodi: {student.prodi.nama}</p>
                            )}
                          </div>
                          <Button size="sm" variant="outline">
                            Pilih
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Buat Surat untuk Mahasiswa
              </DialogTitle>
              <DialogDescription>
                Lengkapi informasi surat yang akan dibuat
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Selected Student Info */}
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium">Mahasiswa yang dipilih:</p>
                </div>
                <div>
                  <p className="font-medium">{selectedStudent?.users.name}</p>
                  <p className="text-sm text-muted-foreground">NIM: {selectedStudent?.nim}</p>
                  {selectedStudent?.prodi && (
                    <p className="text-sm text-muted-foreground">Prodi: {selectedStudent.prodi.nama}</p>
                  )}
                </div>
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 mt-2"
                  onClick={() => setStep("search")}
                >
                  Ganti mahasiswa
                </Button>
              </div>

              {/* Letter Type */}
              <div className="space-y-2">
                <Label htmlFor="letterType">Jenis Surat *</Label>
                <Select value={letterType} onValueChange={handleLetterTypeChange}>
                  <SelectTrigger id="letterType">
                    <SelectValue placeholder="Pilih jenis surat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active_student">Surat Keterangan Aktif Kuliah</SelectItem>
                    <SelectItem value="leave_absence">Surat Cuti Kuliah</SelectItem>
                    <SelectItem value="loan_application">Surat Keterangan untuk Pengajuan Pinjaman</SelectItem>
                    <SelectItem value="tuition_extension">Surat Perpanjangan Pembayaran SPP</SelectItem>
                    <SelectItem value="internship_recommendation">Surat Rekomendasi Magang</SelectItem>
                    <SelectItem value="scholarship_recommendation">Surat Rekomendasi Beasiswa</SelectItem>
                    <SelectItem value="transcript_request">Surat Permintaan Transkrip Nilai</SelectItem>
                    <SelectItem value="research_permission">Surat Izin Penelitian</SelectItem>
                    <SelectItem value="graduation_confirmation">Surat Keterangan Lulus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Surat *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul surat"
                />
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose">Tujuan Surat</Label>
                <Input
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Contoh: Keperluan pengajuan beasiswa"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Keterangan Tambahan</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tambahkan keterangan jika diperlukan..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setStep("search")}>
                Kembali
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting || !letterType || !title}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Membuat...
                  </>
                ) : (
                  "Buat Surat"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
