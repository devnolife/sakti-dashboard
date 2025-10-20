"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Users,
  ClipboardCheck,
  Calendar,
  Bell,
  Clock,
  ChevronRight,
  GraduationCap,
  FileText,
  Star,
  Activity,
  PlusCircle,
  BookMarked,
  Award
} from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  dashboardData: any
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function ModernDashboardWithAPI({ dashboardData }: Props) {
  const { lecturer, stats, recentActivities, upcomingSchedule, quickStats } = dashboardData

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "meeting":
      case "bimbingan":
        return <Users className="h-4 w-4 text-green-600" />
      case "recommendation":
        return <BookMarked className="h-4 w-4 text-purple-600" />
      case "exam":
      case "ujian":
        return <GraduationCap className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { text: "Pending", color: "bg-orange-100 text-orange-700" },
      completed: { text: "Selesai", color: "bg-green-100 text-green-700" },
      approved: { text: "Disetujui", color: "bg-blue-100 text-blue-700" },
      scheduled: { text: "Terjadwal", color: "bg-purple-100 text-purple-700" }
    }
    const config = variants[status as keyof typeof variants] || variants.pending
    return <Badge className={config.color}>{config.text}</Badge>
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, {lecturer.name}!</h1>
            <p className="text-blue-100 text-lg">
              {lecturer.position} - {lecturer.department}
            </p>
            <p className="text-blue-200 text-sm mt-1">{lecturer.specialization}</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
                <Star className="h-4 w-4" />
                Rating Dosen
              </div>
              <div className="text-2xl font-bold">{stats.ratingDosen.toFixed(1)}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickStats.map((stat: any, index: number) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="hover:shadow-md transition-all duration-200 border-0 shadow-sm">
              <CardContent className="p-4">
                <div className={`inline-flex p-2 rounded-lg ${stat.bgColor} mb-2`}>
                  <Activity className={`h-4 w-4 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Statistics */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          {/* Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700">Pembimbing Akademik</Badge>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">{stats.totalMahasiswa}</div>
                <div className="text-green-600 font-medium">Total Mahasiswa Bimbingan</div>
                <div className="mt-3">
                  <Progress value={75} className="h-2 bg-green-200" />
                  <div className="text-xs text-green-600 mt-1">
                    {stats.bimbinganAktif} mahasiswa aktif bimbingan
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <ClipboardCheck className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">Aktif</Badge>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{stats.bimbinganAktif}</div>
                <div className="text-blue-600 font-medium">Bimbingan Aktif</div>
                <div className="mt-3">
                  <Progress
                    value={(stats.bimbinganAktif / stats.totalMahasiswa) * 100}
                    className="h-2 bg-blue-200"
                  />
                  <div className="text-xs text-blue-600 mt-1">
                    {stats.bimbinganKKP} KKP, {stats.bimbinganThesis} Skripsi
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">Ujian</Badge>
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">{stats.examsCompleted}</div>
                <div className="text-purple-600 font-medium">Ujian Selesai</div>
                <div className="mt-3">
                  <Progress value={90} className="h-2 bg-purple-200" />
                  <div className="text-xs text-purple-600 mt-1">
                    {stats.examsPending} ujian akan datang
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <BookMarked className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">Rekomendasi</Badge>
                </div>
                <div className="text-3xl font-bold text-orange-700 mb-1">{stats.rekomendasiJudul}</div>
                <div className="text-orange-600 font-medium">Rekomendasi Judul</div>
                <div className="mt-3">
                  <Progress value={80} className="h-2 bg-orange-200" />
                  <div className="text-xs text-orange-600 mt-1">
                    Judul tersedia untuk mahasiswa
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                Aksi Cepat
              </CardTitle>
              <CardDescription>Akses cepat ke fungsi yang sering digunakan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <BookMarked className="h-5 w-5" />
                  <span className="text-xs">Tambah Rekomendasi</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-xs">Jadwal Bimbingan</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">Review Draft</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                  <Award className="h-5 w-5" />
                  <span className="text-xs">Input Nilai</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Upcoming Schedule */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Jadwal Mendatang
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSchedule.length > 0 ? (
                upcomingSchedule.slice(0, 5).map((schedule: any) => (
                  <div key={schedule.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {getActivityIcon(schedule.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{schedule.title}</div>
                      <div className="text-xs text-muted-foreground">{schedule.student}</div>
                      <div className="text-xs text-primary font-medium">{schedule.date} • {schedule.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4">
                  Tidak ada jadwal mendatang
                </div>
              )}
              {upcomingSchedule.length > 5 && (
                <Button variant="ghost" className="w-full justify-center">
                  <span>Lihat Semua</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.length > 0 ? (
                recentActivities.slice(0, 5).map((activity: any) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="font-medium text-sm">{activity.title}</div>
                      <div className="text-xs text-muted-foreground">{activity.student}</div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-muted-foreground py-4">
                  Tidak ada aktivitas terbaru
                </div>
              )}
              {recentActivities.length > 5 && (
                <Button variant="ghost" className="w-full justify-center">
                  <span>Lihat Semua</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Ringkasan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-700">Mata Kuliah</div>
                <div className="text-xs text-blue-600">{stats.totalMataKuliah} mata kuliah semester ini</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-700">Bimbingan KKP</div>
                <div className="text-xs text-green-600">{stats.bimbinganKKP} mahasiswa dalam bimbingan</div>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-sm font-medium text-purple-700">Bimbingan Skripsi</div>
                <div className="text-xs text-purple-600">{stats.bimbinganThesis} mahasiswa dalam bimbingan</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
