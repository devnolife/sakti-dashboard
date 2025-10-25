"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Users,
  BookOpen,
  DollarSign,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  GraduationCap,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  BarChart3,
} from "lucide-react"

interface StatCard {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: React.ComponentType<{ className?: string }>
}

interface ModuleStatus {
  module: string
  totalRequests: number
  completed: number
  pending: number
  rejected: number
}

export default function OverviewReportPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Overall Statistics
  const overallStats: StatCard[] = [
    {
      title: "Total Mahasiswa",
      value: 1245,
      change: 8.3,
      changeLabel: "vs bulan lalu",
      icon: Users,
    },
    {
      title: "Mata Kuliah Aktif",
      value: 156,
      change: 2.1,
      changeLabel: "vs semester lalu",
      icon: BookOpen,
    },
    {
      title: "Total Pendapatan",
      value: "Rp 2.5M",
      change: 12.5,
      changeLabel: "vs bulan lalu",
      icon: DollarSign,
    },
    {
      title: "KKP Aktif",
      value: 89,
      change: -3.2,
      changeLabel: "vs bulan lalu",
      icon: Briefcase,
    },
  ]

  // Module Status
  const moduleStatuses: ModuleStatus[] = [
    {
      module: "Pengajuan KKP",
      totalRequests: 245,
      completed: 198,
      pending: 32,
      rejected: 15,
    },
    {
      module: "Pengajuan Ujian",
      totalRequests: 187,
      completed: 156,
      pending: 24,
      rejected: 7,
    },
    {
      module: "Permohonan Surat",
      totalRequests: 432,
      completed: 387,
      pending: 38,
      rejected: 7,
    },
    {
      module: "Peminjaman Buku",
      totalRequests: 678,
      completed: 598,
      pending: 67,
      rejected: 13,
    },
    {
      module: "Pendaftaran Lab",
      totalRequests: 356,
      completed: 298,
      pending: 45,
      rejected: 13,
    },
  ]

  // User Activity by Role
  const userActivityByRole = [
    { role: "Mahasiswa", total: 1245, active: 687, percentage: 55.2 },
    { role: "Dosen", total: 89, active: 67, percentage: 75.3 },
    { role: "Staff TU", total: 15, active: 12, percentage: 80.0 },
    { role: "Admin Keuangan", total: 5, active: 4, percentage: 80.0 },
    { role: "Lab Admin", total: 8, active: 6, percentage: 75.0 },
    { role: "Perpustakaan", total: 4, active: 3, percentage: 75.0 },
  ]

  // Financial Summary
  const financialSummary = {
    totalRevenue: 2500000,
    totalPaid: 1245,
    totalOutstanding: 87,
    paymentRate: 93.5,
    budgetUsed: 1300000,
    budgetRemaining: 1200000,
  }

  // Academic Summary
  const academicSummary = {
    totalCourses: 156,
    activeCourses: 142,
    totalStudents: 1245,
    activeStudents: 1189,
    averageGPA: 3.42,
    graduationRate: 87.5,
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Laporan Keseluruhan</h1>
          <p className="text-muted-foreground mt-1">
            Ringkasan lengkap semua aktivitas dan statistik sistem
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Minggu Ini</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="semester">Semester Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overallStats.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0

          return (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span>{stat.title}</span>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {isPositive ? "+" : ""}
                    {stat.change}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {stat.changeLabel}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">
            <BarChart3 className="h-4 w-4 mr-2" />
            Status Modul
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Aktivitas Users
          </TabsTrigger>
          <TabsTrigger value="academic">
            <GraduationCap className="h-4 w-4 mr-2" />
            Akademik
          </TabsTrigger>
          <TabsTrigger value="financial">
            <DollarSign className="h-4 w-4 mr-2" />
            Keuangan
          </TabsTrigger>
        </TabsList>

        {/* Module Status Tab */}
        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status Modul Sistem</CardTitle>
              <CardDescription>
                Ringkasan aktivitas dan status setiap modul
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moduleStatuses.map((module) => {
                  const completionRate = Math.round(
                    (module.completed / module.totalRequests) * 100
                  )

                  return (
                    <div
                      key={module.module}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{module.module}</h3>
                        <Badge variant="outline">
                          {completionRate}% Selesai
                        </Badge>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total</p>
                          <p className="text-xl font-bold">
                            {module.totalRequests}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Selesai
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            {module.completed}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Pending
                          </p>
                          <p className="text-xl font-bold text-yellow-600">
                            {module.pending}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Ditolak
                          </p>
                          <p className="text-xl font-bold text-red-600">
                            {module.rejected}
                          </p>
                        </div>
                      </div>

                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${completionRate}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Activity Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Pengguna per Role</CardTitle>
              <CardDescription>
                Tingkat aktivitas pengguna berdasarkan role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivityByRole.map((data) => (
                  <div key={data.role} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{data.role}</h3>
                        <p className="text-sm text-muted-foreground">
                          {data.active} dari {data.total} users aktif
                        </p>
                      </div>
                      <Badge
                        variant={
                          data.percentage >= 70
                            ? "default"
                            : data.percentage >= 50
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {data.percentage}%
                      </Badge>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${data.percentage >= 70
                          ? "bg-green-500"
                          : data.percentage >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          }`}
                        style={{ width: `${data.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Akademik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Mata Kuliah
                  </span>
                  <span className="text-xl font-bold">
                    {academicSummary.totalCourses}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Mata Kuliah Aktif
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {academicSummary.activeCourses}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Mahasiswa
                  </span>
                  <span className="text-xl font-bold">
                    {academicSummary.totalStudents}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Mahasiswa Aktif
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {academicSummary.activeStudents}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performa Akademik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Rata-rata IPK
                  </span>
                  <span className="text-xl font-bold">
                    {academicSummary.averageGPA}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Tingkat Kelulusan
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {academicSummary.graduationRate}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${academicSummary.graduationRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Pendapatan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total Pendapatan
                  </span>
                  <span className="text-xl font-bold">
                    {formatCurrency(financialSummary.totalRevenue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Pembayaran Selesai
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {financialSummary.totalPaid}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Pembayaran Tertunda
                  </span>
                  <span className="text-xl font-bold text-red-600">
                    {financialSummary.totalOutstanding}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Tingkat Pembayaran
                  </span>
                  <span className="text-xl font-bold">
                    {financialSummary.paymentRate}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anggaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Anggaran Terpakai
                  </span>
                  <span className="text-xl font-bold">
                    {formatCurrency(financialSummary.budgetUsed)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Sisa Anggaran
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(financialSummary.budgetRemaining)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{
                      width: `${(financialSummary.budgetUsed /
                        (financialSummary.budgetUsed +
                          financialSummary.budgetRemaining)) *
                        100
                        }%`,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
