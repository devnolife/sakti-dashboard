"use client"

import { useRole } from "@/context/role-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { roleLabels } from "@/types/role"
import {
  BarChart,
  BookOpen,
  Calendar,
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  Zap,
  ClipboardCheck,
  Building,
  FileSearch,
} from "lucide-react"

export default function DashboardOverview() {
  const { role } = useRole()

  // Function to dispatch navigation event
  const navigateTo = (section: string) => {
    window.dispatchEvent(new CustomEvent("navigationChange", { detail: section }))
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Selamat Datang di Dashboard {roleLabels[role]}
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Berikut adalah ringkasan informasi utama dan aktivitas terbaru Anda.
        </p>
      </div>

      {role === "mahasiswa" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Mata Kuliah Saat Ini</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">2 tugas harus diselesaikan minggu ini</span>
                <span className="ml-1 text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded-full">⚡ Aktif</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("courses")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Persyaratan Magang</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
                <ClipboardCheck className="w-4 h-4 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">70%</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs text-green-500">7 dari 10 persyaratan selesai</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("requirements")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Lokasi Magang</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                <Building className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Lokasi tersedia untuk dipilih</span>
                <span className="ml-1 text-xs bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded-full">
                  🔍 Jelajahi
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("internship-locations")}>
                  Lihat Lokasi
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pengajuan Lokasi</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <FileSearch className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Pengajuan sedang menunggu review</span>
                <span className="ml-1 text-xs bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full">
                  ⏳ Menunggu
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("new-location")}>
                  Lihat Pengajuan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Keep the existing cards for other roles */}
      {role === "admin" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pendaftaran Mahasiswa</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.245</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs text-green-500">+5% dari semester lalu</span>
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
              <div className="text-3xl font-bold">87</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Dari 12 jurusan</span>
                <span className="ml-1 text-xs bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded-full">🎓 Aktif</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("courses")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Permintaan Tertunda</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">12 memerlukan perhatian segera</span>
                <span className="ml-1 text-xs bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full">
                  ⚠️ Mendesak
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("location-review")}>
                  Review Lokasi
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Anggota Fakultas</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Users className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">142</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">8 rekrutan baru semester ini</span>
                <span className="ml-1 text-xs bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-full">+8 Baru</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("faculty")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {role === "kepala_jurusan" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Staf Jurusan</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Users className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">3 posisi terbuka</span>
                <span className="ml-1 text-xs bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded-full">
                  🔍 Rekrutmen
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("faculty")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Mata Kuliah Jurusan</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
                <BookOpen className="w-4 h-4 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">32</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs text-green-500">+2 dari semester lalu</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("courses")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pengajuan Lokasi</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                <Building className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Menunggu persetujuan</span>
                <span className="ml-1 text-xs bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full">
                  ⏳ Review
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("location-review")}>
                  Review Lokasi
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pendaftaran Mahasiswa</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <GraduationCap className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">342</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs text-green-500">+8% dari tahun lalu</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("students")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {role === "dekan" && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Fakultas</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Users className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">142</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Dari 15 jurusan</span>
                <span className="ml-1 text-xs bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded-full">🏢 Total</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("faculty")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
                <GraduationCap className="w-4 h-4 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5.280</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs text-green-500">+12% dari tahun lalu</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("students")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Anggaran Tahunan</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                <BarChart className="w-4 h-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rp24,8M</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">72% dialokasikan</span>
                <span className="ml-1 text-xs bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-full">
                  💵 Anggaran
                </span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("budget")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden gradient-border card-hover">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Hibah Penelitian</CardTitle>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <Award className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rp8,2M</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                <span className="text-xs text-green-500">+15% dari tahun lalu</span>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={() => navigateTo("planning")}>
                  Lihat Detail
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1 overflow-hidden gradient-border card-hover blue-gradient-bg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span>Notifikasi Terbaru</span>
            </CardTitle>
            <CardDescription>Pembaruan dan pemberitahuan terbaru Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {role === "mahasiswa" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Tugas Jatuh Tempo: Makalah Penelitian</p>
                      <p className="text-xs text-muted-foreground">Jatuh tempo dalam 3 hari - Biologi Lanjutan</p>
                      <div className="mt-1">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                          Prioritas Tinggi
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                      <Award className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Persyaratan Disetujui: Sertifikat Bahasa Inggris</p>
                      <p className="text-xs text-muted-foreground">Dokumen telah diverifikasi dan disetujui</p>
                      <div className="mt-1">
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                          Persyaratan Terpenuhi
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "admin" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Periode Pendaftaran Mata Kuliah Baru</p>
                      <p className="text-xs text-muted-foreground">Dimulai Senin depan - Siapkan sistem</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                          Akan Datang
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 shrink-0">
                      <Building className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Pengajuan Lokasi Magang Baru</p>
                      <p className="text-xs text-muted-foreground">5 pengajuan memerlukan review</p>
                      <div className="mt-1">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                          Tindakan Diperlukan
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "kepala_jurusan" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <BarChart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Rapat Tinjauan Anggaran</p>
                      <p className="text-xs text-muted-foreground">Besok pukul 14:00 - Kantor Dekan</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Penting</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 shrink-0">
                      <Building className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Pengajuan Lokasi Magang Baru</p>
                      <p className="text-xs text-muted-foreground">3 pengajuan memerlukan persetujuan Anda</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                          Menunggu Review
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "dekan" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Rapat Dewan Pengawas</p>
                      <p className="text-xs text-muted-foreground">Kamis depan - Tinjauan Anggaran Tahunan</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">
                          Prioritas Tinggi
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                      <Award className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Peluang Hibah Penelitian Baru</p>
                      <p className="text-xs text-muted-foreground">
                        Rp2,5M tersedia - Tenggat pendaftaran dalam 3 minggu
                      </p>
                      <div className="mt-1">
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Peluang</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 overflow-hidden gradient-border card-hover blue-gradient-bg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              <span>Acara Mendatang</span>
            </CardTitle>
            <CardDescription>Jadwal Anda untuk beberapa hari ke depan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {role === "mahasiswa" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 shrink-0">
                      <BookOpen className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Ujian Tengah Semester Fisika</p>
                      <p className="text-xs text-muted-foreground">Besok - 10:00 - Ruang 302</p>
                      <div className="mt-1">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Ujian</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                      <Building className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Batas Akhir Pengajuan Lokasi Magang</p>
                      <p className="text-xs text-muted-foreground">Jumat - 23:59</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Tenggat</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "admin" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Rapat Staf</p>
                      <p className="text-xs text-muted-foreground">Besok - 09:00 - Ruang Konferensi A</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Rapat</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                      <Building className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Review Lokasi Magang</p>
                      <p className="text-xs text-muted-foreground">Kamis - 13:00 - Ruang Administrasi</p>
                      <div className="mt-1">
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Penting</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "kepala_jurusan" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Rapat Fakultas</p>
                      <p className="text-xs text-muted-foreground">Rabu - 14:00 - Ruang Konferensi Jurusan</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Rapat</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 shrink-0">
                      <Building className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Review Pengajuan Lokasi Magang</p>
                      <p className="text-xs text-muted-foreground">Jumat - 10:00 - Ruang 210</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Penting</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {role === "dekan" && (
                <>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Rapat Pimpinan Eksekutif</p>
                      <p className="text-xs text-muted-foreground">Besok - 11:00 - Ruang Konferensi Dekan</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">
                          Kepemimpinan
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 border rounded-xl border-primary/20 bg-background/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 shrink-0">
                      <BarChart className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Tinjauan Triwulanan Kepala Jurusan</p>
                      <p className="text-xs text-muted-foreground">Kamis - 09:00 - Pusat Konferensi Utama</p>
                      <div className="mt-1">
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">
                          Tinjauan
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

