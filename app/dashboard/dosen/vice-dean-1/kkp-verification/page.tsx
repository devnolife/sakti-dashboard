"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
} from "lucide-react"
import Link from "next/link"

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
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending_wd1" | "approved_wd1" | "rejected_wd1">("all")

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Verifikasi KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Tanda tangan digital untuk persetujuan KKP mahasiswa
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Signature className="h-3.5 w-3.5 mr-1" />
            {pendingCount} Menunggu Tanda Tangan
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengajuan</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">
              Semester ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu Tanda Tangan</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Perlu segera ditindaklanjuti
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Telah Ditandatangani</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {applications.filter(app => app.status === "approved_wd1").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Selesai diproses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Pencarian & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Cari berdasarkan nama mahasiswa, NIM, judul, atau perusahaan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["all", "pending_wd1", "approved_wd1", "rejected_wd1"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
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
        <CardHeader>
          <CardTitle>Daftar Pengajuan KKP</CardTitle>
          <CardDescription>
            Total {filteredApplications.length} pengajuan ditemukan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead>Judul KKP</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Tim</TableHead>
                  <TableHead>Tgl. Persetujuan Prodi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.student.nim} • {application.student.major}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{application.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {application.startDate.toLocaleDateString()} - {application.endDate.toLocaleDateString()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.company.name}</p>
                        <p className="text-sm text-muted-foreground">{application.company.city}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{application.groupMembers.length + 1} orang</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{application.prodiApprovalDate.toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/verifikasi/${application.id}`} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Verifikasi
                          </Link>
                        </Button>
                        {application.status === "pending_wd1" && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            <Signature className="w-3 h-3 mr-1" />
                            TTD Diperlukan
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredApplications.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Tidak ada pengajuan ditemukan</h3>
                <p className="text-sm text-muted-foreground">
                  Belum ada pengajuan KKP yang sesuai dengan kriteria pencarian.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Important Note */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Informasi Tanda Tangan Digital</h3>
              <div className="text-sm text-blue-700 space-y-2">
                <p>
                  • Klik tombol "Verifikasi" untuk membuka halaman tanda tangan digital
                </p>
                <p>
                  • Setiap dokumen akan ditandatangani menggunakan sertifikat digital yang valid
                </p>
                <p>
                  • Tanda tangan digital memiliki kekuatan hukum sesuai UU No. 11 Tahun 2008 tentang ITE
                </p>
                <p>
                  • Notifikasi akan dikirim otomatis setelah proses tanda tangan selesai
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}