import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  BarChart,
  ClipboardCheck,
  Calendar,
  GraduationCap,
  FileText,
  Bell,
  ArrowUpRight,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function ProdiPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Dashboard Program Studi
          </span>
        </h2>
        <p className="text-muted-foreground">Kelola program studi, pantau kemajuan akademik, dan kelola persetujuan.</p>
      </div>

      {/* Key Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-xs text-green-500">+15 dari semester lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Mata Kuliah Aktif</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <BookOpen className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">5 mata kuliah baru</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Persetujuan Magang</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
              <ClipboardCheck className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="flex items-center mt-1">
              <span className="text-xs bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full">
                ⏳ Perlu ditinjau
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tingkat Kelulusan</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10">
              <BarChart className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-xs text-green-500">+5% dari tahun lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="overflow-hidden lg:col-span-2 gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>Aktivitas terkini di program studi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Pendaftaran Mata Kuliah Semester Baru</p>
                  <p className="text-xs text-muted-foreground">245 mahasiswa telah mendaftar untuk semester baru</p>
                  <div className="mt-1">
                    <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Berlangsung</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 shrink-0">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Revisi Kurikulum</p>
                  <p className="text-xs text-muted-foreground">
                    Revisi kurikulum untuk tahun akademik 2024/2025 telah dimulai
                  </p>
                  <div className="mt-1">
                    <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Dalam Proses</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 shrink-0">
                  <ClipboardCheck className="w-5 h-5 text-accent" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Persetujuan Magang</p>
                  <p className="text-xs text-muted-foreground">12 pengajuan magang baru memerlukan persetujuan</p>
                  <div className="mt-1">
                    <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                      Memerlukan Tindakan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Jadwal Mendatang
            </CardTitle>
            <CardDescription>Kegiatan yang akan datang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col p-3 space-y-1 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Rapat Dosen</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">20 Okt</span>
                </div>
                <p className="text-xs text-muted-foreground">Ruang Rapat Utama, 09:00 - 12:00</p>
              </div>

              <div className="flex flex-col p-3 space-y-1 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Evaluasi Tengah Semester</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">25 Okt</span>
                </div>
                <p className="text-xs text-muted-foreground">Semua Kelas, 08:00 - 17:00</p>
              </div>

              <div className="flex flex-col p-3 space-y-1 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Persiapan Akreditasi</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">1 Nov</span>
                </div>
                <p className="text-xs text-muted-foreground">Ruang Seminar, 13:00 - 16:00</p>
              </div>

              <div className="flex flex-col p-3 space-y-1 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Seminar Nasional</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">5 Nov</span>
                </div>
                <p className="text-xs text-muted-foreground">Auditorium, 09:00 - 15:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/prodi/exams/approval">
          <Card className="h-full overflow-hidden transition-all gradient-border card-hover hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <FileText className="w-4 h-4 mr-2" />
                Persetujuan Ujian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola persetujuan ujian dan jadwal</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/prodi/kkp">
          <Card className="h-full overflow-hidden transition-all gradient-border card-hover hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Manajemen KKP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola KKP dan magang mahasiswa</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/prodi/correspondence">
          <Card className="h-full overflow-hidden transition-all gradient-border card-hover hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <Bell className="w-4 h-4 mr-2" />
                Korespondensi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola surat dan dokumen resmi</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/prodi/internship-approval">
          <Card className="h-full overflow-hidden transition-all gradient-border card-hover hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <GraduationCap className="w-4 h-4 mr-2" />
                Persetujuan Magang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola persetujuan magang mahasiswa</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Program Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Statistik Program
            </CardTitle>
            <CardDescription>Ringkasan statistik program studi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Rata-rata IPK</span>
                <div className="flex items-center">
                  <span className="font-medium">3.45</span>
                  <span className="ml-2 text-xs text-green-500">+0.05</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: "85%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Tingkat Kehadiran</span>
                <div className="flex items-center">
                  <span className="font-medium">88%</span>
                  <span className="ml-2 text-xs text-green-500">+2%</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: "88%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Penyelesaian Tugas</span>
                <div className="flex items-center">
                  <span className="font-medium">92%</span>
                  <span className="ml-2 text-xs text-green-500">+3%</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: "92%" }}
                ></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Kepuasan Mahasiswa</span>
                <div className="flex items-center">
                  <span className="font-medium">4.2/5</span>
                  <span className="ml-2 text-xs text-green-500">+0.3</span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: "84%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Distribusi Mahasiswa
            </CardTitle>
            <CardDescription>Berdasarkan angkatan dan status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Angkatan 2020</p>
                  <p className="mt-1 text-2xl font-bold">85</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 82 | Cuti: 3</span>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Angkatan 2021</p>
                  <p className="mt-1 text-2xl font-bold">90</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 88 | Cuti: 2</span>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Angkatan 2022</p>
                  <p className="mt-1 text-2xl font-bold">75</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 75 | Cuti: 0</span>
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <p className="text-sm font-medium">Angkatan 2023</p>
                  <p className="mt-1 text-2xl font-bold">70</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 70 | Cuti: 0</span>
                  </div>
                </div>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Total Mahasiswa Aktif</p>
                  <p className="text-sm font-bold">315</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-medium">Total Mahasiswa Cuti</p>
                  <p className="text-sm font-bold">5</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

