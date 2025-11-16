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
  Trash2,
  Plus,
  FileCheck,
  Eye,
  Edit2
} from "lucide-react"
import { TemplateVariableEditor } from "@/components/templates/template-variable-editor"
import { TemplatePreviewDialog } from "@/components/templates/template-preview-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

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

export default function ProdiTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [variableEditorOpen, setVariableEditorOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<Template | null>(null)

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

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
    is_active: true,
  })

  useEffect(() => {
    fetchTemplates()
  }, [categoryFilter])

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (categoryFilter !== "all") params.append("category", categoryFilter)

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
    if (!uploadedFile) {
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
      formData.append("is_global", "false") // Prodi templates are never global

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return

    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: "Template deleted successfully",
        })
        fetchTemplates()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to delete template",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
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
      is_active: template.is_active,
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
          <FileText className="h-4 w-4 text-muted-foreground" />
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
          {row.original.is_global ? "Global" : row.original.prodi?.nama || "Prodi"}
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
      cell: ({ row }) => {
        // Only show edit/delete for prodi templates (not global)
        const canEdit = !row.original.is_global

        return (
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
              <Eye className="h-4 w-4" />
            </Button>
            {canEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelectedTemplateForEdit(row.original)
                  setVariableEditorOpen(true)
                }}
                title="Edit Variables"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open(row.original.file_url, "_blank")}
              title="Download"
            >
              <Download className="h-4 w-4" />
            </Button>
            {canEdit && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(row.original)}
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(row.original.id)}
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </>
            )}
          </div>
        )
      },
    },
  ]

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Template Dokumen Prodi</h1>
          <p className="text-muted-foreground">
            Kelola template dokumen untuk prodi Anda
          </p>
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Template Baru</DialogTitle>
              <DialogDescription>
                Upload file .docx untuk dijadikan template dokumen prodi
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Template *</Label>
                <Input
                  id="name"
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="Contoh: Template Surat Keterangan Aktif"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Deskripsi template..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
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

              <div className="space-y-2">
                <Label>Upload File Template (.docx)</Label>
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
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleUploadSubmit} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Template"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Templates</CardTitle>
          <CardDescription>Filter templates berdasarkan kategori</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="surat">Surat</SelectItem>
                  <SelectItem value="sertifikat">Sertifikat</SelectItem>
                  <SelectItem value="laporan">Laporan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Templates</CardTitle>
          <CardDescription>
            Total {templates.length} templates (termasuk template global dan prodi)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={templates} />
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Update informasi template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
                  <SelectItem value="sertifikat">Sertifikat</SelectItem>
                  <SelectItem value="laporan">Laporan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-is_active"
                checked={editForm.is_active}
                onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
              />
              <Label htmlFor="edit-is_active">Template Aktif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
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
        <TemplateVariableEditor
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
