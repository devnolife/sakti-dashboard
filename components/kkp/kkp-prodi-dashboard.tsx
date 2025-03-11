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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import type { KkpApplication, KkpStatus } from "@/types/kkp"
import {
  getAllKkpApplications,
  getKkpApplicationById,
  updateKkpApplicationStatus,
  assignSupervisor,
} from "@/app/actions/kkp-management"

// Mock data for supervisors
const MOCK_SUPERVISORS = [
  { id: "lec-001", name: "Dr. Bambang Suprapto" },
  { id: "lec-002", name: "Dr. Siti Aminah" },
  { id: "lec-003", name: "Dr. Budi Hartono" },
  { id: "lec-004", name: "Dr. Dewi Kartika" },
  { id: "lec-005", name: "Dr. Agus Santoso" },
]

export default function KkpProdiDashboard() {
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
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [showAssignSupervisorDialog, setShowAssignSupervisorDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [selectedSupervisor, setSelectedSupervisor] = useState("")

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllKkpApplications()
        setApplications(data)
        setFilteredApplications(data)
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

  // Handle approving an application
  const handleApproveApplication = async () => {
    if (!selectedApplication) return

    try {
      const result = await updateKkpApplicationStatus(
        selectedApplication.id,
        "approved",
        "prodi-001", // In a real app, this would be the actual user ID
        "Dr. Hadi Santoso", // In a real app, this would be the actual user name
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

        setShowApprovalDialog(false)

        // Show assign supervisor dialog
        setShowAssignSupervisorDialog(true)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error approving application:", error)
      toast({
        title: "Error",
        description: "Failed to approve application",
        variant: "destructive",
      })
    }
  }

  // Handle rejecting an application
  const handleRejectApplication = async () => {
    if (!selectedApplication) return

    try {
      const result = await updateKkpApplicationStatus(
        selectedApplication.id,
        "rejected",
        "prodi-001", // In a real app, this would be the actual user ID
        "Dr. Hadi Santoso", // In a real app, this would be the actual user name
        rejectionReason,
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

        setShowRejectionDialog(false)
        setRejectionReason("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error rejecting application:", error)
      toast({
        title: "Error",
        description: "Failed to reject application",
        variant: "destructive",
      })
    }
  }

  // Handle assigning a supervisor
  const handleAssignSupervisor = async () => {
    if (!selectedApplication || !selectedSupervisor) return

    const supervisor = MOCK_SUPERVISORS.find((s) => s.id === selectedSupervisor)

    if (!supervisor) {
      toast({
        title: "Error",
        description: "Please select a valid supervisor",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await assignSupervisor(selectedApplication.id, supervisor.id, supervisor.name)

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

        setShowAssignSupervisorDialog(false)
        setSelectedSupervisor("")
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error assigning supervisor:", error)
      toast({
        title: "Error",
        description: "Failed to assign supervisor",
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
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge className="text-purple-500 bg-purple-500/10">
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
          <Badge className="text-green-500 bg-green-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="text-red-500 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  // Render application table
  const renderApplicationTable = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Application ID</TableHead>
            <TableHead className="w-[250px]">Title</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center">
                  <RotateCcw className="w-8 h-8 mb-2 text-muted-foreground animate-spin" />
                  <p className="text-muted-foreground">Loading applications...</p>
                </div>
              </TableCell>
            </TableRow>
          ) : filteredApplications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center">
                  <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">No applications found</p>
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
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-muted-foreground" />
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
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <Building className="w-6 h-6 text-muted-foreground" />
                    )}
                    <span>{application.company.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(application.submissionDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(application.id)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            KKP Application Approval
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Review and approve KKP applications from students</p>
      </div>

      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as KkpStatus | "all")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-6 md:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>KKP Applications</CardTitle>
              <CardDescription>Review and approve KKP applications from students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">{renderApplicationTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Pending KKP Applications</CardTitle>
              <CardDescription>Review pending KKP applications from students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">{renderApplicationTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Approved KKP Applications</CardTitle>
              <CardDescription>View approved KKP applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">{renderApplicationTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Rejected KKP Applications</CardTitle>
              <CardDescription>View rejected KKP applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">{renderApplicationTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>In-Progress KKP Applications</CardTitle>
              <CardDescription>View KKP applications that are currently in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">{renderApplicationTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle>Completed KKP Applications</CardTitle>
              <CardDescription>View completed KKP applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">{renderApplicationTable()}</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                {selectedApplication.title}
              </DialogTitle>
              <DialogDescription>
                {selectedApplication.applicationNumber} • {selectedApplication.company.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Left Column - Student Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Student Information</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedApplication.student.avatar ? (
                          <img
                            src={selectedApplication.student.avatar || "/placeholder.svg"}
                            alt={selectedApplication.student.name}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <User className="w-12 h-12 text-muted-foreground" />
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
                    <h3 className="mb-2 text-lg font-semibold">Group Members</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {selectedApplication.groupMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-2">
                              <User className="w-6 h-6 text-muted-foreground" />
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

                {selectedApplication.supervisor && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Supervisor</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <User className="w-6 h-6 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{selectedApplication.supervisor.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedApplication.supervisor.nip}</p>
                          </div>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Department:</span>
                            <span>{selectedApplication.supervisor.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="truncate max-w-[150px]">{selectedApplication.supervisor.email}</span>
                          </div>
                          {selectedApplication.supervisor.specialization && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Specialization:</span>
                              <span>{selectedApplication.supervisor.specialization}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Middle Column - Company and Application Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Company Information</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedApplication.company.logo ? (
                          <img
                            src={selectedApplication.company.logo || "/placeholder.svg"}
                            alt={selectedApplication.company.name}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <Building className="w-12 h-12 text-muted-foreground" />
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
                  <h3 className="mb-2 text-lg font-semibold">Application Details</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="mb-1 text-sm text-muted-foreground">Description:</p>
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
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span>{getStatusBadge(selectedApplication.status)}</span>
                        </div>
                        {selectedApplication.approvedBy && selectedApplication.approvedDate && (
                          <div className="pt-2 border-t">
                            <p className="mb-1 text-sm text-muted-foreground">Approved by:</p>
                            <p className="text-sm font-medium">{selectedApplication.approvedBy}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(selectedApplication.approvedDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        )}
                        {selectedApplication.rejectedBy && selectedApplication.rejectedDate && (
                          <div className="pt-2 border-t">
                            <p className="mb-1 text-sm text-muted-foreground">Rejected by:</p>
                            <p className="text-sm font-medium">{selectedApplication.rejectedBy}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(selectedApplication.rejectedDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        )}
                        {selectedApplication.rejectionReason && (
                          <div className="pt-2">
                            <p className="mb-1 text-sm text-muted-foreground">Rejection Reason:</p>
                            <p className="text-sm text-red-500">{selectedApplication.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Documents */}
              <div>
                <h3 className="mb-2 text-lg font-semibold">Documents</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {selectedApplication.documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-muted-foreground" />
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
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={document.url} target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                      {selectedApplication.documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-4">
                          <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-muted-foreground">No documents found</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter className="gap-2">
              {selectedApplication.status === "pending" && (
                <>
                  <Button variant="outline" onClick={() => setShowRejectionDialog(true)}>
                    <ThumbsDown className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button onClick={() => setShowApprovalDialog(true)}>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
              {selectedApplication.status === "approved" && !selectedApplication.supervisor && (
                <Button onClick={() => setShowAssignSupervisorDialog(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Assign Supervisor
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
                <FileCheck className="w-5 h-5 text-primary" />
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
              <div className="flex items-center justify-between">
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
                    <FileText className="w-4 h-4 mr-2" />
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

      {/* Approval Confirmation Dialog */}
      {selectedApplication && (
        <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-primary" />
                Approve Application
              </DialogTitle>
              <DialogDescription>Are you sure you want to approve this KKP application?</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-green-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Approval Confirmation</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        You are about to approve the KKP application for{" "}
                        <span className="font-medium">{selectedApplication.student.name}</span> at{" "}
                        <span className="font-medium">{selectedApplication.company.name}</span>.
                      </p>
                      <p className="mt-2">After approval, you will need to assign a supervisor for this KKP.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleApproveApplication}>Approve Application</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Dialog */}
      {selectedApplication && (
        <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ThumbsDown className="w-5 h-5 text-primary" />
                Reject Application
              </DialogTitle>
              <DialogDescription>Please provide a reason for rejecting this KKP application.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="rejection-reason" className="text-sm font-medium">
                  Rejection Reason:
                </label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Enter the reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <div className="p-4 rounded-md bg-red-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Rejection Confirmation</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        You are about to reject the KKP application for{" "}
                        <span className="font-medium">{selectedApplication.student.name}</span>.
                      </p>
                      <p className="mt-2">The student will be notified of the rejection and the reason provided.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleRejectApplication} disabled={!rejectionReason.trim()}>
                Reject Application
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Assign Supervisor Dialog */}
      {selectedApplication && (
        <Dialog open={showAssignSupervisorDialog} onOpenChange={setShowAssignSupervisorDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Assign Supervisor
              </DialogTitle>
              <DialogDescription>Assign a supervisor for this KKP application.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="supervisor" className="text-sm font-medium">
                  Select Supervisor:
                </label>
                <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                  <SelectTrigger id="supervisor">
                    <SelectValue placeholder="Select a supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_SUPERVISORS.map((supervisor) => (
                      <SelectItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 rounded-md bg-blue-50">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Supervisor Assignment</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        You are assigning a supervisor for the KKP application of{" "}
                        <span className="font-medium">{selectedApplication.student.name}</span>.
                      </p>
                      <p className="mt-2">
                        The supervisor will be responsible for guiding and evaluating the student during the KKP period.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignSupervisorDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAssignSupervisor} disabled={!selectedSupervisor}>
                Assign Supervisor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

