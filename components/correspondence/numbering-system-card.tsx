"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Hash, TrendingUp, Calendar, FileText, Info } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface SuratStatistics {
  lastUsed: string
  lastUsedDate: string | null
  totalThisMonth: number
  totalThisYear: number
  categories: Array<{
    id: number
    nama: string
    kode: string
    total: number
  }>
  counters: Array<{
    id: number
    jenis: string
    counter: number
    tahun: string
  }>
}

export function NumberingSystemCard() {
  const { user } = useAuth()
  const [statistics, setStatistics] = useState<SuratStatistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [prodiId, setProdiId] = useState<string | null>(null)
  const [prodiKode, setProdiKode] = useState<string>('')
  const [showInfoDialog, setShowInfoDialog] = useState(false)

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

  useEffect(() => {
    async function fetchStatistics() {
      if (!prodiId) return

      try {
        const response = await fetch(`/api/surat/statistics?prodiId=${prodiId}`)
        if (response.ok) {
          const result = await response.json()
          setStatistics(result.data)
        }
      } catch (error) {
        console.error('Error fetching surat statistics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStatistics()
  }, [prodiId])

  const formatCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Render detailed info dialog
  const renderInfoDialog = () => (
    <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Panduan Sistem Penomoran Surat
          </DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang format dan kategori penomoran surat
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {/* Info Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Format Penomoran</h4>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-1 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                <Badge className="font-mono text-xs bg-blue-600 hover:bg-blue-700">counter</Badge>
                <span className="text-gray-400 font-bold">/</span>
                <Badge className="font-mono text-xs bg-green-600 hover:bg-green-700">jenis</Badge>
                <span className="text-gray-400 font-bold">/</span>
                <Badge className="font-mono text-xs bg-purple-600 hover:bg-purple-700">prodi</Badge>
                <span className="text-gray-400 font-bold">/</span>
                <Badge className="font-mono text-xs bg-orange-600 hover:bg-orange-700">bulan</Badge>
                <span className="text-gray-400 font-bold">/</span>
                <Badge className="font-mono text-xs bg-pink-600 hover:bg-pink-700">hijri</Badge>
                <span className="text-gray-400 font-bold">/</span>
                <Badge className="font-mono text-xs bg-cyan-600 hover:bg-cyan-700">gregorian</Badge>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-lg shadow-lg">
                <span className="text-xs font-semibold text-white">Contoh:</span>
                <span className="font-mono font-bold text-lg text-white">
                  001/A/{prodiKode}/I/1446/2024
                </span>
              </div>
            </div>
          </div>

          {/* Jenis Surat */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Jenis Surat</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { kode: 'A', nama: 'UNSUR PIMPINAN', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
                { kode: 'B', nama: 'Muhammadiyah', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
                { kode: 'C', nama: 'PT & INSTANSI', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
                { kode: 'D', nama: 'SURAT KELUAR', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' }
              ].map((jenis) => (
                <div key={jenis.kode} className={`p-3 rounded-lg ${jenis.color}`}>
                  <div className="text-2xl font-bold mb-1">{jenis.kode}</div>
                  <div className="text-xs font-medium">{jenis.nama}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tujuan Surat */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Tujuan Surat</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { kategori: 'Internal (A)', items: ['A.1 - Rektor, BPH, Wakil Rektor', 'A.2 - Dekan', 'A.3 - Karyawan', 'A.4 - Dosen', 'A.5 - Mahasiswa', 'A.6 - Dan Lain-lain'] },
                { kategori: 'Muhammadiyah (B)', items: ['B.1 - Pimpinan Pusat', 'B.2 - Pimpinan Wilayah', 'B.3 - Ortom Muhammadiyah', 'B.4 - Dan Lain-lain'] },
                { kategori: 'External (C)', items: ['C.1 - Kopertis Wilayah IX', 'C.2 - Kopertis Wilayah VII', 'C.3 - Perguruan Tinggi', 'C.4 - Instansi Pemerintah', 'C.5 - Instansi Swasta', 'C.6 - Dan Lain-lain'] },
                { kategori: 'Undangan (D)', items: ['D.1 - Undangan', 'D.2 - Atas Nama Perorangan', 'D.3 - Dan Lain-lain'] }
              ].map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h5 className="font-semibold text-gray-700 dark:text-gray-300">{group.kategori}</h5>
                  <ul className="space-y-1">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-blue-600 dark:text-blue-400">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Masalah Surat */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Kategori Masalah Surat</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                { kode: 'I', nama: 'Masalah Pimpinan' },
                { kode: 'II', nama: 'Perlengkapan & Pengajaran' },
                { kode: 'III', nama: 'Perlengkapan' },
                { kode: 'IV', nama: 'Personal' },
                { kode: 'V', nama: 'Publikasi & Dokumentasi' },
                { kode: 'VI', nama: 'Kemahasiswaan' },
                { kode: 'VII', nama: 'Keuangan' },
                { kode: 'VIII', nama: 'Dan Lain-lain' }
              ].map((masalah) => (
                <div key={masalah.kode} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <Badge variant="outline" className="font-mono">{masalah.kode}</Badge>
                  <span className="text-xs text-muted-foreground">{masalah.nama}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  )

  // Show empty state with simple UI if no data
  if (!statistics || (statistics.totalThisYear === 0 && statistics.lastUsed === 'Belum ada')) {
    return (
      <>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                <Hash className="w-5 h-5" />
                Sistem Penomoran Surat
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowInfoDialog(true)}>
                <Info className="w-4 h-4 mr-2" />
                Lihat Panduan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bulan Ini</p>
                  <p className="font-bold text-lg">0</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tahun Ini</p>
                  <p className="font-bold text-lg">0</p>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">
                    📝 Belum ada surat yang diterbitkan
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sistem penomoran akan otomatis bekerja saat surat pertama dibuat
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {renderInfoDialog()}
      </>
    )
  }

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Hash className="w-5 h-5" />
              Sistem Penomoran Surat
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowInfoDialog(true)}>
              <Info className="w-4 h-4 mr-2" />
              Lihat Panduan
            </Button>
          </div>
        </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Nomor Terakhir Digunakan</p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300 font-mono">
              {statistics.lastUsed}
            </p>
            <p className="text-xs text-muted-foreground">
              {statistics.lastUsedDate ? formatDate(statistics.lastUsedDate) : 'Belum ada surat'}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Format Penomoran</p>
            <div className="flex flex-wrap items-center gap-1 p-3 bg-white dark:bg-gray-800 rounded-lg border-2 border-blue-200 dark:border-blue-800">
              <Badge variant="secondary" className="font-mono text-xs">counter</Badge>
              <span className="text-gray-400">/</span>
              <Badge variant="secondary" className="font-mono text-xs">jenis</Badge>
              <span className="text-gray-400">/</span>
              <Badge variant="secondary" className="font-mono text-xs">prodi</Badge>
              <span className="text-gray-400">/</span>
              <Badge variant="secondary" className="font-mono text-xs">bulan</Badge>
              <span className="text-gray-400">/</span>
              <Badge variant="secondary" className="font-mono text-xs">hijri</Badge>
              <span className="text-gray-400">/</span>
              <Badge variant="secondary" className="font-mono text-xs">gregorian</Badge>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Contoh:</span>
              <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                001/A/{prodiKode}/I/1446/2024
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bulan Ini</p>
              <p className="font-bold text-lg">{statistics.totalThisMonth}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tahun Ini</p>
              <p className="font-bold text-lg">{statistics.totalThisYear}</p>
            </div>
          </div>

          {statistics.categories.slice(0, 2).map((category, index) => (
            <div key={category.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
              <div className={`p-2 rounded-full ${
                index === 0 ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
              }`}>
                <Hash className={`w-4 h-4 ${
                  index === 0 ? 'text-purple-600 dark:text-purple-400' : 'text-orange-600 dark:text-orange-400'
                }`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground truncate">{category.nama}</p>
                <p className="font-bold text-lg">{category.total}</p>
              </div>
            </div>
          ))}
        </div>

        {statistics.categories.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Kategori Jenis Surat</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {statistics.categories.map((category) => (
                <div key={category.id}>
                  <p className="font-medium">{category.nama}</p>
                  <p className="text-muted-foreground">Kode: {category.kode}</p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    Total: {category.total} surat
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {statistics.counters.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
            <h4 className="font-semibold text-sm text-muted-foreground mb-3">Counter Penomoran Aktif</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {statistics.counters.map((counter) => (
                <div key={counter.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <span className="font-medium">{counter.jenis}</span>
                  <Badge variant="secondary">{String(counter.counter).padStart(3, '0')}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    {renderInfoDialog()}
    </>
  )
}
