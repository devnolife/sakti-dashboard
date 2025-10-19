"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FileText, Search, Download, Filter, Eye } from "lucide-react"

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all")

  // Mock audit logs data
  const auditLogs = [
    {
      id: "1",
      userId: "admin-001",
      userName: "Super Admin",
      action: "CREATE",
      resource: "User",
      details: "Created new user: John Doe (mahasiswa)",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      createdAt: "2024-01-15T10:30:00"
    },
    {
      id: "2",
      userId: "admin-001",
      userName: "Super Admin",
      action: "UPDATE",
      resource: "SystemConfig",
      details: "Updated academic.current_semester to 'Ganjil 2024/2025'",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      createdAt: "2024-01-15T10:25:00"
    },
    {
      id: "3",
      userId: "staff-tu-001",
      userName: "Staff TU",
      action: "APPROVE",
      resource: "KkpApplication",
      details: "Approved KKP Application #KKP-2024-001",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0...",
      createdAt: "2024-01-15T09:45:00"
    },
    {
      id: "4",
      userId: "admin-001",
      userName: "Super Admin",
      action: "DELETE",
      resource: "Company",
      details: "Deleted company: PT Inactive Company",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0...",
      createdAt: "2024-01-15T09:30:00"
    },
    {
      id: "5",
      userId: "admin-keuangan-001",
      userName: "Admin Keuangan",
      action: "VERIFY",
      resource: "Payment",
      details: "Verified payment #PAY-2024-1234",
      ipAddress: "192.168.1.110",
      userAgent: "Mozilla/5.0...",
      createdAt: "2024-01-15T09:15:00"
    }
  ]

  const getActionBadge = (action: string) => {
    const colors: Record<string, string> = {
      CREATE: "bg-green-500",
      UPDATE: "bg-blue-500",
      DELETE: "bg-red-500",
      APPROVE: "bg-purple-500",
      REJECT: "bg-orange-500",
      VERIFY: "bg-cyan-500",
      LOGIN: "bg-gray-500",
      LOGOUT: "bg-gray-400"
    }
    return (
      <Badge className={colors[action] || "bg-gray-500"}>
        {action}
      </Badge>
    )
  }

  const filteredLogs = actionFilter === "all"
    ? auditLogs
    : auditLogs.filter(log => log.action.toLowerCase() === actionFilter.toLowerCase())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground mt-2">
            Track all system activities and user actions
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,234</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-muted-foreground">Activities today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Actions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Deletes & overrides</p>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            Detailed log of all system activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by user, action, resource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
                <SelectItem value="verify">Verify</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(log.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="font-medium">{log.userName}</TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.resource}</Badge>
                    </TableCell>
                    <TableCell className="text-sm max-w-md truncate">
                      {log.details}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {log.ipAddress}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing 1-50 of 15,234 logs
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
