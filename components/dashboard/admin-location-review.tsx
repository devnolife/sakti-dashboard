"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Building, Search, Clock, CheckCircle2, XCircle, Filter, Eye, ThumbsUp, ThumbsDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Application status type
type ApplicationStatus = "pending" | "approved" | "rejected"

// Application interface
interface LocationApplication {
  id: string
  studentName: string
  studentId: string
  companyName: string
  industry: string
  city: string
  address: string
  positions: string[]
  description: string
  contact: {
    name: string
    position: string
    email: string
    phone: string
  }
  status: ApplicationStatus
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  notes?: string
}

export default function AdminLocationReview() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplication, setSelectedApplication] = useState<LocationApplication | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [reviewNotes, setReviewNotes] = useState("")
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  // Sample data for applications
  const [applications, setApplications] = useState<LocationApplication[]>([
    {
      id: "app-001",
      studentName: "Andi Saputra",
      studentId: "12345678",
      companyName: "PT Inovasi Teknologi",
      industry: "Teknologi Informasi",
      city: "Surabaya",
      address: "Jl. Raya Darmo No. 45, Surabaya",
      positions: ["Web Developer", "Mobile Developer"],
      description:
        "PT Inovasi Teknologi adalah perusahaan startup yang fokus pada pengembangan aplikasi web dan mobile untuk berbagai industri.",
      contact: {
        name: "Rina Wijaya",
        position: "CTO",
        email: "rina.wijaya@inotek.co.id",
        phone: "031-5556789",
      },
      status: "pending",
      submittedDate: "10 September 2023",
    },
    {
      id: "app-002",
      studentName: "Budi Pratama",
      studentId: "23456789",
      companyName: "CV Desain Kreatif",
      industry: "Media & Komunikasi",
      city: "Yogyakarta",
      address: "Jl. Malioboro No. 123, Yogyakarta",
      positions: ["Graphic Designer", "UI/UX Designer"],
      description:
        "CV Desain Kreatif adalah studio desain yang menyediakan layanan desain grafis, branding, dan UI/UX untuk berbagai klien.",
      contact: {
        name: "Agus Santoso",
        position: "Creative Director",
        email: "agus.santoso@desainkreatif.com",
        phone: "0274-567890",
      },
      status: "approved",
      submittedDate: "5 Agustus 2023",
      reviewedDate: "15 Agustus 2023",
      reviewedBy: "Dr. Bambang Sutanto",
      notes:
        "Lokasi disetujui. Sesuai dengan program studi dan memiliki lingkungan kerja yang baik untuk pembelajaran mahasiswa.",
    },
    {
      id: "app-003",
      studentName: "Citra Dewi",
      studentId: "34567890",
      companyName: "PT Logistik Cepat",
      industry: "Logistik & Transportasi",
      city: "Jakarta",
      address: "Jl. Raya Kelapa Gading No. 78, Jakarta Utara",
      positions: ["Supply Chain Analyst", "Logistics Coordinator"],
      description:
        "PT Logistik Cepat adalah perusahaan logistik yang menyediakan layanan pengiriman dan manajemen rantai pasok untuk berbagai industri.",
      contact: {
        name: "Hendra Gunawan",
        position: "Operations Manager",
        email: "hendra.gunawan@logistikcepat.com",
        phone: "021-4567890",
      },
      status: "rejected",
      submittedDate: "20 Juli 2023",
      reviewedDate: "1 Agustus 2023",
      reviewedBy: "Dr. Bambang Sutanto",
      notes:
        "Lokasi ditolak karena tidak sesuai dengan program studi. Silakan pilih lokasi lain yang lebih relevan dengan bidang studi mahasiswa.",
    },
    {
      id: "app-004",
      studentName: "Dian Permata",
      studentId: "45678901",
      companyName: "Koperasi Sejahtera",
      industry: "Keuangan",
      city: "Bandung",
      address: "Jl. Asia Afrika No. 56, Bandung",
      positions: ["Financial Analyst", "Credit Officer"],
      description:
        "Koperasi Sejahtera adalah lembaga keuangan mikro yang menyediakan layanan simpan pinjam dan pemberdayaan ekonomi untuk masyarakat.",
      contact: {
        name: "Siti Aminah",
        position: "Manager",
        email: "siti.aminah@koperasisejahtera.co.id",
        phone: "022-3456789",
      },
      status: "pending",
      submittedDate: "12 September 2023",
    },
    {
      id: "app-005",
      studentName: "Eko Prasetyo",
      studentId: "56789012",
      companyName: "PT Konstruksi Utama",
      industry: "Konstruksi",
      city: "Semarang",
      address: "Jl. Pemuda No. 45, Semarang",
      positions: ["Project Management", "Civil Engineering"],
      description:
        "PT Konstruksi Utama adalah perusahaan konstruksi yang mengerjakan proyek-proyek infrastruktur dan bangunan komersial di seluruh Indonesia.",
      contact: {
        name: "Joko Widodo",
        position: "Project Director",
        email: "joko.widodo@konstruksiutama.com",
        phone: "024-7654321",
      },
      status: "pending",
      submittedDate: "8 September 2023",
    },
  ])

  // Filter applications based on active tab and search query
  const filteredApplications = applications.filter((app) => {
    // Search filter
    const matchesSearch =
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.city.toLowerCase().includes(searchQuery.toLowerCase())

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && app.status === "pending") ||
      (activeTab === "approved" && app.status === "approved") ||
      (activeTab === "rejected" && app.status === "rejected")

    return matchesSearch && matchesTab
  })

  // Handle approve application
  const handleApproveApplication = () => {
    if (!selectedApplication) return

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      const updatedApplications = applications.map((app) => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            status: "approved" as ApplicationStatus,
            reviewedDate: new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            reviewedBy: "Dr. Bambang Sutanto",
            notes: reviewNotes || "Lokasi disetujui.",
          }
        }
        return app
      })

      setApplications(updatedApplications)
      setIsProcessing(false)
      setShowApproveDialog(false)
      setSelectedApplication(null)
      setReviewNotes("")
    }, 1500)
  }

  // Handle reject application
  const handleRejectApplication = () => {
    if (!selectedApplication) return

    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      const updatedApplications = applications.map((app) => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            status: "rejected" as ApplicationStatus,
            reviewedDate: new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            reviewedBy: "Dr. Bambang Sutanto",
            notes: reviewNotes || "Lokasi ditolak.",
          }
        }
        return app
      })

      setApplications(updatedApplications)
      setIsProcessing(false)
      setShowRejectDialog(false)
      setSelectedApplication(null)
      setReviewNotes("")
    }, 1500)
  }

  // Get status badge
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Review Lokasi Magang
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Review dan kelola pengajuan lokasi magang baru dari mahasiswa</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengajuan</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Building className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applications.length}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {applications.filter((app) => app.status === "pending").length} menunggu review
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applications.filter((app) => app.status === "approved").length}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {Math.round(
                  (applications.filter((app) => app.status === "approved").length / applications.length) * 100,
                )}
                % dari total pengajuan
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{applications.filter((app) => app.status === "rejected").length}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {Math.round(
                  (applications.filter((app) => app.status === "rejected").length / applications.length) * 100,
                )}
                % dari total pengajuan
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pengajuan..."
              className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Daftar Pengajuan Lokasi</CardTitle>
          <CardDescription>Review dan kelola pengajuan lokasi magang dari mahasiswa</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApplications.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Nama Perusahaan</TableHead>
                    <TableHead>Mahasiswa</TableHead>
                    <TableHead>NIM</TableHead>
                    <TableHead>Industri</TableHead>
                    <TableHead>Tanggal Pengajuan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.companyName}</TableCell>
                      <TableCell>{app.studentName}</TableCell>
                      <TableCell>{app.studentId}</TableCell>
                      <TableCell>{app.industry}</TableCell>
                      <TableCell>{app.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(app.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedApplication(app)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Detail
                          </Button>
                          {app.status === "pending" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-500 hover:text-green-700 hover:bg-green-100"
                                onClick={() => {
                                  setSelectedApplication(app)
                                  setShowApproveDialog(true)
                                }}
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Setujui
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                onClick={() => {
                                  setSelectedApplication(app)
                                  setShowRejectDialog(true)
                                }}
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                Tolak
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">Tidak ada pengajuan</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tidak ada pengajuan lokasi magang yang sesuai dengan filter
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      {selectedApplication && (
        <Dialog
          open={!!selectedApplication && !showApproveDialog && !showRejectDialog}
          onOpenChange={(open) => !open && setSelectedApplication(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedApplication.companyName}</DialogTitle>
              <DialogDescription>
                {selectedApplication.industry} • {selectedApplication.city}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  ID Pengajuan: <span className="font-medium">{selectedApplication.id}</span>
                </div>
                {getStatusBadge(selectedApplication.status)}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informasi Mahasiswa</h4>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">{selectedApplication.studentName}</p>
                  <p className="text-xs text-muted-foreground">NIM: {selectedApplication.studentId}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Alamat</h4>
                <p className="text-sm text-muted-foreground">{selectedApplication.address}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Deskripsi</h4>
                <p className="text-sm text-muted-foreground">{selectedApplication.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Posisi Magang</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.positions.map((position, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10">
                      {position}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Kontak</h4>
                <div className="rounded-md bg-muted p-3">
                  <p className="text-sm font-medium">{selectedApplication.contact.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedApplication.contact.position}</p>
                  <div className="mt-2 text-xs">
                    <p>Email: {selectedApplication.contact.email}</p>
                    <p>Telepon: {selectedApplication.contact.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Informasi Pengajuan</h4>
                <div className="rounded-md bg-muted p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Tanggal Pengajuan:</span>
                    <span className="text-xs">{selectedApplication.submittedDate}</span>
                  </div>
                  {selectedApplication.reviewedDate && (
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Tanggal Review:</span>
                      <span className="text-xs">{selectedApplication.reviewedDate}</span>
                    </div>
                  )}
                  {selectedApplication.reviewedBy && (
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">Direview oleh:</span>
                      <span className="text-xs">{selectedApplication.reviewedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedApplication.notes && (
                <div
                  className={cn(
                    "p-3 rounded-md",
                    selectedApplication.status === "approved"
                      ? "bg-green-500/10"
                      : selectedApplication.status === "rejected"
                        ? "bg-red-500/10"
                        : "bg-amber-500/10",
                  )}
                >
                  <div className="flex items-start gap-2">
                    {selectedApplication.status === "approved" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    ) : selectedApplication.status === "rejected" ? (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    ) : (
                      <Clock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-medium">
                        {selectedApplication.status === "approved"
                          ? "Catatan Persetujuan"
                          : selectedApplication.status === "rejected"
                            ? "Alasan Penolakan"
                            : "Catatan"}
                      </h4>
                      <p className="text-xs mt-1">{selectedApplication.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Dialog */}
      {selectedApplication && (
        <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Setujui Pengajuan Lokasi</DialogTitle>
              <DialogDescription>
                Anda akan menyetujui pengajuan lokasi magang dari {selectedApplication.studentName} di{" "}
                {selectedApplication.companyName}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Catatan Persetujuan (Opsional)
                </label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan untuk mahasiswa..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
                Batal
              </Button>
              <Button
                onClick={handleApproveApplication}
                disabled={isProcessing}
                className="bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? "Memproses..." : "Setujui Pengajuan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Dialog */}
      {selectedApplication && (
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tolak Pengajuan Lokasi</DialogTitle>
              <DialogDescription>
                Anda akan menolak pengajuan lokasi magang dari {selectedApplication.studentName} di{" "}
                {selectedApplication.companyName}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="notes"
                  placeholder="Berikan alasan penolakan untuk mahasiswa..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
                <p className="text-xs text-muted-foreground">Alasan penolakan akan ditampilkan kepada mahasiswa.</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Batal
              </Button>
              <Button
                onClick={handleRejectApplication}
                disabled={isProcessing || !reviewNotes.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                {isProcessing ? "Memproses..." : "Tolak Pengajuan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

