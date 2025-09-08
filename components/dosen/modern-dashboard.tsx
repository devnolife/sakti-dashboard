"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Users,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  Award,
  Bell,
  Clock,
  ChevronRight,
  GraduationCap,
  FileText,
  Star,
  Activity,
  BarChart3,
  PlusCircle,
  MessageSquare,
  BookMarked
} from "lucide-react"
import { motion } from "framer-motion"

const mockData = {
  stats: {
    totalMahasiswa: 45,
    bimbinganAktif: 12,
    tugasAkhirSelesai: 8,
    rekomendasiJudul: 15,
    ratingDosen: 4.8,
    totalMataKuliah: 6
  },
  recentActivities: [
    {
      id: 1,
      type: "submission",
      title: "Draft Proposal KKP",
      student: "Ahmad Fauzi",
      time: "2 jam yang lalu",
      status: "pending"
    },
    {
      id: 2,
      type: "meeting",
      title: "Bimbingan Skripsi",
      student: "Siti Nurhaliza",
      time: "1 hari yang lalu",
      status: "completed"
    },
    {
      id: 3,
      type: "recommendation",
      title: "Rekomendasi Judul Diambil",
      student: "Budi Santoso",
      time: "2 hari yang lalu",
      status: "approved"
    },
    {
      id: 4,
      type: "exam",
      title: "Ujian Proposal",
      student: "Lisa Andriani",
      time: "3 hari yang lalu",
      status: "scheduled"
    }
  ],
  upcomingSchedule: [
    {
      id: 1,
      title: "Bimbingan KKP",
      student: "Ahmad Fauzi",
      time: "10:00",
      date: "Hari ini",
      type: "bimbingan"
    },
    {
      id: 2,
      title: "Ujian Proposal",
      student: "Siti Nurhaliza",
      time: "14:00",
      date: "Besok",
      type: "ujian"
    },
    {
      id: 3,
      title: "Review Draft",
      student: "Budi Santoso",
      time: "09:00",
      date: "Senin",
      type: "review"
    }
  ],
  quickStats: [
    { title: "Pending Review", count: 5, color: "text-orange-600", bgColor: "bg-orange-100" },
    { title: "Jadwal Hari Ini", count: 3, color: "text-blue-600", bgColor: "bg-blue-100" },
    { title: "Deadline Minggu Ini", count: 7, color: "text-red-600", bgColor: "bg-red-100" },
    { title: "Selesai Bulan Ini", count: 12, color: "text-green-600", bgColor: "bg-green-100" }
  ]
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

export default function ModernDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "meeting":
        return <Users className="h-4 w-4 text-green-600" />
      case "recommendation":
        return <BookMarked className="h-4 w-4 text-purple-600" />
      case "exam":
        return <GraduationCap className="h-4 w-4 text-orange-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary", text: "Pending", color: "bg-orange-100 text-orange-700" },
      completed: { variant: "outline", text: "Selesai", color: "bg-green-100 text-green-700" },
      approved: { variant: "default", text: "Disetujui", color: "bg-blue-100 text-blue-700" },
      scheduled: { variant: "secondary", text: "Terjadwal", color: "bg-purple-100 text-purple-700" }
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
            <h1 className="text-3xl font-bold mb-2">Selamat Datang, Dr. Budi!</h1>
            <p className="text-blue-100 text-lg">Mari kelola bimbingan dan penelitian mahasiswa Anda hari ini</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
                <Star className="h-4 w-4" />
                Rating Dosen
              </div>
              <div className="text-2xl font-bold">{mockData.stats.ratingDosen}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mockData.quickStats.map((stat, index) => (
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
                  <Badge className="bg-green-100 text-green-700">+12% bulan ini</Badge>
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">{mockData.stats.totalMahasiswa}</div>
                <div className="text-green-600 font-medium">Total Mahasiswa Bimbingan</div>
                <div className="mt-3">
                  <Progress value={75} className="h-2 bg-green-200" />
                  <div className="text-xs text-green-600 mt-1">75% aktif melakukan bimbingan</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <ClipboardCheck className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">+5 minggu ini</Badge>
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{mockData.stats.bimbinganAktif}</div>
                <div className="text-blue-600 font-medium">Bimbingan Aktif</div>
                <div className="mt-3">
                  <Progress value={60} className="h-2 bg-blue-200" />
                  <div className="text-xs text-blue-600 mt-1">8 KKP, 4 Skripsi dalam progress</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-500 p-2 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">98% success rate</Badge>
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">{mockData.stats.tugasAkhirSelesai}</div>
                <div className="text-purple-600 font-medium">Tugas Akhir Selesai</div>
                <div className="mt-3">
                  <Progress value={90} className="h-2 bg-purple-200" />
                  <div className="text-xs text-purple-600 mt-1">Semester ini</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <BookMarked className="h-6 w-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">3 diambil minggu ini</Badge>
                </div>
                <div className="text-3xl font-bold text-orange-700 mb-1">{mockData.stats.rekomendasiJudul}</div>
                <div className="text-orange-600 font-medium">Rekomendasi Judul</div>
                <div className="mt-3">
                  <Progress value={80} className="h-2 bg-orange-200" />
                  <div className="text-xs text-orange-600 mt-1">12 tersedia, 3 diambil</div>
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
              {mockData.upcomingSchedule.map((schedule) => (
                <div key={schedule.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{schedule.title}</div>
                    <div className="text-xs text-muted-foreground">{schedule.student}</div>
                    <div className="text-xs text-primary font-medium">{schedule.date} • {schedule.time}</div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full justify-center">
                <span>Lihat Semua</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
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
              {mockData.recentActivities.map((activity) => (
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
              ))}
              <Button variant="ghost" className="w-full justify-center">
                <span>Lihat Semua</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikasi
                <Badge variant="destructive" className="ml-auto">3</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-sm font-medium text-red-700">Deadline Mendekati</div>
                <div className="text-xs text-red-600">2 mahasiswa perlu submit draft dalam 2 hari</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-700">Ujian Proposal</div>
                <div className="text-xs text-blue-600">Ahmad Fauzi - Besok 14:00</div>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm font-medium text-green-700">Draft Disetujui</div>
                <div className="text-xs text-green-600">Siti Nurhaliza - Siap ujian proposal</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}