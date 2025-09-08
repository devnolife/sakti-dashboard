"use client"

import { useState } from "react"
import { KkpGuidanceList } from "@/components/lecturer/kkp-guidance-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  BookOpen,
  Users,
  ClipboardCheck,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  GraduationCap,
  Star
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Bimbingan KKP</h1>
            <p className="text-blue-100 text-lg">Kelola dan pantau progress mahasiswa bimbingan KKP Anda</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm text-blue-100 mb-1">
                <Star className="h-4 w-4" />
                Rating Pembimbingan
              </div>
              <div className="text-2xl font-bold">{mockStats.averageRating}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Aktif</Badge>
              </div>
              <div className="text-2xl font-bold text-blue-700 mb-1">{mockStats.totalStudents}</div>
              <div className="text-blue-600 text-sm font-medium">Total Mahasiswa</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-green-500 p-2 rounded-lg">
                  <ClipboardCheck className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-700">Progress</Badge>
              </div>
              <div className="text-2xl font-bold text-green-700 mb-1">{mockStats.activeGuidance}</div>
              <div className="text-green-600 text-sm font-medium">Bimbingan Aktif</div>
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
                <Badge className="bg-orange-100 text-orange-700">Review</Badge>
              </div>
              <div className="text-2xl font-bold text-orange-700 mb-1">{mockStats.pendingReview}</div>
              <div className="text-orange-600 text-sm font-medium">Pending Review</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-violet-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <Badge className="bg-purple-100 text-purple-700">Selesai</Badge>
              </div>
              <div className="text-2xl font-bold text-purple-700 mb-1">{mockStats.completed}</div>
              <div className="text-purple-600 text-sm font-medium">Diselesaikan</div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Cari mahasiswa, NIM, atau topik KKP..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Jadwal
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
                  <BookOpen className="h-5 w-5 text-primary" />
                  Daftar Mahasiswa Bimbingan KKP
                </CardTitle>
                <CardDescription>
                  Pantau progress dan kelola bimbingan mahasiswa KKP dengan mudah
                </CardDescription>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Mahasiswa
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <KkpGuidanceList />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

