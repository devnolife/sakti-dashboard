"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, UserCheck, FileText, Loader2, ArrowLeft, ChevronRight, Upload, X, File, Eye, FileCheck } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { searchStudents, createLetterRequestForStudent } from "@/app/actions/correspondence-actions"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

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

interface Template {
  id: string
  name: string
  description: string | null
  file_url: string
  category: string
  prodi_id: string | null
  is_global: boolean
  detected_fields: any
}

interface CreateLetterFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function CreateLetterForm({ onSuccess, onCancel }: CreateLetterFormProps) {
  const toastHook = useToast()
  const toast = toastHook.toast
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
  const [files, setFiles] = useState<File[]>([])
  const [useTemplate, setUseTemplate] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [loadingTemplates, setLoadingTemplates] = useState(false)

  // Get required documents for letter type
  const getRequiredDocuments = (type: string): string[] => {
    const docMap: Record<string, string[]> = {
      active_student: ["KTM", "Bukti Pembayaran UKT"],
      leave_absence: ["Surat Keterangan Orang Tua", "Bukti Pembayaran"],
      loan_application: ["KTP", "KK", "Slip Gaji Orang Tua"],
      tuition_extension: ["Surat Permohonan", "Bukti Kendala Pembayaran"],
      internship_recommendation: ["Surat Permohonan Perusahaan", "Proposal Magang"],
      scholarship_recommendation: ["Transkrip Nilai", "Surat Keterangan Tidak Mampu (jika ada)"],
      transcript_request: ["Bukti Pembayaran", "KTM"],
      research_permission: ["Proposal Penelitian", "Surat Pengantar"],
      graduation_confirmation: ["Transkrip Nilai", "Bukti Pelunasan Administrasi"],
    }
    return docMap[type] || []
  }

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

  // Fetch templates when letter type changes
  const fetchTemplates = async (category: string) => {
    setLoadingTemplates(true)
    try {
      const response = await fetch(`/api/templates?category=${category}`)
      const data = await response.json()
      if (data.success) {
        setTemplates(data.data)
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
    } finally {
      setLoadingTemplates(false)
    }
  }

  // Handle letter type change
  const handleLetterTypeChange = (value: string) => {
    setLetterType(value)
    setFiles([]) // Reset files when changing letter type
    setSelectedTemplate("") // Reset selected template
    fetchTemplates("surat") // Fetch templates for this category
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

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    setFiles(prev => [...prev, ...newFiles])
  }

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const newFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...newFiles])
  }

  // Remove file
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
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

              {/* Template Selection */}
              {letterType && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="use-template"
                        checked={useTemplate}
                        onChange={(e) => setUseTemplate(e.target.checked)}
                        className="rounded border-gray-300"
                        aria-label="Gunakan Template Dokumen"
                      />
                      <Label htmlFor="use-template" className="text-base font-medium cursor-pointer">
                        Gunakan Template Dokumen
                      </Label>
                    </div>

                    {useTemplate && (
                      <div className="space-y-3">
                        {loadingTemplates ? (
                          <div className="text-sm text-muted-foreground">Memuat template...</div>
                        ) : templates.length > 0 ? (
                          <>
                            <Label className="text-base">Pilih Template</Label>
                            <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                              {templates.map((template) => (
                                <div key={template.id} className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-accent">
                                  <RadioGroupItem value={template.id} id={template.id} />
                                  <label htmlFor={template.id} className="flex-1 cursor-pointer">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="font-medium">{template.name}</div>
                                        {template.description && (
                                          <div className="text-sm text-muted-foreground mt-1">
                                            {template.description}
                                          </div>
                                        )}
                                        <div className="flex gap-2 mt-2">
                                          <Badge variant={template.is_global ? "default" : "secondary"} className="text-xs">
                                            {template.is_global ? "Global" : "Prodi"}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            {template.category}
                                          </Badge>
                                        </div>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                          e.preventDefault()
                                          window.open(template.file_url, "_blank")
                                        }}
                                        className="h-8 w-8"
                                      >
                                        <Eye className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                            {selectedTemplate && (
                              <Alert>
                                <FileCheck className="h-4 w-4" />
                                <AlertDescription>
                                  Template akan otomatis diisi dengan data mahasiswa yang dipilih dan informasi surat yang Anda masukkan.
                                </AlertDescription>
                              </Alert>
                            )}
                          </>
                        ) : (
                          <Alert>
                            <AlertDescription>
                              Belum ada template tersedia untuk jenis surat ini. Silakan upload template terlebih dahulu di menu Template.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Document Upload Section */}
              {letterType && getRequiredDocuments(letterType).length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-medium mb-2">Dokumen yang Diperlukan</h3>
                      <div className="space-y-2">
                        {getRequiredDocuments(letterType).map((doc, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-base">Unggah Dokumen Pelengkap</Label>
                      <div
                        className="flex justify-center rounded-lg border-2 border-dashed border-primary/20 bg-primary/5 px-6 py-8 transition-colors hover:bg-primary/10 hover:border-primary/30 cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-10 w-10 text-primary/40" />
                          <div className="mt-3 flex text-sm leading-6 justify-center">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                            >
                              <span>Pilih file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1 text-muted-foreground">atau drag and drop</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, JPG, PNG, DOC maksimal 5MB per file
                          </p>
                        </div>
                      </div>

                      {/* Uploaded Files List */}
                      {files.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <p className="text-sm font-medium">File yang Diunggah ({files.length})</p>
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-md border bg-card"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  <File className="h-5 w-5 text-primary flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {formatFileSize(file.size)}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFile(index)}
                                  className="h-8 w-8 flex-shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

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
