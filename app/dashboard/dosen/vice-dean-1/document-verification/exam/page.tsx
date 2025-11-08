"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { CheckCircle, XCircle, Clock, FileText, Eye, Download, User, GraduationCap, Calendar, Mail, Phone } from "lucide-react"

interface ExamDocument {
  id: string
  student: string
  nim: string
  prodi: string
  semester: number
  email: string
  phone: string
  type: string
  submitted: string
  documents: string[]
  status: "pending" | "approved" | "rejected"
  approver?: string
  approvedDate?: string
  rejectedReason?: string
}

export default function ExamVerificationPage() {
  const [selectedDoc, setSelectedDoc] = useState<ExamDocument | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const mockDocuments: ExamDocument[] = [
    {
      id: "exam-001",
      student: "Budi Santoso",
      nim: "2019101001",
      prodi: "Informatika",
      semester: 8,
      email: "budi.santoso@example.com",
      phone: "081234567890",
      type: "Ujian Skripsi",
      submitted: "2 jam lalu",
      documents: ["Transkrip Nilai", "Bukti Pembayaran", "KRS Terakhir"],
      status: "pending"
    },
    {
      id: "exam-002",
      student: "Ani Wijaya",
      nim: "2019101002",
      prodi: "Teknik Sipil",
      semester: 7,
      email: "ani.wijaya@example.com",
      phone: "081234567891",
      type: "Ujian Proposal",
      submitted: "5 jam lalu",
      documents: ["Transkrip Nilai", "Form Pendaftaran", "Draft Proposal"],
      status: "pending"
    },
    {
      id: "exam-003",
      student: "Dedi Pratama",
      nim: "2019101003",
      prodi: "Arsitektur",
      semester: 8,
      email: "dedi.pratama@example.com",
      phone: "081234567892",
      type: "Ujian Komprehensif",
      submitted: "1 hari lalu",
      documents: ["Transkrip Nilai", "Sertifikat TOEFL", "Bukti Publikasi"],
      status: "pending"
    },
    {
      id: "exam-004",
      student: "Eko Saputra",
      nim: "2019101004",
      prodi: "Teknik Elektro",
      semester: 8,
      email: "eko.saputra@example.com",
      phone: "081234567893",
      type: "Ujian Skripsi",
      submitted: "1 jam lalu",
      documents: ["Transkrip Nilai", "Bukti Pembayaran"],
      status: "approved",
      approver: "Dr. John Doe",
      approvedDate: "1 jam lalu"
    },
    {
      id: "exam-005",
      student: "Siti Rahayu",
      nim: "2019101005",
      prodi: "Informatika",
      semester: 7,
      email: "siti.rahayu@example.com",
      phone: "081234567894",
      type: "Ujian Proposal",
      submitted: "3 jam lalu",
      documents: ["Transkrip Nilai", "Draft Proposal"],
      status: "approved",
      approver: "Dr. John Doe",
      approvedDate: "3 jam lalu"
    },
    {
      id: "exam-006",
      student: "Ahmad Hidayat",
      nim: "2019101006",
      prodi: "PWK",
      semester: 8,
      email: "ahmad.hidayat@example.com",
      phone: "081234567895",
      type: "Ujian Skripsi",
      submitted: "2 jam lalu",
      documents: ["Transkrip Nilai"],
      status: "rejected",
      rejectedReason: "Transkrip nilai tidak lengkap"
    }
  ]

  const [documents, setDocuments] = useState<ExamDocument[]>(mockDocuments)

  const handleOpenDialog = (doc: ExamDocument) => {
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

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Verifikasi Dokumen Ujian</h1>
        <p className="text-xs text-muted-foreground">
          Verifikasi dan persetujuan dokumen ujian skripsi, proposal, dan komprehensif
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Menunggu Verifikasi</CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-700">{pendingDocs.length}</div>
            <p className="text-[10px] text-amber-600/80">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Disetujui Hari Ini</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-700">{approvedDocs.length}</div>
            <p className="text-[10px] text-green-600/80">Dokumen terverifikasi</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-red-50 to-red-100 border-red-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Ditolak</CardTitle>
            <div className="p-1.5 bg-red-500/10 rounded-lg">
              <XCircle className="h-3.5 w-3.5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-700">{rejectedDocs.length}</div>
            <p className="text-[10px] text-red-600/80">Perlu revisi</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Total Bulan Ini</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-700">{documents.length}</div>
            <p className="text-[10px] text-blue-600/80">Semua status</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="pending" className="space-y-3">
        <TabsList className="h-9">
          <TabsTrigger value="pending" className="text-xs">Menunggu ({pendingDocs.length})</TabsTrigger>
          <TabsTrigger value="approved" className="text-xs">Disetujui ({approvedDocs.length})</TabsTrigger>
          <TabsTrigger value="rejected" className="text-xs">Ditolak ({rejectedDocs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          <Card className="border-l-4 border-l-amber-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dokumen Menunggu Verifikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {pendingDocs.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-gray-50 to-white hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium">{item.student}</p>
                        <Badge variant="outline" className="text-[10px]">{item.nim}</Badge>
                        <Badge className="text-[10px]">{item.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.prodi} • Semester {item.semester}
                      </p>
                      <p className="text-xs text-muted-foreground">Diajukan {item.submitted}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(item)}
                      className="h-8 text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Lihat Detail
                    </Button>
                  </div>
                ))}
                {pendingDocs.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">Tidak ada dokumen menunggu verifikasi</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dokumen Disetujui</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {approvedDocs.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm font-medium">{item.student}</p>
                        <Badge variant="outline" className="text-[10px]">{item.nim}</Badge>
                        <Badge className="bg-green-100 text-green-700 text-[10px]">{item.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Disetujui {item.approvedDate} oleh {item.approver}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Unduh
                    </Button>
                  </div>
                ))}
                {approvedDocs.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">Belum ada dokumen disetujui</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-3">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dokumen Ditolak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rejectedDocs.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <p className="text-sm font-medium">{item.student}</p>
                      <Badge variant="outline" className="text-[10px]">{item.nim}</Badge>
                      <Badge variant="destructive" className="text-[10px]">{item.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Ditolak {item.submitted}</p>
                    <p className="text-xs font-medium text-red-700">Alasan: {item.rejectedReason}</p>
                  </div>
                ))}
                {rejectedDocs.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">Tidak ada dokumen ditolak</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verification Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Verifikasi Dokumen Ujian
            </DialogTitle>
            <DialogDescription>
              Tinjau detail dokumen ujian dan berikan persetujuan atau penolakan
            </DialogDescription>
          </DialogHeader>

          {selectedDoc && (
            <div className="space-y-4 py-4">
              {/* Student Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informasi Mahasiswa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Nama Lengkap</p>
                      <p className="text-sm font-medium">{selectedDoc.student}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">NIM</p>
                      <p className="text-sm font-medium">{selectedDoc.nim}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Program Studi</p>
                      <p className="text-sm font-medium">{selectedDoc.prodi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Semester</p>
                      <p className="text-sm font-medium">{selectedDoc.semester}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Email
                      </p>
                      <p className="text-sm font-medium">{selectedDoc.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> Telepon
                      </p>
                      <p className="text-sm font-medium">{selectedDoc.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exam Information */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Detail Ujian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Jenis Ujian</p>
                      <p className="text-sm font-medium">{selectedDoc.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Diajukan
                      </p>
                      <p className="text-sm font-medium">{selectedDoc.submitted}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Dokumen Terlampir</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoc.documents.map((doc, j) => (
                        <Badge key={j} variant="secondary" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rejection Reason */}
              {selectedDoc.status === "pending" && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Catatan Penolakan (Opsional)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Berikan alasan jika menolak dokumen ini..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      rows={3}
                      className="text-sm"
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            {selectedDoc?.status === "pending" ? (
              <div className="flex items-center gap-2 w-full justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isProcessing}
                  size="sm"
                  className="text-xs"
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={isProcessing || !rejectionReason.trim()}
                  size="sm"
                  className="text-xs"
                >
                  {isProcessing ? (
                    <>
                      <XCircle className="mr-1 h-3 w-3 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" />
                      Tolak
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={isProcessing}
                  size="sm"
                  className="text-xs"
                >
                  {isProcessing ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Setujui
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} size="sm" className="text-xs">
                Tutup
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
