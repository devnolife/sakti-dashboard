"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, TrendingUp, Calendar, FileText } from "lucide-react"
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

  if (!statistics) {
    return null
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
          <Hash className="w-5 h-5" />
          Sistem Penomoran Surat
        </CardTitle>
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

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Format Penomoran</p>
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-2 rounded border">
              {`{counter}/{jenis}/{prodi}/{bulan}/{hijri}/{gregorian}`}
            </p>
            <p className="text-xs text-muted-foreground">
              Contoh: 001/A/{prodiKode}/I/1446/2024
            </p>
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
  )
}
