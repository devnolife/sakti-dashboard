"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, TrendingUp, Calendar, FileText } from "lucide-react"

// Mock data for current numbering system
const mockNumberingData = {
  currentNumber: 145,
  format: "001/TU-UNIV/{YYYY}/{MM}",
  lastUsed: "145/TU-UNIV/2024/01",
  totalThisMonth: 12,
  totalThisYear: 145,
  categories: [
    { type: "active_student", lastNumber: 89, format: "AS", total: 89 },
    { type: "research_permission", lastNumber: 23, format: "RP", total: 23 },
    { type: "internship_recommendation", lastNumber: 18, format: "IR", total: 18 },
    { type: "graduation_letter", lastNumber: 15, format: "GL", total: 15 }
  ]
}

export function NumberingSystemCard() {
  const [numberingData, setNumberingData] = useState(mockNumberingData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const formatCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getNextNumber = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const nextNum = String(numberingData.currentNumber + 1).padStart(3, '0')
    return `${nextNum}/TU-UNIV/${year}/${month}`
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

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
          <Hash className="w-5 h-5" />
          Sistem Penomoran Surat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Nomor Terakhir Digunakan</p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{numberingData.lastUsed}</p>
            <p className="text-xs text-muted-foreground">Per {formatCurrentDate()}</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Nomor Berikutnya</p>
            <p className="text-xl font-bold text-green-700 dark:text-green-300">{getNextNumber()}</p>
            <Badge variant="secondary" className="text-xs">Siap Digunakan</Badge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Format Penomoran</p>
            <p className="text-lg font-mono text-gray-700 dark:text-gray-300">{numberingData.format}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bulan Ini</p>
              <p className="font-bold text-lg">{numberingData.totalThisMonth}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tahun Ini</p>
              <p className="font-bold text-lg">{numberingData.totalThisYear}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Surat Aktif</p>
              <p className="font-bold text-lg">{numberingData.categories[0].total}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Hash className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Penelitian</p>
              <p className="font-bold text-lg">{numberingData.categories[1].total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
          <h4 className="font-semibold text-sm text-muted-foreground mb-3">Kategori Surat</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Keterangan Aktif</p>
              <p className="text-muted-foreground">Format: AS-{"{XXX}"}</p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Terakhir: AS-{String(numberingData.categories[0].lastNumber).padStart(3, '0')}</p>
            </div>
            <div>
              <p className="font-medium">Izin Penelitian</p>
              <p className="text-muted-foreground">Format: RP-{"{XXX}"}</p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Terakhir: RP-{String(numberingData.categories[1].lastNumber).padStart(3, '0')}</p>
            </div>
            <div>
              <p className="font-medium">Rekomendasi Magang</p>
              <p className="text-muted-foreground">Format: IR-{"{XXX}"}</p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Terakhir: IR-{String(numberingData.categories[2].lastNumber).padStart(3, '0')}</p>
            </div>
            <div>
              <p className="font-medium">Surat Lulus</p>
              <p className="text-muted-foreground">Format: GL-{"{XXX}"}</p>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Terakhir: GL-{String(numberingData.categories[3].lastNumber).padStart(3, '0')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}