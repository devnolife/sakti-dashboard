"use client"

import { useState } from "react"
import { KkpGuidanceList } from "@/components/lecturer/kkp-guidance-list"
import { KkpPlusGuidanceList } from "@/components/lecturer/kkp-plus-guidance-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  ClipboardCheck,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  Clock,
  GraduationCap,
  Star,
  Award,
  Briefcase
} from "lucide-react"

const mockStats = {
  totalStudents: 12,
  activeGuidance: 8,
  pendingReview: 3,
  completed: 5,
  averageRating: 4.7
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

export default function KkpGuidancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("kkp")

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Bimbingan KKP & KKP Plus</h1>
            <p className="text-lg text-blue-100">Kelola dan pantau progress mahasiswa bimbingan KKP Anda</p>
          </div>
          <div className="hidden md:block">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl">
              <div className="flex items-center gap-2 mb-1 text-sm text-blue-100">
                <Star className="w-4 h-4" />
                Rating Pembimbingan
              </div>
              <div className="text-2xl font-bold">{mockStats.averageRating}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-blue-700 bg-blue-100">Aktif</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-blue-700">{mockStats.totalStudents}</div>
              <div className="text-sm font-medium text-blue-600">Total Mahasiswa</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <ClipboardCheck className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-green-700 bg-green-100">Progress</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-green-700">{mockStats.activeGuidance}</div>
              <div className="text-sm font-medium text-green-600">Bimbingan Aktif</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-amber-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-orange-700 bg-orange-100">Review</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-orange-700">{mockStats.pendingReview}</div>
              <div className="text-sm font-medium text-orange-600">Pending Review</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <Badge className="text-purple-700 bg-purple-100">Selesai</Badge>
              </div>
              <div className="mb-1 text-2xl font-bold text-purple-700">{mockStats.completed}</div>
              <div className="text-sm font-medium text-purple-600">Diselesaikan</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari mahasiswa, NIM, atau topik KKP..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Jadwal
          </Button>
        </div>
      </motion.div>

      {/* Main Content with Tabs */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Daftar Mahasiswa Bimbingan
            </CardTitle>
            <CardDescription>
              Pantau progress dan kelola bimbingan mahasiswa KKP dan KKP Plus
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="kkp" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Kuliah Kerja Profesi
                </TabsTrigger>
                <TabsTrigger value="kkp-plus" className="gap-2">
                  <Award className="w-4 h-4" />
                  KKP Plus
                </TabsTrigger>
              </TabsList>

              <TabsContent value="kkp" className="mt-0">
                <KkpGuidanceList />
              </TabsContent>

              <TabsContent value="kkp-plus" className="mt-0">
                <KkpPlusGuidanceList />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

