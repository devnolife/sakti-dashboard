"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { DynamicFieldsBuilder } from "@/components/admin-umum/dynamic-fields-builder"
import type { DynamicField } from "@/types/correspondence"

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
}

export default function EditLetterTypePage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<Partial<LetterType>>({
    title: "",
    description: "",
    approval_role: "",
    estimated_days: 3,
    required_documents: [],
    additional_fields: [],
    is_global: true,
    is_active: true,
    template: ""
  })

  useEffect(() => {
    if (id) {
      fetchLetterType()
    }
  }, [id])

  const fetchLetterType = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin-umum/letter-types/${id}`)
      const result = await response.json()

      if (result.success) {
        setFormData(result.data)
      } else {
        toast({
          title: "Error",
          description: "Gagal memuat data jenis surat",
          variant: "destructive"
        })
        router.push('/dashboard/admin_umum/letter-types')
      }
    } catch (error) {
      console.error('Error fetching letter type:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat data",
        variant: "destructive"
      })
      router.push('/dashboard/admin_umum/letter-types')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title || !formData.description || !formData.approval_role || !formData.estimated_days) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      })
      return
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`/api/admin-umum/letter-types/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message || "Jenis surat berhasil diupdate"
        })
        router.push('/dashboard/admin_umum/letter-types')
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal mengupdate jenis surat",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error updating letter type:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengupdate jenis surat",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center max-w-5xl py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container max-w-5xl py-6 space-y-6">
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
          <h1 className="text-3xl font-bold tracking-tight">Edit Jenis Surat</h1>
          <p className="text-muted-foreground">
            Ubah informasi jenis surat
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Dasar */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
            <CardDescription>
              Informasi umum tentang jenis surat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Judul Surat <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Contoh: Surat Keterangan Mahasiswa Aktif"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Deskripsi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Jelaskan tujuan dan kegunaan surat ini secara detail"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="approval_role">
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

              <div className="space-y-2">
                <Label htmlFor="estimated_days">
                  Estimasi Hari <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="estimated_days"
                  type="number"
                  min="1"
                  max="30"
                  value={formData.estimated_days}
                  onChange={(e) => setFormData({ ...formData, estimated_days: parseInt(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="required_docs">
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
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Field Dinamis */}
        <Card>
          <CardHeader>
            <CardTitle>Field Dinamis</CardTitle>
            <CardDescription>
              Atur field custom yang akan diisi oleh mahasiswa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicFieldsBuilder
              fields={formData.additional_fields || []}
              onChange={(fields) => setFormData({ ...formData, additional_fields: fields })}
            />
          </CardContent>
        </Card>

        <Separator />

        {/* Template & Pengaturan */}
        <Card>
          <CardHeader>
            <CardTitle>Template & Pengaturan Lainnya</CardTitle>
            <CardDescription>
              Atur template surat dan pengaturan tambahan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">
                Template Surat (Opsional)
              </Label>
              <Textarea
                id="template"
                value={formData.template || ""}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                placeholder="Template konten surat (dalam format HTML atau text)"
                rows={6}
              />
            </div>

            <div className="p-4 space-y-3 rounded-lg bg-muted/50">
              <Label className="text-sm font-medium">Status & Pengaturan</Label>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_global"
                  checked={formData.is_global}
                  onChange={(e) => setFormData({ ...formData, is_global: e.target.checked })}
                  className="w-4 h-4 border-gray-300 rounded"
                  aria-label="Berlaku untuk semua program studi"
                />
                <Label htmlFor="is_global" className="font-normal cursor-pointer">
                  Berlaku untuk semua program studi
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active !== false}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 border-gray-300 rounded"
                  aria-label="Status aktif"
                />
                <Label htmlFor="is_active" className="font-normal cursor-pointer">
                  Aktif (surat dapat digunakan)
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Simpan Perubahan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
