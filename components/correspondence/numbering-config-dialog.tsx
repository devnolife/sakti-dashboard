"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Settings, List } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface NumberingConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

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

export function NumberingConfigDialog({ open, onOpenChange }: NumberingConfigDialogProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [prodiId, setProdiId] = useState<string | null>(null)
  const [prodiKode, setProdiKode] = useState<string>('')

  // Database data
  const [jenisSurat, setJenisSurat] = useState<JenisSurat[]>([])
  const [masalahSurat, setMasalahSurat] = useState<MasalahSurat[]>([])
  const [tujuanList, setTujuanList] = useState<Tujuan[]>([])

  // Form state
  const [selectedJenis, setSelectedJenis] = useState<string>('')
  const [selectedMasalah, setSelectedMasalah] = useState<string>('')
  const [selectedTujuan, setSelectedTujuan] = useState<string>('')
  const [perihal, setPerihal] = useState('')
  const [previewNumber, setPreviewNumber] = useState<string | null>(null)

  // Fetch staff prodi
  useEffect(() => {
    async function fetchStaffProdi() {
      if (!user?.id) return

      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('session-token') : null
        const response = await fetch('/api/staff/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId: user.id })
        })

        if (response.ok) {
          const staff = await response.json()
          if (staff?.prodi_id && staff?.prodi) {
            setProdiId(staff.prodi_id)
            setProdiKode(staff.prodi.kode_prodi || '')
          }
        }
      } catch (error) {
        console.error('Error fetching staff profile:', error)
      }
    }

    fetchStaffProdi()
  }, [user?.id])

  // Fetch master data from database
  useEffect(() => {
    async function fetchMasterData() {
      if (!open) return

      try {
        setLoading(true)

        // Fetch jenis_surat
        const jenisResponse = await fetch('/api/master-data/jenis-surat')
        if (jenisResponse.ok) {
          const data = await jenisResponse.json()
          setJenisSurat(data)
        }

        // Fetch masalah_surat
        const masalahResponse = await fetch('/api/master-data/masalah-surat')
        if (masalahResponse.ok) {
          const data = await masalahResponse.json()
          setMasalahSurat(data)
        }

        // Fetch tujuan
        const tujuanResponse = await fetch('/api/master-data/tujuan')
        if (tujuanResponse.ok) {
          const data = await tujuanResponse.json()
          setTujuanList(data)
        }
      } catch (error) {
        console.error('Error fetching master data:', error)
        toast({
          title: "Error",
          description: "Gagal memuat data master",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMasterData()
  }, [open, toast])

  // Filter tujuan based on selected jenis
  const filteredTujuan = selectedJenis
    ? tujuanList.filter(t => t.id_jenis.toString() === selectedJenis)
    : tujuanList

  // Generate preview when jenis selected
  useEffect(() => {
    async function fetchPreview() {
      if (!selectedJenis || !prodiKode) {
        setPreviewNumber(null)
        return
      }

      try {
        const jenisData = jenisSurat.find(j => j.id.toString() === selectedJenis)
        if (!jenisData) return

        const response = await fetch(`/api/letter-number?jenisSurat=${jenisData.kode}&prodiKode=${prodiKode}&prodiId=${prodiId}`)
        if (response.ok) {
          const data = await response.json()
          setPreviewNumber(data.nomorSurat)
        }
      } catch (error) {
        console.error('Error generating preview:', error)
      }
    }

    fetchPreview()
  }, [selectedJenis, prodiKode, prodiId, jenisSurat])

  // Handle generate letter number
  const handleGenerateLetter = async () => {
    if (!selectedJenis || !prodiId) {
      toast({
        title: "Error",
        description: "Pilih jenis surat terlebih dahulu",
        variant: "destructive"
      })
      return
    }

    try {
      const jenisData = jenisSurat.find(j => j.id.toString() === selectedJenis)
      if (!jenisData) return

      const response = await fetch('/api/letter-number/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jenisSurat: jenisData.kode,
          prodiKode: prodiKode,
          prodiId: prodiId,
          perihal: perihal || 'Surat',
          idJenisSurat: jenisData.id,
          idMasalahSurat: selectedMasalah ? parseInt(selectedMasalah) : null,
          idTujuan: selectedTujuan ? parseInt(selectedTujuan) : null
        })
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Berhasil",
          description: `Nomor surat berhasil dibuat: ${data.surat.nomor_surat}`,
        })
        // Reset form
        setSelectedJenis('')
        setSelectedMasalah('')
        setSelectedTujuan('')
        setPerihal('')
        setPreviewNumber(null)
        onOpenChange(false)
      } else {
        throw new Error('Failed to generate letter number')
      }
    } catch (error) {
      console.error('Error generating letter:', error)
      toast({
        title: "Error",
        description: "Gagal membuat nomor surat",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle>Memuat data...</DialogTitle>
          </VisuallyHidden>
          <div className="flex items-center justify-center p-6">
            <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary"></div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Konfigurasi Sistem Penomoran
          </DialogTitle>
          <DialogDescription>
            Kelola penomoran surat otomatis berdasarkan kategori dari database
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="generate" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="generate">
              <Plus className="w-4 h-4 mr-2" />
              Buat Nomor Baru
            </TabsTrigger>
            <TabsTrigger value="master-data">
              <List className="w-4 h-4 mr-2" />
              Data Master
            </TabsTrigger>
            <TabsTrigger value="info">
              <Eye className="w-4 h-4 mr-2" />
              Info Format
            </TabsTrigger>
          </TabsList>

          {/* Tab Generate Nomor */}
          <TabsContent value="generate" className="mt-4 space-y-4">
          <div className="grid gap-4">
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
              <Label>Masalah Surat</Label>
              <Select value={selectedMasalah} onValueChange={setSelectedMasalah}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih masalah surat (opsional)" />
                </SelectTrigger>
                <SelectContent>
                  {masalahSurat.map((masalah) => (
                    <SelectItem key={masalah.id} value={masalah.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{masalah.kode}</Badge>
                        <span>{masalah.nama}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tujuan Surat</Label>
              <Select value={selectedTujuan} onValueChange={setSelectedTujuan} disabled={!selectedJenis}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tujuan surat (opsional)" />
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
                <p className="mt-1 text-xs text-muted-foreground">
                  Pilih jenis surat terlebih dahulu
                </p>
              )}
            </div>

            <div>
              <Label>Perihal</Label>
              <Input
                value={perihal}
                onChange={(e) => setPerihal(e.target.value)}
                placeholder="Perihal surat (opsional)"
              />
            </div>
          </div>

            {previewNumber && (
              <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Preview Nomor Surat:</span>
                  </div>
                  <p className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {previewNumber}
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button onClick={handleGenerateLetter} disabled={!selectedJenis}>
                <Plus className="w-4 h-4 mr-2" />
                Generate Nomor Surat
              </Button>
            </div>
          </TabsContent>

          {/* Tab Data Master */}
          <TabsContent value="master-data" className="mt-4 space-y-4">
            <div className="grid gap-4">
              {/* Jenis Surat */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Jenis Surat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {jenisSurat.map((jenis) => (
                      <div key={jenis.id} className="flex items-center gap-2 p-3 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                        <Badge className="text-lg font-bold">{jenis.kode}</Badge>
                        <span className="text-sm font-medium">{jenis.nama}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Masalah Surat */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Masalah Surat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {masalahSurat.map((masalah) => (
                      <div key={masalah.id} className="flex items-center gap-2 p-2 rounded bg-gray-50 dark:bg-gray-900">
                        <Badge variant="outline" className="font-mono">{masalah.kode}</Badge>
                        <span className="text-xs text-muted-foreground">{masalah.nama}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tujuan Surat */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tujuan Surat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                    {[1, 2, 3, 4].map((jenisId) => {
                      const jenisName = jenisSurat.find(j => j.id === jenisId)?.nama || `Jenis ${jenisId}`
                      const tujuanByJenis = tujuanList.filter(t => t.id_jenis === jenisId)

                      if (tujuanByJenis.length === 0) return null

                      return (
                        <div key={jenisId} className="space-y-2">
                          <h5 className="font-semibold text-gray-700 dark:text-gray-300">{jenisName}</h5>
                          <ul className="space-y-1">
                            {tujuanByJenis.map((tujuan) => (
                              <li key={tujuan.id} className="flex items-start gap-2 text-muted-foreground">
                                <Badge variant="outline" className="text-xs">{tujuan.kode}</Badge>
                                <span>{tujuan.nama}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Info Format */}
          <TabsContent value="info" className="mt-4 space-y-4">
            <Card>
      
              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-1 p-3 border-2 border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800">
                  <Badge className="font-mono text-xs bg-blue-600 hover:bg-blue-700">counter</Badge>
                  <span className="font-bold text-gray-400">/</span>
                  <Badge className="font-mono text-xs bg-green-600 hover:bg-green-700">jenis</Badge>
                  <span className="font-bold text-gray-400">/</span>
                  <Badge className="font-mono text-xs bg-purple-600 hover:bg-purple-700">prodi</Badge>
                  <span className="font-bold text-gray-400">/</span>
                  <Badge className="font-mono text-xs bg-orange-600 hover:bg-orange-700">bulan</Badge>
                  <span className="font-bold text-gray-400">/</span>
                  <Badge className="font-mono text-xs bg-pink-600 hover:bg-pink-700">hijri</Badge>
                  <span className="font-bold text-gray-400">/</span>
                  <Badge className="font-mono text-xs bg-cyan-600 hover:bg-cyan-700">gregorian</Badge>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700">
                  <span className="text-xs font-semibold text-white">Contoh:</span>
                  <span className="font-mono text-lg font-bold text-white">
                    001/A/{prodiKode}/I/1446/2024
                  </span>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold">Keterangan:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• <strong>Counter:</strong> Nomor urut otomatis (reset setiap tahun)</li>
                    <li>• <strong>Jenis:</strong> Kode jenis surat (A, B, C, D)</li>
                    <li>• <strong>Prodi:</strong> Kode program studi</li>
                    <li>• <strong>Bulan:</strong> Bulan dalam angka Romawi (I-XII)</li>
                    <li>• <strong>Hijri:</strong> Tahun Hijriyah</li>
                    <li>• <strong>Gregorian:</strong> Tahun Masehi</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>💡 Info:</strong> Semua data master diambil langsung dari database. Counter akan otomatis bertambah setiap kali nomor surat dibuat.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
