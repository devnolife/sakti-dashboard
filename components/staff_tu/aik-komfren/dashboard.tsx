"use client"
import { useRouter } from "next/navigation"
import {
  Users,
  UserCheck,
  CheckCircle,
  Calendar,
  CreditCard,
  ArrowRight,
  BookOpen,
  FileText,
  BarChart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function AikKomfrenDashboard() {
  const router = useRouter()

  // Mock statistics
  const stats = {
    totalRegistrations: 125,
    paidRegistrations: 110,
    pendingPayments: 15,
    totalExamGroups: 12,
    scheduledExams: 5,
    inProgressExams: 3,
    completedExams: 4,
    totalExamined: 85,
    passedExams: 78,
    failedExams: 7,
    certificatesIssued: 78,
  }

  // Calculate percentages
  const paymentRate = (stats.paidRegistrations / stats.totalRegistrations) * 100
  const examCompletionRate = (stats.totalExamined / stats.paidRegistrations) * 100
  const passRate = (stats.passedExams / stats.totalExamined) * 100

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      type: "registration",
      studentName: "Ahmad Fauzi",
      timestamp: "2023-06-01T09:30:00",
      description: "Terdaftar untuk ujian AIK Komfren",
    },
    {
      id: "2",
      type: "payment",
      studentName: "Siti Nurhaliza",
      timestamp: "2023-06-01T10:15:00",
      description: "Pembayaran terverifikasi untuk ujian AIK Komfren",
    },
    {
      id: "3",
      type: "group",
      studentName: "Staff",
      timestamp: "2023-06-01T11:00:00",
      description: 'Membuat kelompok ujian baru "Kelompok D"',
    },
    {
      id: "4",
      type: "exam",
      studentName: "Dr. Abdul Rahman",
      timestamp: "2023-06-01T13:45:00",
      description: "Menyelesaikan ujian untuk 3 mahasiswa",
    },
    {
      id: "5",
      type: "certificate",
      studentName: "System",
      timestamp: "2023-06-01T14:30:00",
      description: "Generate 3 sertifikat baru",
    },
  ]

  // Navigate to different sections
  const navigateToRegistration = () => router.push("/dashboard/staff_tu/aik-komfren/registration")
  const navigateToExamination = () => router.push("/dashboard/staff_tu/aik-komfren/examination")
  const navigateToCompletion = () => router.push("/dashboard/staff_tu/aik-komfren/completion")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Manajemen AIK Komfren</h2>
        <p className="text-muted-foreground">
          Kelola proses ujian AIK Komfren mulai dari pendaftaran hingga penyelesaian.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Pendaftaran
            </CardTitle>
            <CardDescription>Kelola pendaftaran mahasiswa</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalRegistrations}</p>
                  <p className="text-sm text-muted-foreground">Total Pendaftar</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.paidRegistrations}</p>
                  <p className="text-sm text-muted-foreground">Lunas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Tingkat Pembayaran</span>
                  <span className="font-medium">{paymentRate.toFixed(1)}%</span>
                </div>
                <Progress value={paymentRate} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={navigateToRegistration}>
              Lihat Pendaftaran
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
          <div className="absolute top-0 right-0 p-3">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
              Tahap 1
            </Badge>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-purple-600" />
              Pelaksanaan Ujian
            </CardTitle>
            <CardDescription>Kelola kelompok ujian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalExamGroups}</p>
                  <p className="text-sm text-muted-foreground">Total Kelompok</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduledExams}</p>
                  <p className="text-sm text-muted-foreground">Terjadwal</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.completedExams}</p>
                  <p className="text-sm text-muted-foreground">Selesai</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Tingkat Penyelesaian Ujian</span>
                  <span className="font-medium">{examCompletionRate.toFixed(1)}%</span>
                </div>
                <Progress value={examCompletionRate} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={navigateToExamination}>
              Kelola Ujian
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
          <div className="absolute top-0 right-0 p-3">
            <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">
              Tahap 2
            </Badge>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Penyelesaian
            </CardTitle>
            <CardDescription>Lihat hasil ujian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalExamined}</p>
                  <p className="text-sm text-muted-foreground">Total Diuji</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.passedExams}</p>
                  <p className="text-sm text-muted-foreground">Lulus</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.failedExams}</p>
                  <p className="text-sm text-muted-foreground">Tidak Lulus</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Tingkat Kelulusan</span>
                  <span className="font-medium">{passRate.toFixed(1)}%</span>
                </div>
                <Progress value={passRate} max={100} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={navigateToCompletion}>
              Lihat Hasil
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardFooter>
          <div className="absolute top-0 right-0 p-3">
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              Tahap 3
            </Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas terkini dalam proses ujian AIK Komfren.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="p-2 rounded-full bg-muted">
                    {activity.type === "registration" && <Users className="w-4 h-4 text-blue-600" />}
                    {activity.type === "payment" && <CreditCard className="w-4 h-4 text-green-600" />}
                    {activity.type === "group" && <Calendar className="w-4 h-4 text-purple-600" />}
                    {activity.type === "exam" && <BookOpen className="w-4 h-4 text-orange-600" />}
                    {activity.type === "certificate" && <FileText className="w-4 h-4 text-teal-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>Tugas umum untuk manajemen AIK Komfren.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="justify-start w-full" onClick={navigateToRegistration}>
              <Users className="w-4 h-4 mr-2" />
              Verifikasi Pembayaran Menunggu
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={navigateToExamination}>
              <UserCheck className="w-4 h-4 mr-2" />
              Buat Kelompok Ujian
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={navigateToExamination}>
              <Calendar className="w-4 h-4 mr-2" />
              Tetapkan Pengawas
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={navigateToCompletion}>
              <FileText className="w-4 h-4 mr-2" />
              Generate Sertifikat
            </Button>
            <Button variant="outline" className="justify-start w-full" onClick={navigateToCompletion}>
              <BarChart className="w-4 h-4 mr-2" />
              Lihat Statistik Ujian
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

