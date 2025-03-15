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
import { Search, FileText, CheckCircle, XCircle, Clock, AlertCircle, Download, Eye, FileCheck, User, Building, Calendar, ArrowUpDown, ChevronLeft, ChevronRight, MoreHorizontal, RotateCcw, BookOpen, GraduationCap, ClipboardList, UserPlus, ExternalLink } from 'lucide-react'
import {
  getAllKkpApplications,
  getKkpApplicationById,
  updateKkpApplicationStatus,
  verifyDocument,
} from "@/app/actions/kkp-management"
import type { KkpApplication, KkpStatus } from "@/types/kkp"
import { useRouter } from "next/navigation"

export default function StaffKkpManagementPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<KkpStatus | "all">("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [documentVerificationStatus, setDocumentVerificationStatus] = useState<"pending" | "verified" | "rejected">(
    "pending",
  )
  const [documentNotes, setDocumentNotes] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<"submissionDate" | "title" | "status">("submissionDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const itemsPerPage = 10

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllKkpApplications()
        setApplications(data)
        setFilteredApplications(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to fetch KKP applications",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchApplications()
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
        case "submissionDate":
          aValue = new Date(a.submissionDate).getTime()
          bValue = new Date(b.submissionDate).getTime()
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
          aValue = new Date(a.submissionDate).getTime()
          bValue = new Date(b.submissionDate).getTime()
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
  const handleSort = (field: "submissionDate" | "title" | "status") => {
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
      const result = await updateKkpApplicationStatus(
        id,
        status,
        "staff-001", // Mock user ID
        "Admin Prodi", // Mock user name
        status === "rejected" ? rejectionReason : undefined,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the application in state
        if (result.application) {
          setApplications((prev) => prev.map((app) => (app.id === id ? result.application : app)))
        }

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
        description: "Failed to update application status",
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
          <Badge variant="outline" className="font-medium bg-amber-100 text-amber-600 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="font-medium bg-emerald-100 text-emerald-600 border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="font-medium bg-rose-100 text-rose-600 border-rose-200">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="font-medium bg-sky-100 text-sky-600 border-sky-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="font-medium bg-violet-100 text-violet-600 border-violet-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
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
          <Badge variant="outline" className="bg-amber-100 text-amber-600 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-emerald-100 text-emerald-600 border-emerald-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-rose-100 text-rose-600 border-rose-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-sky-500">
            Manajemen KKP
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Kelola dan proses permintaan Kuliah Kerja Praktik (KKP) mahasiswa</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-sky-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Permintaan</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100">
              <ClipboardList className="w-4 h-4 text-sky-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">Semua permintaan KKP</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-amber-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "approved").length}</div>
            <p className="text-xs text-muted-foreground">Permintaan disetujui</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-rose-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-100">
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "rejected").length}</div>
            <p className="text-xs text-muted-foreground">Permintaan ditolak</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="overflow-hidden bg-white border-none shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-sky-50 to-teal-50">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Permintaan KKP Mahasiswa</span>
          </CardTitle>
          <CardDescription>Tinjau dan proses permintaan KKP mahasiswa</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pencarian"
                className="w-full border-teal-100 rounded-full pl-9 focus-visible:ring-teal-500 bg-teal-50/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as KkpStatus | "all")}>
                <SelectTrigger className="w-[180px] border-teal-100 focus:ring-teal-500">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                  <SelectItem value="in-progress">Dalam Proses</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="overflow-hidden border shadow-sm rounded-xl">
            <Table>
              <TableHeader className="bg-sky-50">
                <TableRow>
                  <TableHead onClick={() => handleSort("submissionDate")} className="cursor-pointer w-[140px]">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-sky-600" />
                      Tanggal
                      <ArrowUpDown className="w-3 h-3 ml-1 text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-sky-600" />
                      Mahasiswa
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-sky-600" />
                      Judul KKP
                      <ArrowUpDown className="w-3 h-3 ml-1 text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-sky-600" />
                      Perusahaan
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="w-3 h-3 ml-1 text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <RotateCcw className="w-8 h-8 mb-2 text-sky-500 animate-spin" />
                        <p className="text-muted-foreground">Loading applications...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : paginatedApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">Tidak ada permintaan ditemukan</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedApplications.map((application) => (
                    <TableRow key={application.id} className="transition-colors hover:bg-sky-50/50">
                      <TableCell className="font-medium">
                        {new Date(application.submissionDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 border-2 border-teal-100">
                            <AvatarFallback className="text-xs text-teal-600 bg-teal-100">
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
                        <div className="font-medium">{application.title}</div>
                        <div className="hidden text-xs text-muted-foreground sm:block">
                          {application.description && application.description.length > 60
                            ? `${application.description.substring(0, 60)}...`
                            : application.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {application.company.logo ? (
                            <img
                              src={application.company.logo || "/placeholder.svg"}
                              alt={application.company.name}
                              className="w-6 h-6 rounded-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-100">
                              <Building className="w-4 h-4 text-sky-600" />
                            </div>
                          )}
                          <span>{application.company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full hover:bg-sky-100">
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">Menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="min-w-[180px]">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(application.id)}
                              className="cursor-pointer"
                            >
                              <Eye className="w-4 h-4 mr-2 text-sky-600" />
                              Lihat Detail
                            </DropdownMenuItem>
                            {application.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleUpdateStatus(application.id, "approved")}
                                  className="cursor-pointer"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2 text-emerald-600" />
                                  Setujui
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedApplication(application)
                                    setShowRejectionDialog(true)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4 mr-2 text-rose-600" />
                                  Tolak
                                </DropdownMenuItem>
                              </>
                            )}
                            {application.status === "approved" && (
                              <DropdownMenuItem className="cursor-pointer">
                                <Download className="w-4 h-4 mr-2 text-sky-600" />
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
            <div className="flex items-center justify-between px-4 py-4 mt-4 border-t">
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
                  className="w-8 h-8 p-0 border-teal-100 rounded-full hover:bg-teal-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Previous Page</span>
                </Button>
                <div className="text-sm font-medium">
                  Halaman {currentPage} dari {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 p-0 border-teal-100 rounded-full hover:bg-teal-50"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Next Page</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Verification Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
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
                  <SelectTrigger id="document-status" className="border-teal-100 focus:ring-teal-500">
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
                  className="min-h-[100px] border-teal-100 focus:ring-teal-500"
                />
              </div>
              <div className="flex justify-center">
                <Button variant="outline" asChild className="w-full border-teal-100 hover:bg-teal-50">
                  <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Dokumen
                  </a>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)} className="border-teal-100 hover:bg-teal-50">
                Batal
              </Button>
              <Button onClick={handleVerifyDocument} className="bg-teal-600 hover:bg-teal-700">Simpan Perubahan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Reason Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-600" />
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
                className="min-h-[120px] border-rose-100 focus:ring-rose-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)} disabled={isProcessing} className="border-rose-100 hover:bg-rose-50">
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim() || isProcessing}
              className="bg-rose-600 hover:bg-rose-700"
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
