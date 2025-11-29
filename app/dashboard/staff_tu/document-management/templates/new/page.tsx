"use client"

import React, { useState, useRef, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  Sparkles,
  File,
  ChevronRight,
  Save,
  X,
  Link2
} from "lucide-react"
import { DocxPreviewEditor } from "@/components/templates/docx-preview-editor"
import { TemplateVariable } from "@/types/template"

// Interface untuk letter type
interface LetterType {
  id: string
  title: string
  description?: string
}

export default function NewTemplatePage() {
  const router = useRouter()

  // Wizard states
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [tempVariables, setTempVariables] = useState<Record<string, TemplateVariable>>({})

  // Metadata (step 3)
  const [uploadName, setUploadName] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadCategory, setUploadCategory] = useState("surat")
  const [isGlobal, setIsGlobal] = useState(false)
  const [letterTypeId, setLetterTypeId] = useState<string>("")

  // Letter types data
  const [letterTypes, setLetterTypes] = useState<LetterType[]>([])
  const [loadingLetterTypes, setLoadingLetterTypes] = useState(false)

  // Loading states
  const [isUploading, setIsUploading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch letter types on mount
  useEffect(() => {
    fetchLetterTypes()
  }, [])

  const fetchLetterTypes = async () => {
    setLoadingLetterTypes(true)
    try {
      const token = localStorage.getItem('session-token')
      const response = await fetch('/api/correspondence/letter-types', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })
      const result = await response.json()
      if (result.success) {
        setLetterTypes(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching letter types:', error)
    } finally {
      setLoadingLetterTypes(false)
    }
  }

  // Helper function untuk handle logout otomatis
  const handleAuthError = useCallback(() => {
    localStorage.removeItem('session-token')
    localStorage.removeItem('user')
    toast({
      title: "Sesi Berakhir",
      description: "Sesi Anda telah berakhir. Mengalihkan ke halaman login...",
      variant: "destructive"
    })
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }, [router])

  // Helper function untuk get auth headers
  const getAuthHeaders = useCallback(() => {
    const token = localStorage.getItem('session-token')
    if (!token) {
      handleAuthError()
      return null
    }
    return {
      'Authorization': `Bearer ${token}`
    }
  }, [handleAuthError])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.docx')) {
      toast({
        title: "File Tidak Valid",
        description: "Silakan pilih file dengan format .docx",
        variant: "destructive"
      })
      return
    }

    setUploadFile(file)
    setUploadName(file.name.replace('.docx', ''))

    toast({
      title: "File Siap!",
      description: "File berhasil dipilih. Klik 'Lanjut' untuk melihat preview."
    })
  }

  const handleUpload = async () => {
    if (!uploadFile || !uploadName) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon lengkapi file dan nama template",
        variant: "destructive"
      })
      return
    }

    const headers = getAuthHeaders()
    if (!headers) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('name', uploadName)
      formData.append('description', uploadDescription)
      formData.append('category', uploadCategory)
      formData.append('is_global', String(isGlobal))

      // Include letter type if selected
      if (letterTypeId && letterTypeId !== 'none') {
        formData.append('letter_type_id', letterTypeId)
      }

      // Include variable mapping
      if (Object.keys(tempVariables).length > 0) {
        formData.append('variable_mapping', JSON.stringify(tempVariables))
      }

      const response = await fetch('/api/templates/upload', {
        method: 'POST',
        headers: {
          ...headers
        },
        body: formData
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        const letterTypeName = letterTypeId && letterTypeId !== 'none'
          ? letterTypes.find(lt => lt.id === letterTypeId)?.title
          : null
        toast({
          title: "Berhasil! 🎉",
          description: letterTypeName
            ? `Template "${uploadName}" berhasil diunggah dan dihubungkan dengan "${letterTypeName}"`
            : `Template berhasil diunggah dengan ${Object.keys(tempVariables).length} variabel`
        })
        router.push('/dashboard/staff_tu/document-management/templates')
      } else {
        toast({
          title: "Unggah Gagal",
          description: result.error || result.message || "Gagal mengunggah template",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error uploading:", error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Gagal mengunggah template",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    setUploadFile(null)
    setTempVariables({})
    setUploadName("")
    setUploadDescription("")
    setUploadCategory("surat")
    setIsGlobal(false)
    setLetterTypeId("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const steps = [
    { number: 1, title: "Pilih File", description: "Upload file DOCX" },
    { number: 2, title: "Atur Variabel", description: "Tandai teks sebagai variabel" },
    { number: 3, title: "Informasi", description: "Lengkapi metadata template" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/staff_tu/document-management/templates')}
                className="gap-1.5 h-8 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali
              </Button>
              <div className="h-5 w-px bg-gray-200 dark:bg-gray-700" />
              <div>
                <h1 className="text-base font-semibold">Tambah Template Baru</h1>
                <p className="text-xs text-muted-foreground">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetForm}
                disabled={isUploading}
                className="h-8 text-xs"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="max-w-6xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div
                  className={`flex items-center gap-2 cursor-pointer transition-all ${currentStep >= step.number ? 'opacity-100' : 'opacity-50'
                    }`}
                  onClick={() => {
                    if (step.number < currentStep) {
                      setCurrentStep(step.number as 1 | 2 | 3)
                    }
                  }}
                >
                  <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center font-medium text-xs
                    ${currentStep > step.number
                      ? 'bg-green-500 text-white'
                      : currentStep === step.number
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }
                  `}>
                    {currentStep > step.number ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="hidden md:block">
                    <p className="font-medium text-xs">{step.title}</p>
                    <p className="text-[10px] text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 mx-3 text-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* Step 1: Pilih File */}
        {currentStep === 1 && (
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-lg">Pilih File Template</CardTitle>
                <CardDescription className="text-xs">
                  Upload file DOCX yang akan dijadikan template dokumen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="file" className="text-sm font-medium">File Template *</Label>
                  <div
                    className="border-2 border-dashed rounded-lg p-5 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Input
                      id="file"
                      type="file"
                      accept=".docx"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {uploadFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{uploadFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {Math.round(uploadFile.size / 1024)} KB
                          </p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-500 ml-1" />
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm font-medium mb-0.5">
                          Klik untuk memilih file
                        </p>
                        <p className="text-xs text-muted-foreground">
                          atau drag & drop file DOCX di sini
                        </p>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-950">
                  <h4 className="text-xs font-medium mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Tips
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                    <li>Pastikan file dalam format .docx (Microsoft Word)</li>
                    <li>Ukuran file maksimal 10MB</li>
                    <li>Di langkah selanjutnya, Anda bisa menandai teks yang akan menjadi variabel</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/dashboard/staff_tu/document-management/templates')}
                  >
                    Batal
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                    disabled={!uploadFile}
                    className="gap-1.5"
                  >
                    Lanjut
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Atur Variabel */}
        {currentStep === 2 && uploadFile && (
          <div className="space-y-3">
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-0">
                <div className="h-[calc(100vh-220px)] min-h-[400px]">
                  <DocxPreviewEditor
                    file={uploadFile}
                    initialVariables={tempVariables}
                    onVariablesChange={setTempVariables}
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center bg-white dark:bg-gray-900 p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs py-0.5 px-2">
                  {Object.keys(tempVariables).length} variabel
                </Badge>
                {Object.keys(tempVariables).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(tempVariables).slice(0, 5).map(key => (
                      <Badge key={key} variant="outline" className="text-[10px] py-0 px-1.5">
                        {key}
                      </Badge>
                    ))}
                    {Object.keys(tempVariables).length > 5 && (
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                        +{Object.keys(tempVariables).length - 5}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep(1)}
                  className="h-8 text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  Kembali
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCurrentStep(3)}
                  className="gap-1.5 h-8 text-xs"
                >
                  Lanjut
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Metadata */}
        {currentStep === 3 && (
          <div className="max-w-lg mx-auto">
            <Card>
              <CardHeader className="text-center pb-3">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <FileText className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Informasi Template</CardTitle>
                <CardDescription className="text-xs">
                  Lengkapi informasi template sebelum menyimpan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {/* Summary variabel */}
                <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-950">
                  <div className="flex items-center gap-1.5 text-xs mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                    <span className="font-medium">
                      {Object.keys(tempVariables).length} variabel didefinisikan
                    </span>
                  </div>
                  {Object.keys(tempVariables).length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(tempVariables).map(key => (
                        <Badge key={key} variant="secondary" className="text-[10px] py-0 px-1.5">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nama Template *</Label>
                  <Input
                    id="name"
                    placeholder="Contoh: Surat Keputusan Dekan 2024"
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Deskripsi (Opsional)</Label>
                  <Input
                    id="description"
                    placeholder="Jelaskan kegunaan template ini..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">Kategori</Label>
                  <Select value={uploadCategory} onValueChange={setUploadCategory}>
                    <SelectTrigger id="category" className="h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat">
                        <div className="flex items-center gap-1.5 text-sm">
                          <FileText className="w-3.5 h-3.5" />
                          Surat
                        </div>
                      </SelectItem>
                      <SelectItem value="sertifikat">
                        <div className="flex items-center gap-1.5 text-sm">
                          <Sparkles className="w-3.5 h-3.5" />
                          Sertifikat
                        </div>
                      </SelectItem>
                      <SelectItem value="laporan">
                        <div className="flex items-center gap-1.5 text-sm">
                          <File className="w-3.5 h-3.5" />
                          Laporan
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Jenis Surat - Hubungkan dengan ketentuan */}
                <div className="space-y-2">
                  <Label htmlFor="letterType" className="text-sm font-medium flex items-center gap-1.5">
                    <Link2 className="w-3.5 h-3.5" />
                    Hubungkan dengan Jenis Surat
                  </Label>
                  <Select value={letterTypeId} onValueChange={setLetterTypeId}>
                    <SelectTrigger id="letterType" className="h-9 text-sm">
                      <SelectValue placeholder={loadingLetterTypes ? "Memuat..." : "Pilih jenis surat (opsional)"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">
                        <span className="text-muted-foreground">Tidak dihubungkan</span>
                      </SelectItem>
                      {letterTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          <div className="flex flex-col">
                            <span className="text-sm">{type.title}</span>
                            {type.description && (
                              <span className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                                {type.description}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground">
                    Hubungkan template dengan jenis surat yang sudah memiliki aturan/ketentuan
                  </p>
                </div>

                <div className="flex items-start p-3 space-x-2 border rounded-lg bg-muted/30">
                  <input
                    type="checkbox"
                    id="is_global"
                    checked={isGlobal}
                    onChange={(e) => setIsGlobal(e.target.checked)}
                    className="w-4 h-4 mt-0.5 cursor-pointer"
                    aria-label="Jadikan template global"
                    title="Jadikan template global"
                  />
                  <div className="flex-1">
                    <Label htmlFor="is_global" className="text-sm font-medium cursor-pointer">
                      Template Global
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Template dapat diakses oleh semua prodi dan pengguna
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                    className="h-8 text-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Kembali
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleUpload}
                    disabled={isUploading || !uploadName}
                    className="gap-1.5 h-8 text-xs"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-t-2 rounded-full animate-spin border-white border-t-transparent" />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        Simpan Template
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
