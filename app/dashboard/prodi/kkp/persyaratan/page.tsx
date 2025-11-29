"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  ListChecks,
  GripVertical,
} from 'lucide-react'
import {
  getKkpProdiRequirements,
  createKkpProdiRequirement,
  updateKkpProdiRequirement,
  deleteKkpProdiRequirement,
  reorderKkpProdiRequirements,
  type KkpProdiRequirement,
} from "@/app/actions/kkp-prodi-requirements"
import { useAuth } from "@/context/auth-context"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function KkpRequirementsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [requirements, setRequirements] = useState<KkpProdiRequirement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedRequirement, setSelectedRequirement] = useState<KkpProdiRequirement | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    required: true,
  })
  const [userProdiId, setUserProdiId] = useState<string | null>(null)
  const [prodiName, setProdiName] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Fetch user's prodi information
  useEffect(() => {
    const fetchUserProdi = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("session-token") : null
        if (!token) {
          toast({
            title: "Error",
            description: "Sesi tidak ditemukan",
            variant: "destructive",
          })
          return
        }

        const response = await fetch("/api/dosen/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          if (data.lecturer?.prodi_id) {
            setUserProdiId(data.lecturer.prodi_id)
            setProdiName(data.lecturer.prodi?.nama || "")
          } else {
            toast({
              title: "Error",
              description: "Anda tidak terhubung dengan prodi manapun",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Error",
            description: "Gagal mengambil informasi prodi",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error fetching user prodi:", error)
        toast({
          title: "Error",
          description: "Gagal mengambil informasi prodi",
          variant: "destructive",
        })
      }
    }

    fetchUserProdi()
  }, [toast])

  // Fetch requirements when userProdiId is available
  useEffect(() => {
    const fetchRequirements = async () => {
      if (!userProdiId) return

      try {
        const data = await getKkpProdiRequirements(userProdiId)
        setRequirements(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching requirements:", error)
        toast({
          title: "Error",
          description: "Gagal mengambil data persyaratan KKP",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    if (userProdiId) {
      fetchRequirements()
    }
  }, [userProdiId, toast])

  const handleCreate = async () => {
    if (!userProdiId) {
      toast({
        title: "Error",
        description: "Prodi ID tidak ditemukan",
        variant: "destructive",
      })
      return
    }

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul persyaratan tidak boleh kosong",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const result = await createKkpProdiRequirement({
        prodi_id: userProdiId,
        title: formData.title,
        description: formData.description || undefined,
        required: formData.required,
      })

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message,
        })

        // Refresh requirements list
        const data = await getKkpProdiRequirements(userProdiId)
        setRequirements(data)

        setShowCreateDialog(false)
        setFormData({ title: "", description: "", required: true })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error creating requirement:", error)
      toast({
        title: "Error",
        description: "Gagal menambahkan persyaratan",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEdit = async () => {
    if (!selectedRequirement) return

    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Judul persyaratan tidak boleh kosong",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      const result = await updateKkpProdiRequirement(selectedRequirement.id, {
        title: formData.title,
        description: formData.description || undefined,
        required: formData.required,
      })

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message,
        })

        // Refresh requirements list
        if (userProdiId) {
          const data = await getKkpProdiRequirements(userProdiId)
          setRequirements(data)
        }

        setShowEditDialog(false)
        setSelectedRequirement(null)
        setFormData({ title: "", description: "", required: true })
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating requirement:", error)
      toast({
        title: "Error",
        description: "Gagal memperbarui persyaratan",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedRequirement) return

    setIsProcessing(true)
    try {
      const result = await deleteKkpProdiRequirement(selectedRequirement.id)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message,
        })

        // Refresh requirements list
        if (userProdiId) {
          const data = await getKkpProdiRequirements(userProdiId)
          setRequirements(data)
        }

        setShowDeleteDialog(false)
        setSelectedRequirement(null)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting requirement:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus persyaratan",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const openEditDialog = (requirement: KkpProdiRequirement) => {
    setSelectedRequirement(requirement)
    setFormData({
      title: requirement.title,
      description: requirement.description || "",
      required: requirement.required,
    })
    setShowEditDialog(true)
  }

  const openDeleteDialog = (requirement: KkpProdiRequirement) => {
    setSelectedRequirement(requirement)
    setShowDeleteDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Persyaratan KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola persyaratan Kuliah Kerja Praktik untuk {prodiName}
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} disabled={!userProdiId}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Persyaratan
        </Button>
      </div>

      {/* Requirements List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5" />
            Daftar Persyaratan KKP
          </CardTitle>
          <CardDescription>
            Persyaratan yang harus dipenuhi mahasiswa untuk mengajukan KKP
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RotateCcw className="w-6 h-6 mr-2 animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Memuat data...</span>
            </div>
          ) : requirements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Belum ada persyaratan</h3>
              <p className="text-sm text-muted-foreground">
                Tambahkan persyaratan KKP untuk prodi Anda
              </p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">#</TableHead>
                    <TableHead>Persyaratan</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead className="w-24">Wajib</TableHead>
                    <TableHead className="text-right w-32">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requirements.map((requirement, index) => (
                    <TableRow key={requirement.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="font-medium">{requirement.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-muted-foreground">
                          {requirement.description || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        {requirement.required ? (
                          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Wajib
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                            Opsional
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(requirement)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(requirement)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tambah Persyaratan KKP</DialogTitle>
            <DialogDescription>
              Tambahkan persyaratan baru untuk prodi {prodiName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Persyaratan *</Label>
              <Input
                id="title"
                placeholder="Contoh: Surat Permohonan dari Perusahaan"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi persyaratan (opsional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="required">Wajib dipenuhi</Label>
              <Switch
                id="required"
                checked={formData.required}
                onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)} disabled={isProcessing}>
              Batal
            </Button>
            <Button onClick={handleCreate} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Tambah"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Persyaratan KKP</DialogTitle>
            <DialogDescription>
              Perbarui informasi persyaratan
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Judul Persyaratan *</Label>
              <Input
                id="edit-title"
                placeholder="Contoh: Surat Permohonan dari Perusahaan"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                placeholder="Deskripsi persyaratan (opsional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-required">Wajib dipenuhi</Label>
              <Switch
                id="edit-required"
                checked={formData.required}
                onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} disabled={isProcessing}>
              Batal
            </Button>
            <Button onClick={handleEdit} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-500">
              <Trash2 className="w-5 h-5" />
              Hapus Persyaratan
            </DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus persyaratan ini?
            </DialogDescription>
          </DialogHeader>
          {selectedRequirement && (
            <div className="p-4 rounded-md bg-muted">
              <p className="font-medium">{selectedRequirement.title}</p>
              {selectedRequirement.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedRequirement.description}
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isProcessing}>
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
