"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Building2,
  Award,
  UserCheck,
  BarChart3,
  FileText,
  Calendar,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProdiStats {
  id: string
  code: string
  name: string
  faculty: string
  totalAccounts: number
  activeAccounts: number
  totalDosen: number
  activeDosen: number
  totalDocuments: number
  requiredDocuments: number
  completedDocuments: number
  systemStatus: "active" | "maintenance" | "inactive"
}

export default function ProdiOverviewPage() {
  const [selectedProdi, setSelectedProdi] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [prodiList, setProdiList] = useState<ProdiStats[]>([])

  useEffect(() => {
    fetchProdiOverview()
  }, [])

  const fetchProdiOverview = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('session-token')

      console.log('Fetching prodi overview with token:', token ? 'exists' : 'missing')

      const response = await fetch('/api/admin/prodi/overview', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Error response:', errorData)
        // Don't throw error, just set empty list
        setProdiList([])
        return
      }

      const result = await response.json()
      console.log('Prodi data received:', result)
      setProdiList(result.data || [])
    } catch (error) {
      console.error('Error fetching prodi overview:', error)
      // Set empty list on error
      setProdiList([])
    } finally {
      setLoading(false)
    }
  }

  const selectedProdiData = selectedProdi === "all"
    ? null
    : prodiList.find(p => p.id === selectedProdi)

  const totalStats = {
    totalAccounts: prodiList.reduce((sum, p) => sum + p.totalAccounts, 0),
    activeAccounts: prodiList.reduce((sum, p) => sum + p.activeAccounts, 0),
    totalDosen: prodiList.reduce((sum, p) => sum + p.totalDosen, 0),
    activeDosen: prodiList.reduce((sum, p) => sum + p.activeDosen, 0),
    totalDocuments: prodiList.reduce((sum, p) => sum + p.totalDocuments, 0),
    requiredDocuments: prodiList.reduce((sum, p) => sum + p.requiredDocuments, 0),
    completedDocuments: prodiList.reduce((sum, p) => sum + p.completedDocuments, 0),
  }

  const displayStats = selectedProdiData || totalStats

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-200"
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-200"
      case "inactive":
        return "bg-red-500/10 text-red-500 border-red-200"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "maintenance":
        return "Maintenance"
      case "inactive":
        return "Tidak Aktif"
      default:
        return status
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="flex gap-2 items-center text-3xl font-bold">
            <GraduationCap className="w-8 h-8" />
            Data Sistem per Program Studi
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola akun, dosen, dan dokumen berdasarkan program studi
          </p>
        </div>

        <Card>
          <CardContent className="py-12 text-center">
            <div className="animate-spin mx-auto mb-4 w-16 h-16 border-4 border-primary border-t-transparent rounded-full" />
            <p className="text-muted-foreground">Memuat data prodi...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show empty state if no data
  if (prodiList.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="flex gap-2 items-center text-3xl font-bold">
            <GraduationCap className="w-8 h-8" />
            Data Sistem per Program Studi
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola akun, dosen, dan dokumen berdasarkan program studi
          </p>
        </div>

        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold mb-2">Belum Ada Data Prodi</h3>
            <p className="text-muted-foreground mb-4">
              Silakan seed data prodi terlebih dahulu dengan menjalankan:<br />
              <code className="bg-muted px-2 py-1 rounded mt-2 inline-block">npm run seed:master-data</code>
            </p>
            <Button variant="outline" onClick={fetchProdiOverview}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="flex gap-2 items-center text-3xl font-bold">
            <GraduationCap className="w-8 h-8" />
            Data Sistem per Program Studi
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola akun, dosen, dan dokumen berdasarkan program studi
          </p>
        </div>
        <Select value={selectedProdi} onValueChange={setSelectedProdi}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Pilih Program Studi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Program Studi</SelectItem>
            {prodiList.map((prodi) => (
              <SelectItem key={prodi.id} value={prodi.id}>
                {prodi.code} - {prodi.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Total Akun</CardTitle>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedProdiData ? selectedProdiData.totalAccounts : totalStats.totalAccounts}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedProdiData ? selectedProdiData.activeAccounts : totalStats.activeAccounts} akun aktif
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Dosen Terdaftar</CardTitle>
              <UserCheck className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedProdiData ? selectedProdiData.totalDosen : totalStats.totalDosen}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedProdiData ? selectedProdiData.activeDosen : totalStats.activeDosen} aktif
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
              <FileText className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedProdiData ? selectedProdiData.totalDocuments : totalStats.totalDocuments}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Dokumen tersimpan</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Kelengkapan Dokumen</CardTitle>
              <Award className="w-4 h-4 text-orange-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedProdiData ? selectedProdiData.completedDocuments : totalStats.completedDocuments}/{selectedProdiData ? selectedProdiData.requiredDocuments : totalStats.requiredDocuments}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((selectedProdiData ? selectedProdiData.completedDocuments / selectedProdiData.requiredDocuments : totalStats.completedDocuments / totalStats.requiredDocuments) * 100)}% lengkap
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Program Studi Cards */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Perbandingan</TabsTrigger>
          <TabsTrigger value="trends">Tren</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {prodiList.map((prodi) => (
              <Card
                key={prodi.id}
                className={`overflow-hidden transition-all hover:shadow-lg ${selectedProdi === prodi.id ? 'ring-2 ring-primary' : ''
                  }`}
              >
                <CardHeader className="pb-3 bg-gradient-to-r to-transparent from-primary/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{prodi.name}</CardTitle>
                      <CardDescription className="flex gap-2 items-center mt-1">
                        <Building2 className="w-3 h-3" />
                        {prodi.faculty}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(prodi.systemStatus)}>
                      {getStatusLabel(prodi.systemStatus)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between items-center">
                      <span className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        Total Akun
                      </span>
                      <span className="font-semibold">{prodi.totalAccounts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-green-500" />
                        Akun Aktif
                      </span>
                      <span className="font-semibold text-green-600">{prodi.activeAccounts}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="flex gap-2 items-center text-sm text-muted-foreground">
                        <UserCheck className="w-4 h-4" />
                        Dosen
                      </span>
                      <span className="font-semibold">{prodi.totalDosen} ({prodi.activeDosen} aktif)</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="flex gap-2 items-center text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        Dokumen
                      </span>
                      <span className="font-semibold">{prodi.totalDocuments}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Award className="w-4 h-4" />
                        Kelengkapan
                      </span>
                      <span className="font-semibold text-primary">
                        {prodi.completedDocuments}/{prodi.requiredDocuments} ({Math.round((prodi.completedDocuments / prodi.requiredDocuments) * 100)}%)
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => setSelectedProdi(prodi.id)}
                  >
                    <BarChart3 className="mr-2 w-4 h-4" />
                    Lihat Detail
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perbandingan Data Sistem Antar Program Studi</CardTitle>
              <CardDescription>
                Komparasi jumlah akun, dosen, dan dokumen per prodi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  {prodiList.map((prodi) => (
                    <div key={prodi.id} className="p-4 rounded-lg border">
                      <h3 className="mb-3 font-semibold">{prodi.code}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Akun:</span>
                          <span className="font-medium">{prodi.totalAccounts}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dosen:</span>
                          <span className="font-medium">{prodi.totalDosen}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dokumen:</span>
                          <span className="font-medium">{prodi.totalDocuments}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-muted-foreground">Kelengkapan:</span>
                          <span className="font-medium text-primary">
                            {Math.round((prodi.completedDocuments / prodi.requiredDocuments) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Status Sistem per Prodi</CardTitle>
              <CardDescription>
                Status operasional dan kelengkapan dokumen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prodiList.map((prodi) => {
                  const completionPercentage = Math.round((prodi.completedDocuments / prodi.requiredDocuments) * 100)
                  return (
                    <div key={prodi.id} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{prodi.name}</h3>
                          <p className="text-sm text-muted-foreground">{prodi.code}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(prodi.systemStatus)}>
                          {getStatusLabel(prodi.systemStatus)}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Akun Aktif:</span>
                          <span className="font-medium">
                            {prodi.activeAccounts}/{prodi.totalAccounts} ({Math.round((prodi.activeAccounts / prodi.totalAccounts) * 100)}%)
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Dosen Aktif:</span>
                          <span className="font-medium">
                            {prodi.activeDosen}/{prodi.totalDosen}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Kelengkapan Dokumen:</span>
                            <span className="font-medium">{completionPercentage}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className={`h-2 rounded-full ${completionPercentage >= 90 ? 'bg-green-500' :
                                completionPercentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              style={{ width: `${completionPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

