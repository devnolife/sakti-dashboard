"use client"
import { format } from "date-fns"
import { Eye, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { Exam } from "@/types/exam"

interface ExamTableProps {
  exams: Exam[]
  onViewDetails: (exam: Exam) => void
}

export function ExamTable({ exams, onViewDetails }: ExamTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "applicant":
        return (
          <Badge
            variant="outline"
            className="text-yellow-700 border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:text-yellow-400 dark:border-yellow-800"
          >
            Pendaftar
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
          >
            Menunggu
          </Badge>
        )
      case "scheduled":
        return (
          <Badge
            variant="outline"
            className="text-indigo-700 border-indigo-200 bg-indigo-50 dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-800"
          >
            Terjadwal
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          >
            Selesai
          </Badge>
        )
      case "passed":
        return (
          <Badge
            variant="outline"
            className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800"
          >
            Lulus
          </Badge>
        )
      case "failed":
        return (
          <Badge
            variant="outline"
            className="text-orange-700 border-orange-200 bg-orange-50 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-800"
          >
            Tidak Lulus
          </Badge>
        )
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="text-red-700 border-red-200 bg-red-50 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800"
          >
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
          <Badge
            variant="outline"
            className="text-blue-700 border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-800"
          >
            Ujian Proposal
          </Badge>
        )
      case "result":
        return (
          <Badge
            variant="outline"
            className="text-purple-700 border-purple-200 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-800"
          >
            Ujian Hasil
          </Badge>
        )
      case "final":
        return (
          <Badge
            variant="outline"
            className="text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
          >
            Ujian Tutup
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const formatExamDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return format(date, "dd MMMM yyyy, HH:mm")
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  if (exams.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-3 mb-4 rounded-full bg-muted">
          <Calendar className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">Tidak ada ujian</h3>
        <p className="mt-1 text-muted-foreground">Belum ada ujian yang sesuai dengan filter.</p>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[250px]">Mahasiswa & Judul</TableHead>
            <TableHead>Tipe Ujian</TableHead>
            <TableHead>Pembimbing</TableHead>
            <TableHead>Jadwal & Lokasi</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exams.map((exam) => (
            <TableRow key={exam.id} className="transition-colors duration-200 group hover:bg-muted/30">
              <TableCell className="font-medium">
                <div>
                  <p className="font-semibold text-foreground">{exam.studentName}</p>
                  <p className="mb-1 text-xs text-muted-foreground">{exam.studentId}</p>
                  <p className="text-sm">{exam.title}</p>
                </div>
              </TableCell>
              <TableCell>{getExamTypeBadge(exam.type)}</TableCell>
              <TableCell>
                <div className="space-y-2">
                  {exam.advisor1 && (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border border-border">
                        <AvatarImage src={exam.advisor1.avatarUrl} alt={exam.advisor1.name} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {exam.advisor1.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{exam.advisor1.name}</p>
                        <p className="text-xs text-muted-foreground">Pembimbing 1</p>
                      </div>
                    </div>
                  )}
                  {exam.advisor2 && (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 border border-border">
                        <AvatarImage src={exam.advisor2.avatarUrl} alt={exam.advisor2.name} />
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {exam.advisor2.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{exam.advisor2.name}</p>
                        <p className="text-xs text-muted-foreground">Pembimbing 2</p>
                      </div>
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {exam.date && exam.location ? (
                    <>
                      <div className="flex items-center text-sm">
                        <Calendar className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span>{formatExamDate(exam.date)}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                        <span>{exam.location}</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-sm italic text-muted-foreground">Belum dijadwalkan</span>
                  )}
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(exam.status)}</TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewDetails(exam)}
                        className="transition-opacity opacity-70 group-hover:opacity-100"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">Lihat Detail</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lihat Detail</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

