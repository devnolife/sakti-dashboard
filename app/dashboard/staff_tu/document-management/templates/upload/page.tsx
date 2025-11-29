"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import mammoth from "mammoth"
import { ArrowLeft, Upload, FileText, CheckCircle2, Loader2, FileUp, X, AlertCircle, Variable, Settings, Eye, Send, Sparkles, Hash, Calendar, Mail, AlignLeft, Type, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { DocxPreviewDialog } from "@/components/templates/docx-preview-dialog"

interface KetentuanSurat {
  id: number
  kode: string
  nama: string
  is_global: boolean
  prodi_id: string | null
  jenis?: {
    nama: string
    kode: string
  }
  tujuan?: {
    nama: string
    kode: string
  }
  masalah?: {
    nama: string
    kode: string
  }
}

interface DetectedVariable {
  id: string
  key: string
  fullMatch: string
  label: string
  type: 'text' | 'date' | 'number' | 'email' | 'textarea' | 'select'
  isRequired: boolean
  isSelected: boolean
  defaultValue?: string
  description?: string
  options?: string[]
  isAutoNumber?: boolean
}

export default function UploadTemplatePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  // Ketentuan surat
  const [ketentuanList, setKetentuanList] = useState<KetentuanSurat[]>([])
  const [isLoadingKetentuan, setIsLoadingKetentuan] = useState(true)
  const [selectedKetentuanId, setSelectedKetentuanId] = useState("")

  // Variable detection
  const [detectedVariables, setDetectedVariables] = useState<DetectedVariable[]>([])
  const [isExtractingVariables, setIsExtractingVariables] = useState(false)

  // Extract variables from docx content
  const extractVariablesFromDocx = async (docxFile: File): Promise<DetectedVariable[]> => {
    try {
      const arrayBuffer = await docxFile.arrayBuffer()
      const textResult = await mammoth.extractRawText({ arrayBuffer })
      const textContent = textResult.value

      const doubleVariableRegex = /\{\{([^}]+)\}\}/g
      const singleVariableRegex = /(?<!\{)\{([^{}]+)\}(?!\})/g

      const matches: DetectedVariable[] = []
      const seenKeys = new Set<string>()

      const processMatch = (fullMatch: string, key: string, bracketType: 'single' | 'double') => {
        const trimmedKey = key.trim()

        if (seenKeys.has(trimmedKey)) return
        seenKeys.add(trimmedKey)

        // Check if this is an auto-number variable
        const autoNumberPatterns = [
          'no_surat', 'nomor_surat', 'no_dokumen', 'nomor_dokumen',
          'document_number', 'letter_number', 'surat_nomor'
        ]
        const isAutoNumber = autoNumberPatterns.some(pattern =>
          trimmedKey.toLowerCase() === pattern ||
          trimmedKey.toLowerCase().includes(pattern)
        )

        // Determine type
        let type: DetectedVariable['type'] = 'text'
        if (isAutoNumber) {
          type = 'text'
        } else if (trimmedKey.toLowerCase().includes('tanggal') || trimmedKey.toLowerCase().includes('date')) {
          type = 'date'
        } else if (trimmedKey.toLowerCase().includes('nomor') || trimmedKey.toLowerCase().includes('number') || trimmedKey.toLowerCase().includes('no_')) {
          type = 'number'
        } else if (trimmedKey.toLowerCase().includes('email')) {
          type = 'email'
        } else if (trimmedKey.toLowerCase().includes('alamat') || trimmedKey.toLowerCase().includes('keterangan') || trimmedKey.toLowerCase().includes('deskripsi')) {
          type = 'textarea'
        }

        const label = trimmedKey
          .replace(/_/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase())

        matches.push({
          id: `var-${Date.now()}-${matches.length}`,
          key: trimmedKey,
          fullMatch,
          label,
          type,
          isRequired: true,
          isSelected: true,
          defaultValue: '',
          description: isAutoNumber ? 'Auto-generated dari ketentuan surat' : '',
          isAutoNumber,
        } as DetectedVariable)
      }

      let match
      while ((match = doubleVariableRegex.exec(textContent)) !== null) {
        processMatch(match[0], match[1], 'double')
      }

      while ((match = singleVariableRegex.exec(textContent)) !== null) {
        processMatch(match[0], match[1], 'single')
      }

      return matches
    } catch (err) {
      console.error('Error extracting variables:', err)
      return []
    }
  }

  // Fetch ketentuan surat
  useEffect(() => {
    const fetchKetentuan = async () => {
      try {
        const response = await fetch('/api/master-data/ketentuan')
        if (response.ok) {
          const data = await response.json()
          setKetentuanList(data || [])
        }
      } catch (err) {
        console.error('Failed to fetch ketentuan surat:', err)
      } finally {
        setIsLoadingKetentuan(false)
      }
    }
    fetchKetentuan()
  }, [])

  // Handle file selection
  const handleFileSelect = useCallback(async (selectedFile: File) => {
    if (selectedFile && selectedFile.name.endsWith('.docx')) {
      setFile(selectedFile)
      setError(null)
      if (!name) {
        setName(selectedFile.name.replace('.docx', ''))
      }

      // Extract variables
      setIsExtractingVariables(true)
      const variables = await extractVariablesFromDocx(selectedFile)
      setDetectedVariables(variables)
      setIsExtractingVariables(false)
    } else {
      setError('Hanya file .docx yang diperbolehkan')
    }
  }, [name])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      await handleFileSelect(droppedFile)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      await handleFileSelect(selectedFile)
    }
  }, [handleFileSelect])

  // Preview now handled by DocxPreviewDialog component

  const handleUpload = async () => {
    if (!file || !name || !category) {
      setError('Lengkapi nama, kategori, dan file template')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const token = localStorage.getItem('session-token')
      const formData = new FormData()
      formData.append('file', file)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)

      // Include validated variables
      const selectedVariables = detectedVariables.filter(v => v.isSelected)
      const variableMapping = selectedVariables.reduce((acc, v) => {
        acc[v.key] = {
          key: v.key,
          label: v.label,
          type: v.type,
          isRequired: v.isRequired,
          defaultValue: v.defaultValue || '',
          description: v.description || '',
          options: v.options || [],
        }
        return acc
      }, {} as Record<string, any>)

      formData.append('variables', JSON.stringify(selectedVariables.map(v => v.key)))
      formData.append('variable_mapping', JSON.stringify(variableMapping))

      if (selectedKetentuanId) {
        formData.append('ketentuan_id', selectedKetentuanId)
      }

      const response = await fetch('/api/templates/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Gagal mengunggah template')
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard/staff_tu/document-management/templates')
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsUploading(false)
    }
  }

  // Variable management
  const toggleVariableSelection = (id: string) => {
    setDetectedVariables(vars =>
      vars.map(v => v.id === id ? { ...v, isSelected: !v.isSelected } : v)
    )
  }

  const updateVariable = (id: string, updates: Partial<DetectedVariable>) => {
    setDetectedVariables(vars =>
      vars.map(v => v.id === id ? { ...v, ...updates } : v)
    )
  }

  const deleteVariable = (id: string) => {
    setDetectedVariables(vars => vars.filter(v => v.id !== id))
  }

  const selectedKetentuan = ketentuanList.find(k => k.id.toString() === selectedKetentuanId)
  const hasAutoNumber = detectedVariables.some(v => v.isAutoNumber)

  // Helper function to get variable type icon and color
  const getVariableTypeConfig = (type: string, isAutoNumber?: boolean) => {
    if (isAutoNumber) {
      return { icon: Zap, color: 'text-green-500', bg: 'bg-green-500/10', label: 'Auto' }
    }
    switch (type) {
      case 'date':
        return { icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Tanggal' }
      case 'number':
        return { icon: Hash, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Nomor' }
      case 'email':
        return { icon: Mail, color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Email' }
      case 'textarea':
        return { icon: AlignLeft, color: 'text-cyan-500', bg: 'bg-cyan-500/10', label: 'Teks Panjang' }
      default:
        return { icon: Type, color: 'text-gray-500', bg: 'bg-gray-500/10', label: 'Teks' }
    }
  }

  // Success State
  if (success) {
    return (
      <div className="container max-w-2xl py-8 mx-auto">
        <div className="relative">
          {/* Confetti Background Effect */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-0 w-2 h-2 bg-yellow-400 rounded-full left-1/4 animate-bounce" style={{ animationDelay: "0s", animationDuration: "2s" }}></div>
            <div className="absolute w-3 h-3 bg-pink-400 rounded-full top-10 right-1/4 animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}></div>
            <div className="absolute w-2 h-2 bg-blue-400 rounded-full top-5 left-1/2 animate-bounce" style={{ animationDelay: "1s", animationDuration: "3s" }}></div>
          </div>

          <Card className="border-2 shadow-xl border-green-500/20 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
            <CardContent className="flex flex-col items-center justify-center py-16">
              {/* Success Icon with Glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-green-500/30 blur-2xl animate-pulse"></div>
                <CheckCircle2 className="relative w-20 h-20 text-green-600 dark:text-green-400" />
              </div>

              {/* Success Message */}
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text">
                  Upload Berhasil! 🎉
                </h2>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>

              <p className="max-w-md mb-8 text-center text-muted-foreground">
                Template berhasil diunggah! Sekarang bisa langsung digunakan untuk membuat dokumen.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col w-full max-w-md gap-4 sm:flex-row">
                <Button
                  onClick={() => {
                    setFile(null)
                    setName("")
                    setDescription("")
                    setCategory("")
                    setSelectedKetentuanId("")
                    setDetectedVariables([])
                    setSuccess(false)
                    setError(null)
                  }}
                  className="flex-1"
                  size="lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Upload Lagi
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard/staff_tu/document-management/templates')}
                  className="flex-1 border-2"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Sticky */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/staff_tu/document-management/templates')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Upload Template Baru</h1>
                  <p className="text-xs text-muted-foreground">Unggah file .docx dan konfigurasikan variabel</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleUpload}
              disabled={isUploading || !file || !name || !category}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengunggah...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Upload Template
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="container px-6 pt-4 mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content - Scrollable */}
      <div className="container px-6 py-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* LEFT PANEL: Form Input */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                <CardTitle>Informasi Template</CardTitle>
              </div>
              <CardDescription>
                Lengkapi detail template dan upload file DOCX
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                  Nama Template
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Surat Keterangan KKP"
                />
                <p className="text-xs text-muted-foreground">
                  Berikan nama yang deskriptif dan mudah dicari
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                  Deskripsi
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Optional</Badge>
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan kegunaan template..."
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="flex items-center gap-2 text-sm font-medium">
                  Kategori
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surat">📄 Surat</SelectItem>
                    <SelectItem value="sertifikat">🏆 Sertifikat</SelectItem>
                    <SelectItem value="kontrak">📝 Kontrak</SelectItem>
                    <SelectItem value="laporan">📊 Laporan</SelectItem>
                    <SelectItem value="lainnya">📁 Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ketentuan-surat" className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Ketentuan Nomor Surat
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Optional</Badge>
                </Label>
                <Select
                  value={selectedKetentuanId}
                  onValueChange={setSelectedKetentuanId}
                  disabled={isLoadingKetentuan || ketentuanList.length === 0}
                >
                  <SelectTrigger id="ketentuan-surat">
                    <SelectValue
                      placeholder={
                        isLoadingKetentuan
                          ? "Memuat..."
                          : ketentuanList.length === 0
                            ? "Tidak ada ketentuan tersedia"
                            : "Pilih ketentuan (opsional)"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {ketentuanList.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        <p>Belum ada ketentuan</p>
                      </div>
                    ) : (
                      ketentuanList.map((ketentuan) => (
                        <SelectItem key={ketentuan.id} value={ketentuan.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono text-xs">
                              {ketentuan.kode}
                            </Badge>
                            <span className="text-sm">{ketentuan.nama}</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>

                {/* Smart Warnings */}
                {hasAutoNumber && !selectedKetentuanId && (
                  <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-xs text-amber-700 dark:text-amber-400">
                      Template memiliki variabel <code className="px-1 bg-amber-100 dark:bg-amber-900 rounded">{'{no_surat}'}</code>. Pilih ketentuan untuk auto-generate nomor!
                    </AlertDescription>
                  </Alert>
                )}

                {selectedKetentuan && (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge>{selectedKetentuan.kode}</Badge>
                        <p className="text-sm font-semibold">{selectedKetentuan.nama}</p>
                      </div>
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        {selectedKetentuan.jenis && <p>Jenis: {selectedKetentuan.jenis.nama}</p>}
                        {selectedKetentuan.tujuan && <p>Tujuan: {selectedKetentuan.tujuan.nama}</p>}
                        {selectedKetentuan.masalah && <p>Masalah: {selectedKetentuan.masalah.nama}</p>}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Separator />

              {/* File Upload */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  Upload File Template
                  <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                </Label>

                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-accent transition-all"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <div className="p-4 rounded-full bg-muted inline-flex mb-4">
                      <FileUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="font-semibold mb-1">Drop file di sini</p>
                    <p className="text-sm text-muted-foreground mb-3">atau klik untuk browse</p>
                    <Badge variant="outline" className="text-xs">Format: .docx | Max: 10MB</Badge>
                    <input
                      id="file-input"
                      type="file"
                      accept=".docx"
                      className="hidden"
                      onChange={handleInputChange}
                      aria-label="Upload file template DOCX"
                    />
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <FileText className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setFile(null)
                            setDetectedVariables([])
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Detected Variables Summary */}
              {file && detectedVariables.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <Variable className="w-4 h-4 text-primary" />
                        Variabel Terdeteksi
                        <Badge variant="secondary" className="ml-2">{detectedVariables.length}</Badge>
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 h-6 text-xs text-muted-foreground hover:text-primary"
                        onClick={() => setDetectedVariables(vars => vars.map(v => ({ ...v, isSelected: true })))}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        Pilih Semua
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {detectedVariables.slice(0, 5).map((variable) => {
                        const config = getVariableTypeConfig(variable.type, variable.isAutoNumber)
                        return (
                          <Badge
                            key={variable.id}
                            variant={variable.isSelected ? "default" : "outline"}
                            className={`font-mono text-xs gap-1 ${variable.isSelected ? '' : 'opacity-50'}`}
                          >
                            {variable.isAutoNumber && <Zap className="w-3 h-3" />}
                            {variable.fullMatch}
                          </Badge>
                        )
                      })}
                      {detectedVariables.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{detectedVariables.length - 5} lainnya
                        </Badge>
                      )}
                    </div>
                    {hasAutoNumber && (
                      <div className="flex items-center gap-2 mt-3 p-2 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <Sparkles className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <p className="text-xs text-green-700 dark:text-green-400">
                          Variabel nomor otomatis terdeteksi
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* RIGHT PANEL: Document Preview */}
          <Card className="bg-muted/20">
            <CardHeader className="border-b bg-background/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <CardTitle>Preview Dokumen</CardTitle>
                </div>
                {file && (
                  <DocxPreviewDialog
                    file={file}
                    triggerLabel="Fullscreen"
                    triggerVariant="outline"
                  />
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {!file ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="p-4 mb-4 rounded-full bg-muted">
                    <FileText className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">Belum Ada Dokumen</h3>
                  <p className="max-w-sm text-sm text-muted-foreground">
                    Upload file DOCX di panel sebelah kiri untuk melihat preview dokumen dan variabel yang terdeteksi
                  </p>
                </div>
              ) : isExtractingVariables ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                  <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Mengekstrak variabel...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* File Info Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        Info File
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Nama File</p>
                          <p className="font-medium truncate">{file.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ukuran</p>
                          <p className="font-medium">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Variabel</p>
                          <p className="font-medium">{detectedVariables.length} ditemukan</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Auto Number</p>
                          <p className="font-medium">{hasAutoNumber ? 'Ya' : 'Tidak'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Variable List - Compact with Inline Edit */}
                  {detectedVariables.length > 0 && (
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2 text-sm">
                            <Variable className="w-4 h-4 text-primary" />
                            Variabel ({detectedVariables.length})
                          </CardTitle>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                              {detectedVariables.filter(v => v.isSelected).length} aktif
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {detectedVariables.map((variable) => {
                            const config = getVariableTypeConfig(variable.type, variable.isAutoNumber)
                            const IconComponent = config.icon
                            return (
                              <div
                                key={variable.id}
                                className={`group flex items-center gap-2 p-2 rounded-lg border transition-all ${variable.isSelected
                                  ? 'bg-card border-border hover:border-primary/40'
                                  : 'bg-muted/20 border-transparent opacity-50'
                                  }`}
                              >
                                {/* Checkbox */}
                                <Checkbox
                                  checked={variable.isSelected}
                                  onCheckedChange={() => toggleVariableSelection(variable.id)}
                                  className="shrink-0"
                                />

                                {/* Type Icon */}
                                <div className={`p-1.5 rounded ${config.bg} shrink-0`}>
                                  <IconComponent className={`w-3 h-3 ${config.color}`} />
                                </div>

                                {/* Variable Key */}
                                <code className="text-xs font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded shrink-0">
                                  {variable.key}
                                </code>

                                {/* Label - Editable */}
                                <Input
                                  value={variable.label}
                                  onChange={(e) => updateVariable(variable.id, { label: e.target.value })}
                                  className="h-7 text-xs flex-1 min-w-0"
                                  placeholder="Label"
                                />

                                {/* Type Selector */}
                                <Select
                                  value={variable.type}
                                  onValueChange={(value) => updateVariable(variable.id, { type: value as DetectedVariable['type'] })}
                                  disabled={variable.isAutoNumber}
                                >
                                  <SelectTrigger className="h-7 w-20 text-xs shrink-0">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="text">Teks</SelectItem>
                                    <SelectItem value="number">Nomor</SelectItem>
                                    <SelectItem value="date">Tanggal</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="textarea">Panjang</SelectItem>
                                  </SelectContent>
                                </Select>

                                {/* Auto Badge */}
                                {variable.isAutoNumber && (
                                  <Badge className="bg-green-500 text-white text-[10px] gap-0.5 h-5 shrink-0">
                                    <Zap className="w-2.5 h-2.5" />
                                    Auto
                                  </Badge>
                                )}

                                {/* Delete Button */}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => deleteVariable(variable.id)}
                                >
                                  <X className="w-3 h-3 text-destructive" />
                                </Button>
                              </div>
                            )
                          })}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-3 pt-3 border-t flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Type className="w-3 h-3" />
                            {detectedVariables.filter(v => v.type === 'text').length}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {detectedVariables.filter(v => v.type === 'date').length}
                          </span>
                          <span className="flex items-center gap-1">
                            <Hash className="w-3 h-3" />
                            {detectedVariables.filter(v => v.type === 'number').length}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-green-500" />
                            {detectedVariables.filter(v => v.isAutoNumber).length}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
