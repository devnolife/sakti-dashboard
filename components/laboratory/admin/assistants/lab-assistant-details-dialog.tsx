"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Calendar, Clock, BookOpen, CheckCircle } from "lucide-react"
import type { LabAssistant } from "./types"

interface LabAssistantDetailsDialogProps {
  assistant: LabAssistant
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LabAssistantDetailsDialog({ assistant, open, onOpenChange }: LabAssistantDetailsDialogProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "probation":
        return <Badge variant="warning">Probation</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Laboratory Assistant Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={assistant.avatar} alt={assistant.name} />
            <AvatarFallback className="text-xl">{assistant.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-xl font-bold">{assistant.name}</h3>
            <p className="text-muted-foreground">{assistant.studentId}</p>
            <div className="mt-2">{getStatusBadge(assistant.status)}</div>
          </div>
        </div>

        <Tabs defaultValue="info">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{assistant.email}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{assistant.phone || "Not provided"}</span>
              </div>

              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Laboratory: {assistant.lab}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Experience: {assistant.experience} semester(s)</span>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Skills & Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{assistant.skills || "No skills information provided."}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Courses Assisted</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {assistant.courses?.map((course, index) => <li key={index}>{course}</li>) || (
                    <li>No courses information available.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Performance Metrics</CardTitle>
                <CardDescription>Last semester evaluation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Feedback</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CheckCircle
                          key={i}
                          className={`h-4 w-4 ${
                            i < (assistant.ratings?.studentFeedback || 0) ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technical Knowledge</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CheckCircle
                          key={i}
                          className={`h-4 w-4 ${
                            i < (assistant.ratings?.technicalKnowledge || 0) ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Communication</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CheckCircle
                          key={i}
                          className={`h-4 w-4 ${
                            i < (assistant.ratings?.communication || 0) ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm">Reliability</span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <CheckCircle
                          key={i}
                          className={`h-4 w-4 ${
                            i < (assistant.ratings?.reliability || 0) ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Present</span>
                  <span className="text-sm font-medium">{assistant.attendance?.present || 0} sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Absent</span>
                  <span className="text-sm font-medium">{assistant.attendance?.absent || 0} sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Late</span>
                  <span className="text-sm font-medium">{assistant.attendance?.late || 0} sessions</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Schedule</CardTitle>
                <CardDescription>Laboratory sessions for this semester</CardDescription>
              </CardHeader>
              <CardContent>
                {assistant.schedule && assistant.schedule.length > 0 ? (
                  <div className="space-y-3">
                    {assistant.schedule.map((session, index) => (
                      <div key={index} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">
                            {session.day}, {session.time}
                          </p>
                          <p className="text-sm text-muted-foreground">{session.course}</p>
                          <p className="text-xs text-muted-foreground">Room: {session.room}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No scheduled sessions for this semester.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

