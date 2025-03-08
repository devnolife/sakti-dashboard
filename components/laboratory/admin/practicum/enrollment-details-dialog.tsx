"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Calendar,
  User,
  BookOpen,
  CreditCard,
  FileText,
  CheckSquare,
  Award,
} from "lucide-react"
import type { PracticumEnrollment, PracticumStatus } from "./types"
import { Progress } from "@/components/ui/progress"

interface EnrollmentDetailsDialogProps {
  enrollment: PracticumEnrollment
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (status: PracticumStatus) => void
}

export function EnrollmentDetailsDialog({
  enrollment,
  open,
  onOpenChange,
  onStatusChange,
}: EnrollmentDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate grade average
  const calculateGradeAverage = () => {
    if (enrollment.grades.length === 0) return 0

    let weightedSum = 0
    let totalWeight = 0

    enrollment.grades.forEach((grade) => {
      const percentage = (grade.score / grade.maxScore) * 100
      weightedSum += percentage * grade.weight
      totalWeight += grade.weight
    })

    return totalWeight > 0 ? weightedSum / totalWeight : 0
  }

  // Calculate attendance percentage
  const calculateAttendancePercentage = () => {
    if (enrollment.attendance.length === 0) return 0

    const present = enrollment.attendance.filter((a) => a.status === "present" || a.status === "late").length

    return (present / enrollment.attendance.length) * 100
  }

  // Calculate requirements completion percentage
  const calculateRequirementsPercentage = () => {
    if (enrollment.requirements.length === 0) return 0

    const completed = enrollment.requirements.filter((r) => r.completed).length
    return (completed / enrollment.requirements.length) * 100
  }

  // Render status badge
  const renderStatusBadge = (status: PracticumStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            In Progress
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Render payment status badge
  const renderPaymentBadge = (status: "paid" | "unpaid" | "partial") => {
    switch (status) {
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Paid
          </Badge>
        )
      case "unpaid":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Unpaid
          </Badge>
        )
      case "partial":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Partial
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" />
            Student Enrollment Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{enrollment.studentName}</h3>
            <p className="text-muted-foreground">ID: {enrollment.studentId}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">Status: {renderStatusBadge(enrollment.status)}</div>
            <p className="text-sm text-muted-foreground">
              Enrolled on {new Date(enrollment.enrollmentDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Course Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Course:</span>
                      <p className="text-sm">{enrollment.courseName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Code:</span>
                      <p className="text-sm">{enrollment.courseCode}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Section:</span>
                      <p className="text-sm">{enrollment.labSection}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Instructor:</span>
                      <p className="text-sm">{enrollment.instructor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Day:</span>
                      <p className="text-sm">{enrollment.scheduleDay}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Time:</span>
                      <p className="text-sm">{enrollment.scheduleTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Status:</span>
                      <p className="text-sm">{renderPaymentBadge(enrollment.paymentStatus)}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Amount:</span>
                      <p className="text-sm">Rp {enrollment.paymentAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <CardDescription>{calculateAttendancePercentage().toFixed(0)}% Present</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={calculateAttendancePercentage()} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Requirements</CardTitle>
                  <CardDescription>{calculateRequirementsPercentage().toFixed(0)}% Complete</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={calculateRequirementsPercentage()} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Grade Average</CardTitle>
                  <CardDescription>{calculateGradeAverage().toFixed(1)}%</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={calculateGradeAverage()} className="h-2" />
                </CardContent>
              </Card>
            </div>

            {enrollment.notes && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{enrollment.notes}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Record</CardTitle>
                <CardDescription>Student's attendance for {enrollment.courseName}</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollment.attendance.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No attendance records available</p>
                ) : (
                  <div className="space-y-4">
                    {enrollment.attendance.map((record, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          {record.status === "present" && <CheckCircle className="h-5 w-5 text-green-500" />}
                          {record.status === "absent" && <XCircle className="h-5 w-5 text-red-500" />}
                          {record.status === "late" && <Clock className="h-5 w-5 text-yellow-500" />}
                          {record.status === "excused" && <AlertCircle className="h-5 w-5 text-blue-500" />}
                          <span>{new Date(record.date).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <Badge
                            variant="outline"
                            className={
                              record.status === "present"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : record.status === "absent"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : record.status === "late"
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                          {record.notes && <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Grade Records</CardTitle>
                <CardDescription>Student's grades for {enrollment.courseName}</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollment.grades.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No grade records available</p>
                ) : (
                  <div className="space-y-4">
                    {enrollment.grades.map((grade, index) => (
                      <div key={index} className="border-b pb-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">{grade.assignmentName}</div>
                          <div className="font-medium">
                            {grade.score} / {grade.maxScore}
                            <span className="text-muted-foreground ml-1">
                              ({((grade.score / grade.maxScore) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <div>Weight: {(grade.weight * 100).toFixed(0)}%</div>
                          <div>{new Date(grade.date).toLocaleDateString()}</div>
                        </div>
                        <Progress value={(grade.score / grade.maxScore) * 100} className="h-2 mt-2" />
                      </div>
                    ))}

                    <div className="pt-2 border-t">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">Overall Grade</div>
                        <div className="font-medium">{calculateGradeAverage().toFixed(1)}%</div>
                      </div>
                      <Progress value={calculateGradeAverage()} className="h-2 mt-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle>Course Requirements</CardTitle>
                <CardDescription>Required items and prerequisites for {enrollment.courseName}</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollment.requirements.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No requirements specified</p>
                ) : (
                  <div className="space-y-2">
                    {enrollment.requirements.map((req) => (
                      <div key={req.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          {req.completed ? (
                            <CheckSquare className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-5 w-5 border rounded flex items-center justify-center" />
                          )}
                          <span>{req.name}</span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            req.completed
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200"
                          }
                        >
                          {req.completed ? "Completed" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex gap-2">
            {enrollment.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                  onClick={() => onStatusChange("rejected")}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                  onClick={() => onStatusChange("approved")}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {enrollment.status === "approved" && (
              <Button
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                onClick={() => onStatusChange("in_progress")}
              >
                <Clock className="mr-2 h-4 w-4" />
                Mark as In Progress
              </Button>
            )}
            {enrollment.status === "in_progress" && (
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                onClick={() => onStatusChange("completed")}
              >
                <Award className="mr-2 h-4 w-4" />
                Mark as Completed
              </Button>
            )}
          </div>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

