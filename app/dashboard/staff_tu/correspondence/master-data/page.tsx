"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Target, AlertCircle, BookOpen, Layers, ArrowRight } from "lucide-react"

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

export default function MasterDataPage() {
  const [loading, setLoading] = useState(true)
  const [jenisSurat, setJenisSurat] = useState<JenisSurat[]>([])
  const [masalahSurat, setMasalahSurat] = useState<MasalahSurat[]>([])
  const [tujuanList, setTujuanList] = useState<Tujuan[]>([])
  const [ketentuanList, setKetentuanList] = useState<KetentuanSurat[]>([])

  useEffect(() => {
    async function fetchMasterData() {
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
        console.error('Error fetching master data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMasterData()
  }, [])

  if (loading) {
    return (
      <div className="flex-1 p-8 space-y-8">
        <div className="space-y-4 animate-pulse">
          <div className="w-1/3 h-12 rounded-lg bg-muted"></div>
          <div className="h-64 bg-muted rounded-xl"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-screen p-4 space-y-8 md:p-6">
      {/* Modern Hero Section */}
      <div className="relative p-6 overflow-hidden border rounded-2xl bg-card">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-1 h-4 rounded-full bg-primary"></div>
              <span className="text-xs font-medium uppercase tracking-wider">Master Data</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Surat dan Dokumen
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              Pusat kendali referensi kategori, klasifikasi, dan aturan surat serta dokumen.
            </p>
          </div>
          <div className="hidden p-3 border rounded-xl bg-muted/30 md:block">
            <Layers className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Jenis Surat Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 border rounded-lg bg-muted/50">
            <FileText className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">Jenis Surat</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {jenisSurat.map((jenis) => (
            <Card key={jenis.id} className="transition-all duration-200 group hover:shadow-md hover:border-primary/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-primary/5 text-base font-bold text-primary transition-colors group-hover:bg-primary/10">
                    {jenis.kode}
                  </div>
                  <ArrowRight className="w-4 h-4 transition-all duration-200 opacity-0 text-muted-foreground group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <h3 className="text-sm font-semibold line-clamp-1 mb-1" title={jenis.nama}>{jenis.nama}</h3>
                <p className="text-[10px] text-muted-foreground">Kode: {jenis.kode}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Masalah Surat Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 border rounded-lg bg-muted/50">
            <AlertCircle className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">Masalah Surat</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {masalahSurat.map((masalah) => (
            <Card key={masalah.id} className="transition-all duration-200 group hover:shadow-md hover:border-primary/50">
              <div className="flex flex-row items-center h-full">
                <div className="flex flex-col items-center justify-center w-14 h-full p-2 border-r bg-muted/30">
                  <div className="flex items-center justify-center w-8 h-8 text-xs font-bold border rounded-full bg-background">
                    {masalah.kode}
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1 p-3">
                  <h3 className="text-sm font-semibold">
                    {masalah.nama}
                  </h3>
                  {masalah.masalah && (
                    <p className="mt-1 text-xs line-clamp-1 text-muted-foreground" title={masalah.masalah}>
                      {masalah.masalah}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tujuan Surat Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 border rounded-lg bg-muted/50">
            <Target className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">Tujuan Surat</h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((jenisId) => {
            const jenisName = jenisSurat.find(j => j.id === jenisId)?.nama || `Jenis ${jenisId}`
            const jenisKode = jenisSurat.find(j => j.id === jenisId)?.kode || ''
            const tujuanByJenis = tujuanList.filter(t => t.id_jenis === jenisId)

            if (tujuanByJenis.length === 0) return null

            return (
              <Card key={jenisId} className="overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b bg-muted/30">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded-lg bg-background">
                    {jenisKode}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold">{jenisName}</h4>
                      <Badge variant="secondary" className="h-5 px-2 text-[10px]">
                        {tujuanByJenis.length}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 p-4 overflow-y-auto max-h-48 sm:grid-cols-2">
                  {tujuanByJenis.map((tujuan) => (
                    <div
                      key={tujuan.id}
                      className="flex items-center gap-2 p-2 transition-all border rounded-lg hover:border-primary/50 hover:bg-muted/50"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border bg-muted/50 font-mono text-[10px] font-semibold">
                        {tujuan.kode}
                      </div>
                      <span className="text-xs font-medium line-clamp-1">{tujuan.nama}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Ketentuan Dokumen Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 border rounded-lg bg-muted/50">
            <BookOpen className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight">Ketentuan Dokumen</h3>
        </div>

        {ketentuanList.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-3 mb-3 border rounded-full bg-muted/50">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Belum Ada Ketentuan</h3>
              <p className="text-xs text-muted-foreground">Ketentuan dokumen akan ditampilkan di sini</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {ketentuanList.map((ketentuan) => (
                  <div
                    key={ketentuan.id}
                    className="flex flex-col gap-3 p-4 transition-colors sm:flex-row sm:items-center hover:bg-muted/30"
                  >
                    <div className="flex items-center justify-between flex-1 gap-4 sm:justify-start">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-9 h-9 font-mono text-xs font-semibold border rounded-lg shrink-0 bg-muted/50">
                          {ketentuan.kode}
                        </div>
                        <span className="text-sm font-semibold">{ketentuan.nama}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      <Badge variant="outline" className="gap-1.5 font-normal">
                        <FileText className="w-3 h-3" />
                        <span className="text-[10px]">{ketentuan.jenis?.nama}</span>
                      </Badge>
                      <Badge variant="outline" className="gap-1.5 font-normal">
                        <Target className="w-3 h-3" />
                        <span className="text-[10px]">{ketentuan.tujuan?.nama}</span>
                      </Badge>
                      <Badge variant="outline" className="gap-1.5 font-normal">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-[10px]">{ketentuan.masalah?.nama}</span>
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
