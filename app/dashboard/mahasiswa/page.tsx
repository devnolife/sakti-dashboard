"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CalendarDays,
  GraduationCap,
  BookOpen,
  Clock,
  Bell,
  FileText,
  Calendar,
  BarChart4,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import MahasiswaDashboard from "@/components/dashboards/mahasiswa-dashboard"

export default function MahasiswaPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && user?.role !== 'mahasiswa') {
      router.push('/login')
      return
    }

    if (!isLoading && user?.role === 'mahasiswa') {
      const fetchData = async () => {
        try {
          setLoading(true)
          const [dashboardResponse, notificationsResponse] = await Promise.all([
            fetch('/api/student/dashboard'),
            fetch('/api/student/notifications')
          ])
          
          if (!dashboardResponse.ok) {
            throw new Error('Failed to fetch dashboard data')
          }
          
          if (!notificationsResponse.ok) {
            throw new Error('Failed to fetch notifications')
          }
          
          const dashboardResult = await dashboardResponse.json()
          const notificationsResult = await notificationsResponse.json()
          
          setDashboardData(dashboardResult)
          setNotifications(notificationsResult)
        } catch (err) {
          console.error('Error fetching student data:', err)
          setError('Failed to load dashboard data')
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }, [user, isLoading, router])

  if (isLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Reload
          </Button>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Dashboard Mahasiswa
          </span>
        </h1>
        <p className="mt-2 text-muted-foreground">Selamat datang, {dashboardData.student.name}</p>
      </div>

      <MahasiswaDashboard dashboardData={dashboardData} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="border bg-background h-11">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BarChart4 className="w-4 h-4 mr-2" />
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BookOpen className="w-4 h-4 mr-2" />
            Mata Kuliah
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Calendar className="w-4 h-4 mr-2" />
            Jadwal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-primary/5 to-primary/10">
                <CardTitle className="text-sm font-medium">IPK</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{dashboardData.student.gpa.toFixed(2)}</div>
                <div className="flex items-center mt-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-normal ${
                      dashboardData.student.gpa >= 3.5 
                        ? 'text-green-600 border-green-200 bg-green-500/10' 
                        : dashboardData.student.gpa >= 3.0
                        ? 'text-blue-600 border-blue-200 bg-blue-500/10'
                        : 'text-amber-600 border-amber-200 bg-amber-500/10'
                    }`}
                  >
                    {dashboardData.student.gpa >= 3.5 ? 'Sangat Baik' : dashboardData.student.gpa >= 3.0 ? 'Baik' : 'Cukup'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-secondary/5 to-secondary/10">
                <CardTitle className="text-sm font-medium">SKS Semester Ini</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20">
                  <BookOpen className="w-4 h-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{dashboardData.currentSemester.credits}</div>
                <p className="mt-1 text-xs text-muted-foreground">{dashboardData.currentSemester.courses} mata kuliah aktif</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-green-500/5 to-green-500/10">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                  <Clock className="w-4 h-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">
                  {dashboardData.student.status === 'active' ? 'Aktif' :
                   dashboardData.student.status === 'suspended' ? 'Suspend' :
                   dashboardData.student.status === 'graduated' ? 'Lulus' :
                   dashboardData.student.status === 'dropped_out' ? 'Dropout' :
                   dashboardData.student.status}
                </div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className={`text-xs font-normal ${
                      dashboardData.student.status === 'active' ? 'text-green-600 border-green-200 bg-green-500/10' :
                      'text-red-600 border-red-200 bg-red-500/10'
                    }`}
                  >
                    Semester {dashboardData.student.semester}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
                <CardTitle className="text-sm font-medium">Tenggat Waktu</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
                  <CalendarDays className="w-4 h-4 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{dashboardData.upcomingDeadlines.length}</div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="text-xs font-normal bg-amber-500/10 text-amber-600 border-amber-200"
                  >
                    {dashboardData.upcomingDeadlines.filter((d: any) => d.urgent).length} mendesak
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Aktivitas Akademik</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-primary">
                    Lihat Semua
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.upcomingDeadlines.length > 0 ? (
                    dashboardData.upcomingDeadlines.slice(0, 4).map((deadline: any) => {
                      const daysUntil = deadline.date ? Math.ceil((new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0
                      const IconComponent = deadline.type === 'exam' ? AlertCircle : 
                                           deadline.type === 'payment' ? FileText : 
                                           deadline.type === 'library' ? BookOpen : Bell
                      
                      return (
                        <div key={deadline.id} className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            deadline.urgent ? 'bg-red-500/10' : 'bg-amber-500/10'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${deadline.urgent ? 'text-red-500' : 'text-amber-500'}`} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{deadline.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {deadline.date ? new Date(deadline.date).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              }) : 'Tanggal tidak tersedia'}
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${deadline.urgent ? 'text-red-500 border-red-200 bg-red-500/10' : 'text-amber-500 border-amber-200 bg-amber-500/10'}`}
                          >
                            {deadline.urgent ? 'Mendesak' : 
                             daysUntil === 0 ? 'Hari ini' : 
                             daysUntil === 1 ? 'Besok' : 
                             daysUntil < 0 ? 'Terlambat' : 
                             `${daysUntil} hari`}
                          </Badge>
                        </div>
                      )
                    })
                  ) : (
                    <div className="flex items-center justify-center p-6 text-muted-foreground">
                      <p>Tidak ada aktivitas akademik mendatang</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Pengumuman</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-primary">
                    Lihat Semua
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Static announcements for now - could be made dynamic later */}
                  <div className="p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
                        Penting
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date().toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <p className="font-medium">Sistem Dashboard Mahasiswa Aktif</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Dashboard mahasiswa telah diperbarui dengan data real dari database. 
                      Anda dapat melihat informasi akademik terkini.
                    </p>
                  </div>

                  {dashboardData.kkpStatus && (
                    <div className="p-3 border rounded-lg bg-muted/50 border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          KKP
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(dashboardData.kkpStatus.submissionDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <p className="font-medium">Status KKP: {dashboardData.kkpStatus.status}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {dashboardData.kkpStatus.company && `Perusahaan: ${dashboardData.kkpStatus.company}`}
                      </p>
                    </div>
                  )}

                  {dashboardData.pendingPayments > 0 && (
                    <div className="p-3 border rounded-lg bg-muted/50 border-border/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-500/10">
                          Keuangan
                        </Badge>
                        <p className="text-xs text-muted-foreground">Perhatian</p>
                      </div>
                      <p className="font-medium">Pembayaran Tertunda</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Anda memiliki {dashboardData.pendingPayments} pembayaran yang perlu diselesaikan.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Mata Kuliah Semester Ini</CardTitle>
              <CardDescription>Mata kuliah yang Anda ambil semester ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dashboardData.currentCourses.length > 0 ? (
                  dashboardData.currentCourses.map((course: any, index: number) => {
                    const colors = ["primary", "secondary", "green-500", "amber-500", "purple-500", "blue-500"]
                    const color = colors[index % colors.length]
                    
                    return (
                      <Card key={course.id} className="overflow-hidden transition-all border shadow-sm hover:shadow-md">
                        <div className={`h-2 bg-${color}`} />
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{course.name}</CardTitle>
                          <CardDescription>
                            {course.credits} SKS - {course.lecturer}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Kode:</span>
                            <span className="font-medium">{course.code}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Nilai:</span>
                            <span className="font-medium">{course.grade || 'Belum ada'}</span>
                          </div>
                          <div className="mt-2">
                            <Button variant="outline" size="sm" className="w-full">
                              Lihat Detail
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center p-6 text-muted-foreground">
                    <p>Tidak ada mata kuliah aktif semester ini</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Status Akademik</CardTitle>
              <CardDescription>Ringkasan status akademik Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-lg font-bold">{dashboardData.student.nim}</div>
                    <p className="text-sm text-muted-foreground">NIM</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-lg font-bold">{dashboardData.student.major}</div>
                    <p className="text-sm text-muted-foreground">Program Studi</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-lg font-bold">{dashboardData.student.department}</div>
                    <p className="text-sm text-muted-foreground">Fakultas</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="text-center">
                    <div className="text-lg font-bold">{dashboardData.student.academicYear}</div>
                    <p className="text-sm text-muted-foreground">Tahun Masuk</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Jadwal Mingguan</CardTitle>
              <CardDescription>Jadwal kelas Anda untuk minggu ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dashboardData.weeklySchedule.length > 0 ? (
                  // Group schedules by day
                  (() => {
                    const groupedSchedule = dashboardData.weeklySchedule.reduce((acc: any, schedule: any) => {
                      if (!acc[schedule.day]) {
                        acc[schedule.day] = []
                      }
                      acc[schedule.day].push(schedule)
                      return acc
                    }, {})

                    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
                    const colors = ['primary', 'secondary', 'green-500', 'amber-500', 'purple-500', 'blue-500', 'pink-500']

                    return days.map((day, index) => (
                      <div key={day} className="overflow-hidden border rounded-lg">
                        <div className={`bg-${colors[index % colors.length]}/10 px-4 py-3 font-medium border-b`}>
                          {day}
                        </div>
                        <div className="p-4">
                          {groupedSchedule[day] && groupedSchedule[day].length > 0 ? (
                            <div className="space-y-4">
                              {groupedSchedule[day].map((schedule: any, idx: number) => (
                                <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                                  <div>
                                    <p className="font-medium">{schedule.courseName}</p>
                                    <p className="text-sm text-muted-foreground">{schedule.time}</p>
                                    <p className="text-xs text-muted-foreground">{schedule.lecturer}</p>
                                  </div>
                                  <div className="px-2 py-1 text-sm border rounded-md text-muted-foreground bg-background">
                                    {schedule.location}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex items-center justify-center p-6 text-muted-foreground">
                              <p>Tidak ada jadwal kelas</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  })()
                ) : (
                  <div className="text-center p-6 text-muted-foreground">
                    <p>Belum ada jadwal mata kuliah tersedia</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Acara Mendatang</CardTitle>
              <CardDescription>Acara akademik penting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10">
                    <CalendarDays className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Periode Ujian Tengah Semester</p>
                    <p className="text-sm text-muted-foreground">15-25 Oktober 2023</p>
                  </div>
                  <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
                    10 hari
                  </Badge>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Pendaftaran Mata Kuliah untuk Semester Berikutnya</p>
                    <p className="text-sm text-muted-foreground">1-15 November 2023</p>
                  </div>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
                    27 hari
                  </Badge>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10">
                    <Bell className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Periode Ujian Akhir</p>
                    <p className="text-sm text-muted-foreground">10-20 Desember 2023</p>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                    67 hari
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

