"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Briefcase, GraduationCap, DollarSign, Clock, CheckCircle,
  XCircle, AlertTriangle, TrendingUp, Users
} from "lucide-react"

export default function MonitoringDashboard() {
  // Mock data
  const kkpApplications = [
    {
      id: "1",
      student: "John Doe",
      title: "Implementasi Sistem IoT",
      company: "PT Tech Indonesia",
      status: "pending",
      submittedAt: "2024-01-15"
    },
    {
      id: "2",
      student: "Jane Smith",
      title: "Analisis Big Data",
      company: "PT Data Solutions",
      status: "approved",
      submittedAt: "2024-01-14"
    }
  ]

  const examApplications = [
    {
      id: "1",
      student: "Bob Wilson",
      type: "proposal",
      title: "Sistem Deteksi Wajah",
      status: "scheduled",
      examDate: "2024-02-01"
    },
    {
      id: "2",
      student: "Alice Brown",
      type: "final",
      title: "Machine Learning untuk Pertanian",
      status: "pending",
      examDate: null
    }
  ]

  const payments = [
    {
      id: "1",
      student: "Charlie Davis",
      amount: 5000000,
      category: "tuition",
      status: "completed",
      dueDate: "2024-01-10"
    },
    {
      id: "2",
      student: "David Evans",
      amount: 500000,
      category: "exam",
      status: "pending",
      dueDate: "2024-01-20"
    }
  ]

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", className: string }> = {
      pending: { variant: "outline", className: "text-amber-600 border-amber-600" },
      approved: { variant: "outline", className: "text-green-600 border-green-600" },
      rejected: { variant: "outline", className: "text-red-600 border-red-600" },
      completed: { variant: "outline", className: "text-green-600 border-green-600" },
      scheduled: { variant: "outline", className: "text-blue-600 border-blue-600" },
    }
    const config = variants[status] || { variant: "outline" as const, className: "" }
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Monitoring</h2>
        <p className="text-muted-foreground mt-2">
          Track and monitor all activities across modules
        </p>
      </div>

      {/* Overview Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KKP Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-amber-500" />
                12 pending
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                28 approved
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exam Applications</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">63</div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-amber-500" />
                18 pending
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                35 scheduled
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 450M</div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                2,345 paid
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3 text-red-500" />
                45 overdue
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,845</div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12% from last semester
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Monitoring Tabs */}
      <Tabs defaultValue="kkp" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kkp">KKP Applications</TabsTrigger>
          <TabsTrigger value="exams">Exam Applications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* KKP Applications */}
        <TabsContent value="kkp" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent KKP Applications</CardTitle>
              <CardDescription>
                Monitor all KKP application submissions and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kkpApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.student}</TableCell>
                        <TableCell>{app.title}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {app.company}
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam Applications */}
        <TabsContent value="exams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Exam Applications</CardTitle>
              <CardDescription>
                Monitor exam registrations and schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Exam Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examApplications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell className="font-medium">{app.student}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {app.type.charAt(0).toUpperCase() + app.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{app.title}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {app.examDate ? new Date(app.examDate).toLocaleDateString() : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Monitor payment transactions and statuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.student}</TableCell>
                        <TableCell className="font-mono">
                          Rp {payment.amount.toLocaleString("id-ID")}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {payment.category.charAt(0).toUpperCase() + payment.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
