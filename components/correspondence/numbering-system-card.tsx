"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Hash, TrendingUp, Calendar, FileText, Info } from "lucide-react"
import { useAuth } from "@/context/auth-context"

interface LetterTypeStat {
  id: string
  title: string
  nomor_surat: string
  jenis_kode: string // A, B, C, D
  jenis_nama: string // UNSUR PIMPINAN, dll
  scope: 'fakultas' | 'prodi'
  created_at: string
}

interface SuratStatistics {
  lastUsed: string
  lastUsedDate: string | null
  totalThisMonth: number
  totalThisYear: number
  letterTypes: LetterTypeStat[]
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
          <div className="space-y-3 animate-pulse">
            <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
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

          {/* Jenis Surat */}
          <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Jenis Surat</h4>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { kode: 'A', nama: 'UNSUR PIMPINAN', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
                { kode: 'B', nama: 'Muhammadiyah', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
                { kode: 'C', nama: 'PT & INSTANSI', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
                { kode: 'D', nama: 'SURAT KELUAR', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' }
              ].map((jenis) => (
                <div key={jenis.kode} className={`p-3 rounded-lg ${jenis.color}`}>
                  <div className="mb-1 text-2xl font-bold">{jenis.kode}</div>
                  <div className="text-xs font-medium">{jenis.nama}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tujuan Surat */}
          <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Tujuan Surat</h4>
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
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
          <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Kategori Masalah Surat</h4>
            <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
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
                <div key={masalah.kode} className="flex items-center gap-2 p-2 rounded bg-gray-50 dark:bg-gray-900">
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
  if (!statistics || (statistics.totalThisYear === 0 && statistics.lastUsed === 'Belum ada' && (!statistics.letterTypes || statistics.letterTypes.length === 0))) {
    return (
      <>
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base text-blue-800 dark:text-blue-200">
                <Hash className="w-4 h-4" />
                Sistem Penomoran Surat
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowInfoDialog(true)} className="h-8">
                <Info className="w-3.5 h-3.5 mr-1.5" />
                Panduan
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              <div className="flex items-center gap-2 p-2 bg-white border rounded-lg dark:bg-gray-800">
                <div className="p-1.5 bg-blue-100 rounded dark:bg-blue-900/30">
                  <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bulan Ini</p>
                  <p className="text-base font-bold">0</p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 bg-white border rounded-lg dark:bg-gray-800">
                <div className="p-1.5 bg-green-100 rounded dark:bg-green-900/30">
                  <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tahun Ini</p>
                  <p className="text-base font-bold">0</p>
                </div>
              </div>

              <div className="flex items-center justify-center col-span-2 p-2 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
                <div className="text-center">
                  <p className="mb-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                    📝 Belum ada surat yang diterbitkan
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sistem penomoran akan otomatis bekerja
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
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base text-blue-800 dark:text-blue-200">
              <Hash className="w-4 h-4" />
              Sistem Penomoran Surat
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowInfoDialog(true)} className="h-8">
              <Info className="w-3.5 h-3.5 mr-1.5" />
              Panduan
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="flex items-center gap-2 p-2 bg-white border rounded-lg dark:bg-gray-800">
              <div className="p-1.5 bg-blue-100 rounded dark:bg-blue-900/30">
                <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Bulan Ini</p>
                <p className="text-base font-bold">{statistics.totalThisMonth}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white border rounded-lg dark:bg-gray-800">
              <div className="p-1.5 bg-green-100 rounded dark:bg-green-900/30">
                <TrendingUp className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tahun Ini</p>
                <p className="text-base font-bold">{statistics.totalThisYear}</p>
              </div>
            </div>
            <div className="flex items-center col-span-2 gap-2 p-2 bg-white border rounded-lg dark:bg-gray-800">
              <div className="p-1.5 bg-purple-100 rounded dark:bg-purple-900/30">
                <Hash className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Terakhir Digunakan</p>
                <p className="font-mono text-sm font-bold text-blue-600 truncate dark:text-blue-400">
                  {statistics.lastUsed}
                </p>
              </div>
            </div>
          </div>

          {/* Letter Types Grid - Compact */}
          {statistics.letterTypes && statistics.letterTypes.length > 0 && (
            <div className="p-3 bg-white border rounded-lg dark:bg-gray-800">
              <h4 className="mb-2 text-xs font-semibold text-muted-foreground">Nomor Terakhir Per Jenis</h4>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
                {statistics.letterTypes.map((letterType) => (
                  <div key={letterType.id} className="p-2 transition-colors border rounded bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <div className="flex items-center justify-between mb-1">
                      <Badge
                        variant="outline"
                        className={`h-5 text-xs font-bold ${letterType.jenis_kode === 'A' ? 'border-blue-500 text-blue-700 dark:text-blue-400' :
                          letterType.jenis_kode === 'B' ? 'border-green-500 text-green-700 dark:text-green-400' :
                            letterType.jenis_kode === 'C' ? 'border-purple-500 text-purple-700 dark:text-purple-400' :
                              'border-orange-500 text-orange-700 dark:text-orange-400'
                          }`}
                      >
                        {letterType.jenis_kode}
                      </Badge>
                      <span className="text-xs">
                        {letterType.scope === 'fakultas' ? '🏛️' : '📚'}
                      </span>
                    </div>
                    <p className="mb-1 text-xs font-medium text-gray-900 truncate dark:text-gray-100" title={letterType.title}>
                      {letterType.title}
                    </p>
                    <p className="font-mono text-xs font-bold text-blue-600 truncate dark:text-blue-400" title={letterType.nomor_surat}>
                      {letterType.nomor_surat}
                    </p>
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
