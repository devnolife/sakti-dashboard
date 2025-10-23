"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  ClipboardList,
  Crown,
  BookOpen,
  DollarSign,
  FlaskConical,
  BookMarked,
  Eye,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react"

interface RoleView {
  id: string
  name: string
  displayName: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  userCount: number
  activeNow: number
  viewUrl: string
  color: string
}

export default function RoleDashboardsPage() {
  const roleViews: RoleView[] = [
    {
      id: "mahasiswa",
      name: "mahasiswa",
      displayName: "Mahasiswa",
      icon: Users,
      description: "Lihat dashboard dari perspektif mahasiswa",
      userCount: 1245,
      activeNow: 87,
      viewUrl: "/dashboard/admin/view/mahasiswa",
      color: "blue"
    },
    {
      id: "dosen",
      name: "dosen",
      displayName: "Dosen",
      icon: GraduationCap,
      description: "Lihat dashboard dan fitur dosen",
      userCount: 89,
      activeNow: 23,
      viewUrl: "/dashboard/admin/view/dosen",
      color: "purple"
    },
    {
      id: "staff-tu",
      name: "staff_tu",
      displayName: "Staff TU",
      icon: ClipboardList,
      description: "Lihat dashboard administrasi akademik",
      userCount: 15,
      activeNow: 8,
      viewUrl: "/dashboard/admin/view/staff-tu",
      color: "green"
    },
    {
      id: "dekan",
      name: "dekan",
      displayName: "Dekan",
      icon: Crown,
      description: "Lihat dashboard eksekutif dan laporan",
      userCount: 1,
      activeNow: 1,
      viewUrl: "/dashboard/admin/view/dekan",
      color: "amber"
    },
    {
      id: "prodi",
      name: "prodi",
      displayName: "Kepala Prodi",
      icon: BookOpen,
      description: "Lihat dashboard program studi",
      userCount: 3,
      activeNow: 2,
      viewUrl: "/dashboard/admin/view/prodi",
      color: "indigo"
    },
    {
      id: "keuangan",
      name: "admin_keuangan",
      displayName: "Admin Keuangan",
      icon: DollarSign,
      description: "Lihat dashboard keuangan dan pembayaran",
      userCount: 5,
      activeNow: 3,
      viewUrl: "/dashboard/admin/view/keuangan",
      color: "emerald"
    },
    {
      id: "laboratory",
      name: "laboratory",
      displayName: "Admin Laboratorium",
      icon: FlaskConical,
      description: "Lihat dashboard laboratorium",
      userCount: 8,
      activeNow: 4,
      viewUrl: "/dashboard/admin/view/laboratory",
      color: "cyan"
    },
    {
      id: "library",
      name: "library",
      displayName: "Perpustakaan",
      icon: BookMarked,
      description: "Lihat dashboard perpustakaan",
      userCount: 4,
      activeNow: 2,
      viewUrl: "/dashboard/admin/view/library",
      color: "orange"
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
      green: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
      amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
      emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
      cyan: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
      orange: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="container mx-auto p-6 space-y-6 mt-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard per Role</h1>
        <p className="text-muted-foreground mt-1">
          Akses dan monitor dashboard dari perspektif setiap role dalam sistem
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{roleViews.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Role tersedia
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {roleViews.reduce((sum, role) => sum + role.userCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pengguna terdaftar
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {roleViews.reduce((sum, role) => sum + role.activeNow, 0)}
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Pengguna online
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {Math.round(
                (roleViews.reduce((sum, role) => sum + role.activeNow, 0) /
                  roleViews.reduce((sum, role) => sum + role.userCount, 0)) *
                100
              )}%
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Tingkat aktivitas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Role Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {roleViews.map((role) => {
          const Icon = role.icon
          const colors = getColorClasses(role.color)
          const activityRate = Math.round((role.activeNow / role.userCount) * 100)

          return (
            <Card
              key={role.id}
              className={`hover:shadow-lg transition-all duration-300 border-2 ${colors.border}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div
                    className={`p-3 rounded-lg ${colors.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={`${colors.bg} ${colors.text}`}
                  >
                    {role.activeNow} Online
                  </Badge>
                </div>
                <CardTitle className="mt-4">{role.displayName}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* User Statistics */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Users</span>
                    <span className="font-medium">{role.userCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Active Now</span>
                    <span className="font-medium flex items-center gap-1">
                      {role.activeNow}
                      <Activity className="h-3 w-3 text-green-500" />
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Activity Rate</span>
                    <span className="font-medium">{activityRate}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg.replace("50", "500")}`}
                      style={{ width: `${activityRate}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    asChild
                    className="flex-1"
                    variant="default"
                  >
                    <Link href={role.viewUrl}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Info Alert */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900">Info</h3>
              <p className="text-sm text-blue-700 mt-1">
                View Dashboard akan menampilkan interface dan fitur persis seperti yang dilihat oleh role tersebut.
                Anda dapat melihat semua menu, data, dan fungsi yang tersedia untuk setiap role,
                namun dalam mode read-only untuk monitoring dan troubleshooting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
