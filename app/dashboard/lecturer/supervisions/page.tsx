"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Building,
  AlertCircle,
  User,
  FileCheck,
  Download,
  Briefcase,
  PlayCircle,
  CheckCircle,
  RotateCcw,
} from "lucide-react"
import type { KkpApplication, KkpStatus } from "@/types/kkp"
import { getAllKkpApplications, getKkpApplicationById, updateKkpApplicationStatus } from "@/app/actions/kkp-management"

export default function LecturerSupervisionsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<KkpStatus | "all">("all")
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [feedback, setFeedback] = useState("")

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllKkpApplications()

        // Filter to only show applications assigned to the current lecturer (mock)
        // In a real app, the API would handle this filtering
        const lecturerApplications = data.filter(
          (app) =>
            app.supervisor &&
            app.supervisor.id === "lec-001" &&
            (app.status === "approved" || app.status === "in-progress" || app.status === "completed"),
        )

        setApplications(lecturerApplications)
        setFilteredApplications(lecturerApplications)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to fetch KKP applications",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [toast])

  // Filter applications based on active tab and search query
  useEffect(() => {
    let filtered = applications

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((app) => app.status === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.applicationNumber.toLowerCase().includes(query) ||
          app.title.toLowerCase().includes(query) ||
          app.student.name.toLowerCase().includes(query) ||
          app.student.nim.toLowerCase().includes(query) ||
          app.company.name.toLowerCase().includes(query),
      )
    }

    setFilteredApplications(filtered)
  }, [activeTab, searchQuery, applications])

  // Handle viewing application details
  const handleViewDetails = async (id: string) => {
    try {
      const application = await getKkpApplicationById(id)
      if (application) {
        setSelectedApplication(application)
        setShowDetailsDialog(true)
      } else {
        toast({
          title: "Error",
          description: "Application not found",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching application details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch application details",
        variant: "destructive",
      })
    }
  }

  // Handle viewing document details
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentDialog(true)
  }

  // Handle updating application status
  const handleUpdateStatus = async (status: KkpStatus) => {
    if (!selectedApplication) return

    try {
      const result = await updateKkpApplicationStatus(
        selectedApplication.id,
        status,
        "lec-001", // In a real app, this would be the actual user ID
        "Dr. Bambang Suprapto", // In a real app, this would be the actual user name
        feedback,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the application in state
        const updatedApplication = await getKkpApplicationById(selectedApplication.id)
        if (updatedApplication) {
          setSelectedApplication(updatedApplication)

          // Update the applications list
          setApplications((prev) => prev.map((app) => (app.id === updatedApplication.id ? updatedApplication : app)))
        }

        setShowFeedbackDialog(false)
        setFeedback("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating application status:", error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      })
    }
  }

  // Get status badge
  const getStatusBadge = (status: KkpStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending Review
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
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-purple-500/10 text-purple-500">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  // Get document status badge
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Verified
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            KKP Supervisions
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Manage your assigned KKP supervisions</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as KkpStatus | "all")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search supervisions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>KKP Supervisions</CardTitle>
          <CardDescription>Manage and monitor your assigned KKP supervisions</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value={activeTab} className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Application ID</TableHead>
                    <TableHead className="w-[250px]">Title</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <RotateCcw className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
                          <p className="text-muted-foreground">Loading supervisions...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No supervisions found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                        <TableCell>{application.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {application.student.avatar ? (
                              <img
                                src={application.student.avatar || "/placeholder.svg"}
                                alt={application.student.name}
                                className="h-6 w-6 rounded-full"
                              />
                            ) : (
                              <User className="h-6 w-6 text-muted-foreground" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{application.student.name}</p>
                              <p className="text-xs text-muted-foreground">{application.student.nim}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {application.company.logo ? (
                              <img
                                src={application.company.logo || "/placeholder.svg"}
                                alt={application.company.name}
                                className="h-6 w-6 rounded-full"
                              />
                            ) : (
                              <Building className="h-6 w-6 text-muted-foreground" />
                            )}
                            <span>{application.company.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(application.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                          {" - "}
                          {new Date(application.endDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(application.id)}>
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
          </TabsContent>
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                {selectedApplication.title}
              </DialogTitle>
              <DialogDescription>
                {selectedApplication.applicationNumber} • {selectedApplication.company.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Student Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Student Information</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedApplication.student.avatar ? (
                          <img
                            src={selectedApplication.student.avatar || "/placeholder.svg"}
                            alt={selectedApplication.student.name}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <User className="h-12 w-12 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{selectedApplication.student.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedApplication.student.nim}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Major:</span>
                          <span>{selectedApplication.student.major}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Semester:</span>
                          <span>{selectedApplication.student.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="truncate max-w-[150px]">{selectedApplication.student.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span>{selectedApplication.student.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedApplication.groupMembers && selectedApplication.groupMembers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Group Members</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {selectedApplication.groupMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-2">
                              <User className="h-6 w-6 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.nim}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Middle Column - Company and Application Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Company Information</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedApplication.company.logo ? (
                          <img
                            src={selectedApplication.company.logo || "/placeholder.svg"}
                            alt={selectedApplication.company.name}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <Building className="h-12 w-12 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{selectedApplication.company.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedApplication.company.industry}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address:</span>
                          <span className="text-right">{selectedApplication.company.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">City:</span>
                          <span>{selectedApplication.company.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contact Person:</span>
                          <span>{selectedApplication.company.contactPerson}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contact Phone:</span>
                          <span>{selectedApplication.company.contactPhone}</span>
                        </div>
                        {selectedApplication.company.website && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Website:</span>
                            <a
                              href={
                                selectedApplication.company.website.startsWith("http")
                                  ? selectedApplication.company.website
                                  : `http://${selectedApplication.company.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.company.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Application Details</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Description:</p>
                          <p className="text-sm">{selectedApplication.description}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Submission Date:</span>
                          <span className="text-sm">
                            {new Date(selectedApplication.submissionDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Start Date:</span>
                          <span className="text-sm">
                            {new Date(selectedApplication.startDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">End Date:</span>
                          <span className="text-sm">
                            {new Date(selectedApplication.endDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span>{getStatusBadge(selectedApplication.status)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Documents */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Documents</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {selectedApplication.documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{document.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(document.uploadDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getDocumentStatusBadge(document.status)}
                            <Button variant="ghost" size="sm" onClick={() => handleViewDocument(document)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={document.url} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                      {selectedApplication.documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-4">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No documents found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter className="gap-2">
              {selectedApplication.status === "approved" && (
                <Button
                  onClick={() => {
                    setFeedback("")
                    setShowFeedbackDialog(true)
                  }}
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Mark as In Progress
                </Button>
              )}
              {selectedApplication.status === "in-progress" && (
                <Button
                  onClick={() => {
                    setFeedback("")
                    setShowFeedbackDialog(true)
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Completed
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document View Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                {selectedDocument.name}
              </DialogTitle>
              <DialogDescription>
                Uploaded on{" "}
                {new Date(selectedDocument.uploadDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status:</span>
                {getDocumentStatusBadge(selectedDocument.status)}
              </div>
              {selectedDocument.notes && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Notes:</p>
                  <p className="text-sm text-muted-foreground">{selectedDocument.notes}</p>
                </div>
              )}
              <div className="flex justify-center">
                <Button variant="outline" asChild className="w-full">
                  <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    View Document
                  </a>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Feedback Dialog */}
      {selectedApplication && (
        <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedApplication.status === "approved" ? (
                  <PlayCircle className="h-5 w-5 text-primary" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
                {selectedApplication.status === "approved" ? "Mark as In Progress" : "Mark as Completed"}
              </DialogTitle>
              <DialogDescription>Please provide any feedback or notes about this KKP application.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-sm font-medium">
                  Feedback (Optional):
                </label>
                <Textarea
                  id="feedback"
                  placeholder="Enter your feedback or notes..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    {selectedApplication.status === "approved" ? (
                      <PlayCircle className="h-5 w-5 text-blue-400" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Status Update</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        You are about to update the status of this KKP application to{" "}
                        <span className="font-medium">
                          {selectedApplication.status === "approved" ? "In Progress" : "Completed"}
                        </span>
                        .
                      </p>
                      <p className="mt-2">
                        {selectedApplication.status === "approved"
                          ? "This indicates that the student has started their KKP implementation."
                          : "This indicates that the student has successfully completed their KKP."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleUpdateStatus(selectedApplication.status === "approved" ? "in-progress" : "completed")
                }
              >
                {selectedApplication.status === "approved" ? "Mark as In Progress" : "Mark as Completed"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

