"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users, UserCheck, UserX, UserPlus, TrendingUp,
  GraduationCap, BookOpen, FileText, Shield,
  Activity, BarChart3, Settings, Download
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface Stats {
  users: {
    total: number
    active: number
    inactive: number
    newThisMonth: number
    byRole: {
      mahasiswa: number
      dosen: number
      staff_tu: number
      prodi: number
      dekan: number
      laboratory_admin: number
      admin_umum: number
      admin_keuangan: number
      kepala_tata_usaha: number
    }
  }
  prodi: Array<{
    kode: string
    nama: string
    _count: {
      students: number
      lecturers: number
      laboratory_admins: number
      staff: number
    }
  }>
  system: {
    letterRequests: number
    pendingLetters: number
    certificates: number
    laboratories: number
  }
  recentUsers: Array<{
    id: string
    username: string
    name: string
    role: string
    created_at: string
  }>
}

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")

      if (response.status === 403 || response.status === 401) {
        setError("Unauthorized: Anda harus login sebagai admin untuk mengakses halaman ini")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch stats")
      }

      const data = await response.json()
      setStats(data.stats)
    } catch (error: any) {
      console.error("Error fetching stats:", error)
      setError(error.message || "Failed to load statistics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Activity className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-6 w-6" />
              Error Loading Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              {error || "Failed to load statistics"}
            </p>
            {error?.includes("Unauthorized") && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Untuk mengakses halaman ini:</p>
                <ol className="list-decimal list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Login dengan akun admin</li>
                  <li>Username: <code className="bg-muted px-1 rounded">devnolife</code></li>
                  <li>Password: <code className="bg-muted px-1 rounded">samaKemarin00</code></li>
                </ol>
              </div>
            )}
            <Button onClick={() => window.location.reload()} className="w-full">
              Reload Page
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const roleIcons: Record<string, any> = {
    mahasiswa: GraduationCap,
    dosen: BookOpen,
    staff_tu: Users,
    prodi: Shield,
    dekan: Shield,
    laboratory_admin: Activity,
    admin_umum: Settings,
    admin_keuangan: BarChart3,
    kepala_tata_usaha: FileText
  }

  const roleLabels: Record<string, string> = {
    mahasiswa: "Mahasiswa",
    dosen: "Dosen",
    staff_tu: "Staff TU",
    prodi: "Prodi",
    dekan: "Dekan",
    laboratory_admin: "Lab Admin",
    admin_umum: "Admin Umum",
    admin_keuangan: "Admin Keuangan",
    kepala_tata_usaha: "Kepala Tata Usaha"
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Super Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage semua akun dan sistem secara terpusat
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/users">
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              Manage Users
            </Button>
          </Link>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.users.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +{stats.users.newThisMonth} bulan ini
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{stats.users.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.users.active / stats.users.total) * 100).toFixed(1)}% dari total
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200 bg-red-50/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{stats.users.inactive}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((stats.users.inactive / stats.users.total) * 100).toFixed(1)}% dari total
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-700">{stats.users.newThisMonth}</div>
            <p className="text-xs text-muted-foreground mt-1">
              User baru di bulan ini
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="roles" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roles">User by Role</TabsTrigger>
          <TabsTrigger value="prodi">Data by Prodi</TabsTrigger>
          <TabsTrigger value="system">System Stats</TabsTrigger>
        </TabsList>

        {/* Users by Role */}
        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(stats.users.byRole).map(([role, count]) => {
              const Icon = roleIcons[role] || Users
              return (
                <Card key={role} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-sm">{roleLabels[role]}</CardTitle>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{count}</div>
                    <p className="text-xs text-muted-foreground">
                      {((count / stats.users.total) * 100).toFixed(1)}% dari total
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Data by Prodi */}
        <TabsContent value="prodi" className="space-y-4">
          <div className="grid gap-4">
            {stats.prodi.map((prodi) => (
              <Card key={prodi.kode}>
                <CardHeader>
                  <CardTitle className="text-base">{prodi.nama}</CardTitle>
                  <CardDescription>Kode: {prodi.kode}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Mahasiswa</p>
                      <p className="text-2xl font-bold">{prodi._count.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Dosen</p>
                      <p className="text-2xl font-bold">{prodi._count.lecturers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lab Admin</p>
                      <p className="text-2xl font-bold">{prodi._count.laboratory_admins}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Staff TU</p>
                      <p className="text-2xl font-bold">{prodi._count.staff}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* System Statistics */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  Total Surat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.system.letterRequests}</div>
                <p className="text-xs text-muted-foreground">Letter requests</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 bg-yellow-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-yellow-600" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-700">
                  {stats.system.pendingLetters}
                </div>
                <p className="text-xs text-muted-foreground">Menunggu approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.system.certificates}</div>
                <p className="text-xs text-muted-foreground">Lab certificates</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-600" />
                  Laboratories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.system.laboratories}</div>
                <p className="text-xs text-muted-foreground">Total laboratories</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Users */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>10 user terbaru yang dibuat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {stats.recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{roleLabels[user.role] || user.role}</Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Aksi cepat untuk manage sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/admin/users">
              <Button variant="outline" className="w-full gap-2">
                <Users className="h-4 w-4" />
                User Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/roles">
              <Button variant="outline" className="w-full gap-2">
                <Shield className="h-4 w-4" />
                Role Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/prodi">
              <Button variant="outline" className="w-full gap-2">
                <GraduationCap className="h-4 w-4" />
                Prodi Management
              </Button>
            </Link>
            <Link href="/dashboard/admin/settings">
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-4 w-4" />
                System Settings
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
