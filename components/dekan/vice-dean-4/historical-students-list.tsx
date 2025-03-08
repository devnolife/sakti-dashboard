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
import { MoreHorizontal, Eye, Download, Award } from "lucide-react"
import { historicalStudents } from "./mock-data"
import { StudentDetailsDialog } from "./student-details-dialog"

interface HistoricalStudentsListProps {
  searchQuery: string
  selectedDepartment: string | null
}

export function HistoricalStudentsList({ searchQuery, selectedDepartment }: HistoricalStudentsListProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  // Filter students based on search query and selected department
  const filteredStudents = historicalStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.nim.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.teamName && student.teamName.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  const getGradeBadge = (grade: string | null) => {
    if (!grade) return "-"

    let colorClass = ""
    switch (grade) {
      case "A":
        colorClass = "bg-green-50 text-green-700 border-green-200"
        break
      case "B+":
      case "B":
        colorClass = "bg-blue-50 text-blue-700 border-blue-200"
        break
      case "C+":
      case "C":
        colorClass = "bg-yellow-50 text-yellow-700 border-yellow-200"
        break
      default:
        colorClass = "bg-gray-50 text-gray-700 border-gray-200"
    }

    return (
      <Badge variant="outline" className={`${colorClass} flex items-center gap-1 shadow-sm`}>
        <Award className="h-3 w-3" />
        <span>{grade}</span>
      </Badge>
    )
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
              <TableHead className="text-primary-700">Periode</TableHead>
              <TableHead className="text-primary-700">Nilai</TableHead>
              <TableHead className="text-right text-primary-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  Tidak ada data riwayat mahasiswa yang sesuai dengan kriteria pencarian
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-primary-50/50 transition-colors">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.nim}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.teamName || "-"}</TableCell>
                  <TableCell>
                    {student.startDate && student.endDate ? (
                      <>
                        {new Date(student.startDate).toLocaleDateString("id-ID", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(student.endDate).toLocaleDateString("id-ID", {
                          month: "short",
                          year: "numeric",
                        })}
                      </>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{getGradeBadge(student.grade)}</TableCell>
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
                          <Download className="mr-2 h-4 w-4" />
                          <span>Unduh Laporan</span>
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

