"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Calendar, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface ExamGuidanceListProps {
  filter?: string
}

interface Exam {
  id: string
  title: string
  exam_type: string
  status: string
  scheduled_date: string | null
  location: string | null
  student: {
    id: string
    nim: string
    name: string
    avatar: string | null
  }
  lecturerRole: string
}

export function ExamGuidanceList({ filter }: ExamGuidanceListProps) {
  const [exams, setExams] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExams()
  }, [filter])

  const fetchExams = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter && filter !== 'all') {
        params.append('status', filter)
      }

      const response = await fetch(`/api/dosen/exams?${params.toString()}`)
      if (!response.ok) throw new Error('Failed to fetch exams')

      const data = await response.json()
      setExams(data.data || [])
    } catch (error) {
      console.error('Error fetching exams:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Menunggu Persetujuan</Badge>
      case 'scheduled':
        return <Badge variant="default">Terjadwal</Badge>
      case 'completed':
        return <Badge variant="secondary">Selesai</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getExamTypeLabel = (type: string) => {
    switch (type) {
      case 'proposal':
        return 'Proposal'
      case 'result':
        return 'Hasil'
      case 'closing':
        return 'Skripsi'
      default:
        return type
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (exams.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Belum ada data ujian</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mahasiswa</TableHead>
              <TableHead>NIM</TableHead>
              <TableHead>Jenis Ujian</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal Ujian</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={exam.student.avatar || undefined} alt={exam.student.name} />
                      <AvatarFallback>{exam.student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{exam.student.name}</div>
                      <div className="text-xs text-muted-foreground">{exam.title}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{exam.student.nim}</TableCell>
                <TableCell>{getExamTypeLabel(exam.exam_type)}</TableCell>
                <TableCell>
                  {getStatusBadge(exam.status)}
                </TableCell>
                <TableCell>
                  {exam.scheduled_date
                    ? format(new Date(exam.scheduled_date), "d MMM yyyy", { locale: id })
                    : "-"
                  }
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Lihat Dokumen</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Calendar className="h-4 w-4" />
                      <span className="sr-only">Jadwal</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

