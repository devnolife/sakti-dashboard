"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { PracticumEnrollment, PracticumStatus } from "./types"
import { mockPracticumEnrollments } from "./mock-practicum-data"
import { EnrollmentDetailsDialog } from "./enrollment-details-dialog"

export function PracticumEnrollmentsList() {
  const [enrollments, setEnrollments] = useState<PracticumEnrollment[]>(mockPracticumEnrollments)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [courseFilter, setCourseFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof PracticumEnrollment
    direction: "asc" | "desc"
  }>({ key: "enrollmentDate", direction: "desc" })
  const [selectedEnrollment, setSelectedEnrollment] = useState<PracticumEnrollment | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Get unique courses for filter
  const uniqueCourses = Array.from(new Set(mockPracticumEnrollments.map((e) => e.courseName)))

  // Handle sorting
  const handleSort = (key: keyof PracticumEnrollment) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    setSortConfig({ key, direction })
  }

  // Filter and sort enrollments
  const filteredEnrollments = enrollments
    .filter((enrollment) => {
      const matchesSearch =
        enrollment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enrollment.courseName.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || enrollment.status === statusFilter
      const matchesCourse = courseFilter === "all" || enrollment.courseName === courseFilter

      return matchesSearch && matchesStatus && matchesCourse
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }

      return 0
    })

  // Handle status change
  const handleStatusChange = (enrollmentId: string, newStatus: PracticumStatus) => {
    setEnrollments(
      enrollments.map((enrollment) =>
        enrollment.id === enrollmentId ? { ...enrollment, status: newStatus } : enrollment,
      ),
    )
  }

  // View enrollment details
  const viewEnrollmentDetails = (enrollment: PracticumEnrollment) => {
    setSelectedEnrollment(enrollment)
    setIsDetailsOpen(true)
  }

  // Render status badge
  const renderStatusBadge = (status: PracticumStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search enrollments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("studentName")}>
                Student Name
                {sortConfig.key === "studentName" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline ml-1 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("courseName")}>
                Course
                {sortConfig.key === "courseName" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline ml-1 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("enrollmentDate")}>
                Enrollment Date
                {sortConfig.key === "enrollmentDate" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline ml-1 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                Status
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "asc" ? (
                    <ChevronUp className="inline ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="inline ml-1 h-4 w-4" />
                  ))}
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No enrollments found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <TableRow
                  key={enrollment.id}
                  className={cn(
                    enrollment.status === "pending" && "bg-yellow-50/30",
                    enrollment.status === "rejected" && "bg-red-50/30",
                  )}
                >
                  <TableCell className="font-medium">{enrollment.studentName}</TableCell>
                  <TableCell>{enrollment.studentId}</TableCell>
                  <TableCell>{enrollment.courseName}</TableCell>
                  <TableCell>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</TableCell>
                  <TableCell>{renderStatusBadge(enrollment.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewEnrollmentDetails(enrollment)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {enrollment.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => handleStatusChange(enrollment.id, "approved")}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(enrollment.id, "rejected")}>
                              <XCircle className="mr-2 h-4 w-4 text-red-600" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {enrollment.status === "approved" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(enrollment.id, "in_progress")}>
                            <AlertCircle className="mr-2 h-4 w-4 text-blue-600" />
                            Mark as In Progress
                          </DropdownMenuItem>
                        )}
                        {enrollment.status === "in_progress" && (
                          <DropdownMenuItem onClick={() => handleStatusChange(enrollment.id, "completed")}>
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            Mark as Completed
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedEnrollment && (
        <EnrollmentDetailsDialog
          enrollment={selectedEnrollment}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          onStatusChange={(newStatus) => {
            handleStatusChange(selectedEnrollment.id, newStatus)
            setSelectedEnrollment((prev) => (prev ? { ...prev, status: newStatus } : null))
          }}
        />
      )}
    </div>
  )
}

