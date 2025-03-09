"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { LetterRequest } from "@/types/correspondence"
import { LetterRequestDetails } from "@/components/correspondence/letter-request-details"

interface CorrespondenceTableProps {
  requests: LetterRequest[]
  onStatusChange?: (requestId: string, status: string, notes?: string) => void
  onViewLetterDetail?: (letter: LetterRequest) => void
  showViewDetailButton?: boolean
}

export function CorrespondenceTable({
  requests,
  onStatusChange,
  onViewLetterDetail,
  showViewDetailButton = false,
}: CorrespondenceTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setShowDetails(true)
  }

  const handleViewLetterDetails = (request: LetterRequest) => {
    if (onViewLetterDetail) {
      onViewLetterDetail(request)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-500/10">
            <Clock className="w-3 h-3 mr-1" />
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Dalam Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <FileText className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getLetterTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      active_student: "Surat Keterangan Aktif Kuliah",
      leave_absence: "Surat Cuti Kuliah",
      loan_application: "Surat Keterangan untuk Pengajuan Pinjaman",
      tuition_extension: "Surat Permohonan Perpanjangan Pembayaran SPP",
      internship_recommendation: "Surat Rekomendasi Magang",
      scholarship_recommendation: "Surat Rekomendasi Beasiswa",
      transcript_request: "Permohonan Transkrip Nilai",
      research_permission: "Surat Izin Penelitian",
      graduation_letter: "Surat Keterangan Lulus",
      graduation_confirmation: "Surat Keterangan Lulus",
    }
    return typeMap[type] || type
  }

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Mahasiswa</TableHead>
              <TableHead>Jenis Surat</TableHead>
              <TableHead>Tanggal Pengajuan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-6 text-center text-muted-foreground">
                  Tidak ada data surat yang tersedia
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.studentName}</p>
                      <p className="text-xs text-muted-foreground">{request.studentNIM}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getLetterTypeDisplay(request.type)}</TableCell>
                  <TableCell>{formatDate(request.requestDate)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {showViewDetailButton && request.status === "completed" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewLetterDetails(request)}
                          className="gap-1 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary"
                        >
                          <FileText className="w-4 h-4" />
                          Lihat Surat
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(request)}>
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRequest && (
        <LetterRequestDetails
          request={selectedRequest}
          open={showDetails}
          onClose={() => setShowDetails(false)}
          onStatusChange={onStatusChange}
          role="staff_tu"
        />
      )}
    </>
  )
}

