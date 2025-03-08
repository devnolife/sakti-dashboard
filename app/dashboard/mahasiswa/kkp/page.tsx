"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  FileText,
  PlayCircle,
  Plus,
  XCircle,
  MapPin,
  CalendarDays,
  FileCheck,
  Info,
  Users,
  Calendar,
  Award,
  Briefcase,
  ClipboardList,
  PresentationIcon,
  Star,
  BookOpen,
  Building,
  UserCheck,
  FileSpreadsheet,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import type { KkpApplication } from "@/types/kkp"
import { getAllKkpApplications } from "@/app/actions/kkp-management"
import Link from "next/link"

export default function StudentKkpDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // In a real app, this would only fetch applications for the current student
        const data = await getAllKkpApplications()

        // Filter to only show applications for the current student (mock)
        // In a real app, the API would handle this filtering
        const studentApplications = data.filter((app) => app.student.nim === "1234567890")

        setApplications(studentApplications)
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

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              KKP Dashboard
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your Kuliah Kerja Praktik (Field Work Practice) applications and progress
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/mahasiswa/kkp/requirements")}>
            <FileCheck className="h-4 w-4 mr-2" />
            View Requirements
          </Button>
          <Button onClick={() => router.push("/dashboard/mahasiswa/kkp/apply")}>
            <Plus className="h-4 w-4 mr-2" />
            Apply for KKP
          </Button>
        </div>
      </div>

      {/* Current Application Status - Enhanced Modern UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Current Application</h2>
                <p className="text-sm text-muted-foreground">Your active KKP application status and progress</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div className="bg-primary/5 rounded-xl p-4 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">Application ID</span>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm font-medium">KKP-2023-0042</div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-primary/10 transition-colors">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">Location</span>
                    </div>
                    <div className="bg-white px-3 py-1 rounded-full shadow-sm text-sm font-medium">
                      PT Teknologi Maju Indonesia
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-primary/10 transition-colors">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">Group Members</span>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                        AS
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                        BW
                      </div>
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                        RD
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full shadow-sm group-hover:bg-primary/10 transition-colors">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">Status</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200 px-3 py-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Pending Approval
                    </Badge>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/dashboard/mahasiswa/kkp/application">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg transition-all">
                      View Application Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-muted-foreground">APPLICATION PROGRESS</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    2 of 4 Steps
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shadow-sm border border-green-200 z-10">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-500 to-green-300 h-full"></div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 shadow-sm w-full">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Application Submitted</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-green-700">
                          <Calendar className="h-3 w-3 mr-1" />
                          <p>Oct 15, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shadow-sm border border-green-200 z-10">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-300 to-yellow-300 h-full"></div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 shadow-sm w-full">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Document Verification</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Completed
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-green-700">
                          <Calendar className="h-3 w-3 mr-1" />
                          <p>Oct 18, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 shadow-sm border border-yellow-200 z-10 animate-pulse">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-yellow-300 to-gray-200 h-full"></div>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3 shadow-sm w-full">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Supervisor Assignment</p>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            In Progress
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-yellow-700">
                          <Clock className="h-3 w-3 mr-1" />
                          <p>Estimated: Oct 25, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400 shadow-sm border border-gray-200 z-10">
                          <Clock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 shadow-sm w-full">
                        <div className="flex justify-between items-center">
                          <p className="font-medium text-gray-500">Final Approval</p>
                          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                            Pending
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <p>Estimated: Oct 31, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-lg">
          <div className="bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <CalendarDays className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Next Deadline</h2>
                <p className="text-sm text-muted-foreground">Your upcoming important deadline</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4 animate-pulse">
                <Calendar className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">Supervisor Meeting</h3>
              <p className="text-sm text-muted-foreground mt-1">Schedule your first meeting with your supervisor</p>
              <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full mt-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Due in 2 days (Oct 25, 2023)
              </div>
              <Button className="mt-4 w-full bg-white border border-red-200 text-red-700 hover:bg-red-50 shadow-sm">
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KKP Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>KKP Progress Overview</CardTitle>
          <CardDescription>Track your overall progress in the KKP program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Requirements Completion</span>
                <span className="text-sm font-medium">70%</span>
              </div>
              <Progress value={70} className="h-2" />
              <p className="text-xs text-muted-foreground">7 of 10 requirements completed</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Application Status</span>
                <span className="text-sm font-medium">50%</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-muted-foreground">Waiting for supervisor assignment</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Implementation</span>
                <span className="text-sm font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-muted-foreground">Not started yet</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
              <p className="text-xs text-muted-foreground">KKP in early stages</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Timeline Section - Modernized UI */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">KKP Process Timeline</h2>
              <p className="text-sm text-muted-foreground">Track your journey through the KKP program</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="relative">
            {/* Modern timeline with animation effects */}
            <div className="space-y-0">
              {/* Step 1 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 shadow-sm border border-green-200 z-10 group-hover:scale-110 transition-transform">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div className="w-px h-full bg-gradient-to-b from-green-500 to-green-300 mt-2"></div>
                </div>
                <div className="pt-1 pb-8 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Registration & Group Formation</h3>
                    <Badge className="ml-3 bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                      Completed
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Complete individual registration, form groups of 2-4 students, and submit group registration form.
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    <span>Completed on October 10, 2023</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 shadow-sm border border-green-200 z-10 group-hover:scale-110 transition-transform">
                    <Building className="h-5 w-5" />
                  </div>
                  <div className="w-px h-full bg-gradient-to-b from-green-300 to-yellow-300 mt-2"></div>
                </div>
                <div className="pt-1 pb-8 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Location Selection & Approval</h3>
                    <Badge className="ml-3 bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                      Completed
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Select from approved locations or propose a new location, submit required documentation for
                    approval.
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    <span>Completed on October 15, 2023</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 shadow-sm border border-yellow-200 z-10 group-hover:scale-110 transition-transform animate-pulse">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div className="w-px h-full bg-gradient-to-b from-yellow-300 to-gray-300 mt-2"></div>
                </div>
                <div className="pt-1 pb-8 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Supervisor Assignment</h3>
                    <Badge className="ml-3 bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-200">
                      In Progress
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Faculty supervisors are assigned to each group, initial consultation meeting is scheduled.
                  </p>
                  <div className="flex items-center text-xs text-yellow-600">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Expected completion by October 25, 2023</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 shadow-sm border border-gray-200 z-10 group-hover:scale-110 transition-transform">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="w-px h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="pt-1 pb-8 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">KKP Implementation</h3>
                    <Badge className="ml-3 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
                      Not Started
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Complete required hours at approved location, participate in regular supervision meetings, submit
                    progress reports.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Scheduled for November 1, 2023 - January 31, 2024</span>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 shadow-sm border border-gray-200 z-10 group-hover:scale-110 transition-transform">
                    <FileSpreadsheet className="h-5 w-5" />
                  </div>
                  <div className="w-px h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="pt-1 pb-8 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Final Report Submission</h3>
                    <Badge className="ml-3 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
                      Not Started
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Prepare and submit comprehensive final report documenting KKP activities, learning outcomes, and
                    achievements.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Due by February 7, 2024</span>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 shadow-sm border border-gray-200 z-10 group-hover:scale-110 transition-transform">
                    <PresentationIcon className="h-5 w-5" />
                  </div>
                  <div className="w-px h-full bg-gray-200 mt-2"></div>
                </div>
                <div className="pt-1 pb-8 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Final Presentation</h3>
                    <Badge className="ml-3 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
                      Not Started
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Present KKP experience and outcomes to faculty panel, respond to questions about learning and
                    application.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Scheduled for February 10-15, 2024</span>
                  </div>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-500 shadow-sm border border-gray-200 z-10 group-hover:scale-110 transition-transform">
                    <Star className="h-5 w-5" />
                  </div>
                </div>
                <div className="pt-1 group-hover:translate-x-1 transition-transform">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Evaluation & Grading</h3>
                    <Badge className="ml-3 bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
                      Not Started
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Final evaluation by faculty supervisor and industry mentor, grade assignment and feedback provision.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Expected by February 28, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KKP Information Section - Modernized UI */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Info className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">KKP Information</h2>
              <p className="text-sm text-muted-foreground">Essential information about the KKP program</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">What is KKP?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kuliah Kerja Profesi (KKP) is a professional work-study program designed to provide students with
                  real-world experience in their field of study. It combines academic learning with practical
                  application in a professional environment, allowing students to develop industry-relevant skills and
                  build professional networks.
                </p>
              </div>

              <div className="bg-secondary/5 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">Group Composition</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each KKP group should consist of 2 to 4 members. This size allows for effective collaboration while
                  ensuring each member has significant responsibilities and learning opportunities. Groups with fewer
                  than 2 or more than 4 members require special approval from the KKP coordinator.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-white p-2 rounded-full shadow-sm">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Implementation Schedule</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">1</span>
                      </div>
                      <h4 className="font-medium">Semester Ganjil (Odd Semester)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KKP can be undertaken during the Odd Semester starting from Semester 7. The implementation period
                      typically runs from August to January. Registration for Odd Semester KKP opens in May and closes
                      in July.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="font-semibold text-secondary">2</span>
                      </div>
                      <h4 className="font-medium">Semester Genap (Even Semester)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KKP can be undertaken during the Even Semester starting from Semester 8. The implementation period
                      typically runs from February to July. Registration for Even Semester KKP opens in November and
                      closes in January.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <Button variant="outline" className="bg-white shadow-sm hover:shadow-md transition-shadow" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/plus">
                      <Award className="h-4 w-4 mr-2" />
                      KKP Plus Program
                      <ExternalLink className="h-3 w-3 ml-2 opacity-70" />
                    </Link>
                  </Button>

                  <Button variant="outline" className="bg-white shadow-sm hover:shadow-md transition-shadow" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/faq">
                      <Info className="h-4 w-4 mr-2" />
                      KKP FAQ
                      <ExternalLink className="h-3 w-3 ml-2 opacity-70" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application History */}
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
          <CardDescription>Your previous KKP applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>ID</div>
              <div>Location</div>
              <div>Period</div>
              <div>Status</div>
              <div>Action</div>
            </div>
            <div className="divide-y">
              <div className="grid grid-cols-5 p-4 items-center">
                <div className="text-sm">KKP-2022-0018</div>
                <div className="text-sm">PT Solusi Digital</div>
                <div className="text-sm">Jul - Dec 2022</div>
                <div>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Rejected
                  </Badge>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

