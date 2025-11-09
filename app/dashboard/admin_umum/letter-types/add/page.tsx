"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export default function AddLetterTypePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<{
    title: string
    description: string
    approval_role: string
    estimated_days: number
    required_documents: string[]
    additional_fields: DynamicField[]
    prodi_id?: string
    is_global: boolean
    template?: string
  }>({
    title: "",
    description: "",
    approval_role: "",
    estimated_days: 3,
    required_documents: [],
    additional_fields: [],
    is_global: true,
    template: ""
  })

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
      const response = await fetch('/api/admin-umum/letter-types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: `lt-${Date.now()}`
        })
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message || "Jenis surat berhasil dibuat"
        })
        router.push('/dashboard/admin_umum/letter-types')
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal membuat jenis surat",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error creating letter type:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat jenis surat",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Tambah Jenis Surat Baru</h1>
          <p className="text-muted-foreground">
            Buat jenis surat baru yang dapat digunakan oleh mahasiswa dan dosen
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informasi Dasar */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Dasar</CardTitle>
            <CardDescription>
              Informasi umum tentang jenis surat yang akan dibuat
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
              <p className="text-xs text-muted-foreground">
                Judul yang akan ditampilkan kepada mahasiswa/dosen
              </p>
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
              <p className="text-xs text-muted-foreground">
                Penjelasan tentang fungsi dan kegunaan surat ini
              </p>
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
                <p className="text-xs text-muted-foreground">
                  Waktu proses (1-30 hari)
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="required_docs">
                Dokumen yang Diperlukan
              </Label>
              <Input
                id="required_docs"
                value={formData.required_documents.join(", ")}
                onChange={(e) => setFormData({
                  ...formData,
                  required_documents: e.target.value.split(",").map(s => s.trim()).filter(s => s)
                })}
                placeholder="KTM, KRS, Transkrip Nilai"
              />
              <p className="text-xs text-muted-foreground">
                Pisahkan dengan koma. Contoh: KTM, KRS, Transkrip Nilai
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Field Dinamis */}
        <Card>
          <CardHeader>
            <CardTitle>Field Dinamis</CardTitle>
            <CardDescription>
              Buat field custom yang akan diisi oleh mahasiswa saat mengajukan surat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicFieldsBuilder
              fields={formData.additional_fields}
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
                value={formData.template}
                onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                placeholder="Template konten surat (dalam format HTML atau text)"
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Template ini akan digunakan sebagai dasar pembuatan surat
              </p>
            </div>

            <div className="p-4 space-y-3 rounded-lg bg-muted/50">
              <Label className="text-sm font-medium">Pengaturan Tambahan</Label>
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
              <p className="ml-6 text-xs text-muted-foreground">
                Jika dicentang, surat ini dapat diakses oleh semua program studi
              </p>
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
                Simpan Jenis Surat
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
