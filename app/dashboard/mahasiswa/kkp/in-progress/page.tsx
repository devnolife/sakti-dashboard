"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  CheckCircle2,
  Clock,
  FileText,
  Calendar,
  Users,
  Building,
  MessageSquare,
  FileCheck,
  Upload,
  BookOpen,
  ClipboardList,
  ArrowRight,
  Plus,
} from "lucide-react"

export default function InKkpPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [reportForm, setReportForm] = useState({
    date: "",
    description: "",
    documentation: null as File | null,
  })

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Kuliah Kerja Profesi
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">Kelola dan lacak aktivitas Kuliah Kerja Praktik yang sedang berlangsung</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsReportDialogOpen(true)}>
            <FileCheck className="w-4 h-4 mr-2" />
            Kirim Laporan Mingguan
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Unggah Dokumentasi
          </Button>
        </div>
      </div>

      {/* KKP Status Overview */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Status KKP</h2>
              <p className="text-sm text-muted-foreground">Status pelaksanaan KKP Anda saat ini</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Lokasi</h3>
                  </div>
                  <Badge className="text-blue-800 bg-blue-100 hover:bg-blue-200">Aktif</Badge>
                </div>
                <p className="text-lg font-medium">PT Teknologi Maju Indonesia</p>
                <p className="mt-1 text-sm text-muted-foreground">Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">Periode Pelaksanaan</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tanggal Mulai</p>
                    <p className="text-sm">1 November 2023</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tanggal Selesai</p>
                    <p className="text-sm">31 Januari 2024</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">Anggota Kelompok</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border-2 border-white rounded-full bg-primary/20">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe (Anda)</p>
                        <p className="text-xs text-muted-foreground">1234567890</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">Ketua</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border-2 border-white rounded-full bg-secondary/20">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-medium">Alice Smith</p>
                      <p className="text-xs text-muted-foreground">2345678901</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border-2 border-white rounded-full bg-secondary/20">
                      RD
                    </div>
                    <div>
                      <p className="text-sm font-medium">Robert Davis</p>
                      <p className="text-xs text-muted-foreground">3456789012</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="font-medium">Progres Pelaksanaan</h3>
                  </div>
                  <Badge className="text-blue-800 bg-blue-100 hover:bg-blue-200">Minggu 6 dari 12</Badge>
                </div>

                <div className="mb-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progres Keseluruhan</span>
                    <span className="text-sm font-medium">50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-medium">Laporan Mingguan</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Terkirim</span>
                      <span className="text-sm font-medium">5 dari 12</span>
                    </div>
                    <Progress value={41.6} className="h-1.5 mt-1" />
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-medium">Pertemuan Bimbingan</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Selesai</span>
                      <span className="text-sm font-medium">3 dari 6</span>
                    </div>
                    <Progress value={50} className="h-1.5 mt-1" />
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardList className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-medium">Penyelesaian Tugas</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Selesai</span>
                      <span className="text-sm font-medium">12 dari 25</span>
                    </div>
                    <Progress value={48} className="h-1.5 mt-1" />
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-medium">Laporan Akhir</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Selesai</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-1.5 mt-1" />
                  </div>
                </div>

                <div className="p-4 mt-4 bg-white rounded-lg shadow-sm">
                  <h4 className="mb-2 font-medium">Tenggat Waktu Mendatang</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1 border-b">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Laporan Mingguan #6</span>
                      </div>
                      <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
                        Jatuh tempo 2 hari
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">Pertemuan Pembimbing</span>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Jatuh tempo 5 hari
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Evaluasi Tengah Semester</span>
                      </div>
                      <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                        Jatuh tempo 10 hari
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="reports">Laporan Mingguan</TabsTrigger>
          <TabsTrigger value="supervision">Bimbingan</TabsTrigger>
          <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Proyek</CardTitle>
              <CardDescription>Detail tentang proyek dan pelaksanaan KKP Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Judul Proyek</h3>
                  <p className="text-muted-foreground">
                    Pengembangan Sistem Manajemen Inventaris untuk PT Teknologi Maju Indonesia
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Deskripsi Proyek</h3>
                  <p className="text-muted-foreground">
                    Proyek ini bertujuan untuk mengembangkan sistem manajemen inventaris yang komprehensif yang akan membantu PT Teknologi
                    Maju Indonesia dalam menyederhanakan proses pelacakan, pemesanan, dan pelaporan inventaris mereka. Sistem
                    ini akan mencakup fitur seperti pelacakan inventaris real-time, notifikasi pemesanan ulang otomatis,
                    manajemen pemasok, dan kemampuan pelaporan yang komprehensif.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Tujuan Proyek</h3>
                  <ul className="pl-5 space-y-1 list-disc text-muted-foreground">
                    <li>Mengembangkan antarmuka yang ramah pengguna untuk manajemen inventaris</li>
                    <li>Mengimplementasikan pelacakan level inventaris secara real-time</li>
                    <li>Membuat notifikasi otomatis untuk barang dengan stok rendah</li>
                    <li>Merancang fitur pelaporan komprehensif untuk analisis inventaris</li>
                    <li>Mengintegrasikan dengan sistem perusahaan yang ada</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Pembimbing</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Pembimbing Fakultas</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full bg-primary/20">
                          DR
                        </div>
                        <div>
                          <p className="font-medium">Dr. Rudi Hartono, M.Kom.</p>
                          <p className="text-sm text-muted-foreground">Jurusan Ilmu Komputer</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Pembimbing Industri</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center justify-center w-10 h-10 text-sm font-medium rounded-full bg-secondary/20">
                          BS
                        </div>
                        <div>
                          <p className="font-medium">Budi Santoso, S.T.</p>
                          <p className="text-sm text-muted-foreground">Manajer IT</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Aktivitas KKP Anda yang terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: <FileText className="w-4 h-4 text-blue-500" />,
                    title: "Laporan Mingguan #5 Terkirim",
                    description: "Anda telah mengirimkan laporan kemajuan mingguan",
                    date: "2 hari yang lalu",
                    status: "Terkirim",
                  },
                  {
                    icon: <MessageSquare className="w-4 h-4 text-green-500" />,
                    title: "Pertemuan Bimbingan Selesai",
                    description: "Pertemuan dengan Dr. Rudi Hartono untuk membahas kemajuan proyek",
                    date: "5 hari yang lalu",
                    status: "Selesai",
                  },
                  {
                    icon: <Upload className="w-4 h-4 text-purple-500" />,
                    title: "Dokumentasi Diunggah",
                    description: "Anda mengunggah 5 foto baru dari pelaksanaan proyek",
                    date: "1 minggu yang lalu",
                    status: "Diunggah",
                  },
                  {
                    icon: <ClipboardList className="w-4 h-4 text-amber-500" />,
                    title: "Tugas Selesai",
                    description: "Menyelesaikan desain database untuk sistem inventaris",
                    date: "1 minggu yang lalu",
                    status: "Selesai",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                    <div className="p-2 rounded-full bg-primary/10">{activity.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Mingguan</CardTitle>
              <CardDescription>Kelola dan lihat laporan KKP mingguan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Pengiriman Laporan</h3>
                  <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Laporan Baru
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Tambah Laporan Mingguan</DialogTitle>
                        <DialogDescription>
                          Isi formulir di bawah ini untuk menambahkan laporan mingguan KKP Anda
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="report-date">Tanggal Laporan</Label>
                          <Input
                            id="report-date"
                            type="date"
                            value={reportForm.date}
                            onChange={(e) => setReportForm({ ...reportForm, date: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="report-description">Deskripsi Pekerjaan</Label>
                          <Textarea
                            id="report-description"
                            placeholder="Jelaskan pekerjaan yang telah Anda lakukan minggu ini..."
                            className="min-h-[120px]"
                            value={reportForm.description}
                            onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="report-documentation">Dokumentasi (Foto/File)</Label>
                          <Input
                            id="report-documentation"
                            type="file"
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={(e) => setReportForm({ ...reportForm, documentation: e.target.files?.[0] || null })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Upload foto atau dokumen pendukung (maksimal 5MB)
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button
                          onClick={() => {
                            // Handle form submission here
                            console.log("Form submitted:", reportForm)
                            setIsReportDialogOpen(false)
                            // Reset form
                            setReportForm({ date: "", description: "", documentation: null })
                          }}
                        >
                          Simpan Laporan
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-hidden border rounded-lg">
                  <div className="grid grid-cols-4 p-3 font-medium bg-muted/50">
                    <div>Minggu</div>
                    <div>Periode</div>
                    <div>Tanggal Pengiriman</div>
                    <div>Aksi</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        week: "Minggu 5",
                        period: "29 Nov - 5 Des 2023",
                        date: "6 Des 2023",
                      },
                      {
                        week: "Minggu 4",
                        period: "22 - 28 Nov 2023",
                        date: "29 Nov 2023",
                      },
                      {
                        week: "Minggu 3",
                        period: "15 - 21 Nov 2023",
                        date: "22 Nov 2023",
                      },
                      {
                        week: "Minggu 2",
                        period: "8 - 14 Nov 2023",
                        date: "15 Nov 2023",
                      },
                      {
                        week: "Minggu 1",
                        period: "1 - 7 Nov 2023",
                        date: "8 Nov 2023",
                      },
                    ].map((report, index) => (
                      <div key={index} className="grid items-center grid-cols-4 p-3">
                        <div>{report.week}</div>
                        <div className="text-sm text-muted-foreground">{report.period}</div>
                        <div className="text-sm">{report.date}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Lihat
                          </Button>
                          <Button variant="outline" size="sm">
                            Unduh
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supervision" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pertemuan Bimbingan</CardTitle>
              <CardDescription>Lacak pertemuan bimbingan dan umpan balik Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Jadwal Pertemuan</h3>
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Jadwalkan Pertemuan
                  </Button>
                </div>

                <div className="overflow-hidden border rounded-lg">
                  <div className="grid grid-cols-5 p-3 font-medium bg-muted/50">
                    <div>Pertemuan</div>
                    <div>Tanggal & Waktu</div>
                    <div>Pembimbing</div>
                    <div>Status</div>
                    <div>Aksi</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        meeting: "Pertemuan #4",
                        date: "15 Des 2023 • 10:00",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Terjadwal",
                        statusColor: "blue",
                      },
                      {
                        meeting: "Pertemuan #3",
                        date: "30 Nov 2023 • 11:00",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Selesai",
                        statusColor: "green",
                      },
                      {
                        meeting: "Pertemuan #2",
                        date: "15 Nov 2023 • 10:00",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Selesai",
                        statusColor: "green",
                      },
                      {
                        meeting: "Pertemuan #1",
                        date: "5 Nov 2023 • 09:00",
                        supervisor: "Dr. Rudi Hartono",
                        status: "Selesai",
                        statusColor: "green",
                      },
                    ].map((meeting, index) => (
                      <div key={index} className="grid items-center grid-cols-5 p-3">
                        <div>{meeting.meeting}</div>
                        <div className="text-sm">{meeting.date}</div>
                        <div className="text-sm">{meeting.supervisor}</div>
                        <div>
                          <Badge
                            variant="outline"
                            className={`bg-${meeting.statusColor}-50 text-${meeting.statusColor}-700 border-${meeting.statusColor}-200`}
                          >
                            {meeting.status === "Selesai" && <CheckCircle2 className="h-3.5 w-3.5 mr-1" />}
                            {meeting.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Detail
                          </Button>
                          {meeting.status === "Terjadwal" && (
                            <Button variant="outline" size="sm">
                              Jadwal Ulang
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-medium">Umpan Balik Terbaru</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 text-xs font-medium rounded-full bg-primary/20">
                            DR
                          </div>
                          <div>
                            <p className="font-medium">Dr. Rudi Hartono</p>
                            <p className="text-xs text-muted-foreground">Pembimbing Fakultas</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">30 Nov 2023</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Progres yang baik pada desain database. Pastikan untuk mendokumentasikan hubungan antar tabel
                        dengan jelas. Untuk fase berikutnya, fokus pada implementasi sistem autentikasi pengguna dan formulir
                        input inventaris dasar.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 text-xs font-medium rounded-full bg-secondary/20">
                            BS
                          </div>
                          <div>
                            <p className="font-medium">Budi Santoso</p>
                            <p className="text-xs text-muted-foreground">Pembimbing Industri</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">25 Nov 2023</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Prototipe awal terlihat menjanjikan. Pertimbangkan untuk menambahkan dasbor yang menampilkan level inventaris
                        secara sekilas. Juga, kita perlu membahas cara mengintegrasikan dengan database pemasok yang ada di
                        pertemuan berikutnya.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dokumentasi KKP</CardTitle>
              <CardDescription>Kelola foto, video, dan dokumentasi lainnya dari aktivitas KKP Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Galeri Media</h3>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Unggah Media
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="relative overflow-hidden border rounded-lg group">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=KKP+Photo+${index + 1}`}
                        alt={`KKP Documentation ${index + 1}`}
                        className="object-cover w-full aspect-square"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 transition-opacity opacity-0 bg-black/60 group-hover:opacity-100">
                        <Button size="sm" variant="outline" className="h-8 text-white border-white/20 bg-black/20">
                          Lihat
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 text-white border-white/20 bg-black/20">
                          Hapus
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-lg font-medium">Dokumen</h3>
                  <div className="overflow-hidden border rounded-lg">
                    <div className="grid grid-cols-4 p-3 font-medium bg-muted/50">
                      <div>Nama Dokumen</div>
                      <div>Tipe</div>
                      <div>Diunggah</div>
                      <div>Aksi</div>
                    </div>

                    <div className="divide-y">
                      {[
                        {
                          name: "Proposal Proyek",
                          type: "PDF",
                          date: "1 Nov 2023",
                        },
                        {
                          name: "Skema Database",
                          type: "PNG",
                          date: "10 Nov 2023",
                        },
                        {
                          name: "Mockup UI",
                          type: "ZIP",
                          date: "15 Nov 2023",
                        },
                        {
                          name: "Presentasi Progres",
                          type: "PPTX",
                          date: "30 Nov 2023",
                        },
                      ].map((doc, index) => (
                        <div key={index} className="grid items-center grid-cols-4 p-3">
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm">{doc.type}</div>
                          <div className="text-sm text-muted-foreground">{doc.date}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Lihat
                            </Button>
                            <Button variant="outline" size="sm">
                              Unduh
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

