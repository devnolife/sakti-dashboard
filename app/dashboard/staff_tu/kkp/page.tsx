"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  FileCheck,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  RotateCcw,
  ClipboardList
} from 'lucide-react'
import {
  getAllKkpApplications,
  getKkpApplicationById,
  updateKkpApplicationStatus,
  verifyDocument,
  getKkpStatistics,
} from "@/app/actions/kkp-management"
import type { KkpApplication, KkpStatus } from "@/types/kkp"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function StaffKkpManagementPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<KkpStatus | "all">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [documentVerificationStatus, setDocumentVerificationStatus] = useState<"pending" | "verified" | "rejected">(
    "pending",
  )
  const [documentNotes, setDocumentNotes] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<"submission_date" | "title" | "status">("submission_date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0, inProgress: 0, completed: 0 })
  const itemsPerPage = 10

  // Fetch applications on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicationsData, statsData] = await Promise.all([
          getAllKkpApplications(),
          getKkpStatistics()
        ])
        setApplications(applicationsData)
        setFilteredApplications(applicationsData)
        setStats(statsData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Gagal mengambil data permintaan KKP",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchData()
  }, [toast])

  // Filter applications based on status filter and search query
  useEffect(() => {
    let filtered = applications

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.applicationNumber.toLowerCase().includes(query) ||
          app.title.toLowerCase().includes(query) ||
          app.student.name.toLowerCase().includes(query) ||
          app.student.nim.toLowerCase().includes(query) ||
          (app.company?.name && app.company.name.toLowerCase().includes(query)),
      )
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue

      switch (sortField) {
        case "submission_date":
          aValue = new Date(a.submission_date).getTime()
          bValue = new Date(b.submission_date).getTime()
          break
        case "title":
          aValue = a.title
          bValue = b.title
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        default:
          aValue = new Date(a.submission_date).getTime()
          bValue = new Date(b.submission_date).getTime()
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredApplications(filtered)
  }, [statusFilter, searchQuery, applications, sortField, sortDirection])

  // Handle sorting
  const handleSort = (field: "submission_date" | "title" | "status") => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle viewing application details
  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/staff_tu/kkp/${id}`)
  }

  // Handle viewing document details
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setDocumentVerificationStatus(document.status)
    setDocumentNotes(document.notes || "")
    setShowDocumentDialog(true)
  }

  // Handle verifying a document
  const handleVerifyDocument = async () => {
    if (!selectedApplication || !selectedDocument) return

    try {
      const result = await verifyDocument(
        selectedApplication.id,
        selectedDocument.id,
        documentVerificationStatus,
        documentNotes,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the application in state
        const updatedApplication = await getKkpApplicationById(selectedApplication.id)
        if (updatedApplication) {
          setSelectedApplication(updatedApplication)

          // Update the applications list
          setApplications((prev) => prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))
        }

        setShowDocumentDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error verifying document:", error)
      toast({
        title: "Error",
        description: "Failed to verify document",
        variant: "destructive",
      })
    }
  }

  // Handle updating application status
  const handleUpdateStatus = async (id: string, status: KkpStatus) => {
    if (status === "rejected" && !rejectionReason) {
      setSelectedApplication(applications.find((app) => app.id === id) || null)
      setShowRejectionDialog(true)
      return
    }

    setIsProcessing(true)
    try {
      const userId = user?.id || "unknown"
      const userName = user?.name || "Staff TU"

      const result = await updateKkpApplicationStatus(
        id,
        status,
        userId,
        userName,
        status === "rejected" ? rejectionReason : undefined,
      )

      if (result.success) {
        toast({
          title: "Berhasil",
          description: result.message,
        })

        // Refresh data
        const [applicationsData, statsData] = await Promise.all([
          getAllKkpApplications(),
          getKkpStatistics()
        ])
        setApplications(applicationsData)
        setStats(statsData)

        // Close dialogs
        setShowRejectionDialog(false)
        setRejectionReason("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating application status:", error)
      toast({
        title: "Error",
        description: "Gagal memperbarui status permintaan",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle rejection confirmation
  const handleRejectConfirm = () => {
    if (selectedApplication) {
      handleUpdateStatus(selectedApplication.id, "rejected")
    }
  }

  // Get status badge
  const getStatusBadge = (status: KkpStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Dalam Proses
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get document status badge
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Terverifikasi
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return null
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage)
  const paginatedApplications = filteredApplications.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Manajemen KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola dan proses permintaan Kuliah Kerja Praktik (KKP) mahasiswa
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            {stats.pending} Menunggu Review
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Permintaan</CardTitle>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Semua permintaan KKP</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">Permintaan disetujui</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <XCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Permintaan ditolak</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Permintaan KKP Mahasiswa
          </CardTitle>
          <CardDescription>Tinjau dan proses permintaan KKP mahasiswa</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari permintaan..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "approved", "rejected", "in_progress", "completed"] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {status === "all" && "Semua"}
                  {status === "pending" && "Pending"}
                  {status === "approved" && "Disetujui"}
                  {status === "rejected" && "Ditolak"}
                  {status === "in_progress" && "Dalam Proses"}
                  {status === "completed" && "Selesai"}
                </Button>
              ))}
            </div>
          </div>

          {/* Applications Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead onClick={() => handleSort("submission_date")} className="cursor-pointer">
                    <div className="flex items-center">
                      Tanggal
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>Mahasiswa</TableHead>
                  <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
                    <div className="flex items-center">
                      Judul KKP
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="w-3 h-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <RotateCcw className="w-6 h-6 mr-2 animate-spin text-muted-foreground" />
                        <span className="text-muted-foreground">Memuat data...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <FileText className="w-12 h-12 mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Tidak ada permintaan ditemukan</h3>
                        <p className="text-sm text-muted-foreground">
                          Belum ada pengajuan KKP yang sesuai dengan kriteria pencarian.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {new Date(application.submission_date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {getInitials(application.student.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{application.student.name}</div>
                            <div className="text-xs text-muted-foreground">{application.student.nim}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium truncate">{application.title}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {application.description && application.description.length > 50
                              ? `${application.description.substring(0, 50)}...`
                              : application.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.company.name}</p>
                          <p className="text-xs text-muted-foreground">{application.company.city}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(application.id)}
                              className="cursor-pointer"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            {application.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleUpdateStatus(application.id, "approved")}
                                  className="cursor-pointer text-green-600"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Setujui
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedApplication(application)
                                    setShowRejectionDialog(true)
                                  }}
                                  className="cursor-pointer text-red-600"
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Tolak
                                </DropdownMenuItem>
                              </>
                            )}
                            {application.status === "approved" && (
                              <DropdownMenuItem className="cursor-pointer">
                                <Download className="w-4 h-4 mr-2" />
                                Unduh Surat
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-muted-foreground">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredApplications.length)} dari {filteredApplications.length}{" "}
                item
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm">
                  Halaman {currentPage} dari {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Verification Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                Verifikasi Dokumen
              </DialogTitle>
              <DialogDescription>{selectedDocument.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status Saat Ini:</span>
                {getDocumentStatusBadge(selectedDocument.status)}
              </div>
              <div className="space-y-2">
                <label htmlFor="document-status" className="text-sm font-medium">
                  Perbarui Status:
                </label>
                <Select
                  value={documentVerificationStatus}
                  onValueChange={(value) => setDocumentVerificationStatus(value as "pending" | "verified" | "rejected")}
                >
                  <SelectTrigger id="document-status">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Terverifikasi</SelectItem>
                    <SelectItem value="rejected">Ditolak</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="document-notes" className="text-sm font-medium">
                  Catatan:
                </label>
                <Textarea
                  id="document-notes"
                  placeholder="Tambahkan catatan tentang dokumen ini..."
                  value={documentNotes}
                  onChange={(e) => setDocumentNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex justify-center">
                <Button variant="outline" asChild className="w-full">
                  <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Dokumen
                  </a>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Batal
              </Button>
              <Button onClick={handleVerifyDocument}>Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Reason Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-500" />
              Tolak Permintaan KKP
            </DialogTitle>
            <DialogDescription>
              {selectedApplication?.student.name} - {selectedApplication?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="rejection-reason" className="text-sm font-medium">
                Alasan Penolakan:
              </label>
              <Textarea
                id="rejection-reason"
                placeholder="Berikan alasan mengapa permintaan ini ditolak..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)} disabled={isProcessing}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim() || isProcessing}
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak Permintaan
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}
