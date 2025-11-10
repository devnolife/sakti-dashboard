"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, RefreshCw, FileText, Info, TrendingUp, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getNextLetterNumbers, type NextNumberPreview } from "@/app/actions/surat/next-numbers"
import { Skeleton } from "@/components/ui/skeleton"

interface NextNumbersCardProps {
  prodiId: string
}

export function NextNumbersCard({ prodiId }: NextNumbersCardProps) {
  const [previews, setPreviews] = useState<NextNumberPreview[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [statistics, setStatistics] = useState<any>(null)

  const fetchPreviews = async () => {
    try {
      setRefreshing(true)
      const data = await getNextLetterNumbers(prodiId)
      setPreviews(data)
    } catch (error) {
      console.error("Error fetching next numbers:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const fetchStatistics = async () => {
    try {
      const response = await fetch(`/api/surat/statistics?prodiId=${prodiId}`)
      if (response.ok) {
        const result = await response.json()
        setStatistics(result.data)
      }
    } catch (error) {
      console.error("Error fetching statistics:", error)
    }
  }

  useEffect(() => {
    if (prodiId) {
      fetchPreviews()
      fetchStatistics()
    }
  }, [prodiId])

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

  // Render info dialog
  const renderInfoDialog = () => (
    <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Panduan Penomoran Surat Otomatis
          </DialogTitle>
          <DialogDescription>
            Sistem penomoran akan otomatis menggunakan nomor berikutnya saat membuat surat baru
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">

          {/* Jenis Surat */}
          <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Jenis Surat Tersedia</h4>
            <div className="grid grid-cols-2 gap-3">
              {previews.map((preview, idx) => (
                <div key={idx} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-900">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono">{preview.kodeSurat}</Badge>
                    <span className="text-sm font-medium">{preview.jenisSurat}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nomor berikutnya: <span className="font-mono font-bold">{preview.previewNomor}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cara Kerja */}
          <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
            <h4 className="mb-3 text-sm font-semibold text-muted-foreground">Cara Kerja Sistem</h4>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Badge className="bg-blue-600">1</Badge>
                <div>
                  <p className="font-medium">Pilih Jenis Surat</p>
                  <p className="text-muted-foreground">Saat membuat surat baru, pilih jenis surat (KKP, AKD, UMM, dll)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-green-600">2</Badge>
                <div>
                  <p className="font-medium">Sistem Generate Nomor</p>
                  <p className="text-muted-foreground">Sistem otomatis mengambil nomor berikutnya dari counter</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-orange-600">3</Badge>
                <div>
                  <p className="font-medium">Counter Bertambah</p>
                  <p className="text-muted-foreground">Setelah surat dibuat, counter otomatis +1 untuk jenis surat tersebut</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Badge className="bg-purple-600">4</Badge>
                <div>
                  <p className="font-medium">Reset Tahunan</p>
                  <p className="text-muted-foreground">Counter reset ke 001 setiap awal tahun baru</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Aturan Penting */}
          <div className="p-4 border-2 border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-800">
            <h4 className="mb-3 text-sm font-semibold text-yellow-800 dark:text-yellow-200">⚠️ Aturan Penting</h4>
            <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Nomor surat tidak bisa diubah setelah surat dibuat</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Setiap prodi memiliki counter sendiri yang independen</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Format bulan menggunakan angka Romawi (I-XII)</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Tahun Hijri dan Masehi diambil otomatis dari sistem</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="w-48 h-6" />
          <Skeleton className="w-64 h-4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="w-full h-16" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-green-800 dark:text-green-200">Preview Nomor Surat Berikutnya</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowInfoDialog(true)}
              >
                <Info className="w-4 h-4 mr-2" />
                Panduan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={fetchPreviews}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          <CardDescription>
            Nomor surat yang akan otomatis digunakan saat membuat surat baru
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Statistics Row */}
          {statistics && (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg dark:bg-gray-800">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Surat Bulan Ini</p>
                  <p className="text-lg font-bold">{statistics.totalThisMonth || 0}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white border rounded-lg dark:bg-gray-800">
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/30">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Surat Tahun Ini</p>
                  <p className="text-lg font-bold">{statistics.totalThisYear || 0}</p>
                </div>
              </div>
            </div>
          )}

          {/* Last Used Number */}
          {statistics?.lastUsed && statistics.lastUsed !== 'Belum ada' && (
            <div className="p-4 bg-white border rounded-lg dark:bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">Nomor Terakhir Digunakan</p>
                {statistics.lastUsedDate && (
                  <p className="text-xs text-muted-foreground">{formatDate(statistics.lastUsedDate)}</p>
                )}
              </div>
              <p className="font-mono text-xl font-bold text-blue-700 dark:text-blue-300">
                {statistics.lastUsed}
              </p>
            </div>
          )}

          {/* Next Numbers Preview */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Nomor Surat Berikutnya</p>
            {previews.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p>Belum ada jenis surat tersedia</p>
              </div>
            ) : (
              <div className="space-y-2">
                {previews.map((preview, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 transition-colors bg-white border rounded-lg dark:bg-gray-800 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                        <span className="text-sm font-bold text-green-700 dark:text-green-300">
                          {preview.kodeSurat}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{preview.jenisSurat}</p>
                        <p className="text-xs text-muted-foreground">
                          Counter: {String(preview.nextNumber).padStart(3, '0')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <Badge variant="secondary" className="px-3 py-1 font-mono text-xs">
                        {preview.previewNomor}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Format Info */}
          <div className="p-3 border border-green-200 rounded-lg bg-green-50 dark:bg-green-950/30 dark:border-green-800">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="text-xs text-green-700 dark:text-green-300">
                <p className="mb-1 font-medium">Sistem Otomatis</p>
                <p>Nomor surat akan otomatis diambil dari counter berikutnya saat Anda membuat surat baru. Tidak perlu input manual!</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {renderInfoDialog()}
    </>
  )
}
