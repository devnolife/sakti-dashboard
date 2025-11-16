"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
  RotateCcw,
  Eye,
  Download,
} from "lucide-react"
import { getAllLetterRequests } from "@/app/actions/correspondence-actions"
import { forwardLetterToWD1, rejectRequest, returnLetterForRevision } from "@/app/actions/correspondence/letter-requests"
import type { LetterRequest } from "@/types/correspondence"
import { toast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function CorrespondenceDraftDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [request, setRequest] = useState<LetterRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")
  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false)
  const [actionNotes, setActionNotes] = useState("")
  const [processing, setProcessing] = useState(false)
  const [previewPdfUrl, setPreviewPdfUrl] = useState<string | null>(null)
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false)

  useEffect(() => {
    async function loadRequest() {
      try {
        const allRequests = await getAllLetterRequests()
        const foundRequest = allRequests.find(r => r.id === id)

        if (foundRequest) {
          setRequest(foundRequest)
        } else {
          toast({
            title: "Error",
            description: "Permohonan tidak ditemukan",
            variant: "destructive"
          })
          router.push('/dashboard/admin_umum/correspondence/drafts')
        }
      } catch (error) {
        console.error("Error loading request:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data permohonan",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadRequest()
    }
  }, [id, router])

  const confirmForward = async () => {
    if (!request) return
    setProcessing(true)

    try {
      const result = await forwardLetterToWD1(request.id, "admin-umum-001", actionNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan berhasil diteruskan ke WD1",
        })
        router.push('/dashboard/admin_umum/correspondence/drafts')
      }
    } catch (error) {
      console.error("Error forwarding request:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  const confirmReject = async () => {
    if (!request || !actionNotes.trim()) {
      toast({
        title: "Error",
        description: "Alasan penolakan harus diisi",
        variant: "destructive"
      })
      return
    }

    setProcessing(true)

    try {
      const result = await rejectRequest(request.id, "admin-umum-001", actionNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan berhasil ditolak",
        })
        router.push('/dashboard/admin_umum/correspondence/drafts')
      }
    } catch (error) {
      console.error("Error rejecting request:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
  }

  const confirmRevision = async () => {
    if (!request || !actionNotes.trim()) {
      toast({
        title: "Error",
        description: "Catatan revisi harus diisi",
        variant: "destructive"
      })
      return
    }

    setProcessing(true)

    try {
      const result = await returnLetterForRevision(request.id, "admin-umum-001", actionNotes)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan berhasil dikembalikan untuk revisi",
        })
        router.push('/dashboard/admin_umum/correspondence/drafts')
      }
    } catch (error) {
      console.error("Error returning for revision:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive"
      })
    } finally {
      setProcessing(false)
    }
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
      case "in_review":
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
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-500/10">
            Unknown
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin_umum/correspondence/drafts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Memuat...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!request) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/admin_umum/correspondence/drafts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{request.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge(request.status)}
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Diajukan {formatDate(request.requestDate)}</span>
            </div>
          </div>
        </div>

        {request.status === "submitted" && (
          <div className="flex gap-2">
            <Button
              onClick={() => setIsForwardDialogOpen(true)}
              className="bg-green-600 hover:bg-green-700"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Teruskan ke WD1
            </Button>
            <Button
              onClick={() => setIsRevisionDialogOpen(true)}
              variant="outline"
              className="border-amber-200 hover:bg-amber-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Minta Revisi
            </Button>
            <Button
              onClick={() => setIsRejectDialogOpen(true)}
              variant="outline"
              className="border-red-200 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Tolak
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Detail Permohonan</TabsTrigger>
          <TabsTrigger value="student">Info Mahasiswa</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="timeline">Riwayat</TabsTrigger>
        </TabsList>

        {/* Detail Permohonan Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Detail Permohonan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Jenis Surat</p>
                  <p className="text-sm font-medium">{request.type}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Tujuan Penggunaan</p>
                  <p className="text-sm font-medium">{request.purpose}</p>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-background/50">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">Keterangan Tambahan</p>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {request.description || '-'}
                </p>
              </div>

              {request.additionalInfo && Object.keys(request.additionalInfo).length > 0 && (
                <div className="pt-4 space-y-3 border-t">
                  <p className="text-sm font-semibold">Data Pendukung Lainnya</p>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {Object.entries(request.additionalInfo).map(([key, value]) => {
                      const isFileObject = typeof value === 'object' && value?.name && value?.data

                      // Mapping field names to Indonesian
                      const fieldNameMapping: Record<string, string> = {
                        // General fields
                        type: 'Jenis',
                        active: 'Aktif',
                        title: 'Judul',
                        purpose: 'Tujuan',
                        reason: 'Alasan',
                        description: 'Keterangan',

                        // Academic fields
                        semester: 'Semester',
                        academicYear: 'Tahun Akademik',
                        academic_year: 'Tahun Akademik',
                        gpa: 'IPK',
                        ipk: 'IPK',
                        credits: 'SKS',
                        sks: 'SKS',
                        major: 'Program Studi',
                        studyProgram: 'Program Studi',
                        study_program: 'Program Studi',
                        faculty: 'Fakultas',

                        // Parent/Guardian fields
                        parentName: 'Nama Orang Tua',
                        parent_name: 'Nama Orang Tua',
                        parentPosition: 'Jabatan Orang Tua',
                        parent_position: 'Jabatan Orang Tua',
                        parentInstitution: 'Instansi Orang Tua',
                        parent_institution: 'Instansi Orang Tua',
                        parentCivilServant: 'Orang Tua PNS',
                        parent_civil_servant: 'Orang Tua PNS',
                        isParentCivilServant: 'Orang Tua PNS',
                        is_parent_civil_servant: 'Orang Tua PNS',

                        // Document fields
                        skDocument: 'Dokumen SK PNS/ASN',
                        sk_document: 'Dokumen SK PNS/ASN',
                        supportingDocument: 'Dokumen Pendukung',
                        supporting_document: 'Dokumen Pendukung',
                        paymentProof: 'Bukti Pembayaran',
                        payment_proof: 'Bukti Pembayaran',

                        // Date fields
                        startDate: 'Tanggal Mulai',
                        start_date: 'Tanggal Mulai',
                        endDate: 'Tanggal Selesai',
                        end_date: 'Tanggal Selesai',
                        date: 'Tanggal',

                        // Leave fields
                        leaveType: 'Jenis Cuti',
                        leave_type: 'Jenis Cuti',

                        // Payment fields
                        paymentType: 'Jenis Pembayaran',
                        payment_type: 'Jenis Pembayaran',
                        paymentDate: 'Tanggal Pembayaran',
                        payment_date: 'Tanggal Pembayaran',
                        amount: 'Jumlah',

                        // Custom letter fields
                        letterTitle: 'Judul Surat',
                        letter_title: 'Judul Surat',
                        recipient: 'Penerima',
                        letterContent: 'Isi Surat',
                        letter_content: 'Isi Surat',
                      }

                      const formatFieldName = (name: string): string => {
                        // Check for exact match
                        if (fieldNameMapping[name]) {
                          return fieldNameMapping[name]
                        }

                        // Check for case-insensitive match
                        const lowerName = name.toLowerCase()
                        if (fieldNameMapping[lowerName]) {
                          return fieldNameMapping[lowerName]
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

                      if (isFileObject) {
                        return (
                          <div key={key} className="col-span-2 p-3 border rounded-lg bg-background/50">
                            <p className="mb-2 text-xs font-semibold text-muted-foreground">
                              {formatFieldName(key)}
                            </p>
                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/30">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="flex-1 text-sm font-medium">{value.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({(value.size / 1024).toFixed(2)} KB)
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setActiveTab("documents")}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Lihat
                              </Button>
                            </div>
                          </div>
                        )
                      }

                      return (
                        <div key={key} className="p-3 border rounded-lg bg-background/50">
                          <p className="mb-1 text-xs font-semibold text-muted-foreground">
                            {formatFieldName(key)}
                          </p>
                          <p className="text-sm font-medium whitespace-pre-line">
                            {typeof value === 'boolean' ? (value ? 'Ya' : 'Tidak') : value?.toString() || '-'}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Student Info Tab */}
        <TabsContent value="student" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Informasi Mahasiswa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Nama Lengkap</p>
                  <p className="text-sm font-medium">{request.studentName}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">NIM</p>
                  <p className="font-mono text-sm font-medium">{request.studentNIM}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Program Studi</p>
                  <p className="text-sm font-medium">{request.studentMajor}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Fakultas</p>
                  <p className="text-sm font-medium">{request.studentFaculty}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Semester</p>
                  <p className="text-sm font-medium">Semester {request.studentSemester}</p>
                </div>
                <div className="p-3 border rounded-lg bg-background/50">
                  <p className="mb-1 text-xs font-semibold text-muted-foreground">Tahun Akademik</p>
                  <p className="text-sm font-medium">{request.academicYear}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          {(() => {
            const filesFromAdditionalInfo: Array<{key: string, label: string, file: any}> = []

            if (request.additionalInfo) {
              Object.entries(request.additionalInfo).forEach(([key, value]) => {
                const isFileObject = typeof value === 'object' && value !== null && 'name' in value && 'data' in value
                if (isFileObject) {
                  const labelMapping: Record<string, string> = {
                    skDocument: 'SK PNS/ASN',
                    supportingDocument: 'Dokumen Pendukung Cuti',
                    paymentProof: 'Bukti Pembayaran',
                  }
                  filesFromAdditionalInfo.push({
                    key,
                    label: labelMapping[key] || key,
                    file: value as any
                  })
                }
              })
            }

            const hasFiles = filesFromAdditionalInfo.length > 0 || (request.attachments && request.attachments.length > 0)

            if (!hasFiles) {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle>Dokumen Pendukung</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="py-6 text-center text-muted-foreground">
                      Tidak ada dokumen pendukung yang dilampirkan
                    </div>
                  </CardContent>
                </Card>
              )
            }

            return (
              <>
                {filesFromAdditionalInfo.length > 0 && (
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Dokumen Pendukung
                      </CardTitle>
                      <CardDescription>Dokumen yang dilampirkan saat pengajuan</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {filesFromAdditionalInfo.map(({ key, label, file }) => {
                        const isPdf = file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf')
                        const isImage = file.type?.includes('image') || /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name || '')

                        return (
                          <div key={key} className="p-4 border rounded-lg">
                            <div className="mb-3">
                              <p className="mb-1 text-sm font-medium text-muted-foreground">{label}</p>
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{file.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(file.size / 1024).toFixed(2)} KB)
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2 mb-3">
                              {(isPdf || isImage) && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setPreviewPdfUrl(file.data)
                                    setIsPdfPreviewOpen(true)
                                  }}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Preview Modal
                                </Button>
                              )}
                              <Button size="sm" variant="outline" asChild>
                                <a href={file.data} download={file.name}>
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </a>
                              </Button>
                            </div>

                            {/* Inline Preview */}
                            {isImage && (
                              <div className="overflow-hidden border rounded-lg bg-background">
                                <img
                                  src={file.data}
                                  alt={file.name}
                                  className="object-contain w-full max-h-[400px]"
                                />
                              </div>
                            )}
                            {isPdf && (
                              <div className="overflow-hidden border rounded-lg bg-background">
                                <iframe
                                  src={`${file.data}#view=FitH`}
                                  className="w-full h-[500px]"
                                  title={file.name}
                                />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </CardContent>
                  </Card>
                )}

                {request.attachments && request.attachments.length > 0 && (
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Lampiran Tambahan
                      </CardTitle>
                      <CardDescription>Dokumen tambahan yang dilampirkan</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nama Dokumen</TableHead>
                            <TableHead>Tanggal Upload</TableHead>
                            <TableHead>Ukuran</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {request.attachments.map((attachment) => {
                            const isPdf = attachment.name.toLowerCase().endsWith('.pdf')
                            const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(attachment.name)

                            return (
                              <TableRow key={attachment.id}>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span>{attachment.name}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{formatDate(attachment.uploadDate)}</TableCell>
                                <TableCell>{attachment.size || "2.3 MB"}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex items-center justify-end gap-1">
                                    {(isPdf || isImage) && attachment.url && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setPreviewPdfUrl(attachment.url || null)
                                          setIsPdfPreviewOpen(true)
                                        }}
                                      >
                                        <Eye className="w-4 h-4" />
                                      </Button>
                                    )}
                                    {attachment.url && (
                                      <a href={attachment.url} download target="_blank" rel="noopener noreferrer">
                                        <Button variant="ghost" size="sm">
                                          <Download className="w-4 h-4" />
                                        </Button>
                                      </a>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>

                      {request.attachments.some(att =>
                        att.url && (att.name.toLowerCase().endsWith('.pdf') || /\.(jpg|jpeg|png|gif|webp)$/i.test(att.name))
                      ) && (
                        <div className="pt-4 space-y-3 border-t">
                          <p className="text-sm font-medium">Preview Dokumen</p>
                          <div className="grid grid-cols-1 gap-4">
                            {request.attachments.map((attachment) => {
                              const isPdf = attachment.name.toLowerCase().endsWith('.pdf')
                              const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(attachment.name)

                              if (!attachment.url || (!isPdf && !isImage)) return null

                              return (
                                <div key={`preview-${attachment.id}`} className="space-y-2">
                                  <p className="text-xs font-medium text-muted-foreground">{attachment.name}</p>
                                  {isPdf ? (
                                    <div className="overflow-hidden border rounded-lg bg-background">
                                      <iframe
                                        src={`${attachment.url}#view=FitH`}
                                        className="w-full h-[500px]"
                                        title={attachment.name}
                                      />
                                    </div>
                                  ) : isImage ? (
                                    <div className="overflow-hidden border rounded-lg bg-background">
                                      <img
                                        src={attachment.url}
                                        alt={attachment.name}
                                        className="object-contain w-full max-h-[500px]"
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            )
          })()}
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card className="border-none shadow-sm bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Riwayat Permohonan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-4">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-200 via-emerald-300 to-transparent" />

                <div className="relative flex items-start gap-4">
                  <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-4 ring-background">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 pt-0.5 pb-4">
                    <p className="text-sm font-semibold">Permohonan Diajukan</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formatDate(request.requestDate)}
                    </p>
                  </div>
                </div>

                {request.reviewDate && request.reviewDate !== '' && (
                  <div className="relative flex items-start gap-4">
                    <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 ring-4 ring-background">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="flex-1 pt-0.5 pb-4">
                      <p className="text-sm font-semibold">Mulai Ditinjau</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(request.reviewDate)}
                      </p>
                    </div>
                  </div>
                )}

                {request.approvedDate && (
                  <div className="relative flex items-start gap-4">
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full ring-4 ring-background">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 pt-0.5 pb-4">
                      <p className="text-sm font-semibold">Permohonan Disetujui</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(request.approvedDate)}
                      </p>
                      {request.approvedBy && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Disetujui oleh: <span className="font-medium">{request.approvedBy}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {request.completedDate && (
                  <div className="relative flex items-start gap-4">
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-green-100 rounded-full ring-4 ring-background">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 pt-0.5 pb-4">
                      <p className="text-sm font-semibold">Surat Selesai Dibuat</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(request.completedDate)}
                      </p>
                    </div>
                  </div>
                )}

                {request.rejectedDate && request.rejectedDate !== '' && (
                  <div className="relative flex items-start gap-4">
                    <div className="z-10 flex items-center justify-center w-8 h-8 bg-red-100 rounded-full ring-4 ring-background">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1 pt-0.5 pb-4">
                      <p className="text-sm font-semibold">Permohonan Ditolak</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(request.rejectedDate)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {request.rejectedReason && (
            <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-1 text-sm font-semibold text-red-900">Alasan Penolakan</h4>
                    <p className="text-sm text-red-800 whitespace-pre-wrap">{request.rejectedReason}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {request.letterUrl && (
            <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-green-900">Surat Siap Diunduh</h4>
                      <p className="text-xs text-green-700">Surat telah selesai dibuat</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" className="border-green-300 hover:bg-green-100">
                    <a href={request.letterUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Unduh Surat
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Forward Dialog */}
      <Dialog open={isForwardDialogOpen} onOpenChange={setIsForwardDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                <ArrowRight className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">Teruskan ke WD1</DialogTitle>
                <DialogDescription className="mt-1">
                  Teruskan permohonan surat dari <strong>{request.studentName}</strong> ke Wakil Dekan 1
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forward-notes">Catatan untuk WD1 (Opsional)</Label>
              <Textarea
                id="forward-notes"
                placeholder="Contoh: Mohon ditinjau segera, dokumen sudah lengkap..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsForwardDialogOpen(false)} disabled={processing}>
              Batal
            </Button>
            <Button onClick={confirmForward} disabled={processing} className="bg-green-600 hover:bg-green-700">
              {processing ? "Memproses..." : "Teruskan ke WD1"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">Tolak Permohonan</DialogTitle>
                <DialogDescription className="mt-1">
                  Tolak permohonan surat dari <strong>{request.studentName}</strong>
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reject-reason">Alasan Penolakan <span className="text-red-500">*</span></Label>
              <Textarea
                id="reject-reason"
                placeholder="Contoh: Dokumen persyaratan tidak lengkap..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={5}
                className="resize-none"
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)} disabled={processing}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={confirmReject}
              disabled={processing || !actionNotes.trim()}
            >
              {processing ? "Memproses..." : "Tolak Permohonan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revision Dialog */}
      <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
                <RotateCcw className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-xl">Minta Revisi</DialogTitle>
                <DialogDescription className="mt-1">
                  Kembalikan permohonan surat dari <strong>{request.studentName}</strong> untuk diperbaiki
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="revision-notes">Catatan Revisi <span className="text-amber-500">*</span></Label>
              <Textarea
                id="revision-notes"
                placeholder="Contoh: Mohon perbaiki format penulisan..."
                value={actionNotes}
                onChange={(e) => setActionNotes(e.target.value)}
                rows={5}
                className="resize-none"
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-4 border-t">
            <Button variant="outline" onClick={() => setIsRevisionDialogOpen(false)} disabled={processing}>
              Batal
            </Button>
            <Button
              onClick={confirmRevision}
              disabled={processing || !actionNotes.trim()}
              className="bg-amber-600 hover:bg-amber-700"
            >
              {processing ? "Memproses..." : "Kembalikan untuk Revisi"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* PDF Preview Dialog */}
      <Dialog open={isPdfPreviewOpen} onOpenChange={setIsPdfPreviewOpen}>
        <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
          <DialogHeader className="pb-3 border-b">
            <DialogTitle>Preview Dokumen</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            {previewPdfUrl && (
              <>
                {previewPdfUrl.toLowerCase().endsWith('.pdf') || previewPdfUrl.includes('application/pdf') ? (
                  <iframe
                    src={`${previewPdfUrl}#view=FitH`}
                    className="w-full h-full border-0"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted">
                    <img
                      src={previewPdfUrl}
                      alt="Preview"
                      className="object-contain max-w-full max-h-full"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <DialogFooter className="pt-3 border-t">
            {previewPdfUrl && (
              <Button variant="outline" asChild>
                <a href={previewPdfUrl} download target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  Download
                </a>
              </Button>
            )}
            <Button onClick={() => setIsPdfPreviewOpen(false)} variant="secondary">
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
