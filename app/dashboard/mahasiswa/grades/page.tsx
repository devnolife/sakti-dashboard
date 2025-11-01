'use client'

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Award,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  User,
  Star,
  Loader2,
  Download,
  Eye,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from '@/lib/i18n'
import { getStudentGradesGraphQL } from "@/app/actions/academic-actions"

interface GradeData {
  id: string
  score: number
  letterGrade: string
  semester: string
  academicYear: string
  course: {
    id: string
    name: string
    code: string
    credits: number
    department: string | null
    lecturer: {
      name: string
    } | null
  }
  createdAt: Date | string
}

const gradeConfig = {
  'A': { color: 'text-green-600', bgColor: 'bg-green-500/10', borderColor: 'border-green-200', point: 4.0 },
  'A-': { color: 'text-green-600', bgColor: 'bg-green-500/10', borderColor: 'border-green-200', point: 3.7 },
  'B+': { color: 'text-blue-600', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-200', point: 3.3 },
  'B': { color: 'text-blue-600', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-200', point: 3.0 },
  'B-': { color: 'text-blue-600', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-200', point: 2.7 },
  'C+': { color: 'text-yellow-600', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-200', point: 2.3 },
  'C': { color: 'text-yellow-600', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-200', point: 2.0 },
  'C-': { color: 'text-orange-600', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-200', point: 1.7 },
  'D': { color: 'text-red-600', bgColor: 'bg-red-500/10', borderColor: 'border-red-200', point: 1.0 },
  'E': { color: 'text-red-600', bgColor: 'bg-red-500/10', borderColor: 'border-red-200', point: 0.0 },
}

export default function GradesPage() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [grades, setGrades] = useState<GradeData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState<string>('all')

  // Fetch grades data from GraphQL
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Fetching grades from GraphQL...')
        const result = await getStudentGradesGraphQL(null, null)
        
        if (!result.success || !result.data) {
          throw new Error(result.error || 'Failed to fetch grades')
        }
        
        // Transform KHS data to GradeData format
        const khsData = result.data.khs || []
        const transformedGrades: GradeData[] = khsData.map((item: any, index: number) => ({
          id: `${item.kode_matakuliah}-${index}`,
          score: item.nilai || 0,
          letterGrade: item.grade || 'N/A',
          semester: item.semester || '0',
          academicYear: '2024/2025', // TODO: Extract from periode_krs if available
          course: {
            id: item.kode_matakuliah,
            name: item.nama_matakuliah,
            code: item.kode_matakuliah,
            credits: item.sks || 0,
            department: null,
            lecturer: null
          },
          createdAt: new Date()
        }))
        
        console.log('📊 Grades data received:', transformedGrades.length, 'grades')
        console.log('📋 Sample grade:', transformedGrades[0])
        setGrades(transformedGrades)
      } catch (error) {
        console.error('❌ Error fetching grades:', error)
        setError(error instanceof Error ? error.message : 'Failed to load grades')
        // Set empty array on error so UI still renders
        setGrades([])
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchGrades()
    }
  }, [user])

  // Filter grades
  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grade.course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (grade.course.lecturer?.name.toLowerCase() || '').includes(searchQuery.toLowerCase())
    const matchesYear = selectedYear === 'all' || grade.academicYear === selectedYear
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'current' && grade.academicYear === new Date().getFullYear().toString()) ||
                      (activeTab === 'excellent' && ['A', 'A-'].includes(grade.letterGrade)) ||
                      (activeTab === 'good' && ['B+', 'B', 'B-'].includes(grade.letterGrade))
    return matchesSearch && matchesYear && matchesTab
  })

  // Calculate statistics
  const calculateGPA = (gradesList: GradeData[]) => {
    if (gradesList.length === 0) return 0
    const totalPoints = gradesList.reduce((sum, grade) => {
      const config = gradeConfig[grade.letterGrade as keyof typeof gradeConfig]
      return sum + (config?.point || 0) * grade.course.credits
    }, 0)
    const totalCredits = gradesList.reduce((sum, grade) => sum + grade.course.credits, 0)
    return totalCredits > 0 ? totalPoints / totalCredits : 0
  }

  const overallGPA = calculateGPA(grades)
  const currentYearGrades = grades.filter(g => g.academicYear === new Date().getFullYear().toString())
  const currentYearGPA = calculateGPA(currentYearGrades)
  
  const excellentGrades = grades.filter(g => ['A', 'A-'].includes(g.letterGrade))
  const totalCredits = grades.reduce((sum, grade) => sum + grade.course.credits, 0)

  // Get unique academic years
  const academicYears = Array.from(new Set(grades.map(g => g.academicYear))).sort((a, b) => b.localeCompare(a))

  // Group grades by semester
  const gradesBySemester = grades.reduce((acc, grade) => {
    const key = `${grade.academicYear}-${grade.semester}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(grade)
    return acc
  }, {} as Record<string, GradeData[]>)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your grades...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">Error loading grades</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-8 bg-gradient-to-br from-background via-background/50 to-primary/5">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-secondary p-8 text-white"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 flex items-center gap-3"
          >
            <div className="rounded-full bg-white/20 p-3 backdrop-blur">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div className="text-4xl">🎓</div>
          </motion.div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Nilai & Transkrip
          </h1>
          <p className="text-lg opacity-90">
            Academic achievement overview ✨
          </p>
          
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex gap-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">{overallGPA.toFixed(2)}</div>
              <div className="text-sm opacity-75">Overall GPA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{excellentGrades.length}</div>
              <div className="text-sm opacity-75">A Grades</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalCredits}</div>
              <div className="text-sm opacity-75">Total SKS</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardTitle className="text-sm font-medium">IPK Keseluruhan</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
              <Award className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{overallGPA.toFixed(2)}</div>
            <div className="flex items-center mt-1">
              <Badge 
                variant="outline" 
                className={`text-xs font-normal ${
                  overallGPA >= 3.5 
                    ? 'text-green-600 border-green-200 bg-green-500/10' 
                    : overallGPA >= 3.0
                    ? 'text-blue-600 border-blue-200 bg-blue-500/10'
                    : 'text-amber-600 border-amber-200 bg-amber-500/10'
                }`}
              >
                {overallGPA >= 3.5 ? 'Cum Laude' : overallGPA >= 3.0 ? 'Baik' : 'Cukup'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-blue-500/5 to-blue-500/10">
            <CardTitle className="text-sm font-medium">IPK Tahun Ini</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20">
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-600">{currentYearGPA.toFixed(2)}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs font-normal bg-blue-500/10 text-blue-600 border-blue-200">
                {currentYearGrades.length} mata kuliah
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
            <CardTitle className="text-sm font-medium">Prestasi Terbaik</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
              <Star className="w-4 h-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-600">{excellentGrades.length}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs font-normal bg-amber-500/10 text-amber-600 border-amber-200">
                Nilai A/A-
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-purple-500/5 to-purple-500/10">
            <CardTitle className="text-sm font-medium">Total SKS</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20">
              <BookOpen className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-600">{totalCredits}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs font-normal bg-purple-500/10 text-purple-600 border-purple-200">
                {grades.length} mata kuliah
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses, codes, lecturers... 🔍"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0 bg-white/80 backdrop-blur shadow-lg"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="rounded-lg border-0 bg-white/80 px-3 py-2 shadow-lg backdrop-blur"
          >
            <option value="all">All Years</option>
            {academicYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur shadow-lg border-0">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white/80 p-1 shadow-lg backdrop-blur">
          <TabsTrigger 
            value="all" 
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">📊</span> All ({grades.length})
          </TabsTrigger>
          <TabsTrigger 
            value="current"
            className="rounded-xl data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">📅</span> This Year ({currentYearGrades.length})
          </TabsTrigger>
          <TabsTrigger 
            value="excellent"
            className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">⭐</span> Excellent ({excellentGrades.length})
          </TabsTrigger>
          <TabsTrigger 
            value="good"
            className="rounded-xl data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">👍</span> Good ({grades.filter(g => ['B+', 'B', 'B-'].includes(g.letterGrade)).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Semester Breakdown */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <AnimatePresence>
              {Object.entries(gradesBySemester)
                .sort(([a], [b]) => b.localeCompare(a))
                .map(([semesterKey, semesterGrades]) => {
                  const [year, semester] = semesterKey.split('-')
                  const semesterGPA = calculateGPA(semesterGrades)
                  const semesterCredits = semesterGrades.reduce((sum, grade) => sum + grade.course.credits, 0)
                  
                  // Filter semester grades based on current tab and search
                  const filteredSemesterGrades = semesterGrades.filter(grade => {
                    const matchesSearch = grade.course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         grade.course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         (grade.course.lecturer?.name.toLowerCase() || '').includes(searchQuery.toLowerCase())
                    const matchesYear = selectedYear === 'all' || grade.academicYear === selectedYear
                    const matchesTab = activeTab === 'all' || 
                                      (activeTab === 'current' && grade.academicYear === new Date().getFullYear().toString()) ||
                                      (activeTab === 'excellent' && ['A', 'A-'].includes(grade.letterGrade)) ||
                                      (activeTab === 'good' && ['B+', 'B', 'B-'].includes(grade.letterGrade))
                    return matchesSearch && matchesYear && matchesTab
                  })

                  if (filteredSemesterGrades.length === 0) return null

                  return (
                    <motion.div
                      key={semesterKey}
                      variants={cardVariants}
                      className="overflow-hidden rounded-2xl bg-white shadow-lg"
                    >
                      {/* Semester Header */}
                      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold">
                              Semester {semester} - {year}
                            </h3>
                            <p className="text-muted-foreground mt-1">
                              {semesterGrades.length} mata kuliah • {semesterCredits} SKS
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {semesterGPA.toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">IPK Semester</div>
                          </div>
                        </div>
                      </div>

                      {/* Grades List */}
                      <div className="p-6">
                        <div className="grid gap-4">
                          {filteredSemesterGrades.map((grade) => {
                            const gradeStyle = gradeConfig[grade.letterGrade as keyof typeof gradeConfig]
                            
                            return (
                              <div
                                key={grade.id}
                                className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm transition-all"
                              >
                                <div className="flex-1">
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h4 className="font-semibold text-lg">{grade.course.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {grade.course.code} • {grade.course.credits} SKS
                                      </p>
                                      {grade.course.lecturer && (
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                          <User className="h-3 w-3" />
                                          {grade.course.lecturer.name}
                                        </p>
                                      )}
                                    </div>
                                    <div className="text-right">
                                      <Badge 
                                        variant="outline" 
                                        className={`text-lg font-bold px-3 py-1 ${gradeStyle?.color} ${gradeStyle?.bgColor} ${gradeStyle?.borderColor}`}
                                      >
                                        {grade.letterGrade}
                                      </Badge>
                                      <div className="text-sm text-muted-foreground mt-1">
                                        Score: {grade.score.toFixed(1)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {grade.course.department && (
                                    <div className="mt-2">
                                      <Badge variant="secondary" className="text-xs">
                                        {grade.course.department}
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
            </AnimatePresence>
          </motion.div>

          {filteredGrades.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No grades found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions FAB */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl transition-all"
        >
          <BarChart3 className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  )
}
