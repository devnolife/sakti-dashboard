import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Building2,
  TrendingUp,
  DollarSign,
  ClipboardCheck,
  AlertCircle,
  Award,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  Target
} from "lucide-react"

export default function DekanPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashboard Dekan
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Executive Overview & Strategic Management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-3 py-1">
              Semester Ganjil 2023/2024
            </Badge>
            <Button size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Jadwal Hari Ini
            </Button>
          </div>
        </div>
      </div>

      {/* Executive KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Mahasiswa</CardTitle>
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">3,245</div>
            <div className="flex items-center gap-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">+120 (3.8%)</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">vs. tahun lalu</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Program Studi</CardTitle>
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
              <Building2 className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">8</div>
            <div className="flex items-center gap-2 mt-2">
              <Award className="h-4 w-4 text-green-500" />
              <p className="text-sm text-green-600 font-medium">6 Terakreditasi A</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">2 sedang proses</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Tingkat Kelulusan</CardTitle>
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
              <Target className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">89.2%</div>
            <div className="mt-3">
              <Progress value={89.2} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Target: 90%</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Anggaran Fakultas</CardTitle>
            <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900">
              <DollarSign className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">Rp 12.5M</div>
            <div className="mt-3">
              <Progress value={68} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">68% terrealisasi</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Pending Approvals */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                <ClipboardCheck className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Persetujuan Pending</CardTitle>
                <CardDescription>Memerlukan perhatian Anda</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-950">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Surat Persetujuan</p>
                  <p className="text-xs text-muted-foreground">5 dokumen</p>
                </div>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Keputusan Akademik</p>
                  <p className="text-xs text-muted-foreground">3 keputusan</p>
                </div>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950">
              <div className="flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium">Anggaran</p>
                  <p className="text-xs text-muted-foreground">2 proposal</p>
                </div>
              </div>
              <Badge variant="outline">Review</Badge>
            </div>

            <Button className="w-full" size="sm">
              Lihat Semua Persetujuan
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">KPI Fakultas</CardTitle>
                <CardDescription>Indikator kinerja utama</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Kepuasan Mahasiswa</span>
                <span className="text-sm text-green-600 font-semibold">4.2/5.0</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Rasio Dosen:Mahasiswa</span>
                <span className="text-sm text-blue-600 font-semibold">1:15</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Publikasi Ilmiah</span>
                <span className="text-sm text-purple-600 font-semibold">142 paper</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <Separator />

            <Button variant="outline" className="w-full" size="sm">
              Detail Analytics
              <BarChart3 className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Aktivitas Terkini</CardTitle>
                <CardDescription>Update terbaru fakultas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-100 dark:bg-green-900 mt-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Rapat Pimpinan Fakultas</p>
                <p className="text-xs text-muted-foreground">Selesai - 2 jam lalu</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-blue-100 dark:bg-blue-900 mt-1">
                <Clock className="h-3 w-3 text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Review Kurikulum Prodi SI</p>
                <p className="text-xs text-muted-foreground">Berlangsung - 14:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-orange-100 dark:bg-orange-900 mt-1">
                <AlertCircle className="h-3 w-3 text-orange-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Kunjungan Industri</p>
                <p className="text-xs text-muted-foreground">Besok - 08:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-purple-100 dark:bg-purple-900 mt-1">
                <Calendar className="h-3 w-3 text-purple-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Seminar Nasional</p>
                <p className="text-xs text-muted-foreground">5 Nov - Planning</p>
              </div>
            </div>

            <Button variant="ghost" className="w-full justify-start" size="sm">
              Lihat Semua Aktivitas
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <Building2 className="h-6 w-6 text-blue-600" />
              Ikhtisar Program Studi
            </CardTitle>
            <CardDescription>Status dan perkembangan program studi</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">Teknik Informatika</h4>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                    Akreditasi A
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Mahasiswa</p>
                    <p className="font-semibold">1,245</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dosen</p>
                    <p className="font-semibold">45</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lulusan</p>
                    <p className="font-semibold">89%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">Sistem Informasi</h4>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                    Akreditasi A
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Mahasiswa</p>
                    <p className="font-semibold">890</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Dosen</p>
                    <p className="font-semibold">32</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Lulusan</p>
                    <p className="font-semibold">92%</p>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Lihat Semua Program Studi
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              Strategic Financial Overview
            </CardTitle>
            <CardDescription>Ringkasan keuangan dan anggaran strategis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Anggaran Operasional</span>
                  <span className="text-lg font-bold text-blue-700">Rp 5.2M</span>
                </div>
                <Progress value={68} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">68% terrealisasi</p>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Anggaran Penelitian</span>
                  <span className="text-lg font-bold text-purple-700">Rp 3.8M</span>
                </div>
                <Progress value={45} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">45% terrealisasi</p>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Anggaran Pengembangan</span>
                  <span className="text-lg font-bold text-green-700">Rp 2.5M</span>
                </div>
                <Progress value={32} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground">32% terrealisasi</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Detail Finansial
              <BarChart3 className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

