"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
  Filter,
  Download,
  Upload,
  Eye
} from "lucide-react"
import { jadwalKuliahAPI, Course as ApiCourse, Prodi } from "@/lib/api/jadwal-kuliah"

interface Course extends ApiCourse {
  prodi_name: string
}

interface FilterState {
  prodi_id: string
  semester: string
  kelas: string
  is_nr: string
}

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([])
  const [prodis, setProdis] = useState<Prodi[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    prodi_id: "",
    semester: "",
    kelas: "",
    is_nr: ""
  })

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Load prodis first
        const prodisResponse = await jadwalKuliahAPI.getProdis(1, 50)
        if (prodisResponse.success && prodisResponse.data) {
          setProdis(prodisResponse.data)
        }

        // Load courses with filters
        const coursesResponse = await jadwalKuliahAPI.getCourses({
          page: currentPage,
          size: 20,
          prodi_id: filters.prodi_id ? parseInt(filters.prodi_id) : undefined,
          semester: filters.semester ? parseInt(filters.semester) : undefined,
          kelas: filters.kelas || undefined
        })

        if (coursesResponse.success && coursesResponse.data) {
          // Map courses with prodi names
          const coursesWithProdiNames = coursesResponse.data.map(course => ({
            ...course,
            prodi_name: prodis.find(p => p.id === course.prodi_id)?.name || 'Unknown Prodi'
          }))
          setCourses(coursesWithProdiNames)

          if (coursesResponse.pagination) {
            setTotalPages(coursesResponse.pagination.totalPages)
          }
        }

        setLoading(false)
      } catch (error) {
        console.error('Failed to load courses:', error)
        setLoading(false)

        // Fallback to mock data if API fails
        const mockCourses: Course[] = [
          {
            id: 1,
            prodi_id: 1,
            prodi_name: "Teknik Informatika",
            kode_mk: "IF2301",
            mata_kuliah: "Pemrograman Berorientasi Objek",
            sks: 3,
            semester: 3,
            kelas: "A",
            dosen1: "Dr. John Doe, S.Kom., M.T.",
            dosen2: "Jane Smith, S.Kom., M.Kom.",
            is_nr: false,
            created_at: "2025-09-01T10:00:00Z",
            updated_at: "2025-09-20T14:30:00Z"
          }
        ]
        setCourses(mockCourses)
      }
    }

    loadData()
  }, [currentPage, filters])

  // Reload data when filters change
  useEffect(() => {
    const loadCoursesWithFilters = async () => {
      if (prodis.length === 0) return // Wait for prodis to load first

      try {
        const coursesResponse = await jadwalKuliahAPI.getCourses({
          page: currentPage,
          size: 20,
          prodi_id: filters.prodi_id ? parseInt(filters.prodi_id) : undefined,
          semester: filters.semester ? parseInt(filters.semester) : undefined,
          kelas: filters.kelas || undefined
        })

        if (coursesResponse.success && coursesResponse.data) {
          const coursesWithProdiNames = coursesResponse.data.map(course => ({
            ...course,
            prodi_name: prodis.find(p => p.id === course.prodi_id)?.name || 'Unknown Prodi'
          }))
          setCourses(coursesWithProdiNames)

          if (coursesResponse.pagination) {
            setTotalPages(coursesResponse.pagination.totalPages)
          }
        }
      } catch (error) {
        console.error('Failed to reload courses:', error)
      }
    }

    loadCoursesWithFilters()
  }, [filters, currentPage, prodis])

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.mata_kuliah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.kode_mk.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.dosen1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.prodi_name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProdi = !filters.prodi_id || course.prodi_id.toString() === filters.prodi_id
    const matchesSemester = !filters.semester || course.semester.toString() === filters.semester
    const matchesKelas = !filters.kelas || course.kelas === filters.kelas
    const matchesNR = !filters.is_nr || course.is_nr.toString() === filters.is_nr

    return matchesSearch && matchesProdi && matchesSemester && matchesKelas && matchesNR
  })

  const handleAddCourse = () => {
    // Navigate to add course page or open modal
    console.log("Add new course")
  }

  const handleBulkImport = () => {
    // Open file upload dialog for bulk import
    console.log("Bulk import courses")
  }

  const handleEditCourse = async (id: number) => {
    // Open edit modal or navigate to edit page
    console.log("Edit course:", id)
  }

  const handleDeleteCourse = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus mata kuliah ini?")) {
      try {
        const response = await jadwalKuliahAPI.deleteCourse(id)
        if (response.success) {
          // Refresh courses list
          setCourses(courses.filter(c => c.id !== id))
          alert("Mata kuliah berhasil dihapus")
        } else {
          alert("Gagal menghapus mata kuliah: " + response.message)
        }
      } catch (error) {
        alert("Terjadi kesalahan saat menghapus mata kuliah")
        console.error(error)
      }
    }
  }

  const handleViewDetails = (id: number) => {
    // Navigate to course details page
    console.log("View course details:", id)
  }

  const handleExportData = async () => {
    try {
      // This would be implemented with proper export endpoint
      console.log("Export courses data")
      alert("Fitur export sedang dalam pengembangan")
    } catch (error) {
      console.error("Export failed:", error)
    }
  }

  const getTotalSKS = () => {
    return filteredCourses.reduce((total, course) => total + course.sks, 0)
  }

  const getSemesterOptions = () => {
    const semesters = [...new Set(courses.map(course => course.semester))].sort()
    return semesters.map(sem => ({ value: sem.toString(), label: `Semester ${sem}` }))
  }

  const getKelasOptions = () => {
    const kelasSet = [...new Set(courses.map(course => course.kelas))].sort()
    return kelasSet.map(kelas => ({ value: kelas, label: kelas === "NR" ? "Non-Regular" : `Kelas ${kelas}` }))
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-8 pt-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
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
            Manajemen Mata Kuliah
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola mata kuliah, dosen, dan jadwal perkuliahan
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
            <Upload className="w-4 h-4 mr-2" />
            Import Bulk
          </Button>
          <Button variant="outline" className="border-cyan-200 text-cyan-600 hover:bg-cyan-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            onClick={handleAddCourse}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Mata Kuliah
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Total Mata Kuliah
            </CardTitle>
            <BookOpen className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{filteredCourses.length}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Dari {courses.length} total
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
              Total SKS
            </CardTitle>
            <Calendar className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">{getTotalSKS()}</div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              SKS terpilih
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Regular Classes
            </CardTitle>
            <Users className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">
              {filteredCourses.filter(c => !c.is_nr).length}
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Kelas reguler
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Non-Regular
            </CardTitle>
            <BookOpen className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">
              {filteredCourses.filter(c => c.is_nr).length}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              Kelas non-regular
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">Daftar Mata Kuliah</CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari mata kuliah, kode, atau dosen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-80"
                />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mt-4">
            <Select value={filters.prodi_id} onValueChange={(value) => setFilters({ ...filters, prodi_id: value })}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Program Studi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Prodi</SelectItem>
                {prodis.map(prodi => (
                  <SelectItem key={prodi.id} value={prodi.id.toString()}>
                    {prodi.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.semester} onValueChange={(value) => setFilters({ ...filters, semester: value })}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Semester</SelectItem>
                {getSemesterOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.kelas} onValueChange={(value) => setFilters({ ...filters, kelas: value })}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Kelas</SelectItem>
                {getKelasOptions().map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.is_nr} onValueChange={(value) => setFilters({ ...filters, is_nr: value })}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipe Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Semua Tipe</SelectItem>
                <SelectItem value="false">Regular</SelectItem>
                <SelectItem value="true">Non-Regular</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setFilters({ prodi_id: "", semester: "", kelas: "", is_nr: "" })}
              className="text-gray-600"
            >
              Reset Filter
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode MK</TableHead>
                <TableHead>Mata Kuliah</TableHead>
                <TableHead>SKS</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Dosen Pengampu</TableHead>
                <TableHead>Prodi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <TableCell className="font-medium">{course.kode_mk}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {course.mata_kuliah}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {course.sks} SKS
                    </Badge>
                  </TableCell>
                  <TableCell>{course.semester}</TableCell>
                  <TableCell>
                    <Badge
                      variant={course.is_nr ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {course.kelas}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-48">
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {course.dosen1}
                      </div>
                      {course.dosen2 && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {course.dosen2}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {course.prodi_name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={course.is_nr ? "outline" : "default"}
                      className="text-xs"
                    >
                      {course.is_nr ? "Non-Regular" : "Regular"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(course.id)}
                        className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 border-blue-200 hover:border-blue-300"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCourse(course.id)}
                        className="h-8 w-8 p-0 text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Tidak ada mata kuliah ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Coba ubah kata kunci pencarian atau filter yang digunakan
              </p>
              <Button onClick={handleAddCourse}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Mata Kuliah
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
