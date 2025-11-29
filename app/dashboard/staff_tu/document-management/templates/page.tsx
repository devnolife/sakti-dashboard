"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Eye, Download, Plus, Search, Filter, Edit3, FileJson, FileCode, Sparkles, Clock, CheckCircle2, Globe2, Building2, File, Link2, Upload, FileUp, Wand2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { saveAs } from "file-saver"
import { InlineTemplateVariableEditor } from "@/components/templates/inline-template-variable-editor"
import { TemplateData, MockTemplate, TemplateVariable, TemplatePreview } from "@/types/template"
import { replaceDocxVariables, generateFullHTMLDocument } from "@/lib/template-utils"

const categoryConfig = {
  surat: { icon: FileText, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950", label: "Surat" },
  sertifikat: { icon: Sparkles, color: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-950", label: "Sertifikat" },
  laporan: { icon: File, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950", label: "Laporan" },
}

export default function DocumentManagementTemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<TemplateData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewData, setPreviewData] = useState<TemplatePreview | null>(null)
  const [isVariableEditorOpen, setIsVariableEditorOpen] = useState(false)
  const [mockTemplate, setMockTemplate] = useState<MockTemplate | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Helper function untuk handle logout otomatis saat token tidak valid
  const handleAuthError = useCallback(() => {
    // Hapus token dari localStorage
    localStorage.removeItem('session-token')
    localStorage.removeItem('user')

    toast({
      title: "Sesi Berakhir",
      description: "Sesi Anda telah berakhir. Mengalihkan ke halaman login...",
      variant: "destructive"
    })

    // Redirect ke login setelah 1.5 detik
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

  useEffect(() => {
    fetchTemplates()
  }, [categoryFilter])

  const fetchTemplates = useCallback(async () => {
    const headers = getAuthHeaders()
    if (!headers) return

    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== "all") params.append("category", categoryFilter)

      const response = await fetch(`/api/templates?${params.toString()}`, {
        headers
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        setTemplates(result.data || [])
      } else {
        toast({
          title: "Gagal Memuat",
          description: result.error || result.message || "Tidak dapat memuat template",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error fetching templates:", error)
      toast({
        title: "Koneksi Gagal",
        description: "Tidak dapat terhubung ke server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }, [categoryFilter, getAuthHeaders, handleAuthError])

  const handlePreview = async (template: TemplateData) => {
    const headers = getAuthHeaders()
    if (!headers) return

    setSelectedTemplate(template)
    try {
      const response = await fetch(`/api/templates/${template.id}/preview`, {
        headers
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        setPreviewData(result)
        setIsPreviewOpen(true)
      } else {
        toast({
          title: "Gagal Memuat",
          description: result.error || result.message || "Tidak dapat memuat preview",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error loading preview:", error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat memuat preview",
        variant: "destructive"
      })
    }
  }

  const handleEditVariables = async (template: TemplateData) => {
    const headers = getAuthHeaders()
    if (!headers) return

    setSelectedTemplate(template)
    try {
      const response = await fetch(`/api/templates/${template.id}/preview`, {
        headers
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        const mockTemplate: MockTemplate = {
          id: template.id,
          name: template.name,
          html: result.html,
          rawText: result.rawText,
          variableMapping: result.variableMapping || {}
        }
        setMockTemplate(mockTemplate)
        setIsVariableEditorOpen(true)
      } else {
        toast({
          title: "Gagal Memuat",
          description: result.error || result.message || "Tidak dapat memuat template",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error loading template:", error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat memuat template",
        variant: "destructive"
      })
    }
  }

  const handleSaveVariables = async (variables: Record<string, TemplateVariable>) => {
    if (!selectedTemplate) return

    const headers = getAuthHeaders()
    if (!headers) return

    try {
      const response = await fetch(`/api/templates/${selectedTemplate.id}/variables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({ variables })
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Berhasil Disimpan! ✓",
          description: "Variabel berhasil disimpan"
        })
        fetchTemplates()
      } else {
        toast({
          title: "Gagal Menyimpan",
          description: result.error || result.message || "Tidak dapat menyimpan variabel",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error saving variables:", error)
      toast({
        title: "Terjadi Kesalahan",
        description: "Tidak dapat menyimpan variabel",
        variant: "destructive"
      })
    }
  }

  const handleDownloadDOCX = async (template: TemplateData) => {
    try {
      const hasVariables = template.variable_mapping && Object.keys(template.variable_mapping).length > 0

      if (hasVariables) {
        const response = await fetch(template.file_url)
        const blob = await response.blob()
        // Convert blob to File object for processing
        const arrayBuffer = await blob.arrayBuffer()
        const file = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }) as any as File
        Object.defineProperty(file, 'name', { value: template.file_name })

        const modifiedBlob = await replaceDocxVariables(file, template.variable_mapping!)
        saveAs(modifiedBlob, template.file_name.replace('.docx', '_dengan_variabel.docx'))

        toast({
          title: "Berhasil Diunduh! 📥",
          description: `Template dengan ${Object.keys(template.variable_mapping!).length} variabel telah diunduh`
        })
      } else {
        const response = await fetch(template.file_url)
        const blob = await response.blob()
        saveAs(blob, template.file_name)

        toast({
          title: "Berhasil Diunduh! 📥",
          description: "Template berhasil diunduh"
        })
      }
    } catch (error) {
      console.error("Error downloading:", error)
      toast({
        title: "Gagal Mengunduh",
        description: "Tidak dapat mengunduh template",
        variant: "destructive"
      })
    }
  }

  const handleDownloadHTML = async (template: TemplateData) => {
    const headers = getAuthHeaders()
    if (!headers) return

    try {
      const response = await fetch(`/api/templates/${template.id}/preview`, {
        headers
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        const variableMapping = template.variable_mapping || {}
        const htmlContent = generateFullHTMLDocument(
          template.name,
          result.html,
          variableMapping
        )

        const blob = new Blob([htmlContent], { type: 'text/html' })
        saveAs(blob, `${template.name.replace('.docx', '')}.html`)

        toast({
          title: "Berhasil Diunduh! 📥",
          description: "Template HTML berhasil diunduh"
        })
      }
    } catch (error) {
      console.error("Error downloading HTML:", error)
      toast({
        title: "Gagal Mengunduh",
        description: "Tidak dapat mengunduh HTML",
        variant: "destructive"
      })
    }
  }

  const handleDownloadJSON = async (template: TemplateData) => {
    const headers = getAuthHeaders()
    if (!headers) return

    try {
      const response = await fetch(`/api/templates/${template.id}/variables`, {
        headers
      })

      if (response.status === 401) {
        handleAuthError()
        return
      }

      const result = await response.json()

      if (response.ok) {
        const jsonData = {
          name: template.name,
          variableMapping: result.variables || {},
          metadata: {
            variableCount: Object.keys(result.variables || {}).length,
            createdAt: template.created_at,
            templateId: template.id
          }
        }

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
        saveAs(blob, `${template.name.replace('.docx', '')}_variabel.json`)

        toast({
          title: "Berhasil Diunduh! 📥",
          description: "Konfigurasi variabel JSON berhasil diunduh"
        })
      }
    } catch (error) {
      console.error("Error downloading JSON:", error)
      toast({
        title: "Gagal Mengunduh",
        description: "Tidak dapat mengunduh JSON",
        variant: "destructive"
      })
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    const config = categoryConfig[category as keyof typeof categoryConfig]
    return config || categoryConfig.surat
  }

  return (
    <div className="container py-6 mx-auto space-y-6 max-w-7xl">
      {/* Header Section */}
      <div className="relative overflow-hidden border rounded-lg bg-gradient-to-br from-primary/5 via-primary/0 to-transparent">
        <div className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Kelola Template Dokumen
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                Unggah, edit variabel, dan kelola template dokumen untuk pembuatan dokumen massal
              </p>
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">{templates.length} Template</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-muted-foreground">Terakhir diperbarui hari ini</span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" className="shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Tambah Template
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Pilih Metode</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/staff_tu/document-management/templates/upload')}
                  className="cursor-pointer py-3"
                >
                  <Upload className="w-4 h-4 mr-3 text-blue-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Upload Template Jadi</span>
                    <span className="text-xs text-muted-foreground">Unggah file .docx yang sudah siap</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/dashboard/staff_tu/document-management/templates/new')}
                  className="cursor-pointer py-3"
                >
                  <Wand2 className="w-4 h-4 mr-3 text-purple-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Buat Template Baru</span>
                    <span className="text-xs text-muted-foreground">Upload dokumen & tandai variabel</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari template berdasarkan nama atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={categoryFilter} onValueChange={setCategoryFilter} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="all" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Semua
                </TabsTrigger>
                <TabsTrigger value="surat" className="gap-2">
                  <FileText className="w-4 h-4" />
                  Surat
                </TabsTrigger>
                <TabsTrigger value="sertifikat" className="gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sertifikat
                </TabsTrigger>
                <TabsTrigger value="laporan" className="gap-2">
                  <File className="w-4 h-4" />
                  Laporan
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Template List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="space-y-4 text-center">
            <div className="w-12 h-12 mx-auto border-4 border-t-4 rounded-full animate-spin border-primary border-t-transparent"></div>
            <p className="text-muted-foreground">Memuat template...</p>
          </div>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-20 text-center">
            <div className={cn(
              "w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center",
              "bg-gradient-to-br from-primary/10 to-primary/5"
            )}>
              <FileText className="w-10 h-10 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              {searchQuery ? "Tidak Ada Hasil" : "Belum Ada Template"}
            </h3>
            <p className="max-w-md mx-auto mb-6 text-muted-foreground">
              {searchQuery
                ? "Coba sesuaikan kata kunci pencarian Anda"
                : "Mulai dengan mengunggah template pertama Anda untuk membuat dokumen secara massal"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => router.push('/dashboard/staff_tu/document-management/templates/new')}
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Unggah Template Pertama
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const categoryInfo = getCategoryIcon(template.category)
            const CategoryIcon = categoryInfo.icon
            const variableCount = Object.keys(template.variable_mapping || {}).length

            return (
              <Card key={template.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg group">
                <div className={cn("p-4 border-b", categoryInfo.bgColor)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-lg", "bg-white dark:bg-gray-900 shadow-sm")}>
                      <CategoryIcon className={cn("w-6 h-6", categoryInfo.color)} />
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={template.is_global ? "default" : "secondary"} className="gap-1">
                        {template.is_global ? (
                          <>
                            <Globe2 className="w-3 h-3" />
                            Global
                          </>
                        ) : (
                          <>
                            <Building2 className="w-3 h-3" />
                            Prodi
                          </>
                        )}
                      </Badge>
                      {variableCount > 0 && (
                        <Badge variant="outline" className="gap-1">
                          <Edit3 className="w-3 h-3" />
                          {variableCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-1 group-hover:text-primary transition-colors">
                    {template.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {template.description || "Tidak ada deskripsi"}
                  </CardDescription>
                  {/* Badge jenis surat yang terhubung */}
                  {template.letter_type && (
                    <div className="pt-2">
                      <Badge variant="outline" className="gap-1 text-xs bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                        <Link2 className="w-3 h-3" />
                        {template.letter_type.title}
                      </Badge>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex-1 pb-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 p-2 rounded bg-muted/50">
                      <Badge variant="outline" className="text-xs">
                        {categoryInfo.label}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <span className="text-xs text-muted-foreground">Ukuran:</span>
                      <span className="text-xs font-medium">{Math.round(template.file_size / 1024)} KB</span>
                    </div>
                  </div>
                </CardContent>

                <CardContent className="pt-0 pb-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePreview(template)}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditVariables(template)}
                      className="gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Variabel
                    </Button>
                  </div>

                  <div className="relative">
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleDownloadDOCX(template)}
                      className="w-full gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Unduh DOCX
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownloadHTML(template)}
                      className="gap-1 text-xs"
                    >
                      <FileCode className="w-3 h-3" />
                      HTML
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownloadJSON(template)}
                      className="gap-1 text-xs"
                    >
                      <FileJson className="w-3 h-3" />
                      JSON
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Preview Dialog */}
      {previewData && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-5xl max-h-[85vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Eye className="w-5 h-5 text-primary" />
                {selectedTemplate?.name}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-4">
                <span>Pratinjau template dengan {Object.keys(previewData.variableMapping || {}).length} variabel</span>
                {Object.keys(previewData.variableMapping || {}).length > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <Edit3 className="w-3 h-3" />
                    {Object.keys(previewData.variableMapping || {}).length} Variabel
                  </Badge>
                )}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[65vh] p-6 border rounded-lg bg-white dark:bg-gray-950">
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: previewData.html }}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}

      {/* Variable Editor */}
      {mockTemplate && (
        <InlineTemplateVariableEditor
          template={mockTemplate}
          open={isVariableEditorOpen}
          onOpenChange={setIsVariableEditorOpen}
          onSave={handleSaveVariables}
        />
      )}
    </div>
  )
}
