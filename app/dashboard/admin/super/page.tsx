"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  BookOpen,
  Activity,
  Edit,
  ChevronRight,
  RefreshCw,
  Shield
} from "lucide-react"
import { apiGet } from "@/lib/api-client"
import Link from "next/link"

interface ProdiStats {
  kode: string
  nama: string
  jenjang: string
  fakultas: string
  akreditasi: string
  statistics: {
    totalAccounts: number
    activeAccounts: number
    inactiveAccounts: number
    breakdown: {
      students: number
      lecturers: number
      staff: number
      labAdmins: number
    }
  }
}

export default function SuperAdminPage() {
  const [prodiList, setProdiList] = useState<ProdiStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProdiData()
  }, [])

  const fetchProdiData = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await apiGet('/api/admin/super/prodi')

      if (error || !data) {
        setError(error || 'Failed to fetch data')
        return
      }

      setProdiList(data.data || [])
    } catch (err) {
      setError('Failed to load prodi data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const totalStats = {
    totalProdi: prodiList.length,
    totalAccounts: prodiList.reduce((sum, p) => sum + p.statistics.totalAccounts, 0),
    activeAccounts: prodiList.reduce((sum, p) => sum + p.statistics.activeAccounts, 0),
    inactiveAccounts: prodiList.reduce((sum, p) => sum + p.statistics.inactiveAccounts, 0),
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Activity className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-6 w-6" />
              Error Loading Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={fetchProdiData} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Super Admin - Manajemen Prodi
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola informasi prodi dan akun pengguna per program studi
          </p>
        </div>
        <Button onClick={fetchProdiData} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              Total Program Studi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStats.totalProdi}</div>
            <p className="text-xs text-muted-foreground">Program Studi Aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Total Akun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalStats.totalAccounts}</div>
            <p className="text-xs text-muted-foreground">Semua pengguna</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-green-600" />
              Akun Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{totalStats.activeAccounts}</div>
            <p className="text-xs text-muted-foreground">
              {((totalStats.activeAccounts / totalStats.totalAccounts) * 100).toFixed(1)}% dari total
            </p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-red-600" />
              Akun Nonaktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{totalStats.inactiveAccounts}</div>
            <p className="text-xs text-muted-foreground">
              {((totalStats.inactiveAccounts / totalStats.totalAccounts) * 100).toFixed(1)}% dari total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Prodi Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Daftar Program Studi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prodiList.map((prodi) => (
            <Card key={prodi.kode} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{prodi.nama}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>Kode: {prodi.kode}</span>
                      <Badge variant="outline">{prodi.akreditasi}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Statistics */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total Akun:</span>
                    <span className="font-semibold">{prodi.statistics.totalAccounts}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600">✓ Aktif:</span>
                    <span className="font-semibold text-green-700">{prodi.statistics.activeAccounts}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-red-600">✗ Nonaktif:</span>
                    <span className="font-semibold text-red-700">{prodi.statistics.inactiveAccounts}</span>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="pt-3 border-t">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3 text-blue-600" />
                      <span className="text-muted-foreground">Mahasiswa:</span>
                      <span className="font-semibold">{prodi.statistics.breakdown.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3 text-green-600" />
                      <span className="text-muted-foreground">Dosen:</span>
                      <span className="font-semibold">{prodi.statistics.breakdown.lecturers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-purple-600" />
                      <span className="text-muted-foreground">Staff:</span>
                      <span className="font-semibold">{prodi.statistics.breakdown.staff}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3 text-orange-600" />
                      <span className="text-muted-foreground">Lab Admin:</span>
                      <span className="font-semibold">{prodi.statistics.breakdown.labAdmins}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link href={`/dashboard/admin/super/prodi/${prodi.kode}`} className="flex-1">
                    <Button variant="default" className="w-full" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Kelola
                    </Button>
                  </Link>
                  <Link href={`/dashboard/admin/super/prodi/${prodi.kode}#accounts`}>
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Akun
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
