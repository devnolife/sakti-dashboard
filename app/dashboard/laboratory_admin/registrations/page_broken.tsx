"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
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
  ClipboardList
} from "lucide-react"
import {
  RegistrationDetailDialog,
  type LabRegistration,
} from "@/components/laboratory/admin/registration-detail-dialog"

export default function LabRegistrationsPage() {
  const [selectedRegistration, setSelectedRegistration] = useState<LabRegistration | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPayment, setFilterPayment] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for lab registrations
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
      scheduleDate: "20 Maret 2023",
      applicationDate: "18 Maret 2023",
      status: "pending",
      paymentStatus: "verified",
      paymentAmount: 150000,
      paymentDate: "18 Maret 2023",
      paymentMethod: "Bank Transfer",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
      paymentVerifiedBy: "Admin Laboratorium",
      paymentVerifiedAt: "19 Maret 2023",
    },
    {
      id: "reg-002",
      studentName: "Siti Rahma",
      studentId: "23456789",
      studentMajor: "Informatika",
      studentSemester: 4,
      labName: "Lab Networking",
      courseName: "Praktikum Jaringan Komputer",
      schedule: "Selasa, 09:00 - 11:00",
      scheduleDate: "21 Maret 2023",
      applicationDate: "18 Maret 2023",
      status: "pending",
      paymentStatus: "pending",
      paymentAmount: 150000,
      paymentDate: "18 Maret 2023",
      paymentMethod: "Bank Transfer",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
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
      scheduleDate: "22 Maret 2023",
      applicationDate: "17 Maret 2023",
      status: "approved",
      paymentStatus: "verified",
      paymentAmount: 150000,
      paymentDate: "17 Maret 2023",
      paymentMethod: "E-Wallet",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
      paymentVerifiedBy: "Admin Laboratorium",
      paymentVerifiedAt: "17 Maret 2023",
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
      scheduleDate: "23 Maret 2023",
      applicationDate: "16 Maret 2023",
      status: "rejected",
      paymentStatus: "verified",
      paymentAmount: 150000,
      paymentDate: "16 Maret 2023",
      paymentMethod: "Bank Transfer",
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
      paymentVerifiedBy: "Admin Laboratorium",
      paymentVerifiedAt: "16 Maret 2023",
      rejectionReason: "Jadwal bentrok dengan kelas lain",
    },
    {
      id: "reg-005",
      studentName: "Rudi Hartono",
      studentId: "56789012",
      studentMajor: "Informatika",
      studentSemester: 2,
      labName: "Lab IoT",
      courseName: "Praktikum Internet of Things",
      schedule: "Jumat, 08:00 - 10:00",
      scheduleDate: "24 Maret 2023",
      applicationDate: "15 Maret 2023",
      status: "pending",
      paymentStatus: "unverified",
      paymentAmount: 175000,
      paymentProofUrl: "/placeholder.svg?height=400&width=300",
    },
  ]

  const handleOpenDetail = (registration: LabRegistration) => {
    setSelectedRegistration(registration)
    setDetailDialogOpen(true)
  }

  // Filter registrations
  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.labName.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    if (filterStatus !== "all" && reg.status !== filterStatus) return false
    if (filterPayment !== "all" && reg.paymentStatus !== filterPayment) return false
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
    unverifiedPayments: registrations.filter(r => r.paymentStatus === "unverified").length
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Pendaftaran Laboratorium
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola pendaftaran praktikum dan penggunaan laboratorium.</p>
      </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center justify-between">
                Total Pendaftaran
                <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900 dark:text-blue-50">{stats.total}</div>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                {stats.pending} menunggu persetujuan
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100 flex items-center justify-between">
                Disetujui
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900 dark:text-green-50">{stats.approved}</div>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                {((stats.approved / stats.total) * 100).toFixed(1)}% dari total
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-emerald-900 dark:text-emerald-100 flex items-center justify-between">
                Total Pendapatan
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-50">
                Rp{stats.totalRevenue.toLocaleString('id-ID')}
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                Dari pembayaran terverifikasi
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-amber-900 dark:text-amber-100 flex items-center justify-between">
                Pembayaran Pending
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900 dark:text-amber-50">{stats.unverifiedPayments}</div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                Memerlukan verifikasi
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Card */}
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-green-50 dark:from-slate-800 dark:to-slate-700">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-semibold flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-green-600" />
                  Daftar Pendaftaran
                </CardTitle>
                <CardDescription className="text-base">
                  Pendaftaran praktikum dan penggunaan laboratorium
                </CardDescription>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari berdasarkan nama, NIM, atau lab..."
                    className="pl-10 h-11 rounded-xl border-slate-300 focus:border-green-500 focus:ring-green-500/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mt-6">
              {/* Status Filter */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-fit">Status:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "Semua", count: stats.total },
                    { value: "pending", label: "Menunggu", count: stats.pending },
                    { value: "approved", label: "Disetujui", count: stats.approved },
                    { value: "rejected", label: "Ditolak", count: stats.rejected }
                  ].map(({ value, label, count }) => (
                    <Button
                      key={value}
                      variant={filterStatus === value ? "default" : "outline"}
                      size="sm"
                      className="h-8 px-3 rounded-lg text-xs font-medium"
                      onClick={() => setFilterStatus(value)}
                    >
                      {label} <Badge variant="secondary" className="ml-1 px-1 text-xs">{count}</Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Filter */}
              <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 min-w-fit">Pembayaran:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: "all", label: "Semua" },
                    { value: "pending", label: "Menunggu" },
                    { value: "verified", label: "Terverifikasi" },
                    { value: "unverified", label: "Tidak Terverifikasi" }
                  ].map(({ value, label }) => (
                    <Button
                      key={value}
                      variant={filterPayment === value ? "default" : "outline"}
                      size="sm"
                      className="h-8 px-3 rounded-lg text-xs font-medium"
                      onClick={() => setFilterPayment(value)}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
                  <TableRow>
                    <TableHead className="font-semibold">Mahasiswa</TableHead>
                    <TableHead className="font-semibold">Laboratorium</TableHead>
                    <TableHead className="font-semibold">Jadwal</TableHead>
                    <TableHead className="font-semibold">Tanggal Pengajuan</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Pembayaran</TableHead>
                    <TableHead className="text-right font-semibold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRegistrations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center">
                          <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-6 mb-4">
                            <Search className="h-12 w-12 text-slate-400" />
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Tidak ada pendaftaran ditemukan</h3>
                          <p className="text-muted-foreground max-w-md text-center">
                            Tidak ada data pendaftaran yang sesuai dengan kriteria pencarian dan filter Anda.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 flex items-center justify-center">
                              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                {registration.studentName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{registration.studentName}</p>
                              <p className="text-xs text-muted-foreground">NIM: {registration.studentId}</p>
                              <p className="text-xs text-muted-foreground">{registration.studentMajor}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {registration.labName}
                            </p>
                            <p className="text-xs text-muted-foreground">{registration.courseName}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{registration.schedule}</p>
                              <p className="text-xs text-muted-foreground">{registration.scheduleDate}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{registration.applicationDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={`font-medium ${
                              registration.status === "approved"
                                ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                : registration.status === "rejected"
                                  ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                                  : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300"
                            }`}
                          >
                            {registration.status === "approved"
                              ? "Disetujui"
                              : registration.status === "rejected"
                                ? "Ditolak"
                                : "Menunggu"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge
                              className={`font-medium ${
                                registration.paymentStatus === "verified"
                                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300"
                                  : registration.paymentStatus === "unverified"
                                    ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
                                    : "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-300"
                              }`}
                            >
                              {registration.paymentStatus === "verified"
                                ? "Terverifikasi"
                                : registration.paymentStatus === "unverified"
                                  ? "Tidak Terverifikasi"
                                  : "Menunggu"}
                            </Badge>
                            <p className="text-xs text-muted-foreground font-medium">
                              Rp{registration.paymentAmount.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleOpenDetail(registration)}
                              className="hover:bg-green-50 hover:text-green-600 transition-colors"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Detail
                            </Button>
                            {registration.status === "pending" && (
                              <div className="flex gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  disabled={registration.paymentStatus !== "verified"}
                                  className="hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Tolak
                                </Button>
                                <Button 
                                  size="sm" 
                                  disabled={registration.paymentStatus !== "verified"}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Setujui
                                </Button>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Menampilkan <span className="font-medium">{filteredRegistrations.length}</span> dari{" "}
                <span className="font-medium">{registrations.length}</span> pendaftaran
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled className="rounded-lg">
                  Sebelumnya
                </Button>
                <Button variant="outline" size="sm" className="w-9 p-0 rounded-lg bg-green-600 text-white border-green-600">
                  1
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                  Selanjutnya
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}