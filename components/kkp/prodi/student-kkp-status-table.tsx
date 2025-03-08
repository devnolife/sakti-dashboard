"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Download,
  Calendar,
  Users,
  FileCheck,
} from "lucide-react"
import { mockStudentKkpRecords } from "./mock-data"
import type { KkpStatus, StudentKkpRecord } from "./types"

interface StudentKkpStatusTableProps {
  searchQuery: string
}

export default function StudentKkpStatusTable({ searchQuery }: StudentKkpStatusTableProps) {
  const [records, setRecords] = useState<StudentKkpRecord[]>(
    mockStudentKkpRecords.filter((record) => record.status !== "completed"),
  )
  const [selectedRecord, setSelectedRecord] = useState<StudentKkpRecord | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
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

  // Handle viewing record details
  const handleViewDetails = (record: StudentKkpRecord) => {
    setSelectedRecord(record)
    setShowDetailsDialog(true)
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
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">
            <RotateCcw className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        )
      case "submitted":
        return (
          <Badge className="bg-purple-500/10 text-purple-500">
            <FileCheck className="h-3.5 w-3.5 mr-1" />
            Submitted
          </Badge>
        )
      case "revision-needed":
        return (
          <Badge className="bg-orange-500/10 text-orange-500">
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
      <div className="rounded-md border">
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
                    <RotateCcw className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
                    <p className="text-muted-foreground">Loading records...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No records found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{record.student.name}</p>
                        <p className="text-xs text-muted-foreground">{record.student.nim}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{record.location.name}</p>
                        <p className="text-xs text-muted-foreground">{record.location.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.team ? (
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">{record.team.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
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
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Student Record Details Dialog */}
      {selectedRecord && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {selectedRecord.student.name}
              </DialogTitle>
              <DialogDescription>
                {selectedRecord.student.nim} • {selectedRecord.student.major}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Student and KKP Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Name:</p>
                      <p className="text-sm font-medium">{selectedRecord.student.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">NIM:</p>
                      <p className="text-sm">{selectedRecord.student.nim}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Major:</p>
                      <p className="text-sm">{selectedRecord.student.major}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Semester:</p>
                      <p className="text-sm">{selectedRecord.student.semester}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email:</p>
                      <p className="text-sm">{selectedRecord.student.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone:</p>
                      <p className="text-sm">{selectedRecord.student.phone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">KKP Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Status:</p>
                      <div>{getStatusBadge(selectedRecord.status)}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Period:</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {new Date(selectedRecord.startDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          -
                          {selectedRecord.endDate
                            ? new Date(selectedRecord.endDate).toLocaleDateString("id-ID", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "Present"}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Project Title:</p>
                      <p className="text-sm font-medium">{selectedRecord.projectTitle || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Project Description:</p>
                      <p className="text-sm">{selectedRecord.projectDescription || "-"}</p>
                    </div>
                  </div>
                </div>

                {selectedRecord.documents && selectedRecord.documents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Documents</h3>
                    <div className="rounded-lg border p-4 space-y-3">
                      {selectedRecord.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(doc.uploadDate).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <Badge variant={doc.status === "verified" ? "outline" : "secondary"}>
                            {doc.status === "verified" ? "Verified" : doc.status === "pending" ? "Pending" : "Rejected"}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Location and Team Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Location Name:</p>
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedRecord.location.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{selectedRecord.location.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Address:</p>
                      <p className="text-sm">{selectedRecord.location.address}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">City:</p>
                      <p className="text-sm">
                        {selectedRecord.location.city}, {selectedRecord.location.province}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Contact Person:</p>
                      <p className="text-sm">{selectedRecord.location.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{selectedRecord.location.contactPosition || ""}</p>
                    </div>
                  </div>
                </div>

                {selectedRecord.team && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Team Information</h3>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Team Name:</p>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <p className="text-sm font-medium">{selectedRecord.team.name}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Team Leader:</p>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{selectedRecord.team.leader.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedRecord.team.leader.nim}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Team Members:</p>
                        <div className="space-y-2">
                          {selectedRecord.team.members.map((member) => (
                            <div key={member.id} className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.nim}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedRecord.supervisor && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Supervisor Information</h3>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Supervisor:</p>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{selectedRecord.supervisor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedRecord.supervisor.nip} • {selectedRecord.supervisor.department}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email:</p>
                        <p className="text-sm">{selectedRecord.supervisor.email}</p>
                      </div>
                      {selectedRecord.supervisor.specialization && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Specialization:</p>
                          <p className="text-sm">{selectedRecord.supervisor.specialization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedRecord.companyMentor && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Company Mentor</h3>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Name:</p>
                        <p className="text-sm">{selectedRecord.companyMentor.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Position:</p>
                        <p className="text-sm">{selectedRecord.companyMentor.position}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email:</p>
                        <p className="text-sm">{selectedRecord.companyMentor.email}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Phone:</p>
                        <p className="text-sm">{selectedRecord.companyMentor.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

