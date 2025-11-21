"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, UserCheck, FileText, Loader2, ArrowLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { searchStudents, createLetterRequestForStudent } from "@/app/actions/correspondence-actions"
import { Badge } from "@/components/ui/badge"

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

interface CreateLetterFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function CreateLetterForm({ onSuccess, onCancel }: CreateLetterFormProps) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Buat Surat untuk Mahasiswa</h2>
            <p className="text-sm text-muted-foreground">
              {step === "search" ? "Cari dan pilih mahasiswa" : "Lengkapi informasi surat"}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-sm">
          Langkah {step === "search" ? "1" : "2"} dari 2
        </Badge>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-2 ${step === "search" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === "search" ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
            1
          </div>
          <span className="text-sm font-medium">Pilih Mahasiswa</span>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
        <div className={`flex items-center gap-2 ${step === "form" ? "text-primary" : "text-muted-foreground"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === "form" ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
            2
          </div>
          <span className="text-sm font-medium">Isi Form Surat</span>
        </div>
      </div>

      {/* Content */}
      {step === "search" ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Cari Mahasiswa
            </CardTitle>
            <CardDescription>
              Cari mahasiswa berdasarkan NIM atau nama untuk membuat surat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
                className="text-base"
              />
              <Button onClick={handleSearch} disabled={isSearching} size="lg">
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Hasil Pencarian</p>
                  <Badge variant="secondary">{searchResults.length} mahasiswa ditemukan</Badge>
                </div>
                <div className="grid gap-3 max-h-[500px] overflow-y-auto">
                  {searchResults.map((student) => (
                    <Card
                      key={student.id}
                      className="cursor-pointer hover:bg-accent transition-colors border-2 hover:border-primary"
                      onClick={() => handleSelectStudent(student)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="font-semibold text-lg">{student.users.name}</p>
                            <p className="text-sm text-muted-foreground">NIM: {student.nim}</p>
                            {student.prodi && (
                              <Badge variant="outline" className="mt-1">
                                {student.prodi.nama}
                              </Badge>
                            )}
                          </div>
                          <Button size="sm">
                            Pilih
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Student Info */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <UserCheck className="w-5 h-5" />
                Mahasiswa Terpilih
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="font-semibold text-lg mb-2">{selectedStudent?.users.name}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium">NIM:</span> {selectedStudent?.nim}
                  </p>
                  {selectedStudent?.prodi && (
                    <p className="text-muted-foreground">
                      <span className="font-medium">Prodi:</span> {selectedStudent.prodi.nama}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setStep("search")}
              >
                <Search className="w-4 h-4 mr-2" />
                Ganti Mahasiswa
              </Button>
            </CardContent>
          </Card>

          {/* Right Column - Letter Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Informasi Surat
              </CardTitle>
              <CardDescription>
                Lengkapi detail surat yang akan dibuat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Letter Type */}
              <div className="space-y-2">
                <Label htmlFor="letterType" className="text-base">
                  Jenis Surat <span className="text-destructive">*</span>
                </Label>
                <Select value={letterType} onValueChange={handleLetterTypeChange}>
                  <SelectTrigger id="letterType" className="text-base">
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
                <Label htmlFor="title" className="text-base">
                  Judul Surat <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Judul surat"
                  className="text-base"
                />
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose" className="text-base">
                  Tujuan Surat
                </Label>
                <Input
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Contoh: Keperluan pengajuan beasiswa"
                  className="text-base"
                />
                <p className="text-xs text-muted-foreground">Opsional - Untuk keperluan apa surat ini dibuat</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-base">
                  Keterangan Tambahan
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tambahkan keterangan jika diperlukan..."
                  className="min-h-[120px] text-base"
                />
                <p className="text-xs text-muted-foreground">Opsional - Informasi tambahan tentang surat</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("search")}
                  className="flex-1"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !letterType || !title}
                  className="flex-1"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Membuat Surat...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Buat Surat
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
