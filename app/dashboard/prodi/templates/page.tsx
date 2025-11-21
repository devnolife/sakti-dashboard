"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  FileText,
  Download,
  Edit,
  Trash2,
  Plus,
  Eye,
  Edit2
} from "lucide-react"
import { TemplateVariableEditor } from "@/components/templates/template-variable-editor"
import { TemplatePreviewDialog } from "@/components/templates/template-preview-dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

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
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [variableEditorOpen, setVariableEditorOpen] = useState(false)
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [selectedTemplateForEdit, setSelectedTemplateForEdit] = useState<Template | null>(null)

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

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
    if (!confirm("Apakah Anda yakin ingin menghapus template ini?")) return

    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Berhasil",
          description: "Template berhasil dihapus",
        })
        fetchTemplates()
      } else {
        toast({
          title: "Error",
          description: data.error || "Gagal menghapus template",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghapus template",
        variant: "destructive",
      })
    }
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

  return (
    <div className="container py-8 mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Template Dokumen Prodi</h1>
          <p className="text-muted-foreground">
            Kelola template dokumen untuk prodi Anda
          </p>
        </div>
        <Button onClick={() => window.location.href = '/dashboard/prodi/templates/upload'}>
          <Plus className="w-4 h-4 mr-2" />
          Upload Template Baru
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{templates.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Template tersedia</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Template Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {templates.filter(t => t.is_active).length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Siap digunakan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Template Prodi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {templates.filter(t => !t.is_global).length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Template khusus prodi</p>
          </CardContent>
        </Card>
      </div>

      {/* Simple Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium min-w-[100px]">Filter Kategori:</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="surat">Surat</SelectItem>
                <SelectItem value="sertifikat">Sertifikat</SelectItem>
                <SelectItem value="laporan">Laporan</SelectItem>
              </SelectContent>
            </Select>
            {categoryFilter !== "all" && (
              <Button variant="ghost" size="sm" onClick={() => setCategoryFilter("all")}>
                Reset Filter
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-3/4 h-4 bg-gray-200 rounded" />
                <div className="w-1/2 h-3 mt-2 bg-gray-200 rounded" />
              </CardHeader>
              <CardContent>
                <div className="w-full h-3 bg-gray-200 rounded" />
              </CardContent>
            </Card>
          ))
        ) : templates.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="text-lg font-medium">Belum ada template</p>
              <p className="mb-4 text-sm text-muted-foreground">
                Upload template pertama Anda untuk memulai
              </p>
              <Button onClick={() => window.location.href = '/dashboard/prodi/templates/upload'}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Template
              </Button>
            </CardContent>
          </Card>
        ) : (
          templates.map((template) => (
            <Card key={template.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="w-5 h-5" />
                      {template.name}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {template.description || "Tidak ada deskripsi"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant={template.is_global ? "default" : "secondary"}>
                    {template.is_global ? "Global" : template.prodi?.nama || "Prodi"}
                  </Badge>
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant={template.is_active ? "default" : "secondary"}>
                    {template.is_active ? "Aktif" : "Nonaktif"}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>Version: v{template.version}</div>
                  <div>Size: {formatFileSize(template.file_size)}</div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplateForEdit(template)
                      setPreviewDialogOpen(true)
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(template.file_url, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {!template.is_global && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplateForEdit(template)
                          setVariableEditorOpen(true)
                        }}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Variables
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(template)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="col-span-2"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus Template
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Update informasi template
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
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
