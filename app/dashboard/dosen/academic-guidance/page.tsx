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
  Calendar,
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
      <motion.div variants={itemVariants} className="p-6 text-white bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Bimbingan Akademik</h1>
            <p className="text-lg text-teal-100">Pantau dan kelola progress akademik mahasiswa bimbingan Anda</p>
          </div>
          <div className="hidden md:block">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-2 mb-1 text-sm text-teal-100">
                <Target className="w-4 h-4" />
                Avg Progress
              </div>
              <div className="text-2xl font-bold">{mockStats.averageProgress}%</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-cyan-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-teal-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-teal-700 bg-teal-100">Total</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-teal-700">{mockStats.totalStudents}</div>
              <div className="text-sm font-medium text-teal-600">Total Mahasiswa</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-blue-700 bg-blue-100">Aktif</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-blue-700">{mockStats.activeGuidance}</div>
              <div className="text-sm font-medium text-blue-600">Bimbingan Aktif</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-green-700 bg-green-100">Selesai</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-green-700">{mockStats.completed}</div>
              <div className="text-sm font-medium text-green-600">Diselesaikan</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-purple-700 bg-purple-100">Progress</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-purple-700">{mockStats.averageProgress}%</div>
              <div className="text-sm font-medium text-purple-600">Rata-rata Progress</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Tabs and Search */}
      <motion.div variants={itemVariants} className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="active">Aktif</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex w-full gap-2 md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari mahasiswa..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
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
                  <UserCheck className="w-5 h-5 text-primary" />
                  Daftar Mahasiswa Bimbingan Akademik
                </CardTitle>
                <CardDescription>
                  Pantau progress akademik dan kelola bimbingan mahasiswa
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Laporan Progress
              </Button>
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
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Aksi Cepat
            </CardTitle>
            <CardDescription>Akses cepat untuk fungsi akademik yang sering digunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Button variant="outline" className="flex flex-col h-auto gap-2 p-4">
                <Calendar className="w-5 h-5" />
                <span className="text-xs">Jadwal Konsultasi</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto gap-2 p-4">
                <FileText className="w-5 h-5" />
                <span className="text-xs">Progress Report</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto gap-2 p-4">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs">Analisis Kinerja</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-auto gap-2 p-4">
                <Star className="w-5 h-5" />
                <span className="text-xs">Evaluasi Mahasiswa</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

