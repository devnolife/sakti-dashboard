"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  Eye,
  FileUp,
  XCircle,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Calendar,
  ArrowRight,
  RotateCcw,
} from "lucide-react"
import { getAllLetterRequests } from "@/app/actions/correspondence-actions"
import { forwardLetterToWD1, rejectRequest, returnLetterForRevision } from "@/app/actions/correspondence/letter-requests"
import type { LetterRequest } from "@/types/correspondence"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"

export function CorrespondenceDraftsManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false)
  const [actionNotes, setActionNotes] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [processing, setProcessing] = useState(false)

  // Helper function to reload data dengan filter
  const reloadRequests = async () => {
    const data = await getAllLetterRequests()
    // Simpan semua data untuk stats calculation
    setRequests(data)
    // Filter untuk display: hanya yang masih "submitted" (belum diteruskan)
    const pendingRequests = data.filter(req => req.status === "submitted")
    setFilteredRequests(pendingRequests)
  }

  // Load all letter requests
  useEffect(() => {
    async function loadRequests() {
      try {
        await reloadRequests()
      } catch (error) {
        console.error("Error loading requests:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data permohonan surat",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    loadRequests()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...requests]

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((req) => req.type === typeFilter)
    }

    // Filter by tab
    if (activeTab === "pending") {
      filtered = filtered.filter((req) => req.status === "submitted")
    } else if (activeTab === "processing") {
      filtered = filtered.filter((req) => req.status === "in-review")
    } else if (activeTab === "completed") {
      filtered = filtered.filter((req) => req.status === "completed" || req.status === "approved")
    } else if (activeTab === "rejected") {
      filtered = filtered.filter((req) => req.status === "rejected")
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (req) =>
          req.title.toLowerCase().includes(query) ||
          req.studentName.toLowerCase().includes(query) ||
          req.studentNIM.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query)
      )
    }

    setFilteredRequests(filtered)
  }, [requests, searchQuery, statusFilter, typeFilter, activeTab])

  const handleViewRequest = (request: LetterRequest) => {
    setSelectedRequest(request)
    setIsViewDialogOpen(true)
  }

  const handleForwardRequest = (request: LetterRequest) => {
    setSelectedRequest(request)
    setActionNotes("")
    setIsForwardDialogOpen(true)
  }

  const handleRejectRequest = (request: LetterRequest) => {
    setSelectedRequest(request)
    setActionNotes("")
    setIsRejectDialogOpen(true)
  }

  const handleRevisionRequest = (request: LetterRequest) => {
    setSelectedRequest(request)
    setActionNotes("")
    setIsRevisionDialogOpen(true)
  }

  const confirmForward = async () => {
    if (!selectedRequest) return
    setProcessing(true)

    try {
      // For demo, using a hardcoded user ID - in production this should come from session
      const result = await forwardLetterToWD1(selectedRequest.id, "admin-umum-001", actionNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan berhasil diteruskan ke WD1",
        })

        // Reload data
        await reloadRequests()
        setIsForwardDialogOpen(false)
        setSelectedRequest(null)
        setActionNotes("")
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error forwarding request:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat meneruskan permohonan",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  const confirmReject = async () => {
    if (!selectedRequest || !actionNotes.trim()) {
      toast({
        title: "Error",
        description: "Alasan penolakan harus diisi",
        variant: "destructive"
      })
      return
    }

    setProcessing(true)

    try {
      const result = await rejectRequest(selectedRequest.id, "admin-umum-001", actionNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan berhasil ditolak",
        })

        // Reload data
        await reloadRequests()
        setIsRejectDialogOpen(false)
        setSelectedRequest(null)
        setActionNotes("")
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error rejecting request:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menolak permohonan",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  const confirmRevision = async () => {
    if (!selectedRequest || !actionNotes.trim()) {
      toast({
        title: "Error",
        description: "Catatan revisi harus diisi",
        variant: "destructive"
      })
      return
    }

    setProcessing(true)

    try {
      const result = await returnLetterForRevision(selectedRequest.id, "admin-umum-001", actionNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan berhasil dikembalikan untuk revisi",
        })

        // Reload data
        await reloadRequests()
        setIsRevisionDialogOpen(false)
        setSelectedRequest(null)
        setActionNotes("")
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error returning for revision:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengembalikan untuk revisi",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  // Calculate stats
  const stats = {
    total: requests.length,
    submitted: requests.filter(r => r.status === 'submitted').length,
    inReview: requests.filter(r => r.status === 'in-review').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="font-medium text-blue-500 border-blue-200 bg-blue-500/10">
            <Clock className="w-3 h-3 mr-1" />
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Diproses
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="font-medium text-purple-500 border-purple-200 bg-purple-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="font-medium text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="font-medium text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full h-12" />
        <div className="grid gap-4 md:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="w-full h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permohonan Surat Mahasiswa</h1>
          <p className="text-muted-foreground">Kelola dan teruskan permohonan surat dari mahasiswa</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg dark:from-slate-950/40 dark:to-slate-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50">
                <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Permohonan aktif</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-800/50">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-sm font-medium">Perlu Tinjau</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.submitted}</div>
            <p className="text-xs text-muted-foreground">Menunggu tindakan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-800/50">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle className="text-sm font-medium">Diproses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.inReview}</div>
            <p className="text-xs text-muted-foreground">Sedang ditinjau</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg dark:from-red-950/40 dark:to-red-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-full dark:bg-red-800/50">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Tidak disetujui</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-800/50">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Surat tersedia</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>Daftar Permohonan</CardTitle>
              <CardDescription>Kelola permohonan surat dari mahasiswa</CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari permohonan..."
                  className="pl-9 w-full sm:w-[250px] rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="submitted">Perlu Ditinjau</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Filter Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="active">Surat Aktif Kuliah</SelectItem>
                  <SelectItem value="leave">Surat Cuti</SelectItem>
                  <SelectItem value="payment">Surat Pembayaran</SelectItem>
                  <SelectItem value="custom">Surat Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto">
              <TabsTrigger value="all">Semua Permohonan</TabsTrigger>
              <TabsTrigger value="pending">Perlu Ditinjau</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-4 p-4 transition-all border shadow-sm rounded-xl border-border/50 bg-card hover:shadow-md"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid flex-1 gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">{request.title}</p>
                          <p className="text-xs text-muted-foreground">{request.purpose}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Mahasiswa</p>
                          <p className="text-sm">{request.studentName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">NIM</p>
                          <p className="text-sm">{request.studentNIM}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Prodi</p>
                          <p className="text-sm">{request.studentMajor}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Tanggal Ajukan</p>
                          <p className="text-sm">{formatDate(request.requestDate)}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRequest(request)}
                          className="rounded-full hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="w-3 h-3 mr-2" />
                          Lihat Detail
                        </Button>

                        {request.status === "submitted" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleForwardRequest(request)}
                              className="rounded-full hover:bg-green-500/10 hover:text-green-600 hover:border-green-200"
                            >
                              <ArrowRight className="w-3 h-3 mr-2" />
                              Teruskan ke WD1
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevisionRequest(request)}
                              className="rounded-full hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-200"
                            >
                              <RotateCcw className="w-3 h-3 mr-2" />
                              Minta Revisi
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRejectRequest(request)}
                              className="rounded-full hover:bg-red-500/10 hover:text-red-600 hover:border-red-200"
                            >
                              <XCircle className="w-3 h-3 mr-2" />
                              Tolak
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-muted">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">Tidak ada permohonan</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "all"
                      ? "Belum ada permohonan surat dari mahasiswa."
                      : activeTab === "pending"
                        ? "Tidak ada permohonan yang menunggu review."
                        : activeTab === "processing"
                          ? "Tidak ada permohonan yang sedang diproses."
                          : activeTab === "completed"
                            ? "Tidak ada permohonan yang telah selesai."
                            : "Tidak ada permohonan yang ditolak."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Request Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <DialogTitle className="text-2xl">{selectedRequest?.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2 text-base">
                  {selectedRequest && getStatusBadge(selectedRequest.status)}
                  <span className="text-muted-foreground">•</span>
                  <span>Diajukan {selectedRequest && formatDate(selectedRequest.requestDate)}</span>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Student Information Card */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Informasi Mahasiswa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Nama Lengkap</p>
                    <p className="text-sm font-medium">{selectedRequest?.studentName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">NIM</p>
                    <p className="text-sm font-mono font-medium">{selectedRequest?.studentNIM}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Program Studi</p>
                    <p className="text-sm font-medium">{selectedRequest?.studentMajor}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Fakultas</p>
                    <p className="text-sm font-medium">{selectedRequest?.studentFaculty}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Semester</p>
                    <p className="text-sm font-medium">Semester {selectedRequest?.studentSemester}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Tahun Akademik</p>
                    <p className="text-sm font-medium">{selectedRequest?.academicYear}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Letter Details Card */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50">
                    <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  Detail Permohonan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 p-3 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-500" />
                      <p className="text-xs font-semibold text-muted-foreground">Jenis Surat</p>
                    </div>
                    <p className="text-sm font-medium pl-6">{selectedRequest?.type}</p>
                  </div>

                  <div className="space-y-1.5 p-3 rounded-lg bg-background/50 border">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <p className="text-xs font-semibold text-muted-foreground">Tujuan Penggunaan</p>
                    </div>
                    <p className="text-sm font-medium pl-6">{selectedRequest?.purpose}</p>
                  </div>
                </div>

                <div className="space-y-1.5 p-4 rounded-lg bg-background/50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <p className="text-xs font-semibold text-muted-foreground">Keterangan Tambahan</p>
                  </div>
                  <p className="text-sm pl-6 whitespace-pre-wrap leading-relaxed">
                    {selectedRequest?.description || '-'}
                  </p>
                </div>

                {selectedRequest?.additionalInfo && Object.keys(selectedRequest.additionalInfo).length > 0 && (
                  <div className="space-y-3 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-purple-500" />
                      <p className="text-xs font-semibold text-muted-foreground">Data Pendukung Lainnya</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(selectedRequest.additionalInfo).map(([key, value]) => {
                        // Mapping lengkap untuk field bahasa Indonesia
                        const fieldNameMap: Record<string, string> = {
                          // Date fields
                          'start_date': 'Tanggal Mulai',
                          'startDate': 'Tanggal Mulai',
                          'end_date': 'Tanggal Selesai',
                          'endDate': 'Tanggal Selesai',
                          'date': 'Tanggal',
                          'birth_date': 'Tanggal Lahir',
                          'birthDate': 'Tanggal Lahir',
                          'request_date': 'Tanggal Permohonan',
                          'requestDate': 'Tanggal Permohonan',
                          'created_date': 'Tanggal Dibuat',
                          'createdDate': 'Tanggal Dibuat',
                          'updated_date': 'Tanggal Diperbarui',
                          'updatedDate': 'Tanggal Diperbarui',
                          'submission_date': 'Tanggal Pengajuan',
                          'submissionDate': 'Tanggal Pengajuan',

                          // Company/Organization fields
                          'company': 'Perusahaan/Instansi',
                          'company_name': 'Nama Perusahaan',
                          'companyName': 'Nama Perusahaan',
                          'organization': 'Organisasi',
                          'institution': 'Institusi',
                          'destination': 'Tujuan',
                          'workplace': 'Tempat Kerja',
                          'work_place': 'Tempat Kerja',
                          'workPlace': 'Tempat Kerja',

                          // Parent/Guardian fields
                          'parent_name': 'Nama Orang Tua',
                          'parentName': 'Nama Orang Tua',
                          'parent_position': 'Jabatan Orang Tua',
                          'parentPosition': 'Jabatan Orang Tua',
                          'parent_institution': 'Instansi Orang Tua',
                          'parentInstitution': 'Instansi Orang Tua',
                          'parent_address': 'Alamat Orang Tua',
                          'parentAddress': 'Alamat Orang Tua',
                          'parent_phone': 'Nomor Telepon Orang Tua',
                          'parentPhone': 'Nomor Telepon Orang Tua',
                          'parent_email': 'Email Orang Tua',
                          'parentEmail': 'Email Orang Tua',
                          'father_name': 'Nama Ayah',
                          'fatherName': 'Nama Ayah',
                          'mother_name': 'Nama Ibu',
                          'motherName': 'Nama Ibu',
                          'guardian_name': 'Nama Wali',
                          'guardianName': 'Nama Wali',
                          'guardian_phone': 'Nomor Telepon Wali',
                          'guardianPhone': 'Nomor Telepon Wali',
                          'parent_civil_servant': 'Orang Tua PNS',
                          'parentCivilServant': 'Orang Tua PNS',
                          'is_parent_civil_servant': 'Orang Tua PNS',
                          'isParentCivilServant': 'Orang Tua PNS',

                          // Personal fields
                          'name': 'Nama',
                          'full_name': 'Nama Lengkap',
                          'fullName': 'Nama Lengkap',
                          'address': 'Alamat',
                          'current_address': 'Alamat Sekarang',
                          'currentAddress': 'Alamat Sekarang',
                          'home_address': 'Alamat Rumah',
                          'homeAddress': 'Alamat Rumah',
                          'phone': 'Nomor Telepon',
                          'phone_number': 'Nomor Telepon',
                          'phoneNumber': 'Nomor Telepon',
                          'mobile': 'Nomor HP',
                          'mobile_phone': 'Nomor HP',
                          'mobilePhone': 'Nomor HP',
                          'email': 'Alamat Email',
                          'position': 'Jabatan',
                          'job_title': 'Jabatan',
                          'jobTitle': 'Jabatan',
                          'occupation': 'Pekerjaan',
                          'religion': 'Agama',
                          'gender': 'Jenis Kelamin',
                          'nationality': 'Kewarganegaraan',
                          'id_number': 'Nomor Identitas',
                          'idNumber': 'Nomor Identitas',
                          'ktp': 'Nomor KTP',
                          'ktp_number': 'Nomor KTP',
                          'ktpNumber': 'Nomor KTP',

                          // Academic fields
                          'semester': 'Semester',
                          'academic_year': 'Tahun Akademik',
                          'academicYear': 'Tahun Akademik',
                          'gpa': 'IPK',
                          'ipk': 'IPK',
                          'credits': 'SKS',
                          'sks': 'SKS',
                          'major': 'Program Studi',
                          'study_program': 'Program Studi',
                          'studyProgram': 'Program Studi',
                          'faculty': 'Fakultas',
                          'nim': 'NIM',
                          'student_id': 'NIM',
                          'studentId': 'NIM',
                          'student_number': 'NIM',
                          'studentNumber': 'NIM',
                          'grade': 'Nilai',
                          'score': 'Skor',
                          'class': 'Kelas',
                          'batch': 'Angkatan',
                          'year': 'Tahun',
                          'graduation_year': 'Tahun Lulus',
                          'graduationYear': 'Tahun Lulus',

                          // General fields
                          'reason': 'Alasan',
                          'purpose': 'Tujuan',
                          'objective': 'Tujuan',
                          'description': 'Keterangan',
                          'detail': 'Detail',
                          'details': 'Detail',
                          'note': 'Catatan',
                          'notes': 'Catatan',
                          'remarks': 'Keterangan',
                          'comment': 'Komentar',
                          'comments': 'Komentar',
                          'duration': 'Durasi',
                          'period': 'Periode',
                          'amount': 'Jumlah',
                          'total': 'Total',
                          'sum': 'Jumlah',
                          'quantity': 'Kuantitas',
                          'number': 'Nomor',
                          'attachment': 'Lampiran',
                          'attachments': 'Lampiran',
                          'file': 'Berkas',
                          'files': 'Berkas',
                          'document': 'Dokumen',
                          'documents': 'Dokumen',

                          // Status fields
                          'status': 'Status',
                          'type': 'Jenis',
                          'kind': 'Jenis',
                          'category': 'Kategori',
                          'priority': 'Prioritas',
                          'level': 'Tingkat',
                          'stage': 'Tahap',
                          'phase': 'Fase',

                          // Contact fields
                          'contact': 'Kontak',
                          'contact_person': 'Narahubung',
                          'contactPerson': 'Narahubung',
                          'supervisor': 'Pembimbing',
                          'advisor': 'Pembimbing',
                          'mentor': 'Mentor',
                          'lecturer': 'Dosen',
                          'teacher': 'Pengajar',
                          'instructor': 'Instruktur',

                          // Location fields
                          'location': 'Lokasi',
                          'place': 'Tempat',
                          'venue': 'Tempat',
                          'city': 'Kota',
                          'district': 'Kecamatan',
                          'sub_district': 'Kelurahan',
                          'subDistrict': 'Kelurahan',
                          'province': 'Provinsi',
                          'country': 'Negara',
                          'postal_code': 'Kode Pos',
                          'postalCode': 'Kode Pos',
                          'zip_code': 'Kode Pos',
                          'zipCode': 'Kode Pos',

                          // Financial fields
                          'payment': 'Pembayaran',
                          'fee': 'Biaya',
                          'cost': 'Biaya',
                          'price': 'Harga',
                          'salary': 'Gaji',
                          'income': 'Pendapatan',
                          'expense': 'Pengeluaran',
                          'budget': 'Anggaran',

                          // Other common fields
                          'reference': 'Referensi',
                          'reference_number': 'Nomor Referensi',
                          'referenceNumber': 'Nomor Referensi',
                          'title': 'Judul',
                          'subject': 'Perihal',
                          'topic': 'Topik',
                          'theme': 'Tema',
                          'requirement': 'Persyaratan',
                          'requirements': 'Persyaratan',
                          'prerequisite': 'Prasyarat',
                          'prerequisites': 'Prasyarat',
                          'signature': 'Tanda Tangan',
                          'stamp': 'Stempel',
                          'seal': 'Cap',
                          'approval': 'Persetujuan',
                          'approved_by': 'Disetujui Oleh',
                          'approvedBy': 'Disetujui Oleh'
                        }

                        // Fungsi untuk format field name
                        const formatFieldName = (name: string): string => {
                          // Cek apakah ada mapping khusus (case-insensitive)
                          const lowerName = name.toLowerCase()
                          if (fieldNameMap[lowerName]) {
                            return fieldNameMap[lowerName]
                          }

                          // Cek exact match
                          if (fieldNameMap[name]) {
                            return fieldNameMap[name]
                          }

                          // Fallback: Convert snake_case or camelCase to Title Case
                          return name
                            .replace(/_/g, ' ')
                            .replace(/([A-Z])/g, ' $1')
                            .trim()
                            .split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                            .join(' ')
                        }

                        // Fungsi untuk format value
                        const formatValue = (val: any): string => {
                          if (val === null || val === undefined) return '-'

                          // Handle array
                          if (Array.isArray(val)) {
                            if (val.length === 0) return '-'
                            return val.map((item, idx) =>
                              typeof item === 'object'
                                ? `${idx + 1}. ${Object.entries(item).map(([k, v]) => `${formatFieldName(k)}: ${v}`).join(', ')}`
                                : `${idx + 1}. ${item}`
                            ).join('\n')
                          }

                          // Handle object
                          if (typeof val === 'object') {
                            return Object.entries(val)
                              .map(([k, v]) => `${formatFieldName(k)}: ${v}`)
                              .join('\n')
                          }

                          // Handle boolean
                          if (typeof val === 'boolean') {
                            return val ? 'Ya' : 'Tidak'
                          }

                          return String(val)
                        }

                        const displayValue = formatValue(value)

                        return (
                          <div key={key} className="p-3 rounded-lg bg-background/50 border">
                            <p className="text-xs font-semibold text-muted-foreground mb-1.5">
                              {formatFieldName(key)}
                            </p>
                            <p className="text-sm font-medium whitespace-pre-line">
                              {displayValue}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline/Status History Card */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  Riwayat Permohonan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-300 to-transparent dark:from-emerald-800 dark:via-emerald-700" />

                  {/* Request Date */}
                  <div className="flex items-start gap-4 relative">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 ring-4 ring-background z-10">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 pt-0.5 pb-4">
                      <p className="text-sm font-semibold">Permohonan Diajukan</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedRequest && formatDate(selectedRequest.requestDate)}
                      </p>
                    </div>
                  </div>

                  {/* Review Date */}
                  {selectedRequest?.reviewDate && selectedRequest.reviewDate !== '' && (
                    <div className="flex items-start gap-4 relative">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 ring-4 ring-background z-10">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1 pt-0.5 pb-4">
                        <p className="text-sm font-semibold">Mulai Ditinjau</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(selectedRequest.reviewDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Approved Date */}
                  {selectedRequest?.approvedDate && (
                    <div className="flex items-start gap-4 relative">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 ring-4 ring-background z-10">
                        <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1 pt-0.5 pb-4">
                        <p className="text-sm font-semibold">Permohonan Disetujui</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(selectedRequest.approvedDate)}
                        </p>
                        {selectedRequest.approvedBy && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Disetujui oleh: <span className="font-medium">{selectedRequest.approvedBy}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Completed Date */}
                  {selectedRequest?.completedDate && (
                    <div className="flex items-start gap-4 relative">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 ring-4 ring-background z-10">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1 pt-0.5 pb-4">
                        <p className="text-sm font-semibold">Surat Selesai Dibuat</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(selectedRequest.completedDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Rejected Date */}
                  {selectedRequest?.rejectedDate && selectedRequest.rejectedDate !== '' && (
                    <div className="flex items-start gap-4 relative">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 ring-4 ring-background z-10">
                        <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1 pt-0.5 pb-4">
                        <p className="text-sm font-semibold">Permohonan Ditolak</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(selectedRequest.rejectedDate)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            {selectedRequest?.attachments && selectedRequest.attachments.length > 0 && (
              <Card className="border-none shadow-sm bg-gradient-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/50">
                      <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    Dokumen Lampiran ({selectedRequest.attachments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachment.size} • {formatDate(attachment.uploadDate)}
                          </p>
                        </div>
                        {attachment.url && (
                          <Button size="sm" variant="ghost" asChild>
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rejection Reason Alert */}
            {selectedRequest?.rejectedReason && (
              <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50">
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
                        Alasan Penolakan
                      </h4>
                      <p className="text-sm text-red-800 dark:text-red-200 whitespace-pre-wrap">
                        {selectedRequest.rejectedReason}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Letter Download (if available) */}
            {selectedRequest?.letterUrl && (
              <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-900">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">
                          Surat Siap Diunduh
                        </h4>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          Surat telah selesai dibuat dan siap untuk diunduh
                        </p>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="border-green-300 hover:bg-green-100">
                      <a href={selectedRequest.letterUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        Unduh Surat
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <DialogFooter className="border-t pt-4">
            {selectedRequest?.status === "submitted" && (
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleForwardRequest(selectedRequest)
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Teruskan
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsViewDialogOpen(false)
                    handleRejectRequest(selectedRequest)
                  }}
                  className="flex-1 sm:flex-none"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak
                </Button>
              </div>
            )}
            <Button onClick={() => setIsViewDialogOpen(false)} variant="secondary">
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Forward Dialog */}
      <Dialog open={isForwardDialogOpen} onOpenChange={setIsForwardDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50">
                <ArrowRight className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">Teruskan ke WD1</DialogTitle>
                <DialogDescription className="mt-1">
                  Teruskan permohonan surat dari <strong>{selectedRequest?.studentName}</strong> ke Wakil Dekan 1 untuk peninjauan lebih lanjut
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Request Summary */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Jenis Surat</span>
                    <span className="text-sm font-medium">{selectedRequest?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mahasiswa</span>
                    <span className="text-sm font-medium">{selectedRequest?.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">NIM</span>
                    <span className="text-sm font-mono font-medium">{selectedRequest?.studentNIM}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Field */}
            <div className="space-y-2">
              <Label htmlFor="forward-notes" className="text-sm font-medium">
                Catatan untuk WD1 (Opsional)
              </Label>
              <Textarea
                id="forward-notes"
                placeholder="Contoh: Mohon ditinjau segera, dokumen sudah lengkap..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Tambahkan catatan khusus jika diperlukan untuk membantu proses peninjauan
              </p>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsForwardDialogOpen(false)} disabled={processing}>
              Batal
            </Button>
            <Button onClick={confirmForward} disabled={processing} className="bg-green-600 hover:bg-green-700">
              {processing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Teruskan ke WD1
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">Tolak Permohonan</DialogTitle>
                <DialogDescription className="mt-1">
                  Tolak permohonan surat dari <strong>{selectedRequest?.studentName}</strong>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Warning Alert */}
            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div className="flex-1 text-sm text-red-800 dark:text-red-200">
                    <p className="font-medium mb-1">Perhatian!</p>
                    <p className="text-xs">
                      Permohonan yang ditolak tidak dapat dikembalikan. Pastikan Anda memberikan alasan yang jelas dan konstruktif.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Request Summary */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Jenis Surat</span>
                    <span className="text-sm font-medium">{selectedRequest?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mahasiswa</span>
                    <span className="text-sm font-medium">{selectedRequest?.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">NIM</span>
                    <span className="text-sm font-mono font-medium">{selectedRequest?.studentNIM}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rejection Reason */}
            <div className="space-y-2">
              <Label htmlFor="reject-reason" className="text-sm font-medium">
                Alasan Penolakan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reject-reason"
                placeholder="Contoh: Dokumen persyaratan tidak lengkap. Mohon melengkapi..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={5}
                className="resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">
                Jelaskan dengan jelas alasan penolakan agar mahasiswa dapat memahami dan memperbaikinya
              </p>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)} disabled={processing}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={processing || !actionNotes.trim()}
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak Permohonan
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revision Dialog */}
      <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/50">
                <RotateCcw className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">Minta Revisi</DialogTitle>
                <DialogDescription className="mt-1">
                  Kembalikan permohonan surat dari <strong>{selectedRequest?.studentName}</strong> untuk diperbaiki
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Info Alert */}
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div className="flex-1 text-sm text-amber-800 dark:text-amber-200">
                    <p className="font-medium mb-1">Informasi</p>
                    <p className="text-xs">
                      Mahasiswa akan menerima notifikasi untuk memperbaiki permohonan sesuai dengan catatan yang Anda berikan.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Request Summary */}
            <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Jenis Surat</span>
                    <span className="text-sm font-medium">{selectedRequest?.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mahasiswa</span>
                    <span className="text-sm font-medium">{selectedRequest?.studentName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">NIM</span>
                    <span className="text-sm font-mono font-medium">{selectedRequest?.studentNIM}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revision Notes */}
            <div className="space-y-2">
              <Label htmlFor="revision-notes" className="text-sm font-medium">
                Catatan Revisi <span className="text-amber-500">*</span>
              </Label>
              <Textarea
                id="revision-notes"
                placeholder="Contoh: Mohon perbaiki format penulisan dan tambahkan lampiran KTM..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={5}
                className="resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">
                Jelaskan secara detail apa yang perlu diperbaiki agar mahasiswa dapat melakukan revisi dengan tepat
              </p>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsRevisionDialogOpen(false)} disabled={processing}>
              Batal
            </Button>
            <Button
              onClick={confirmRevision}
              disabled={processing || !actionNotes.trim()}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Kembalikan untuk Revisi
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
