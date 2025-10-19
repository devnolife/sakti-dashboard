"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users, FileText, Building, Briefcase, AlertTriangle, CheckCircle, Clock,
  Settings, Database, DollarSign, BookMarked, Shield, Activity
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
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
            <div className="text-2xl font-bold">3,124</div>
            <div className="text-xs text-muted-foreground mt-1">All roles combined</div>
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
            <div className="text-2xl font-bold">47</div>
            <div className="text-xs text-muted-foreground mt-1">Across all modules</div>
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
            <div className="text-2xl font-bold">234</div>
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
            <div className="text-2xl font-bold">Healthy</div>
            <div className="text-xs text-muted-foreground mt-1">All systems operational</div>
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
                  <span className="font-semibold">2,845</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dosen:</span>
                  <span className="font-semibold">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staff:</span>
                  <span className="font-semibold">137</span>
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
                  <span className="font-semibold">87</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Book Categories:</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Letter Types:</span>
                  <span className="font-semibold">15</span>
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
                  <span className="font-semibold text-amber-500">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exam Requests:</span>
                  <span className="font-semibold text-blue-500">28</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payments Due:</span>
                  <span className="font-semibold text-red-500">45</span>
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
            <div className="flex items-start gap-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">New user registered</p>
                <p className="text-muted-foreground">John Doe (Mahasiswa) - 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">KKP Application submitted</p>
                <p className="text-muted-foreground">Jane Smith - 15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-sm">
              <div className="h-2 w-2 rounded-full bg-amber-500 mt-2"></div>
              <div className="flex-1">
                <p className="font-medium">Payment verified</p>
                <p className="text-muted-foreground">Admin Keuangan - 1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

