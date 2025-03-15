"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  RotateCcw,
  FileCheck,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { CorrespondenceTable } from "@/components/correspondence/correspondence-table"
import { LetterRequestDetails } from "@/components/correspondence/letter-request-details"
import { getLetterRequestsForApproval, updateLetterRequestStatus } from "@/app/actions/correspondence-actions"
import type { LetterRequest, LetterStatus } from "@/types/correspondence"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CorrespondenceProdiDashboard() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<LetterStatus | "all">("all")
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [letterTypes, setLetterTypes] = useState<string[]>([])

  // Fetch letter requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getLetterRequestsForApproval("prodi")
        setRequests(data)
        setFilteredRequests(data)

        // Extract unique letter types
        const types = Array.from(new Set(data.map((req) => req.type)))
        setLetterTypes(types)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching letter requests:", error)
        toast({
          title: "Error",
          description: "Failed to fetch letter requests",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [toast])

  // Filter requests based on active tab, search query, and type filter
  useEffect(() => {
    let filtered = requests

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((r) => r.status === activeTab)
    }

    // Apply type filter if not "all"
    if (typeFilter !== "all") {
      filtered = filtered.filter((r) => r.type === typeFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.studentName.toLowerCase().includes(query) ||
          r.studentNIM.toLowerCase().includes(query) ||
          r.title.toLowerCase().includes(query) ||
          (r.description && r.description.toLowerCase().includes(query)),
      )
    }

    setFilteredRequests(filtered)
  }, [activeTab, searchQuery, typeFilter, requests])

  // Handle viewing request details
  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setShowDetailsDialog(true)
  }

  // Handle approving a request
  const handleApproveRequest = async () => {
    if (!selectedRequest) return

    try {
      const result = await updateLetterRequestStatus(
        selectedRequest.id,
        "approved",
        undefined,
        "Dr. Bambang Suprapto, M.T.", // In a real app, this would be the actual user name
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the request in state
        const updatedRequests = requests.map((req) =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status: "approved",
                approvedBy: "Dr. Bambang Suprapto, M.T.",
                approvedDate: new Date().toISOString(),
              }
            : req,
        )

        setRequests(updatedRequests)
        setSelectedRequest({
          ...selectedRequest,
          status: "approved",
          approvedBy: "Dr. Bambang Suprapto, M.T.",
          approvedDate: new Date().toISOString(),
        })

        setShowApprovalDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving request:", error)
      toast({
        title: "Error",
        description: "Failed to approve request",
        variant: "destructive",
      })
    }
  }

  // Handle rejecting a request
  const handleRejectRequest = async () => {
    if (!selectedRequest || !rejectionReason.trim()) return

    try {
      const result = await updateLetterRequestStatus(
        selectedRequest.id,
        "rejected",
        rejectionReason,
        "Dr. Bambang Suprapto, M.T.", // In a real app, this would be the actual user name
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the request in state
        const updatedRequests = requests.map((req) =>
          req.id === selectedRequest.id
            ? {
                ...req,
                status: "rejected",
                rejectedReason: rejectionReason,
              }
            : req,
        )

        setRequests(updatedRequests)
        setSelectedRequest({
          ...selectedRequest,
          status: "rejected",
          rejectedReason: rejectionReason,
        })

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
      console.error("Error rejecting request:", error)
      toast({
        title: "Error",
        description: "Failed to reject request",
        variant: "destructive",
      })
    }
  }

  // Get status badge
  const getStatusBadge = (status: LetterStatus) => {
    switch (status) {
      case "submitted":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Submitted
          </Badge>
        )
      case "in-review":
        return (
          <Badge className="text-blue-500 bg-blue-500/10">
            <FileText className="h-3.5 w-3.5 mr-1" />
            In Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="text-green-500 bg-green-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "completed":
        return (
          <Badge className="text-purple-500 bg-purple-500/10">
            <FileCheck className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="text-red-500 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  // Get letter type display name
  const getLetterTypeDisplay = (type: string) => {
    switch (type) {
      case "active_student":
        return "Surat Keterangan Aktif Kuliah"
      case "leave_absence":
        return "Surat Cuti Kuliah"
      case "loan_application":
        return "Surat Keterangan Pinjaman"
      case "tuition_extension":
        return "Perpanjangan Pembayaran SPP"
      case "internship_recommendation":
        return "Rekomendasi Magang"
      case "scholarship_recommendation":
        return "Rekomendasi Beasiswa"
      case "transcript_request":
        return "Permintaan Transkrip"
      case "research_permission":
        return "Izin Penelitian"
      case "graduation_confirmation":
        return "Keterangan Lulus"
      default:
        return type.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Manajemen Surat
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Permohonan Baru</CardTitle>
            <CardDescription>Permohonan yang baru diajukan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-amber-100">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{requests.filter((r) => r.status === "submitted").length}</p>
                  <p className="text-sm text-muted-foreground">Menunggu review</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                onClick={() => setActiveTab("submitted")}
              >
                Lihat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Dalam Proses</CardTitle>
            <CardDescription>Permohonan yang sedang diproses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-full">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{requests.filter((r) => r.status === "in-review").length}</p>
                  <p className="text-sm text-muted-foreground">Sedang direview</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={() => setActiveTab("in-review")}
              >
                Lihat
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Selesai Diproses</CardTitle>
            <CardDescription>Permohonan yang telah disetujui atau ditolak</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      requests.filter(
                        (r) => r.status === "approved" || r.status === "completed" || r.status === "rejected",
                      ).length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Total selesai</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => setActiveTab("all")}
              >
                Lihat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as LetterStatus | "all")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="submitted">Baru</TabsTrigger>
            <TabsTrigger value="in-review">Proses</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card className="overflow-hidden gradient-border">
              <CardHeader>
                <CardTitle>Daftar Permohonan Surat</CardTitle>
                <CardDescription>
                  Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requests found</p>
                  </div>
                ) : (
                  <CorrespondenceTable
                    requests={filteredRequests.filter((req) => req.status === "all")}
                    onViewDetails={handleViewDetails}
                    getStatusBadge={getStatusBadge}
                    getLetterTypeDisplay={getLetterTypeDisplay}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="submitted">
            <Card className="overflow-hidden gradient-border">
              <CardHeader>
                <CardTitle>Daftar Permohonan Surat</CardTitle>
                <CardDescription>
                  Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requests found</p>
                  </div>
                ) : (
                  <CorrespondenceTable
                    requests={filteredRequests.filter((req) => req.status === "submitted")}
                    onViewDetails={handleViewDetails}
                    getStatusBadge={getStatusBadge}
                    getLetterTypeDisplay={getLetterTypeDisplay}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="in-review">
            <Card className="overflow-hidden gradient-border">
              <CardHeader>
                <CardTitle>Daftar Permohonan Surat</CardTitle>
                <CardDescription>
                  Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requests found</p>
                  </div>
                ) : (
                  <CorrespondenceTable
                    requests={filteredRequests.filter((req) => req.status === "in-review")}
                    onViewDetails={handleViewDetails}
                    getStatusBadge={getStatusBadge}
                    getLetterTypeDisplay={getLetterTypeDisplay}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="approved">
            <Card className="overflow-hidden gradient-border">
              <CardHeader>
                <CardTitle>Daftar Permohonan Surat</CardTitle>
                <CardDescription>
                  Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requests found</p>
                  </div>
                ) : (
                  <CorrespondenceTable
                    requests={filteredRequests.filter((req) => req.status === "approved")}
                    onViewDetails={handleViewDetails}
                    getStatusBadge={getStatusBadge}
                    getLetterTypeDisplay={getLetterTypeDisplay}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed">
            <Card className="overflow-hidden gradient-border">
              <CardHeader>
                <CardTitle>Daftar Permohonan Surat</CardTitle>
                <CardDescription>
                  Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requests found</p>
                  </div>
                ) : (
                  <CorrespondenceTable
                    requests={filteredRequests.filter((req) => req.status === "completed")}
                    onViewDetails={handleViewDetails}
                    getStatusBadge={getStatusBadge}
                    getLetterTypeDisplay={getLetterTypeDisplay}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rejected">
            <Card className="overflow-hidden gradient-border">
              <CardHeader>
                <CardTitle>Daftar Permohonan Surat</CardTitle>
                <CardDescription>
                  Kelola dan proses permohonan surat dari mahasiswa yang memerlukan persetujuan Ketua Program Studi
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading requests...</p>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requests found</p>
                  </div>
                ) : (
                  <CorrespondenceTable
                    requests={filteredRequests.filter((req) => req.status === "rejected")}
                    onViewDetails={handleViewDetails}
                    getStatusBadge={getStatusBadge}
                    getLetterTypeDisplay={getLetterTypeDisplay}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari berdasarkan nama, NIM, atau judul..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Jenis Surat</SelectItem>
            {letterTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {getLetterTypeDisplay(type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Letter Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <LetterRequestDetails
              request={selectedRequest}
              getStatusBadge={getStatusBadge}
              getLetterTypeDisplay={getLetterTypeDisplay}
              onClose={() => setShowDetailsDialog(false)}
              onApprove={() => {
                setShowDetailsDialog(false)
                setShowApprovalDialog(true)
              }}
              onReject={() => {
                setShowDetailsDialog(false)
                setShowRejectionDialog(true)
              }}
              role="prodi"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Approval Confirmation Dialog */}
      {selectedRequest && (
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                Setujui Permohonan Surat
              </DialogTitle>
              <DialogDescription>
                Anda akan menyetujui permohonan surat ini. Permohonan yang disetujui akan diteruskan ke Admin Prodi untuk
                diproses lebih lanjut.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-green-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Konfirmasi Persetujuan</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Anda akan menyetujui permohonan surat{" "}
                        <span className="font-medium">{selectedRequest.title}</span> dari mahasiswa{" "}
                        <span className="font-medium">
                          {selectedRequest.studentName} ({selectedRequest.studentNIM})
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                Batal
              </Button>
              <Button onClick={handleApproveRequest}>Setujui Permohonan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Dialog */}
      {selectedRequest && (
        <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-primary" />
                Tolak Permohonan Surat
              </DialogTitle>
              <DialogDescription>
                Harap berikan alasan penolakan permohonan surat ini. Alasan ini akan ditampilkan kepada mahasiswa.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejection-reason" className="text-sm font-medium">
                  Alasan Penolakan:
                </label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Masukkan alasan penolakan..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="p-4 rounded-md bg-red-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Konfirmasi Penolakan</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Anda akan menolak permohonan surat <span className="font-medium">{selectedRequest.title}</span>{" "}
                        dari mahasiswa{" "}
                        <span className="font-medium">
                          {selectedRequest.studentName} ({selectedRequest.studentNIM})
                        </span>
                        .
                      </p>
                      <p className="mt-2">Mahasiswa akan diberitahu tentang penolakan ini dan alasannya.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleRejectRequest} disabled={!rejectionReason.trim()}>
                Tolak Permohonan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

