"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown, FileEdit, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { StudentGrade } from "./types"
import StudentGradeDetailsDialog from "./student-grade-details-dialog"

type SortField =
  | keyof StudentGrade
  | "scores.midterm"
  | "scores.final"
  | "scores.assignments"
  | "scores.labReports"
  | "scores.attendance"

interface PracticumGradesTableProps {
  grades: StudentGrade[]
}

export default function PracticumGradesTable({ grades }: PracticumGradesTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("studentName")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedGrade, setSelectedGrade] = useState<StudentGrade | null>(null)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)

  // Filter grades based on search query
  const filteredGrades = grades.filter(
    (grade) =>
      grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.labSection.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort grades based on sort field and direction
  const sortedGrades = [...filteredGrades].sort((a, b) => {
    let aValue: any, bValue: any

    if (sortField.startsWith("scores.")) {
      const scoreField = sortField.split(".")[1] as keyof typeof a.scores
      aValue = a.scores[scoreField]
      bValue = b.scores[scoreField]
    } else {
      aValue = a[sortField as keyof StudentGrade]
      bValue = b[sortField as keyof StudentGrade]
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortDirection === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
  })

  // Pagination
  const totalPages = Math.ceil(sortedGrades.length / pageSize)
  const paginatedGrades = sortedGrades.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="ml-1 h-4 w-4" />
    }
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  // Get grade status badge
  const getGradeStatusBadge = (finalGrade: number) => {
    if (finalGrade >= 80) {
      return <Badge className="bg-green-500">Excellent</Badge>
    } else if (finalGrade >= 70) {
      return <Badge className="bg-blue-500">Good</Badge>
    } else if (finalGrade >= 60) {
      return <Badge className="bg-yellow-500">Satisfactory</Badge>
    } else {
      return <Badge className="bg-red-500">Needs Improvement</Badge>
    }
  }

  // Handle opening grade details dialog
  const handleOpenDetails = (grade: StudentGrade) => {
    setSelectedGrade(grade)
    setDetailsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Rows per page:</p>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value))
              setCurrentPage(1)
            }}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder={String(pageSize)} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("studentId")}>
                <div className="flex items-center">Student ID {renderSortIndicator("studentId")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("studentName")}>
                <div className="flex items-center">Student Name {renderSortIndicator("studentName")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("labSection")}>
                <div className="flex items-center">Lab Section {renderSortIndicator("labSection")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("scores.midterm")}>
                <div className="flex items-center">Midterm {renderSortIndicator("scores.midterm")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("scores.final")}>
                <div className="flex items-center">Final {renderSortIndicator("scores.final")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("scores.assignments")}>
                <div className="flex items-center whitespace-nowrap">
                  Assignments {renderSortIndicator("scores.assignments")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("scores.labReports")}>
                <div className="flex items-center whitespace-nowrap">
                  Lab Reports {renderSortIndicator("scores.labReports")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("scores.attendance")}>
                <div className="flex items-center">Attendance {renderSortIndicator("scores.attendance")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("finalGrade")}>
                <div className="flex items-center">Final Grade {renderSortIndicator("finalGrade")}</div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedGrades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  No grades found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedGrades.map((grade, index) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{(currentPage - 1) * pageSize + index + 1}</TableCell>
                  <TableCell>{grade.studentId}</TableCell>
                  <TableCell>{grade.studentName}</TableCell>
                  <TableCell>{grade.labSection}</TableCell>
                  <TableCell>{grade.scores.midterm}</TableCell>
                  <TableCell>{grade.scores.final}</TableCell>
                  <TableCell>{grade.scores.assignments}</TableCell>
                  <TableCell>{grade.scores.labReports}</TableCell>
                  <TableCell>{grade.scores.attendance}</TableCell>
                  <TableCell className="font-bold">{grade.finalGrade}</TableCell>
                  <TableCell>{getGradeStatusBadge(grade.finalGrade)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDetails(grade)}>
                      <FileEdit className="h-4 w-4" />
                      <span className="sr-only">Edit grade</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredGrades.length)}
            </strong>{" "}
            of <strong>{filteredGrades.length}</strong> grades
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Student Grade Details Dialog */}
      {selectedGrade && (
        <StudentGradeDetailsDialog grade={selectedGrade} open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} />
      )}
    </div>
  )
}

