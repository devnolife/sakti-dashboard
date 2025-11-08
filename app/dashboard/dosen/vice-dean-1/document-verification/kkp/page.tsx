"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Users,
  Building,
  FileText,
  Search,
  ExternalLink,
  Signature,
  Shield,
  MapPin,
  Calendar,
  Mail,
  Phone,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"

interface KkpApplication {
  id: string
  title: string
  submissionDate: Date
  student: {
    id: string
    name: string
    nim: string
    major: string
    semester: number
    email: string
    phone: string
  }
  groupMembers: Array<{
    id: string
    name: string
    nim: string
    major: string
    semester: number
  }>
  company: {
    name: string
    address: string
    city: string
    contactPerson: string
    contactPhone: string
    industry: string
  }
  status: "pending_wd1" | "approved_wd1" | "rejected_wd1"
  description: string
  startDate: Date
  endDate: Date
  prodiApprovalDate: Date
}

export default function KkpVerificationPage() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending_wd1" | "approved_wd1" | "rejected_wd1">("all")
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Sample data for KKP applications awaiting WD1 approval
  useEffect(() => {
    const mockApplications: KkpApplication[] = [
      {
        id: "kkp-2024-001",
        title: "Pengembangan Sistem Informasi Manajemen",
        submissionDate: new Date("2024-01-15"),
        student: {
          id: "std-001",
          name: "Ahmad Fauzi",
          nim: "1234567890",
          major: "Informatika",
          semester: 7,
          email: "ahmad.fauzi@example.com",
          phone: "081234567890",
        },
        groupMembers: [
          {
            id: "std-002",
            name: "Budi Santoso",
            nim: "1234567891",
            major: "Informatika",
            semester: 7,
          },
          {
            id: "std-003",
            name: "Citra Dewi",
            nim: "1234567892",
            major: "Informatika",
            semester: 7,
          },
        ],
        company: {
          name: "PT Teknologi Maju Indonesia",
          address: "Jl. Sudirman No. 123, Jakarta Selatan",
          city: "Jakarta",
          contactPerson: "John Doe",
          contactPhone: "021-1234567",
          industry: "Technology",
        },
        status: "pending_wd1",
        description: "Mengembangkan sistem informasi manajemen untuk meningkatkan efisiensi operasional perusahaan.",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-05-31"),
        prodiApprovalDate: new Date("2024-01-18"),
      },
      {
        id: "kkp-2024-004",
        title: "E-Commerce Platform Development",
        submissionDate: new Date("2024-01-25"),
        student: {
          id: "std-007",
          name: "Gita Permata",
          nim: "1234567896",
          major: "Informatika",
          semester: 7,
          email: "gita.permata@example.com",
          phone: "081234567893",
        },
        groupMembers: [
          {
            id: "std-008",
            name: "Hendra Wijaya",
            nim: "1234567897",
            major: "Informatika",
            semester: 7,
          },
        ],
        company: {
          name: "PT Digital Commerce",
          address: "Jl. Gatot Subroto No. 89, Surabaya",
          city: "Surabaya",
          contactPerson: "Lisa Chen",
          contactPhone: "031-1234567",
          industry: "E-Commerce",
        },
        status: "pending_wd1",
        description: "Mengembangkan platform e-commerce dengan fitur AI recommendation dan payment gateway terintegrasi.",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-06-30"),
        prodiApprovalDate: new Date("2024-01-26"),
      },
      {
        id: "kkp-2024-002",
        title: "Implementasi AI untuk Customer Service",
        submissionDate: new Date("2024-01-18"),
        student: {
          id: "std-004",
          name: "Diana Putri",
          nim: "1234567893",
          major: "Informatika",
          semester: 7,
          email: "diana.putri@example.com",
          phone: "081234567891",
        },
        groupMembers: [
          {
            id: "std-005",
            name: "Eko Prasetyo",
            nim: "1234567894",
            major: "Informatika",
            semester: 7,
          },
        ],
        company: {
          name: "Bank Nasional Indonesia",
          address: "Jl. MH Thamrin No. 45, Jakarta Pusat",
          city: "Jakarta",
          contactPerson: "Jane Smith",
          contactPhone: "021-7654321",
          industry: "Banking & Finance",
        },
        status: "approved_wd1",
        description: "Mengimplementasikan solusi AI untuk meningkatkan layanan customer service perbankan.",
        startDate: new Date("2024-02-15"),
        endDate: new Date("2024-06-15"),
        prodiApprovalDate: new Date("2024-01-19"),
      },
    ]

    setApplications(mockApplications)
  }, [])

  // Filter applications based on search and status
  const filteredApplications = applications.filter((app) => {
    const matchesSearch = 
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student.nim.includes(searchQuery) ||
      app.company.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_wd1":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Tanda Tangan
          </Badge>
        )
      case "approved_wd1":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Telah Ditandatangani
          </Badge>
        )
      case "rejected_wd1":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return null
    }
  }

  const pendingCount = applications.filter(app => app.status === "pending_wd1").length

  const handleOpenDialog = (application: KkpApplication) => {
    setSelectedApplication(application)
    setIsDialogOpen(true)
    setRejectionReason("")
  }

  const handleApprove = async () => {
    if (!selectedApplication) return

    setIsProcessing(true)
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update status aplikasi
    setApplications(prev =>
      prev.map(app =>
        app.id === selectedApplication.id
          ? { ...app, status: "approved_wd1" as const }
          : app
      )
    )

    setIsProcessing(false)
    setIsDialogOpen(false)
    setSelectedApplication(null)
  }

  const handleReject = async () => {
    if (!selectedApplication || !rejectionReason.trim()) return

    setIsProcessing(true)
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update status aplikasi
    setApplications(prev =>
      prev.map(app =>
        app.id === selectedApplication.id
          ? { ...app, status: "rejected_wd1" as const }
          : app
      )
    )

    setIsProcessing(false)
    setIsDialogOpen(false)
    setSelectedApplication(null)
    setRejectionReason("")
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Verifikasi KKP
          </h1>
          <p className="text-xs text-muted-foreground">
            Tanda tangan digital untuk persetujuan KKP mahasiswa
          </p>
        </div>
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200 text-xs h-fit">
          <Signature className="h-3 w-3 mr-1" />
          {pendingCount} Menunggu TTD
        </Badge>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Total Pengajuan</CardTitle>
            <FileText className="h-3.5 w-3.5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{applications.length}</div>
            <p className="text-[10px] text-muted-foreground">Semester ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Menunggu TTD</CardTitle>
            <Clock className="h-3.5 w-3.5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-500">{pendingCount}</div>
            <p className="text-[10px] text-muted-foreground">Perlu tindak lanjut</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Telah Ditandatangani</CardTitle>
            <CheckCircle className="h-3.5 w-3.5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-500">
              {applications.filter(app => app.status === "approved_wd1").length}
            </div>
            <p className="text-[10px] text-muted-foreground">Selesai diproses</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Cari nama, NIM, judul, atau perusahaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending_wd1", "approved_wd1", "rejected_wd1"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
                  className="h-9 text-xs"
                >
                  {status === "all" && "Semua"}
                  {status === "pending_wd1" && "Menunggu"}
                  {status === "approved_wd1" && "Disetujui"}
                  {status === "rejected_wd1" && "Ditolak"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Daftar Pengajuan KKP</CardTitle>
            <CardDescription className="text-xs">
              {filteredApplications.length} pengajuan
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow className="text-xs">
                  <TableHead className="text-xs">Mahasiswa</TableHead>
                  <TableHead className="text-xs">Judul KKP</TableHead>
                  <TableHead className="text-xs">Perusahaan</TableHead>
                  <TableHead className="text-xs">Tim</TableHead>
                  <TableHead className="text-xs">Tgl. Prodi</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id} className="text-xs">
                    <TableCell>
                      <div>
                        <p className="font-medium text-xs">{application.student.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {application.student.nim}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate text-xs">{application.title}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {application.startDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} - {application.endDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-xs">{application.company.name}</p>
                        <p className="text-[10px] text-muted-foreground">{application.company.city}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{application.groupMembers.length + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-xs">{application.prodiApprovalDate.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(application)}
                        className="h-8 text-xs"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredApplications.length === 0 && (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <FileText className="w-10 h-10 mb-3 text-muted-foreground" />
                <h3 className="text-sm font-medium">Tidak ada pengajuan</h3>
                <p className="text-xs text-muted-foreground">
                  Belum ada pengajuan KKP yang sesuai kriteria.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Important Note */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 text-xs mb-1">Informasi Tanda Tangan Digital</h3>
              <div className="text-[10px] text-blue-700 space-y-1">
                <p>• Klik "Detail" untuk melihat informasi lengkap dan memberikan persetujuan</p>
                <p>• Dokumen akan ditandatangani menggunakan sertifikat digital yang valid</p>
                <p>• TTD digital memiliki kekuatan hukum sesuai UU No. 11 Tahun 2008 tentang ITE</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Verifikasi Dokumen KKP
            </DialogTitle>
            <DialogDescription>
              Tinjau detail pengajuan KKP dan berikan persetujuan atau penolakan
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6 py-4">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{selectedApplication.title}</h3>
                {getStatusBadge(selectedApplication.status)}
              </div>

              {/* Student Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Informasi Mahasiswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nama Ketua</p>
                      <p className="font-medium">{selectedApplication.student.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NIM</p>
                      <p className="font-medium">{selectedApplication.student.nim}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Program Studi</p>
                      <p className="font-medium">{selectedApplication.student.major}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Semester</p>
                      <p className="font-medium">{selectedApplication.student.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </p>
                      <p className="font-medium">{selectedApplication.student.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Telepon
                      </p>
                      <p className="font-medium">{selectedApplication.student.phone}</p>
                    </div>
                  </div>

                  {selectedApplication.groupMembers.length > 0 && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Anggota Tim</p>
                      <div className="space-y-2">
                        {selectedApplication.groupMembers.map((member, idx) => (
                          <div key={member.id} className="flex items-center gap-2 text-sm">
                            <Badge variant="outline">{idx + 2}</Badge>
                            <span className="font-medium">{member.name}</span>
                            <span className="text-muted-foreground">({member.nim})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Informasi Perusahaan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Nama Perusahaan</p>
                      <p className="font-medium">{selectedApplication.company.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Industri</p>
                      <p className="font-medium">{selectedApplication.company.industry}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Alamat
                      </p>
                      <p className="font-medium">{selectedApplication.company.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kontak Person</p>
                      <p className="font-medium">{selectedApplication.company.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telepon</p>
                      <p className="font-medium">{selectedApplication.company.contactPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* KKP Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Detail KKP
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Deskripsi Kegiatan</p>
                    <p className="font-medium">{selectedApplication.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Tanggal Mulai
                      </p>
                      <p className="font-medium">{selectedApplication.startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Tanggal Selesai
                      </p>
                      <p className="font-medium">{selectedApplication.endDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Disetujui Prodi</p>
                      <p className="font-medium">{selectedApplication.prodiApprovalDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rejection Reason (only show if rejecting) */}
              {selectedApplication.status === "pending_wd1" && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-base">Catatan Penolakan (Opsional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Berikan alasan jika menolak pengajuan ini..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={3}
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedApplication?.status === "pending_wd1" ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isProcessing}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isProcessing || !rejectionReason.trim()}
                >
                  {isProcessing ? (
                    <>
                      <XCircle className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Tolak
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Signature className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <Signature className="mr-2 h-4 w-4" />
                      Tanda Tangan & Setujui
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}