"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Target, AlertCircle, BookOpen } from "lucide-react"

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
        <h2 className="text-3xl font-bold tracking-tight">Data Master Surat</h2>
        <p className="text-muted-foreground">
          Referensi kategori dan klasifikasi surat
        </p>
      </div>

      <Tabs defaultValue="jenis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jenis" className="gap-2">
            <FileText className="w-4 h-4" />
            Jenis Surat
          </TabsTrigger>
          <TabsTrigger value="masalah" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            Masalah Surat
          </TabsTrigger>
          <TabsTrigger value="tujuan" className="gap-2">
            <Target className="w-4 h-4" />
            Tujuan Surat
          </TabsTrigger>
          <TabsTrigger value="ketentuan" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Ketentuan Surat
          </TabsTrigger>
        </TabsList>

        {/* Jenis Surat Tab */}
        <TabsContent value="jenis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jenis Surat</CardTitle>
              <CardDescription>
                Kategori utama surat berdasarkan penerima dan tujuan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {jenisSurat.map((jenis) => (
                  <Card key={jenis.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <div className="text-center space-y-2">
                        <div className="inline-block p-4 bg-blue-600 rounded-full">
                          <span className="text-3xl font-bold text-white">{jenis.kode}</span>
                        </div>
                        <h3 className="font-semibold text-lg">{jenis.nama}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Masalah Surat Tab */}
        <TabsContent value="masalah" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Masalah Surat</CardTitle>
              <CardDescription>
                Klasifikasi surat berdasarkan topik atau masalah yang dibahas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {masalahSurat.map((masalah) => (
                  <Card
                    key={masalah.id}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border hover:border-primary/50 transition-colors"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="font-mono text-lg px-3 py-1">
                          {masalah.kode}
                        </Badge>
                        <CardTitle className="text-base">{masalah.nama}</CardTitle>
                      </div>
                    </CardHeader>
                    {masalah.masalah && (
                      <CardContent className="pt-0">
                        <div className="p-3 bg-white dark:bg-gray-950 rounded border text-sm text-muted-foreground">
                          <p className="font-medium text-foreground mb-1">Isi Masalah:</p>
                          <p>{masalah.masalah}</p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tujuan Surat Tab */}
        <TabsContent value="tujuan" className="space-y-4">
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((jenisId) => {
              const jenisName = jenisSurat.find(j => j.id === jenisId)?.nama || `Jenis ${jenisId}`
              const jenisKode = jenisSurat.find(j => j.id === jenisId)?.kode || ''
              const tujuanByJenis = tujuanList.filter(t => t.id_jenis === jenisId)

              if (tujuanByJenis.length === 0) return null

              return (
                <Card key={jenisId}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="text-lg px-3 py-1">{jenisKode}</Badge>
                      <span>{jenisName}</span>
                    </CardTitle>
                    <CardDescription>
                      Tujuan surat untuk kategori {jenisName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {tujuanByJenis.map((tujuan) => (
                        <div
                          key={tujuan.id}
                          className="flex items-start gap-2 p-3 bg-white dark:bg-gray-950 rounded-lg border"
                        >
                          <Badge variant="secondary" className="font-mono shrink-0">
                            {tujuan.kode}
                          </Badge>
                          <p className="text-sm leading-tight">{tujuan.nama}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Ketentuan Surat Tab */}
        <TabsContent value="ketentuan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ketentuan Surat Khusus</CardTitle>
              <CardDescription>
                Aturan dan ketentuan khusus untuk kombinasi tujuan dan masalah surat tertentu
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ketentuanList.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Belum ada ketentuan surat yang didefinisikan</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ketentuanList.map((ketentuan) => (
                    <Card
                      key={ketentuan.id}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="font-mono">{ketentuan.kode}</Badge>
                          <CardTitle className="text-base">{ketentuan.nama}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid gap-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground w-20 shrink-0">Jenis:</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">
                                {ketentuan.jenis?.kode}
                              </Badge>
                              <span>{ketentuan.jenis?.nama}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground w-20 shrink-0">Tujuan:</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {ketentuan.tujuan?.kode}
                              </Badge>
                              <span>{ketentuan.tujuan?.nama}</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <span className="font-medium text-muted-foreground w-20 shrink-0">Masalah:</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">
                                {ketentuan.masalah?.kode}
                              </Badge>
                              <span>{ketentuan.masalah?.nama}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
