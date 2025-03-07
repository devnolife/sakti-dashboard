"use client"

import { useState } from "react"
import type { InternshipApplication } from "@/types/internship"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Building,
  Calendar,
  FileText,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  CheckCheck,
} from "lucide-react"
import { formatDate } from "@/lib/utils"

interface ApplicationDetailsDialogProps {
  application: InternshipApplication
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (id: string, status: "approved" | "rejected", feedback: string) => void
}

export default function ApplicationDetailsDialog({
  application,
  isOpen,
  onClose,
  onStatusUpdate,
}: ApplicationDetailsDialogProps) {
  const [feedback, setFeedback] = useState(application.feedback || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApprove = async () => {
    setIsSubmitting(true)
    await onStatusUpdate(application.id, "approved", feedback)
    setIsSubmitting(false)
  }

  const handleReject = async () => {
    setIsSubmitting(true)
    await onStatusUpdate(application.id, "rejected", feedback)
    setIsSubmitting(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Ditolak
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            Berlangsung
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
            <CheckCheck className="h-3 w-3 mr-1" />
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detail Aplikasi Magang</span>
            {getStatusBadge(application.status)}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Detail</TabsTrigger>
            <TabsTrigger value="documents">Dokumen</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium flex items-center mb-3">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    Informasi Mahasiswa
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Nama</p>
                      <p className="text-sm font-medium">{application.studentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">NIM</p>
                      <p className="text-sm font-medium">{application.studentNIM}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium flex items-center mb-3">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Periode Magang
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Tanggal Mulai</p>
                      <p className="text-sm font-medium">{formatDate(application.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tanggal Selesai</p>
                      <p className="text-sm font-medium">{formatDate(application.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Durasi</p>
                      <p className="text-sm font-medium">
                        {Math.ceil(
                          (application.endDate.getTime() - application.startDate.getTime()) /
                            (1000 * 60 * 60 * 24 * 30),
                        )}{" "}
                        bulan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium flex items-center mb-3">
                    <Building className="h-4 w-4 mr-2 text-primary" />
                    Informasi Perusahaan
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Nama Perusahaan</p>
                      <p className="text-sm font-medium">{application.companyName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Alamat</p>
                      <p className="text-sm font-medium">{application.companyAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Posisi</p>
                      <p className="text-sm font-medium">{application.position}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium flex items-center mb-3">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    Informasi Aplikasi
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Tanggal Aplikasi</p>
                      <p className="text-sm font-medium">{formatDate(application.applicationDate)}</p>
                    </div>
                    {application.reviewedAt && (
                      <div>
                        <p className="text-xs text-muted-foreground">Tanggal Review</p>
                        <p className="text-sm font-medium">{formatDate(application.reviewedAt)}</p>
                      </div>
                    )}
                    {application.reviewedBy && (
                      <div>
                        <p className="text-xs text-muted-foreground">Direview Oleh</p>
                        <p className="text-sm font-medium">{application.reviewedBy}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              {application.documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{document.name}</p>
                      <p className="text-xs text-muted-foreground">{document.type}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={document.url} target="_blank" rel="noopener noreferrer">
                      Lihat
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium flex items-center mb-3">
                  <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                  Feedback
                </h3>
                <Textarea
                  placeholder="Berikan feedback untuk aplikasi magang ini..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={5}
                  disabled={application.status !== "pending"}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between mt-6">
          {application.status === "pending" ? (
            <>
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Batal
              </Button>
              <div className="flex gap-2">
                <Button variant="destructive" onClick={handleReject} disabled={isSubmitting || !feedback.trim()}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Tolak
                </Button>
                <Button variant="default" onClick={handleApprove} disabled={isSubmitting}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Setujui
                </Button>
              </div>
            </>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

