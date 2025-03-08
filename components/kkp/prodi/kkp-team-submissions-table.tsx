"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  Building,
  Users,
  RotateCcw,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
} from "lucide-react"
import { mockKkpTeams } from "./mock-data"
import type { KkpTeam, KkpStatus } from "./types"

interface KkpTeamSubmissionsTableProps {
  searchQuery: string
}

export default function KkpTeamSubmissionsTable({ searchQuery }: KkpTeamSubmissionsTableProps) {
  const { toast } = useToast()
  const [teams, setTeams] = useState<KkpTeam[]>(mockKkpTeams)
  const [selectedTeam, setSelectedTeam] = useState<KkpTeam | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Filter teams based on search query
  const filteredTeams = teams.filter((team) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      team.name.toLowerCase().includes(query) ||
      team.location.name.toLowerCase().includes(query) ||
      team.leader.name.toLowerCase().includes(query) ||
      team.leader.nim.toLowerCase().includes(query) ||
      team.members.some(
        (member) => member.name.toLowerCase().includes(query) || member.nim.toLowerCase().includes(query),
      )
    )
  })

  // Handle viewing team details
  const handleViewDetails = (team: KkpTeam) => {
    setSelectedTeam(team)
    setShowDetailsDialog(true)
  }

  // Handle approving a team
  const handleApproveTeam = () => {
    if (!selectedTeam) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const updatedTeams = teams.map((team) => {
        if (team.id === selectedTeam.id) {
          return {
            ...team,
            status: "approved" as KkpStatus,
            reviewedBy: "Dr. Hadi Santoso",
            reviewDate: new Date().toISOString(),
            feedback: feedback || undefined,
          }
        }
        return team
      })

      setTeams(updatedTeams)
      setSelectedTeam((prev) =>
        prev
          ? {
              ...prev,
              status: "approved" as KkpStatus,
              reviewedBy: "Dr. Hadi Santoso",
              reviewDate: new Date().toISOString(),
              feedback: feedback || undefined,
            }
          : null,
      )

      toast({
        title: "Team approved",
        description: `${selectedTeam.name} has been approved for KKP.`,
      })

      setShowApprovalDialog(false)
      setFeedback("")
      setIsLoading(false)
    }, 1000)
  }

  // Handle rejecting a team
  const handleRejectTeam = () => {
    if (!selectedTeam) return
    if (!feedback.trim()) {
      toast({
        title: "Feedback required",
        description: "Please provide feedback for the rejection.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const updatedTeams = teams.map((team) => {
        if (team.id === selectedTeam.id) {
          return {
            ...team,
            status: "rejected" as KkpStatus,
            reviewedBy: "Dr. Hadi Santoso",
            reviewDate: new Date().toISOString(),
            feedback,
          }
        }
        return team
      })

      setTeams(updatedTeams)
      setSelectedTeam((prev) =>
        prev
          ? {
              ...prev,
              status: "rejected" as KkpStatus,
              reviewedBy: "Dr. Hadi Santoso",
              reviewDate: new Date().toISOString(),
              feedback,
            }
          : null,
      )

      toast({
        title: "Team rejected",
        description: `${selectedTeam.name} has been rejected for KKP.`,
      })

      setShowRejectionDialog(false)
      setFeedback("")
      setIsLoading(false)
    }, 1000)
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
      case "revision-needed":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">
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
              <TableHead>Team Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Team Leader</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <RotateCcw className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
                    <p className="text-muted-foreground">Loading teams...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No teams found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(team.startDate).toLocaleDateString("id-ID", { month: "short", year: "numeric" })} -
                          {new Date(team.endDate).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{team.location.name}</p>
                        <p className="text-xs text-muted-foreground">{team.location.city}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{team.leader.name}</p>
                        <p className="text-xs text-muted-foreground">{team.leader.nim}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{team.members.length} members</TableCell>
                  <TableCell>
                    {new Date(team.submissionDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(team.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(team)}>
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

      {/* Team Details Dialog */}
      {selectedTeam && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {selectedTeam.name}
              </DialogTitle>
              <DialogDescription>KKP Team at {selectedTeam.location.name}</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Team Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Team Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Name:</p>
                      <p className="text-sm font-medium">{selectedTeam.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">KKP Period:</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {new Date(selectedTeam.startDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}{" "}
                          -{" "}
                          {new Date(selectedTeam.endDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Leader:</p>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{selectedTeam.leader.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedTeam.leader.nim} • {selectedTeam.leader.major}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Team Members:</p>
                      <div className="space-y-2">
                        {selectedTeam.members.map((member) => (
                          <div key={member.id} className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm">{member.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {member.nim} • {member.major}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Project Title:</p>
                      <p className="text-sm font-medium">{selectedTeam.projectTitle || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Project Description:</p>
                      <p className="text-sm">{selectedTeam.projectDescription || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Location and Status Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Location Name:</p>
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{selectedTeam.location.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{selectedTeam.location.type}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Address:</p>
                      <p className="text-sm">{selectedTeam.location.address}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">City:</p>
                      <p className="text-sm">
                        {selectedTeam.location.city}, {selectedTeam.location.province}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Contact Person:</p>
                      <p className="text-sm">{selectedTeam.location.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{selectedTeam.location.contactPosition || ""}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Submission Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Submission Date:</p>
                      <p className="text-sm">
                        {new Date(selectedTeam.submissionDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Status:</p>
                      <div>{getStatusBadge(selectedTeam.status)}</div>
                    </div>
                    {selectedTeam.reviewedBy && selectedTeam.reviewDate && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Reviewed By:</p>
                        <p className="text-sm">
                          {selectedTeam.reviewedBy} •{" "}
                          {new Date(selectedTeam.reviewDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                    {selectedTeam.feedback && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Feedback:</p>
                        <p className="text-sm">{selectedTeam.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedTeam.supervisor && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Supervisor Information</h3>
                    <div className="rounded-lg border p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Supervisor:</p>
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm">{selectedTeam.supervisor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedTeam.supervisor.nip} • {selectedTeam.supervisor.department}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email:</p>
                        <p className="text-sm">{selectedTeam.supervisor.email}</p>
                      </div>
                      {selectedTeam.supervisor.specialization && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Specialization:</p>
                          <p className="text-sm">{selectedTeam.supervisor.specialization}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter className="gap-2">
              {(selectedTeam.status === "pending" || selectedTeam.status === "revision-needed") && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowDetailsDialog(false)
                      setShowRejectionDialog(true)
                    }}
                  >
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDetailsDialog(false)
                      setShowApprovalDialog(true)
                    }}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approval Dialog */}
      {selectedTeam && (
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                Approve KKP Team
              </DialogTitle>
              <DialogDescription>You are about to approve {selectedTeam.name} for KKP</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Feedback (Optional):
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Provide any feedback or notes for this team..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Approval Confirmation</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        By approving this team, they will be able to proceed with their KKP at{" "}
                        {selectedTeam.location.name}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleApproveTeam} disabled={isLoading}>
                {isLoading ? "Approving..." : "Approve Team"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Dialog */}
      {selectedTeam && (
        <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsDown className="h-5 w-5 text-primary" />
                Reject KKP Team
              </DialogTitle>
              <DialogDescription>You are about to reject {selectedTeam.name} for KKP</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejection-reason" className="text-sm font-medium">
                  Reason for Rejection:
                </label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Provide the reason for rejecting this team..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Rejection Confirmation</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        By rejecting this team, they will not be able to proceed with their KKP at{" "}
                        {selectedTeam.location.name}.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRejectTeam} disabled={isLoading || !feedback.trim()}>
                {isLoading ? "Rejecting..." : "Reject Team"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

