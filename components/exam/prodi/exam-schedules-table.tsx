"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Check, FileText, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ExamScheduleDetailsDialog } from "./exam-schedule-details-dialog"
import { toast } from "@/components/ui/use-toast"
import type { ExamSchedule } from "./types"

interface ExamSchedulesTableProps {
  schedules: ExamSchedule[]
}

export function ExamSchedulesTable({ schedules }: ExamSchedulesTableProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<ExamSchedule | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (schedule: ExamSchedule) => {
    setSelectedSchedule(schedule)
    setIsDetailsOpen(true)
  }

  const handleVerify = (id: string) => {
    toast({
      title: "Jadwal diverifikasi",
      description: "Jadwal ujian telah berhasil diverifikasi",
    })
    // In a real app, you would update the status in the database
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Menunggu Verifikasi
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Terverifikasi
          </Badge>
        )
      case "rescheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Dijadwalkan Ulang
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "proposal":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Proposal
          </Badge>
        )
      case "result":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Hasil
          </Badge>
        )
      case "final":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Tutup
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Jadwal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Tindakan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Tidak ada jadwal ujian.
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div className="font-medium">{schedule.studentName}</div>
                    <div className="text-sm text-muted-foreground">{schedule.studentId}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md truncate" title={schedule.title}>
                      {schedule.title}
                    </div>
                  </TableCell>
                  <TableCell>{getExamTypeBadge(schedule.examType)}</TableCell>
                  <TableCell>
                    {schedule.scheduledDate
                      ? format(new Date(schedule.scheduledDate), "dd MMM yyyy, HH:mm")
                      : "Belum dijadwalkan"}
                  </TableCell>
                  <TableCell>{getStatusBadge(schedule.verificationStatus)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {schedule.verificationStatus === "pending" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-green-600"
                          onClick={() => handleVerify(schedule.id)}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Verify</span>
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(schedule)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </DropdownMenuItem>
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

      {selectedSchedule && (
        <ExamScheduleDetailsDialog schedule={selectedSchedule} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
      )}
    </>
  )
}

