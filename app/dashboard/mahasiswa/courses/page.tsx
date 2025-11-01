'use client'

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { getStudentCoursesGraphQL } from "@/app/actions/academic-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Star,
  Flame,
  TrendingUp,
  Zap,
  Target,
  Award,
  Search,
  Filter,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Share,
  Heart,
  Eye,
  MessageCircle,
  Download,
  Loader2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from '@/lib/i18n'

type CourseStatus = 'ongoing' | 'completed' | 'upcoming'
type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert'

interface Course {
  id: string
  title: string
  code: string
  instructor: string
  credits: number
  currentGrade?: string
  attendance: string
  progress: number
  status: CourseStatus
  level: CourseLevel
  semester: string
  academicYear: string
  schedule: {
    day: string
    time: string
    location: string
  }[]
  description: string
  modules: number
  completedModules: number
  nextClass?: Date | string
  color: string
  thumbnail?: string
  tags: string[]
  likes: number
  views: number
  isBookmarked: boolean
}



const statusConfig = {
  ongoing: { 
    label: 'Sedang Berlangsung', 
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
    icon: PlayCircle
  },
  completed: { 
    label: 'Selesai', 
    color: 'bg-green-500/10 text-green-600 border-green-200',
    icon: CheckCircle2
  },
  upcoming: { 
    label: 'Akan Datang', 
    color: 'bg-amber-500/10 text-amber-600 border-amber-200',
    icon: AlertTriangle
  }
}

const levelConfig = {
  beginner: { label: 'Pemula', color: 'bg-green-500', emoji: '🌱' },
  intermediate: { label: 'Menengah', color: 'bg-yellow-500', emoji: '🚀' },
  advanced: { label: 'Lanjutan', color: 'bg-orange-500', emoji: '⚡' },
  expert: { label: 'Expert', color: 'bg-red-500', emoji: '🔥' }
}

export default function CoursesPage() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'all'>('all')
  const [likedCourses, setLikedCourses] = useState<Set<string>>(new Set())

  // Fetch courses data from GraphQL
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Fetching courses from GraphQL...')
        const result = await getStudentCoursesGraphQL(null, null)
        
        if (!result.success || !result.data) {
          throw new Error(result.error || 'Failed to fetch courses')
        }
        
        // Transform KRS data to Course format
        const krsData = result.data.krs || []
        const transformedCourses: Course[] = krsData.map((item: any) => ({
          id: item.kode_matakuliah,
          title: item.nama_matakuliah,
          code: item.kode_matakuliah,
          instructor: 'Dosen', // TODO: Get from API if available
          credits: item.sks || 0,
          currentGrade: undefined,
          attendance: '0%',
          progress: 0,
          status: 'ongoing' as CourseStatus,
          level: (item.semester <= 2 ? 'beginner' : item.semester <= 4 ? 'intermediate' : 'advanced') as CourseLevel,
          semester: item.semester?.toString() || '1',
          academicYear: '2024/2025',
          schedule: [],
          description: `Mata kuliah ${item.nama_matakuliah}`,
          modules: 0,
          completedModules: 0,
          nextClass: new Date(),
          color: 'bg-blue-500',
          tags: ['Aktif'],
          likes: 0,
          views: 0,
          isBookmarked: false
        }))
        
        console.log('📚 Courses data received:', transformedCourses.length, 'courses')
        console.log('📋 Sample course:', transformedCourses[0])
        setCourses(transformedCourses)
      } catch (error) {
        console.error('❌ Error fetching courses:', error)
        setError(error instanceof Error ? error.message : 'Failed to load courses')
        setCourses([])
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchCourses()
    }
  }, [user])

  const filteredCourses = courses.filter(course => {
    const matchesTab = activeTab === 'all' || course.status === activeTab
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    return matchesTab && matchesSearch && matchesLevel
  })

  // Debug log
  console.log('🎯 Render state:', { 
    coursesCount: courses.length, 
    filteredCount: filteredCourses.length, 
    loading, 
    error,
    activeTab 
  })

  const toggleLike = (courseId: string) => {
    setLikedCourses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(courseId)) {
        newSet.delete(courseId)
      } else {
        newSet.add(courseId)
      }
      return newSet
    })
  }

  const getGradeColor = (grade: string | undefined) => {
    if (!grade) return 'text-gray-400'
    const gradeValue = grade.charAt(0)
    switch (gradeValue) {
      case 'A': return 'text-green-600 font-bold'
      case 'B': return 'text-blue-600 font-bold'  
      case 'C': return 'text-yellow-600 font-bold'
      case 'D': return 'text-orange-600 font-bold'
      default: return 'text-red-600 font-bold'
    }
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
          <p className="text-muted-foreground">Loading your courses...</p>
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
          <h3 className="text-xl font-semibold mb-2">Error loading courses</h3>
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
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="text-4xl">📚</div>
          </motion.div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">
            Mata Kuliah Saya
          </h1>
          <p className="text-lg opacity-90">
            Your learning journey, reimagined ✨
          </p>
          
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex gap-6"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">{courses.filter(c => c.status === 'ongoing').length}</div>
              <div className="text-sm opacity-75">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{courses.filter(c => c.status === 'completed').length}</div>
              <div className="text-sm opacity-75">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%</div>
              <div className="text-sm opacity-75">Avg Progress</div>
            </div>
          </motion.div>
        </div>
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
            placeholder="Search courses, instructors, tags... 🔍"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0 bg-white/80 backdrop-blur shadow-lg"
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value as CourseLevel | 'all')}
            className="rounded-lg border-0 bg-white/80 px-3 py-2 shadow-lg backdrop-blur"
          >
            <option value="all">All Levels</option>
            <option value="beginner">🌱 Beginner</option>
            <option value="intermediate">🚀 Intermediate</option>  
            <option value="advanced">⚡ Advanced</option>
            <option value="expert">🔥 Expert</option>
          </select>
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white/80 p-1 shadow-lg backdrop-blur">
          <TabsTrigger 
            value="all" 
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">📖</span> All ({courses.length})
          </TabsTrigger>
          <TabsTrigger 
            value="ongoing"
            className="rounded-xl data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">⚡</span> Active ({courses.filter(c => c.status === 'ongoing').length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">✅</span> Done ({courses.filter(c => c.status === 'completed').length})
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming"
            className="rounded-xl data-[state=active]:bg-amber-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
          >
            <span className="mr-2">🔮</span> Soon ({courses.filter(c => c.status === 'upcoming').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence>
              {filteredCourses.map((course) => {
                const StatusIcon = statusConfig[course.status].icon
                const isLiked = likedCourses.has(course.id)
                
                return (
                  <motion.div
                    key={course.id}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl"
                  >
                    {/* Course Header with Gradient */}
                    <div className={`relative h-32 bg-gradient-to-br ${course.color} p-4`}>
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="relative z-10 flex items-start justify-between text-white">
                        <div>
                          <Badge className="mb-2 bg-white/20 text-white backdrop-blur hover:bg-white/30">
                            {course.code}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{levelConfig[course.level].emoji}</span>
                            <Badge variant="outline" className="border-white/30 text-white">
                              {levelConfig[course.level].label}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-white hover:bg-white/20"
                            onClick={() => toggleLike(course.id)}
                          >
                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-white hover:bg-white/20"
                          >
                            <Bookmark className={`h-4 w-4 ${course.isBookmarked ? 'fill-current' : ''}`} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      {/* Course Title & Instructor */}
                      <div className="mb-4">
                        <h3 className="mb-2 font-bold text-lg leading-tight line-clamp-2">
                          {course.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{course.instructor}</span>
                          <div className="ml-auto flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span className="text-xs">{course.views}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <Badge variant="outline" className={`mb-4 ${statusConfig[course.status].color}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[course.status].label}
                      </Badge>

                      {/* Progress */}
                      {course.status !== 'upcoming' && (
                        <div className="mb-4">
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium">Progress</span>
                            <span className="font-bold text-primary">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                          <div className="mt-1 text-xs text-muted-foreground">
                            {course.completedModules}/{course.modules} modules completed
                          </div>
                        </div>
                      )}

                      {/* Stats Grid */}
                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="text-center rounded-lg bg-muted/50 p-3">
                          <div className="text-lg font-bold">
                            {course.currentGrade ? (
                              <span className={getGradeColor(course.currentGrade)}>
                                {course.currentGrade}
                              </span>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">Grade</div>
                        </div>
                        <div className="text-center rounded-lg bg-muted/50 p-3">
                          <div className="text-lg font-bold text-blue-600">{course.attendance}</div>
                          <div className="text-xs text-muted-foreground">Attendance</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mb-4 flex flex-wrap gap-1">
                        {course.tags.map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Next Class */}
                      {course.nextClass && course.status === 'ongoing' && (
                        <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm">
                          <div className="flex items-center gap-2 text-blue-700">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">Next Class</span>
                          </div>
                          <div className="mt-1 text-blue-600">
                            {new Date(course.nextClass).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <Button className="w-full group-hover:shadow-lg transition-all">
                        <span>
                          {course.status === 'completed' ? 'Review' : 
                           course.status === 'upcoming' ? 'Preview' : 'Continue'}
                        </span>
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>

                      {/* Interaction Stats */}
                      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{course.likes + (isLiked ? 1 : 0)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            <span>{Math.floor(Math.random() * 50)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Share className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {filteredCourses.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
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
          <Zap className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  )
}
