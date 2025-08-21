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
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  GraduationCap,
  BookOpen,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Award,
  Eye,
  BarChart3,
  Settings,
  UserCheck,
  Zap,
  Activity
} from "lucide-react"
import { motion } from "framer-motion"

export default function GKMDashboard() {
  // Quality Metrics Data
  const qualityMetrics = [
    {
      title: "Standar Akademik",
      value: "96.5%",
      change: "+2.3%",
      icon: ShieldCheck,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-r from-green-50 to-emerald-50"
    },
    {
      title: "Kesesuaian Kurikulum",
      value: "94.2%",
      change: "+1.8%",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50"
    },
    {
      title: "Kinerja Dosen",
      value: "92.8%",
      change: "+0.5%",
      icon: Users,
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-r from-purple-50 to-violet-50"
    },
    {
      title: "Kepuasan Mahasiswa",
      value: "89.4%",
      change: "+3.2%",
      icon: GraduationCap,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-r from-orange-50 to-red-50"
    }
  ]

  // Academic Performance Trends
  const performanceData = [
    { semester: "Sem 1", gpa: 3.42, satisfaction: 88, completion: 94 },
    { semester: "Sem 2", gpa: 3.48, satisfaction: 89, completion: 96 },
    { semester: "Sem 3", gpa: 3.51, satisfaction: 91, completion: 95 },
    { semester: "Sem 4", gpa: 3.56, satisfaction: 89, completion: 97 },
    { semester: "Sem 5", gpa: 3.59, satisfaction: 92, completion: 98 },
    { semester: "Current", gpa: 3.62, satisfaction: 89, completion: 96 }
  ]

  // Quality Indicators
  const qualityIndicators = [
    { name: "Kualitas Pengajaran", value: 85, color: "#8b5cf6" },
    { name: "Output Penelitian", value: 78, color: "#06b6d4" },
    { name: "Keterlibatan Mahasiswa", value: 92, color: "#10b981" },
    { name: "Infrastruktur", value: 88, color: "#f59e0b" },
    { name: "Relevansi Industri", value: 82, color: "#ef4444" }
  ]

  // Recent Audits & Reviews
  const recentAudits = [
    {
      type: "Audit Internal",
      department: "Teknik Sipil (Pengairan)",
      status: "Completed",
      score: 94,
      date: "2024-01-15",
      findings: 3,
      severity: "Low"
    },
    {
      type: "Review Kurikulum",
      department: "Arsitektur",
      status: "In Progress",
      score: 87,
      date: "2024-01-20",
      findings: 5,
      severity: "Medium"
    },
    {
      type: "Persiapan Akreditasi",
      department: "Informatika",
      status: "Completed",
      score: 92,
      date: "2024-01-25",
      findings: 2,
      severity: "Low"
    },
    {
      type: "Evaluasi Eksternal",
      department: "Teknik Elektro",
      status: "In Progress",
      score: 89,
      date: "2024-01-30",
      findings: 4,
      severity: "Medium"
    },
    {
      type: "Assessment Mutu",
      department: "Perencanaan Wilayah Kota",
      status: "Scheduled",
      score: null,
      date: "2024-02-05",
      findings: 0,
      severity: "None"
    }
  ]

  // Faculty Performance Overview
  const facultyPerformance = [
    {
      category: "Keunggulan Mengajar",
      current: 92,
      target: 95,
      status: "On Track"
    },
    {
      category: "Publikasi Penelitian",
      current: 78,
      target: 85,
      status: "Needs Improvement"
    },
    {
      category: "Pengabdian Masyarakat",
      current: 88,
      target: 90,
      status: "Good"
    },
    {
      category: "Pengembangan Profesi",
      current: 85,
      target: 88,
      status: "Good"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track": return "text-green-600 bg-green-100"
      case "Good": return "text-blue-600 bg-blue-100"
      case "Needs Improvement": return "text-orange-600 bg-orange-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "text-green-600 bg-green-100"
      case "Medium": return "text-orange-600 bg-orange-100"
      case "High": return "text-red-600 bg-red-100"
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
            <ShieldCheck className="w-10 h-10 text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Gugus Kendali Mutu Dashboard
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Sistem Monitoring dan Evaluasi Mutu Akademik Fakultas Teknik</p>
      </motion.div>

      {/* Quality Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {qualityMetrics.map((metric, index) => (
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
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="audits">Audit</TabsTrigger>
          <TabsTrigger value="faculty">Dosen</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        {/* Academic Monitoring Tab */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic Performance Trends */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                    <CardTitle>Tren Kinerja Akademik</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="semester" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="gpa" stroke="#8b5cf6" strokeWidth={2} name="Average GPA" />
                      <Line type="monotone" dataKey="satisfaction" stroke="#06b6d4" strokeWidth={2} name="Satisfaction %" />
                      <Line type="monotone" dataKey="completion" stroke="#10b981" strokeWidth={2} name="Completion %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quality Indicators */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-500" />
                    <CardTitle>Indikator Mutu</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {qualityIndicators.map((indicator, index) => (
                    <div key={indicator.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{indicator.name}</span>
                        <span className="text-sm font-bold text-gray-900">{indicator.value}%</span>
                      </div>
                      <Progress
                        value={indicator.value}
                        className="h-2"
                        style={{
                          '--progress-background': indicator.color,
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        {/* Audits & Reviews Tab */}
        <TabsContent value="audits" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-6 h-6 text-orange-500" />
                  <CardTitle>Audit & Review Terbaru</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAudits.map((audit, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{audit.type}</h4>
                          <p className="text-sm text-gray-600">{audit.department}</p>
                        </div>
                        <Badge
                          variant={audit.status === 'Completed' ? 'default' : audit.status === 'In Progress' ? 'secondary' : 'outline'}
                          className={audit.status === 'Completed' ? 'bg-green-500' : audit.status === 'In Progress' ? 'bg-blue-500' : ''}
                        >
                          {audit.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <span className="font-medium ml-1">{audit.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Score:</span>
                          <span className="font-medium ml-1">{audit.score ? `${audit.score}%` : 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Findings:</span>
                          <span className="font-medium ml-1">{audit.findings}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Severity:</span>
                          <Badge variant="outline" className={`ml-1 ${getSeverityColor(audit.severity)}`}>
                            {audit.severity}
                          </Badge>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Faculty Performance Tab */}
        <TabsContent value="faculty" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <UserCheck className="w-6 h-6 text-purple-500" />
                  <CardTitle>Ikhtisar Kinerja Dosen</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {facultyPerformance.map((item, index) => (
                    <motion.div
                      key={item.category}
                      className="space-y-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-800">{item.category}</h4>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <Progress value={(item.current / item.target) * 100} className="h-3" />
                        </div>
                        <div className="text-sm font-medium text-gray-600">
                          {item.current}% / {item.target}%
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="w-6 h-6 text-indigo-500" />
                    <CardTitle>Distribusi Mutu</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={qualityIndicators}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {qualityIndicators.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-500" />
                    <CardTitle>Aksi Cepat</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Jadwalkan Audit", icon: FileCheck, color: "from-blue-500 to-cyan-500" },
                    { label: "Buat Laporan", icon: BarChart3, color: "from-green-500 to-emerald-500" },
                    { label: "Review Standar", icon: ShieldCheck, color: "from-purple-500 to-violet-500" },
                    { label: "Monitor Kepatuhan", icon: Eye, color: "from-orange-500 to-red-500" },
                    { label: "Update Metrik", icon: Settings, color: "from-gray-500 to-slate-500" },
                    { label: "Feedback Dosen", icon: Users, color: "from-pink-500 to-rose-500" }
                  ].map((action, index) => (
                    <motion.div
                      key={action.label}
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className={`w-full justify-start gap-3 bg-gradient-to-r ${action.color} hover:shadow-lg border-0 h-12`}
                        variant="default"
                      >
                        <action.icon className="w-5 h-5" />
                        {action.label}
                      </Button>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Quality Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              <CardTitle>Peringatan & Notifikasi Mutu</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm opacity-90">Review Tertunda</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm opacity-90">Item Tindakan</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm opacity-90">Isu Kritis</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
