'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, GraduationCap, FileText, Clock, Zap, Star, TrendingUp, Globe, Loader2 } from "lucide-react"
import Link from "next/link"

interface AcademicData {
  student: {
    id: string
    name: string
    nim: string
    major: string
    department: string
    semester: number
    academicYear: string
    gpa: number | null
    status: string
  }
  academicAdvisor: {
    id: string
    name: string
    nip: string
    position: string
    department: string
    phone: string | null
    office: string | null
  } | null
  consultations: {
    id: string
    date: Date | string
    uraian: string
    keterangan: string
    paraf: boolean
    no: number
  }[]
  academicProgress: {
    totalCredits: number
    completedCredits: number
    requiredCredits: number
    progressPercentage: number
    requiredCoursesProgress: number
    electiveCoursesProgress: number
  }
  currentSemesterStats: {
    courses: number
    credits: number
    gpa: number | null
  }
}

export default function AcademicOverviewPage() {
  const [academicData, setAcademicData] = useState<AcademicData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        console.log('🚀 Fetching academic data...')
        const response = await fetch('/api/student/academic')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch academic data: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('📚 Academic data received:', data)
        setAcademicData(data)
      } catch (error) {
        console.error('❌ Error fetching academic data:', error)
        setError(error instanceof Error ? error.message : 'Failed to load academic data')
      } finally {
        setLoading(false)
      }
    }

    fetchAcademicData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading academic data...</p>
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
          <h3 className="text-xl font-semibold mb-2">Error loading academic data</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (!academicData) {
    return null
  }
  return (
    <div className="space-y-8 min-h-screen bg-gradient-to-br from-purple-50/30 via-blue-50/30 to-pink-50/30 dark:from-purple-950/10 dark:via-blue-950/10 dark:to-pink-950/10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Star className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-bold">Academic Hub ✨</h1>
          </div>
          <p className="text-lg opacity-90">Your academic journey, simplified and stylish 📚</p>
          <div className="flex gap-2 mt-4">
            <div className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">#StudyVibes</div>
            <div className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">#AcademicGoals</div>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-emerald-400 to-cyan-400 text-white hover:scale-105">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold opacity-90">GPA Vibes 📊</CardTitle>
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-12 transition-transform">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black mb-1">{academicData.student.gpa?.toFixed(2) || 'N/A'}</div>
            <p className="text-sm opacity-80">Semester {academicData.student.semester} • {academicData.student.gpa && academicData.student.gpa >= 3.5 ? 'On fire! 🔥' : 'Keep going! 💪'}</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-violet-400 to-purple-400 text-white hover:scale-105">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold opacity-90">Credit Points 💎</CardTitle>
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-12 transition-transform">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black mb-1">{academicData.academicProgress.totalCredits}</div>
            <p className="text-sm opacity-80">dari {academicData.academicProgress.requiredCredits} SKS • {academicData.academicProgress.progressPercentage}% done! 🚀</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-orange-400 to-red-400 text-white hover:scale-105">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold opacity-90">Advisor Meets 🎯</CardTitle>
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-12 transition-transform">
                <Clock className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black mb-1">{academicData.consultations.filter(c => c.paraf).length}/{academicData.consultations.length}</div>
            <p className="text-sm opacity-80">This semester • Keep going! 💪</p>
          </CardContent>
        </Card>

        <Card className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-pink-400 to-rose-400 text-white hover:scale-105">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold opacity-90">Status Check ✅</CardTitle>
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm group-hover:rotate-12 transition-transform">
                <Award className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-black mb-1">{academicData.student.status === 'active' ? 'Active' : academicData.student.status}</div>
            <p className="text-sm opacity-80">{academicData.student.academicYear} • Living the dream! ✨</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <div className="flex justify-center">
          <TabsList className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl p-1.5 h-auto">
            <TabsTrigger 
              value="overview" 
              className="rounded-xl px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-semibold"
            >
              <Star className="h-4 w-4 mr-2" />
              Overview ✨
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="rounded-xl px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-semibold"
            >
              <FileText className="h-4 w-4 mr-2" />
              Docs 📄
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="rounded-xl px-6 py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-semibold"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule 📅
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-8">
          <Card className="border-none shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Progress Tracker 🚀</CardTitle>
                  <CardDescription className="text-base">Your academic journey so far</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold flex items-center gap-2">✨ Overall Progress</span>
                    <span className="text-lg font-bold text-indigo-600">{academicData.academicProgress.progressPercentage}%</span>
                  </div>
                  <Progress value={academicData.academicProgress.progressPercentage} className="h-3 rounded-full" />
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/20 dark:to-cyan-950/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold flex items-center gap-2">📚 Required Courses</span>
                    <span className="text-lg font-bold text-emerald-600">{academicData.academicProgress.requiredCoursesProgress}%</span>
                  </div>
                  <Progress value={academicData.academicProgress.requiredCoursesProgress} className="h-3 rounded-full" />
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold flex items-center gap-2">🎯 Elective Courses</span>
                    <span className="text-lg font-bold text-amber-600">{academicData.academicProgress.electiveCoursesProgress}%</span>
                  </div>
                  <Progress value={academicData.academicProgress.electiveCoursesProgress} className="h-3 rounded-full" />
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold flex items-center gap-2">💬 Academic Consultation</span>
                    <span className="text-lg font-bold text-pink-600">{Math.round((academicData.consultations.filter(c => c.paraf).length / academicData.consultations.length) * 100)}%</span>
                  </div>
                  <Progress value={Math.round((academicData.consultations.filter(c => c.paraf).length / academicData.consultations.length) * 100)} className="h-3 rounded-full" />
                </div>

                <div className="pt-4">
                  <Link href="/dashboard/mahasiswa/academic/control-card">
                    <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                      <FileText className="mr-2 h-5 w-5" />
                      View Control Card ✨
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Recent Consultations 💬</CardTitle>
                  <CardDescription className="text-base">Latest advisor meetings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {academicData.consultations.slice(0, 3).map((consultation, index) => {
                  const gradients = [
                    'from-green-50 to-emerald-50 border-green-200/50',
                    'from-blue-50 to-cyan-50 border-blue-200/50',
                    'from-purple-50 to-pink-50 border-purple-200/50'
                  ]
                  return (
                    <div key={consultation.id} className={`group p-5 rounded-2xl bg-gradient-to-r ${gradients[index % 3]} border hover:shadow-lg transition-all`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800">📝 {consultation.uraian}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(consultation.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full text-white text-xs font-semibold shadow-sm ${
                          consultation.paraf ? 'bg-green-500' : 'bg-orange-500'
                        }`}>
                          {consultation.paraf ? '✅ Approved' : '⏳ Pending'}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-white/60 p-3 rounded-xl">{consultation.keterangan} 🎯</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-8">
          <Card className="border-none shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Document Hub 📄</CardTitle>
                  <CardDescription className="text-base">All your important academic documents</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="group p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200/50 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">📊 Academic Report Card (KHS)</p>
                      <p className="text-sm text-gray-600 mt-1">Semester 6 - Even 2022/2023</p>
                    </div>
                    <Button className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-md">
                      <FileText className="mr-2 h-4 w-4" />
                      Download ⬇️
                    </Button>
                  </div>
                </div>

                <div className="group p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">📝 Study Plan Card (KRS)</p>
                      <p className="text-sm text-gray-600 mt-1">Semester 7 - Odd 2023/2024</p>
                    </div>
                    <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md">
                      <FileText className="mr-2 h-4 w-4" />
                      Download ⬇️
                    </Button>
                  </div>
                </div>

                <div className="group p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">🎓 Transcript</p>
                      <p className="text-sm text-gray-600 mt-1">Last update: 15 September 2023</p>
                    </div>
                    <Button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md">
                      <FileText className="mr-2 h-4 w-4" />
                      Download ⬇️
                    </Button>
                  </div>
                </div>

                <div className="group p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800 flex items-center gap-2">🎯 Academic Control Card</p>
                      <p className="text-sm text-gray-600 mt-1">Semester 7 - Odd 2023/2024</p>
                    </div>
                    <Link href="/dashboard/mahasiswa/academic/control-card">
                      <Button className="rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md">
                        <FileText className="mr-2 h-4 w-4" />
                        View ✨
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-8">
          <Card className="border-none shadow-xl rounded-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Consultation Schedule 📅</CardTitle>
                  <CardDescription className="text-base">Upcoming meetings with your advisor</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {academicData.consultations.filter(c => !c.paraf).slice(0, 2).map((consultation, index) => {
                  const gradients = [
                    'from-yellow-50 to-orange-50 border-yellow-200/50',
                    'from-green-50 to-emerald-50 border-green-200/50'
                  ]
                  const badgeColors = [
                    'from-yellow-400 to-orange-400',
                    'from-green-400 to-emerald-400'
                  ]
                  return (
                    <div key={consultation.id} className={`group p-5 rounded-2xl bg-gradient-to-r ${gradients[index % 2]} border hover:shadow-lg transition-all`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-800 flex items-center gap-2">� {consultation.uraian}</p>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {new Date(consultation.date).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })} - 10:00 AM
                          </p>
                        </div>
                        <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${badgeColors[index % 2]} text-white text-xs font-semibold shadow-sm animate-pulse`}>
                          ⏰ Scheduled
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 bg-white/60 p-3 rounded-xl flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Faculty Room 3rd Floor - {academicData.academicAdvisor?.name || 'Academic Advisor'} 🏫
                      </p>
                    </div>
                  )
                })}

                {academicData.consultations.filter(c => !c.paraf).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming consultations scheduled</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    <Calendar className="mr-2 h-5 w-5" />
                    Schedule New Meeting ✨
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

