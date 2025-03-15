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
  User,
  Building,
  Calendar,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  RotateCcw,
  BookOpen,
  GraduationCap,
  ClipboardList,
  UserPlus,
  ExternalLink,
} from "lucide-react"
import {
  getAllKkpApplications,
  getKkpApplicationById,
  updateKkpApplicationStatus,
  verifyDocument,
} from "@/app/actions/kkp-management"
import type { KkpApplication, KkpStatus } from "@/types/kkp"

export default function StaffKkpManagementPage() {
  const { toast } = useToast()
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
  const handleViewDetails = async (id: string) => {
    try {
      const application = await getKkpApplicationById(id)
      if (application) {
        setSelectedApplication(application)
        setShowDetailsDialog(true)
      } else {
        toast({
          title: "Error",
          description: "Application not found",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching application details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch application details",
        variant: "destructive",
      })
    }
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
        "Staff TU", // Mock user name
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
          <Badge variant="outline" className="font-medium bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="font-medium text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="font-medium text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="font-medium text-blue-500 border-blue-200 bg-blue-500/10">
            <AlertCircle className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="font-medium text-purple-500 border-purple-200 bg-purple-500/10">
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
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Manajemen KKP
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Kelola dan proses permintaan Kuliah Kerja Praktik (KKP) mahasiswa</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Permintaan</CardTitle>
            <ClipboardList className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">Semua permintaan KKP</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Menunggu persetujuan</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "approved").length}</div>
            <p className="text-xs text-muted-foreground">Permintaan disetujui</p>
          </CardContent>
        </Card>
        <Card className="overflow-hidden gradient-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            <XCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.filter((app) => app.status === "rejected").length}</div>
            <p className="text-xs text-muted-foreground">Permintaan ditolak</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>Permintaan KKP Mahasiswa</span>
          </CardTitle>
          <CardDescription>Tinjau dan proses permintaan KKP mahasiswa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-between gap-1 mb-6 md:flex-row">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Pencarian"
                className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex w-full gap-2 md:w-auto">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as KkpStatus | "all")}>
                <SelectTrigger className="w-[180px]">
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
          <div className="overflow-hidden border rounded-lg">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead onClick={() => handleSort("submissionDate")} className="cursor-pointer w-[140px]">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      Tanggal
                      <ArrowUpDown className="w-3 h-3 ml-1 text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-muted-foreground" />
                      Mahasiswa
                    </div>
                  </TableHead>
                  <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                      Judul KKP
                      <ArrowUpDown className="w-3 h-3 ml-1 text-muted-foreground" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2 text-muted-foreground" />
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
                        <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
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
                    <TableRow key={application.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {new Date(application.submissionDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 border border-primary/10">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
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
                            <Building className="w-6 h-6 text-muted-foreground" />
                          )}
                          <span>{application.company.name}</span>
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
                                  className="cursor-pointer"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                  Setujui
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedApplication(application)
                                    setShowRejectionDialog(true)
                                  }}
                                  className="cursor-pointer"
                                >
                                  <XCircle className="w-4 h-4 mr-2 text-red-500" />
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
                  className="w-8 h-8 p-0"
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
                  className="w-8 h-8 p-0"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Next Page</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-2">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="font-bold">{selectedApplication.title}</span>
                </div>
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {selectedApplication.applicationNumber}
                </Badge>
                {getStatusBadge(selectedApplication.status)}
                <div className="text-sm text-muted-foreground">
                  Diajukan pada{" "}
                  {new Date(selectedApplication.submissionDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-1 gap-6 mt-2 lg:grid-cols-3">
              {/* Left Column - Student Information */}
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30 border-border">
                  <h3 className="flex items-center gap-2 pb-2 mb-3 font-semibold border-b text-md">
                    <User className="w-4 h-4 text-primary" />
                    Informasi Mahasiswa
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="border-2 h-14 w-14 border-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(selectedApplication.student.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">{selectedApplication.student.name}</p>
                      <p className="text-sm font-medium text-primary">{selectedApplication.student.nim}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 text-sm gap-y-2">
                    <div className="text-muted-foreground">Program Studi</div>
                    <div className="font-medium text-right">{selectedApplication.student.major}</div>

                    <div className="text-muted-foreground">Semester</div>
                    <div className="font-medium text-right">{selectedApplication.student.semester}</div>

                    <div className="text-muted-foreground">Email</div>
                    <div className="font-medium text-right truncate">{selectedApplication.student.email}</div>

                    <div className="text-muted-foreground">Telepon</div>
                    <div className="font-medium text-right">{selectedApplication.student.phone}</div>
                  </div>
                </div>

                {selectedApplication.groupMembers && selectedApplication.groupMembers.length > 0 && (
                  <div className="p-4 border rounded-lg bg-muted/30 border-border">
                    <h3 className="flex items-center gap-2 pb-2 mb-3 font-semibold border-b text-md">
                      <UserPlus className="w-4 h-4 text-primary" />
                      Anggota Kelompok
                    </h3>
                    <div className="space-y-3">
                      {selectedApplication.groupMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-2 p-2 rounded-md bg-background">
                          <Avatar className="w-8 h-8 border border-primary/10">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.nim}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedApplication.supervisor && (
                  <div className="p-4 border rounded-lg bg-muted/30 border-border">
                    <h3 className="flex items-center gap-2 pb-2 mb-3 font-semibold border-b text-md">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Pembimbing
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10 border border-primary/10">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {getInitials(selectedApplication.supervisor.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedApplication.supervisor.name}</p>
                        <p className="text-xs text-muted-foreground">{selectedApplication.supervisor.nip}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 text-sm gap-y-2">
                      <div className="text-muted-foreground">Departemen</div>
                      <div className="font-medium text-right">{selectedApplication.supervisor.department}</div>

                      <div className="text-muted-foreground">Email</div>
                      <div className="font-medium text-right truncate">{selectedApplication.supervisor.email}</div>

                      {selectedApplication.supervisor.specialization && (
                        <>
                          <div className="text-muted-foreground">Spesialisasi</div>
                          <div className="font-medium text-right">{selectedApplication.supervisor.specialization}</div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Middle Column - Company and Application Details */}
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30 border-border">
                  <h3 className="flex items-center gap-2 pb-2 mb-3 font-semibold border-b text-md">
                    <Building className="w-4 h-4 text-primary" />
                    Informasi Perusahaan
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center border-2 rounded-full h-14 w-14 bg-muted border-primary/10">
                      {selectedApplication.company.logo ? (
                        <img
                          src={selectedApplication.company.logo || "/placeholder.svg"}
                          alt={selectedApplication.company.name}
                          className="object-cover w-12 h-12 rounded-full"
                        />
                      ) : (
                        <Building className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{selectedApplication.company.name}</p>
                      <p className="text-sm text-primary">{selectedApplication.company.industry}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 text-sm gap-y-2">
                    <div className="grid grid-cols-3 gap-1">
                      <div className="col-span-1 text-muted-foreground">Alamat</div>
                      <div className="col-span-2 font-medium">{selectedApplication.company.address}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <div className="col-span-1 text-muted-foreground">Kota</div>
                      <div className="col-span-2 font-medium">{selectedApplication.company.city}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <div className="col-span-1 text-muted-foreground">Kontak Person</div>
                      <div className="col-span-2 font-medium">{selectedApplication.company.contactPerson}</div>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <div className="col-span-1 text-muted-foreground">Telepon Kontak</div>
                      <div className="col-span-2 font-medium">{selectedApplication.company.contactPhone}</div>
                    </div>

                    {selectedApplication.company.website && (
                      <div className="grid grid-cols-3 gap-1">
                        <div className="col-span-1 text-muted-foreground">Website</div>
                        <div className="col-span-2 font-medium">
                          <a
                            href={
                              selectedApplication.company.website.startsWith("http")
                                ? selectedApplication.company.website
                                : `http://${selectedApplication.company.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            {selectedApplication.company.website}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30 border-border">
                  <h3 className="flex items-center gap-2 pb-2 mb-3 font-semibold border-b text-md">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    Detail Aplikasi
                  </h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="mb-1 text-muted-foreground">Deskripsi:</div>
                      <p className="p-2 rounded-md bg-background">{selectedApplication.description}</p>
                    </div>

                    <div className="grid grid-cols-2 mt-3 text-sm gap-y-3">
                      <div className="text-muted-foreground">Tanggal Mulai</div>
                      <div className="font-medium text-right">
                        {new Date(selectedApplication.startDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <div className="text-muted-foreground">Tanggal Selesai</div>
                      <div className="font-medium text-right">
                        {new Date(selectedApplication.endDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <div className="text-muted-foreground">Durasi</div>
                      <div className="font-medium text-right">
                        {Math.ceil(
                          (new Date(selectedApplication.endDate).getTime() -
                            new Date(selectedApplication.startDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        hari
                      </div>
                    </div>

                    {((selectedApplication.approvedBy && selectedApplication.approvedDate) ||
                      (selectedApplication.rejectedBy && selectedApplication.rejectedDate)) && (
                      <div className="pt-3 mt-3 border-t border-border">
                        {selectedApplication.approvedBy && selectedApplication.approvedDate && (
                          <div className="flex items-center justify-between p-2 mb-2 text-sm rounded-md bg-green-50 dark:bg-green-950/20">
                            <div>
                              <Badge variant="outline" className="text-green-700 bg-green-100 border-green-200">
                                Disetujui oleh
                              </Badge>
                              <p className="mt-1 font-medium">{selectedApplication.approvedBy}</p>
                            </div>
                            <div className="text-right text-muted-foreground">
                              {new Date(selectedApplication.approvedDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        )}

                        {selectedApplication.rejectedBy && selectedApplication.rejectedDate && (
                          <div className="flex items-center justify-between p-2 text-sm rounded-md bg-red-50 dark:bg-red-950/20">
                            <div>
                              <Badge variant="outline" className="text-red-700 bg-red-100 border-red-200">
                                Ditolak oleh
                              </Badge>
                              <p className="mt-1 font-medium">{selectedApplication.rejectedBy}</p>
                            </div>
                            <div className="text-right text-muted-foreground">
                              {new Date(selectedApplication.rejectedDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedApplication.rejectionReason && (
                      <div className="mt-2 text-sm">
                        <p className="mb-1 text-muted-foreground">Alasan Penolakan:</p>
                        <p className="p-2 text-red-700 rounded-md bg-red-50 dark:bg-red-950/20 dark:text-red-400">
                          {selectedApplication.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Documents */}
              <div className="p-4 border rounded-lg bg-muted/30 border-border h-fit">
                <h3 className="flex items-center gap-2 pb-2 mb-3 font-semibold border-b text-md">
                  <FileText className="w-4 h-4 text-primary" />
                  Dokumen
                </h3>

                {selectedApplication.documents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedApplication.documents.map((document) => (
                      <div
                        key={document.id}
                        className="p-3 transition-colors border rounded-lg border-border hover:bg-background"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                              <FileText className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium">{document.name}</span>
                          </div>
                          {getDocumentStatusBadge(document.status)}
                        </div>

                        <div className="mb-2 text-xs text-muted-foreground">
                          Diunggah pada{" "}
                          {new Date(document.uploadDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>

                        {document.notes && (
                          <div className="p-2 mb-2 text-xs rounded-md bg-muted">
                            <span className="font-medium">Catatan:</span> {document.notes}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-1 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDocument(document)}
                            className="h-8"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Verifikasi
                          </Button>
                          <Button variant="ghost" size="sm" asChild className="h-8">
                            <a href={document.url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-3.5 w-3.5 mr-1" />
                              Unduh
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 text-center rounded-lg bg-background">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Tidak ada dokumen ditemukan</p>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="gap-2 pt-4 mt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Tutup
              </Button>
              {selectedApplication.status === "pending" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setShowDetailsDialog(false)
                      setShowRejectionDialog(true)
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Tolak Permintaan
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => {
                      setShowDetailsDialog(false)
                      handleUpdateStatus(selectedApplication.id, "approved")
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setujui Permintaan
                  </Button>
                </>
              )}
              {selectedApplication.status === "approved" && (
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Surat
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document Verification Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" />
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

      {/* Toast component for notifications */}
      <Toaster />
    </div>
  )
}

