"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { DynamicFieldsBuilder } from "./dynamic-fields-builder"
import type { DynamicField } from "@/types/correspondence"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, FileText, Clock, CheckCircle2, AlertCircle, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface LetterType {
  id: string
  title: string
  description: string
  approval_role: string
  estimated_days: number
  required_documents: string[]
  additional_fields?: DynamicField[]
  prodi_id?: string
  is_global: boolean
  is_active: boolean
  template?: string
  prodi?: {
    kode: string
    nama: string
  }
}

export default function LetterTypesManager() {
  const router = useRouter()
  const [letterTypes, setLetterTypes] = useState<LetterType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<LetterType | null>(null)
  const [formData, setFormData] = useState<Partial<LetterType>>({})

  useEffect(() => {
    fetchLetterTypes()
  }, [])

  const fetchLetterTypes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin-umum/letter-types')
      const result = await response.json()

      if (result.success) {
        setLetterTypes(result.data)
      }
    } catch (error) {
      console.error('Error fetching letter types:', error)
      toast({
        title: "Error",
        description: "Gagal memuat data jenis surat",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredData = letterTypes.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" ||
      (filterStatus === "active" && item.is_active) ||
      (filterStatus === "inactive" && !item.is_active)
    return matchesSearch && matchesStatus
  })

  const handleAdd = async () => {
    // Validation
    if (!formData.title || !formData.description || !formData.approval_role || !formData.estimated_days) {
      toast({
        title: "Validasi Gagal",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      })
      return
    }

    try {
      const response = await fetch('/api/admin-umum/letter-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          required_documents: formData.required_documents || []
        })
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil!",
          description: "Jenis surat berhasil ditambahkan"
        })
        setFormData({})
        setIsAddDialogOpen(false)
        fetchLetterTypes()
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal menambahkan jenis surat",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error adding letter type:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan jenis surat",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (item: LetterType) => {
    router.push(`/dashboard/admin_umum/letter-types/edit/${item.id}`)
  }

  const handleUpdate = async () => {
    if (!editingItem) return

    try {
      const response = await fetch(`/api/admin-umum/letter-types/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil!",
          description: "Jenis surat berhasil diperbarui"
        })
        setEditingItem(null)
        setFormData({})
        fetchLetterTypes()
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal memperbarui jenis surat",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error updating letter type:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memperbarui jenis surat",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin-umum/letter-types/${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil!",
          description: "Jenis surat berhasil dinonaktifkan"
        })
        fetchLetterTypes()
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal menghapus jenis surat",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error deleting letter type:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus jenis surat",
        variant: "destructive"
      })
    }
  }

  const stats = {
    total: letterTypes.length,
    active: letterTypes.filter(item => item.is_active).length,
    inactive: letterTypes.filter(item => !item.is_active).length
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Manajemen Jenis Surat</h1>
            <p className="text-lg text-blue-100">Kelola jenis-jenis surat yang tersedia untuk mahasiswa dan dosen</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-indigo-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <Badge className="text-indigo-700 bg-indigo-100">Total</Badge>
            </div>
            <div className="mb-1 text-2xl font-bold text-indigo-700">{stats.total}</div>
            <div className="text-sm font-medium text-indigo-600">Total Jenis Surat</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <Badge className="text-green-700 bg-green-100">Aktif</Badge>
            </div>
            <div className="mb-1 text-2xl font-bold text-green-700">{stats.active}</div>
            <div className="text-sm font-medium text-green-600">Surat Aktif</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-red-50 to-rose-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <Badge className="text-red-700 bg-red-100">Nonaktif</Badge>
            </div>
            <div className="mb-1 text-2xl font-bold text-red-700">{stats.inactive}</div>
            <div className="text-sm font-medium text-red-600">Surat Nonaktif</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex w-full gap-2 md:w-auto">
          <div className="relative flex-1 md:w-96">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari jenis surat..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Nonaktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => router.push('/dashboard/admin_umum/letter-types/add')}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Jenis Surat
        </Button>
      </div>

      {/* Old Add Dialog - Keep for backward compatibility but hidden */}
      <div className="hidden">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Jenis Surat (Old)
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Jenis Surat Baru</DialogTitle>
              <DialogDescription>
                Buat jenis surat baru yang dapat digunakan oleh mahasiswa dan dosen
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Judul Surat <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: Surat Keterangan Mahasiswa Aktif"
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Judul yang akan ditampilkan kepada mahasiswa/dosen
                </p>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Deskripsi <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan tujuan dan kegunaan surat ini secara detail"
                  rows={4}
                  required
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Penjelasan tentang fungsi dan kegunaan surat ini
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="approval_role" className="text-sm font-medium">
                    Pihak yang Menyetujui <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.approval_role}
                    onValueChange={(value) => setFormData({ ...formData, approval_role: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dekan">Dekan</SelectItem>
                      <SelectItem value="staff_tu">Staff TU</SelectItem>
                      <SelectItem value="prodi">Kaprodi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="estimated_days" className="text-sm font-medium">
                    Estimasi Hari <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="estimated_days"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.estimated_days || ""}
                    onChange={(e) => setFormData({ ...formData, estimated_days: parseInt(e.target.value) })}
                    placeholder="3"
                    required
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Waktu proses (1-30 hari)
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="required_docs" className="text-sm font-medium">
                  Dokumen yang Diperlukan
                </Label>
                <Input
                  id="required_docs"
                  value={formData.required_documents?.join(", ") || ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    required_documents: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                  })}
                  placeholder="KTM, KRS, Transkrip Nilai"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Pisahkan dengan koma. Contoh: KTM, KRS, Transkrip Nilai
                </p>
              </div>

              <div className="border-t pt-4">
                <DynamicFieldsBuilder
                  fields={formData.additional_fields || []}
                  onChange={(fields) => setFormData({ ...formData, additional_fields: fields })}
                />
              </div>

              <div>
                <Label htmlFor="template" className="text-sm font-medium">
                  Template Surat (Opsional)
                </Label>
                <Textarea
                  id="template"
                  value={formData.template || ""}
                  onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                  placeholder="Template konten surat (dalam format HTML atau text)"
                  rows={4}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Template ini akan digunakan sebagai dasar pembuatan surat
                </p>
              </div>

              <div className="p-4 space-y-3 rounded-lg bg-muted/50">
                <Label className="text-sm font-medium">Pengaturan Tambahan</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_global"
                    checked={formData.is_global || false}
                    onChange={(e) => setFormData({ ...formData, is_global: e.target.checked })}
                    className="w-4 h-4 border-gray-300 rounded"
                    aria-label="Berlaku untuk semua prodi"
                  />
                  <Label htmlFor="is_global" className="font-normal cursor-pointer">
                    Berlaku untuk semua program studi
                  </Label>
                </div>
                <p className="ml-6 text-xs text-muted-foreground">
                  Jika dicentang, surat ini dapat diakses oleh semua program studi
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false)
                setFormData({})
              }}>
                Batal
              </Button>
              <Button onClick={handleAdd}>
                Tambah Jenis Surat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 animate-spin" />
                <p className="text-muted-foreground">Memuat data jenis surat...</p>
              </div>
            </CardContent>
          </Card>
        ) : filteredData.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="w-12 h-12 text-muted-foreground" />
                <p className="text-lg font-medium">Belum ada jenis surat</p>
                <p className="text-sm text-muted-foreground">
                  Klik tombol "Tambah Jenis Surat" untuk membuat jenis surat baru
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredData.map((item) => (
            <Card key={item.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.estimated_days} hari
                      </Badge>
                      <Badge variant="outline">{item.approval_role}</Badge>
                      {item.is_global ? (
                        <Badge variant="secondary">Global</Badge>
                      ) : item.prodi ? (
                        <Badge variant="secondary">{item.prodi.nama}</Badge>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.is_active ? "default" : "secondary"}>
                      {item.is_active ? "Aktif" : "Nonaktif"}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Nonaktifkan Jenis Surat</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menonaktifkan "{item.title}"? Surat ini tidak akan tersedia untuk dipilih.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)}>
                            Nonaktifkan
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardHeader>
              {item.required_documents && item.required_documents.length > 0 && (
                <CardContent>
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium min-w-fit">Dokumen Diperlukan:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.required_documents.map((doc, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingItem} onOpenChange={() => {
        setEditingItem(null)
        setFormData({})
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Jenis Surat</DialogTitle>
            <DialogDescription>
              Perbarui informasi jenis surat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title" className="text-sm font-medium">
                Judul Surat <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Surat Keterangan Mahasiswa Aktif"
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Deskripsi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan tujuan dan kegunaan surat ini"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-approval_role" className="text-sm font-medium">
                  Pihak yang Menyetujui <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.approval_role}
                  onValueChange={(value) => setFormData({ ...formData, approval_role: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dekan">Dekan</SelectItem>
                    <SelectItem value="staff_tu">Staff TU</SelectItem>
                    <SelectItem value="prodi">Kaprodi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-estimated_days" className="text-sm font-medium">
                  Estimasi Hari <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="edit-estimated_days"
                  type="number"
                  min="1"
                  max="30"
                  value={formData.estimated_days || ""}
                  onChange={(e) => setFormData({ ...formData, estimated_days: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-required_docs" className="text-sm font-medium">
                Dokumen yang Diperlukan
              </Label>
              <Input
                id="edit-required_docs"
                value={formData.required_documents?.join(", ") || ""}
                onChange={(e) => setFormData({
                  ...formData,
                  required_documents: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                })}
                placeholder="KTM, KRS, Transkrip Nilai"
              />
            </div>

            <div className="border-t pt-4">
              <DynamicFieldsBuilder
                fields={formData.additional_fields || []}
                onChange={(fields) => setFormData({ ...formData, additional_fields: fields })}
              />
            </div>

            <div>
              <Label htmlFor="edit-template" className="text-sm font-medium">
                Template Surat (Opsional)
              </Label>
              <Textarea
                id="edit-template"
                value={formData.template || ""}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                placeholder="Template konten surat"
                rows={4}
              />
            </div>

            <div className="p-4 space-y-3 rounded-lg bg-muted/50">
              <Label className="text-sm font-medium">Status</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-is_global"
                    checked={formData.is_global || false}
                    onChange={(e) => setFormData({ ...formData, is_global: e.target.checked })}
                    className="w-4 h-4 border-gray-300 rounded"
                    aria-label="Berlaku untuk semua prodi"
                  />
                  <Label htmlFor="edit-is_global" className="font-normal cursor-pointer">
                    Berlaku untuk semua program studi
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="edit-is_active"
                    checked={formData.is_active !== false}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 border-gray-300 rounded"
                    aria-label="Status aktif"
                  />
                  <Label htmlFor="edit-is_active" className="font-normal cursor-pointer">
                    Aktif (surat dapat digunakan)
                  </Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setEditingItem(null)
              setFormData({})
            }}>
              Batal
            </Button>
            <Button onClick={handleUpdate}>
              Simpan Perubahan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
