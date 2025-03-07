"use client"

import { useState } from "react"
import type { InternshipApplication } from "@/types/internship"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, CheckCircle, XCircle, Clock, AlertCircle, CheckCheck } from "lucide-react"
import { formatDate } from "@/lib/utils"
import ApplicationDetailsDialog from "./application-details-dialog"
import { updateInternshipStatus } from "@/app/actions/internship-actions"

interface ApplicationsTableProps {
  applications: InternshipApplication[]
  onStatusUpdate: (application: InternshipApplication) => void
}

export default function ApplicationsTable({ applications, onStatusUpdate }: ApplicationsTableProps) {
  const [selectedApplication, setSelectedApplication] = useState<InternshipApplication | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (application: InternshipApplication) => {
    setSelectedApplication(application)
    setIsDetailsOpen(true)
  }

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected", feedback: string) => {
    const result = await updateInternshipStatus(id, status, feedback)

    if (result.success && selectedApplication) {
      const updatedApplication = {
        ...selectedApplication,
        status,
        feedback,
        reviewedBy: "Dr. Hadi Wijaya", // This would be the current user in a real application
        reviewedAt: new Date(),
      }

      onStatusUpdate(updatedApplication)
      setSelectedApplication(updatedApplication)
    }
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
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Mahasiswa</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Perusahaan</TableHead>
              <TableHead>Posisi</TableHead>
              <TableHead>Tanggal Magang</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Aplikasi</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Tidak ada aplikasi magang yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.studentName}</TableCell>
                  <TableCell>{application.studentNIM}</TableCell>
                  <TableCell>{application.companyName}</TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>
                    {formatDate(application.startDate)} - {formatDate(application.endDate)}
                  </TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell>{formatDate(application.applicationDate)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(application)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedApplication && (
        <ApplicationDetailsDialog
          application={selectedApplication}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </>
  )
}

