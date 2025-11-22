"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, BookOpen, Trash2, CheckCircle } from "lucide-react"
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
  masalah?: string
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
      <div className="pt-4 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-4 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-gradient-to-r from-primary to-primary/70 bg-clip-text">
            Ketentuan Surat
          </h2>
          <p className="text-muted-foreground mt-1">
            Gabungkan jenis, tujuan, dan masalah surat menjadi ketentuan baru
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form Create Ketentuan */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-lg bg-primary/10">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              Tambah Ketentuan Baru
            </CardTitle>
            <CardDescription className="text-base">
              Pilih kombinasi jenis, tujuan, dan masalah surat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Jenis Surat *</Label>
              <Select value={selectedJenis} onValueChange={setSelectedJenis}>
                <SelectTrigger className="h-11 border-2">
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

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Tujuan Surat *</Label>
              <Select value={selectedTujuan} onValueChange={setSelectedTujuan} disabled={!selectedJenis}>
                <SelectTrigger className="h-11 border-2">
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
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1.5 flex items-center gap-1">
                  <span>⚠️</span> Pilih jenis surat terlebih dahulu
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Masalah Surat *</Label>
              <Select value={selectedMasalah} onValueChange={setSelectedMasalah}>
                <SelectTrigger className="h-11 border-2">
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
                <div className="mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg text-xs border-2 border-blue-100 dark:border-blue-900">
                  <div className="flex items-start gap-2">
                    <span className="text-base">💡</span>
                    <span className="text-blue-700 dark:text-blue-300 font-medium">
                      {masalahSurat.find(m => m.id.toString() === selectedMasalah)?.masalah}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Kode Ketentuan *</Label>
              <Input
                value={kode}
                onChange={(e) => setKode(e.target.value)}
                placeholder="Contoh: kkp, ujian, dll"
                className="h-11 border-2"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Nama Ketentuan *</Label>
              <Input
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Contoh: Kuliah Kerja Profesi"
                className="h-11 border-2"
              />
            </div>

            <Button
              onClick={handleCreateKetentuan}
              disabled={creating || !selectedJenis || !selectedMasalah || !selectedTujuan || !kode || !nama}
              className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              {creating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Membuat Ketentuan...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  Buat Ketentuan Surat
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Info */}
        <Card className="border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              Informasi
            </CardTitle>
            <CardDescription className="text-base">
              Penjelasan tentang ketentuan surat
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2 text-base">Apa itu Ketentuan Surat?</h4>
                  <p className="text-sm text-blue-800/80 dark:text-blue-200/80 leading-relaxed">
                    Ketentuan surat adalah aturan khusus yang menggabungkan jenis surat, tujuan, dan masalah
                    menjadi satu kategori spesifik. Contoh: "KKP" adalah ketentuan untuk surat jenis PT & INSTANSI
                    dengan tujuan tertentu dan masalah Perlengkapan dan Pengajaran.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-base flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary/50 rounded-full"></div>
                Komponen Ketentuan
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-950/20 dark:to-transparent border border-purple-100 dark:border-purple-900/50">
                  <Badge variant="secondary" className="mt-0.5 font-bold">1</Badge>
                  <div className="flex-1">
                    <strong className="text-sm block mb-1">Jenis Surat</strong>
                    <p className="text-sm text-muted-foreground">Kategori utama surat (A, B, C, D)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent border border-blue-100 dark:border-blue-900/50">
                  <Badge variant="secondary" className="mt-0.5 font-bold">2</Badge>
                  <div className="flex-1">
                    <strong className="text-sm block mb-1">Tujuan Surat</strong>
                    <p className="text-sm text-muted-foreground">Penerima atau tujuan pengiriman surat</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-950/20 dark:to-transparent border border-green-100 dark:border-green-900/50">
                  <Badge variant="secondary" className="mt-0.5 font-bold">3</Badge>
                  <div className="flex-1">
                    <strong className="text-sm block mb-1">Masalah Surat</strong>
                    <p className="text-sm text-muted-foreground">Topik atau perihal yang dibahas</p>
                  </div>
                </li>
              </ul>
            </div>

            {selectedJenis && selectedTujuan && selectedMasalah && (
              <div className="p-5 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-teal-950/30 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-md animate-in fade-in slide-in-from-top-3 duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-bold text-green-900 dark:text-green-100 text-base">
                    Preview Kombinasi
                  </h4>
                </div>
                <div className="space-y-2.5 ml-11">
                  <div className="flex items-start gap-2">
                    <Badge className="bg-green-600">Jenis</Badge>
                    <span className="text-sm font-medium">{jenisSurat.find(j => j.id.toString() === selectedJenis)?.nama}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="bg-blue-600">Tujuan</Badge>
                    <span className="text-sm font-medium">{tujuanList.find(t => t.id.toString() === selectedTujuan)?.nama}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge className="bg-purple-600">Masalah</Badge>
                    <span className="text-sm font-medium">{masalahSurat.find(m => m.id.toString() === selectedMasalah)?.nama}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Table of Existing Ketentuan */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Daftar Ketentuan Surat</CardTitle>
          <CardDescription className="text-base">
            Ketentuan surat yang sudah dibuat ({ketentuanList.length} ketentuan)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ketentuanList.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4 flex justify-center">
                <div className="p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
                  <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Belum Ada Ketentuan Surat</h3>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Mulai membuat ketentuan surat dengan mengisi form di sebelah kiri
              </p>
            </div>
          ) : (
            <div className="rounded-lg border-2">
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
