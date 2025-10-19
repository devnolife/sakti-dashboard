"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users, FileText, Building, Briefcase, AlertTriangle, CheckCircle, Clock,
  Settings, Database, DollarSign, BookMarked, Shield, Activity
} from "lucide-react"
import Link from "next/link"

interface AdminStats {
  users: {
    total: number
    active: number
    inactive: number
    byRole: Record<string, number>
  }
  breakdown: {
    students: number
    lecturers: number
    staff: number
    companies: number
    books: number
  }
  pendingApprovals: {
    kkp: number
    exams: number
    payments: number
    total: number
  }
  kkpStats: {
    pending: number
    approved: number
    completed: number
  }
  paymentStats: {
    pending: number
    verified: number
  }
  activeSessions: number
  systemHealth: {
    status: string
    uptime: number
    timestamp: string
  }
  recentActivity: Array<{
    id: string
    action: string
    resource: string
    user: string
    userRole: string
    timestamp: string
    details: any
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('session-token')
      const response = await fetch('/api/admin/statistics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch statistics')
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      console.error('Error fetching admin statistics:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  if (loading) {
    return (
      <div className="space-y-6 mt-20">
        <div className="text-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="space-y-6 mt-20">
        <div className="text-center">
          <p className="text-red-500">Error: {error || 'Failed to load stats'}</p>
          <Button onClick={fetchStats} className="mt-4">Retry</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-20">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Admin Utama Dashboard
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Full system control and monitoring</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users.total.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.users.active} active, {stats.users.inactive} inactive
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals.total}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.pendingApprovals.kkp} KKP, {stats.pendingApprovals.exams} Exams, {stats.pendingApprovals.payments} Payments
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSessions}</div>
            <div className="text-xs text-muted-foreground mt-1">Online users now</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <Shield className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{stats.systemHealth.status}</div>
            <div className="text-xs text-muted-foreground mt-1">Uptime: {formatUptime(stats.systemHealth.uptime)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Management Sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* User Management */}
        <Link href="/dashboard/admin/users">
          <Card className="overflow-hidden gradient-border card-hover cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>User Management</CardTitle>
              </div>
              <CardDescription>Manage all users and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mahasiswa:</span>
                  <span className="font-semibold">{stats.breakdown.students.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dosen:</span>
                  <span className="font-semibold">{stats.breakdown.lecturers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staff:</span>
                  <span className="font-semibold">{stats.breakdown.staff.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* System Configuration */}
        <Link href="/dashboard/admin/config">
          <Card className="overflow-hidden gradient-border card-hover cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                <CardTitle>System Config</CardTitle>
              </div>
              <CardDescription>Application settings & parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Academic settings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Payment configuration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Library settings</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Master Data */}
        <Link href="/dashboard/admin/companies">
          <Card className="overflow-hidden gradient-border card-hover cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-500" />
                <CardTitle>Master Data</CardTitle>
              </div>
              <CardDescription>Companies, categories, templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Companies:</span>
                  <span className="font-semibold">{stats.breakdown.companies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Books:</span>
                  <span className="font-semibold">{stats.breakdown.books}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-semibold">{stats.breakdown.students}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Monitoring Dashboard */}
        <Link href="/dashboard/admin/monitoring">
          <Card className="overflow-hidden gradient-border card-hover cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-500" />
                <CardTitle>Monitoring</CardTitle>
              </div>
              <CardDescription>KKP, Exams, Payments tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">KKP Pending:</span>
                  <span className="font-semibold text-amber-500">{stats.kkpStats.pending}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Requests:</span>
                  <span className="font-semibold text-blue-500">{stats.pendingApprovals.exams}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payments Pending:</span>
                  <span className="font-semibold text-red-500">{stats.paymentStats.pending}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Approval Override */}
        <Link href="/dashboard/admin/approval-override">
          <Card className="overflow-hidden gradient-border card-hover cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-500" />
                <CardTitle>Approval Override</CardTitle>
              </div>
              <CardDescription>Emergency approval controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Force approve or reject any pending requests across all modules
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Audit Logs */}
        <Link href="/dashboard/admin/audit-logs">
          <Card className="overflow-hidden gradient-border card-hover cursor-pointer transition-all hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-500" />
                <CardTitle>Audit Logs</CardTitle>
              </div>
              <CardDescription>System activity tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                View all user activities and system changes
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>Latest actions across the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.slice(0, 10).map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 text-sm">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    activity.action === 'login' || activity.action === 'first_login' ? 'bg-green-500' :
                    activity.action === 'create' ? 'bg-blue-500' :
                    activity.action === 'update' ? 'bg-amber-500' :
                    activity.action === 'delete' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium capitalize">{activity.action} {activity.resource}</p>
                    <p className="text-muted-foreground">
                      {activity.user} ({activity.userRole}) - {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

