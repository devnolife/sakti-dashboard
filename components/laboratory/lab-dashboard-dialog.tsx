"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  FileText,
  Users,
  BookOpen,
  CheckCircle2,
  Download,
  MessageSquare,
  Video,
  Upload,
  LinkIcon,
} from "lucide-react"

interface LabDashboardDialogProps {
  lab: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LabDashboardDialog({ lab, open, onOpenChange }: LabDashboardDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <div className="py-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{lab.title}</h2>
              <p className="text-muted-foreground">{lab.instructor}</p>
            </div>
            <Badge variant={lab.progress === 100 ? "success" : "default"} className="px-3 py-1 text-xs">
              {lab.progress === 100 ? "Completed" : "In Progress"}
            </Badge>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Overall Completion</span>
                        <span className="text-sm font-medium">{lab.progress}%</span>
                      </div>
                      <Progress value={lab.progress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-md border p-3">
                        <div className="flex items-center text-sm mb-1">
                          <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                          <span className="font-medium">Completed</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {Math.round((lab.progress / 100) * lab.assignments.length)}/{lab.assignments.length}
                        </p>
                        <p className="text-xs text-muted-foreground">assignments</p>
                      </div>
                      <div className="rounded-md border p-3">
                        <div className="flex items-center text-sm mb-1">
                          <Clock className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="font-medium">Remaining</span>
                        </div>
                        <p className="text-2xl font-bold">
                          {lab.assignments.length - Math.round((lab.progress / 100) * lab.assignments.length)}
                        </p>
                        <p className="text-xs text-muted-foreground">assignments</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Next Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-3 bg-muted/50">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{lab.nextSession}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{lab.nextTopic}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Room 301, Building B</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">
                      <Video className="h-4 w-4 mr-2" />
                      Join Online Session
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lab.assignments
                      .filter((a: any) => a.status !== "completed")
                      .map((assignment: any) => (
                        <div
                          key={assignment.id}
                          className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{assignment.title}</p>
                              <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                            </div>
                          </div>
                          <Badge variant={assignment.status === "in-progress" ? "default" : "outline"}>
                            {assignment.status === "in-progress" ? "In Progress" : "Upcoming"}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Course Materials</CardTitle>
                  <CardDescription>Access lecture notes, slides, and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Introduction to Network Protocols</p>
                          <p className="text-xs text-muted-foreground">PDF, 2.3 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">TCP/IP Configuration Guide</p>
                          <p className="text-xs text-muted-foreground">PDF, 1.8 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between border-b pb-3">
                      <div className="flex items-center">
                        <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Router Configuration Tutorial</p>
                          <p className="text-xs text-muted-foreground">MP4, 45 minutes</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Network Simulation Software</p>
                          <p className="text-xs text-muted-foreground">External Resource</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Assignments</CardTitle>
                  <CardDescription>View and submit your assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lab.assignments.map((assignment: any) => (
                      <Card key={assignment.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                            <Badge
                              variant={
                                assignment.status === "completed"
                                  ? "success"
                                  : assignment.status === "in-progress"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {assignment.status === "completed"
                                ? "Completed"
                                : assignment.status === "in-progress"
                                  ? "In Progress"
                                  : "Upcoming"}
                            </Badge>
                          </div>
                          <CardDescription>Due: {assignment.dueDate}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-3">
                            <p className="text-sm">
                              {assignment.status === "completed"
                                ? "You have completed this assignment."
                                : assignment.status === "in-progress"
                                  ? "This assignment is in progress. Please submit before the due date."
                                  : "This assignment will be available soon."}
                            </p>
                            {assignment.status === "in-progress" && (
                              <Button className="w-full">
                                <Upload className="h-4 w-4 mr-2" />
                                Submit Assignment
                              </Button>
                            )}
                            {assignment.status === "completed" && (
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Submitted on: Oct 14, 2023</span>
                                <span className="font-medium">Grade: 90/100</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Discussion Forum</CardTitle>
                  <CardDescription>Interact with instructors and fellow students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md border p-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Dr. Ahmad Dahlan</h4>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-sm mt-1">
                            Welcome to the Computer Networks Laboratory! Please use this forum to ask questions and
                            discuss topics related to our lab sessions.
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Reply
                            </Button>
                            <span className="text-xs text-muted-foreground">5 replies</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-md border p-4">
                      <div className="flex items-start space-x-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Budi Santoso (Student)</h4>
                            <span className="text-xs text-muted-foreground">1 day ago</span>
                          </div>
                          <p className="text-sm mt-1">
                            I'm having trouble with the router configuration in the latest assignment. Can someone help
                            me understand the NAT configuration?
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Reply
                            </Button>
                            <span className="text-xs text-muted-foreground">3 replies</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Start New Discussion
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

