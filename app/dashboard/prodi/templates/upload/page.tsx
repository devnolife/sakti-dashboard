"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUploadMinio } from "@/components/ui/file-upload-minio"
import { toast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, FileText, CheckCircle, Sparkles, Code2, Eye, Rocket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function UploadTemplatePage() {
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    category: "surat",
  })
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [documentPreview, setDocumentPreview] = useState<string>("")
  const [detectedVariables, setDetectedVariables] = useState<string[]>([])
  const [loadingPreview, setLoadingPreview] = useState(false)

  // Load document preview when file is uploaded
  useEffect(() => {
    const loadPreview = async () => {
      if (!uploadedFile) {
        setDocumentPreview("")
        setDetectedVariables([])
        return
      }

      setLoadingPreview(true)
      try {
        // Download file from MinIO
        const fileResponse = await fetch(uploadedFile.url)
        const fileBlob = await fileResponse.blob()
        const file = new File([fileBlob], uploadedFile.name, { type: fileBlob.type })

        // Convert DOCX to HTML using mammoth
        const mammoth = await import('mammoth')
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.convertToHtml({ arrayBuffer })

        // Extract variables from HTML
        const variableRegex = /\{\{([^}]+)\}\}/g
        const variables = new Set<string>()
        let match
        while ((match = variableRegex.exec(result.value)) !== null) {
          variables.add(match[1].trim())
        }

        // Highlight variables in preview
        let highlightedHtml = result.value
        variables.forEach(variable => {
          const regex = new RegExp(`\\{\\{\\s*${variable}\\s*\\}\\}`, 'g')
          highlightedHtml = highlightedHtml.replace(
            regex,
            `<mark class="bg-yellow-200 dark:bg-yellow-900 px-1 rounded font-semibold">{{${variable}}}</mark>`
          )
        })

        setDocumentPreview(highlightedHtml)
        setDetectedVariables(Array.from(variables))
      } catch (error) {
        console.error('Error loading preview:', error)
        toast({
          title: "Error",
          description: "Gagal memuat preview dokumen",
          variant: "destructive",
        })
      } finally {
        setLoadingPreview(false)
      }
    }

    loadPreview()
  }, [uploadedFile])

  const handleUploadSubmit = async () => {
    if (!uploadedFile) {
      toast({
        title: "Error",
        description: "Silakan upload file terlebih dahulu",
        variant: "destructive",
      })
      return
    }

    if (!uploadForm.name) {
      toast({
        title: "Error",
        description: "Nama template harus diisi",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)

      // Download file from MinIO URL and create FormData
      const fileResponse = await fetch(uploadedFile.url)
      const fileBlob = await fileResponse.blob()
      const file = new File([fileBlob], uploadedFile.name, { type: fileBlob.type })

      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", uploadForm.name)
      formData.append("description", uploadForm.description)
      formData.append("category", uploadForm.category)
      formData.append("is_global", "false") // Prodi templates are never global

      const response = await fetch("/api/templates/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Berhasil",
          description: "Template berhasil diupload",
        })
        setUploadSuccess(true)
      } else {
        toast({
          title: "Error",
          description: data.error || "Gagal upload template",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal upload template",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setUploadForm({
      name: "",
      description: "",
      category: "surat",
    })
    setUploadedFile(null)
    setUploadSuccess(false)
  }

  if (uploadSuccess) {
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
                <CheckCircle className="relative w-20 h-20 text-green-600 dark:text-green-400" />
              </div>

              {/* Success Message */}
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text">
                  Sukses Upload! 🎉
                </h2>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>

              <p className="max-w-md mb-8 text-center text-muted-foreground">
                Template kamu udah ready to go! Sekarang bisa langsung dipake buat bikin dokumen keren ✨
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col w-full max-w-md gap-4 sm:flex-row">
                <Button
                  onClick={resetForm}
                  className="flex-1 transition-all shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                  size="lg"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Upload Lagi
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/dashboard/prodi/templates'}
                  className="flex-1 border-2 hover:bg-accent"
                  size="lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/dashboard/prodi/templates'}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Upload className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Upload Template Baru</h1>
                  <p className="text-xs text-muted-foreground">Buat template dengan preview langsung</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleUploadSubmit}
              disabled={uploading || !uploadedFile || !uploadForm.name}
              className="gap-2"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white rounded-full animate-spin border-t-transparent" />
                  Uploading...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Upload Template
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Split Layout: Form (Left) + Preview (Right) */}
      <div className="flex-1 overflow-hidden">
        <div className="grid h-full divide-x lg:grid-cols-2">

          {/* LEFT PANEL: Form Input */}
          <ScrollArea className="h-full">
            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Informasi Template</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Lengkapi detail template dan upload file DOCX
                </p>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                    Nama Template
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                  </Label>
                  <Input
                    id="name"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    placeholder="Contoh: Template Surat Keterangan Aktif Kuliah"
                  />
                  <p className="text-xs text-muted-foreground">
                    Kasih nama yang deskriptif dan mudah dicari
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                    Deskripsi
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Optional</Badge>
                  </Label>
                  <Textarea
                    id="description"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    placeholder="Jelaskan kegunaan template ini..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2 text-sm font-medium">
                    Kategori
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                  </Label>
                  <Select
                    value={uploadForm.category}
                    onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat">Surat</SelectItem>
                      <SelectItem value="sertifikat">Sertifikat</SelectItem>
                      <SelectItem value="laporan">Laporan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    Upload File Template
                    <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Required</Badge>
                  </Label>
                  <FileUploadMinio
                    label="Upload Template DOCX"
                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    maxSize={10}
                    onUploadComplete={(url, fileName) => {
                      setUploadedFile({ url, name: fileName })
                    }}
                    currentFile={uploadedFile}
                    onRemove={() => setUploadedFile(null)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Format: .docx | Max: 10MB
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>

          {/* RIGHT PANEL: Document Preview */}
          <div className="flex flex-col h-full bg-muted/20">
            <div className="p-4 border-b bg-background/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Preview Dokumen</h2>
                </div>
                {detectedVariables.length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Code2 className="w-3 h-3" />
                    {detectedVariables.length} Variable{detectedVariables.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6">
                {!uploadedFile ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                    <div className="p-4 mb-4 rounded-full bg-muted">
                      <FileText className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">Belum Ada Dokumen</h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Upload file DOCX di panel sebelah kiri untuk melihat preview dokumen dan variable yang terdeteksi
                    </p>
                  </div>
                ) : loadingPreview ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                    <div className="w-12 h-12 mb-4 border-4 rounded-full animate-spin border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading preview...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Detected Variables */}
                    {detectedVariables.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-sm">
                            <Code2 className="w-4 h-4" />
                            Variable Terdeteksi
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {detectedVariables.map((variable, index) => (
                              <Badge key={index} variant="outline" className="font-mono text-xs">
                                {`{{${variable}}}`}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Document Content */}
                    <Card>
                      <CardContent className="p-6">
                        <div
                          className="prose-sm prose dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: documentPreview }}
                        />
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

        </div>
      </div>
    </div>
  )
}
