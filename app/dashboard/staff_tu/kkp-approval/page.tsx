"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  MapPin,
  FileText,
  Send,
  Filter,
  Search,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { sendWD1Notification, sendStudentNotification } from "@/lib/whatsapp-service"

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
  status: "pending" | "approved" | "rejected"
  description: string
  startDate: Date
  endDate: Date
  documents: Array<{
    name: string
    type: string
    url: string
  }>
}

export default function KkpApprovalPage() {
  const { toast } = useToast()

  // Safe toast function with fallback
  const showToast = (options: { title: string; description: string; variant?: string }) => {
    try {
      if (toast && typeof toast === 'function') {
        toast(options)
      } else {
        console.log('Toast:', options.title, '-', options.description)
      }
    } catch (error) {
      console.log('Toast error:', options.title, '-', options.description)
    }
  }
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null)
  const [approvalNotes, setApprovalNotes] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        status: "pending",
        description: "Mengembangkan sistem informasi manajemen untuk meningkatkan efisiensi operasional perusahaan.",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-05-31"),
        documents: [
          {
            name: "KKP_Ahmad_Fauzi.pdf",
            type: "proposal",
            url: "/documents/proposal_kkp_ahmad_fauzi.pdf",
          },
          {
            name: "Surat_KKP.pdf",
            type: "application-letter",
            url: "/documents/surat_lamaran_kkp.pdf",
          },
        ],
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
        status: "approved",
        description: "Mengimplementasikan solusi AI untuk meningkatkan layanan customer service perbankan.",
        startDate: new Date("2024-02-15"),
        endDate: new Date("2024-06-15"),
        documents: [
          {
            name: "Proposal_KKP_Diana_Putri.pdf",
            type: "proposal",
            url: "/documents/proposal_kkp_diana_putri.pdf",
          },
        ],
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
        status: "rejected",
        description: "Mengembangkan sistem monitoring IoT untuk gedung pintar guna meningkatkan efisiensi energi.",
        startDate: new Date("2024-03-01"),
        endDate: new Date("2024-06-30"),
        documents: [
          {
            name: "Proposal_KKP_Farid_Rahman.pdf",
            type: "proposal",
            url: "/documents/proposal_kkp_farid_rahman.pdf",
          },
        ],
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
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Disetujui
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

  // Handle approval action
  const handleApprovalAction = (application: KkpApplication, action: "approve" | "reject") => {
    setSelectedApplication(application)
    setApprovalAction(action)
    setApprovalNotes("")
    setApprovalDialogOpen(true)
  }

  // Submit approval/rejection
  const submitApproval = async () => {
    if (!selectedApplication || !approvalAction) return

    setIsSubmitting(true)

    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update the application status
      setApplications(prev =>
        prev.map(app =>
          app.id === selectedApplication.id
            ? { ...app, status: approvalAction }
            : app
        )
      )

      // If approved, send WhatsApp notification to WD1
      if (approvalAction === "approve") {
        // Send WhatsApp notification to WD1
        try {
          const notificationSent = await sendWD1Notification({
            applicationId: selectedApplication.id,
            studentName: selectedApplication.student.name,
            studentMajor: selectedApplication.student.major,
            companyName: selectedApplication.company.name,
            companyLocation: selectedApplication.company.city,
          })

          if (notificationSent) {
            showToast({
              title: "Pengajuan Disetujui",
              description: "Pengajuan telah diteruskan ke Wakil Dekan 1 dan notifikasi WhatsApp telah dikirim.",
            })
          } else {
            showToast({
              title: "Pengajuan Disetujui",
              description: "Pengajuan telah diteruskan ke Wakil Dekan 1. Namun, gagal mengirim notifikasi WhatsApp.",
              variant: "destructive",
            })
          }

          // Also send notification to student
          await sendStudentNotification(
            selectedApplication.student.phone,
            selectedApplication.student.name,
            "approved",
            selectedApplication.id,
            approvalNotes
          )
        } catch (notificationError) {
          console.error("Error sending notifications:", notificationError)
          showToast({
            title: "Pengajuan Disetujui",
            description: "Pengajuan telah diteruskan ke Wakil Dekan 1. Namun, gagal mengirim notifikasi.",
            variant: "destructive",
          })
        }
      } else {
        // Send rejection notification to student
        try {
          await sendStudentNotification(
            selectedApplication.student.phone,
            selectedApplication.student.name,
            "rejected",
            selectedApplication.id,
            approvalNotes
          )

          showToast({
            title: "Pengajuan Ditolak",
            description: "Pengajuan telah ditolak dan mahasiswa telah diberi tahu melalui WhatsApp.",
          })
        } catch (notificationError) {
          console.error("Error sending student notification:", notificationError)
          showToast({
            title: "Pengajuan Ditolak",
            description: "Pengajuan telah ditolak.",
          })
        }
      }

      setApprovalDialogOpen(false)
      setApprovalAction(null)
      setSelectedApplication(null)
    } catch (error) {
      console.error("Error submitting approval:", error)
      showToast({
        title: "Error",
        description: "Terjadi kesalahan saat memproses pengajuan.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Persetujuan KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Review dan setujui pengajuan KKP mahasiswa
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            {filteredApplications.filter(app => app.status === "pending").length} Menunggu Review
          </Badge>
        </div>
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
            <div className="flex gap-2">
              {["all", "pending", "approved", "rejected"].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status as any)}
                >
                  {status === "all" && "Semua"}
                  {status === "pending" && "Menunggu"}
                  {status === "approved" && "Disetujui"}
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
                  <TableHead>Tanggal Pengajuan</TableHead>
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
                      <p className="text-sm">{application.submissionDate.toLocaleDateString()}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(application)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                        {application.status === "pending" && (
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleApprovalAction(application, "approve")}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Setujui
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleApprovalAction(application, "reject")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Tolak
                            </Button>
                          </div>
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

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan KKP</DialogTitle>
            <DialogDescription>
              Review lengkap pengajuan KKP dari {selectedApplication?.student.name}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Application Info */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Informasi Mahasiswa</h3>
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
                      <h3 className="mb-3 text-lg font-semibold">Anggota Tim</h3>
                      <div className="space-y-2">
                        {selectedApplication.groupMembers.map((member, index) => (
                          <div key={member.id} className="p-3 rounded-lg bg-muted/50">
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.nim} • {member.major} • Semester {member.semester}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="mb-3 text-lg font-semibold">Informasi Perusahaan</h3>
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
                    <h3 className="mb-3 text-lg font-semibold">Detail KKP</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Judul:</span> {selectedApplication.title}</p>
                      <p><span className="font-medium">Periode:</span> {selectedApplication.startDate.toLocaleDateString()} - {selectedApplication.endDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">Deskripsi:</span></p>
                      <p className="p-3 text-sm rounded-lg text-muted-foreground bg-muted/50">
                        {selectedApplication.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="mb-3 text-lg font-semibold">Dokumen</h3>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {selectedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm capitalize text-muted-foreground">
                          {doc.type.replace(/-/g, " ")}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4 mr-1" />
                          Lihat
                        </a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  {getStatusBadge(selectedApplication.status)}
                </div>
                {selectedApplication.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => {
                        setDetailDialogOpen(false)
                        handleApprovalAction(selectedApplication, "approve")
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Setujui
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setDetailDialogOpen(false)
                        handleApprovalAction(selectedApplication, "reject")
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Tolak
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {approvalAction === "approve" ? "Setujui Pengajuan KKP" : "Tolak Pengajuan KKP"}
            </DialogTitle>
            <DialogDescription>
              {approvalAction === "approve"
                ? "Pengajuan akan diteruskan ke Wakil Dekan 1 untuk tanda tangan digital."
                : "Berikan alasan penolakan untuk mahasiswa."
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedApplication && (
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium">{selectedApplication.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.student.name} ({selectedApplication.student.nim})
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedApplication.company.name}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium">
                {approvalAction === "approve" ? "Catatan (Opsional)" : "Alasan Penolakan *"}
              </label>
              <Textarea
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                placeholder={
                  approvalAction === "approve"
                    ? "Tambahkan catatan atau instruksi khusus..."
                    : "Jelaskan alasan penolakan..."
                }
                className="mt-1"
                required={approvalAction === "reject"}
              />
            </div>

            {approvalAction === "approve" && (
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-start gap-2">
                  <Send className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-700">Notifikasi WhatsApp</h4>
                    <p className="text-sm text-blue-600">
                      Setelah disetujui, notifikasi akan dikirim ke Wakil Dekan 1 melalui WhatsApp
                      untuk proses tanda tangan digital.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setApprovalDialogOpen(false)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              onClick={submitApproval}
              disabled={isSubmitting || (approvalAction === "reject" && !approvalNotes.trim())}
              className={approvalAction === "approve" ? "bg-green-500 hover:bg-green-600" : ""}
              variant={approvalAction === "reject" ? "destructive" : "default"}
            >
              {isSubmitting ? (
                "Memproses..."
              ) : (
                <>
                  {approvalAction === "approve" ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Setujui & Kirim ke WD1
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      Tolak Pengajuan
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
