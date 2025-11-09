"use client"

import { useState } from "react"
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
import { CheckCircle, XCircle, Clock, FileText, Eye, User, Calendar, Mail, Phone, Search, ChevronLeft, ChevronRight, X, FileCheck, CalendarClock } from "lucide-react"

interface GeneralDocument {
  id: string
  requester: string
  nim: string
  prodi: string
  semester: number
  email: string
  phone: string
  type: string
  submitted: string
  purpose: string
  attachments: string[]
  status: "pending" | "approved" | "rejected"
  approver?: string
  approvedDate?: string
  rejectedReason?: string
}

const mockDocuments: GeneralDocument[] = [
  {
    id: "1",
    requester: "Budi Santoso",
    nim: "2019101001",
    prodi: "Informatika",
    semester: 7,
    email: "budi.santoso@student.edu",
    phone: "081234567890",
    type: "Surat Keterangan Aktif Kuliah",
    submitted: "1 jam lalu",
    purpose: "Keperluan beasiswa",
    attachments: ["KTM.pdf", "Bukti Pembayaran UKT.pdf"],
    status: "pending"
  },
  {
    id: "2",
    requester: "Ani Wijaya",
    nim: "2019101002",
    prodi: "Teknik Sipil",
    semester: 6,
    email: "ani.wijaya@student.edu",
    phone: "081234567891",
    type: "Surat Ijin Penelitian",
    submitted: "3 jam lalu",
    purpose: "Penelitian tugas akhir",
    attachments: ["Proposal Penelitian.pdf", "Surat Pengantar.pdf"],
    status: "pending"
  },
  {
    id: "3",
    requester: "Dedi Pratama",
    nim: "2019101003",
    prodi: "Arsitektur",
    semester: 8,
    email: "dedi.pratama@student.edu",
    phone: "081234567892",
    type: "Surat Rekomendasi",
    submitted: "5 jam lalu",
    purpose: "Pendaftaran beasiswa LPDP",
    attachments: ["CV.pdf", "Transkrip Nilai.pdf", "Sertifikat.pdf"],
    status: "pending"
  },
  {
    id: "4",
    requester: "Siti Rahayu",
    nim: "2019101005",
    prodi: "Informatika",
    semester: 8,
    email: "siti.rahayu@student.edu",
    phone: "081234567893",
    type: "Surat Keterangan Aktif Kuliah",
    submitted: "30 menit lalu",
    purpose: "Keperluan administrasi bank",
    attachments: ["KTM.pdf"],
    status: "approved",
    approver: "Dr. John Doe",
    approvedDate: "30 menit lalu"
  },
  {
    id: "5",
    requester: "Ahmad Hidayat",
    nim: "2019101006",
    prodi: "Teknik Sipil",
    semester: 5,
    email: "ahmad.hidayat@student.edu",
    phone: "081234567894",
    type: "Surat Ijin Cuti",
    submitted: "1 jam lalu",
    purpose: "Keperluan kesehatan",
    attachments: ["Surat Keterangan Dokter.pdf"],
    status: "rejected",
    rejectedReason: "Dokumen pendukung tidak lengkap"
  },
  {
    id: "6",
    requester: "Rina Susanti",
    nim: "2019101007",
    prodi: "Teknik Elektro",
    semester: 7,
    email: "rina.susanti@student.edu",
    phone: "081234567895",
    type: "Surat Keterangan Bebas Pinjaman",
    submitted: "2 jam lalu",
    purpose: "Persyaratan wisuda",
    attachments: ["Bukti Pengembalian Buku.pdf"],
    status: "approved",
    approver: "Dr. John Doe",
    approvedDate: "1 jam lalu"
  },
  {
    id: "7",
    requester: "Eko Saputra",
    nim: "2019101008",
    prodi: "PWK",
    semester: 6,
    email: "eko.saputra@student.edu",
    phone: "081234567896",
    type: "Surat Pengantar Magang",
    submitted: "4 jam lalu",
    purpose: "Magang di perusahaan",
    attachments: ["CV.pdf", "Portofolio.pdf"],
    status: "pending"
  },
  {
    id: "8",
    requester: "Lina Marlina",
    nim: "2019101009",
    prodi: "Informatika",
    semester: 8,
    email: "lina.marlina@student.edu",
    phone: "081234567897",
    type: "Surat Rekomendasi",
    submitted: "1 hari lalu",
    purpose: "Pendaftaran S2",
    attachments: ["Transkrip Nilai.pdf", "Sertifikat TOEFL.pdf"],
    status: "approved",
    approver: "Dr. John Doe",
    approvedDate: "5 jam lalu"
  },
  {
    id: "9",
    requester: "Hendra Gunawan",
    nim: "2019101010",
    prodi: "Arsitektur",
    semester: 7,
    email: "hendra.gunawan@student.edu",
    phone: "081234567898",
    type: "Surat Keterangan Aktif Kuliah",
    submitted: "30 menit lalu",
    purpose: "Keperluan asuransi",
    attachments: ["KTM.pdf", "Bukti Pembayaran.pdf"],
    status: "pending"
  },
  {
    id: "10",
    requester: "Fitri Handayani",
    nim: "2019101011",
    prodi: "Teknik Sipil",
    semester: 5,
    email: "fitri.handayani@student.edu",
    phone: "081234567899",
    type: "Surat Ijin Penelitian",
    submitted: "2 jam lalu",
    purpose: "Penelitian skripsi",
    attachments: ["Proposal.pdf"],
    status: "rejected",
    rejectedReason: "Proposal perlu direvisi sesuai saran pembimbing"
  },
]

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

const getDocumentTypeBadgeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    'Surat Keterangan Aktif Kuliah': 'bg-blue-100 text-blue-700 border-blue-200',
    'Surat Ijin Penelitian': 'bg-purple-100 text-purple-700 border-purple-200',
    'Surat Rekomendasi': 'bg-indigo-100 text-indigo-700 border-indigo-200',
    'Surat Ijin Cuti': 'bg-orange-100 text-orange-700 border-orange-200',
    'Surat Keterangan Bebas Pinjaman': 'bg-green-100 text-green-700 border-green-200',
    'Surat Pengantar Magang': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  }
  return colorMap[type] || 'bg-gray-100 text-gray-700 border-gray-200'
}

const getProdiBadgeColor = (prodi: string) => {
  const colorMap: Record<string, string> = {
    'Informatika': 'bg-blue-100 text-blue-700 border-blue-200',
    'Teknik Sipil': 'bg-green-100 text-green-700 border-green-200',
    'Arsitektur': 'bg-purple-100 text-purple-700 border-purple-200',
    'Teknik Elektro': 'bg-amber-100 text-amber-700 border-amber-200',
    'PWK': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  }
  return colorMap[prodi] || 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function GeneralDocumentVerificationPage() {
  const [documents, setDocuments] = useState<GeneralDocument[]>(mockDocuments)
  const [selectedDoc, setSelectedDoc] = useState<GeneralDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleOpenDialog = (doc: GeneralDocument) => {
    setSelectedDoc(doc)
    setIsDialogOpen(true)
    setRejectionReason("")
  }

  const handleApprove = async () => {
    if (!selectedDoc) return

    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setDocuments(prev =>
      prev.map(doc =>
        doc.id === selectedDoc.id
          ? { ...doc, status: "approved" as const, approver: "Dr. John Doe", approvedDate: "Baru saja" }
          : doc
      )
    )

    setIsProcessing(false)
    setIsDialogOpen(false)
    setSelectedDoc(null)
  }

  const handleReject = async () => {
    if (!selectedDoc || !rejectionReason.trim()) return

    setIsProcessing(true)
    await new Promise(resolve => setTimeout(resolve, 1000))

    setDocuments(prev =>
      prev.map(doc =>
        doc.id === selectedDoc.id
          ? { ...doc, status: "rejected" as const, rejectedReason: rejectionReason }
          : doc
      )
    )

    setIsProcessing(false)
    setIsDialogOpen(false)
    setSelectedDoc(null)
    setRejectionReason("")
  }

  const pendingDocs = documents.filter(d => d.status === "pending")
  const approvedDocs = documents.filter(d => d.status === "approved")
  const rejectedDocs = documents.filter(d => d.status === "rejected")

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.nim.includes(searchQuery) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.purpose.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter

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
            <div className="text-4xl font-bold text-blue-700">{documents.length}</div>
            <p className="text-sm text-blue-600/80 mt-2">Semua dokumen</p>
          </CardContent>
        </Card>
      </div>

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
                  paginatedDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-muted/30 h-20">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(doc.requester)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                            {getInitials(doc.requester)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{doc.requester}</p>
                            <Badge className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2 py-0.5 mt-1">
                              {doc.nim}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <FileCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="max-w-[200px] truncate">{doc.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{doc.prodi}</span>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm max-w-xs truncate">{doc.purpose}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarClock className="h-4 w-4 flex-shrink-0" />
                          <span>{doc.submitted}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {doc.status === "pending" && (
                          <Badge className="bg-amber-100 text-amber-700 border border-amber-200 text-sm px-3 py-1">
                            <Clock className="h-4 w-4 mr-1" />
                            Menunggu
                          </Badge>
                        )}
                        {doc.status === "approved" && (
                          <Badge className="bg-green-100 text-green-700 border border-green-200 text-sm px-3 py-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Disetujui
                          </Badge>
                        )}
                        {doc.status === "rejected" && (
                          <Badge className="bg-red-100 text-red-700 border border-red-200 text-sm px-3 py-1">
                            <XCircle className="h-4 w-4 mr-1" />
                            Ditolak
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(doc)}
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
                        <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
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

      {/* Verification Dialog */}
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
                      <p className="text-base font-medium">{selectedDoc.requester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">NIM</p>
                      <p className="text-base font-medium">{selectedDoc.nim}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Program Studi</p>
                      <p className="text-base font-medium">{selectedDoc.prodi}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Semester</p>
                      <p className="text-base font-medium">{selectedDoc.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Mail className="h-4 w-4" /> Email
                      </p>
                      <p className="text-base font-medium">{selectedDoc.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Phone className="h-4 w-4" /> Telepon
                      </p>
                      <p className="text-base font-medium">{selectedDoc.phone}</p>
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
                      <p className="text-base font-medium">{selectedDoc.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                        <Calendar className="h-4 w-4" /> Diajukan
                      </p>
                      <p className="text-base font-medium">{selectedDoc.submitted}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Keperluan</p>
                    <p className="text-base font-medium">{selectedDoc.purpose}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Lampiran</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoc.attachments.map((file, j) => (
                        <Badge key={j} className="bg-blue-100 text-blue-700 border border-blue-200 text-sm px-3 py-1">
                          <FileText className="h-4 w-4 mr-1" />
                          {file}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rejection Reason */}
              {selectedDoc.status === "pending" && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-base">Catatan Penolakan (Opsional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Berikan alasan jika menolak permohonan ini..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={4}
                      className="text-base"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedDoc?.status === "pending" ? (
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
