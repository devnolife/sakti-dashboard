"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Clock, FileText, Eye, Download, Mail, User, Calendar, FileCheck, Loader2 } from "lucide-react"

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
    prodi: "Teknik Informatika",
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
    prodi: "Sistem Informasi",
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
    prodi: "Teknik Komputer",
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
    prodi: "Teknik Informatika",
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
    prodi: "Sistem Informasi",
    semester: 5,
    email: "ahmad.hidayat@student.edu",
    phone: "081234567894",
    type: "Surat Ijin Cuti",
    submitted: "1 jam lalu",
    purpose: "Keperluan kesehatan",
    attachments: ["Surat Dokter.pdf", "KTM.pdf"],
    status: "approved",
    approver: "Dr. John Doe",
    approvedDate: "1 jam lalu"
  },
  {
    id: "6",
    requester: "Rizki Ramadhan",
    nim: "2019101008",
    prodi: "Teknik Komputer",
    semester: 8,
    email: "rizki.ramadhan@student.edu",
    phone: "081234567895",
    type: "Surat Keterangan Lulus",
    submitted: "1 jam lalu",
    purpose: "Melamar pekerjaan",
    attachments: ["Ijazah Sementara.pdf"],
    status: "rejected",
    rejectedReason: "Masih terdapat tunggakan administrasi"
  }
]

export default function GeneralVerificationPage() {
  const [documents, setDocuments] = useState<GeneralDocument[]>(mockDocuments)
  const [selectedDoc, setSelectedDoc] = useState<GeneralDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const pendingDocs = documents.filter(d => d.status === "pending")
  const approvedDocs = documents.filter(d => d.status === "approved")
  const rejectedDocs = documents.filter(d => d.status === "rejected")

  const handleOpenDialog = (doc: GeneralDocument) => {
    setSelectedDoc(doc)
    setRejectionReason(doc.rejectedReason || "")
    setIsDialogOpen(true)
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Verifikasi Dokumen Umum</h1>
          <p className="text-xs text-muted-foreground">
            Verifikasi dokumen umum seperti surat keterangan, ijin, dan dokumen administratif lainnya
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-amber-900">Menunggu Verifikasi</CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-900">{pendingDocs.length}</div>
            <p className="text-[10px] text-amber-700/80">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-green-900">Disetujui</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-900">{approvedDocs.length}</div>
            <p className="text-[10px] text-green-700/80">Dokumen terverifikasi</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100 border-red-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-red-900">Ditolak</CardTitle>
            <div className="p-1.5 bg-red-500/10 rounded-lg">
              <XCircle className="h-3.5 w-3.5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-900">{rejectedDocs.length}</div>
            <p className="text-[10px] text-red-700/80">Perlu revisi</p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-blue-900">Total Dokumen</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-900">{documents.length}</div>
            <p className="text-[10px] text-blue-700/80">Semua status</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pending" className="space-y-3">
        <TabsList className="h-8">
          <TabsTrigger value="pending" className="text-xs h-7">Menunggu ({pendingDocs.length})</TabsTrigger>
          <TabsTrigger value="approved" className="text-xs h-7">Disetujui ({approvedDocs.length})</TabsTrigger>
          <TabsTrigger value="rejected" className="text-xs h-7">Ditolak ({rejectedDocs.length})</TabsTrigger>
          <TabsTrigger value="all" className="text-xs h-7">Semua</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dokumen Menunggu Verifikasi</CardTitle>
              <CardDescription className="text-xs">Dokumen umum yang perlu diverifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingDocs.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-sm font-semibold">{item.requester}</h4>
                          <Badge variant="outline" className="text-[10px] h-5">{item.nim}</Badge>
                          <Badge variant="secondary" className="text-[10px] h-5">{item.prodi}</Badge>
                        </div>
                        <div className="mb-2">
                          <Badge className="text-[10px] h-5">{item.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Keperluan: {item.purpose}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Diajukan {item.submitted}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs shrink-0"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Lihat Detail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dokumen Disetujui</CardTitle>
              <CardDescription className="text-xs">Riwayat dokumen yang telah disetujui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {approvedDocs.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <CheckCircle className="h-3.5 w-3.5 text-green-600 shrink-0" />
                          <h4 className="text-sm font-semibold">{item.requester}</h4>
                          <Badge variant="outline" className="text-[10px] h-5">{item.nim}</Badge>
                          <Badge className="text-[10px] h-5">{item.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Disetujui {item.approvedDate} oleh {item.approver}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Unduh
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          Kirim
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-3">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dokumen Ditolak</CardTitle>
              <CardDescription className="text-xs">Dokumen yang memerlukan revisi atau informasi tambahan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rejectedDocs.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <XCircle className="h-3.5 w-3.5 text-red-600 shrink-0" />
                          <h4 className="text-sm font-semibold">{item.requester}</h4>
                          <Badge variant="outline" className="text-[10px] h-5">{item.nim}</Badge>
                          <Badge variant="destructive" className="text-[10px] h-5">{item.type}</Badge>
                        </div>
                        <p className="text-xs font-medium text-red-600 mb-1">
                          Alasan: {item.rejectedReason}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs shrink-0"
                        onClick={() => handleOpenDialog(item)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Detail
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Kategori Dokumen Umum</CardTitle>
              <CardDescription className="text-xs">Statistik berdasarkan jenis dokumen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="border-l-4 border-l-blue-500 rounded-lg p-3 bg-gradient-to-br from-blue-50 to-blue-100">
                  <h4 className="text-xs font-semibold text-blue-900 mb-2">Surat Keterangan</h4>
                  <p className="text-2xl font-bold text-blue-900">98</p>
                  <p className="text-[10px] text-blue-700/80 mt-1">Bulan ini</p>
                </div>
                <div className="border-l-4 border-l-purple-500 rounded-lg p-3 bg-gradient-to-br from-purple-50 to-purple-100">
                  <h4 className="text-xs font-semibold text-purple-900 mb-2">Surat Ijin</h4>
                  <p className="text-2xl font-bold text-purple-900">45</p>
                  <p className="text-[10px] text-purple-700/80 mt-1">Bulan ini</p>
                </div>
                <div className="border-l-4 border-l-green-500 rounded-lg p-3 bg-gradient-to-br from-green-50 to-green-100">
                  <h4 className="text-xs font-semibold text-green-900 mb-2">Surat Rekomendasi</h4>
                  <p className="text-2xl font-bold text-green-900">91</p>
                  <p className="text-[10px] text-green-700/80 mt-1">Bulan ini</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              Verifikasi Dokumen Umum
            </DialogTitle>
            <DialogDescription>
              Detail pengajuan dokumen dan verifikasi
            </DialogDescription>
          </DialogHeader>

          {selectedDoc && (
            <div className="space-y-4 py-4">
              {/* Student Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informasi Pemohon
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Nama Lengkap</Label>
                    <p className="text-sm font-medium">{selectedDoc.requester}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">NIM</Label>
                    <p className="text-sm font-medium">{selectedDoc.nim}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Program Studi</Label>
                    <p className="text-sm font-medium">{selectedDoc.prodi}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Semester</Label>
                    <p className="text-sm font-medium">Semester {selectedDoc.semester}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <p className="text-sm font-medium">{selectedDoc.email}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">No. Telepon</Label>
                    <p className="text-sm font-medium">{selectedDoc.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Document Info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Detail Dokumen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Jenis Dokumen</Label>
                    <p className="text-sm font-medium">{selectedDoc.type}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Keperluan</Label>
                    <p className="text-sm font-medium">{selectedDoc.purpose}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Waktu Pengajuan</Label>
                    <p className="text-sm font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {selectedDoc.submitted}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Dokumen Lampiran</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedDoc.attachments.map((doc, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      {selectedDoc.status === "pending" && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Menunggu Verifikasi
                        </Badge>
                      )}
                      {selectedDoc.status === "approved" && (
                        <Badge className="text-xs bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Disetujui
                        </Badge>
                      )}
                      {selectedDoc.status === "rejected" && (
                        <Badge variant="destructive" className="text-xs">
                          <XCircle className="h-3 w-3 mr-1" />
                          Ditolak
                        </Badge>
                      )}
                    </div>
                  </div>
                  {selectedDoc.status === "approved" && selectedDoc.approver && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Disetujui Oleh</Label>
                      <p className="text-sm font-medium">{selectedDoc.approver} - {selectedDoc.approvedDate}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Rejection Reason */}
              {selectedDoc.status === "pending" && (
                <div className="space-y-2">
                  <Label htmlFor="rejection-reason" className="text-sm">
                    Alasan Penolakan (Opsional)
                  </Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="Masukkan alasan jika dokumen ditolak..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="min-h-[80px] text-sm"
                  />
                </div>
              )}

              {selectedDoc.status === "rejected" && selectedDoc.rejectedReason && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-900 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Alasan Penolakan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-red-800">{selectedDoc.rejectedReason}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedDoc?.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false)
                    setRejectionReason("")
                  }}
                  disabled={isProcessing}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={!rejectionReason.trim() || isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-2 h-4 w-4" />
                      Tolak Dokumen
                    </>
                  )}
                </Button>
                <Button onClick={handleApprove} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Setujui Dokumen
                    </>
                  )}
                </Button>
              </>
            )}
            {selectedDoc?.status !== "pending" && (
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
