"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  Edit,
  Eye,
  BarChart3,
  GraduationCap,
  Users,
  BookOpen,
  TrendingUp,
  Sparkles,
  Filter,
  Download
} from "lucide-react"

interface Prodi {
  id: number
  name: string
  code: string
  faculty: string
  has_specialization: boolean
  regular_classes: string[]
  specializations?: string[]
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  stats?: {
    total_courses: number
    active_schedules: number
    total_students: number
  }
  created_at: string
  updated_at: string
}

export default function ProdisManagement() {
  const [prodis, setProdis] = useState<Prodi[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Mock data - dalam implementasi nyata, ini akan mengambil dari API
  useEffect(() => {
    const mockProdis: Prodi[] = [
      {
        id: 1,
        name: "Teknik Informatika",
        code: "IF",
        faculty: "Fakultas Teknik",
        has_specialization: true,
        regular_classes: ["A", "B", "C", "D", "E"],
        specializations: ["Rekayasa Perangkat Lunak", "Jaringan Komputer", "Artificial Intelligence"],
        colors: {
          primary: "#3B82F6",
          secondary: "#1E40AF",
          accent: "#60A5FA"
        },
        stats: {
          total_courses: 86,
          active_schedules: 5,
          total_students: 1250
        },
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2025-09-20T14:30:00Z"
      },
      {
        id: 2,
        name: "Sistem Informasi",
        code: "SI",
        faculty: "Fakultas Teknik",
        has_specialization: true,
        regular_classes: ["A", "B", "C", "D"],
        specializations: ["Sistem Informasi Manajemen", "E-Business", "Business Intelligence"],
        colors: {
          primary: "#10B981",
          secondary: "#059669",
          accent: "#34D399"
        },
        stats: {
          total_courses: 74,
          active_schedules: 4,
          total_students: 980
        },
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2025-09-18T09:15:00Z"
      },
      {
        id: 3,
        name: "Teknik Elektro",
        code: "TE",
        faculty: "Fakultas Teknik",
        has_specialization: false,
        regular_classes: ["A", "B", "C"],
        colors: {
          primary: "#F59E0B",
          secondary: "#D97706",
          accent: "#FCD34D"
        },
        stats: {
          total_courses: 68,
          active_schedules: 3,
          total_students: 720
        },
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2025-09-15T16:45:00Z"
      },
      {
        id: 4,
        name: "Teknik Mesin",
        code: "TM",
        faculty: "Fakultas Teknik",
        has_specialization: false,
        regular_classes: ["A", "B"],
        colors: {
          primary: "#EF4444",
          secondary: "#DC2626",
          accent: "#FCA5A5"
        },
        stats: {
          total_courses: 62,
          active_schedules: 2,
          total_students: 540
        },
        created_at: "2023-08-01T10:00:00Z",
        updated_at: "2025-09-12T11:20:00Z"
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setProdis(mockProdis)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProdis = prodis.filter(prodi =>
    prodi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prodi.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prodi.faculty.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddProdi = () => {
    // Navigate to add prodi page or open modal
    console.log("Add new prodi")
  }

  const handleEditProdi = (id: number) => {
    console.log("Edit prodi:", id)
  }

  const handleViewStats = (id: number) => {
    console.log("View stats for prodi:", id)
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Manajemen Program Studi
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola program studi, kelas, dan spesialisasi
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-cyan-200 text-cyan-600 hover:bg-cyan-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={handleAddProdi}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Prodi
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Program Studi
            </CardTitle>
            <GraduationCap className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{prodis.length}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Aktif semua
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Total Mata Kuliah
            </CardTitle>
            <BookOpen className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">
              {prodis.reduce((total, prodi) => total + (prodi.stats?.total_courses || 0), 0)}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Di semua prodi
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Total Mahasiswa
            </CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">
              {prodis.reduce((total, prodi) => total + (prodi.stats?.total_students || 0), 0)}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Mahasiswa aktif
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Jadwal Aktif
            </CardTitle>
            <BarChart3 className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">
              {prodis.reduce((total, prodi) => total + (prodi.stats?.active_schedules || 0), 0)}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Semester aktif
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Daftar Program Studi</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari prodi, kode, atau fakultas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProdis.map((prodi) => (
              <div
                key={prodi.id}
                className="p-6 rounded-lg border bg-white dark:bg-gray-800/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: prodi.colors.primary }}
                    >
                      {prodi.code}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {prodi.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {prodi.faculty}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {prodi.regular_classes.length} Kelas
                        </Badge>
                        {prodi.has_specialization && (
                          <Badge variant="outline" className="text-xs">
                            {prodi.specializations?.length} Spesialisasi
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    {/* Stats */}
                    <div className="hidden md:flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {prodi.stats?.total_courses}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Mata Kuliah</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {prodi.stats?.total_students}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Mahasiswa</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">
                          {prodi.stats?.active_schedules}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Jadwal</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewStats(prodi.id)}
                        className="text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProdi(prodi.id)}
                        className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewStats(prodi.id)}
                        className="text-purple-600 hover:text-purple-700 border-purple-200 hover:border-purple-300"
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Stats
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProdis.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Tidak ada program studi ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Coba ubah kata kunci pencarian atau tambah program studi baru
              </p>
              <Button onClick={handleAddProdi}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Program Studi
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
