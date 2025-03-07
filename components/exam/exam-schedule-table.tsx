"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { ExamSchedule } from "@/types/exam-schedule"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface ExamScheduleTableProps {
  schedules: ExamSchedule[]
  onEdit: (schedule: ExamSchedule) => void
  onDelete: (id: string) => void
}

export function ExamScheduleTable({ schedules, onEdit, onDelete }: ExamScheduleTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = () => {
    if (deleteId) {
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  const formatTimeRange = (start: string, end: string) => {
    return `${start} - ${end}`
  }

  return (
    <>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Examiner</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No schedules found.
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{schedule.studentName}</div>
                      <div className="text-sm text-muted-foreground">{schedule.studentNIM}</div>
                    </div>
                  </TableCell>
                  <TableCell>{schedule.courseName}</TableCell>
                  <TableCell>{format(new Date(schedule.date), "dd MMM yyyy")}</TableCell>
                  <TableCell>{formatTimeRange(schedule.startTime, schedule.endTime)}</TableCell>
                  <TableCell>
                    {schedule.classroom.name}, {schedule.classroom.building}
                  </TableCell>
                  <TableCell>{schedule.instructorName}</TableCell>
                  <TableCell>{schedule.examinerName}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(schedule)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(schedule.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this exam schedule. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

