"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  UserCheck,
  ClipboardCheck,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function DosenExamsPage() {
  const examStats = {
    totalScheduled: 5,
    studentsUnderGuidance: 12,
    examinerTasks: 7,
    gradingPending: 3,
  }

  const recentActivities = [
    {
      id: 1,
      type: "guidance",
      title: "Bimbingan KKP - Ahmad Fauzi",
      description: "Revisi proposal bab 2",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      type: "exam",
      title: "Ujian Seminar Proposal - Siti Nurhaliza",
      description: "Jadwal ujian 18 Januari 2024",
      date: "2024-01-12",
      status: "scheduled",
    },
    {
      id: 3,
      type: "grading",
      title: "Penilaian Ujian - Budi Santoso",
      description: "Ujian sidang selesai, menunggu nilai",
      date: "2024-01-10",
      status: "completed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            <Calendar className="h-3 w-3 mr-1" />
            Terjadwal
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Selesai
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dashboard Ujian
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Kelola jadwal ujian, bimbingan mahasiswa, dan tugas penguji Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ujian Terjadwal</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examStats.totalScheduled}</div>
            <p className="text-xs text-muted-foreground">ujian dalam minggu ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bimbingan Mahasiswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examStats.studentsUnderGuidance}</div>
            <p className="text-xs text-muted-foreground">mahasiswa aktif dibimbing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugas Penguji</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examStats.examinerTasks}</div>
            <p className="text-xs text-muted-foreground">ujian sebagai penguji</p>
            {examStats.examinerTasks > 0 && (
              <Badge variant="destructive" className="mt-2 text-xs">
                {examStats.examinerTasks} Baru
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Penilaian Tertunda</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{examStats.gradingPending}</div>
            <p className="text-xs text-muted-foreground">ujian perlu dinilai</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group hover:shadow-md transition-all duration-200 gradient-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Jadwal Ujian</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>
              Lihat dan kelola jadwal ujian yang akan datang
            </CardDescription>
            <Link href="/dashboard/dosen/exams/schedule">
              <Button className="w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Lihat Jadwal
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-200 gradient-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">List Bimbingan</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>
              Daftar mahasiswa yang sedang dibimbing
            </CardDescription>
            <Link href="/dashboard/dosen/exams/student-guidance">
              <Button className="w-full" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Lihat Bimbingan
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-200 gradient-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Menu Penguji</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>
              Kelola tugas sebagai penguji ujian mahasiswa
            </CardDescription>
            <Link href="/dashboard/dosen/exams/penguji">
              <Button className="w-full" variant="outline">
                <UserCheck className="h-4 w-4 mr-2" />
                Lihat Tugas Penguji
                {examStats.examinerTasks > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1.5 py-0.5 text-xs">
                    {examStats.examinerTasks}
                  </Badge>
                )}
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-md transition-all duration-200 gradient-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Penilaian Ujian</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <CardDescription>
              Input nilai dan feedback ujian mahasiswa
            </CardDescription>
            <Link href="/dashboard/dosen/exams/grading">
              <Button className="w-full" variant="outline">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Input Penilaian
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terkini</CardTitle>
          <CardDescription>
            Aktivitas ujian dan bimbingan yang memerlukan perhatian
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {activity.type === "guidance" && <BookOpen className="h-4 w-4 text-blue-500" />}
                    {activity.type === "exam" && <Calendar className="h-4 w-4 text-purple-500" />}
                    {activity.type === "grading" && <ClipboardCheck className="h-4 w-4 text-green-500" />}
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}