"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts"
import {
  Crown,
  Building,
  Users,
  FileText,
  DollarSign,
  GraduationCap,
  BarChart3,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertTriangle,
  Target,
  Settings,
  Briefcase,
  ClipboardList,
  Eye,
  Edit,
  Plus,
  Download
} from "lucide-react"
import { motion } from "framer-motion"

export default function KepalaTataUsahaDashboard() {
  // Administrative Operations Metrics
  const adminMetrics = [
    {
      title: "Total Staf",
      value: "156",
      change: "+3 bulan ini",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50"
    },
    {
      title: "Dokumen Diproses",
      value: "2,847",
      change: "+12% minggu ini",
      icon: FileText,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50"
    },
    {
      title: "Alokasi Anggaran",
      value: "85.2%",
      change: "Sesuai target",
      icon: DollarSign,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50"
    },
    {
      title: "Efisiensi Layanan",
      value: "94.8%",
      change: "+2.1% peningkatan",
      icon: Target,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-r from-orange-50 to-red-50"
    }
  ]

  // Department Performance Data
  const departmentPerformance = [
    { department: "Administrasi Akademik", efficiency: 92, staff: 28, budget: 85000, satisfaction: 4.5 },
    { department: "Layanan Mahasiswa", efficiency: 89, staff: 35, budget: 65000, satisfaction: 4.3 },
    { department: "Keuangan", efficiency: 96, staff: 18, budget: 45000, satisfaction: 4.6 },
    { department: "Kepegawaian", efficiency: 87, staff: 22, budget: 55000, satisfaction: 4.2 },
    { department: "Sarana Prasarana", efficiency: 91, staff: 31, budget: 120000, satisfaction: 4.4 },
    { department: "Teknologi Informasi", efficiency: 94, staff: 15, budget: 75000, satisfaction: 4.5 }
  ]

  // Budget Utilization Data
  const budgetData = [
    { month: "Jul", allocated: 850000, spent: 720000, remaining: 130000 },
    { month: "Aug", allocated: 870000, spent: 750000, remaining: 120000 },
    { month: "Sep", allocated: 890000, spent: 780000, remaining: 110000 },
    { month: "Oct", allocated: 910000, spent: 810000, remaining: 100000 },
    { month: "Nov", allocated: 930000, spent: 835000, remaining: 95000 },
    { month: "Dec", allocated: 950000, spent: 860000, remaining: 90000 }
  ]

  // Staff Performance Distribution
  const staffPerformance = [
    { rating: "Sangat Baik", count: 89, percentage: 57, color: "#10b981" },
    { rating: "Baik", count: 45, percentage: 29, color: "#3b82f6" },
    { rating: "Cukup", count: 18, percentage: 12, color: "#f59e0b" },
    { rating: "Perlu Perbaikan", count: 4, percentage: 2, color: "#ef4444" }
  ]

  // Recent Administrative Activities
  const recentActivities = [
    {
      activity: "Rapat Evaluasi Anggaran",
      department: "Keuangan",
      type: "meeting",
      timestamp: "2 jam yang lalu",
      status: "Completed",
      participants: 8
    },
    {
      activity: "Evaluasi Kinerja Staf",
      department: "Kepegawaian",
      type: "evaluation",
      timestamp: "4 jam yang lalu",
      status: "In Progress",
      staff: 15
    },
    {
      activity: "Proses Persetujuan Dokumen",
      department: "Administrasi Akademik",
      type: "approval",
      timestamp: "6 jam yang lalu",
      status: "Pending",
      documents: 23
    },
    {
      activity: "Review Layanan Mahasiswa",
      department: "Layanan Mahasiswa",
      type: "review",
      timestamp: "1 hari yang lalu",
      status: "Completed",
      requests: 45
    }
  ]

  // Urgent Tasks and Priorities
  const urgentTasks = [
    {
      task: "Pengajuan Anggaran Tahunan",
      priority: "High",
      deadline: "Hari ini",
      department: "Keuangan",
      progress: 85
    },
    {
      task: "Jadwal Pelatihan Staf",
      priority: "Medium",
      deadline: "Besok",
      department: "Kepegawaian",
      progress: 60
    },
    {
      task: "Persetujuan Maintenance Fasilitas",
      priority: "High",
      deadline: "2 hari",
      department: "Sarana Prasarana",
      progress: 40
    },
    {
      task: "Update Sistem Registrasi Mahasiswa",
      priority: "Medium",
      deadline: "3 hari",
      department: "Teknologi Informasi",
      progress: 75
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Pending": return "bg-orange-100 text-orange-800"
      case "Overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800"
      case "Medium": return "bg-yellow-100 text-yellow-800"
      case "Low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
      {/* Header Section */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <Crown className="w-10 h-10 text-indigo-600" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Kepala Tata Usaha
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Manajemen Operasional Administrasi & Pengawasan Fakultas Teknik</p>
      </motion.div>

      {/* Key Administrative Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`${metric.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-600">{metric.change}</span>
                    </div>
                  </div>
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <metric.icon className="w-6 h-6 text-white" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="staff">Manajemen Staf</TabsTrigger>
          <TabsTrigger value="budget">Anggaran</TabsTrigger>
          <TabsTrigger value="operations">Operasional</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Performance Chart */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-600" />
                  Efisiensi Departemen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="department"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-green-600" />
                  Aktivitas Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="p-3 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm text-gray-800">{activity.activity}</h4>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{activity.department}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{activity.timestamp}</span>
                        <div className="flex gap-2">
                          {activity.participants && <span>{activity.participants} participants</span>}
                          {activity.staff && <span>{activity.staff} staff</span>}
                          {activity.documents && <span>{activity.documents} documents</span>}
                          {activity.requests && <span>{activity.requests} requests</span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Urgent Tasks */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Tugas Mendesak & Prioritas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {urgentTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">{task.task}</h4>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tenggat: {task.deadline}</span>
                        <span className="text-gray-600">{task.progress}% selesai</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                      <p className="text-xs text-gray-500">{task.department}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Staff Management Tab */}
        <TabsContent value="staff" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                Distribusi Kinerja Staf
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={staffPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ rating, percentage }) => `${rating}: ${percentage}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {staffPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget & Resources Tab */}
        <TabsContent value="budget" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Tren Utilisasi Anggaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="allocated" stroke="#3b82f6" strokeWidth={2} name="Allocated" />
                  <Line type="monotone" dataKey="spent" stroke="#10b981" strokeWidth={2} name="Spent" />
                  <Line type="monotone" dataKey="remaining" stroke="#f59e0b" strokeWidth={2} name="Remaining" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Pemrosesan Dokumen", value: "98.5%", subtitle: "Tingkat Penyelesaian", icon: FileText, color: "text-blue-600" },
              { title: "Penyampaian Layanan", value: "96.2%", subtitle: "Skor Kualitas", icon: Target, color: "text-green-600" },
              { title: "Efisiensi Proses", value: "94.8%", subtitle: "Level Optimasi", icon: Settings, color: "text-purple-600" }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <metric.icon className={`w-12 h-12 mx-auto mb-4 ${metric.color}`} />
                    <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                Alokasi Sumber Daya Departemen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="department"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="staff" fill="#8b5cf6" name="Staff Count" />
                  <Bar dataKey="budget" fill="#06b6d4" name="Budget (in thousands)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Aksi Administratif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Setujui Dokumen", icon: CheckCircle, count: "23" },
                { label: "Review Anggaran", icon: DollarSign, count: "5" },
                { label: "Laporan Staf", icon: Users, count: "12" },
                { label: "Buat Analitik", icon: BarChart3, count: "3" }
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="w-full h-auto p-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm flex flex-col gap-2"
                    variant="outline"
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{action.label}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      {action.count}
                    </Badge>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
