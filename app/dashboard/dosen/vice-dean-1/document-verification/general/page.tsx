"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, FileText, Eye, User, Calendar, Mail, Phone, Search, ChevronLeft, ChevronRight, X, FileCheck, CalendarClock, AlertCircle } from "lucide-react"
import { getLetterRequestsByWorkflowStage } from "@/app/actions/correspondence/letter-requests"
import { approveLetterRequest, rejectRequest } from "@/app/actions/correspondence/letter-requests"
import type { LetterRequest } from "@/types/correspondence"
import { formatDate } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// Utility functions
const getInitials = (name: string) => {
  const words = name.split(' ').filter(word => word.length > 0)
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

const getAvatarColor = (str: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-violet-500',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function GeneralDocumentVerificationPage() {
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDoc, setSelectedDoc] = useState<LetterRequest | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [approvalNotes, setApprovalNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Load letter requests for WD1 approval
  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getLetterRequestsByWorkflowStage('wd1_approval')
        console.log('=== WD1 Letter Requests ===', data)
        setRequests(data)
      } catch (error) {
        console.error("Error loading letter requests:", error)
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

  const handleOpenDialog = (doc: LetterRequest) => {
    setSelectedDoc(doc)
    setIsDialogOpen(true)
    setRejectionReason("")
    setApprovalNotes("")
  }

  const handleApprove = async () => {
    if (!selectedDoc) return

    setIsProcessing(true)
    try {
      // For demo, using a hardcoded user ID - in production this should come from session
      const result = await approveLetterRequest(selectedDoc.id, "wd1-user-001", approvalNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan surat berhasil disetujui",
        })

        // Reload data
        const data = await getLetterRequestsByWorkflowStage('wd1_approval')
        setRequests(data)
        setIsDialogOpen(false)
        setSelectedDoc(null)
        setApprovalNotes("")
      }
    } catch (error) {
      console.error("Error approving request:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat menyetujui permohonan",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedDoc || !rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Alasan penolakan harus diisi",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)
    try {
      const result = await rejectRequest(selectedDoc.id, "wd1-user-001", rejectionReason)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan surat berhasil ditolak",
        })

        // Reload data
        const data = await getLetterRequestsByWorkflowStage('wd1_approval')
        setRequests(data)
        setIsDialogOpen(false)
        setSelectedDoc(null)
        setRejectionReason("")
      }
    } catch (error) {
      console.error("Error rejecting request:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan saat menolak permohonan",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Calculate statistics
  const pendingDocs = requests.filter(r => r.status === "in_review" || r.status === "in-review")
  const approvedDocs = requests.filter(r => r.status === "approved")
  const rejectedDocs = requests.filter(r => r.status === "rejected")
  const completedDocs = requests.filter(r => r.status === "completed")

  // Filter requests
  const filteredDocuments = requests.filter((req) => {
    const matchesSearch =
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentNIM.includes(searchQuery) ||
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.purpose.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && (req.status === "in_review" || req.status === "in-review")) ||
      req.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedDocuments = filteredDocuments.slice(startIndex, endIndex)

  const resetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verifikasi Dokumen Umum</h1>
        <p className="text-sm text-muted-foreground">
          Verifikasi dan persetujuan dokumen surat keterangan, rekomendasi, dan dokumen umum lainnya
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Menunggu Verifikasi</CardTitle>
            <div className="p-2.5 bg-amber-500/10 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700">{pendingDocs.length}</div>
            <p className="text-sm text-amber-600/80 mt-2">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Disetujui</CardTitle>
            <div className="p-2.5 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-700">{approvedDocs.length}</div>
            <p className="text-sm text-green-600/80 mt-2">Dokumen terverifikasi</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border-red-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Ditolak</CardTitle>
            <div className="p-2.5 bg-red-500/10 rounded-lg">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-red-700">{rejectedDocs.length}</div>
            <p className="text-sm text-red-600/80 mt-2">Perlu revisi</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-base font-medium">Total</CardTitle>
            <div className="p-2.5 bg-blue-500/10 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-700">{requests.length}</div>
            <p className="text-sm text-blue-600/80 mt-2">Semua dokumen</p>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama pemohon, NIM, jenis dokumen, atau keperluan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 text-base pl-11"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[220px] h-12 text-base">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="text-base">Semua Status</SelectItem>
                    <SelectItem value="pending" className="text-base">Menunggu ({pendingDocs.length})</SelectItem>
                    <SelectItem value="approved" className="text-base">Disetujui ({approvedDocs.length})</SelectItem>
                    <SelectItem value="rejected" className="text-base">Ditolak ({rejectedDocs.length})</SelectItem>
                  </SelectContent>
                </Select>
                {(searchQuery || statusFilter !== "all") && (
                  <Button variant="outline" onClick={resetFilters} className="h-12 px-6 text-base">
                    <X className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Daftar Dokumen Umum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border-2">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-sm font-semibold h-14">Pemohon</TableHead>
                      <TableHead className="text-sm font-semibold h-14">Jenis Dokumen</TableHead>
                      <TableHead className="text-sm font-semibold h-14">Program Studi</TableHead>
                      <TableHead className="text-sm font-semibold h-14">Keperluan</TableHead>
                      <TableHead className="text-sm font-semibold h-14">Diajukan</TableHead>
                      <TableHead className="text-sm font-semibold h-14">Status</TableHead>
                      <TableHead className="text-sm font-semibold h-14 text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedDocuments.length > 0 ? (
                      paginatedDocuments.map((req) => (
                        <TableRow key={req.id} className="hover:bg-muted/30 h-20">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full ${getAvatarColor(req.studentName)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                                {getInitials(req.studentName)}
                              </div>
                              <div>
                                <p className="font-semibold text-sm">{req.studentName}</p>
                                <Badge className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2 py-0.5 mt-1">
                                  {req.studentNIM}
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <FileCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                              <span className="max-w-[200px] truncate">{req.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm font-medium">{req.studentMajor}</span>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm max-w-xs truncate">{req.purpose}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CalendarClock className="h-4 w-4 flex-shrink-0" />
                              <span>{formatDate(req.requestDate)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {(req.status === "in_review" || req.status === "in-review") && (
                              <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-sm px-3 py-1">
                                <Clock className="h-4 w-4 mr-1" />
                                Menunggu
                              </Badge>
                            )}
                            {req.status === "approved" && (
                              <Badge className="bg-green-100 text-green-700 border border-green-200 text-sm px-3 py-1">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Disetujui
                              </Badge>
                            )}
                            {req.status === "rejected" && (
                              <Badge className="bg-red-100 text-red-700 border border-red-200 text-sm px-3 py-1">
                                <XCircle className="h-4 w-4 mr-1" />
                                Ditolak
                              </Badge>
                            )}
                            {req.status === "completed" && (
                              <Badge className="bg-blue-100 text-blue-700 border border-blue-200 text-sm px-3 py-1">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Selesai
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(req)}
                              className="h-9 px-4"
                            >
                              <Eye className="w-5 h-5 mr-2" />
                              Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-14 w-14 mb-3 opacity-50" />
                            <p className="text-base font-medium">Tidak ada dokumen ditemukan</p>
                            <p className="text-sm mt-1">
                              {requests.length === 0
                                ? "Belum ada permohonan surat yang diteruskan ke WD1"
                                : "Coba ubah filter atau kata kunci pencarian"}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {filteredDocuments.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                  <p className="text-sm text-muted-foreground font-medium">
                    Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredDocuments.length)} dari {filteredDocuments.length} data
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="h-10 px-4"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="h-10 w-10 text-base"
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="h-10 px-4"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-primary" />
              Verifikasi Dokumen Umum
            </DialogTitle>
            <DialogDescription className="text-base">
              Tinjau detail permohonan dokumen dan berikan persetujuan atau penolakan
            </DialogDescription>
          </DialogHeader>

          {selectedDoc && (
            <div className="space-y-6 py-4">
              {/* Requester Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informasi Pemohon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Nama Lengkap</p>
                      <p className="text-base font-medium">{selectedDoc.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">NIM</p>
                      <p className="text-base font-medium">{selectedDoc.studentNIM}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Program Studi</p>
                      <p className="text-base font-medium">{selectedDoc.studentMajor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Fakultas</p>
                      <p className="text-base font-medium">{selectedDoc.studentFaculty}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Semester</p>
                      <p className="text-base font-medium">{selectedDoc.studentSemester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tahun Akademik</p>
                      <p className="text-base font-medium">{selectedDoc.academicYear}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Document Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Detail Permohonan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Jenis Dokumen</p>
                      <p className="text-base font-medium">{selectedDoc.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4" /> Diajukan
                      </p>
                      <p className="text-base font-medium">{formatDate(selectedDoc.requestDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Keperluan</p>
                    <p className="text-base font-medium">{selectedDoc.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Keterangan</p>
                    <p className="text-base">{selectedDoc.description || '-'}</p>
                  </div>
                  {selectedDoc.attachments && selectedDoc.attachments.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Lampiran</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDoc.attachments.map((file, j) => (
                          <Badge key={j} className="bg-blue-100 text-blue-700 border border-blue-200 text-sm px-3 py-1">
                            <FileText className="h-4 w-4 mr-1" />
                            {file.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Cards */}
              {(selectedDoc.status === "in_review" || selectedDoc.status === "in-review") && (
                <>
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Catatan Persetujuan (Opsional)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Tambahkan catatan persetujuan jika diperlukan..."
                        value={approvalNotes}
                        onChange={(e) => setApprovalNotes(e.target.value)}
                        rows={3}
                        className="text-base"
                      />
                    </CardContent>
                  </Card>
                  <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        Alasan Penolakan (Jika Ditolak)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Berikan alasan penolakan jika permohonan ditolak..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={3}
                        className="text-base"
                      />
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          )}

          <DialogFooter>
            {(selectedDoc?.status === "in_review" || selectedDoc?.status === "in-review") ? (
              <div className="flex items-center gap-3 w-full justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isProcessing}
                  size="default"
                  className="text-base h-11"
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isProcessing || !rejectionReason.trim()}
                  size="default"
                  className="text-base h-11"
                >
                  {isProcessing ? (
                    <>
                      <XCircle className="mr-2 h-5 w-5 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-5 w-5" />
                      Tolak
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  size="default"
                  className="text-base h-11"
                >
                  {isProcessing ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Setujui
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} size="default" className="text-base h-11">
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
