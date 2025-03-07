"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, BookOpen, CheckCircle2 } from "lucide-react"
import { LabDashboardDialog } from "@/components/laboratory/lab-dashboard-dialog"

// Sample data for registered labs
const myLabs = [
  {
    id: "lab-1",
    title: "Computer Networks Laboratory",
    description: "Learn about network protocols, configurations, and troubleshooting techniques.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Dr. Ahmad Dahlan",
    schedule: "Monday & Wednesday, 10:00 - 12:00",
    progress: 75,
    nextSession: "Monday, 10:00 AM",
    nextTopic: "Wireless Network Configuration",
    assignments: [
      { id: "a1", title: "Network Topology Design", dueDate: "Oct 15, 2023", status: "completed" },
      { id: "a2", title: "Router Configuration", dueDate: "Oct 22, 2023", status: "in-progress" },
      { id: "a3", title: "Network Troubleshooting", dueDate: "Oct 29, 2023", status: "upcoming" },
    ],
    status: "in-progress",
  },
  {
    id: "lab-2",
    title: "Database Systems Laboratory",
    description: "Practical implementation of database design, SQL queries, and database management.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Siti Aminah",
    schedule: "Tuesday & Thursday, 13:00 - 15:00",
    progress: 40,
    nextSession: "Tuesday, 1:00 PM",
    nextTopic: "Advanced SQL Queries",
    assignments: [
      { id: "a1", title: "Database Schema Design", dueDate: "Oct 12, 2023", status: "completed" },
      { id: "a2", title: "SQL Query Optimization", dueDate: "Oct 19, 2023", status: "upcoming" },
    ],
    status: "in-progress",
  },
  {
    id: "lab-3",
    title: "Web Development Laboratory",
    description: "Build responsive web applications using modern frameworks and technologies.",
    image: "/placeholder.svg?height=200&width=400",
    instructor: "Prof. Joko Widodo",
    schedule: "Monday & Wednesday, 15:00 - 17:00",
    progress: 100,
    completionDate: "September 30, 2023",
    grade: "A",
    assignments: [
      { id: "a1", title: "Frontend Development", dueDate: "Sep 10, 2023", status: "completed" },
      { id: "a2", title: "Backend Integration", dueDate: "Sep 20, 2023", status: "completed" },
      { id: "a3", title: "Final Project", dueDate: "Sep 30, 2023", status: "completed" },
    ],
    status: "completed",
    certificate: true,
  },
]

export function MyLabsOverview() {
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)

  const inProgressLabs = myLabs.filter((lab) => lab.status === "in-progress")
  const completedLabs = myLabs.filter((lab) => lab.status === "completed")

  const handleOpenDashboard = (lab: any) => {
    setSelectedLab(lab)
    setIsDashboardOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="in-progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="in-progress">In Progress ({inProgressLabs.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedLabs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressLabs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {inProgressLabs.map((lab) => (
                <Card key={lab.id} className="overflow-hidden gradient-border card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle>{lab.title}</CardTitle>
                    <CardDescription>{lab.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-medium">{lab.progress}%</span>
                        </div>
                        <Progress value={lab.progress} className="h-2" />
                      </div>

                      <div className="rounded-md border p-3 bg-muted/50">
                        <h4 className="text-sm font-medium mb-2">Next Session</h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lab.nextSession}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{lab.nextTopic}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Assignments</h4>
                        <div className="space-y-2">
                          {lab.assignments.map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{assignment.title}</span>
                              </div>
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
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleOpenDashboard(lab)} className="w-full">
                      Open Lab Dashboard
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You don't have any active laboratories.</p>
              <Button variant="outline" className="mt-4">
                Browse Available Labs
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedLabs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {completedLabs.map((lab) => (
                <Card key={lab.id} className="overflow-hidden gradient-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{lab.title}</CardTitle>
                      {lab.certificate && (
                        <Badge variant="success">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{lab.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Completed on {lab.completionDate}</span>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Grade: {lab.grade}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Completed Assignments</h4>
                        <div className="space-y-2">
                          {lab.assignments.map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span>{assignment.title}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{assignment.dueDate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Details</Button>
                    {lab.certificate && <Button variant="outline">Download Certificate</Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't completed any laboratories yet.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedLab && <LabDashboardDialog lab={selectedLab} open={isDashboardOpen} onOpenChange={setIsDashboardOpen} />}
    </div>
  )
}

