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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/data-table"
import { FileUploadMinio } from "@/components/ui/file-upload-minio"
import { toast } from "@/hooks/use-toast"
import {
  FileText,
  Upload,
  Download,
  Edit,
  Eye,
  Plus,
  Edit2,
  Info
} from "lucide-react"
import { TemplateVariableEditorWrapper } from "@/components/templates/template-variable-editor-wrapper"
import { TemplatePreviewDialog } from "@/components/templates/template-preview-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Template {
  id: string
  name: string
  description: string | null
  file_url: string
  file_name: string
  file_size: number
  category: string
  prodi_id: string | null
  is_global: boolean
  is_active: boolean
  detected_fields: any
  version: number
  created_at: string
  prodi?: {
    kode: string
    nama: string
  }
  uploader: {
    name: string
    role: string
  }
}

interface UserProdi {
  kode: string
  nama: string
}

export default function StaffTUTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [userProdi, setUserProdi] = useState<UserProdi | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [variableEditorOpen, setVariableEditorOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<Template | null>(null)

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [scopeFilter, setScopeFilter] = useState<string>("all")

  // Upload form states
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    category: "surat",
  })
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null)
  const [uploading, setUploading] = useState(false)

  // Edit form states
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    category: "surat",
  })

  useEffect(() => {
    fetchUserProdi()
  }, [])

  useEffect(() => {
    if (userProdi) {
      fetchTemplates()
    }
  }, [categoryFilter, scopeFilter, userProdi])

  const fetchUserProdi = async () => {
    try {
      const response = await fetch("/api/user/prodi")
      const data = await response.json()

      if (data.success && data.data) {
        setUserProdi(data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch your prodi information",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to fetch user prodi:", error)
      toast({
        title: "Error",
        description: "Failed to fetch your prodi information",
        variant: "destructive",
      })
    }
  }

  const fetchTemplates = async () => {
    if (!userProdi) return

    try {
      setLoading(true)
      const params = new URLSearchParams()

      // Always filter by user's prodi
      params.append("prodi_id", userProdi.kode)

      if (categoryFilter !== "all") params.append("category", categoryFilter)
      if (scopeFilter === "global") params.append("is_global", "true")
      if (scopeFilter === "prodi") params.append("is_global", "false")

      const response = await fetch(`/api/templates?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setTemplates(data.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch templates",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch templates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUploadSubmit = async () => {
    if (!uploadedFile || !userProdi) {
      toast({
        title: "Error",
        description: "Please upload a file first",
        variant: "destructive",
      })
      return
    }

    if (!uploadForm.name) {
      toast({
        title: "Error",
        description: "Template name is required",
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
      formData.append("is_global", "false") // Staff TU can only create prodi-specific templates
      formData.append("prodi_id", userProdi.kode)

      const response = await fetch("/api/templates/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Template uploaded successfully",
        })
        setUploadDialogOpen(false)
        resetUploadForm()
        fetchTemplates()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to upload template",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload template",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleEditSubmit = async () => {
    if (!selectedTemplate) return

    try {
      const response = await fetch(`/api/templates/${selectedTemplate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Template updated successfully",
        })
        setEditDialogOpen(false)
        setSelectedTemplate(null)
        fetchTemplates()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update template",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update template",
        variant: "destructive",
      })
    }
  }

  const resetUploadForm = () => {
    setUploadForm({
      name: "",
      description: "",
      category: "surat",
    })
    setUploadedFile(null)
  }

  const openEditDialog = (template: Template) => {
    setSelectedTemplate(template)
    setEditForm({
      name: template.name,
      description: template.description || "",
      category: template.category,
    })
    setEditDialogOpen(true)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i]
  }

  const columns: ColumnDef<Template>[] = [
    {
      accessorKey: "name",
      header: "Template Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">{row.original.file_name}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: "scope",
      header: "Scope",
      cell: ({ row }) => (
        <Badge variant={row.original.is_global ? "default" : "secondary"}>
          {row.original.is_global ? "Global" : "Prodi"}
        </Badge>
      ),
    },
    {
      accessorKey: "file_size",
      header: "Size",
      cell: ({ row }) => formatFileSize(row.original.file_size),
    },
    {
      accessorKey: "version",
      header: "Version",
      cell: ({ row }) => `v${row.original.version}`,
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.is_active ? "default" : "secondary"}>
          {row.original.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedTemplateForEdit(row.original)
              setPreviewDialogOpen(true)
            }}
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedTemplateForEdit(row.original)
              setVariableEditorOpen(true)
            }}
            title="Edit Variables"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(row.original.file_url, "_blank")}
            title="Download"
          >
            <Download className="w-4 h-4" />
          </Button>
          {!row.original.is_global && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openEditDialog(row.original)}
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="container py-8 mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Template Dokumen</h1>
          <p className="text-muted-foreground">
            Kelola template dokumen untuk {userProdi?.nama || "prodi Anda"}
          </p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Upload Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Template Baru</DialogTitle>
              <DialogDescription>
                Upload template dokumen DOCX untuk prodi {userProdi?.nama}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Alert>
                <Info className="w-4 h-4" />
                <AlertTitle>Info</AlertTitle>
                <AlertDescription>
                  Template yang Anda upload hanya akan tersedia untuk prodi {userProdi?.nama}
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="template-name">Nama Template *</Label>
                <Input
                  id="template-name"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="Contoh: Surat Keterangan Mahasiswa Aktif"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-description">Deskripsi</Label>
                <Textarea
                  id="template-description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Deskripsi singkat tentang template ini"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-category">Kategori</Label>
                <Select
                  value={uploadForm.category}
                  onValueChange={(value) => setUploadForm({ ...uploadForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surat">Surat</SelectItem>
                    <SelectItem value="sk">SK (Surat Keputusan)</SelectItem>
                    <SelectItem value="berita_acara">Berita Acara</SelectItem>
                    <SelectItem value="undangan">Undangan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>File DOCX *</Label>
                <FileUploadMinio
                  accept=".docx"
                  onUploadComplete={(url) => {
                    const fileName = url.split('/').pop() || 'uploaded-file.docx'
                    setUploadedFile({ url, name: fileName })
                  }}
                  maxSize={10 * 1024 * 1024}
                />
                {uploadedFile && (
                  <div className="flex items-center gap-2 p-2 text-sm border rounded-lg bg-muted">
                    <FileText className="w-4 h-4" />
                    <span className="flex-1 truncate">{uploadedFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setUploadDialogOpen(false)
                  resetUploadForm()
                }}
              >
                Batal
              </Button>
              <Button onClick={handleUploadSubmit} disabled={uploading || !uploadedFile}>
                {uploading ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                    Mengupload...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
          <CardDescription>Filter templates berdasarkan kategori dan scope</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Label>Kategori</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="surat">Surat</SelectItem>
                <SelectItem value="sk">SK</SelectItem>
                <SelectItem value="berita_acara">Berita Acara</SelectItem>
                <SelectItem value="undangan">Undangan</SelectItem>
                <SelectItem value="lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Label>Scope</Label>
            <Select value={scopeFilter} onValueChange={setScopeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="prodi">Prodi Saya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Template</CardTitle>
          <CardDescription>
            {loading ? "Memuat..." : `${templates.length} template tersedia`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            // @ts-ignore - DataTable type inference issue
            <DataTable columns={columns} data={templates} />
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Update informasi template
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Template</Label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Kategori</Label>
              <Select
                value={editForm.category}
                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="surat">Surat</SelectItem>
                  <SelectItem value="sk">SK</SelectItem>
                  <SelectItem value="berita_acara">Berita Acara</SelectItem>
                  <SelectItem value="undangan">Undangan</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false)
                setSelectedTemplate(null)
              }}
            >
              Batal
            </Button>
            <Button onClick={handleEditSubmit}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Variable Editor Dialog */}
      {selectedTemplateForEdit && (
        <TemplateVariableEditorWrapper
          templateId={selectedTemplateForEdit.id}
          open={variableEditorOpen}
          onOpenChange={setVariableEditorOpen}
          onSave={fetchTemplates}
        />
      )}

      {/* Preview Dialog */}
      {selectedTemplateForEdit && (
        <TemplatePreviewDialog
          templateId={selectedTemplateForEdit.id}
          open={previewDialogOpen}
          onOpenChange={setPreviewDialogOpen}
        />
      )}
    </div>
  )
}
