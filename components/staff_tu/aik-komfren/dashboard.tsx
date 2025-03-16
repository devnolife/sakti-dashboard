"use client"
import { useRouter } from "next/navigation"
import {
  Users,
  UserCheck,
  CheckCircle,
  Calendar,
  CreditCard,
  ArrowRight,
  BookOpen,
  FileText,
  BarChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function AikKomfrenDashboard() {
  const router = useRouter()

  // Mock statistics
  const stats = {
    totalRegistrations: 125,
    paidRegistrations: 110,
    pendingPayments: 15,
    totalExamGroups: 12,
    scheduledExams: 5,
    inProgressExams: 3,
    completedExams: 4,
    totalExamined: 85,
    passedExams: 78,
    failedExams: 7,
    certificatesIssued: 78,
  }

  // Calculate percentages
  const paymentRate = (stats.paidRegistrations / stats.totalRegistrations) * 100
  const examCompletionRate = (stats.totalExamined / stats.paidRegistrations) * 100
  const passRate = (stats.passedExams / stats.totalExamined) * 100

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      type: "registration",
      studentName: "Ahmad Fauzi",
      timestamp: "2023-06-01T09:30:00",
      description: "Registered for AIK Komfren exam",
    },
    {
      id: "2",
      type: "payment",
      studentName: "Siti Nurhaliza",
      timestamp: "2023-06-01T10:15:00",
      description: "Payment verified for AIK Komfren exam",
    },
    {
      id: "3",
      type: "group",
      studentName: "Staff",
      timestamp: "2023-06-01T11:00:00",
      description: 'Created new examination group "Group D"',
    },
    {
      id: "4",
      type: "exam",
      studentName: "Dr. Abdul Rahman",
      timestamp: "2023-06-01T13:45:00",
      description: "Completed examination for 3 students",
    },
    {
      id: "5",
      type: "certificate",
      studentName: "System",
      timestamp: "2023-06-01T14:30:00",
      description: "Generated 3 new certificates",
    },
  ]

  // Navigate to different sections
  const navigateToRegistration = () => router.push("/dashboard/staff_tu/aik-komfren/registration")
  const navigateToExamination = () => router.push("/dashboard/staff_tu/aik-komfren/examination")
  const navigateToCompletion = () => router.push("/dashboard/staff_tu/aik-komfren/completion")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AIK Komfren Management</h2>
        <p className="text-muted-foreground">
          Manage the AIK Komfren examination process from registration to completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Registration
            </CardTitle>
            <CardDescription>Manage student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalRegistrations}</p>
                  <p className="text-sm text-muted-foreground">Total Registrations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.paidRegistrations}</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Payment Rate</span>
                  <span className="font-medium">{paymentRate.toFixed(1)}%</span>
                </div>
                <Progress value={paymentRate} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={navigateToRegistration}>
              View Registrations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
          <div className="absolute top-0 right-0 p-3">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Step 1
            </Badge>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-purple-600" />
              Examination
            </CardTitle>
            <CardDescription>Manage examination groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalExamGroups}</p>
                  <p className="text-sm text-muted-foreground">Total Groups</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduledExams}</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.completedExams}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Exam Completion Rate</span>
                  <span className="font-medium">{examCompletionRate.toFixed(1)}%</span>
                </div>
                <Progress value={examCompletionRate} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={navigateToExamination}>
              Manage Examinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
          <div className="absolute top-0 right-0 p-3">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Step 2
            </Badge>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completion
            </CardTitle>
            <CardDescription>View examination results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalExamined}</p>
                  <p className="text-sm text-muted-foreground">Total Examined</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.passedExams}</p>
                  <p className="text-sm text-muted-foreground">Passed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.failedExams}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Pass Rate</span>
                  <span className="font-medium">{passRate.toFixed(1)}%</span>
                </div>
                <Progress value={passRate} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={navigateToCompletion}>
              View Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
          <div className="absolute top-0 right-0 p-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Step 3
            </Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities in the AIK Komfren examination process.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="rounded-full p-2 bg-muted">
                    {activity.type === "registration" && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === "payment" && <CreditCard className="h-4 w-4 text-green-600" />}
                    {activity.type === "group" && <Calendar className="h-4 w-4 text-purple-600" />}
                    {activity.type === "exam" && <BookOpen className="h-4 w-4 text-orange-600" />}
                    {activity.type === "certificate" && <FileText className="h-4 w-4 text-teal-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for AIK Komfren management.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" onClick={navigateToRegistration}>
              <Users className="mr-2 h-4 w-4" />
              Verify Pending Payments
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={navigateToExamination}>
              <UserCheck className="mr-2 h-4 w-4" />
              Create Examination Group
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={navigateToExamination}>
              <Calendar className="mr-2 h-4 w-4" />
              Assign Supervisors
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={navigateToCompletion}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Certificates
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={navigateToCompletion}>
              <BarChart className="mr-2 h-4 w-4" />
              View Examination Statistics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

