"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText, Eye, Download, Plus, Search, Filter, Edit3, FileJson, FileCode, Sparkles, Clock, CheckCircle2, Globe2, Building2, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import mammoth from "mammoth"
import { saveAs } from "file-saver"
import { InlineTemplateVariableEditor } from "@/components/templates/inline-template-variable-editor"
import { TemplateData, MockTemplate, TemplateVariable, TemplatePreview } from "@/types/template"
import { replaceDocxVariables, generateFullHTMLDocument } from "@/lib/template-utils"

export default function DocumentManagementTemplatesPage() {
  const [templates, setTemplates] = useState<TemplateData[]>([])
  const [loading, setLoading] = useState(true)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [previewData, setPreviewData] = useState<TemplatePreview | null>(null)
  const [isVariableEditorOpen, setIsVariableEditorOpen] = useState(false)
  const [mockTemplate, setMockTemplate] = useState<MockTemplate | null>(null)

  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  // Upload form
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploadName, setUploadName] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [uploadCategory, setUploadCategory] = useState("surat")
  const [isGlobal, setIsGlobal] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchTemplates()
  }, [categoryFilter])

  const fetchTemplates = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== "all") params.append("category", categoryFilter)

      const response = await fetch(`/api/templates?${params.toString()}`)
      const result = await response.json()

      if (response.ok) {
        setTemplates(result.data || [])
      } else {
        toast({
          title: "Gagal Memuat",
          description: result.error || "Tidak dapat memuat template",
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
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
    }
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

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('name', uploadName)
      formData.append('description', uploadDescription)
      formData.append('category', uploadCategory)
      formData.append('is_global', String(isGlobal))

      const response = await fetch('/api/templates/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Berhasil!",
          description: "Template berhasil diunggah"
        })
        setIsUploadOpen(false)
        fetchTemplates()
        resetUploadForm()
      } else {
        toast({
          title: "Unggah Gagal",
          description: result.error || "Gagal mengunggah template",
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

  const resetUploadForm = () => {
    setUploadFile(null)
    setUploadName("")
    setUploadDescription("")
    setUploadCategory("surat")
    setIsGlobal(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePreview = async (template: TemplateData) => {
    setSelectedTemplate(template)
    try {
      const response = await fetch(`/api/templates/${template.id}/preview`)
      const result = await response.json()

      if (response.ok) {
        setPreviewData(result)
        setIsPreviewOpen(true)
      } else {
        toast({
          title: "Gagal Memuat",
          description: "Tidak dapat memuat preview",
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
    setSelectedTemplate(template)
    try {
      const response = await fetch(`/api/templates/${template.id}/preview`)
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
          description: "Tidak dapat memuat template",
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

    try {
      const response = await fetch(`/api/templates/${selectedTemplate.id}/variables`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variables })
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Berhasil Disimpan!",
          description: "Variabel berhasil disimpan"
        })
        fetchTemplates() // Refresh list
      } else {
        toast({
          title: "Gagal Menyimpan",
          description: result.error || "Tidak dapat menyimpan variabel",
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
      // Check if template has variables defined
      const hasVariables = template.variable_mapping && Object.keys(template.variable_mapping).length > 0

      if (hasVariables) {
        // Download with variables replaced
        const response = await fetch(template.file_url)
        const blob = await response.blob()
        const file = new File([blob], template.file_name, { type: blob.type })

        const modifiedBlob = await replaceDocxVariables(file, template.variable_mapping!)
        saveAs(modifiedBlob, template.file_name.replace('.docx', '_with_variables.docx'))

        
        toast({
          title: "Berhasil Diunduh!",
          description: `Template dengan ${Object.keys(template.variable_mapping!).length} variabel telah diunduh`
        })
      } else {
        // Download original file
        const response = await fetch(template.file_url)
        const blob = await response.blob()
        saveAs(blob, template.file_name)
        
        toast({
          title: "Berhasil Diunduh!",
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
  }  const handleDownloadHTML = async (template: TemplateData) => {
    try {
      const response = await fetch(`/api/templates/${template.id}/preview`)
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
          title: "Downloaded",
          description: "Template downloaded as HTML"
        })
      }
    } catch (error) {
      console.error("Error downloading HTML:", error)
      toast({
        title: "Error",
        description: "Failed to download HTML",
        variant: "destructive"
      })
    }
  }

  const handleDownloadJSON = async (template: TemplateData) => {
    try {
      const response = await fetch(`/api/templates/${template.id}/variables`)
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
        saveAs(blob, `${template.name.replace('.docx', '')}_variables.json`)

        
        toast({
          title: "Berhasil Diunduh!",
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
  }  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="container py-8 mx-auto space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Template Management</h1>
          <p className="text-muted-foreground">Manage document templates with variable placeholders</p>
        </div>
        <Button onClick={() => setIsUploadOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Upload Template
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="surat">Surat</SelectItem>
                <SelectItem value="sertifikat">Sertifikat</SelectItem>
                <SelectItem value="laporan">Laporan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Template List */}
      {loading ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      ) : filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No templates found</h3>
            <p className="mb-4 text-muted-foreground">
              {searchQuery ? "Try adjusting your search" : "Upload your first template to get started"}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsUploadOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Template
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <FileText className="w-8 h-8 text-primary" />
                  <Badge variant={template.is_global ? "default" : "secondary"}>
                    {template.is_global ? "Global" : "Prodi"}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-lg line-clamp-1">{template.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {template.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{Math.round(template.file_size / 1024)} KB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Variables:</span>
                    <span>{Object.keys(template.variable_mapping || {}).length}</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditVariables(template)}
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Variables
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadDOCX(template)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    DOCX
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadHTML(template)}
                  >
                    <FileCode className="w-4 h-4 mr-1" />
                    HTML
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => handleDownloadJSON(template)}
                >
                  <FileJson className="w-4 h-4 mr-1" />
                  Export JSON
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Template</DialogTitle>
            <DialogDescription>
              Upload a DOCX file to create a new template
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file">File *</Label>
              <Input
                id="file"
                type="file"
                accept=".docx"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
              {uploadFile && (
                <p className="text-sm text-muted-foreground">
                  Selected: {uploadFile.name} ({Math.round(uploadFile.size / 1024)} KB)
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Surat Keputusan Template"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of the template"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={uploadCategory} onValueChange={setUploadCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surat">Surat</SelectItem>
                  <SelectItem value="sertifikat">Sertifikat</SelectItem>
                  <SelectItem value="laporan">Laporan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_global"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
                className="w-4 h-4"
                aria-label="Make template global"
              />
              <Label htmlFor="is_global" className="cursor-pointer">
                Make this template global (accessible to all)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isUploading || !uploadFile || !uploadName}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      {previewData && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{selectedTemplate?.name}</DialogTitle>
              <DialogDescription>
                Template preview with {Object.keys(previewData.variableMapping || {}).length} variables
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh] p-4 border rounded">
              <div
                className="prose max-w-none"
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
