"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Eye, Edit, UserX, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { students } from "./mock-data"
import { StudentDetailsDialog } from "./student-details-dialog"

interface ActiveStudentsListProps {
  searchQuery: string
  selectedDepartment: string | null
}

export function ActiveStudentsList({ searchQuery, selectedDepartment }: ActiveStudentsListProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  // Filter students based on search query and selected department
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.teamName && student.teamName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 shadow-sm"
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Aktif</span>
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 shadow-sm"
          >
            <CheckCircle className="h-3 w-3" />
            <span>Selesai</span>
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1 shadow-sm"
          >
            <Clock className="h-3 w-3" />
            <span>Menunggu</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <div className="rounded-md border border-primary-100 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-primary-50">
            <TableRow>
              <TableHead className="text-primary-700">Nama Mahasiswa</TableHead>
              <TableHead className="text-primary-700">NIM</TableHead>
              <TableHead className="text-primary-700">Jurusan</TableHead>
              <TableHead className="text-primary-700">Tim</TableHead>
              <TableHead className="text-primary-700">Status</TableHead>
              <TableHead className="text-primary-700">Pembimbing</TableHead>
              <TableHead className="text-right text-primary-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Tidak ada data mahasiswa yang sesuai dengan kriteria pencarian
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-primary-50/50 transition-colors">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.nim}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.teamName || "-"}</TableCell>
                  <TableCell>{getStatusBadge(student.status)}</TableCell>
                  <TableCell>{student.supervisor || "-"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-primary-100 shadow-md">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setSelectedStudent(student.id)}
                          className="hover:bg-primary-50 hover:text-primary-700 cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Lihat Detail</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-primary-50 hover:text-primary-700 cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Data</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-red-50 hover:text-red-700 cursor-pointer">
                          <UserX className="mr-2 h-4 w-4" />
                          <span>Nonaktifkan</span>
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

      {selectedStudent && (
        <StudentDetailsDialog
          studentId={selectedStudent}
          open={!!selectedStudent}
          onOpenChange={(open) => {
            if (!open) setSelectedStudent(null)
          }}
        />
      )}
    </>
  )
}

