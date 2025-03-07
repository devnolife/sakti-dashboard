"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { Exam } from "@/types/exam"
import { ExamDetailsDialog } from "./exam-details-dialog"
import { useState } from "react"
import { CheckCircle, Clock, AlertCircle, Calendar, XCircle } from "lucide-react"

interface ExamTableProps {
  exams: Exam[]
  onExamSelect: (exam: Exam | null) => void
}

export function ExamTable({ exams, onExamSelect }: ExamTableProps) {
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "passed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Passed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Unknown
          </Badge>
        )
    }
  }

  const handleViewDetails = (exam: Exam) => {
    setSelectedExam(exam)
    onExamSelect(exam)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No exams found.
                </TableCell>
              </TableRow>
            ) : (
              exams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{exam.studentName}</div>
                      <div className="text-sm text-muted-foreground">{exam.studentNIM}</div>
                    </div>
                  </TableCell>
                  <TableCell>{exam.title}</TableCell>
                  <TableCell>{format(new Date(exam.submissionDate), "dd MMM yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(exam.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(exam)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedExam && (
        <ExamDetailsDialog
          exam={selectedExam}
          open={!!selectedExam}
          onOpenChange={(open) => !open && setSelectedExam(null)}
        />
      )}
    </>
  )
}

