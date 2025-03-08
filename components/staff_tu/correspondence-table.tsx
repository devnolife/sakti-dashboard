"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, Clock, Download, Eye, MoreHorizontal, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

import type { LetterRequest } from "@/types/correspondence"

interface CorrespondenceTableProps {
  requests: LetterRequest[]
  onStatusChange: (requestId: string, status: string, notes?: string) => void
}

export function CorrespondenceTable({ requests, onStatusChange }: CorrespondenceTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isRejectOpen, setIsRejectOpen] = useState(false)
  const [rejectionNotes, setRejectionNotes] = useState("")

  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const handleReject = (request: LetterRequest) => {
    setSelectedRequest(request)
    setRejectionNotes("")
    setIsRejectOpen(true)
  }

  const handleConfirmReject = () => {
    if (selectedRequest) {
      onStatusChange(selectedRequest.id, "rejected", rejectionNotes)
      setIsRejectOpen(false)
      toast({
        title: "Permohonan ditolak",
        description: "Permohonan surat telah berhasil ditolak",
      })
    }
  }

  const handleApprove = (requestId: string) => {
    onStatusChange(requestId, "approved")
    toast({
      title: "Permohonan disetujui",
      description: "Permohonan surat telah berhasil disetujui",
    })
  }

  const handleComplete = (requestId: string) => {
    onStatusChange(requestId, "completed")
    toast({
      title: "Permohonan selesai",
      description: "Permohonan surat telah berhasil diselesaikan",
    })
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(date)
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="mr-1 h-3 w-3" />
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="mr-1 h-3 w-3" />
            Dalam Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Disetujui
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
            <CheckCircle className="mr-1 h-3 w-3" />
            Selesai
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="mr-1 h-3 w-3" />
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Clock className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Tidak ada permohonan</h3>
        <p className="text-muted-foreground mt-1">Belum ada permohonan surat yang sesuai dengan filter.</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Judul Surat</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{request.studentName}</p>
                    <p className="text-sm text-muted-foreground">{request.studentNIM}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{request.title}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">{request.purpose}</p>
                  </div>
                </TableCell>
                <TableCell>{formatDate(request.requestDate)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(request)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Lihat Detail
                      </DropdownMenuItem>
                      {(request.status === "submitted" || request.status === "in-review") && (
                        <>
                          <DropdownMenuItem onClick={() => handleApprove(request.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Setujui
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleReject(request)}>
                            <X className="mr-2 h-4 w-4" />
                            Tolak
                          </DropdownMenuItem>
                        </>
                      )}
                      {request.status === "approved" && (
                        <DropdownMenuItem onClick={() => handleComplete(request.id)}>
                          <Download className="mr-2 h-4 w-4" />
                          Selesaikan
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detail Permohonan Surat</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Informasi Mahasiswa</h3>
                  <div className="mt-1">
                    <p className="font-semibold">{selectedRequest.studentName}</p>
                    <p className="text-sm">{selectedRequest.studentNIM}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status Permohonan</h3>
                  <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Judul Surat</h3>
                <p className="mt-1 font-semibold">{selectedRequest.title}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tujuan</h3>
                <p className="mt-1">{selectedRequest.purpose}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Deskripsi</h3>
                <p className="mt-1">{selectedRequest.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tanggal Pengajuan</h3>
                <p className="mt-1">{formatDate(selectedRequest.requestDate)}</p>
              </div>

              {selectedRequest.notes && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Catatan</h3>
                  <p className="mt-1">{selectedRequest.notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4">
                {(selectedRequest.status === "submitted" || selectedRequest.status === "in-review") && (
                  <>
                    <Button variant="outline" onClick={() => handleReject(selectedRequest)}>
                      Tolak
                    </Button>
                    <Button onClick={() => handleApprove(selectedRequest.id)}>Setujui</Button>
                  </>
                )}
                {selectedRequest.status === "approved" && (
                  <Button onClick={() => handleComplete(selectedRequest.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Selesaikan
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Permohonan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-notes">Alasan Penolakan</Label>
              <Textarea
                id="rejection-notes"
                placeholder="Masukkan alasan penolakan..."
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRejectOpen(false)}>
                Batal
              </Button>
              <Button variant="destructive" onClick={handleConfirmReject}>
                Tolak Permohonan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

