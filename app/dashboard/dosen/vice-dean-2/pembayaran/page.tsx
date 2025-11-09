"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DollarSign,
  TrendingUp,
  Users,
  AlertCircle,
  Download,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  FileText,
  Beaker,
  BookOpen,
  Building2,
  GraduationCap,
  Eye,
  Calendar,
  Hash,
  User,
  Mail,
  Phone
} from "lucide-react"

interface Payment {
  id: string
  studentName: string
  nim: string
  prodi: string
  email?: string
  phone?: string
  paymentType: "ujian" | "lab" | "wisuda" | "perpustakaan" | "lainnya"
  amount: number
  status: "lunas" | "belum-lunas" | "terlambat"
  semester: string
  dueDate: string
  paidDate?: string
  paymentMethod?: string
  transactionId?: string
  notes?: string
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function PembayaranPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProdi, setSelectedProdi] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const mockPayments: Payment[] = [
    { id: '2', studentName: 'Siti Nurhaliza', nim: '2020101002', prodi: 'Informatika', email: 'siti.nurhaliza@student.ac.id', phone: '081234567891', paymentType: 'ujian', amount: 500000, status: 'lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-09-15', paidDate: '2024-09-10', paymentMethod: 'Virtual Account Mandiri', transactionId: 'TRX20240910002', notes: 'Biaya ujian akhir semester' },
    { id: '3', studentName: 'Budi Santoso', nim: '2021101003', prodi: 'Informatika', email: 'budi.santoso@student.ac.id', phone: '081234567892', paymentType: 'lab', amount: 1500000, status: 'belum-lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-11-30', notes: 'Menunggu pembayaran praktikum' },
    { id: '5', studentName: 'Eko Prasetyo', nim: '2020101005', prodi: 'Teknik Sipil', email: 'eko.prasetyo@student.ac.id', phone: '081234567894', paymentType: 'perpustakaan', amount: 250000, status: 'lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-09-20', paidDate: '2024-09-18', paymentMethod: 'Tunai', transactionId: 'TRX20240918005', notes: 'Biaya perpustakaan lunas' },
    { id: '6', studentName: 'Rina Wati', nim: '2019101006', prodi: 'Arsitektur', email: 'rina.wati@student.ac.id', phone: '081234567895', paymentType: 'wisuda', amount: 3500000, status: 'belum-lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-12-15', notes: 'Persiapan wisuda periode Januari 2025' },
    { id: '8', studentName: 'Maya Sari', nim: '2021101008', prodi: 'Teknik Elektro', email: 'maya.sari@student.ac.id', phone: '081234567897', paymentType: 'lab', amount: 1200000, status: 'lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-10-15', paidDate: '2024-10-10', paymentMethod: 'QRIS', transactionId: 'TRX20241010008', notes: 'Praktikum elektronika dasar' },
    { id: '9', studentName: 'Andi Wijaya', nim: '2019101009', prodi: 'Informatika', email: 'andi.wijaya@student.ac.id', phone: '081234567898', paymentType: 'ujian', amount: 500000, status: 'terlambat', semester: 'Ganjil 2024/2025', dueDate: '2024-09-15', notes: 'Pembayaran ujian terlambat' },
    { id: '10', studentName: 'Lina Hartati', nim: '2020101010', prodi: 'Teknik Sipil', email: 'lina.hartati@student.ac.id', phone: '081234567899', paymentType: 'lab', amount: 1800000, status: 'lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-10-30', paidDate: '2024-10-25', paymentMethod: 'Transfer Bank Mandiri', transactionId: 'TRX20241025010', notes: 'Praktikum struktur dan material' },
    { id: '11', studentName: 'Farhan Alamsyah', nim: '2021101011', prodi: 'Arsitektur', email: 'farhan.alamsyah@student.ac.id', phone: '081234567900', paymentType: 'lainnya', amount: 800000, status: 'lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-11-10', paidDate: '2024-11-05', paymentMethod: 'QRIS', transactionId: 'TRX20241105011', notes: 'Biaya studio dan maket' },
    { id: '12', studentName: 'Sarah Amelia', nim: '2019101012', prodi: 'Teknik Elektro', email: 'sarah.amelia@student.ac.id', phone: '081234567901', paymentType: 'wisuda', amount: 3500000, status: 'belum-lunas', semester: 'Ganjil 2024/2025', dueDate: '2024-12-20', notes: 'Calon wisuda periode Februari 2025' },
  ]

  const paymentTypeConfig = {
    ujian: { label: 'Ujian', icon: FileText, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
    lab: { label: 'Laboratorium', icon: Beaker, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100', textColor: 'text-green-700' },
    wisuda: { label: 'Wisuda', icon: GraduationCap, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-100', textColor: 'text-amber-700' },
    perpustakaan: { label: 'Perpustakaan', icon: BookOpen, color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700' },
    lainnya: { label: 'Lainnya', icon: Building2, color: 'from-slate-500 to-gray-500', bgColor: 'bg-slate-100', textColor: 'text-slate-700' },
  }

  const statusConfig = {
    lunas: { label: 'Lunas', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
    'belum-lunas': { label: 'Belum Lunas', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
    terlambat: { label: 'Terlambat', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
  }

  const totalPayments = mockPayments.reduce((sum, p) => sum + p.amount, 0)
  const paidPayments = mockPayments.filter(p => p.status === 'lunas')
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0)
  const unpaidPayments = mockPayments.filter(p => p.status !== 'lunas')
  const totalUnpaid = unpaidPayments.reduce((sum, p) => sum + p.amount, 0)
  const latePayments = mockPayments.filter(p => p.status === 'terlambat')

  const filterPayments = (payments: Payment[]) => {
    let filtered = payments

    if (selectedProdi !== 'all') {
      filtered = filtered.filter(p => p.prodi === selectedProdi)
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.paymentType === selectedType)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nim.includes(searchQuery)
      )
    }

    return filtered
  }

  const filteredPayments = filterPayments(mockPayments)

  // Payment by Prodi
  const prodiList = ['Informatika', 'Teknik Sipil', 'Arsitektur', 'Teknik Elektro']
  const prodiPayments = prodiList.map(prodi => {
    const payments = mockPayments.filter(p => p.prodi === prodi)
    const total = payments.reduce((sum, p) => sum + p.amount, 0)
    const paid = payments.filter(p => p.status === 'lunas').reduce((sum, p) => sum + p.amount, 0)
    return { prodi, total, paid, percentage: total > 0 ? (paid / total) * 100 : 0 }
  })

  // Payment by Type
  const paymentsByType = Object.keys(paymentTypeConfig).map(type => {
    const payments = mockPayments.filter(p => p.paymentType === type)
    const total = payments.reduce((sum, p) => sum + p.amount, 0)
    const paid = payments.filter(p => p.status === 'lunas').reduce((sum, p) => sum + p.amount, 0)
    return { type, total, paid, count: payments.length }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen Pembayaran</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitoring pembayaran mahasiswa fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="py-4 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-900">Total Tagihan</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{formatCurrency(totalPayments)}</div>
            <p className="text-sm text-muted-foreground mt-1">{mockPayments.length} transaksi</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="py-4 bg-gradient-to-br from-green-50 to-green-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900">Terbayar</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalPaid)}</div>
            <p className="text-sm text-green-600 mt-1">{((totalPaid / totalPayments) * 100).toFixed(1)}% lunas</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardHeader className="py-4 bg-gradient-to-br from-amber-50 to-amber-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-amber-900">Belum Lunas</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-600">{formatCurrency(totalUnpaid)}</div>
            <p className="text-sm text-muted-foreground mt-1">{unpaidPayments.length} tagihan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-red-500">
          <CardHeader className="py-4 bg-gradient-to-br from-red-50 to-red-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-red-900">Terlambat</CardTitle>
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-red-600">{latePayments.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Perlu tindakan</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="prodi" className="text-sm">Per Prodi</TabsTrigger>
          <TabsTrigger value="transactions" className="text-sm">Transaksi</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {paymentsByType.filter(p => p.total > 0).map((item) => {
              const config = paymentTypeConfig[item.type as keyof typeof paymentTypeConfig]
              const Icon = config.icon
              const percentage = item.total > 0 ? (item.paid / item.total) * 100 : 0

              return (
                <Card key={item.type} className="overflow-hidden">
                  <CardHeader className={`py-4 bg-gradient-to-br ${config.color} text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base font-semibold">{config.label}</CardTitle>
                          <p className="text-sm opacity-90">{item.count} transaksi</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Tagihan</p>
                        <p className="text-lg font-bold">{formatCurrency(item.total)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Terbayar</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(item.paid)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress Pembayaran</span>
                        <span className="font-bold text-green-600">{percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={percentage} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Per Prodi Tab */}
        <TabsContent value="prodi" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {prodiPayments.map((item, index) => {
              const colors = [
                'from-blue-500 to-cyan-500',
                'from-purple-500 to-pink-500',
                'from-green-500 to-emerald-500',
                'from-amber-500 to-orange-500',
              ]

              return (
                <Card key={item.prodi} className="overflow-hidden">
                  <CardHeader className={`py-4 bg-gradient-to-br ${colors[index]} text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-base font-semibold">{item.prodi}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Tagihan</p>
                        <p className="text-lg font-bold">{formatCurrency(item.total)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Terbayar</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(item.paid)}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Tingkat Pembayaran</span>
                        <span className="font-bold text-green-600">{item.percentage.toFixed(1)}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-3" />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama atau NIM..."
                    className="pl-9 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedProdi} onValueChange={setSelectedProdi}>
                  <SelectTrigger className="w-full md:w-[180px] h-10">
                    <SelectValue placeholder="Prodi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Prodi</SelectItem>
                    <SelectItem value="Informatika">Informatika</SelectItem>
                    <SelectItem value="Teknik Sipil">Teknik Sipil</SelectItem>
                    <SelectItem value="Arsitektur">Arsitektur</SelectItem>
                    <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-[180px] h-10">
                    <SelectValue placeholder="Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    {Object.entries(paymentTypeConfig).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-[180px] h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="lunas">Lunas</SelectItem>
                    <SelectItem value="belum-lunas">Belum Lunas</SelectItem>
                    <SelectItem value="terlambat">Terlambat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg font-semibold">
                {filteredPayments.length} Transaksi Ditemukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredPayments.map((payment) => {
                  const typeConfig = paymentTypeConfig[payment.paymentType]
                  const statusConf = statusConfig[payment.status]
                  const TypeIcon = typeConfig.icon
                  const StatusIcon = statusConf.icon

                  return (
                    <Card key={payment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`p-3 bg-gradient-to-br ${typeConfig.color} rounded-lg`}>
                              <TypeIcon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{payment.studentName}</h3>
                                <Badge variant="outline" className="text-xs">{payment.nim}</Badge>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span>{payment.prodi}</span>
                                <span>•</span>
                                <span>{typeConfig.label}</span>
                                <span>•</span>
                                <span>{payment.semester}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xl font-bold">{formatCurrency(payment.amount)}</p>
                              <div className="flex items-center gap-2 mt-1 justify-end">
                                <Badge className={`text-xs px-2 py-0.5 border ${statusConf.color}`}>
                                  {statusConf.label}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {payment.status === 'lunas' && payment.paidDate
                                  ? `Dibayar: ${formatDate(payment.paidDate)}`
                                  : `Jatuh tempo: ${formatDate(payment.dueDate)}`}
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-9"
                              onClick={() => {
                                setSelectedPayment(payment)
                                setIsDetailOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Detail
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {filteredPayments.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground mt-3">Tidak ada transaksi ditemukan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Payment Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Detail Pembayaran</DialogTitle>
            <DialogDescription>
              Informasi lengkap pembayaran mahasiswa
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-6 mt-4">
              {/* Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <div>
                  <p className="text-sm text-muted-foreground">Status Pembayaran</p>
                  <Badge className={`mt-1 ${statusConfig[selectedPayment.status].color}`}>
                    {statusConfig[selectedPayment.status].label}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Tagihan</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(selectedPayment.amount)}</p>
                </div>
              </div>

              {/* Student Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Informasi Mahasiswa
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                    <p className="font-semibold mt-1">{selectedPayment.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NIM</p>
                    <p className="font-semibold mt-1">{selectedPayment.nim}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Program Studi</p>
                    <p className="font-semibold mt-1">{selectedPayment.prodi}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Semester</p>
                    <p className="font-semibold mt-1">{selectedPayment.semester}</p>
                  </div>
                  {selectedPayment.email && (
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </p>
                      <p className="font-semibold mt-1 text-sm">{selectedPayment.email}</p>
                    </div>
                  )}
                  {selectedPayment.phone && (
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Telepon
                      </p>
                      <p className="font-semibold mt-1">{selectedPayment.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  Informasi Pembayaran
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Jenis Pembayaran</p>
                    <div className="flex items-center gap-2 mt-1">
                      {(() => {
                        const config = paymentTypeConfig[selectedPayment.paymentType]
                        const Icon = config.icon
                        return (
                          <>
                            <Icon className="h-4 w-4" />
                            <p className="font-semibold">{config.label}</p>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jumlah</p>
                    <p className="font-bold text-lg text-blue-600 mt-1">{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Jatuh Tempo
                    </p>
                    <p className="font-semibold mt-1">{formatDate(selectedPayment.dueDate)}</p>
                  </div>
                  {selectedPayment.paidDate && (
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" /> Tanggal Bayar
                      </p>
                      <p className="font-semibold mt-1 text-green-600">{formatDate(selectedPayment.paidDate)}</p>
                    </div>
                  )}
                  {selectedPayment.paymentMethod && (
                    <div>
                      <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
                      <p className="font-semibold mt-1">{selectedPayment.paymentMethod}</p>
                    </div>
                  )}
                  {selectedPayment.transactionId && (
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Hash className="h-3 w-3" /> ID Transaksi
                      </p>
                      <p className="font-mono text-sm font-semibold mt-1">{selectedPayment.transactionId}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedPayment.notes && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-amber-600" />
                    Catatan
                  </h3>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedPayment.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>
                  Tutup
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Download className="h-4 w-4 mr-2" />
                  Cetak Bukti
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
