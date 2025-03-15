"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
  User,
  BookOpen,
  Printer,
  Eye,
  History,
} from "lucide-react"
import type { LetterRequest, LetterStatus } from "@/types/correspondence"
import { LETTER_TYPES } from "@/app/actions/correspondence-actions"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LetterRequestDetailsProps {
  request: LetterRequest
  open: boolean
  onClose: () => void
  onStatusChange?: (requestId: string, status: LetterStatus, notes?: string) => void
  onCreateTemplate?: (requestId: string) => void
  role?: string
}

export function LetterRequestDetails({
  request,
  open,
  onClose,
  onStatusChange,
  onCreateTemplate,
  role = "mahasiswa", // Changed default role to mahasiswa
}: LetterRequestDetailsProps) {
  const [rejectReason, setRejectReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-500/10">
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            Dalam Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            Ditolak
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "in-review":
        return <AlertCircle className="w-5 h-5 text-amber-500" />
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  // Add a fallback in case the letter type is not found
  const letterTypeInfo = LETTER_TYPES[request.type] || {
    title: request.title || "Unknown Letter Type",
    description: "No description available",
    approvalRole: "none",
    estimatedDays: 0,
    additionalFields: [],
  }

  // These functions are only used by staff, not by students
  const handleReject = () => {
    setIsRejectDialogOpen(true)
  }

  const confirmReject = () => {
    if (onStatusChange) {
      onStatusChange(request.id, "rejected", rejectReason)
    }
    setIsRejectDialogOpen(false)
    onClose()
  }

  const handleApprove = () => {
    if (onStatusChange) {
      onStatusChange(request.id, "approved")
    }
    onClose()
  }

  const handleMarkInReview = () => {
    if (onStatusChange) {
      onStatusChange(request.id, "in-review")
    }
  }

  const handleCreateTemplate = () => {
    if (onCreateTemplate) {
      onCreateTemplate(request.id)
      onClose()
    }
  }

  // Timeline events based on request status and dates
  const timelineEvents = [
    {
      date: request.requestDate,
      title: "Permohonan Diajukan",
      description: `Permohonan surat diajukan oleh ${request.studentName}`,
      icon: <Clock className="w-4 h-4 text-blue-500" />,
    },
  ]

  if (
    request.status === "in-review" ||
    request.status === "approved" ||
    request.status === "completed" ||
    request.status === "rejected"
  ) {
    timelineEvents.push({
      date: request.reviewDate || new Date().toISOString(),
      title: "Dalam Proses Review",
      description: "Permohonan sedang ditinjau oleh staff",
      icon: <AlertCircle className="w-4 h-4 text-amber-500" />,
    })
  }

  if (request.status === "approved" || request.status === "completed") {
    timelineEvents.push({
      date: request.approvedDate || new Date().toISOString(),
      title: "Permohonan Disetujui",
      description: `Disetujui oleh ${request.approvedBy || "Admin Prodi"}`,
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
    })
  }

  if (request.status === "completed") {
    timelineEvents.push({
      date: request.completedDate || new Date().toISOString(),
      title: "Surat Selesai",
      description: "Surat telah dibuat dan siap untuk diambil",
      icon: <FileText className="w-4 h-4 text-green-500" />,
    })
  }

  if (request.status === "rejected") {
    timelineEvents.push({
      date: request.rejectedDate || new Date().toISOString(),
      title: "Permohonan Ditolak",
      description: request.rejectedReason || "Tidak ada alasan yang diberikan",
      icon: <XCircle className="w-4 h-4 text-red-500" />,
    })
  }

  // Sort timeline events by date
  timelineEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-white dark:bg-card rounded-lg shadow-lg border-0">
        <DialogHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                {request.title} {getStatusBadge(request.status)}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Diajukan pada {formatDate(request.requestDate)}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <Button variant="outline" size="sm" onClick={() => window.print()} className="hidden sm:flex">
                <Printer className="w-4 h-4 mr-2" />
                Cetak
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-3 p-1 mb-4 bg-muted/50">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Detail
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <History className="w-4 h-4 mr-2" />
              Timeline
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-white dark:data-[state=active]:bg-card data-[state=active]:shadow-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Dokumen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            {/* Status Card */}
            <Card className="border shadow-sm bg-gradient-to-br from-primary/5 to-background border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {getStatusIcon(request.status)}
                  Status Permohonan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Status Saat Ini</div>
                    <div className="font-medium">
                      {request.status === "submitted"
                        ? "Diajukan"
                        : request.status === "in-review"
                          ? "Dalam Review"
                          : request.status === "approved"
                            ? "Disetujui"
                            : request.status === "rejected"
                              ? "Ditolak"
                              : request.status === "completed"
                                ? "Selesai"
                                : "Unknown"}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Estimasi Waktu Proses</div>
                    <div className="font-medium">{letterTypeInfo.estimatedDays} hari kerja</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Persetujuan Oleh</div>
                    <div className="font-medium">
                      {request.approvalRole === "prodi"
                        ? "Kepala Program Studi"
                        : request.approvalRole === "staff_tu"
                          ? "Staff Tata Usaha"
                          : request.approvalRole === "dekan"
                            ? "Dekan"
                            : "Tidak memerlukan persetujuan"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Information */}
            <Card className="transition-shadow duration-200 border shadow-sm border-border/50 hover:shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="w-5 h-5 text-muted-foreground" />
                  Informasi Mahasiswa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Nama Lengkap</div>
                    <div className="font-medium">{request.studentName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">NIM</div>
                    <div className="font-medium">{request.studentNIM}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Program Studi</div>
                    <div className="font-medium">{request.studentMajor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Fakultas</div>
                    <div className="font-medium">{request.studentFaculty || "Fakultas Ilmu Komputer"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Semester</div>
                    <div className="font-medium">{request.studentSemester || "5"}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Tahun Akademik</div>
                    <div className="font-medium">{request.academicYear || "2023/2024"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Letter Information */}
            <Card className="transition-shadow duration-200 border shadow-sm border-border/50 hover:shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                  Informasi Surat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Jenis Surat</div>
                    <div className="font-medium">{letterTypeInfo.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Tujuan</div>
                    <div className="font-medium">{request.purpose}</div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="text-sm text-muted-foreground">Deskripsi</div>
                    <div className="font-medium">{request.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            {request.additionalInfo && Object.keys(request.additionalInfo).length > 0 && (
              <Card className="transition-shadow duration-200 border shadow-sm border-border/50 hover:shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-muted-foreground" />
                    Informasi Tambahan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Object.entries(request.additionalInfo).map(([key, value]) => {
                      // Find the field definition to get the label
                      const fieldDef = letterTypeInfo.additionalFields?.find((f) => f.name === key)
                      const label = fieldDef?.label || key

                      return (
                        <div key={key}>
                          <div className="text-sm text-muted-foreground">{label}</div>
                          <div className="font-medium">{value?.toString()}</div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Rejection Reason */}
            {request.status === "rejected" && request.rejectedReason && (
              <Card className="border-red-200 shadow-sm bg-red-50/50 dark:bg-red-900/10">
                <CardHeader className="pb-2 border-b border-red-200">
                  <CardTitle className="flex items-center gap-2 text-lg text-red-500">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Alasan Penolakan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="p-3 text-red-700 rounded-md bg-red-50">{request.rejectedReason}</div>
                </CardContent>
              </Card>
            )}

            {/* Approval Information */}
            {(request.status === "approved" || request.status === "completed") && (
              <Card className="border-green-200 shadow-sm bg-green-50/50 dark:bg-green-900/10">
                <CardHeader className="pb-2 border-b border-green-200">
                  <CardTitle className="flex items-center gap-2 text-lg text-green-600">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Informasi Persetujuan
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Disetujui Oleh</div>
                      <div className="font-medium">{request.approvedBy || "Admin Prodi"}</div>
                    </div>
                    {request.approvedDate && (
                      <div>
                        <div className="text-sm text-muted-foreground">Tanggal Persetujuan</div>
                        <div className="font-medium">{formatDate(request.approvedDate)}</div>
                      </div>
                    )}
                    {request.completedDate && (
                      <div>
                        <div className="text-sm text-muted-foreground">Tanggal Selesai</div>
                        <div className="font-medium">{formatDate(request.completedDate)}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <Card className="transition-shadow duration-200 border shadow-sm border-border/50 hover:shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Timeline Permohonan</CardTitle>
                <CardDescription>Riwayat proses permohonan surat</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l border-primary/30">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[6.5px]"></div>
                      <div className="pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          {event.icon}
                          <h4 className="font-medium">{event.title}</h4>
                        </div>
                        <p className="mb-1 text-sm text-muted-foreground">{event.description}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            {/* Attachments */}
            {request.attachments && request.attachments.length > 0 ? (
              <Card className="transition-shadow duration-200 border shadow-sm border-border/50 hover:shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    Dokumen Pendukung
                  </CardTitle>
                  <CardDescription>Dokumen yang dilampirkan oleh mahasiswa</CardDescription>
                </CardHeader>
                <CardContent>
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
                      {request.attachments.map((attachment) => (
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
                            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <Card className="transition-shadow duration-200 border shadow-sm border-border/50 hover:shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    Dokumen Pendukung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="py-6 text-center text-muted-foreground">
                    Tidak ada dokumen pendukung yang dilampirkan
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Letter */}
            {request.status === "completed" && (
              <Card className="border-green-200 shadow-sm bg-green-50/50 dark:bg-green-900/10">
                <CardHeader className="pb-2 border-b border-green-200">
                  <CardTitle className="flex items-center gap-2 text-lg text-green-600">
                    <FileText className="w-5 h-5 text-green-600" />
                    Dokumen Surat
                  </CardTitle>
                  <CardDescription>Surat yang telah dibuat dan siap untuk diunduh</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between p-4 transition-colors border rounded-md bg-muted/30 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{request.title}.pdf</div>
                        <div className="text-sm text-muted-foreground">
                          Dibuat pada {formatDate(request.completedDate || new Date().toISOString())}
                        </div>
                      </div>
                    </div>
                    <a href={request.letterUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2 bg-primary hover:bg-primary/90">
                        <Download className="w-4 h-4" />
                        Unduh
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col-reverse gap-2 pt-4 mt-4 border-t sm:flex-row sm:gap-0">
          {/* For student role, only show the close button and download button if available */}
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1 border-muted">
              Tutup
            </Button>

            {/* Only show download button for completed letters */}
            {role === "mahasiswa" && request.status === "completed" && (
              <a href={request.letterUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Surat
                </Button>
              </a>
            )}
          </div>

          {/* Staff actions - only shown for staff_tu role */}
          {role === "staff_tu" && (
            <div className="flex w-full gap-2 sm:w-auto">
              {(request.status === "submitted" || request.status === "in-review") && (
                <>
                  {request.status === "submitted" && (
                    <Button
                      variant="outline"
                      onClick={handleMarkInReview}
                      className="flex-1 sm:flex-auto border-amber-200 text-amber-600 hover:bg-amber-50"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Tandai Sedang Ditinjau
                    </Button>
                  )}
                  <Button variant="destructive" onClick={handleReject} className="flex-1 sm:flex-auto">
                    <XCircle className="w-4 h-4 mr-2" />
                    Tolak
                  </Button>
                  <Button onClick={handleApprove} className="flex-1 bg-green-600 sm:flex-auto hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Setujui
                  </Button>
                </>
              )}

              {request.status === "approved" && (
                <Button onClick={handleCreateTemplate} className="flex-1 sm:flex-auto bg-primary hover:bg-primary/90">
                  <FileText className="w-4 h-4 mr-2" />
                  Buat Surat
                </Button>
              )}

              {request.status === "completed" && (
                <Button className="flex-1 sm:flex-auto bg-primary hover:bg-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Surat
                </Button>
              )}
            </div>
          )}
        </DialogFooter>
      </DialogContent>

      {/* Rejection Dialog - only used by staff_tu */}
      {role === "staff_tu" && (
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white dark:bg-card rounded-lg shadow-lg border-0">
            <DialogHeader>
              <DialogTitle>Tolak Permohonan Surat</DialogTitle>
              <DialogDescription>Berikan alasan penolakan permohonan surat ini</DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <Textarea
                placeholder="Alasan penolakan..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={confirmReject}>
                Tolak Permohonan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}

