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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dashboard Program Studi
          </span>
        </h2>
        <p className="text-muted-foreground">Kelola program studi, pantau kemajuan akademik, dan kelola persetujuan.</p>
      </div>

      {/* Key Metrics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+15 dari semester lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mata Kuliah Aktif</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-secondary" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Persetujuan Magang</CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <ClipboardCheck className="h-4 w-4 text-accent" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tingkat Kelulusan</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
              <BarChart className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+5% dari tahun lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>Aktivitas terkini di program studi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Pendaftaran Mata Kuliah Semester Baru</p>
                  <p className="text-xs text-muted-foreground">245 mahasiswa telah mendaftar untuk semester baru</p>
                  <div className="mt-1">
                    <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Berlangsung</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border p-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-secondary" />
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

              <div className="flex items-start gap-4 rounded-xl border p-4">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="h-5 w-5 text-accent" />
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
              <Calendar className="mr-2 h-5 w-5" />
              Jadwal Mendatang
            </CardTitle>
            <CardDescription>Kegiatan yang akan datang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Rapat Dosen</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">20 Okt</span>
                </div>
                <p className="text-xs text-muted-foreground">Ruang Rapat Utama, 09:00 - 12:00</p>
              </div>

              <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Evaluasi Tengah Semester</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">25 Okt</span>
                </div>
                <p className="text-xs text-muted-foreground">Semua Kelas, 08:00 - 17:00</p>
              </div>

              <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Persiapan Akreditasi</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">1 Nov</span>
                </div>
                <p className="text-xs text-muted-foreground">Ruang Seminar, 13:00 - 16:00</p>
              </div>

              <div className="flex flex-col space-y-1 rounded-lg border p-3">
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
          <Card className="overflow-hidden gradient-border card-hover h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                Persetujuan Ujian
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola persetujuan ujian dan jadwal</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/prodi/kkp">
          <Card className="overflow-hidden gradient-border card-hover h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Manajemen KKP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola KKP dan magang mahasiswa</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/prodi/correspondence">
          <Card className="overflow-hidden gradient-border card-hover h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Bell className="mr-2 h-4 w-4" />
                Korespondensi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Kelola surat dan dokumen resmi</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/prodi/internship-approval">
          <Card className="overflow-hidden gradient-border card-hover h-full transition-all hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
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
              <BarChart className="mr-2 h-5 w-5" />
              Statistik Program
            </CardTitle>
            <CardDescription>Ringkasan statistik program studi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Rata-rata IPK</span>
                <div className="flex items-center">
                  <span className="font-medium">3.45</span>
                  <span className="text-xs text-green-500 ml-2">+0.05</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Tingkat Kehadiran</span>
                <div className="flex items-center">
                  <span className="font-medium">88%</span>
                  <span className="text-xs text-green-500 ml-2">+2%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: "88%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Penyelesaian Tugas</span>
                <div className="flex items-center">
                  <span className="font-medium">92%</span>
                  <span className="text-xs text-green-500 ml-2">+3%</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Kepuasan Mahasiswa</span>
                <div className="flex items-center">
                  <span className="font-medium">4.2/5</span>
                  <span className="text-xs text-green-500 ml-2">+0.3</span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  style={{ width: "84%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Distribusi Mahasiswa
            </CardTitle>
            <CardDescription>Berdasarkan angkatan dan status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Angkatan 2020</p>
                  <p className="text-2xl font-bold mt-1">85</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 82 | Cuti: 3</span>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Angkatan 2021</p>
                  <p className="text-2xl font-bold mt-1">90</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 88 | Cuti: 2</span>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Angkatan 2022</p>
                  <p className="text-2xl font-bold mt-1">75</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 75 | Cuti: 0</span>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Angkatan 2023</p>
                  <p className="text-2xl font-bold mt-1">70</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-muted-foreground">Aktif: 70 | Cuti: 0</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Total Mahasiswa Aktif</p>
                  <p className="text-sm font-bold">315</p>
                </div>
                <div className="flex justify-between items-center mt-2">
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

