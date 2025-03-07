"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  Building,
  User,
  RotateCcw,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import type { KkpLocationRequest } from "@/types/kkp-location"
import { getKkpLocationRequestById, updateKkpLocationRequestStatus } from "@/app/actions/kkp-location-actions"

interface LocationRequestsTableProps {
  requests: KkpLocationRequest[]
  isLoading: boolean
  onRequestUpdated: (request: KkpLocationRequest) => void
}

export default function LocationRequestsTable({ requests, isLoading, onRequestUpdated }: LocationRequestsTableProps) {
  const { toast } = useToast()
  const [selectedRequest, setSelectedRequest] = useState<KkpLocationRequest | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [feedback, setFeedback] = useState("")

  // Handle viewing request details
  const handleViewDetails = async (id: string) => {
    try {
      const request = await getKkpLocationRequestById(id)
      if (request) {
        setSelectedRequest(request)
        setShowDetailsDialog(true)
      } else {
        toast({
          title: "Error",
          description: "Location request not found",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching location request details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch location request details",
        variant: "destructive",
      })
    }
  }

  // Handle viewing document details
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentDialog(true)
  }

  // Handle approving a location request
  const handleApproveRequest = async () => {
    if (!selectedRequest) return

    try {
      const result = await updateKkpLocationRequestStatus(
        selectedRequest.id,
        "approved",
        "prodi-001", // In a real app, this would be the actual user ID
        "Dr. Hadi Santoso", // In a real app, this would be the actual user name
        feedback,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the request in state
        if (result.request) {
          onRequestUpdated(result.request)
          setSelectedRequest(result.request)
        }

        setShowApprovalDialog(false)
        setFeedback("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving location request:", error)
      toast({
        title: "Error",
        description: "Failed to approve location request",
        variant: "destructive",
      })
    }
  }

  // Handle rejecting a location request
  const handleRejectRequest = async () => {
    if (!selectedRequest) return

    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please provide feedback for rejection",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await updateKkpLocationRequestStatus(
        selectedRequest.id,
        "rejected",
        "prodi-001", // In a real app, this would be the actual user ID
        "Dr. Hadi Santoso", // In a real app, this would be the actual user name
        feedback,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the request in state
        if (result.request) {
          onRequestUpdated(result.request)
          setSelectedRequest(result.request)
        }

        setShowRejectionDialog(false)
        setFeedback("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rejecting location request:", error)
      toast({
        title: "Error",
        description: "Failed to reject location request",
        variant: "destructive",
      })
    }
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Perusahaan</TableHead>
              <TableHead>Industri</TableHead>
              <TableHead>Diajukan Oleh</TableHead>
              <TableHead>Tanggal Pengajuan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <RotateCcw className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
                    <p className="text-muted-foreground">Memuat data...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">Tidak ada permintaan lokasi KKP</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{request.companyName}</p>
                        <p className="text-xs text-muted-foreground">{request.companyCity}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{request.companyIndustry}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{request.proposedBy.name}</p>
                        <p className="text-xs text-muted-foreground">{request.proposedBy.nim}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(request.submissionDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(request.id)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Request Details Dialog */}
      {selectedRequest && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {selectedRequest.companyName}
              </DialogTitle>
              <DialogDescription>
                {selectedRequest.companyIndustry} • {selectedRequest.companyCity}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Company Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Informasi Perusahaan</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Alamat:</p>
                      <p className="text-sm">{selectedRequest.companyAddress}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Kota:</p>
                        <p className="text-sm">{selectedRequest.companyCity}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Provinsi:</p>
                        <p className="text-sm">{selectedRequest.companyProvince || "-"}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Website:</p>
                      <p className="text-sm">
                        {selectedRequest.companyWebsite ? (
                          <a
                            href={
                              selectedRequest.companyWebsite.startsWith("http")
                                ? selectedRequest.companyWebsite
                                : `http://${selectedRequest.companyWebsite}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {selectedRequest.companyWebsite}
                          </a>
                        ) : (
                          "-"
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Deskripsi:</p>
                      <p className="text-sm">{selectedRequest.companyDescription || "-"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Kontak Perusahaan</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Nama Kontak:</p>
                      <p className="text-sm">{selectedRequest.contactPerson}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Jabatan:</p>
                      <p className="text-sm">{selectedRequest.contactPosition || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email:</p>
                      <p className="text-sm">{selectedRequest.contactEmail}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Telepon:</p>
                      <p className="text-sm">{selectedRequest.contactPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Informasi Pengajuan</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Diajukan Oleh:</p>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{selectedRequest.proposedBy.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedRequest.proposedBy.nim} • {selectedRequest.proposedBy.major}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Tanggal Pengajuan:</p>
                      <p className="text-sm">
                        {new Date(selectedRequest.submissionDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Status:</p>
                      <div>{getStatusBadge(selectedRequest.status)}</div>
                    </div>
                    {selectedRequest.reviewedBy && selectedRequest.reviewDate && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Ditinjau Oleh:</p>
                        <p className="text-sm">
                          {selectedRequest.reviewedBy} •{" "}
                          {new Date(selectedRequest.reviewDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                    {selectedRequest.feedback && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Feedback:</p>
                        <p className="text-sm">{selectedRequest.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Posisi & Keterampilan</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Posisi Tersedia:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.availablePositions && selectedRequest.availablePositions.length > 0 ? (
                          selectedRequest.availablePositions.map((position, index) => (
                            <Badge key={index} variant="outline">
                              {position}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm">-</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Keterampilan yang Dibutuhkan:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.requiredSkills && selectedRequest.requiredSkills.length > 0 ? (
                          selectedRequest.requiredSkills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/10">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm">-</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Dokumen</h3>
                  <div className="rounded-lg border p-4">
                    {selectedRequest.documents && selectedRequest.documents.length > 0 ? (
                      <div className="space-y-2">
                        {selectedRequest.documents.map((document) => (
                          <div
                            key={document.id}
                            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">{document.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(document.uploadDate).toLocaleDateString("id-ID", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleViewDocument(document)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <a href={document.url} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-4">
                        <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Tidak ada dokumen</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              {selectedRequest.status === "pending" && (
                <>
                  <Button variant="outline" onClick={() => setShowRejectionDialog(true)}>
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Tolak
                  </Button>
                  <Button onClick={() => setShowApprovalDialog(true)}>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Setujui
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document View Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {selectedDocument.name}
              </DialogTitle>
              <DialogDescription>
                Diunggah pada{" "}
                {new Date(selectedDocument.uploadDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <Button variant="outline" asChild className="w-full">
                <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" />
                  Lihat Dokumen
                </a>
              </Button>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approval Dialog */}
      {selectedRequest && (
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                Setujui Lokasi KKP
              </DialogTitle>
              <DialogDescription>
                Anda akan menyetujui {selectedRequest.companyName} sebagai lokasi KKP
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Feedback (Opsional):
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Berikan feedback atau catatan untuk pengajuan ini..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Konfirmasi Persetujuan</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        Dengan menyetujui lokasi ini, mahasiswa akan dapat memilih {selectedRequest.companyName} sebagai
                        lokasi KKP mereka.
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
              <Button onClick={handleApproveRequest}>Setujui Lokasi</Button>
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
                <ThumbsDown className="h-5 w-5 text-primary" />
                Tolak Lokasi KKP
              </DialogTitle>
              <DialogDescription>Anda akan menolak {selectedRequest.companyName} sebagai lokasi KKP</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejection-reason" className="text-sm font-medium">
                  Alasan Penolakan:
                </label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Berikan alasan penolakan lokasi ini..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Konfirmasi Penolakan</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        Dengan menolak lokasi ini, mahasiswa tidak akan dapat memilih {selectedRequest.companyName}{" "}
                        sebagai lokasi KKP mereka.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleRejectRequest} disabled={!feedback.trim()}>
                Tolak Lokasi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

