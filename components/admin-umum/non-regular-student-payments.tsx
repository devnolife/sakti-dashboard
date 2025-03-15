"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  ArrowUpDown,
  CheckCircle,
  CreditCard,
  Download,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  Printer,
  RefreshCw,
  Search,
  Trash,
  TrendingDown,
  TrendingUp,
  Wallet,
  XCircle,
} from "lucide-react"
import { mockNonRegularPayments, getPaymentSummary } from "./mock-non-regular-payments"
import { mockNonRegularStudents } from "./mock-non-regular-students"
import type {
  NonRegularPayment,
  PaymentCategory,
  PaymentMethod,
  PaymentStatus,
  PaymentSummary,
} from "@/types/non-regular-payment"
import type { NonRegularStudent } from "@/types/non-regular-student"

export default function NonRegularStudentPayments() {
  const [payments, setPayments] = useState<NonRegularPayment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<NonRegularPayment[]>([])
  const [students, setStudents] = useState<NonRegularStudent[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPayment, setSelectedPayment] = useState<NonRegularPayment | null>(null)
  const [selectedStudent, setSelectedStudent] = useState<NonRegularStudent | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isNewPaymentOpen, setIsNewPaymentOpen] = useState(false)
  const [isReceiptOpen, setIsReceiptOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "ascending" | "descending" }>({
    key: "dueDate",
    direction: "descending",
  })

  // Load mock data
  useEffect(() => {
    // Combine payment data with student data
    const paymentsWithStudents = mockNonRegularPayments.map((payment) => {
      const student = mockNonRegularStudents.find((s) => s.id === payment.studentId)
      return { ...payment, student }
    })

    setPayments(paymentsWithStudents)
    setFilteredPayments(paymentsWithStudents)
    setStudents(mockNonRegularStudents)
    setPaymentSummary(getPaymentSummary())
  }, [])

  // Filter payments based on search query and filters
  useEffect(() => {
    let result = payments

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (payment) =>
          payment.invoiceNumber.toLowerCase().includes(query) ||
          payment.description.toLowerCase().includes(query) ||
          payment.student?.name.toLowerCase().includes(query) ||
          payment.student?.nim.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((payment) => payment.category === selectedCategory)
    }

    // Filter by status
    if (selectedStatus !== "all") {
      result = result.filter((payment) => payment.status === selectedStatus)
    }

    // Apply sorting
    result = [...result].sort((a, b) => {
      let aValue, bValue

      switch (sortConfig.key) {
        case "dueDate":
          aValue = new Date(a.dueDate).getTime()
          bValue = new Date(b.dueDate).getTime()
          break
        case "amount":
          aValue = a.amount
          bValue = b.amount
          break
        case "student":
          aValue = a.student?.name || ""
          bValue = b.student?.name || ""
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        default:
          aValue = a[sortConfig.key as keyof NonRegularPayment]
          bValue = b[sortConfig.key as keyof NonRegularPayment]
      }

      if (sortConfig.direction === "ascending") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredPayments(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedStatus, payments, sortConfig])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + itemsPerPage)

  // Handle sorting
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Status badge renderer
  const renderStatusBadge = (status: PaymentStatus) => {
    const statusConfig = {
      paid: { variant: "success", label: "Lunas", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
      pending: { variant: "warning", label: "Tertunda", icon: <AlertCircle className="h-3 w-3 mr-1" /> },
      failed: { variant: "destructive", label: "Gagal", icon: <XCircle className="h-3 w-3 mr-1" /> },
      refunded: { variant: "secondary", label: "Dikembalikan", icon: <TrendingDown className="h-3 w-3 mr-1" /> },
      partial: { variant: "info", label: "Sebagian", icon: <TrendingUp className="h-3 w-3 mr-1" /> },
    }

    const config = statusConfig[status]
    return (
      <Badge variant={config.variant as any} className="flex items-center">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  // Category badge renderer
  const renderCategoryBadge = (category: PaymentCategory) => {
    const categoryConfig = {
      tuition: { variant: "outline", label: "SPP" },
      registration: { variant: "outline", label: "Pendaftaran" },
      exam: { variant: "outline", label: "Ujian" },
      laboratory: { variant: "outline", label: "Praktikum" },
      graduation: { variant: "outline", label: "Wisuda" },
      other: { variant: "outline", label: "Lainnya" },
    }

    const config = categoryConfig[category]
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  // Payment method renderer
  const renderPaymentMethod = (method?: PaymentMethod) => {
    if (!method) return "-"

    const methodConfig = {
      bank_transfer: "Transfer Bank",
      credit_card: "Kartu Kredit",
      debit_card: "Kartu Debit",
      cash: "Tunai",
      e_wallet: "E-Wallet",
      scholarship: "Beasiswa",
    }

    return methodConfig[method]
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Handle payment details view
  const handleViewDetails = (payment: NonRegularPayment) => {
    setSelectedPayment(payment)
    setSelectedStudent(students.find((s) => s.id === payment.studentId) || null)
    setIsDetailsOpen(true)
  }

  // Handle new payment
  const handleNewPayment = () => {
    setIsNewPaymentOpen(true)
  }

  // Handle receipt view
  const handleViewReceipt = (payment: NonRegularPayment) => {
    setSelectedPayment(payment)
    setIsReceiptOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pembayaran Mahasiswa Non-Reguler</h2>
        <p className="text-muted-foreground">Kelola pembayaran dan tagihan mahasiswa program non-reguler</p>
      </div>

      {/* Summary Cards */}
      {paymentSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pembayaran</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(paymentSummary.totalPaid)}</div>
              <p className="text-xs text-muted-foreground">
                Dari {formatCurrency(paymentSummary.totalDue)} ({paymentSummary.paymentRate.toFixed(1)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pembayaran Tertunda</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(paymentSummary.totalPending)}</div>
              <p className="text-xs text-muted-foreground">Menunggu konfirmasi pembayaran</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pembayaran Terlambat</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(paymentSummary.totalOverdue)}</div>
              <p className="text-xs text-muted-foreground">Melewati tanggal jatuh tempo</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Daftar Pembayaran</CardTitle>
              <CardDescription>Kelola pembayaran dan tagihan mahasiswa program non-reguler</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={handleNewPayment}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pembayaran
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari berdasarkan nomor invoice, nama, atau NIM..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="tuition">SPP</SelectItem>
                  <SelectItem value="registration">Pendaftaran</SelectItem>
                  <SelectItem value="exam">Ujian</SelectItem>
                  <SelectItem value="laboratory">Praktikum</SelectItem>
                  <SelectItem value="graduation">Wisuda</SelectItem>
                  <SelectItem value="other">Lainnya</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="paid">Lunas</SelectItem>
                  <SelectItem value="pending">Tertunda</SelectItem>
                  <SelectItem value="failed">Gagal</SelectItem>
                  <SelectItem value="refunded">Dikembalikan</SelectItem>
                  <SelectItem value="partial">Sebagian</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                  setSelectedStatus("all")
                }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">No</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("invoiceNumber")}>
                      No. Invoice
                      {sortConfig.key === "invoiceNumber" && (
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("student")}>
                      Mahasiswa
                      {sortConfig.key === "student" && (
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("amount")}>
                      Jumlah
                      {sortConfig.key === "amount" && (
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("dueDate")}>
                      Jatuh Tempo
                      {sortConfig.key === "dueDate" && (
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => requestSort("status")}>
                      Status
                      {sortConfig.key === "status" && (
                        <ArrowUpDown
                          className={`ml-2 h-4 w-4 ${sortConfig.direction === "ascending" ? "rotate-180" : ""}`}
                        />
                      )}
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPayments.length > 0 ? (
                  paginatedPayments.map((payment, index) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                      <TableCell>{payment.invoiceNumber}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{payment.student?.name}</span>
                          <span className="text-xs text-muted-foreground">{payment.student?.nim}</span>
                        </div>
                      </TableCell>
                      <TableCell>{renderCategoryBadge(payment.category)}</TableCell>
                      <TableCell>{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{payment.dueDate}</span>
                          {payment.dueDate &&
                            new Date(payment.dueDate) < new Date() &&
                            payment.status === "pending" && <span className="text-xs text-destructive">Terlambat</span>}
                        </div>
                      </TableCell>
                      <TableCell>{renderStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewDetails(payment)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            {(payment.status === "paid" || payment.status === "partial") && (
                              <DropdownMenuItem onClick={() => handleViewReceipt(payment)}>
                                <FileText className="h-4 w-4 mr-2" />
                                Lihat Kuitansi
                              </DropdownMenuItem>
                            )}
                            {payment.status === "pending" && (
                              <DropdownMenuItem>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Catat Pembayaran
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Pembayaran
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Printer className="h-4 w-4 mr-2" />
                              Cetak Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Unduh PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="h-4 w-4 mr-2" />
                              Hapus Pembayaran
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                      Tidak ada data pembayaran yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredPayments.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredPayments.length)} dari{" "}
                {filteredPayments.length} data
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Sebelumnya
                </Button>
                <div className="flex items-center">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = currentPage - 3 + i
                      if (pageNum > totalPages) {
                        pageNum = totalPages - (4 - i)
                      }
                    }
                    return pageNum <= totalPages ? (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-9"
                      >
                        {pageNum}
                      </Button>
                    ) : null
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Selanjutnya
                </Button>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Per halaman" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 baris</SelectItem>
                    <SelectItem value="25">25 baris</SelectItem>
                    <SelectItem value="50">50 baris</SelectItem>
                    <SelectItem value="100">100 baris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Details Dialog */}
      {selectedPayment && selectedStudent && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Detail Pembayaran</DialogTitle>
              <DialogDescription>Informasi lengkap pembayaran {selectedPayment.invoiceNumber}</DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 py-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Informasi Mahasiswa</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Nama</p>
                          <p className="text-sm">{selectedStudent.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">NIM</p>
                          <p className="text-sm">{selectedStudent.nim}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Program</p>
                          <p className="text-sm">
                            {selectedStudent.program === "extension"
                              ? "Ekstensi"
                              : selectedStudent.program === "weekend"
                                ? "Akhir Pekan"
                                : selectedStudent.program === "evening"
                                  ? "Kelas Malam"
                                  : selectedStudent.program === "online"
                                    ? "Daring"
                                    : selectedStudent.program === "executive"
                                      ? "Eksekutif"
                                      : "Internasional"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Jurusan</p>
                          <p className="text-sm">{selectedStudent.department}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Semester</p>
                          <p className="text-sm">{selectedPayment.semester}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Tahun Akademik</p>
                          <p className="text-sm">{selectedPayment.academicYear}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="md:w-2/3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Informasi Pembayaran</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">No. Invoice</p>
                            <p className="text-sm">{selectedPayment.invoiceNumber}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Kategori</p>
                            <p className="text-sm">{renderCategoryBadge(selectedPayment.category)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Deskripsi</p>
                            <p className="text-sm">{selectedPayment.description}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Jumlah</p>
                            <p className="text-sm font-semibold">{formatCurrency(selectedPayment.amount)}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Tanggal Jatuh Tempo</p>
                            <p className="text-sm">{selectedPayment.dueDate}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm">{renderStatusBadge(selectedPayment.status)}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Informasi Pembayaran</p>

                          {selectedPayment.status === "paid" ||
                          selectedPayment.status === "partial" ||
                          selectedPayment.status === "refunded" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Tanggal Pembayaran</p>
                                <p className="text-sm">{selectedPayment.paymentDate}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Metode Pembayaran</p>
                                <p className="text-sm">{renderPaymentMethod(selectedPayment.paymentMethod)}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">ID Transaksi</p>
                                <p className="text-sm">{selectedPayment.transactionId || "-"}</p>
                              </div>
                              {selectedPayment.status === "partial" && (
                                <div className="space-y-1">
                                  <p className="text-sm font-medium">Sisa Pembayaran</p>
                                  <p className="text-sm">{formatCurrency(selectedPayment.amount * 0.4)}</p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Belum ada informasi pembayaran</p>
                          )}
                        </div>

                        {selectedPayment.notes && (
                          <>
                            <Separator />
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Catatan</p>
                              <p className="text-sm">{selectedPayment.notes}</p>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Tutup
              </Button>
              {selectedPayment.status === "paid" || selectedPayment.status === "partial" ? (
                <Button
                  onClick={() => {
                    setIsDetailsOpen(false)
                    handleViewReceipt(selectedPayment)
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Lihat Kuitansi
                </Button>
              ) : selectedPayment.status === "pending" ? (
                <Button>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Catat Pembayaran
                </Button>
              ) : null}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* New Payment Dialog */}
      <Dialog open={isNewPaymentOpen} onOpenChange={setIsNewPaymentOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Tambah Pembayaran Baru</DialogTitle>
            <DialogDescription>Tambahkan data pembayaran baru untuk mahasiswa non-reguler</DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Mahasiswa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mahasiswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.nim} - {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">No. Invoice</Label>
                    <Input id="invoiceNumber" placeholder="Otomatis" disabled />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tuition">SPP</SelectItem>
                        <SelectItem value="registration">Pendaftaran</SelectItem>
                        <SelectItem value="exam">Ujian</SelectItem>
                        <SelectItem value="laboratory">Praktikum</SelectItem>
                        <SelectItem value="graduation">Wisuda</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Jumlah</Label>
                    <Input id="amount" type="number" placeholder="Masukkan jumlah" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Tanggal Jatuh Tempo</Label>
                    <Input id="dueDate" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 8 }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            Semester {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Tahun Akademik</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tahun akademik" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2022/2023">2022/2023</SelectItem>
                        <SelectItem value="2023/2024">2023/2024</SelectItem>
                        <SelectItem value="2024/2025">2024/2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" placeholder="Masukkan deskripsi pembayaran" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea id="notes" placeholder="Masukkan catatan tambahan (opsional)" />
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setIsNewPaymentOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setIsNewPaymentOpen(false)}>Simpan Pembayaran</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      {selectedPayment && (
        <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Kuitansi Pembayaran</DialogTitle>
              <DialogDescription>Kuitansi pembayaran untuk invoice {selectedPayment.invoiceNumber}</DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-auto p-6 border rounded-md bg-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold">KUITANSI PEMBAYARAN</h2>
                  <p className="text-muted-foreground">Universitas Contoh Indonesia</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">No. Kuitansi: {selectedPayment.transactionId}</p>
                  <p>Tanggal: {selectedPayment.paymentDate}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Telah Diterima Dari:</h3>
                <p>{selectedPayment.student?.name}</p>
                <p>NIM: {selectedPayment.student?.nim}</p>
                <p>
                  Program:{" "}
                  {selectedPayment.student?.program === "extension"
                    ? "Ekstensi"
                    : selectedPayment.student?.program === "weekend"
                      ? "Akhir Pekan"
                      : selectedPayment.student?.program === "evening"
                        ? "Kelas Malam"
                        : selectedPayment.student?.program === "online"
                          ? "Daring"
                          : selectedPayment.student?.program === "executive"
                            ? "Eksekutif"
                            : "Internasional"}
                </p>
                <p>Jurusan: {selectedPayment.student?.department}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Untuk Pembayaran:</h3>
                <p>{selectedPayment.description}</p>
                <p>Semester: {selectedPayment.semester}</p>
                <p>Tahun Akademik: {selectedPayment.academicYear}</p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Detail Pembayaran:</h3>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deskripsi</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{selectedPayment.description}</TableCell>
                        <TableCell className="text-right">{formatCurrency(selectedPayment.amount)}</TableCell>
                      </TableRow>
                      {selectedPayment.status === "partial" && (
                        <TableRow>
                          <TableCell>Sisa Pembayaran</TableCell>
                          <TableCell className="text-right text-destructive">
                            {formatCurrency(selectedPayment.amount * 0.4)}
                          </TableCell>
                        </TableRow>
                      )}
                      <TableRow>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="text-right font-bold">
                          {selectedPayment.status === "partial"
                            ? formatCurrency(selectedPayment.amount * 0.6)
                            : formatCurrency(selectedPayment.amount)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Metode Pembayaran:</h3>
                <p>{renderPaymentMethod(selectedPayment.paymentMethod)}</p>
                {selectedPayment.transactionId && <p>ID Transaksi: {selectedPayment.transactionId}</p>}
              </div>

              <div className="flex justify-between items-start mt-12">
                <div>
                  <p className="font-semibold">Catatan:</p>
                  <p className="text-sm text-muted-foreground">Kuitansi ini adalah bukti pembayaran yang sah.</p>
                  <p className="text-sm text-muted-foreground">Harap simpan sebagai bukti pembayaran.</p>
                </div>
                <div className="text-center">
                  <p className="mb-12">____________________</p>
                  <p className="font-semibold">Petugas Keuangan</p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsReceiptOpen(false)}>
                Tutup
              </Button>
              <Button>
                <Printer className="h-4 w-4 mr-2" />
                Cetak Kuitansi
              </Button>
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Unduh PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

