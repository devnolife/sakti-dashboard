"use client"

import { useState } from "react"
import { Edit, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import type { StudentGrade } from "./types"
import { toast } from "@/components/ui/use-toast"

interface StudentGradeDetailsDialogProps {
  grade: StudentGrade
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function StudentGradeDetailsDialog({ grade, open, onOpenChange }: StudentGradeDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedGrade, setEditedGrade] = useState({
    scores: {
      midterm: grade.scores.midterm,
      final: grade.scores.final,
      assignments: grade.scores.assignments,
      labReports: grade.scores.labReports,
      attendance: grade.scores.attendance,
    },
    comments: grade.comments || "",
  })

  const handleSaveChanges = () => {
    // Here you would typically save changes to the backend
    toast({
      title: "Grades updated",
      description: `Grades for ${grade.studentName} have been updated successfully.`,
    })
    setIsEditing(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Student Grade Details</span>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? <Save className="h-4 w-4 mr-1" /> : <Edit className="h-4 w-4 mr-1" />}
              {isEditing ? "Save" : "Edit"}
            </Button>
          </DialogTitle>
          <DialogDescription>View and manage detailed grade information for {grade.studentName}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-2">Student Information</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                <p>{grade.studentId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{grade.studentName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Lab Section</p>
                <p>{grade.labSection}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Final Grade</p>
                <p className="font-bold">{grade.finalGrade}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Grade Components</h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="midterm">Midterm</Label>
                {isEditing ? (
                  <Input
                    id="midterm"
                    type="number"
                    min="0"
                    max="100"
                    value={editedGrade.scores.midterm}
                    onChange={(e) =>
                      setEditedGrade({
                        ...editedGrade,
                        scores: {
                          ...editedGrade.scores,
                          midterm: Number(e.target.value),
                        },
                      })
                    }
                  />
                ) : (
                  <p>{grade.scores.midterm}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="final">Final</Label>
                {isEditing ? (
                  <Input
                    id="final"
                    type="number"
                    min="0"
                    max="100"
                    value={editedGrade.scores.final}
                    onChange={(e) =>
                      setEditedGrade({
                        ...editedGrade,
                        scores: {
                          ...editedGrade.scores,
                          final: Number(e.target.value),
                        },
                      })
                    }
                  />
                ) : (
                  <p>{grade.scores.final}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="assignments">Assignments</Label>
                {isEditing ? (
                  <Input
                    id="assignments"
                    type="number"
                    min="0"
                    max="100"
                    value={editedGrade.scores.assignments}
                    onChange={(e) =>
                      setEditedGrade({
                        ...editedGrade,
                        scores: {
                          ...editedGrade.scores,
                          assignments: Number(e.target.value),
                        },
                      })
                    }
                  />
                ) : (
                  <p>{grade.scores.assignments}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="labReports">Lab Reports</Label>
                {isEditing ? (
                  <Input
                    id="labReports"
                    type="number"
                    min="0"
                    max="100"
                    value={editedGrade.scores.labReports}
                    onChange={(e) =>
                      setEditedGrade({
                        ...editedGrade,
                        scores: {
                          ...editedGrade.scores,
                          labReports: Number(e.target.value),
                        },
                      })
                    }
                  />
                ) : (
                  <p>{grade.scores.labReports}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Label htmlFor="attendance">Attendance</Label>
                {isEditing ? (
                  <Input
                    id="attendance"
                    type="number"
                    min="0"
                    max="100"
                    value={editedGrade.scores.attendance}
                    onChange={(e) =>
                      setEditedGrade({
                        ...editedGrade,
                        scores: {
                          ...editedGrade.scores,
                          attendance: Number(e.target.value),
                        },
                      })
                    }
                  />
                ) : (
                  <p>{grade.scores.attendance}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="assignments">
          <TabsList className="mb-2">
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="space-y-4">
            <div className="space-y-2">
              {grade.assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardHeader className="py-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{assignment.name}</CardTitle>
                      <Badge className={`${assignment.score >= 75 ? "bg-green-500" : "bg-red-500"}`}>
                        {assignment.score} / {assignment.maxScore}
                      </Badge>
                    </div>
                    <CardDescription>
                      Due: {assignment.dueDate} | Submitted: {assignment.submittedDate || "Not submitted"}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="space-y-2">
              {grade.attendance.map((record, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{record.date}</p>
                    <p className="text-sm text-muted-foreground">{record.topic}</p>
                  </div>
                  <Badge
                    className={
                      record.status === "present"
                        ? "bg-green-500"
                        : record.status === "absent"
                          ? "bg-red-500"
                          : record.status === "late"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                    }
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="comments">
            <div className="space-y-2">
              <Label htmlFor="comments">Instructor Comments</Label>
              {isEditing ? (
                <Textarea
                  id="comments"
                  value={editedGrade.comments}
                  onChange={(e) =>
                    setEditedGrade({
                      ...editedGrade,
                      comments: e.target.value,
                    })
                  }
                  rows={5}
                  placeholder="Add comments about the student's performance..."
                />
              ) : (
                <div className="rounded-md border p-3 min-h-[100px]">{grade.comments || "No comments available."}</div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

