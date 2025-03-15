"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Toaster } from "@/components/ui/toaster"
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
  FileCheck,
  ArrowLeft,
  User,
  Building,
  Calendar,
  RotateCcw,
  BookOpen,
  GraduationCap,
  ExternalLink,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
} from "lucide-react"
import { getKkpApplicationById, updateKkpApplicationStatus, verifyDocument } from "@/app/actions/kkp-management"
import type { KkpApplication, KkpStatus } from "@/types/kkp"

export default function KkpApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [application, setApplication] = useState<KkpApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [documentVerificationStatus, setDocumentVerificationStatus] = useState<"pending" | "verified" | "rejected">(
    "pending",
  )
  const [documentNotes, setDocumentNotes] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    student: true,
    company: true,
    documents: true,
    requirements: true,
  })

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Fetch application details
  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        if (params.id) {
          const data = await getKkpApplicationById(params.id as string)
          setApplication(data)
        }
      } catch (error) {
        console.error("Error fetching application details:", error)
        toast({
          title: "Error",
          description: "Failed to fetch application details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplicationDetails()
  }, [params.id, toast])

  // Handle verifying a document
  const handleVerifyDocument = async () => {
    if (!application || !selectedDocument) return

    try {
      const result = await verifyDocument(
        application.id,
        selectedDocument.id,
        documentVerificationStatus,
        documentNotes,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the application in state
        const updatedApplication = await getKkpApplicationById(application.id)
        if (updatedApplication) {
          setApplication(updatedApplication)
        }

        setShowDocumentDialog(false)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error verifying document:", error)
      toast({
        title: "Error",
        description: "Failed to verify document",
        variant: "destructive",
      })
    }
  }

  // Handle updating application status
  const handleUpdateStatus = async (status: KkpStatus) => {
    if (!application) return

    if (status === "rejected" && !rejectionReason) {
      setShowRejectionDialog(true)
      return
    }

    setIsProcessing(true)
    try {
      const result = await updateKkpApplicationStatus(
        application.id,
        status,
        "staff-001", // Mock user ID
        "Admin Prodi", // Mock user name
        status === "rejected" ? rejectionReason : undefined,
      )

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })

        // Update the application in state
        if (result.application) {
          setApplication(result.application)
        }

        // Close dialogs
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
      console.error("Error updating application status:", error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Handle rejection confirmation
  const handleRejectConfirm = () => {
    if (application) {
      handleUpdateStatus("rejected")
    }
  }

  // Handle viewing document details
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setDocumentVerificationStatus(document.status)
    setDocumentNotes(document.notes || "")
    setShowDocumentDialog(true)
  }

  // Get status badge
  const getStatusBadge = (status: KkpStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="font-medium bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="font-medium text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="font-medium text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="font-medium text-blue-500 border-blue-200 bg-blue-500/10">
            <AlertCircle className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="font-medium text-purple-500 border-purple-200 bg-purple-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get document status badge
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Verified
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <RotateCcw className="w-10 h-10 mb-4 text-primary animate-spin" />
        <p className="text-muted-foreground">Loading application details...</p>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
        <p className="mb-2 text-lg font-medium">Application Not Found</p>
        <p className="mb-6 text-muted-foreground">The requested application doesn't exist or has been removed</p>
        <Button onClick={() => router.push("/dashboard/staff_tu/kkp")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to KKP Management
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950 rounded-xl">
      {/* Header with back button */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/staff_tu/kkp")}
          className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              Kuliah Kerja Praktik (KKP) Detail
            </span>
          </h2>
          <p className="text-muted-foreground">Detail Kuliah Kerja Praktik (KKP)</p>
        </div>
      </div>

      {/* Application Title Card */}
      <Card className="pb-5 overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
          <div className="space-y-1">
            <CardTitle className="flex items-center text-2xl font-bold">{application.title}</CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="text-blue-600 border-blue-200 bg-blue-500/10 dark:text-blue-400 dark:border-blue-800"
              >
                {application.applicationNumber}
              </Badge>
              {getStatusBadge(application.status)}
              <span className="text-muted-foreground">
                Submitted on{" "}
                {new Date(application.submissionDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {application.status === "pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => setShowRejectionDialog(true)}
                  disabled={isProcessing}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleUpdateStatus("approved")}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
            {application.status === "approved" && (
              <Button
                variant="outline"
                className="text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Letter
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Main content area with flowing sections */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column - Student and Company */}
        <div className="space-y-6 md:col-span-1">
          {/* Student Info Section */}
          <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("student")}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-blue-600 dark:text-blue-400">
                  <User className="w-5 h-5" />
                  Student Information
                </CardTitle>
                {expandedSections.student ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.student && (
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 border-2 border-blue-100 dark:border-blue-800">
                    <AvatarFallback className="text-lg text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
                      {getInitials(application.student.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{application.student.name}</h3>
                    <p className="font-medium text-blue-600 text-md dark:text-blue-400">{application.student.nim}</p>
                    <p className="text-sm text-muted-foreground">{application.student.major}</p>
                  </div>
                </div>

                <Separator className="my-3 bg-blue-100 dark:bg-blue-800" />

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-sm">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium text-right truncate">{application.student.email}</span>
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium text-right">{application.student.phone}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Academic Information</h4>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-sm">
                      <span className="text-muted-foreground">Program:</span>
                      <span className="font-medium text-right">{application.student.major}</span>
                      <span className="text-muted-foreground">Semester:</span>
                      <span className="font-medium text-right">{application.student.semester}</span>
                    </div>
                  </div>

                  {application.student.address && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                      <p className="p-2 mt-1 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/30">
                        {application.student.address}
                      </p>
                    </div>
                  )}
                </div>

                {/* Group members section */}
                {application.groupMembers && application.groupMembers.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Group Members</h4>
                    <div className="space-y-2">
                      {application.groupMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-2 p-2 text-sm rounded-lg bg-blue-50 dark:bg-blue-900/30"
                        >
                          <Avatar className="w-8 h-8 border border-blue-100 dark:border-blue-800">
                            <AvatarFallback className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.nim}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Company Info Section */}
          <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("company")}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  <Building className="w-5 h-5" />
                  Company Information
                </CardTitle>
                {expandedSections.company ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.company && (
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-16 h-16 border-2 border-indigo-100 rounded-full bg-indigo-50 dark:bg-indigo-900/30 dark:border-indigo-800">
                    {application.company.logo ? (
                      <img
                        src={application.company.logo || "/placeholder.svg"}
                        alt={application.company.name}
                        className="object-cover w-12 h-12 rounded-full"
                      />
                    ) : (
                      <Building className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{application.company.name}</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">{application.company.industry}</p>
                  </div>
                </div>

                <Separator className="my-3 bg-indigo-100 dark:bg-indigo-800" />

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-sm">
                      <span className="text-muted-foreground">Contact Person:</span>
                      <span className="font-medium text-right">{application.company.contactPerson}</span>
                      <span className="text-muted-foreground">Contact Phone:</span>
                      <span className="font-medium text-right">{application.company.contactPhone}</span>
                      {application.company.website && (
                        <>
                          <span className="text-muted-foreground">Website:</span>
                          <span className="font-medium text-right">
                            <a
                              href={
                                application.company.website.startsWith("http")
                                  ? application.company.website
                                  : `http://${application.company.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-end gap-1 text-indigo-600 hover:underline dark:text-indigo-400"
                            >
                              Visit
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Address</h4>
                    <p className="p-2 mt-1 text-sm rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                      {application.company.address}
                      <br />
                      {application.company.city}
                    </p>
                  </div>

                  {application.company.description && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Company Description</h4>
                      <p className="p-2 mt-1 text-sm rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                        {application.company.description}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Supervisor section */}
          {application.supervisor && (
            <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-purple-600 dark:text-purple-400">
                  <GraduationCap className="w-5 h-5" />
                  Supervisor Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12 border border-purple-100 dark:border-purple-800">
                    <AvatarFallback className="text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-300">
                      {getInitials(application.supervisor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{application.supervisor.name}</p>
                    <p className="text-xs text-muted-foreground">{application.supervisor.nip}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1 text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium text-right">{application.supervisor.department}</span>

                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium text-right truncate">{application.supervisor.email}</span>

                  {application.supervisor.specialization && (
                    <>
                      <span className="text-muted-foreground">Specialization:</span>
                      <span className="font-medium text-right">{application.supervisor.specialization}</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right column - Application Details and Documents */}
        <div className="space-y-6 md:col-span-2">
          {/* Application Details Section */}
          <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("details")}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-teal-600 dark:text-teal-400">
                  <BookOpen className="w-5 h-5" />
                  Application Details
                </CardTitle>
                {expandedSections.details ? (
                  <ChevronUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.details && (
              <CardContent className="pt-0">
                <div className="p-3 mb-4 rounded-lg bg-teal-50 dark:bg-teal-900/30">
                  <h3 className="mb-1 text-sm font-medium text-teal-700 dark:text-teal-300">Description</h3>
                  <p className="text-sm">{application.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/30">
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground">Start Date</h3>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      {new Date(application.startDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/30">
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground">End Date</h3>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      {new Date(application.endDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-900/30">
                    <h3 className="mb-1 text-xs font-medium text-muted-foreground">Duration</h3>
                    <p className="text-sm font-medium">
                      {Math.ceil(
                        (new Date(application.endDate).getTime() - new Date(application.startDate).getTime()) /
                        (1000 * 60 * 60 * 24),
                      )}{" "}
                      days
                    </p>
                  </div>
                </div>

                {/* History section */}
                {((application.approvedBy && application.approvedDate) ||
                  (application.rejectedBy && application.rejectedDate)) && (
                    <div className="mt-4 space-y-3">
                      <h3 className="text-sm font-medium text-teal-700 dark:text-teal-300">Application History</h3>

                      {application.approvedBy && application.approvedDate && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full dark:bg-green-800">
                            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-300" />
                          </div>
                          <div>
                            <p className="font-medium">Approved by {application.approvedBy}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(application.approvedDate).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {application.rejectedBy && application.rejectedDate && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                          <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full dark:bg-red-800">
                            <XCircle className="w-5 h-5 text-red-600 dark:text-red-300" />
                          </div>
                          <div>
                            <p className="font-medium">Rejected by {application.rejectedBy}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(application.rejectedDate).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      )}

                      {application.rejectionReason && (
                        <div className="p-3 text-sm text-red-700 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300">
                          <p className="mb-1 font-medium">Rejection Reason:</p>
                          <p>{application.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  )}
              </CardContent>
            )}
          </Card>

          {/* Requirements Tracking Section */}
          <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("requirements")}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-purple-600 dark:text-purple-400">
                  <CheckSquare className="w-5 h-5" />
                  Requirements
                  <Badge
                    variant="outline"
                    className="ml-2 text-purple-600 border-purple-200 bg-purple-500/10 dark:text-purple-400 dark:border-purple-800"
                  >
                    {application?.requirements
                      ? `${application?.requirements.filter((req) => req.completed).length}/${application.requirements.length}`
                      : "0/0"}
                  </Badge>
                </CardTitle>
                {expandedSections.requirements ? (
                  <ChevronUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.requirements && (
              <CardContent className="pt-0">
                {application.requirements && application.requirements.length > 0 ? (
                  <div className="space-y-3">
                    {application.requirements.map((requirement, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg transition-colors ${requirement.completed
                            ? "bg-purple-50 border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800"
                            : "bg-gray-50 border border-gray-200 dark:bg-gray-800/30 dark:border-gray-700"
                          }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {requirement.completed ? (
                              <CheckSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4
                              className={`text-sm font-medium ${requirement.completed
                                  ? "text-purple-700 dark:text-purple-300"
                                  : "text-gray-700 dark:text-gray-300"
                                }`}
                            >
                              {requirement.title}
                            </h4>
                            {requirement.description && (
                              <p className="mt-1 text-xs text-muted-foreground">{requirement.description}</p>
                            )}
                            {requirement.dueDate && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                Due:{" "}
                                {new Date(requirement.dueDate).toLocaleDateString("en-US", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </div>
                            )}
                          </div>
                          {requirement.detailsUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs text-purple-600 h-7 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/30"
                              asChild
                            >
                              <a href={requirement.detailsUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-3 h-3 mr-1" />
                                Details
                              </a>
                            </Button>
                          )}
                        </div>
                        {requirement.feedback && (
                          <div className="p-2 mt-2 ml-8 text-xs rounded-md bg-purple-100/50 dark:bg-purple-900/30">
                            <span className="font-medium">Feedback:</span> {requirement.feedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center rounded-lg bg-gray-50 dark:bg-gray-800/30">
                    <AlertCircle className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">No requirements found</p>
                  </div>
                )}

                {/* Progress summary */}
                {application.requirements && application.requirements.length > 0 && (
                  <div className="p-3 mt-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <h4 className="mb-2 text-sm font-medium text-purple-700 dark:text-purple-300">
                      Completion Progress
                    </h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full dark:bg-purple-400"
                        style={{
                          width: `${(application.requirements.filter((req) => req.completed).length / application.requirements.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-center text-muted-foreground">
                      {application.requirements.filter((req) => req.completed).length} of{" "}
                      {application.requirements.length} requirements completed
                    </p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Documents Section */}
          <Card className="overflow-hidden border-none shadow-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader className="pb-2 cursor-pointer" onClick={() => toggleSection("documents")}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-medium text-amber-600 dark:text-amber-400">
                  <FileText className="w-5 h-5" />
                  Documents
                  <Badge
                    variant="outline"
                    className="ml-2 bg-amber-500/10 text-amber-600 border-amber-200 dark:text-amber-400 dark:border-amber-800"
                  >
                    {application.documents.length}
                  </Badge>
                </CardTitle>
                {expandedSections.documents ? (
                  <ChevronUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                )}
              </div>
            </CardHeader>
            {expandedSections.documents && (
              <CardContent className="pt-0">
                {application.documents.length > 0 ? (
                  <div className="grid gap-3">
                    {application.documents.map((document) => (
                      <div
                        key={document.id}
                        className="p-3 transition-colors border rounded-lg hover:bg-amber-100/50 dark:border-amber-800 dark:bg-amber-900/20 dark:hover:bg-amber-900/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-md bg-amber-100 dark:bg-amber-800">
                              <FileText className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                            </div>
                            <span className="text-sm font-medium">{document.name}</span>
                          </div>
                          {getDocumentStatusBadge(document.status)}
                        </div>

                        <div className="mb-2 text-xs text-muted-foreground">
                          Uploaded on{" "}
                          {new Date(document.uploadDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </div>

                        {document.notes && (
                          <div className="p-2 mb-2 text-xs rounded-md bg-amber-100/50 dark:bg-amber-800/30">
                            <span className="font-medium">Notes:</span> {document.notes}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDocument(document)}
                            className="h-8 text-xs border-amber-200 bg-amber-100/50 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-800/30 dark:hover:bg-amber-800/50"
                          >
                            <FileCheck className="w-3.5 h-3.5 mr-1" />
                            Verify
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 text-xs border-amber-200 bg-amber-100/50 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-800/30 dark:hover:bg-amber-800/50"
                          >
                            <a href={document.url} target="_blank" rel="noopener noreferrer">
                              <Eye className="w-3.5 h-3.5 mr-1" />
                              View
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-8 text-xs border-amber-200 bg-amber-100/50 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-800/30 dark:hover:bg-amber-800/50"
                          >
                            <a href={document.url} target="_blank" rel="noopener noreferrer" download>
                              <Download className="w-3.5 h-3.5 mr-1" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <AlertCircle className="w-8 h-8 mb-2 text-amber-500 dark:text-amber-400" />
                    <p className="text-muted-foreground">No documents found</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* Document Verification Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <FileCheck className="w-5 h-5" />
                Verify Document
              </DialogTitle>
              <DialogDescription>{selectedDocument.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Status:</span>
                {getDocumentStatusBadge(selectedDocument.status)}
              </div>
              <div className="space-y-2">
                <label htmlFor="document-status" className="text-sm font-medium">
                  Update Status:
                </label>
                <select
                  id="document-status"
                  className="w-full p-2 border border-blue-100 rounded-md bg-blue-50 dark:bg-blue-900/30 dark:border-blue-800"
                  value={documentVerificationStatus}
                  onChange={(e) => setDocumentVerificationStatus(e.target.value as "pending" | "verified" | "rejected")}
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="document-notes" className="text-sm font-medium">
                  Notes:
                </label>
                <Textarea
                  id="document-notes"
                  placeholder="Add notes about this document..."
                  value={documentNotes}
                  onChange={(e) => setDocumentNotes(e.target.value)}
                  className="min-h-[100px] bg-blue-50 border-blue-100 dark:bg-blue-900/30 dark:border-blue-800"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  asChild
                  className="w-full text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                  <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    View Document
                  </a>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleVerifyDocument} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Reason Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent className="max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <XCircle className="w-5 h-5" />
              Reject KKP Application
            </DialogTitle>
            <DialogDescription>
              {application.student.name} - {application.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="rejection-reason" className="text-sm font-medium">
                Rejection Reason:
              </label>
              <Textarea
                id="rejection-reason"
                placeholder="Provide a reason why this application is being rejected..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[120px] bg-red-50 border-red-100 dark:bg-red-900/30 dark:border-red-800"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectConfirm}
              disabled={!rejectionReason.trim() || isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Application
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast component for notifications */}
      <Toaster />
    </div>
  )
}

