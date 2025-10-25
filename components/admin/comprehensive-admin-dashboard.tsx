"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings, Database, Users, Activity, AlertTriangle, CheckCircle,
  Workflow, Bell, FileText, Calendar, Link2, TrendingUp, Server,
  Shield, Clock, DollarSign, BookMarked, Zap, BarChart3
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

export default function ComprehensiveAdminDashboard() {
  const { t } = useI18n()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [systemHealth, setSystemHealth] = useState<any>(null)

  useEffect(() => {
    fetchDashboardData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('session-token')
      const response = await fetch('/api/admin/dashboard/comprehensive', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
        setSystemHealth(data.systemHealth)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-4 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
            {t('admin.dashboard')}
          </span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          {t('admin.welcome')}
        </p>
      </div>

      {/* System Health Banner */}
      <Card className="overflow-hidden border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-transparent dark:from-green-950/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">System Status: Operational</h3>
                <p className="text-sm text-muted-foreground">
                  Uptime: 99.9% | Avg Response: 120ms | All services running
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/admin/monitoring">
                <Activity className="w-4 h-4 mr-2" />
                Detail Monitoring
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Konfigurasi</CardTitle>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">45 diubah hari ini</p>
          </CardContent>
        </Card>

        <Card className="gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+124 dari bulan lalu</p>
          </CardContent>
        </Card>

        <Card className="gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">3</div>
            <p className="text-xs text-muted-foreground">Perlu perhatian</p>
          </CardContent>
        </Card>

        <Card className="gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2K</div>
            <p className="text-xs text-green-500">+12.5% uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Management Sections */}
      <Tabs defaultValue="system" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* System Configuration */}
            <Link href="/dashboard/admin/system-config">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Settings className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle>System Configuration</CardTitle>
                  </div>
                  <CardDescription>Pengaturan sistem aplikasi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">General Settings</span>
                      <Badge variant="outline">47</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Feature Flags</span>
                      <Badge variant="outline">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Security Settings</span>
                      <Badge variant="outline">8</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Master Data */}
            <Link href="/dashboard/admin/master-data">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Database className="w-5 h-5 text-purple-500" />
                    </div>
                    <CardTitle>Master Data</CardTitle>
                  </div>
                  <CardDescription>Kelola data master sistem</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Program Studi</span>
                      <Badge variant="outline">28</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Departments</span>
                      <Badge variant="outline">15</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Categories</span>
                      <Badge variant="outline">45</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* User Management */}
            <Link href="/dashboard/admin/manajemen-pengguna">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <CardTitle>User Management</CardTitle>
                  </div>
                  <CardDescription>Kelola pengguna & roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Users</span>
                      <Badge variant="outline">1,248</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Today</span>
                      <Badge variant="outline" className="text-green-500">327</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Pending</span>
                      <Badge variant="destructive">5</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Academic Calendar */}
            <Link href="/dashboard/admin/academic-calendar">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/10">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                    </div>
                    <CardTitle>Academic Calendar</CardTitle>
                  </div>
                  <CardDescription>Kelola tahun akademik & semester</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Period</span>
                      <Badge>2024 Ganjil</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Registration</span>
                      <Badge variant="outline">Open</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Next Period</span>
                      <Badge variant="secondary">2024 Genap</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Approval Workflows */}
            <Link href="/dashboard/admin/workflows">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <Workflow className="w-5 h-5 text-orange-500" />
                    </div>
                    <CardTitle>Approval Workflows</CardTitle>
                  </div>
                  <CardDescription>Konfigurasi alur persetujuan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">KKP Workflow</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Exam Workflow</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Letter Workflow</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Course Management */}
            <Link href="/dashboard/admin/courses">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-emerald-500/10">
                      <BookMarked className="w-5 h-5 text-emerald-500" />
                    </div>
                    <CardTitle>Course Management</CardTitle>
                  </div>
                  <CardDescription>Kelola mata kuliah</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Courses</span>
                      <Badge variant="outline">156</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active This Sem</span>
                      <Badge variant="outline">89</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Need Review</span>
                      <Badge variant="destructive">3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Notification Management */}
            <Link href="/dashboard/admin/notifications">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                      <Bell className="w-5 h-5 text-yellow-500" />
                    </div>
                    <CardTitle>Notifications</CardTitle>
                  </div>
                  <CardDescription>Kelola template & channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email Templates</span>
                      <Badge variant="outline">24</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Push Templates</span>
                      <Badge variant="outline">18</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sent Today</span>
                      <Badge variant="outline">1,247</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Document Templates */}
            <Link href="/dashboard/admin/document-templates">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-pink-500/10">
                      <FileText className="w-5 h-5 text-pink-500" />
                    </div>
                    <CardTitle>Document Templates</CardTitle>
                  </div>
                  <CardDescription>Kelola template dokumen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Letter Templates</span>
                      <Badge variant="outline">34</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Certificate Templates</span>
                      <Badge variant="outline">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Report Templates</span>
                      <Badge variant="outline">8</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Backup & Recovery */}
            <Link href="/dashboard/admin/maintenance/backup">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-cyan-500/10">
                      <Server className="w-5 h-5 text-cyan-500" />
                    </div>
                    <CardTitle>Backup & Recovery</CardTitle>
                  </div>
                  <CardDescription>Kelola backup database</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Backup</span>
                      <Badge variant="outline">2 hours ago</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total Backups</span>
                      <Badge variant="outline">47</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <Badge variant="outline">2.3 GB</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* API Integrations */}
            <Link href="/dashboard/admin/integrations">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Link2 className="w-5 h-5 text-violet-500" />
                    </div>
                    <CardTitle>API Integrations</CardTitle>
                  </div>
                  <CardDescription>Kelola integrasi external</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">GraphQL SIMAK</span>
                      <Badge variant="outline" className="text-green-500">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Payment Gateway</span>
                      <Badge variant="outline" className="text-green-500">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Email Service</span>
                      <Badge variant="outline" className="text-green-500">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Sync Management */}
            <Link href="/dashboard/admin/sync-management">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-teal-500/10">
                      <Zap className="w-5 h-5 text-teal-500" />
                    </div>
                    <CardTitle>Sync Management</CardTitle>
                  </div>
                  <CardDescription>Kelola sinkronisasi data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Mahasiswa Sync</span>
                      <Badge variant="outline">Auto</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Sync</span>
                      <Badge variant="outline">15 min ago</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Pending</span>
                      <Badge variant="destructive">0</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* API Documentation */}
            <Link href="/dashboard/admin/api-docs">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-rose-500/10">
                      <FileText className="w-5 h-5 text-rose-500" />
                    </div>
                    <CardTitle>API Documentation</CardTitle>
                  </div>
                  <CardDescription>API reference & docs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Endpoints</span>
                      <Badge variant="outline">147</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">API Version</span>
                      <Badge variant="outline">v2.1.0</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant="outline" className="text-green-500">Stable</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        {/* Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* System Monitoring */}
            <Link href="/dashboard/admin/monitoring">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Activity className="w-5 h-5 text-green-500" />
                    </div>
                    <CardTitle>System Monitoring</CardTitle>
                  </div>
                  <CardDescription>Real-time system metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">CPU Usage</span>
                      <Badge variant="outline">23%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Memory</span>
                      <Badge variant="outline">4.2 GB / 16 GB</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Disk</span>
                      <Badge variant="outline">45% Used</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Audit Logs */}
            <Link href="/dashboard/admin/audit-logs">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-500/10">
                      <Shield className="w-5 h-5 text-slate-500" />
                    </div>
                    <CardTitle>Audit Logs</CardTitle>
                  </div>
                  <CardDescription>Tracking & security logs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Today's Events</span>
                      <Badge variant="outline">1,247</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Critical</span>
                      <Badge variant="destructive">0</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Warnings</span>
                      <Badge variant="outline" className="text-amber-500">3</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Analytics */}
            <Link href="/dashboard/admin/analytics">
              <Card className="overflow-hidden gradient-border card-hover cursor-pointer h-full transition-all hover:shadow-lg hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <BarChart3 className="w-5 h-5 text-blue-500" />
                    </div>
                    <CardTitle>Analytics & Reports</CardTitle>
                  </div>
                  <CardDescription>Insights & statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Users</span>
                      <Badge variant="outline">1,248</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">API Calls Today</span>
                      <Badge variant="outline">45.2K</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Avg Response</span>
                      <Badge variant="outline" className="text-green-500">120ms</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="overflow-hidden border-2 border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Quick Actions
          </CardTitle>
          <CardDescription>Akses cepat ke fungsi admin yang sering digunakan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            <Button variant="outline" size="sm" asChild className="justify-start">
              <Link href="/dashboard/admin/manajemen-pengguna">
                <Users className="w-4 h-4 mr-2" />
                Add User
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start">
              <Link href="/dashboard/admin/system-config">
                <Settings className="w-4 h-4 mr-2" />
                Edit Config
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start">
              <Link href="/dashboard/admin/maintenance/backup">
                <Database className="w-4 h-4 mr-2" />
                Backup Now
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start">
              <Link href="/dashboard/admin/audit-logs">
                <Shield className="w-4 h-4 mr-2" />
                View Logs
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start">
              <Link href="/dashboard/admin/monitoring">
                <Activity className="w-4 h-4 mr-2" />
                Monitor
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="justify-start">
              <Link href="/dashboard/admin/approval-override">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Override
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

