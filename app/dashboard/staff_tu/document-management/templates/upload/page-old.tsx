"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { renderAsync } from "docx-preview"
import mammoth from "mammoth"
import { ArrowLeft, Upload, FileText, CheckCircle2, Loader2, Link2, FileUp, X, AlertCircle, Variable, Trash2, Edit2, Plus, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface LetterType {
  id: string
  title: string
  description?: string
  approval_role?: string
  estimated_days?: number
  required_documents?: string[]
  additional_fields?: Record<string, unknown>
}

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
  key: string  // nama variabel (tanpa kurung kurawal)
  fullMatch: string // termasuk {{}}
  label: string
  type: 'text' | 'date' | 'number' | 'email' | 'textarea' | 'select'
  isRequired: boolean
  isSelected: boolean
  defaultValue?: string
  description?: string
  options?: string[] // untuk type select
  isAutoNumber?: boolean // Auto-generated dari ketentuan surat
}

export default function UploadTemplatePage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [previewContainer, setPreviewContainer] = useState<HTMLDivElement | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [letterTypeId, setLetterTypeId] = useState("")

  // Letter types
  const [letterTypes, setLetterTypes] = useState<LetterType[]>([])
  const [isLoadingLetterTypes, setIsLoadingLetterTypes] = useState(true)

  // Ketentuan surat
  const [ketentuanList, setKetentuanList] = useState<KetentuanSurat[]>([])
  const [isLoadingKetentuan, setIsLoadingKetentuan] = useState(true)
  const [selectedKetentuanId, setSelectedKetentuanId] = useState("")

  // Variable detection
  const [detectedVariables, setDetectedVariables] = useState<DetectedVariable[]>([])
  const [isExtractingVariables, setIsExtractingVariables] = useState(false)
  const [showVariableEditor, setShowVariableEditor] = useState(false)
  const [editingVariable, setEditingVariable] = useState<DetectedVariable | null>(null)

  // Extract variables from docx content
  const extractVariablesFromDocx = async (docxFile: File): Promise<DetectedVariable[]> => {
    try {
      const arrayBuffer = await docxFile.arrayBuffer()
      const textResult = await mammoth.extractRawText({ arrayBuffer })
      const textContent = textResult.value

      // Regex patterns to match both {{variable}} and {variable} formats
      // Pattern 1: {{variable}} - double curly braces
      // Pattern 2: {variable} - single curly braces (but not {{)
      const doubleVariableRegex = /\{\{([^}]+)\}\}/g
      const singleVariableRegex = /(?<!\{)\{([^{}]+)\}(?!\})/g

      const matches: DetectedVariable[] = []
      const seenKeys = new Set<string>()

      // Helper function to process matches
      const processMatch = (fullMatch: string, key: string, bracketType: 'single' | 'double') => {
        const trimmedKey = key.trim()

        // Skip duplicates
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

        // Determine type based on variable name
        let type: DetectedVariable['type'] = 'text'
        if (isAutoNumber) {
          type = 'text' // Auto-number treated as text
        } else if (trimmedKey.toLowerCase().includes('tanggal') || trimmedKey.toLowerCase().includes('date')) {
          type = 'date'
        } else if (trimmedKey.toLowerCase().includes('nomor') || trimmedKey.toLowerCase().includes('number') || trimmedKey.toLowerCase().includes('no_')) {
          type = 'number'
        } else if (trimmedKey.toLowerCase().includes('email')) {
          type = 'email'
        } else if (trimmedKey.toLowerCase().includes('alamat') || trimmedKey.toLowerCase().includes('keterangan') || trimmedKey.toLowerCase().includes('deskripsi')) {
          type = 'textarea'
        }

        // Generate human-readable label from key
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
          bracketType, // track bracket type for reference
        } as DetectedVariable)
      }

      // Extract double bracket variables {{var}}
      let match
      while ((match = doubleVariableRegex.exec(textContent)) !== null) {
        processMatch(match[0], match[1], 'double')
      }

      // Extract single bracket variables {var}
      while ((match = singleVariableRegex.exec(textContent)) !== null) {
        processMatch(match[0], match[1], 'single')
      }

      return matches
    } catch (err) {
      console.error('Error extracting variables:', err)
      return []
    }
  }

  // Fetch letter types
  useEffect(() => {
    const fetchLetterTypes = async () => {
      try {
        const token = localStorage.getItem('session-token')
        const response = await fetch('/api/letter-types', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
        if (response.ok) {
          const data = await response.json()
          setLetterTypes(data.data || [])
        }
      } catch (err) {
        console.error('Failed to fetch letter types:', err)
      } finally {
        setIsLoadingLetterTypes(false)
      }
    }
    fetchLetterTypes()
  }, [])

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

  // Handle file drop
  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.name.endsWith('.docx')) {
      setFile(droppedFile)
      setError(null)
      // Auto-fill name from filename
      if (!name) {
        setName(droppedFile.name.replace('.docx', ''))
      }
      // Extract variables
      setIsExtractingVariables(true)
      const variables = await extractVariablesFromDocx(droppedFile)
      setDetectedVariables(variables)
      setIsExtractingVariables(false)
      if (variables.length > 0) {
        setShowVariableEditor(true)
      }
    } else {
      setError('Hanya file .docx yang diperbolehkan')
    }
  }, [name])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith('.docx')) {
      setFile(selectedFile)
      setError(null)
      // Auto-fill name from filename
      if (!name) {
        setName(selectedFile.name.replace('.docx', ''))
      }
      // Extract variables
      setIsExtractingVariables(true)
      const variables = await extractVariablesFromDocx(selectedFile)
      setDetectedVariables(variables)
      setIsExtractingVariables(false)
      if (variables.length > 0) {
        setShowVariableEditor(true)
      }
    } else {
      setError('Hanya file .docx yang diperbolehkan')
    }
  }, [name])

  // Render preview when file changes
  useEffect(() => {
    if (file && previewContainer) {
      previewContainer.innerHTML = ''
      renderAsync(file, previewContainer, undefined, {
        className: "docx-preview-content",
        inWrapper: true,
        ignoreWidth: false,
        ignoreHeight: false,
      }).catch((err) => {
        console.error('Preview error:', err)
        previewContainer.innerHTML = '<p class="text-muted-foreground p-4">Gagal memuat previews</p>'
      })
    }
  }, [file, previewContainer])

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

      if (letterTypeId) {
        formData.append('letter_type_id', letterTypeId)
      }

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

  // Variable management functions
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

  const addManualVariable = () => {
    const newVar: DetectedVariable = {
      id: `var-manual-${Date.now()}`,
      key: 'new_variable',
      fullMatch: '{{new_variable}}',
      label: 'New Variable',
      type: 'text',
      isRequired: false,
      isSelected: true,
      defaultValue: '',
      description: '',
    }
    setDetectedVariables(vars => [...vars, newVar])
    setEditingVariable(newVar)
  }

  const selectedLetterType = letterTypes.find(lt => lt.id === letterTypeId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Upload Template Jadi</h1>
            <p className="text-muted-foreground">
              Unggah file template .docx yang sudah siap digunakan
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <AlertTitle className="text-green-600">Berhasil!</AlertTitle>
            <AlertDescription className="text-green-600">
              Template berhasil diunggah. Mengalihkan ke daftar template...
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Upload & Form */}
          <div className="space-y-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileUp className="w-5 h-5" />
                  File Template
                </CardTitle>
                <CardDescription>
                  Pilih atau drop file .docx
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!file ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-1">Drop file di sini atau klik untuk browse</p>
                    <p className="text-sm text-muted-foreground">Hanya file .docx</p>
                    <input
                      id="file-input"
                      type="file"
                      accept=".docx"
                      className="hidden"
                      onChange={handleFileSelect}
                      aria-label="Pilih file template"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                    <FileText className="w-10 h-10 text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
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
                        setShowVariableEditor(false)
                        setEditingVariable(null)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadata Form */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Template</CardTitle>
                <CardDescription>
                  Isi detail template untuk memudahkan pencarian
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Template *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Surat Keterangan Aktif"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jelaskan kegunaan template ini..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="sertifikat">Sertifikat</SelectItem>
                      <SelectItem value="kontrak">Kontrak</SelectItem>
                      <SelectItem value="laporan">Laporan</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="letter-type" className="flex items-center gap-2">
                    <Link2 className="w-4 h-4" />
                    Hubungkan dengan Jenis Surat
                  </Label>
                  <Select
                    value={letterTypeId}
                    onValueChange={setLetterTypeId}
                    disabled={isLoadingLetterTypes || letterTypes.length === 0}
                  >
                    <SelectTrigger id="letter-type">
                      <SelectValue
                        placeholder={
                          isLoadingLetterTypes
                            ? "Memuat..."
                            : letterTypes.length === 0
                              ? "Tidak ada jenis surat tersedia"
                              : "Pilih jenis surat (opsional)"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {letterTypes.length === 0 ? (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                          <p>Tidak ada jenis surat tersedia</p>
                          <p className="text-xs mt-1">Tambahkan jenis surat terlebih dahulu</p>
                        </div>
                      ) : (
                        letterTypes.map((lt) => (
                          <SelectItem key={lt.id} value={lt.id}>
                            {lt.title}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {letterTypes.length === 0 && !isLoadingLetterTypes && (
                    <p className="text-xs text-muted-foreground">
                      Belum ada jenis surat yang terdaftar di sistem
                    </p>
                  )}
                  {selectedLetterType && (
                    <div className="mt-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                      <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                        {selectedLetterType.title}
                      </p>
                      {selectedLetterType.description && (
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          {selectedLetterType.description}
                        </p>
                      )}
                      {selectedLetterType.estimated_days && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          Estimasi: {selectedLetterType.estimated_days} hari
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ketentuan-surat" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Ketentuan Surat
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
                              ? "Tidak ada ketentuan surat tersedia"
                              : "Pilih ketentuan surat (opsional)"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {ketentuanList.length === 0 ? (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                          <p>Tidak ada ketentuan surat tersedia</p>
                          <p className="text-xs mt-1">Buat ketentuan surat terlebih dahulu di menu Ketentuan</p>
                        </div>
                      ) : (
                        ketentuanList.map((ketentuan) => (
                          <SelectItem key={ketentuan.id} value={ketentuan.id.toString()}>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="font-mono text-xs">
                                {ketentuan.kode}
                              </Badge>
                              <span>{ketentuan.nama}</span>
                              {ketentuan.is_global ? (
                                <Badge className="bg-blue-600 text-xs ml-2">Fakultas</Badge>
                              ) : (
                                <Badge className="bg-purple-600 text-xs ml-2">Prodi</Badge>
                              )}
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {ketentuanList.length === 0 && !isLoadingKetentuan && (
                    <p className="text-xs text-muted-foreground">
                      Belum ada ketentuan surat yang terdaftar. Buat ketentuan surat di halaman Ketentuan Dokumen.
                    </p>
                  )}
                  {/* Warning jika ada auto-number tapi belum pilih ketentuan */}
                  {detectedVariables.some(v => v.isAutoNumber) && !selectedKetentuanId && (
                    <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                        <div className="text-xs text-amber-700 dark:text-amber-300">
                          <p className="font-medium">Template memiliki variabel nomor otomatis</p>
                          <p className="mt-1">Pilih ketentuan surat untuk auto-generate nomor saat dokumen dibuat</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Info jika pilih ketentuan tapi tidak ada auto-number */}
                  {selectedKetentuanId && !detectedVariables.some(v => v.isAutoNumber) && (
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <div className="text-xs text-blue-700 dark:text-blue-300">
                          <p className="font-medium">Tips</p>
                          <p className="mt-1">Tambahkan variabel <code className="px-1 bg-blue-100 dark:bg-blue-900 rounded">{'{no_surat}'}</code> di template untuk auto-generate nomor</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedKetentuanId && ketentuanList.find(k => k.id.toString() === selectedKetentuanId) && (
                    <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      {(() => {
                        const selectedKetentuan = ketentuanList.find(k => k.id.toString() === selectedKetentuanId)!
                        return (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="font-mono">{selectedKetentuan.kode}</Badge>
                              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                {selectedKetentuan.nama}
                              </p>
                            </div>
                            <div className="space-y-1 text-xs">
                              {selectedKetentuan.jenis && (
                                <p className="text-blue-600 dark:text-blue-400">
                                  <span className="font-medium">Jenis:</span> {selectedKetentuan.jenis.nama}
                                </p>
                              )}
                              {selectedKetentuan.tujuan && (
                                <p className="text-blue-600 dark:text-blue-400">
                                  <span className="font-medium">Tujuan:</span> {selectedKetentuan.tujuan.nama}
                                </p>
                              )}
                              {selectedKetentuan.masalah && (
                                <p className="text-blue-600 dark:text-blue-400">
                                  <span className="font-medium">Masalah:</span> {selectedKetentuan.masalah.nama}
                                </p>
                              )}
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Detected Variables */}
            {file && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Variable className="w-5 h-5" />
                        Variabel Terdeteksi
                        {isExtractingVariables && (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                      </CardTitle>
                      <CardDescription>
                        Variabel dengan format {"{{var}}"} atau {"{var}"} yang ditemukan dalam dokumen
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowVariableEditor(!showVariableEditor)}
                            >
                              {showVariableEditor ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {showVariableEditor ? 'Sembunyikan Editor' : 'Tampilkan Editor'}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addManualVariable}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Tambah
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isExtractingVariables ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                      <span className="text-muted-foreground">Menganalisis dokumen...</span>
                    </div>
                  ) : detectedVariables.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Variable className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>Tidak ada variabel {"{...}"} atau {"{{...}}"} terdeteksi dalam dokumen</p>
                      <p className="text-sm mt-1">Klik tombol &quot;Tambah&quot; untuk menambahkan variabel secara manual</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Summary */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary">
                            {detectedVariables.length} variabel ditemukan
                          </Badge>
                          <Badge variant="outline" className="text-green-600">
                            {detectedVariables.filter(v => v.isSelected).length} dipilih
                          </Badge>
                        </div>
                        {detectedVariables.length > 3 && showVariableEditor && (
                          <p className="text-xs text-muted-foreground">
                            Scroll untuk melihat semua variabel ↓
                          </p>
                        )}
                      </div>

                      {showVariableEditor && (
                        <>
                          <Separator />
                          <ScrollArea className="h-[500px] pr-4">
                            <div className="space-y-3">
                              {detectedVariables.map((variable, index) => (
                                <div
                                  key={variable.id}
                                  className={`p-4 rounded-lg border transition-colors ${variable.isSelected
                                    ? 'bg-primary/5 border-primary/30'
                                    : 'bg-muted/30 border-muted'
                                    }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <Checkbox
                                      id={variable.id}
                                      checked={variable.isSelected}
                                      onCheckedChange={() => toggleVariableSelection(variable.id)}
                                      className="mt-1"
                                    />
                                    <div className="flex-1 space-y-3">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-xs font-normal">
                                            #{index + 1}
                                          </Badge>
                                          <code className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded text-sm font-mono">
                                            {variable.fullMatch}
                                          </code>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8"
                                                  onClick={() => setEditingVariable(
                                                    editingVariable?.id === variable.id ? null : variable
                                                  )}
                                                >
                                                  <Edit2 className="w-4 h-4" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>Edit</TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                          <TooltipProvider>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8 text-red-500 hover:text-red-600"
                                                  onClick={() => deleteVariable(variable.id)}
                                                >
                                                  <Trash2 className="w-4 h-4" />
                                                </Button>
                                              </TooltipTrigger>
                                              <TooltipContent>Hapus</TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                        </div>
                                      </div>

                                      {editingVariable?.id === variable.id ? (
                                        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t">
                                          <div className="col-span-2">
                                            <Label className="text-xs">Key (nama variabel)</Label>
                                            <Input
                                              value={variable.key}
                                              onChange={(e) => {
                                                const newKey = e.target.value.replace(/\s+/g, '_').toLowerCase()
                                                updateVariable(variable.id, {
                                                  key: newKey,
                                                  fullMatch: `{{${newKey}}}`
                                                })
                                              }}
                                              className="mt-1 h-8 text-sm"
                                            />
                                          </div>
                                          <div className="col-span-2">
                                            <Label className="text-xs">Label (tampilan)</Label>
                                            <Input
                                              value={variable.label}
                                              onChange={(e) => updateVariable(variable.id, { label: e.target.value })}
                                              className="mt-1 h-8 text-sm"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs">Tipe</Label>
                                            <Select
                                              value={variable.type}
                                              onValueChange={(value: DetectedVariable['type']) =>
                                                updateVariable(variable.id, { type: value })
                                              }
                                            >
                                              <SelectTrigger className="mt-1 h-8 text-sm">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="text">Teks</SelectItem>
                                                <SelectItem value="number">Angka</SelectItem>
                                                <SelectItem value="date">Tanggal</SelectItem>
                                                <SelectItem value="email">Email</SelectItem>
                                                <SelectItem value="textarea">Teks Panjang</SelectItem>
                                                <SelectItem value="select">Pilihan</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="flex items-end gap-2">
                                            <div className="flex items-center gap-2">
                                              <Checkbox
                                                id={`required-${variable.id}`}
                                                checked={variable.isRequired}
                                                onCheckedChange={(checked) =>
                                                  updateVariable(variable.id, { isRequired: !!checked })
                                                }
                                              />
                                              <Label htmlFor={`required-${variable.id}`} className="text-xs">
                                                Wajib diisi
                                              </Label>
                                            </div>
                                          </div>
                                          <div className="col-span-2">
                                            <Label className="text-xs">Nilai Default</Label>
                                            <Input
                                              value={variable.defaultValue || ''}
                                              onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.value })}
                                              placeholder="Nilai default (opsional)"
                                              className="mt-1 h-8 text-sm"
                                            />
                                          </div>
                                          <div className="col-span-2">
                                            <Label className="text-xs">Deskripsi</Label>
                                            <Input
                                              value={variable.description || ''}
                                              onChange={(e) => updateVariable(variable.id, { description: e.target.value })}
                                              placeholder="Deskripsi variabel (opsional)"
                                              className="mt-1 h-8 text-sm"
                                            />
                                          </div>
                                          {variable.type === 'select' && (
                                            <div className="col-span-2">
                                              <Label className="text-xs">Opsi Pilihan (pisahkan dengan koma)</Label>
                                              <Input
                                                value={variable.options?.join(', ') || ''}
                                                onChange={(e) => updateVariable(variable.id, {
                                                  options: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                                })}
                                                placeholder="Opsi 1, Opsi 2, Opsi 3"
                                                className="mt-1 h-8 text-sm"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                          <span>{variable.label}</span>
                                          <span>•</span>
                                          <Badge variant="outline" className="text-xs">
                                            {variable.type}
                                          </Badge>
                                          {variable.isRequired && (
                                            <Badge variant="secondary" className="text-xs">
                                              Wajib
                                            </Badge>
                                          )}
                                          {variable.isAutoNumber && (
                                            <Badge className="bg-green-600 text-xs animate-pulse">
                                              🔢 Auto Nomor
                                            </Badge>
                                          )}
                                          {variable.description && !editingVariable && (
                                            <span className="text-xs italic">- {variable.description}</span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <Button
              size="lg"
              className="w-full"
              onClick={handleUpload}
              disabled={isUploading || !file || !name || !category || success}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mengunggah...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Berhasil!
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Template
                </>
              )}
            </Button>
          </div>

          {/* Right: Preview */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Preview Dokumen</CardTitle>
              <CardDescription>
                {file ? 'Preview template yang akan diunggah' : 'Pilih file untuk melihat preview'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={setPreviewContainer}
                className="border rounded-lg min-h-[500px] bg-white overflow-auto"
                style={{ maxHeight: '70vh' }}
              >
                {!file && (
                  <div className="flex items-center justify-center h-[500px] text-muted-foreground">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                      <p>Belum ada file dipilih</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
