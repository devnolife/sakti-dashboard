"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Download,
  Filter,
  Search,
  User,
  FileText,
  Settings,
  Database,
  Shield,
  Mail,
  Calendar,
  Clock,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ActivityLog {
  id: string
  user: string
  userRole: string
  action: string
  resource: string
  details: string
  ipAddress: string
  timestamp: string
  status: "success" | "failed" | "warning"
}

export default function ActivityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const activities: ActivityLog[] = [
    {
      id: "1",
      user: "admin@example.com",
      userRole: "admin",
      action: "User Created",
      resource: "users",
      details: "Created new user: john.doe@example.com",
      ipAddress: "192.168.1.1",
      timestamp: "2024-01-20 14:30:00",
      status: "success",
    },
    {
      id: "2",
      user: "staff@example.com",
      userRole: "staff_tu",
      action: "Document Approved",
      resource: "documents",
      details: "Approved document: Letter-001",
      ipAddress: "192.168.1.15",
      timestamp: "2024-01-20 14:15:00",
      status: "success",
    },
    {
      id: "3",
      user: "dosen@example.com",
      userRole: "dosen",
      action: "Grade Updated",
      resource: "grades",
      details: "Updated grade for student: 123456",
      ipAddress: "192.168.1.42",
      timestamp: "2024-01-20 13:45:00",
      status: "success",
    },
    {
      id: "4",
      user: "admin@example.com",
      userRole: "admin",
      action: "Login Failed",
      resource: "auth",
      details: "Failed login attempt with wrong password",
      ipAddress: "203.45.67.89",
      timestamp: "2024-01-20 13:30:00",
      status: "failed",
    },
    {
      id: "5",
      user: "mahasiswa@example.com",
      userRole: "mahasiswa",
      action: "KKP Submitted",
      resource: "kkp",
      details: "Submitted KKP application: KKP-2024-001",
      ipAddress: "192.168.1.88",
      timestamp: "2024-01-20 12:00:00",
      status: "success",
    },
  ]

  const activityStats = {
    total: activities.length,
    today: 152,
    thisWeek: 1245,
    failed: activities.filter(a => a.status === "failed").length,
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500">Success</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Warning</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes("User")) return <User className="h-4 w-4" />
    if (action.includes("Document")) return <FileText className="h-4 w-4" />
    if (action.includes("Grade")) return <FileText className="h-4 w-4" />
    if (action.includes("Login")) return <Shield className="h-4 w-4" />
    if (action.includes("Settings")) return <Settings className="h-4 w-4" />
    return <Activity className="h-4 w-4" />
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Activity className="h-8 w-8" />
            Activity Logs
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor semua aktivitas pengguna di sistem
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityStats.today}</div>
            <p className="text-xs text-muted-foreground mt-1">Activities today</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityStats.thisWeek}</div>
            <p className="text-xs text-muted-foreground mt-1">Activities this week</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Failed Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityStats.failed}</div>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground mt-1">Active today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>
            Riwayat lengkap aktivitas pengguna
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="dosen">Dosen</SelectItem>
                <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                <SelectItem value="staff_tu">Staff TU</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Activities Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="text-muted-foreground text-sm font-mono">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {activity.timestamp}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{activity.user}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {activity.userRole}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getActionIcon(activity.action)}
                      <span className="font-medium">{activity.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono">
                      {activity.resource}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground truncate">
                      {activity.details}
                    </p>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {activity.ipAddress}
                  </TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-5 of 152 activities
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Categories */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-5 w-5" />
              User Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Logins</span>
                <span className="font-medium">245</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Profile Updates</span>
                <span className="font-medium">56</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password Changes</span>
                <span className="font-medium">12</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-5 w-5" />
              Document Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Approved</span>
                <span className="font-medium">67</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rejected</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Database className="h-5 w-5" />
              System Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Configuration Changes</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Database Backups</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">System Updates</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

