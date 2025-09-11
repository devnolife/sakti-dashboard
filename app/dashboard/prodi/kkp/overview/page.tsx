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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Users,
  Building,
  TrendingUp,
  FileText,
  BarChart3,
  CalendarDays,
  Search,
  Filter,
  Download,
} from "lucide-react"
import { cn } from "@/lib/utils"

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
  status: "pending" | "approved" | "rejected" | "in_progress" | "completed"
  description: string
  startDate: Date
  endDate: Date
  supervisorAssigned?: {
    id: string
    name: string
    nip: string
  }
}

interface KkpStats {
  total: number
  pending: number
  approved: number
  inProgress: number
  completed: number
  rejected: number
}

export default function KkpOverviewPage() {
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected" | "in_progress" | "completed">("all")
  const [stats, setStats] = useState<KkpStats>({
    total: 0,
    pending: 0,
    approved: 0,
    inProgress: 0,
    completed: 0,
    rejected: 0,
  })

  // Sample data for KKP applications
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
        status: "approved",
        description: "Mengembangkan sistem informasi manajemen untuk meningkatkan efisiensi operasional perusahaan.",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-05-31"),
        supervisorAssigned: {
          id: "dosen-001",
          name: "Dr. Bambang Sutrisno, M.Kom",
          nip: "197501012005011001",
        },
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
        status: "in_progress",
        description: "Mengimplementasikan solusi AI untuk meningkatkan layanan customer service perbankan.",
        startDate: new Date("2024-02-15"),
        endDate: new Date("2024-06-15"),
        supervisorAssigned: {
          id: "dosen-002",
          name: "Dr. Sari Wahyuni, M.T",
          nip: "198203152008012002",
        },
      },
      {
        id: "kkp-2024-003",
        title: "Sistem Monitoring IoT untuk Smart Building",
        submissionDate: new Date("2024-01-20"),
        student: {
          id: "std-006",
          name: "Farid Rahman",
          nim: "1234567895",
          major: "Informatika",
          semester: 7,
          email: "farid.rahman@example.com",
          phone: "081234567892",
        },
        groupMembers: [],
        company: {
          name: "PT Smart Building Solutions",
          address: "Jl. Diponegoro No. 78, Bandung",
          city: "Bandung",
          contactPerson: "Robert Johnson",
          contactPhone: "022-1234567",
          industry: "Technology",
        },
        status: "completed",
        description: "Mengembangkan sistem monitoring IoT untuk gedung pintar guna meningkatkan efisiensi energi.",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-04-30"),
        supervisorAssigned: {
          id: "dosen-003",
          name: "Prof. Dr. Ahmad Yani, M.Sc",
          nip: "196812251994031003",
        },
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
        status: "pending",
        description: "Mengembangkan platform e-commerce dengan fitur AI recommendation dan payment gateway terintegrasi.",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-06-30"),
      },
    ]

    setApplications(mockApplications)

    // Calculate stats
    const newStats: KkpStats = {
      total: mockApplications.length,
      pending: mockApplications.filter(app => app.status === "pending").length,
      approved: mockApplications.filter(app => app.status === "approved").length,
      inProgress: mockApplications.filter(app => app.status === "in_progress").length,
      completed: mockApplications.filter(app => app.status === "completed").length,
      rejected: mockApplications.filter(app => app.status === "rejected").length,
    }
    setStats(newStats)
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
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-500/10">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            Berlangsung
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      case "rejected":
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

  // Handle viewing application details
  const handleViewDetails = (application: KkpApplication) => {
    setSelectedApplication(application)
    setDetailDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Overview KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Pantau seluruh kegiatan KKP mahasiswa program studi
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Laporan
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total KKP</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Semester ini
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menunggu</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Perlu review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">
              Siap mulai
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Berlangsung</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              Aktif
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              Berhasil
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">
              Perlu perbaikan
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari berdasarkan nama mahasiswa, NIM, judul, atau perusahaan..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "pending", "approved", "in_progress", "completed", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
                >
                  {status === "all" && "Semua"}
                  {status === "pending" && "Menunggu"}
                  {status === "approved" && "Disetujui"}
                  {status === "in_progress" && "Berlangsung"}
                  {status === "completed" && "Selesai"}
                  {status === "rejected" && "Ditolak"}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar KKP Mahasiswa</CardTitle>
          <CardDescription>
            Total {filteredApplications.length} KKP ditemukan
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
                  <TableHead>Pembimbing</TableHead>
                  <TableHead>Periode</TableHead>
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
                          {application.student.nim} • Semester {application.student.semester}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium truncate">{application.title}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {application.id}
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
                      {application.supervisorAssigned ? (
                        <div>
                          <p className="text-sm font-medium">{application.supervisorAssigned.name}</p>
                          <p className="text-xs text-muted-foreground">{application.supervisorAssigned.nip}</p>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-500/10">
                          Belum ditugaskan
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm">{application.startDate.toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">- {application.endDate.toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(application)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredApplications.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Tidak ada KKP ditemukan</h3>
                <p className="text-sm text-muted-foreground">
                  Belum ada KKP yang sesuai dengan kriteria pencarian.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail KKP</DialogTitle>
            <DialogDescription>
              Informasi lengkap KKP {selectedApplication?.student.name}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Informasi Mahasiswa</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Nama:</span> {selectedApplication.student.name}</p>
                      <p><span className="font-medium">NIM:</span> {selectedApplication.student.nim}</p>
                      <p><span className="font-medium">Jurusan:</span> {selectedApplication.student.major}</p>
                      <p><span className="font-medium">Semester:</span> {selectedApplication.student.semester}</p>
                      <p><span className="font-medium">Email:</span> {selectedApplication.student.email}</p>
                      <p><span className="font-medium">Telepon:</span> {selectedApplication.student.phone}</p>
                    </div>
                  </div>

                  {selectedApplication.groupMembers.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Anggota Tim</h3>
                      <div className="space-y-2">
                        {selectedApplication.groupMembers.map((member, index) => (
                          <div key={member.id} className="p-3 bg-muted/50 rounded-lg">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.nim} • {member.major} • Semester {member.semester}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedApplication.supervisorAssigned && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Pembimbing</h3>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium">{selectedApplication.supervisorAssigned.name}</p>
                        <p className="text-sm text-muted-foreground">
                          NIP: {selectedApplication.supervisorAssigned.nip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Informasi Perusahaan</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Nama:</span> {selectedApplication.company.name}</p>
                      <p><span className="font-medium">Industri:</span> {selectedApplication.company.industry}</p>
                      <p><span className="font-medium">Alamat:</span> {selectedApplication.company.address}</p>
                      <p><span className="font-medium">Kota:</span> {selectedApplication.company.city}</p>
                      <p><span className="font-medium">Kontak Person:</span> {selectedApplication.company.contactPerson}</p>
                      <p><span className="font-medium">Telepon:</span> {selectedApplication.company.contactPhone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Detail KKP</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Judul:</span> {selectedApplication.title}</p>
                      <p><span className="font-medium">Periode:</span> {selectedApplication.startDate.toLocaleDateString()} - {selectedApplication.endDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">Tanggal Pengajuan:</span> {selectedApplication.submissionDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">Deskripsi:</span></p>
                      <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {selectedApplication.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  {getStatusBadge(selectedApplication.status)}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}