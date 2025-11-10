"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, BookOpen, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface JenisSurat {
  id: number
  nama: string
  kode: string
}

interface MasalahSurat {
  id: number
  nama: string
  kode: string
}

interface Tujuan {
  id: number
  nama: string
  kode: string
  id_jenis: number
}

interface KetentuanSurat {
  id: number
  id_tujuan: number
  id_masalah: number
  kode: string
  nama: string
  id_jenis: number
  tujuan?: Tujuan
  masalah?: MasalahSurat
  jenis?: {
    id: number
    nama: string
    kode: string
  }
}

export default function KetentuanSuratPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  // Master data
  const [jenisSurat, setJenisSurat] = useState<JenisSurat[]>([])
  const [masalahSurat, setMasalahSurat] = useState<MasalahSurat[]>([])
  const [tujuanList, setTujuanList] = useState<Tujuan[]>([])
  const [ketentuanList, setKetentuanList] = useState<KetentuanSurat[]>([])

  // Form state
  const [selectedJenis, setSelectedJenis] = useState<string>('')
  const [selectedMasalah, setSelectedMasalah] = useState<string>('')
  const [selectedTujuan, setSelectedTujuan] = useState<string>('')
  const [kode, setKode] = useState('')
  const [nama, setNama] = useState('')

  // Fetch master data
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const [jenisRes, masalahRes, tujuanRes, ketentuanRes] = await Promise.all([
          fetch('/api/master-data/jenis-surat'),
          fetch('/api/master-data/masalah-surat'),
          fetch('/api/master-data/tujuan'),
          fetch('/api/master-data/ketentuan')
        ])

        if (jenisRes.ok) setJenisSurat(await jenisRes.json())
        if (masalahRes.ok) setMasalahSurat(await masalahRes.json())
        if (tujuanRes.ok) setTujuanList(await tujuanRes.json())
        if (ketentuanRes.ok) setKetentuanList(await ketentuanRes.json())
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter tujuan based on selected jenis
  const filteredTujuan = selectedJenis
    ? tujuanList.filter(t => t.id_jenis.toString() === selectedJenis)
    : []

  // Handle create ketentuan
  const handleCreateKetentuan = async () => {
    if (!selectedJenis || !selectedMasalah || !selectedTujuan || !kode || !nama) {
      toast({
        title: "Error",
        description: "Semua field wajib diisi",
        variant: "destructive"
      })
      return
    }

    setCreating(true)
    try {
      const response = await fetch('/api/master-data/ketentuan/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_jenis: parseInt(selectedJenis),
          id_masalah: parseInt(selectedMasalah),
          id_tujuan: parseInt(selectedTujuan),
          kode,
          nama
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: errorData.error || "Gagal membuat ketentuan surat",
          variant: "destructive"
        })
        return
      }

      toast({
        title: "Berhasil",
        description: "Ketentuan surat berhasil dibuat",
      })

      // Refresh list
      const ketentuanRes = await fetch('/api/master-data/ketentuan')
      if (ketentuanRes.ok) setKetentuanList(await ketentuanRes.json())

      // Reset form
      setSelectedJenis('')
      setSelectedMasalah('')
      setSelectedTujuan('')
      setKode('')
      setNama('')
    } catch (error: any) {
      console.error('Error creating ketentuan:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat ketentuan surat",
        variant: "destructive"
      })
    } finally {
      setCreating(false)
    }
  }

  // Handle delete ketentuan
  const handleDeleteKetentuan = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus ketentuan ini?')) return

    try {
      const response = await fetch(`/api/master-data/ketentuan/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Berhasil",
          description: "Ketentuan surat berhasil dihapus",
        })

        // Refresh list
        const ketentuanRes = await fetch('/api/master-data/ketentuan')
        if (ketentuanRes.ok) setKetentuanList(await ketentuanRes.json())
      } else {
        throw new Error('Failed to delete ketentuan')
      }
    } catch (error) {
      console.error('Error deleting ketentuan:', error)
      toast({
        title: "Error",
        description: "Gagal menghapus ketentuan surat",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Buat Ketentuan Surat</h2>
        <p className="text-muted-foreground">
          Gabungkan jenis, tujuan, dan masalah surat menjadi ketentuan baru
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Create Ketentuan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tambah Ketentuan Baru
            </CardTitle>
            <CardDescription>
              Pilih kombinasi jenis, tujuan, dan masalah surat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Jenis Surat *</Label>
              <Select value={selectedJenis} onValueChange={setSelectedJenis}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis surat" />
                </SelectTrigger>
                <SelectContent>
                  {jenisSurat.map((jenis) => (
                    <SelectItem key={jenis.id} value={jenis.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Badge>{jenis.kode}</Badge>
                        <span>{jenis.nama}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tujuan Surat *</Label>
              <Select value={selectedTujuan} onValueChange={setSelectedTujuan} disabled={!selectedJenis}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tujuan surat" />
                </SelectTrigger>
                <SelectContent>
                  {filteredTujuan.map((tujuan) => (
                    <SelectItem key={tujuan.id} value={tujuan.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Badge>{tujuan.kode}</Badge>
                        <span>{tujuan.nama}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedJenis && (
                <p className="text-xs text-muted-foreground mt-1">
                  Pilih jenis surat terlebih dahulu
                </p>
              )}
            </div>

            <div>
              <Label>Masalah Surat *</Label>
              <Select value={selectedMasalah} onValueChange={setSelectedMasalah}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih masalah surat" />
                </SelectTrigger>
                <SelectContent className="max-w-sm">
                  {masalahSurat.map((masalah) => (
                    <SelectItem
                      key={masalah.id}
                      value={masalah.id.toString()}
                      className="cursor-pointer py-2"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs shrink-0">
                          {masalah.kode}
                        </Badge>
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-sm leading-tight">{masalah.nama}</span>
                          {masalah.masalah && (
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {masalah.masalah}
                            </span>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedMasalah && masalahSurat.find(m => m.id.toString() === selectedMasalah)?.masalah && (
                <div className="mt-1.5 p-2 bg-blue-50/50 dark:bg-blue-950/20 rounded text-xs text-muted-foreground border border-blue-100 dark:border-blue-900">
                  💡 {masalahSurat.find(m => m.id.toString() === selectedMasalah)?.masalah}
                </div>
              )}
            </div>

            <div>
              <Label>Kode Ketentuan *</Label>
              <Input
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                placeholder="Contoh: kkp, ujian, dll"
              />
            </div>

            <div>
              <Label>Nama Ketentuan *</Label>
              <Input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Kuliah Kerja Profesi"
              />
            </div>

            <Button
              onClick={handleCreateKetentuan}
              disabled={creating || !selectedJenis || !selectedMasalah || !selectedTujuan || !kode || !nama}
              className="w-full"
            >
              {creating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Membuat Ketentuan...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Ketentuan Surat
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Informasi
            </CardTitle>
            <CardDescription>
              Penjelasan tentang ketentuan surat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold mb-2">Apa itu Ketentuan Surat?</h4>
              <p className="text-sm text-muted-foreground">
                Ketentuan surat adalah aturan khusus yang menggabungkan jenis surat, tujuan, dan masalah
                menjadi satu kategori spesifik. Contoh: "KKP" adalah ketentuan untuk surat jenis PT & INSTANSI
                dengan tujuan tertentu dan masalah Perlengkapan dan Pengajaran.
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <h4 className="font-semibold">Komponen Ketentuan:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="secondary">1</Badge>
                  <div>
                    <strong>Jenis Surat:</strong> Kategori utama surat (A, B, C, D)
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary">2</Badge>
                  <div>
                    <strong>Tujuan Surat:</strong> Penerima atau tujuan pengiriman surat
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="secondary">3</Badge>
                  <div>
                    <strong>Masalah Surat:</strong> Topik atau perihal yang dibahas
                  </div>
                </li>
              </ul>
            </div>

            {selectedJenis && selectedTujuan && selectedMasalah && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg border-2 border-green-200 dark:border-green-800">
                <h4 className="font-semibold mb-2 text-green-800 dark:text-green-200">
                  Preview Kombinasi:
                </h4>
                <div className="space-y-1 text-sm">
                  <p><strong>Jenis:</strong> {jenisSurat.find(j => j.id.toString() === selectedJenis)?.nama}</p>
                  <p><strong>Tujuan:</strong> {tujuanList.find(t => t.id.toString() === selectedTujuan)?.nama}</p>
                  <p><strong>Masalah:</strong> {masalahSurat.find(m => m.id.toString() === selectedMasalah)?.nama}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Table of Existing Ketentuan */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Ketentuan Surat</CardTitle>
          <CardDescription>
            Ketentuan surat yang sudah dibuat ({ketentuanList.length} ketentuan)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ketentuanList.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Belum ada ketentuan surat</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Tujuan</TableHead>
                  <TableHead>Masalah</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ketentuanList.map((ketentuan) => (
                  <TableRow key={ketentuan.id}>
                    <TableCell>
                      <Badge className="font-mono">{ketentuan.kode}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{ketentuan.nama}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {ketentuan.jenis?.kode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ketentuan.tujuan?.kode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {ketentuan.masalah?.kode}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteKetentuan(ketentuan.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
