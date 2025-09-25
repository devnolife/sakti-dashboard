import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Briefcase,
  Bell,
  CheckCircle2,
  Clock,
  BookMarked,
  Award,
  Lightbulb,
  AlertCircle,
  CreditCard,
} from "lucide-react"
import Link from "next/link"
import { StudentStatus } from "@/lib/generated/prisma"

interface DashboardData {
  student: {
    id: string
    nim: string
    name: string
    major: string
    department: string
    semester: number
    academicYear: string
    gpa: number
    status: StudentStatus
  }
  currentSemester: {
    courses: number
    credits: number
    academicYear: string
    period: string
  }
  kkpStatus: {
    status: string
    title: string
    company?: string
    supervisor?: string
    submissionDate: Date
  } | null
  upcomingDeadlines: Array<{
    id: string
    title: string
    date: Date
    type: string
    urgent: boolean
  }>
  currentCourses: Array<{
    id: string
    code: string
    name: string
    credits: number
    lecturer: string
    grade: string
    semester: string
    schedules: any[]
  }>
  weeklySchedule: Array<{
    day: string
    courseName: string
    courseCode: string
    time: string
    location: string
    lecturer: string
    credits: number
  }>
  pendingPayments: number
  activeBorrowings: number
  letterRequests: number
}

interface Props {
  dashboardData: DashboardData
}

export default function MahasiswaDashboard({ dashboardData }: Props) {
  return (
    <div className="space-y-8">
      {/* Quick Stats Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-sm font-medium">Semester Saat Ini</CardTitle>
            <div className="flex items-center justify-center rounded-full h-9 w-9 bg-primary/10">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">Semester {dashboardData.student.semester}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {dashboardData.currentSemester.period} {dashboardData.currentSemester.academicYear}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardTitle className="text-sm font-medium">IPK Terkini</CardTitle>
            <div className="flex items-center justify-center rounded-full h-9 w-9 bg-green-500/10">
              <GraduationCap className="w-5 h-5 text-green-500" />
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

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <CardTitle className="text-sm font-medium">Mata Kuliah Aktif</CardTitle>
            <div className="flex items-center justify-center rounded-full h-9 w-9 bg-secondary/10">
              <BookOpen className="w-5 h-5 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{dashboardData.currentSemester.courses}</div>
            <div className="mt-1 text-xs text-muted-foreground">{dashboardData.currentSemester.credits} SKS</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
            <CardTitle className="text-sm font-medium">Status KKP</CardTitle>
            <div className="flex items-center justify-center rounded-full h-9 w-9 bg-amber-500/10">
              <Briefcase className="w-5 h-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {dashboardData.kkpStatus ? 
                (dashboardData.kkpStatus.status === 'pending' ? 'Menunggu' :
                 dashboardData.kkpStatus.status === 'approved' ? 'Disetujui' :
                 dashboardData.kkpStatus.status === 'rejected' ? 'Ditolak' :
                 dashboardData.kkpStatus.status === 'in_progress' ? 'Berlangsung' :
                 dashboardData.kkpStatus.status === 'completed' ? 'Selesai' : 'Unknown') 
                : 'Belum Apply'
              }
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {dashboardData.kkpStatus?.company || 'Tidak ada pengajuan'}
            </div>
            <div className="mt-2">
              <Link href="/dashboard/mahasiswa/kkp">
                <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                  Lihat Status KKP
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Deadlines */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tenggat Waktu</CardTitle>
                <CardDescription>Tugas dan tanggal penting</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-primary">
                Lihat Semua
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingDeadlines.length > 0 ? (
                dashboardData.upcomingDeadlines.slice(0, 5).map((deadline) => {
                  const daysUntil = Math.ceil((new Date(deadline.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  const IconComponent = deadline.type === 'exam' ? AlertCircle : 
                                       deadline.type === 'payment' ? CreditCard : 
                                       deadline.type === 'library' ? BookMarked : FileText
                  
                  return (
                    <div key={deadline.id} className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        deadline.urgent ? 'bg-red-500/10' : 'bg-amber-500/10'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${deadline.urgent ? 'text-red-500' : 'text-amber-500'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {daysUntil === 0 ? 'Hari ini' : 
                           daysUntil === 1 ? 'Besok' : 
                           daysUntil < 0 ? 'Terlambat' : 
                           `${daysUntil} hari lagi`}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${deadline.urgent ? 'text-red-500 border-red-200 bg-red-500/10' : 'text-amber-500 border-amber-200 bg-amber-500/10'}`}
                      >
                        {deadline.urgent ? 'Mendesak' : 'Segera'}
                      </Badge>
                    </div>
                  )
                })
              ) : (
                <div className="flex items-center justify-center p-6 text-muted-foreground">
                  <p>Tidak ada tenggat waktu terbaru</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Degree Progress */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Progres Studi</CardTitle>
                <CardDescription>Kemajuan Anda menuju kelulusan</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-primary">
                Detail
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-center">
                  <div className="text-2xl font-bold">{dashboardData.student.semester}</div>
                  <p className="text-sm text-muted-foreground">Semester Saat Ini</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mata Kuliah Aktif</span>
                  <span className="font-medium">{dashboardData.currentSemester.courses} mata kuliah</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">SKS Semester Ini</span>
                  <span className="font-medium">{dashboardData.currentSemester.credits} SKS</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">IPK Terkini</span>
                  <span className="font-medium">{dashboardData.student.gpa.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Status</span>
                  <Badge variant="outline" className={`${
                    dashboardData.student.status === 'active' ? 'text-green-600 border-green-200 bg-green-500/10' :
                    dashboardData.student.status === 'suspended' ? 'text-red-600 border-red-200 bg-red-500/10' :
                    'text-gray-600 border-gray-200 bg-gray-500/10'
                  }`}>
                    {dashboardData.student.status === 'active' ? 'Aktif' :
                     dashboardData.student.status === 'suspended' ? 'Suspend' :
                     dashboardData.student.status === 'graduated' ? 'Lulus' :
                     dashboardData.student.status === 'dropped_out' ? 'Dropout' :
                     dashboardData.student.status}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-2 space-y-2">
                <Link href="/dashboard/mahasiswa/academic">
                  <Button variant="outline" size="sm" className="w-full">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Lihat Data Akademik
                  </Button>
                </Link>
                
                {dashboardData.pendingPayments > 0 && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-200">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-800">
                        {dashboardData.pendingPayments} pembayaran tertunda
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements Section */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pengumuman Terbaru</CardTitle>
              <CardDescription>Informasi penting dari mata kuliah dan universitas</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-8 text-primary">
              Lihat Semua
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 mt-1 rounded-full bg-primary/10">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">Periode Pendaftaran KKP Telah Dibuka</h3>
                  <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
                    Baru
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Periode pendaftaran KKP untuk semester mendatang telah dibuka. Silakan kirim pengajuan Anda sebelum 15 Oktober 2023.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Link href="/dashboard/mahasiswa/kkp/application">
                    <Button variant="outline" size="sm" className="h-8">
                      Daftar Sekarang
                    </Button>
                  </Link>
                  <p className="text-xs text-muted-foreground">Diposting 2 hari yang lalu</p>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 mt-1 rounded-full bg-secondary/10">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1 font-medium">Jadwal Ujian Tengah Semester Telah Dirilis</h3>
                <p className="text-sm text-muted-foreground">
                  Jadwal ujian tengah semester untuk semester Ganjil 2023 telah dirilis. Silakan periksa portal mahasiswa untuk detailnya.
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Button variant="outline" size="sm" className="h-8">
                    Lihat Jadwal
                  </Button>
                  <p className="text-xs text-muted-foreground">Diposting 5 hari yang lalu</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/mahasiswa/courses">
          <Card className="h-full overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10">
                <BookMarked className="w-6 h-6 text-primary" />
              </div>
              <h3 className="mb-1 font-medium">Mata Kuliah Saya</h3>
              <p className="text-sm text-muted-foreground">Akses mata kuliah dan materi Anda</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/mahasiswa/grades">
          <Card className="h-full overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-green-500/10">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="mb-1 font-medium">Nilai Saya</h3>
              <p className="text-sm text-muted-foreground">Lihat performa akademik Anda</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/mahasiswa/schedule">
          <Card className="h-full overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-amber-500/10">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="mb-1 font-medium">Jadwal Saya</h3>
              <p className="text-sm text-muted-foreground">Periksa jadwal kuliah mingguan Anda</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/mahasiswa/kkp">
          <Card className="h-full overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-secondary/10">
                <Lightbulb className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="mb-1 font-medium">Program KKP</h3>
              <p className="text-sm text-muted-foreground">Kelola persyaratan magang Anda</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

