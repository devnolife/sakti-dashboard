"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Target, AlertCircle, BookOpen, Sparkles, Layers, ArrowRight, ShieldCheck } from "lucide-react"

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
    <div className="flex-1 min-h-screen p-4 space-y-6 bg-background/50 backdrop-blur-sm md:p-6">
      {/* Compact Hero Section */}
      <div className="relative p-6 overflow-hidden text-white shadow-xl rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute top-0 right-0 w-48 h-48 -mt-10 -mr-10 rounded-full bg-white/10 blur-3xl"></div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-100">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Master Data System</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Master Data Surat dan Dokumen
            </h2>
            <p className="max-w-xl text-sm text-blue-100/90">
              Pusat kendali referensi kategori, klasifikasi, dan aturan surat serta dokumen.
            </p>
          </div>
          <div className="hidden p-3 rounded-xl bg-white/10 backdrop-blur-md md:block">
            <Layers className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Jenis Surat Section - Compact Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="flex items-center justify-center w-8 h-8 text-blue-600 bg-blue-100 rounded-lg dark:bg-blue-900/30 dark:text-blue-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">Jenis Surat</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {jenisSurat.map((jenis, index) => (
            <Card key={jenis.id} className="relative overflow-hidden transition-all duration-300 border-0 shadow-sm group bg-gradient-to-br from-white to-slate-50 hover:-translate-y-1 hover:shadow-md dark:from-slate-900 dark:to-slate-950">
              <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${index % 4 === 0 ? 'from-blue-500/10 to-cyan-500/10' :
                index % 4 === 1 ? 'from-purple-500/10 to-pink-500/10' :
                  index % 4 === 2 ? 'from-orange-500/10 to-yellow-500/10' :
                    'from-green-500/10 to-emerald-500/10'
                }`} />

              <CardContent className="relative p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${index % 4 === 0 ? 'bg-blue-500 shadow-blue-500/30' :
                    index % 4 === 1 ? 'bg-purple-500 shadow-purple-500/30' :
                      index % 4 === 2 ? 'bg-orange-500 shadow-orange-500/30' :
                        'bg-green-500 shadow-green-500/30'
                    }`}>
                    {jenis.kode}
                  </div>
                  <ArrowRight className="w-4 h-4 transition-all duration-300 opacity-0 text-muted-foreground group-hover:translate-x-1 group-hover:opacity-100" />
                </div>

                <h3 className="text-sm font-bold line-clamp-1 text-foreground" title={jenis.nama}>{jenis.nama}</h3>
                <p className="text-[10px] font-medium text-muted-foreground">Kode: {jenis.kode}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Masalah Surat Section - Compact */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="flex items-center justify-center w-8 h-8 text-orange-600 bg-orange-100 rounded-lg dark:bg-orange-900/30 dark:text-orange-400">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">Masalah Surat</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {masalahSurat.map((masalah) => (
            <Card
              key={masalah.id}
              className="overflow-hidden transition-all duration-300 border-0 shadow-sm group hover:shadow-md dark:bg-slate-950"
            >
              <div className="flex flex-row items-center h-full">
                <div className="flex flex-col items-center justify-center w-16 h-full p-2 text-center shrink-0 bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-orange-600 bg-orange-100 rounded-full dark:bg-orange-900/50 dark:text-orange-400">
                    {masalah.kode}
                  </div>
                </div>

                <div className="flex flex-col justify-center flex-1 p-3">
                  <h3 className="text-sm font-bold transition-colors text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400">
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

      {/* Tujuan Surat Section - Compact */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="flex items-center justify-center w-8 h-8 text-green-600 bg-green-100 rounded-lg dark:bg-green-900/30 dark:text-green-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">Tujuan Surat</h3>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((jenisId) => {
            const jenisName = jenisSurat.find(j => j.id === jenisId)?.nama || `Jenis ${jenisId}`
            const jenisKode = jenisSurat.find(j => j.id === jenisId)?.kode || ''
            const tujuanByJenis = tujuanList.filter(t => t.id_jenis === jenisId)

            if (tujuanByJenis.length === 0) return null

            return (
              <div key={jenisId} className="p-1 border shadow-sm rounded-xl bg-card">
                <div className="flex items-center gap-3 p-3 pb-2 border-b">
                  <div className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-lg bg-primary/10 text-primary">
                    {jenisKode}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold">{jenisName}</h4>
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                        {tujuanByJenis.length}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 p-3 overflow-y-auto max-h-48 sm:grid-cols-2">
                  {tujuanByJenis.map((tujuan) => (
                    <div
                      key={tujuan.id}
                      className="flex items-center gap-2 p-2 transition-all border rounded-lg bg-background hover:border-primary/50"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted font-mono text-[10px] font-bold">
                        {tujuan.kode}
                      </div>
                      <span className="text-xs font-medium line-clamp-1">{tujuan.nama}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ketentuan Dokumen Section - Compact */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="flex items-center justify-center w-8 h-8 text-purple-600 bg-purple-100 rounded-lg dark:bg-purple-900/30 dark:text-purple-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight">Ketentuan Dokumen</h3>
          </div>
        </div>

        {ketentuanList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-xl">
            <div className="p-2 mb-2 rounded-full bg-muted">
              <BookOpen className="w-5 h-5 text-muted-foreground/50" />
            </div>
            <h3 className="text-sm font-semibold">Belum Ada Ketentuan</h3>
          </div>
        ) : (
          <div className="overflow-hidden border rounded-xl bg-card">
            <div className="divide-y">
              {ketentuanList.map((ketentuan) => (
                <div
                  key={ketentuan.id}
                  className="flex flex-col gap-3 p-3 transition-colors sm:flex-row sm:items-center hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between flex-1 gap-4 sm:justify-start">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 font-mono text-xs font-bold text-purple-700 bg-purple-100 rounded-lg shrink-0 dark:bg-purple-900/30 dark:text-purple-300">
                        {ketentuan.kode}
                      </div>
                      <span className="text-sm font-bold">{ketentuan.nama}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Badge variant="outline" className="gap-1 font-normal bg-blue-50/50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-300 dark:border-blue-800">
                      <FileText className="w-3 h-3" />
                      {ketentuan.jenis?.nama}
                    </Badge>
                    <Badge variant="outline" className="gap-1 font-normal bg-green-50/50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-800">
                      <Target className="w-3 h-3" />
                      {ketentuan.tujuan?.nama}
                    </Badge>
                    <Badge variant="outline" className="gap-1 font-normal bg-orange-50/50 text-orange-700 border-orange-200 dark:bg-orange-950/20 dark:text-orange-300 dark:border-orange-800">
                      <AlertCircle className="w-3 h-3" />
                      {ketentuan.masalah?.nama}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
