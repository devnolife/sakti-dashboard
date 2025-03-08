"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Clock, MoreVertical, Pencil, Trash2 } from "lucide-react"
import type { PracticumSchedule } from "./types"
import EditPracticumScheduleDialog from "./edit-practicum-schedule-dialog"
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

interface PracticumScheduleTableProps {
  schedules: PracticumSchedule[]
  onDelete: (id: string) => void
  onUpdate: (schedule: PracticumSchedule) => void
}

export default function PracticumScheduleTable({ schedules, onDelete, onUpdate }: PracticumScheduleTableProps) {
  const [editingSchedule, setEditingSchedule] = useState<PracticumSchedule | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteScheduleId, setDeleteScheduleId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEdit = (schedule: PracticumSchedule) => {
    setEditingSchedule(schedule)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDeleteScheduleId(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deleteScheduleId) {
      onDelete(deleteScheduleId)
      setIsDeleteDialogOpen(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500">Akan Datang</Badge>
      case "completed":
        return <Badge variant="outline">Selesai</Badge>
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hari</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Praktikum</TableHead>
              <TableHead>Mata Kuliah</TableHead>
              <TableHead>Laboratorium</TableHead>
              <TableHead>Asisten</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Tidak ada jadwal praktikum yang ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.day}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{schedule.title}</TableCell>
                  <TableCell>{schedule.course}</TableCell>
                  <TableCell>{schedule.lab}</TableCell>
                  <TableCell>{schedule.assistants.join(", ")}</TableCell>
                  <TableCell>{getStatusBadge(schedule.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Buka menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(schedule)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(schedule.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingSchedule && (
        <EditPracticumScheduleDialog
          schedule={editingSchedule}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onUpdate={onUpdate}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Jadwal Praktikum</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus jadwal praktikum ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

