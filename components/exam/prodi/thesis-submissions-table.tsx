"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Check, X, FileText, AlertCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThesisSubmissionDetailsDialog } from "./thesis-submission-details-dialog"
import { toast } from "@/components/ui/use-toast"
import type { ThesisSubmission } from "./types"

interface ThesisSubmissionsTableProps {
  submissions: ThesisSubmission[]
}

export function ThesisSubmissionsTable({ submissions }: ThesisSubmissionsTableProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<ThesisSubmission | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (submission: ThesisSubmission) => {
    setSelectedSubmission(submission)
    setIsDetailsOpen(true)
  }

  const handleApprove = (id: string) => {
    toast({
      title: "Judul disetujui",
      description: "Judul skripsi telah berhasil disetujui",
    })
    // In a real app, you would update the status in the database
  }

  const handleReject = (id: string) => {
    toast({
      title: "Judul ditolak",
      description: "Judul skripsi telah ditolak",
    })
    // In a real app, you would update the status in the database
  }

  const handleRequestRevision = (id: string) => {
    toast({
      title: "Revisi diminta",
      description: "Permintaan revisi judul skripsi telah dikirim",
    })
    // In a real app, you would update the status in the database
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Menunggu Persetujuan
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Ditolak
          </Badge>
        )
      case "revision":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Perlu Revisi
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Judul Skripsi</TableHead>
              <TableHead>Tanggal Pengajuan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Tidak ada pengajuan judul skripsi.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className="font-medium">{submission.studentName}</div>
                    <div className="text-sm text-muted-foreground">{submission.studentId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate" title={submission.title}>
                      {submission.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    {submission.submissionDate
                      ? format(new Date(submission.submissionDate), "dd MMM yyyy")
                      : "-"
                    }
                  </TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {submission.status === "pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600"
                            onClick={() => handleApprove(submission.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="sr-only">Approve</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => handleReject(submission.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Reject</span>
                          </Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(submission)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
                          {submission.status === "pending" && (
                            <DropdownMenuItem onClick={() => handleRequestRevision(submission.id)}>
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Minta Revisi
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedSubmission && (
        <ThesisSubmissionDetailsDialog
          submission={selectedSubmission}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      )}
    </>
  )
}

