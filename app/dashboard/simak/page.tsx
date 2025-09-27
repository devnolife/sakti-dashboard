"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CalendarClock,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Plus,
  Download,
  Settings,
} from "lucide-react"
import { useEffect, useState } from "react"
import { jadwalKuliahAPI, SystemStats } from "@/lib/api/jadwal-kuliah"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalProdis: number
  totalCourses: number
  activeSchedules: number
  pendingGeneration: number
  systemHealth: "excellent" | "good" | "warning" | "critical"
}

interface RecentActivity {
  id: string
  type: "schedule_generated" | "course_added" | "prodi_updated" | "file_uploaded"
  message: string
  timestamp: string
  status: "success" | "warning" | "error"
}

export default function SimakDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalProdis: 8,
    totalCourses: 342,
    activeSchedules: 12,
    pendingGeneration: 3,
    systemHealth: "excellent"
  })
  const [loading, setLoading] = useState(true)

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: "1",
      type: "schedule_generated",
      message: "Jadwal Informatika Semester Ganjil 2025-2026 berhasil dibuat",
      timestamp: "2 menit yang lalu",
      status: "success"
    },
    {
      id: "2",
      type: "course_added",
      message: "15 mata kuliah baru ditambahkan untuk Prodi Teknik Elektro",
      timestamp: "15 menit yang lalu",
      status: "success"
    },
    {
      id: "3",
      type: "file_uploaded",
      message: "File template jadwal diupload untuk review",
      timestamp: "1 jam yang lalu",
      status: "warning"
    },
    {
      id: "4",
      type: "prodi_updated",
      message: "Konfigurasi Prodi Sistem Informasi diperbarui",
      timestamp: "2 jam yang lalu",
      status: "success"
    }
  ])

  // Load data from API
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load system stats
        const statsResponse = await jadwalKuliahAPI.getSystemStats()
        if (statsResponse.success && statsResponse.data) {
          setStats({
            totalProdis: statsResponse.data.total_prodis,
            totalCourses: statsResponse.data.total_courses,
            activeSchedules: statsResponse.data.active_schedules,
            pendingGeneration: 3, // This would come from generation status endpoint
            systemHealth: statsResponse.data.system_health
          })
        }

        // Load prodis for additional info
        const prodisResponse = await jadwalKuliahAPI.getProdis(1, 50)
        if (prodisResponse.success && prodisResponse.data) {
          setStats(prev => ({
            ...prev,
            totalProdis: prodisResponse.data?.length || prev.totalProdis
          }))
        }

        setLoading(false)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent": return "text-green-500"
      case "good": return "text-blue-500"
      case "warning": return "text-yellow-500"
      case "critical": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const getHealthBadgeVariant = (health: string) => {
    switch (health) {
      case "excellent": return "default"
      case "good": return "secondary"
      case "warning": return "outline"
      case "critical": return "destructive"
      default: return "secondary"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "schedule_generated": return <CalendarClock className="w-4 h-4" />
      case "course_added": return <BookOpen className="w-4 h-4" />
      case "prodi_updated": return <GraduationCap className="w-4 h-4" />
      case "file_uploaded": return <FileText className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning": return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "error": return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            SIMAK Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sistem Informasi Manajemen Akademik - Kelola jadwal dan mata kuliah dengan mudah
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={getHealthBadgeVariant(stats.systemHealth)} className={`${getHealthColor(stats.systemHealth)} border-current`}>
            <Activity className="w-3 h-3 mr-1" />
            System {stats.systemHealth.charAt(0).toUpperCase() + stats.systemHealth.slice(1)}
          </Badge>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Program Studi
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{stats.totalProdis}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +2 dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Total Mata Kuliah
            </CardTitle>
            <BookOpen className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">{stats.totalCourses}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +28 mata kuliah baru
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Jadwal Aktif
            </CardTitle>
            <Calendar className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">{stats.activeSchedules}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              <CheckCircle className="w-3 h-3 inline mr-1" />
              Semua semester aktif
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Pending Generation
            </CardTitle>
            <CalendarClock className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">{stats.pendingGeneration}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              <Clock className="w-3 h-3 inline mr-1" />
              Menunggu approval
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
              <Sparkles className="w-5 h-5 mr-2 text-cyan-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950"
                onClick={() => router.push('/dashboard/simak/schedule-generation')}
              >
                <CalendarClock className="w-6 h-6 text-blue-500" />
                <span className="text-sm">Generate Jadwal</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-950"
                onClick={() => router.push('/dashboard/simak/courses')}
              >
                <BookOpen className="w-6 h-6 text-green-500" />
                <span className="text-sm">Tambah Mata Kuliah</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-950"
                onClick={() => router.push('/dashboard/simak/downloads')}
              >
                <Download className="w-6 h-6 text-purple-500" />
                <span className="text-sm">Export Data</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-300 dark:hover:bg-orange-950"
                onClick={() => router.push('/dashboard/simak/config')}
              >
                <Settings className="w-6 h-6 text-orange-500" />
                <span className="text-sm">Konfigurasi</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
              <BarChart3 className="w-5 h-5 mr-2 text-emerald-500" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Database Connection</span>
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Excellent
                </Badge>
              </div>
              <Progress value={98} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">API Response Time</span>
                <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Good
                </Badge>
              </div>
              <Progress value={85} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Storage Usage</span>
                <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                  65%
                </Badge>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
            <Activity className="w-5 h-5 mr-2 text-cyan-500" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="text-cyan-600 hover:text-cyan-700 border-cyan-200 hover:border-cyan-300">
              View All Activities
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
