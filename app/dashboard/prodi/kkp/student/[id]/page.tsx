"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  Building,
  User,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Users,
  FileCheck,
  RotateCcw,
  AlertCircle,
  Home,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Bookmark,
  FileSymlink,
} from "lucide-react"
import { mockStudentKkpRecords } from "@/components/kkp/prodi/mock-data"
import type { KkpStatus, StudentKkpRecord } from "@/components/kkp/prodi/types"

export default function StudentKkpDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [record, setRecord] = useState<StudentKkpRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, you would fetch the record from an API
    // For now, we'll use the mock data
    const fetchRecord = () => {
      setLoading(true)
      setTimeout(() => {
        const foundRecord = mockStudentKkpRecords.find((r) => r.id === id)
        setRecord(foundRecord || null)
        setLoading(false)
      }, 800) // Simulate network delay
    }

    fetchRecord()
  }, [id])

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
            <FileCheck className="h-3.5 w-3.5 mr-1" />
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

  if (loading) {
    return <LoadingSkeleton />
  }

  if (!record) {
    return (
      <div className="container py-6 mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/dashboard/prodi/kkp">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              Back to List
            </Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Record Not Found</CardTitle>
            <CardDescription>
              The KKP record you are looking for could not be found. It may have been deleted or you might have followed
              an invalid link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/prodi/kkp">Return to KKP Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-6 mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/prodi/kkp">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="w-4 h-4" />
            Back to List
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          KKP Record: {record.student.name}
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="text-sm font-normal">
            {record.student.nim}
          </Badge>
          <Badge variant="outline" className="text-sm font-normal">
            {record.student.major}
          </Badge>
          {getStatusBadge(record.status)}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-fit">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Student Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p>{record.student.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">NIM</p>
                    <p>{record.student.nim}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Major</p>
                    <p>{record.student.major}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Semester</p>
                    <p>{record.student.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      <Mail className="inline w-4 h-4 mr-1" />
                      Email
                    </p>
                    <p>{record.student.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      <Phone className="inline w-4 h-4 mr-1" />
                      Phone
                    </p>
                    <p>{record.student.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* KKP Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSymlink className="w-5 h-5 text-primary" />
                  KKP Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(record.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Period</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm">
                        {new Date(record.startDate).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "short",
                        })}{" "}
                        -{" "}
                        {record.endDate
                          ? new Date(record.endDate).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "short",
                            })
                          : "Present"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Title</p>
                  <p className="mt-1">{record.projectTitle || "Not specified"}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Project Description</p>
                  <p className="mt-1 text-sm">{record.projectDescription || "No description provided"}</p>
                </div>
                
                {record.grade && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Grade</p>
                    <p className="mt-1">{record.grade}</p>
                  </div>
                )}
                
                {record.feedback && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Feedback</p>
                    <p className="mt-1 text-sm">{record.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Supervisor Information Card */}
            {record.supervisor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Supervisor Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p>{record.supervisor.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">NIP</p>
                      <p>{record.supervisor.nip}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Department</p>
                      <p>{record.supervisor.department}</p>
                    </div>
                    {record.supervisor.specialization && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Specialization</p>
                        <p>{record.supervisor.specialization}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        <Mail className="inline w-4 h-4 mr-1" />
                        Email
                      </p>
                      <p>{record.supervisor.email}</p>
                    </div>
                    {record.supervisor.phone && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          <Phone className="inline w-4 h-4 mr-1" />
                          Phone
                        </p>
                        <p>{record.supervisor.phone}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Company Mentor Card */}
            {record.companyMentor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Company Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p>{record.companyMentor.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Position</p>
                      <p>{record.companyMentor.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        <Mail className="inline w-4 h-4 mr-1" />
                        Email
                      </p>
                      <p>{record.companyMentor.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        <Phone className="inline w-4 h-4 mr-1" />
                        Phone
                      </p>
                      <p>{record.companyMentor.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        {/* Location Tab */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" />
                Location Information
              </CardTitle>
              <CardDescription>Information about KKP location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        {record.location.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p className="capitalize">{record.location.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {record.location.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">City/Province</p>
                      <p>
                        {record.location.city}, {record.location.province}
                        {record.location.postalCode && ` ${record.location.postalCode}`}
                      </p>
                    </div>
                    {record.location.website && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Website</p>
                        <a
                          href={`https://${record.location.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {record.location.website}
                        </a>
                      </div>
                    )}
                    {record.location.description && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Description</p>
                        <p className="text-sm">{record.location.description}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                      <p>{record.location.contactPerson}</p>
                      {record.location.contactPosition && (
                        <p className="text-sm text-muted-foreground">{record.location.contactPosition}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {record.location.contactEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {record.location.contactPhone}
                      </p>
                    </div>
                  </div>
                  
                  {(record.location.availablePositions?.length > 0 ||
                    record.location.requiredSkills?.length > 0) && (
                    <div className="mt-6">
                      <h3 className="mb-2 text-lg font-semibold">Requirements</h3>
                      {record.location.availablePositions?.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-muted-foreground">Available Positions</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {record.location.availablePositions.map((position, index) => (
                              <Badge key={index} variant="secondary">
                                <Briefcase className="w-3 h-3 mr-1" />
                                {position}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {record.location.requiredSkills?.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Required Skills</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {record.location.requiredSkills.map((skill, index) => (
                              <Badge key={index} variant="outline">
                                <Bookmark className="w-3 h-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team">
          {record.team ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Team Information
                </CardTitle>
                <CardDescription>Details about the student's KKP team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Team Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Team Name</p>
                        <p className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {record.team.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Period</p>
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {new Date(record.team.startDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}{" "}
                          -{" "}
                          {new Date(record.team.endDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <div className="mt-1">{getStatusBadge(record.team.status)}</div>
                      </div>
                      {record.team.projectTitle && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Project Title</p>
                          <p>{record.team.projectTitle}</p>
                        </div>
                      )}
                      {record.team.projectDescription && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Project Description</p>
                          <p className="text-sm">{record.team.projectDescription}</p>
                        </div>
                      )}
                      {record.team.feedback && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Feedback</p>
                          <p className="text-sm">{record.team.feedback}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Team Members</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="mb-2 text-sm font-medium text-muted-foreground">Leader</p>
                          <div className="flex items-center gap-3 p-3 border rounded-md">
                            <div className="p-2 rounded-full bg-primary/10">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{record.team.leader.name}</p>
                              <p className="text-sm text-muted-foreground">{record.team.leader.nim}</p>
                            </div>
                          </div>
                        </div>
                        
                        {record.team.members.length > 0 && (
                          <div>
                            <p className="mb-2 text-sm font-medium text-muted-foreground">Members</p>
                            <div className="space-y-2">
                              {record.team.members.map((member) => (
                                <div key={member.id} className="flex items-center gap-3 p-3 border rounded-md">
                                  <div className="p-2 rounded-full bg-primary/10">
                                    <User className="w-5 h-5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-muted-foreground">{member.nim}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Team Assigned</CardTitle>
                <CardDescription>This student is not part of any KKP team.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The student is either doing an individual KKP or has not been assigned to a team yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                KKP Documents
              </CardTitle>
              <CardDescription>Documents submitted for the KKP</CardDescription>
            </CardHeader>
            <CardContent>
              {record.documents && record.documents.length > 0 ? (
                <div className="space-y-4">
                  {record.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 transition-colors border rounded-md hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{doc.type}</span>
                            <span>•</span>
                            <span>
                              {new Date(doc.uploadDate).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.status === "verified" ? (
                          <Badge className="text-green-500 bg-green-500/10">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Verified
                          </Badge>
                        ) : doc.status === "pending" ? (
                          <Badge className="bg-amber-500/10 text-amber-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            Pending
                          </Badge>
                        ) : (
                          <Badge className="text-red-500 bg-red-500/10">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Rejected
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" asChild>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <Download className="w-4 h-4" />
                            <span className="sr-only">Download</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No Documents</h3>
                  <p className="text-muted-foreground">This student has not uploaded any KKP documents yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container py-6 mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="gap-1" disabled>
          <ChevronLeft className="w-4 h-4" />
          Back to List
        </Button>
      </div>

      <div className="mb-6">
        <Skeleton className="w-64 h-10 mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-32 h-6" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      <div className="mb-4">
        <Skeleton className="h-10 w-96" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="w-full h-64" />
        <Skeleton className="w-full h-64" />
      </div>
    </div>
  )
} 
