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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  FileText,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Users,
  Wallet,
  GraduationCap,
  CheckCircle,
  Clock,
  Edit,
  Trash,
  Eye,
  Mail,
  Phone,
  Home,
  User,
  CreditCard,
} from "lucide-react"
import { mockNonRegularStudents } from "./mock-non-regular-students"
import type { NonRegularStudent, Program, StudentStatus, PaymentStatus } from "@/types/non-regular-student"

export default function NonRegularStudentRecords() {
  const [students, setStudents] = useState<NonRegularStudent[]>([])
  const [filteredStudents, setFilteredStudents] = useState<NonRegularStudent[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProgram, setSelectedProgram] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("all")
  const [selectedStudent, setSelectedStudent] = useState<NonRegularStudent | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Load mock data
  useEffect(() => {
    setStudents(mockNonRegularStudents)
    setFilteredStudents(mockNonRegularStudents)
  }, [])

  // Filter students based on search query and filters
  useEffect(() => {
    let result = students

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(query) ||
          student.nim.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.department.toLowerCase().includes(query),
      )
    }

    // Filter by program
    if (selectedProgram !== "all") {
      result = result.filter((student) => student.program === selectedProgram)
    }

    // Filter by status
    if (selectedStatus !== "all") {
      result = result.filter((student) => student.status === selectedStatus)
    }

    // Filter by payment status
    if (selectedPaymentStatus !== "all") {
      result = result.filter((student) => student.paymentStatus === selectedPaymentStatus)
    }

    setFilteredStudents(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, selectedProgram, selectedStatus, selectedPaymentStatus, students])

  // Calculate pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  // Status badge renderer
  const renderStatusBadge = (status: StudentStatus) => {
    const statusConfig = {
      active: { variant: "success", label: "Aktif" },
      inactive: { variant: "secondary", label: "Tidak Aktif" },
      graduated: { variant: "primary", label: "Lulus" },
      on_leave: { variant: "warning", label: "Cuti" },
      transferred: { variant: "info", label: "Pindah" },
      dropped_out: { variant: "destructive", label: "DO" },
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  // Payment status badge renderer
  const renderPaymentBadge = (status: PaymentStatus) => {
    const statusConfig = {
      paid: { variant: "success", label: "Lunas" },
      partial: { variant: "warning", label: "Sebagian" },
      unpaid: { variant: "secondary", label: "Belum Bayar" },
      overdue: { variant: "destructive", label: "Terlambat" },
      waived: { variant: "info", label: "Dibebaskan" },
    }

    const config = statusConfig[status]
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  // Program badge renderer
  const renderProgramBadge = (program: Program) => {
    const programConfig = {
      extension: { variant: "outline", label: "Ekstensi" },
      weekend: { variant: "outline", label: "Akhir Pekan" },
      evening: { variant: "outline", label: "Kelas Malam" },
      online: { variant: "outline", label: "Daring" },
      executive: { variant: "outline", label: "Eksekutif" },
      international: { variant: "outline", label: "Internasional" },
    }

    const config = programConfig[program]
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  // Handle student details view
  const handleViewDetails = (student: NonRegularStudent) => {
    setSelectedStudent(student)
    setIsDetailsOpen(true)
  }

  // Handle student edit
  const handleEditStudent = (student: NonRegularStudent) => {
    setSelectedStudent(student)
    setIsEditOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Data Mahasiswa Non-Reguler</h2>
        <p className="text-muted-foreground">Kelola data mahasiswa program non-reguler</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              Dari {Array.from(new Set(students.map((s) => s.program))).length} program
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Pembayaran</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.paymentStatus === "paid").length}</div>
            <p className="text-xs text-muted-foreground">Mahasiswa dengan pembayaran lunas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata IPK</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Dari seluruh mahasiswa aktif</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Daftar Mahasiswa Non-Reguler</CardTitle>
              <CardDescription>Kelola data mahasiswa program non-reguler</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Mahasiswa
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari berdasarkan nama, NIM, atau email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Program</SelectItem>
                  <SelectItem value="extension">Ekstensi</SelectItem>
                  <SelectItem value="weekend">Akhir Pekan</SelectItem>
                  <SelectItem value="evening">Kelas Malam</SelectItem>
                  <SelectItem value="online">Daring</SelectItem>
                  <SelectItem value="executive">Eksekutif</SelectItem>
                  <SelectItem value="international">Internasional</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  <SelectItem value="graduated">Lulus</SelectItem>
                  <SelectItem value="on_leave">Cuti</SelectItem>
                  <SelectItem value="transferred">Pindah</SelectItem>
                  <SelectItem value="dropped_out">DO</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="paid">Lunas</SelectItem>
                  <SelectItem value="partial">Sebagian</SelectItem>
                  <SelectItem value="unpaid">Belum Bayar</SelectItem>
                  <SelectItem value="overdue">Terlambat</SelectItem>
                  <SelectItem value="waived">Dibebaskan</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedProgram("all")
                  setSelectedStatus("all")
                  setSelectedPaymentStatus("all")
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
                  <TableHead>NIM</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Jurusan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pembayaran</TableHead>
                  <TableHead>IPK</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                      <TableCell>{student.nim}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{renderProgramBadge(student.program)}</TableCell>
                      <TableCell>{student.department}</TableCell>
                      <TableCell>{renderStatusBadge(student.status)}</TableCell>
                      <TableCell>{renderPaymentBadge(student.paymentStatus)}</TableCell>
                      <TableCell>{student.gpa.toFixed(2)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewDetails(student)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <CreditCard className="h-4 w-4 mr-2" />
                              Kelola Pembayaran
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Cetak Laporan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="h-4 w-4 mr-2" />
                              Hapus Data
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                      Tidak ada data mahasiswa yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Menampilkan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredStudents.length)} dari{" "}
                {filteredStudents.length} data
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

      {/* Student Details Dialog */}
      {selectedStudent && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Detail Mahasiswa Non-Reguler</DialogTitle>
              <DialogDescription>Informasi lengkap mahasiswa {selectedStudent.name}</DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 py-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 space-y-4">
                    <div className="flex items-center justify-center h-48 w-48 mx-auto bg-muted rounded-md">
                      <User className="h-24 w-24 text-muted-foreground" />
                    </div>

                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedStudent.nim}</p>
                      <div className="flex justify-center gap-2 mt-2">
                        {renderStatusBadge(selectedStudent.status)}
                        {renderProgramBadge(selectedStudent.program)}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <Tabs defaultValue="personal">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
                        <TabsTrigger value="academic">Akademik</TabsTrigger>
                        <TabsTrigger value="financial">Keuangan</TabsTrigger>
                        <TabsTrigger value="documents">Dokumen</TabsTrigger>
                      </TabsList>

                      <TabsContent value="personal" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Nama Lengkap</p>
                            <p className="text-sm">{selectedStudent.name}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Jenis Kelamin</p>
                            <p className="text-sm">{selectedStudent.gender === "male" ? "Laki-laki" : "Perempuan"}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Tempat, Tanggal Lahir</p>
                            <p className="text-sm">
                              {selectedStudent.birthPlace}, {selectedStudent.birthDate}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Agama</p>
                            <p className="text-sm">{selectedStudent.religion}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Kewarganegaraan</p>
                            <p className="text-sm">{selectedStudent.nationality}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Kontak</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{selectedStudent.email}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <p className="text-sm">{selectedStudent.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 mt-2">
                            <Home className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm">{selectedStudent.address}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Kontak Darurat</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Nama</p>
                              <p className="text-sm">{selectedStudent.emergencyContact.name}</p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium">Hubungan</p>
                              <p className="text-sm">{selectedStudent.emergencyContact.relationship}</p>
                            </div>

                            <div className="space-y-1">
                              <p className="text-sm font-medium">Telepon</p>
                              <p className="text-sm">{selectedStudent.emergencyContact.phone}</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="academic" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Program</p>
                            <p className="text-sm">{renderProgramBadge(selectedStudent.program)}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Jurusan</p>
                            <p className="text-sm">{selectedStudent.department}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Tahun Masuk</p>
                            <p className="text-sm">{selectedStudent.entryYear}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Semester</p>
                            <p className="text-sm">{selectedStudent.semester}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm">{renderStatusBadge(selectedStudent.status)}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">IPK</p>
                            <p className="text-sm">{selectedStudent.gpa.toFixed(2)}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Total SKS</p>
                            <p className="text-sm">{selectedStudent.totalCredits}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Catatan Akademik</p>
                          <p className="text-sm">{selectedStudent.notes || "Tidak ada catatan"}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="financial" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Status Pembayaran</p>
                            <p className="text-sm">{renderPaymentBadge(selectedStudent.paymentStatus)}</p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Tanggal Pembayaran Terakhir</p>
                            <p className="text-sm">{selectedStudent.lastPaymentDate || "Belum ada pembayaran"}</p>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Riwayat Pembayaran</p>
                          <p className="text-sm text-muted-foreground">Tidak ada data riwayat pembayaran</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="documents" className="space-y-4 mt-4">
                        <div className="space-y-4">
                          {selectedStudent.documents.length > 0 ? (
                            selectedStudent.documents.map((doc) => (
                              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">{doc.name}</p>
                                    <p className="text-xs text-muted-foreground">Diunggah pada {doc.uploadDate}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {doc.verified ? (
                                    <Badge variant="success" className="flex items-center gap-1">
                                      <CheckCircle className="h-3 w-3" />
                                      Terverifikasi
                                    </Badge>
                                  ) : (
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      Menunggu Verifikasi
                                    </Badge>
                                  )}
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground">Tidak ada dokumen</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Tutup
              </Button>
              <Button
                onClick={() => {
                  setIsDetailsOpen(false)
                  handleEditStudent(selectedStudent)
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Student Dialog */}
      {selectedStudent && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit Data Mahasiswa</DialogTitle>
              <DialogDescription>Edit informasi mahasiswa {selectedStudent.name}</DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-6 py-4">
                <Tabs defaultValue="personal">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Data Pribadi</TabsTrigger>
                    <TabsTrigger value="academic">Akademik</TabsTrigger>
                    <TabsTrigger value="financial">Keuangan</TabsTrigger>
                    <TabsTrigger value="documents">Dokumen</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" defaultValue={selectedStudent.name} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Jenis Kelamin</Label>
                        <Select defaultValue={selectedStudent.gender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Laki-laki</SelectItem>
                            <SelectItem value="female">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthPlace">Tempat Lahir</Label>
                        <Input id="birthPlace" defaultValue={selectedStudent.birthPlace} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthDate">Tanggal Lahir</Label>
                        <Input id="birthDate" type="date" defaultValue={selectedStudent.birthDate} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="religion">Agama</Label>
                        <Select defaultValue={selectedStudent.religion}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih agama" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Islam">Islam</SelectItem>
                            <SelectItem value="Kristen">Kristen</SelectItem>
                            <SelectItem value="Katolik">Katolik</SelectItem>
                            <SelectItem value="Hindu">Hindu</SelectItem>
                            <SelectItem value="Buddha">Buddha</SelectItem>
                            <SelectItem value="Konghucu">Konghucu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nationality">Kewarganegaraan</Label>
                        <Input id="nationality" defaultValue={selectedStudent.nationality} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={selectedStudent.email} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telepon</Label>
                        <Input id="phone" defaultValue={selectedStudent.phone} />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Textarea id="address" defaultValue={selectedStudent.address} />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Kontak Darurat</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyName">Nama</Label>
                          <Input id="emergencyName" defaultValue={selectedStudent.emergencyContact.name} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="emergencyRelationship">Hubungan</Label>
                          <Input
                            id="emergencyRelationship"
                            defaultValue={selectedStudent.emergencyContact.relationship}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="emergencyPhone">Telepon</Label>
                          <Input id="emergencyPhone" defaultValue={selectedStudent.emergencyContact.phone} />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="academic" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nim">NIM</Label>
                        <Input id="nim" defaultValue={selectedStudent.nim} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="program">Program</Label>
                        <Select defaultValue={selectedStudent.program}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih program" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="extension">Ekstensi</SelectItem>
                            <SelectItem value="weekend">Akhir Pekan</SelectItem>
                            <SelectItem value="evening">Kelas Malam</SelectItem>
                            <SelectItem value="online">Daring</SelectItem>
                            <SelectItem value="executive">Eksekutif</SelectItem>
                            <SelectItem value="international">Internasional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Jurusan</Label>
                        <Input id="department" defaultValue={selectedStudent.department} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="entryYear">Tahun Masuk</Label>
                        <Input id="entryYear" type="number" defaultValue={selectedStudent.entryYear} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Input id="semester" type="number" defaultValue={selectedStudent.semester} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select defaultValue={selectedStudent.status}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="inactive">Tidak Aktif</SelectItem>
                            <SelectItem value="graduated">Lulus</SelectItem>
                            <SelectItem value="on_leave">Cuti</SelectItem>
                            <SelectItem value="transferred">Pindah</SelectItem>
                            <SelectItem value="dropped_out">DO</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gpa">IPK</Label>
                        <Input id="gpa" type="number" step="0.01" defaultValue={selectedStudent.gpa} />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="totalCredits">Total SKS</Label>
                        <Input id="totalCredits" type="number" defaultValue={selectedStudent.totalCredits} />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="notes">Catatan Akademik</Label>
                      <Textarea id="notes" defaultValue={selectedStudent.notes || ""} />
                    </div>
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="paymentStatus">Status Pembayaran</Label>
                        <Select defaultValue={selectedStudent.paymentStatus}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status pembayaran" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="paid">Lunas</SelectItem>
                            <SelectItem value="partial">Sebagian</SelectItem>
                            <SelectItem value="unpaid">Belum Bayar</SelectItem>
                            <SelectItem value="overdue">Terlambat</SelectItem>
                            <SelectItem value="waived">Dibebaskan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastPaymentDate">Tanggal Pembayaran Terakhir</Label>
                        <Input id="lastPaymentDate" type="date" defaultValue={selectedStudent.lastPaymentDate} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      {selectedStudent.documents.length > 0 ? (
                        selectedStudent.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{doc.name}</p>
                                <p className="text-xs text-muted-foreground">Diunggah pada {doc.uploadDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                <Checkbox id={`verified-${doc.id}`} defaultChecked={doc.verified} />
                                <Label htmlFor={`verified-${doc.id}`} className="text-sm">
                                  Terverifikasi
                                </Label>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">Tidak ada dokumen</p>
                      )}

                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Dokumen
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setIsEditOpen(false)}>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

