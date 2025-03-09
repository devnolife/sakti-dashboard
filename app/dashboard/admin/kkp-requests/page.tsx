"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckCircle2,
  FileText,
  Search,
  Filter,
  AlertCircle,
  Clock,
  Download,
  FileCheck,
  XCircle,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRole } from "@/context/role-context"
import { useRouter } from "next/navigation"

// Mock data for student KKP requests
const studentRequests = [
  {
    id: "REQ-2023-001",
    student: {
      id: "12345678",
      name: "Andi Saputra",
      avatar: "/placeholder.svg?height=40&width=40",
      program: "Informatika",
      semester: 7,
    },
    location: {
      name: "PT Teknologi Maju",
      address: "Jakarta Selatan",
      type: "Teknologi Informasi",
    },
    group: {
      id: "GRP-2023-001",
      members: [
        { id: "12345678", name: "Andi Saputra", role: "Ketua" },
        { id: "23456789", name: "Rina Dewi", role: "Anggota" },
        { id: "34567890", name: "Farhan Nugraha", role: "Anggota" },
      ],
    },
    submissionDate: "2023-09-10",
    status: "pending",
    documents: {
      proposal: true,
      parentalConsent: true,
      transcript: true,
      applicationLetter: false,
    },
    letterGenerated: false,
  },
  {
    id: "REQ-2023-002",
    student: {
      id: "23456789",
      name: "Rina Dewi",
      avatar: "/placeholder.svg?height=40&width=40",
      program: "Informatika",
      semester: 7,
    },
    location: {
      name: "PT Teknologi Maju",
      address: "Jakarta Selatan",
      type: "Teknologi Informasi",
    },
    group: {
      id: "GRP-2023-001",
      members: [
        { id: "12345678", name: "Andi Saputra", role: "Ketua" },
        { id: "23456789", name: "Rina Dewi", role: "Anggota" },
        { id: "34567890", name: "Farhan Nugraha", role: "Anggota" },
      ],
    },
    submissionDate: "2023-09-10",
    status: "pending",
    documents: {
      proposal: true,
      parentalConsent: true,
      transcript: true,
      applicationLetter: false,
    },
    letterGenerated: false,
  },
  // More mock data...
]

export default function KKPRequestsPage() {
  const [requests, setRequests] = useState(studentRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const { role } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (role !== "admin" && role !== "department_head") {
      router.push("/dashboard")
    }
  }, [role, router])

  if (role !== "admin" && role !== "department_head") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we check your permissions.</p>
        </div>
      </div>
    )
  }

  // Filter requests based on search term and status filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && request.status === "pending") ||
      (activeTab === "approved" && request.status === "approved") ||
      (activeTab === "rejected" && request.status === "rejected") ||
      (activeTab === "in-review" && request.status === "in-review")

    return matchesSearch && matchesStatus && matchesTab
  })

  // Generate letter function
  const handleGenerateLetter = (requestId) => {
    // Simulate letter generation
    setRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === requestId ? { ...request, letterGenerated: true } : request)),
    )

    // Show success toast
    toast({
      title: "Letter Generated Successfully",
      description: `Approval letter for request ${requestId} has been generated.`,
      duration: 5000,
    })
  }

  // Approve request function
  const handleApproveRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: "approved", documents: { ...request.documents, applicationLetter: true } }
          : request,
      ),
    )

    toast({
      title: "Request Approved",
      description: `Request ${requestId} has been approved.`,
      duration: 5000,
    })
  }

  // Reject request function
  const handleRejectRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: "rejected", rejectionReason: "Dokumen tidak lengkap" }
          : request,
      ),
    )

    toast({
      title: "Request Rejected",
      description: `Request ${requestId} has been rejected.`,
      duration: 5000,
    })
  }

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "in-review":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            In Review
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
            KKP Request Management
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Manage student KKP requests, review documents, and generate approval letters
        </p>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Student KKP Requests</span>
          </CardTitle>
          <CardDescription>Review and process student KKP requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or ID..."
                className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-review">In Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-review">In Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Student</TableHead>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Group</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <AlertCircle className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">No requests found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={request.student.avatar} alt={request.student.name} />
                                <AvatarFallback>
                                  {request.student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{request.student.name}</p>
                                <p className="text-xs text-muted-foreground">NIM: {request.student.id}</p>
                                <p className="text-xs text-muted-foreground">{request.student.program}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.location.name}</p>
                              <p className="text-xs text-muted-foreground">{request.location.address}</p>
                              <p className="text-xs text-muted-foreground">{request.location.type}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <div className="flex -space-x-2">
                                {request.group.members.slice(0, 3).map((member, index) => (
                                  <div
                                    key={member.id}
                                    className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs ring-2 ring-background"
                                    title={`${member.name} (${member.role})`}
                                  >
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                ))}
                                {request.group.members.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs ring-2 ring-background">
                                    +{request.group.members.length - 3}
                                  </div>
                                )}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                    <ChevronDown className="h-3 w-3" />
                                    <span className="sr-only">View group members</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuLabel>Group Members</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {request.group.members.map((member) => (
                                    <DropdownMenuItem key={member.id}>
                                      <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                                          {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </div>
                                        <div>
                                          <p className="text-xs font-medium">{member.name}</p>
                                          <p className="text-xs text-muted-foreground">{member.role}</p>
                                        </div>
                                      </div>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                          <TableCell>{request.submissionDate}</TableCell>
                          <TableCell>
                            {getStatusBadge(request.status)}
                            {request.status === "rejected" && (
                              <div className="mt-1 text-xs text-red-500">{request.rejectionReason}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.proposal ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Proposal</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.parentalConsent ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Parental Consent</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.transcript ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Transcript</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.applicationLetter ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Application Letter</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {request.status === "pending" && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleApproveRequest(request.id)}>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRejectRequest(request.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {request.status === "approved" && !request.letterGenerated && (
                                <Button variant="default" size="sm" onClick={() => handleGenerateLetter(request.id)}>
                                  <FileCheck className="h-4 w-4 mr-1" />
                                  Generate Letter
                                </Button>
                              )}
                              {request.status === "approved" && request.letterGenerated && (
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download Letter
                                </Button>
                              )}
                              {request.status === "in-review" && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleApproveRequest(request.id)}>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRejectRequest(request.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {request.status === "rejected" && (
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}

