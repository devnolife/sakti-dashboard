"use client"

import { useState } from "react"
import { AcademicGuidanceList } from "@/components/lecturer/academic-guidance-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle2,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  Award,
  UserCheck,
  FileText,
  Star,
  Target
} from "lucide-react"

const mockStats = {
  totalStudents: 28,
  activeGuidance: 20,
  completed: 15,
  pending: 8,
  averageProgress: 82
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

export default function AcademicGuidancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bimbingan Akademik</h1>
            <p className="text-teal-100 text-lg">Pantau dan kelola progress akademik mahasiswa bimbingan Anda</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-teal-100 mb-1">
                <Target className="h-4 w-4" />
                Avg Progress
              </div>
              <div className="text-2xl font-bold">{mockStats.averageProgress}%</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-cyan-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-teal-500 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-teal-100 text-teal-700">Total</Badge>
              </div>
              <div className="text-2xl font-bold text-teal-700 mb-1">{mockStats.totalStudents}</div>
              <div className="text-teal-600 text-sm font-medium">Total Mahasiswa</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Aktif</Badge>
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-1">{mockStats.activeGuidance}</div>
              <div className="text-blue-600 text-sm font-medium">Bimbingan Aktif</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700">Selesai</Badge>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-1">{mockStats.completed}</div>
              <div className="text-green-600 text-sm font-medium">Diselesaikan</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-orange-100 text-orange-700">Pending</Badge>
              </div>
              <div className="text-2xl font-bold text-orange-700 mb-1">{mockStats.pending}</div>
              <div className="text-orange-600 text-sm font-medium">Perlu Tindakan</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Tabs and Search */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Cari mahasiswa..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-primary" />
                  Daftar Mahasiswa Bimbingan Akademik
                </CardTitle>
                <CardDescription>
                  Pantau progress akademik dan kelola bimbingan mahasiswa
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Laporan Progress
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Mahasiswa
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="all" className="mt-0">
                <AcademicGuidanceList />
              </TabsContent>
              <TabsContent value="active" className="mt-0">
                <AcademicGuidanceList filter="active" />
              </TabsContent>
              <TabsContent value="completed" className="mt-0">
                <AcademicGuidanceList filter="completed" />
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                <AcademicGuidanceList filter="pending" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Aksi Cepat
            </CardTitle>
            <CardDescription>Akses cepat untuk fungsi akademik yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Jadwal Konsultasi</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Progress Report</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Analisis Kinerja</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
                <Star className="h-5 w-5" />
                <span className="text-xs">Evaluasi Mahasiswa</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

