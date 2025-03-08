"\"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { LetterRequest } from "@/types/correspondence"
import { LetterRequestDetails } from "./letter-request-details"

interface CorrespondenceTableProps {
  requests: LetterRequest[]
  onViewDetails: (request: LetterRequest) => void
  getStatusBadge: (status: string) => JSX.Element
  getLetterTypeDisplay: (type: string) => string
}

export function CorrespondenceTable({
  requests,
  onViewDetails,
  getStatusBadge,
  getLetterTypeDisplay,
}: CorrespondenceTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setShowDetails(true)
  }

  return (
    <>
      <div className="rounded-md border">
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
            {requests.map((request) => (
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
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(request)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedRequest && (
        <LetterRequestDetails request={selectedRequest} open={showDetails} onClose={() => setShowDetails(false)} />
      )}
    </>
  )
}

