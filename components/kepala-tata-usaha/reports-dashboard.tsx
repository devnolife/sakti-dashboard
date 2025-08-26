"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Legend,
  AreaChart,
  Area
} from "recharts"
import {
  FileText,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  BookOpen,
  ClipboardCheck,
  Building2,
  GraduationCap,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  FileSpreadsheet
} from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export default function KepalaTataUsahaReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-semester")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  // Report Overview Data
  const reportOverview = [
    {
      title: "Laporan Tersedia",
      value: "24",
      change: "+3",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50"
    },
    {
      title: "Laporan Terbaru",
      value: "8",
      change: "+2",
      icon: Clock,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50"
    },
    {
      title: "Total Akses",
      value: "1,247",
      change: "+12%",
      icon: Eye,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50"
    },
    {
      title: "Departemen Aktif",
      value: "5",
      change: "100%",
      icon: Building2,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-r from-orange-50 to-red-50"
    }
  ]

  // Monthly Report Generation Data
  const monthlyReports = [
    { month: "Jul", generated: 18, accessed: 145, departments: 5 },
    { month: "Aug", generated: 22, accessed: 167, departments: 5 },
    { month: "Sep", generated: 19, accessed: 134, departments: 4 },
    { month: "Oct", generated: 25, accessed: 189, departments: 5 },
    { month: "Nov", generated: 21, accessed: 156, departments: 5 },
    { month: "Dec", generated: 24, accessed: 198, departments: 5 }
  ]

  // Department Reports Distribution
  const departmentReports = [
    { name: "Teknik Sipil", value: 28, color: "#8b5cf6" },
    { name: "Arsitektur", value: 22, color: "#06b6d4" },
    { name: "Informatika", value: 20, color: "#10b981" },
    { name: "Teknik Elektro", value: 18, color: "#f59e0b" },
    { name: "Perencanaan Wilayah", value: 12, color: "#ef4444" }
  ]

  // Recent Reports
  const recentReports = [
    {
      title: "Laporan Akademik Semester Ganjil 2024",
      type: "Akademik",
      department: "Semua Jurusan",
      date: "2024-01-28",
      size: "2.4 MB",
      downloads: 45,
      status: "Published"
    },
    {
      title: "Analisis Kinerja Dosen - Q4 2023",
      type: "SDM",
      department: "Semua Jurusan",
      date: "2024-01-25",
      size: "1.8 MB",
      downloads: 32,
      status: "Published"
    },
    {
      title: "Laporan Keuangan Fakultas - Januari 2024",
      type: "Keuangan",
      department: "Administrasi",
      date: "2024-01-22",
      size: "3.2 MB",
      downloads: 28,
      status: "Published"
    },
    {
      title: "Statistik Mahasiswa per Jurusan",
      type: "Mahasiswa",
      department: "Semua Jurusan",
      date: "2024-01-20",
      size: "1.5 MB",
      downloads: 67,
      status: "Published"
    },
    {
      title: "Evaluasi Fasilitas dan Infrastruktur",
      type: "Fasilitas",
      department: "Umum",
      date: "2024-01-18",
      size: "4.1 MB",
      downloads: 19,
      status: "Draft"
    },
    {
      title: "Laporan Kegiatan PKM dan Penelitian",
      type: "Penelitian",
      department: "Semua Jurusan",
      date: "2024-01-15",
      size: "2.9 MB",
      downloads: 41,
      status: "Published"
    }
  ]

  // Report Categories
  const reportCategories = [
    {
      category: "Akademik",
      count: 8,
      icon: BookOpen,
      description: "Laporan aktivitas akademik dan pembelajaran",
      color: "text-blue-600 bg-blue-100"
    },
    {
      category: "Keuangan",
      count: 6,
      icon: DollarSign,
      description: "Laporan keuangan dan anggaran fakultas",
      color: "text-green-600 bg-green-100"
    },
    {
      category: "SDM",
      count: 4,
      icon: Users,
      description: "Laporan sumber daya manusia dan kepegawaian",
      color: "text-purple-600 bg-purple-100"
    },
    {
      category: "Mahasiswa",
      count: 3,
      icon: GraduationCap,
      description: "Laporan data dan aktivitas mahasiswa",
      color: "text-orange-600 bg-orange-100"
    },
    {
      category: "Fasilitas",
      count: 2,
      icon: Building2,
      description: "Laporan fasilitas dan infrastruktur",
      color: "text-red-600 bg-red-100"
    },
    {
      category: "Penelitian",
      count: 1,
      icon: ClipboardCheck,
      description: "Laporan kegiatan penelitian dan PKM",
      color: "text-indigo-600 bg-indigo-100"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "text-green-600 bg-green-100"
      case "Draft": return "text-orange-600 bg-orange-100"
      case "Review": return "text-blue-600 bg-blue-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Akademik": return "text-blue-600 bg-blue-100"
      case "Keuangan": return "text-green-600 bg-green-100"
      case "SDM": return "text-purple-600 bg-purple-100"
      case "Mahasiswa": return "text-orange-600 bg-orange-100"
      case "Fasilitas": return "text-red-600 bg-red-100"
      case "Penelitian": return "text-indigo-600 bg-indigo-100"
      default: return "text-gray-600 bg-gray-100"
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
            <FileText className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Laporan & Analitik Fakultas
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Sistem Pelaporan dan Analisis Data Fakultas Teknik</p>
        
        {/* Filters */}
        <div className="flex justify-center gap-4 mt-6">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-semester">Semester Saat Ini</SelectItem>
              <SelectItem value="last-semester">Semester Lalu</SelectItem>
              <SelectItem value="current-year">Tahun Ini</SelectItem>
              <SelectItem value="last-year">Tahun Lalu</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih Jurusan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jurusan</SelectItem>
              <SelectItem value="teknik-sipil">Teknik Sipil</SelectItem>
              <SelectItem value="arsitektur">Arsitektur</SelectItem>
              <SelectItem value="informatika">Informatika</SelectItem>
              <SelectItem value="teknik-elektro">Teknik Elektro</SelectItem>
              <SelectItem value="pwk">Perencanaan Wilayah Kota</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Report Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportOverview.map((metric, index) => (
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
        <TabsList className="grid w-full grid-cols-4 lg:w-2/3 mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
          <TabsTrigger value="categories">Kategori</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Reports Generation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                    <CardTitle>Pembuatan Laporan Bulanan</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyReports}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="generated" fill="#8b5cf6" name="Laporan Dibuat" />
                      <Bar dataKey="accessed" fill="#06b6d4" name="Total Akses" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Department Reports Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <PieChartIcon className="w-6 h-6 text-green-500" />
                    <CardTitle>Distribusi Laporan per Jurusan</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentReports}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentReports.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-6 h-6 text-orange-500" />
                    <CardTitle>Laporan Terbaru</CardTitle>
                  </div>
                  <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    Export All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{report.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(report.type)}>
                              {report.type}
                            </Badge>
                            <Badge variant="outline">{report.department}</Badge>
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Tanggal:</span> {report.date}
                        </div>
                        <div>
                          <span className="font-medium">Ukuran:</span> {report.size}
                        </div>
                        <div>
                          <span className="font-medium">Download:</span> {report.downloads}x
                        </div>
                        <div className="flex items-center gap-1">
                          {report.status === 'Published' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                          )}
                          <span className="font-medium">{report.status}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-indigo-500" />
                  <CardTitle>Tren Akses Laporan</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={monthlyReports}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="accessed"
                      stackId="1"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.6}
                      name="Total Akses"
                    />
                    <Area
                      type="monotone"
                      dataKey="generated"
                      stackId="2"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      fillOpacity={0.6}
                      name="Laporan Dibuat"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-lg font-semibold">
                        {category.count}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {category.category}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Lihat Laporan
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6" />
              <CardTitle>Aksi Cepat</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Buat Laporan Baru", icon: FileText },
                { label: "Schedule Report", icon: Calendar },
                { label: "Export Data", icon: Download },
                { label: "Analisis Mendalam", icon: BarChart3 }
              ].map((action, index) => (
                <motion.div
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-16 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white backdrop-blur-sm"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <action.icon className="w-5 h-5" />
                      <span className="text-xs">{action.label}</span>
                    </div>
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