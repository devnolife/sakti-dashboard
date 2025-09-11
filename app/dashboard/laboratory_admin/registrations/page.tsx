"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle, 
  Search, 
  XCircle, 
  Filter, 
  CreditCard, 
  Eye, 
  UserCheck, 
  Calendar,
  DollarSign,
  AlertCircle,
  FileCheck,
  ClipboardList,
  Users,
  TrendingUp,
  Clock,
  Download,
  Plus,
  GraduationCap,
  MapPin,
  CheckCircle2,
  X,
  AlertTriangle
} from "lucide-react"

interface LabRegistration {
  id: string
  studentName: string
  studentId: string
  studentMajor: string
  studentSemester: number
  labName: string
  courseName: string
  schedule: string
  scheduleDate: string
  applicationDate: string
  status: "pending" | "approved" | "rejected"
  paymentStatus: "pending" | "verified" | "unverified"
  paymentAmount: number
  paymentDate?: string
  paymentMethod?: string
  paymentProofUrl?: string
  paymentVerifiedBy?: string
  paymentVerifiedAt?: string
  rejectionReason?: string
}

const registrations: LabRegistration[] = [
  {
    id: "reg-001",
    studentName: "Budi Santoso",
    studentId: "12345678",
    studentMajor: "Informatika",
    studentSemester: 4,
    labName: "Lab Database",
    courseName: "Praktikum Basis Data",
    schedule: "Senin, 08:00 - 10:00",
    scheduleDate: "20 Maret 2024",
    applicationDate: "18 Maret 2024",
    status: "pending",
    paymentStatus: "verified",
    paymentAmount: 150000,
    paymentDate: "18 Maret 2024",
    paymentMethod: "Bank Transfer",
    paymentVerifiedBy: "Admin Lab",
    paymentVerifiedAt: "19 Maret 2024",
  },
  {
    id: "reg-002",
    studentName: "Siti Rahma",
    studentId: "23456789",
    studentMajor: "Informatika",
    studentSemester: 4,
    labName: "Lab Jaringan",
    courseName: "Praktikum Jaringan Komputer",
    schedule: "Selasa, 09:00 - 11:00",
    scheduleDate: "21 Maret 2024",
    applicationDate: "18 Maret 2024",
    status: "approved",
    paymentStatus: "verified",
    paymentAmount: 150000,
    paymentDate: "18 Maret 2024",
    paymentMethod: "E-Wallet",
    paymentVerifiedBy: "Admin Lab",
    paymentVerifiedAt: "18 Maret 2024",
  },
  {
    id: "reg-003",
    studentName: "Ahmad Fauzi",
    studentId: "34567890",
    studentMajor: "Sistem Informasi",
    studentSemester: 6,
    labName: "Lab Programming",
    courseName: "Praktikum Pemrograman Web",
    schedule: "Rabu, 10:00 - 12:00",
    scheduleDate: "22 Maret 2024",
    applicationDate: "17 Maret 2024",
    status: "approved",
    paymentStatus: "verified",
    paymentAmount: 150000,
    paymentDate: "17 Maret 2024",
    paymentMethod: "Bank Transfer",
    paymentVerifiedBy: "Admin Lab",
    paymentVerifiedAt: "17 Maret 2024",
  },
  {
    id: "reg-004",
    studentName: "Dewi Anggraini",
    studentId: "45678901",
    studentMajor: "Sistem Informasi",
    studentSemester: 4,
    labName: "Lab Multimedia",
    courseName: "Praktikum Desain Grafis",
    schedule: "Kamis, 13:00 - 15:00",
    scheduleDate: "23 Maret 2024",
    applicationDate: "16 Maret 2024",
    status: "rejected",
    paymentStatus: "verified",
    paymentAmount: 150000,
    paymentDate: "16 Maret 2024",
    paymentMethod: "Bank Transfer",
    paymentVerifiedBy: "Admin Lab",
    paymentVerifiedAt: "16 Maret 2024",
    rejectionReason: "Jadwal bentrok dengan kelas lain",
  },
  {
    id: "reg-005",
    studentName: "Rudi Hartono",
    studentId: "56789012",
    studentMajor: "Informatika",
    studentSemester: 2,
    labName: "Lab AI",
    courseName: "Praktikum Kecerdasan Buatan",
    schedule: "Jumat, 08:00 - 10:00",
    scheduleDate: "24 Maret 2024",
    applicationDate: "15 Maret 2024",
    status: "pending",
    paymentStatus: "unverified",
    paymentAmount: 175000,
  },
  {
    id: "reg-006",
    studentName: "Maya Sari",
    studentId: "67890123",
    studentMajor: "Informatika",
    studentSemester: 3,
    labName: "Lab Database",
    courseName: "Praktikum Basis Data Lanjut",
    schedule: "Senin, 13:00 - 15:00",
    scheduleDate: "20 Maret 2024",
    applicationDate: "19 Maret 2024",
    status: "pending",
    paymentStatus: "pending",
    paymentAmount: 150000,
  }
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
}

const paymentStatusColors = {
  pending: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  verified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  unverified: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
}


export default function LabRegistrationsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPayment, setFilterPayment] = useState<string>("all")
  const [filterLab, setFilterLab] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.labName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    if (filterStatus !== "all" && reg.status !== filterStatus) return false
    if (filterPayment !== "all" && reg.paymentStatus !== filterPayment) return false
    if (filterLab !== "all" && reg.labName !== filterLab) return false
    return true
  })

  // Calculate statistics
  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.status === "pending").length,
    approved: registrations.filter(r => r.status === "approved").length,
    rejected: registrations.filter(r => r.status === "rejected").length,
    totalRevenue: registrations
      .filter(r => r.paymentStatus === "verified")
      .reduce((sum, r) => sum + r.paymentAmount, 0),
    unverifiedPayments: registrations.filter(r => r.paymentStatus === "unverified").length,
    avgAmount: Math.round(registrations.reduce((sum, r) => sum + r.paymentAmount, 0) / registrations.length)
  }

  const approvalRate = Math.round((stats.approved / (stats.approved + stats.rejected || 1)) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
            Pendaftaran Laboratorium
          </span>
          <ClipboardList className="h-6 w-6 text-emerald-500" />
        </h1>
        <p className="text-muted-foreground mt-2">Kelola pendaftaran praktikum dan penggunaan laboratorium</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Pendaftaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{stats.total}</div>
            <p className="text-xs text-blue-700 dark:text-blue-300">{stats.pending} menunggu review</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Disetujui
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-50">{stats.approved}</div>
            <p className="text-xs text-green-700 dark:text-green-300">{approvalRate}% tingkat persetujuan</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-50">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(stats.totalRevenue)}
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">Pembayaran terverifikasi</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 hover:shadow-lg transition-all duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Perlu Verifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-50">{stats.unverifiedPayments}</div>
            <p className="text-xs text-orange-700 dark:text-orange-300">Pembayaran belum diverifikasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            Daftar Pendaftaran
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analisis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div>
                  <CardTitle className="text-xl">Pendaftaran Praktikum</CardTitle>
                  <p className="text-muted-foreground">Kelola dan verifikasi pendaftaran mahasiswa</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari mahasiswa, NIM, atau lab..."
                      className="pl-10 w-full sm:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filter:</span>
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="approved">Disetujui</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterPayment} onValueChange={setFilterPayment}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Pembayaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Pembayaran</SelectItem>
                    <SelectItem value="verified">Terverifikasi</SelectItem>
                    <SelectItem value="unverified">Belum Verifikasi</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterLab} onValueChange={setFilterLab}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Laboratorium" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lab</SelectItem>
                    <SelectItem value="Lab Database">Lab Database</SelectItem>
                    <SelectItem value="Lab Jaringan">Lab Jaringan</SelectItem>
                    <SelectItem value="Lab Programming">Lab Programming</SelectItem>
                    <SelectItem value="Lab Multimedia">Lab Multimedia</SelectItem>
                    <SelectItem value="Lab AI">Lab AI</SelectItem>
                  </SelectContent>
                </Select>

                {(filterStatus !== "all" || filterPayment !== "all" || filterLab !== "all") && (
                  <Badge variant="secondary">
                    {filteredRegistrations.length} dari {registrations.length} pendaftaran
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {/* Registration Cards */}
              <div className="space-y-4">
                {filteredRegistrations.map((registration) => {
                  
                  return (
                    <div key={registration.id} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-900/50">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-12 w-12 bg-gradient-to-br from-emerald-400 to-cyan-400">
                                <AvatarFallback className="text-white font-semibold">
                                  {registration.studentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-lg">{registration.studentName}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <GraduationCap className="h-3 w-3" />
                                    {registration.studentId}
                                  </span>
                                  <span>{registration.studentMajor}</span>
                                  <span>Semester {registration.studentSemester}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge className={statusColors[registration.status]}>
                                {registration.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                                {registration.status === 'approved' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                {registration.status === 'rejected' && <X className="w-3 h-3 mr-1" />}
                                {registration.status === 'pending' ? 'Menunggu' :
                                 registration.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                              </Badge>
                              <Badge className={paymentStatusColors[registration.paymentStatus]}>
                                {registration.paymentStatus === 'pending' && <AlertTriangle className="w-3 h-3 mr-1" />}
                                {registration.paymentStatus === 'verified' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                {registration.paymentStatus === 'unverified' && <X className="w-3 h-3 mr-1" />}
                                {registration.paymentStatus === 'pending' ? 'Pending' :
                                 registration.paymentStatus === 'verified' ? 'Terverifikasi' : 'Belum Verifikasi'}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{registration.labName}</div>
                                <div className="text-muted-foreground">{registration.courseName}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">{registration.schedule}</div>
                                <div className="text-muted-foreground">{registration.scheduleDate}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <div className="font-medium">
                                  {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                    minimumFractionDigits: 0
                                  }).format(registration.paymentAmount)}
                                </div>
                                <div className="text-muted-foreground">
                                  {registration.paymentMethod || 'Belum bayar'}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            Mendaftar pada: {registration.applicationDate}
                            {registration.rejectionReason && (
                              <div className="mt-1 text-red-600 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Alasan ditolak: {registration.rejectionReason}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {registration.status === 'pending' && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {filteredRegistrations.length === 0 && (
                  <div className="text-center py-12">
                    <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Tidak ada pendaftaran</h3>
                    <p className="text-muted-foreground">Coba ubah filter pencarian atau tunggu pendaftaran baru</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6">
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    Tingkat Persetujuan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{approvalRate}%</div>
                  <Progress value={approvalRate} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {stats.approved} disetujui dari {stats.approved + stats.rejected} total review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    Rata-rata Biaya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0
                    }).format(stats.avgAmount)}
                  </div>
                  <p className="text-xs text-muted-foreground">Per pendaftaran</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    Efisiensi Proses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {Math.round(((stats.approved + stats.rejected) / stats.total) * 100)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Pendaftaran sudah diproses</p>
                </CardContent>
              </Card>
            </div>

            {/* Lab Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Pendaftaran per Lab</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from(new Set(registrations.map(r => r.labName))).map(lab => {
                    const count = registrations.filter(r => r.labName === lab).length
                    const percentage = Math.round((count / registrations.length) * 100)
                    
                    return (
                      <div key={lab} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                          <span className="font-medium">{lab}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24">
                            <Progress value={percentage} className="h-2" />
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {count} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}