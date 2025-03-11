"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Building,
  User,
  RotateCcw,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Users,
  Calendar,
} from "lucide-react"
import { mockStudentKkpRecords } from "./mock-data"
import type { KkpStatus, StudentKkpRecord } from "./types"

interface StudentKkpStatusTableProps {
  searchQuery: string
}

export default function StudentKkpStatusTable({ searchQuery }: StudentKkpStatusTableProps) {
  const router = useRouter()
  const [records, setRecords] = useState<StudentKkpRecord[]>(
    mockStudentKkpRecords.filter((record) => record.status !== "completed"),
  )
  const [isLoading, setIsLoading] = useState(false)

  // Filter records based on search query
  const filteredRecords = records.filter((record) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      record.student.name.toLowerCase().includes(query) ||
      record.student.nim.toLowerCase().includes(query) ||
      record.location.name.toLowerCase().includes(query) ||
      record.location.city.toLowerCase().includes(query) ||
      record.team?.name.toLowerCase().includes(query) ||
      false
    )
  })

  // Handle viewing record details - redirect to the detail page
  const handleViewDetails = (record: StudentKkpRecord) => {
    router.push(`/dashboard/prodi/kkp/student/${record.id}`)
  }

  // Get status badge
  const getStatusBadge = (status: KkpStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="text-green-500 bg-green-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="text-red-500 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="text-blue-500 bg-blue-500/10">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge className="text-green-500 bg-green-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="text-purple-500 bg-purple-500/10">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Submitted
          </Badge>
        )
      case "revision-needed":
        return (
          <Badge className="text-orange-500 bg-orange-500/10">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Revision Needed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Team</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                    <p className="text-muted-foreground">Loading records...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No records found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{record.student.name}</p>
                        <p className="text-xs text-muted-foreground">{record.student.nim}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{record.location.name}</p>
                        <p className="text-xs text-muted-foreground">{record.location.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.team ? (
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm">{record.team.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">
                          {new Date(record.startDate).toLocaleDateString("id-ID", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          -
                          {record.endDate
                            ? new Date(record.endDate).toLocaleDateString("id-ID", {
                                month: "short",
                                year: "numeric",
                              })
                            : "Present"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>
                    {record.documents ? (
                      <Badge variant="outline">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        {record.documents.length} files
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(record)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

