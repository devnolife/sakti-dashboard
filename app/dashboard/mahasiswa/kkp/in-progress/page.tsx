"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  Clock,
  FileText,
  Calendar,
  Users,
  Building,
  MessageSquare,
  FileCheck,
  Upload,
  BookOpen,
  ClipboardList,
  ArrowRight,
} from "lucide-react"

export default function InKkpPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              In Progress KKP
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage and track your ongoing Kuliah Kerja Praktik activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileCheck className="h-4 w-4 mr-2" />
            Submit Weekly Report
          </Button>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Documentation
          </Button>
        </div>
      </div>

      {/* KKP Status Overview */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white p-2 rounded-full shadow-sm">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">KKP Status</h2>
              <p className="text-sm text-muted-foreground">Your current KKP implementation status</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Location</h3>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Active</Badge>
                </div>
                <p className="font-medium text-lg">PT Teknologi Maju Indonesia</p>
                <p className="text-sm text-muted-foreground mt-1">Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Implementation Period</h3>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Start Date</p>
                    <p className="text-sm">November 1, 2023</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">End Date</p>
                    <p className="text-sm">January 31, 2024</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Group Members</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe (You)</p>
                        <p className="text-xs text-muted-foreground">1234567890</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">Leader</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alice Smith</p>
                      <p className="text-xs text-muted-foreground">2345678901</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium border-2 border-white">
                      RD
                    </div>
                    <div>
                      <p className="text-sm font-medium">Robert Davis</p>
                      <p className="text-xs text-muted-foreground">3456789012</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Implementation Progress</h3>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Week 6 of 12</Badge>
                </div>

                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-sm">Weekly Reports</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Submitted</span>
                      <span className="text-sm font-medium">5 of 12</span>
                    </div>
                    <Progress value={41.6} className="h-1.5 mt-1" />
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-sm">Supervision Meetings</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Completed</span>
                      <span className="text-sm font-medium">3 of 6</span>
                    </div>
                    <Progress value={50} className="h-1.5 mt-1" />
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardList className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-sm">Tasks Completion</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Completed</span>
                      <span className="text-sm font-medium">12 of 25</span>
                    </div>
                    <Progress value={48} className="h-1.5 mt-1" />
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-sm">Final Report</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Completed</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-1.5 mt-1" />
                  </div>
                </div>

                <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-medium mb-2">Upcoming Deadlines</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1 border-b">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Weekly Report #6</span>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Due in 2 days
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">Supervisor Meeting</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Due in 5 days
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Mid-term Evaluation</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Due in 10 days
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Weekly Reports</TabsTrigger>
          <TabsTrigger value="supervision">Supervision</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Details about your KKP project and implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Title</h3>
                  <p className="text-muted-foreground">
                    Development of Inventory Management System for PT Teknologi Maju Indonesia
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Project Description</h3>
                  <p className="text-muted-foreground">
                    This project aims to develop a comprehensive inventory management system that will help PT Teknologi
                    Maju Indonesia streamline their inventory tracking, ordering, and reporting processes. The system
                    will include features such as real-time inventory tracking, automated reorder notifications,
                    supplier management, and comprehensive reporting capabilities.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Project Objectives</h3>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Develop a user-friendly interface for inventory management</li>
                    <li>Implement real-time tracking of inventory levels</li>
                    <li>Create automated notifications for low stock items</li>
                    <li>Design comprehensive reporting features for inventory analysis</li>
                    <li>Integrate with existing company systems</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Supervisors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Faculty Supervisor</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                          DR
                        </div>
                        <div>
                          <p className="font-medium">Dr. Rudi Hartono, M.Kom.</p>
                          <p className="text-sm text-muted-foreground">Computer Science Department</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium">Industry Supervisor</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-medium">
                          BS
                        </div>
                        <div>
                          <p className="font-medium">Budi Santoso, S.T.</p>
                          <p className="text-sm text-muted-foreground">IT Manager</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your recent KKP-related activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: <FileText className="h-4 w-4 text-blue-500" />,
                    title: "Weekly Report #5 Submitted",
                    description: "You submitted your weekly progress report",
                    date: "2 days ago",
                    status: "Submitted",
                  },
                  {
                    icon: <MessageSquare className="h-4 w-4 text-green-500" />,
                    title: "Supervision Meeting Completed",
                    description: "Meeting with Dr. Rudi Hartono to discuss project progress",
                    date: "5 days ago",
                    status: "Completed",
                  },
                  {
                    icon: <Upload className="h-4 w-4 text-purple-500" />,
                    title: "Documentation Uploaded",
                    description: "You uploaded 5 new photos of your project implementation",
                    date: "1 week ago",
                    status: "Uploaded",
                  },
                  {
                    icon: <ClipboardList className="h-4 w-4 text-amber-500" />,
                    title: "Task Completed",
                    description: "Completed the database design for inventory system",
                    date: "1 week ago",
                    status: "Completed",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="bg-primary/10 p-2 rounded-full">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Reports</CardTitle>
              <CardDescription>Manage and view your weekly KKP reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Report Submissions</h3>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Submit New Report
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 font-medium p-3 bg-muted/50">
                    <div>Week</div>
                    <div>Period</div>
                    <div>Submission Date</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        week: "Week 5",
                        period: "Nov 29 - Dec 5, 2023",
                        date: "Dec 6, 2023",
                        status: "Approved",
                        statusColor: "green",
                      },
                      {
                        week: "Week 4",
                        period: "Nov 22 - Nov 28, 2023",
                        date: "Nov 29, 2023",
                        status: "Approved",
                        statusColor: "green",
                      },
                      {
                        week: "Week 3",
                        period: "Nov 15 - Nov 21, 2023",
                        date: "Nov 22, 2023",
                        status: "Approved",
                        statusColor: "green",
                      },
                      {
                        week: "Week 2",
                        period: "Nov 8 - Nov 14, 2023",
                        date: "Nov 15, 2023",
                        status: "Approved",
                        statusColor: "green",
                      },
                      {
                        week: "Week 1",
                        period: "Nov 1 - Nov 7, 2023",
                        date: "Nov 8, 2023",
                        status: "Approved",
                        statusColor: "green",
                      },
                    ].map((report, index) => (
                      <div key={index} className="grid grid-cols-5 p-3 items-center">
                        <div>{report.week}</div>
                        <div className="text-sm text-muted-foreground">{report.period}</div>
                        <div className="text-sm">{report.date}</div>
                        <div>
                          <Badge
                            variant="outline"
                            className={`bg-${report.statusColor}-50 text-${report.statusColor}-700 border-${report.statusColor}-200`}
                          >
                            {report.status === "Approved" && <CheckCircle2 className="h-3.5 w-3.5 mr-1" />}
                            {report.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supervision" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supervision Meetings</CardTitle>
              <CardDescription>Track your supervision meetings and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Meeting Schedule</h3>
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-5 font-medium p-3 bg-muted/50">
                    <div>Meeting</div>
                    <div>Date & Time</div>
                    <div>Supervisor</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        meeting: "Meeting #4",
                        date: "Dec 15, 2023 • 10:00 AM",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Scheduled",
                        statusColor: "blue",
                      },
                      {
                        meeting: "Meeting #3",
                        date: "Nov 30, 2023 • 11:00 AM",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Completed",
                        statusColor: "green",
                      },
                      {
                        meeting: "Meeting #2",
                        date: "Nov 15, 2023 • 10:00 AM",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Completed",
                        statusColor: "green",
                      },
                      {
                        meeting: "Meeting #1",
                        date: "Nov 5, 2023 • 09:00 AM",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Completed",
                        statusColor: "green",
                      },
                    ].map((meeting, index) => (
                      <div key={index} className="grid grid-cols-5 p-3 items-center">
                        <div>{meeting.meeting}</div>
                        <div className="text-sm">{meeting.date}</div>
                        <div className="text-sm">{meeting.supervisor}</div>
                        <div>
                          <Badge
                            variant="outline"
                            className={`bg-${meeting.statusColor}-50 text-${meeting.statusColor}-700 border-${meeting.statusColor}-200`}
                          >
                            {meeting.status === "Completed" && <CheckCircle2 className="h-3.5 w-3.5 mr-1" />}
                            {meeting.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                          {meeting.status === "Scheduled" && (
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Recent Feedback</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                            DR
                          </div>
                          <div>
                            <p className="font-medium">Dr. Rudi Hartono</p>
                            <p className="text-xs text-muted-foreground">Faculty Supervisor</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Nov 30, 2023</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Good progress on the database design. Make sure to document the relationships between tables
                        clearly. For the next phase, focus on implementing the user authentication system and basic
                        inventory input forms.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-medium">
                            BS
                          </div>
                          <div>
                            <p className="font-medium">Budi Santoso</p>
                            <p className="text-xs text-muted-foreground">Industry Supervisor</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Nov 25, 2023</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The initial prototype looks promising. Consider adding a dashboard that shows inventory levels
                        at a glance. Also, we need to discuss how to integrate with our existing supplier database in
                        the next meeting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KKP Documentation</CardTitle>
              <CardDescription>Manage photos, videos, and other documentation of your KKP activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Media Gallery</h3>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Media
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden group relative">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=KKP+Photo+${index + 1}`}
                        alt={`KKP Documentation ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-white border-white/20 bg-black/20">
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-white border-white/20 bg-black/20">
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Documents</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-4 font-medium p-3 bg-muted/50">
                      <div>Document Name</div>
                      <div>Type</div>
                      <div>Uploaded</div>
                      <div>Actions</div>
                    </div>

                    <div className="divide-y">
                      {[
                        {
                          name: "Project Proposal",
                          type: "PDF",
                          date: "Nov 1, 2023",
                        },
                        {
                          name: "Database Schema",
                          type: "PNG",
                          date: "Nov 10, 2023",
                        },
                        {
                          name: "UI Mockups",
                          type: "ZIP",
                          date: "Nov 15, 2023",
                        },
                        {
                          name: "Progress Presentation",
                          type: "PPTX",
                          date: "Nov 30, 2023",
                        },
                      ].map((doc, index) => (
                        <div key={index} className="grid grid-cols-4 p-3 items-center">
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm">{doc.type}</div>
                          <div className="text-sm text-muted-foreground">{doc.date}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

