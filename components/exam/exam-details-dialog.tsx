"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import type { Exam } from "@/types/exam"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { CheckCircle, Clock, AlertCircle, Calendar, XCircle, FileText, Users, MessageSquare } from "lucide-react"

interface ExamDetailsDialogProps {
  exam: Exam
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExamDetailsDialog({ exam, open, onOpenChange }: ExamDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "passed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Passed
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Unknown
          </Badge>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Exam Details {getStatusBadge(exam.status)}</DialogTitle>
          <DialogDescription>View and manage exam details for {exam.studentName}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="committee" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Committee
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>{exam.title}</CardTitle>
                <CardDescription>Exam details and information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Student Name</Label>
                    <div className="font-medium">{exam.studentName}</div>
                  </div>
                  <div>
                    <Label>Student NIM</Label>
                    <div className="font-medium">{exam.studentNIM}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Program</Label>
                    <div className="font-medium">{exam.program}</div>
                  </div>
                  <div>
                    <Label>Exam Type</Label>
                    <div className="font-medium capitalize">{exam.type} Exam</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Submission Date</Label>
                    <div className="font-medium">{format(new Date(exam.submissionDate), "dd MMMM yyyy")}</div>
                  </div>
                  {exam.scheduledDate && (
                    <div>
                      <Label>Scheduled Date</Label>
                      <div className="font-medium">{format(new Date(exam.scheduledDate), "dd MMMM yyyy, HH:mm")}</div>
                    </div>
                  )}
                </div>

                <div>
                  <Label>Abstract</Label>
                  <div className="mt-1 text-sm">{exam.abstract}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {exam.status === "pending" && (
                  <>
                    <Button variant="outline">Reject</Button>
                    <Button>Schedule Exam</Button>
                  </>
                )}
                {exam.status === "scheduled" && (
                  <>
                    <Button variant="outline">Reschedule</Button>
                    <Button>Mark as Completed</Button>
                  </>
                )}
                {exam.status === "completed" && (
                  <>
                    <Button variant="outline" className="text-red-600">
                      Mark as Failed
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">Mark as Passed</Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="committee">
            <Card>
              <CardHeader>
                <CardTitle>Examination Committee</CardTitle>
                <CardDescription>Manage committee members for this exam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exam.committee && exam.committee.length > 0 ? (
                    exam.committee.map((member, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">No committee members assigned yet</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add Committee Member</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback and Notes</CardTitle>
                <CardDescription>Provide feedback for this exam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Examiner Notes</Label>
                    <Textarea id="notes" placeholder="Enter notes about the exam..." className="mt-1" />
                  </div>

                  {(exam.status === "completed" || exam.status === "passed" || exam.status === "failed") && (
                    <div>
                      <Label htmlFor="score">Score</Label>
                      <Input id="score" type="number" placeholder="Enter score..." className="mt-1" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Feedback</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

