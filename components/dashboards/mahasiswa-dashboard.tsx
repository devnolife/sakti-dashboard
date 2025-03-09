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
} from "lucide-react"
import Link from "next/link"

export default function MahasiswaDashboard() {
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
            <div className="text-2xl font-bold">Semester 7</div>
            <div className="mt-1 text-xs text-muted-foreground">Ganjil 2023</div>
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
            <div className="text-2xl font-bold">3.75</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs font-normal text-green-600 border-green-200 bg-green-500/10">
                +0.05 dari semester lalu
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
            <div className="text-2xl font-bold">5</div>
            <div className="mt-1 text-xs text-muted-foreground">15 SKS</div>
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
            <div className="text-2xl font-bold">Menunggu</div>
            <div className="mt-1 text-xs text-muted-foreground">Pengajuan terkirim</div>
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
              <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Proyek Akhir Sistem Basis Data</p>
                  <p className="text-xs text-muted-foreground">Tenggat 2 hari lagi</p>
                </div>
                <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
                  Mendesak
                </Badge>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10">
                  <FileText className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Kuis Rekayasa Perangkat Lunak</p>
                  <p className="text-xs text-muted-foreground">Tenggat 5 hari lagi</p>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                  Penting
                </Badge>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Pengumpulan Sertifikat Bahasa Inggris KKP</p>
                  <p className="text-xs text-muted-foreground">Tenggat 10 hari lagi</p>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  KKP
                </Badge>
              </div>
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
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Penyelesaian Keseluruhan</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2 bg-primary/20" indicatorClassName="bg-primary" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Mata Kuliah Inti</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-green-500/20" indicatorClassName="bg-green-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Mata Kuliah Pilihan</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2 bg-amber-500/20" indicatorClassName="bg-amber-500" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Persyaratan KKP</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <Progress value={70} className="h-2 bg-secondary/20" indicatorClassName="bg-secondary" />
              </div>
              <div className="pt-2">
                <Link href="/dashboard/mahasiswa/kkp/requirements">
                  <Button variant="outline" size="sm" className="w-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Lengkapi Persyaratan KKP
                  </Button>
                </Link>
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

