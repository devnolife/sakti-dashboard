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
  User,
  RotateCcw,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  MapPin,
} from "lucide-react"
import { mockKkpLocations } from "./mock-data"
import type { KkpLocation, KkpStatus } from "./types"

interface KkpLocationSubmissionsTableProps {
  searchQuery: string
}

export default function KkpLocationSubmissionsTable({ searchQuery }: KkpLocationSubmissionsTableProps) {
  const { toast } = useToast()
  const [locations, setLocations] = useState<KkpLocation[]>(mockKkpLocations)
  const [selectedLocation, setSelectedLocation] = useState<KkpLocation | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      location.name.toLowerCase().includes(query) ||
      location.city.toLowerCase().includes(query) ||
      location.submittedBy.name.toLowerCase().includes(query) ||
      location.submittedBy.nim.toLowerCase().includes(query)
    )
  })

  // Handle viewing location details
  const handleViewDetails = (location: KkpLocation) => {
    setSelectedLocation(location)
    setShowDetailsDialog(true)
  }

  // Handle approving a location
  const handleApproveLocation = () => {
    if (!selectedLocation) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const updatedLocations = locations.map((loc) => {
        if (loc.id === selectedLocation.id) {
          return {
            ...loc,
            status: "approved" as KkpStatus,
            reviewedBy: "Dr. Hadi Santoso",
            reviewDate: new Date().toISOString(),
            feedback: feedback || undefined,
          }
        }
        return loc
      })

      setLocations(updatedLocations)
      setSelectedLocation((prev) =>
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
        title: "Location approved",
        description: `${selectedLocation.name} has been approved as a KKP location.`,
      })

      setShowApprovalDialog(false)
      setFeedback("")
      setIsLoading(false)
    }, 1000)
  }

  // Handle rejecting a location
  const handleRejectLocation = () => {
    if (!selectedLocation) return
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
      const updatedLocations = locations.map((loc) => {
        if (loc.id === selectedLocation.id) {
          return {
            ...loc,
            status: "rejected" as KkpStatus,
            reviewedBy: "Dr. Hadi Santoso",
            reviewDate: new Date().toISOString(),
            feedback,
          }
        }
        return loc
      })

      setLocations(updatedLocations)
      setSelectedLocation((prev) =>
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
        title: "Location rejected",
        description: `${selectedLocation.name} has been rejected as a KKP location.`,
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
              <TableHead>Location Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Submitted By</TableHead>
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
                    <p className="text-muted-foreground">Loading locations...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredLocations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No locations found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-xs text-muted-foreground">{location.type}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{location.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{location.city}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{location.submittedBy.name}</p>
                        <p className="text-xs text-muted-foreground">{location.submittedBy.nim}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(location.submissionDate).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{getStatusBadge(location.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(location)}>
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

      {/* Location Details Dialog */}
      {selectedLocation && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                {selectedLocation.name}
              </DialogTitle>
              <DialogDescription>
                {selectedLocation.type} • {selectedLocation.city}, {selectedLocation.province}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Company Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Address:</p>
                      <p className="text-sm">{selectedLocation.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">City:</p>
                        <p className="text-sm">{selectedLocation.city}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Province:</p>
                        <p className="text-sm">{selectedLocation.province}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Website:</p>
                      <p className="text-sm">
                        {selectedLocation.website ? (
                          <a
                            href={
                              selectedLocation.website.startsWith("http")
                                ? selectedLocation.website
                                : `http://${selectedLocation.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {selectedLocation.website}
                          </a>
                        ) : (
                          "-"
                        )}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Description:</p>
                      <p className="text-sm">{selectedLocation.description || "-"}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Contact Person:</p>
                      <p className="text-sm">{selectedLocation.contactPerson}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Position:</p>
                      <p className="text-sm">{selectedLocation.contactPosition || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email:</p>
                      <p className="text-sm">{selectedLocation.contactEmail}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone:</p>
                      <p className="text-sm">{selectedLocation.contactPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Submission Information</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Submitted By:</p>
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{selectedLocation.submittedBy.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {selectedLocation.submittedBy.nim} • {selectedLocation.submittedBy.major}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Submission Date:</p>
                      <p className="text-sm">
                        {new Date(selectedLocation.submissionDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Status:</p>
                      <div>{getStatusBadge(selectedLocation.status)}</div>
                    </div>
                    {selectedLocation.reviewedBy && selectedLocation.reviewDate && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Reviewed By:</p>
                        <p className="text-sm">
                          {selectedLocation.reviewedBy} •{" "}
                          {new Date(selectedLocation.reviewDate).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                    {selectedLocation.feedback && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Feedback:</p>
                        <p className="text-sm">{selectedLocation.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Positions & Skills</h3>
                  <div className="rounded-lg border p-4 space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Available Positions:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.availablePositions && selectedLocation.availablePositions.length > 0 ? (
                          selectedLocation.availablePositions.map((position, index) => (
                            <Badge key={index} variant="outline">
                              {position}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm">-</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.requiredSkills && selectedLocation.requiredSkills.length > 0 ? (
                          selectedLocation.requiredSkills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-primary/10">
                              {skill}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm">-</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              {selectedLocation.status === "pending" && (
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
      {selectedLocation && (
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
                Approve KKP Location
              </DialogTitle>
              <DialogDescription>You are about to approve {selectedLocation.name} as a KKP location</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Feedback (Optional):
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Provide any feedback or notes for this location..."
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
                        By approving this location, students will be able to select {selectedLocation.name} as their KKP
                        location.
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
              <Button onClick={handleApproveLocation} disabled={isLoading}>
                {isLoading ? "Approving..." : "Approve Location"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Dialog */}
      {selectedLocation && (
        <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsDown className="h-5 w-5 text-primary" />
                Reject KKP Location
              </DialogTitle>
              <DialogDescription>You are about to reject {selectedLocation.name} as a KKP location</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejection-reason" className="text-sm font-medium">
                  Reason for Rejection:
                </label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Provide the reason for rejecting this location..."
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
                        By rejecting this location, students will not be able to select {selectedLocation.name} as their
                        KKP location.
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
              <Button variant="destructive" onClick={handleRejectLocation} disabled={isLoading || !feedback.trim()}>
                {isLoading ? "Rejecting..." : "Reject Location"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

