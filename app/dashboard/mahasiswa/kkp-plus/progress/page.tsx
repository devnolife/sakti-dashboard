"use client"

import { useState } from "react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Clock,
  FileText,
  Calendar,
  CalendarIcon,
  Users,
  MapPin,
  MessageSquare,
  FileCheck,
  Upload,
  BookOpen,
  ClipboardList,
  ArrowRight,
  Plus,
  Heart,
  Star,
} from "lucide-react"

export default function KKPPlusProgressPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false)
  const [activityForm, setActivityForm] = useState({
    date: undefined as Date | undefined,
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
              KKP Plus - Kegiatan Ke-Muhammadiyah-an
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">Kelola dan lacak aktivitas kegiatan ke-Muhammadiyah-an Anda</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsActivityDialogOpen(true)}>
            <FileCheck className="w-4 h-4 mr-2" />
            Catat Kegiatan
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Unggah Dokumentasi
          </Button>
        </div>
      </div>

      {/* KKP Plus Status Overview */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="p-6 bg-gradient-to-r from-green-500/10 via-green-400/5 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Heart className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Status Kegiatan Ke-Muhammadiyah-an</h2>
              <p className="text-sm text-muted-foreground">Status pelaksanaan kegiatan Anda saat ini</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium">Lokasi Kegiatan</h3>
                  </div>
                  <Badge className="text-green-800 bg-green-100 hover:bg-green-200">Aktif</Badge>
                </div>
                <p className="text-lg font-medium">Masjid Al-Ikhlas Muhammadiyah</p>
                <p className="mt-1 text-sm text-muted-foreground">Jl. KH Ahmad Dahlan No. 45, Makassar, Sulawesi Selatan</p>
              </div>

              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="font-medium">Periode Kegiatan</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tanggal Mulai</p>
                    <p className="text-sm">1 September 2023</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tanggal Selesai</p>
                    <p className="text-sm">30 November 2023</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <h3 className="font-medium">Tim Pelaksana</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center text-xs font-medium border-2 border-white rounded-full w-8 h-8 bg-primary/20">
                        AD
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ahmad Dahlan (Anda)</p>
                        <p className="text-xs text-muted-foreground">1234567890</p>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary">Koordinator</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center text-xs font-medium border-2 border-white rounded-full w-8 h-8 bg-secondary/20">
                      FN
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fatimah Nur</p>
                      <p className="text-xs text-muted-foreground">2345678901</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center text-xs font-medium border-2 border-white rounded-full w-8 h-8 bg-secondary/20">
                      MH
                    </div>
                    <div>
                      <p className="text-sm font-medium">Muhammad Hatta</p>
                      <p className="text-xs text-muted-foreground">3456789012</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 md:col-span-2">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <h3 className="font-medium">Progres Kegiatan</h3>
                  </div>
                  <Badge className="text-green-800 bg-green-100 hover:bg-green-200">Minggu 8 dari 12</Badge>
                </div>

                <div className="mb-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progres Keseluruhan</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4 text-green-600" />
                      <h4 className="text-sm font-medium">Laporan Kegiatan</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Terkirim</span>
                      <span className="text-sm font-medium">7 dari 12</span>
                    </div>
                    <Progress value={58.3} className="h-1.5 mt-1" />
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-green-600" />
                      <h4 className="text-sm font-medium">Konsultasi Pembimbing</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Selesai</span>
                      <span className="text-sm font-medium">4 dari 6</span>
                    </div>
                    <Progress value={66.6} className="h-1.5 mt-1" />
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <ClipboardList className="w-4 h-4 text-green-600" />
                      <h4 className="text-sm font-medium">Kegiatan Terlaksana</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Selesai</span>
                      <span className="text-sm font-medium">15 dari 20</span>
                    </div>
                    <Progress value={75} className="h-1.5 mt-1" />
                  </div>

                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <h4 className="text-sm font-medium">Laporan Akhir</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Selesai</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <Progress value={40} className="h-1.5 mt-1" />
                  </div>
                </div>

                <div className="p-4 mt-4 bg-white rounded-lg shadow-sm">
                  <h4 className="mb-2 font-medium">Kegiatan Mendatang</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-1 border-b">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Pengajian Rutin Ahad Pagi</span>
                      </div>
                      <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
                        Besok
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">Bakti Sosial Masyarakat</span>
                      </div>
                      <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">
                        3 hari lagi
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Evaluasi Bulanan</span>
                      </div>
                      <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                        7 hari lagi
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
          <TabsTrigger value="activities">Laporan Kegiatan</TabsTrigger>
          <TabsTrigger value="consultation">Konsultasi</TabsTrigger>
          <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Program</CardTitle>
              <CardDescription>Detail tentang program kegiatan ke-Muhammadiyah-an Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Nama Program</h3>
                  <p className="text-muted-foreground">
                    Pemberdayaan Masyarakat Melalui Kegiatan Keagamaan dan Sosial di Lingkungan Muhammadiyah
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Deskripsi Program</h3>
                  <p className="text-muted-foreground">
                    Program ini bertujuan untuk memberdayakan masyarakat melalui berbagai kegiatan keagamaan dan sosial
                    yang berlandaskan nilai-nilai Islam dan ajaran Muhammadiyah. Kegiatan meliputi pengajian rutin,
                    bakti sosial, pembinaan anak dan remaja, serta kegiatan dakwah islamiyah lainnya yang bermanfaat
                    bagi masyarakat sekitar.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Tujuan Program</h3>
                  <ul className="pl-5 space-y-1 list-disc text-muted-foreground">
                    <li>Meningkatkan pemahaman keagamaan masyarakat</li>
                    <li>Membangun karakter islami yang berkemajuan</li>
                    <li>Memberikan kontribusi nyata kepada masyarakat</li>
                    <li>Mengembangkan jiwa kepemimpinan dan pengabdian</li>
                    <li>Memperkuat ukhuwah islamiyah di lingkungan masyarakat</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-medium">Pembimbing</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Pembimbing Akademik</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center justify-center text-sm font-medium rounded-full w-10 h-10 bg-primary/20">
                          UA
                        </div>
                        <div>
                          <p className="font-medium">Dr. Ustadz Ahmad, M.Pd.I.</p>
                          <p className="text-sm text-muted-foreground">Fakultas Agama Islam</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium">Pembimbing Lapangan</h4>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center justify-center text-sm font-medium rounded-full w-10 h-10 bg-secondary/20">
                          HS
                        </div>
                        <div>
                          <p className="font-medium">H. Samsul Hadi, S.Ag.</p>
                          <p className="text-sm text-muted-foreground">Ketua Ranting Muhammadiyah</p>
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
              <CardDescription>Kegiatan ke-Muhammadiyah-an yang baru saja dilakukan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    icon: <Heart className="w-4 h-4 text-red-500" />,
                    title: "Pengajian Ahad Pagi Selesai",
                    description: "Mengisi materi tentang akhlak mulia di pengajian rutin",
                    date: "2 hari yang lalu",
                    status: "Selesai",
                  },
                  {
                    icon: <Star className="w-4 h-4 text-amber-500" />,
                    title: "Bakti Sosial Terlaksana",
                    description: "Pembagian sembako kepada 50 keluarga kurang mampu",
                    date: "5 hari yang lalu",
                    status: "Selesai",
                  },
                  {
                    icon: <Upload className="w-4 h-4 text-purple-500" />,
                    title: "Dokumentasi Diunggah",
                    description: "Mengunggah 12 foto kegiatan TPA anak-anak",
                    date: "1 minggu yang lalu",
                    status: "Diunggah",
                  },
                  {
                    icon: <ClipboardList className="w-4 h-4 text-green-500" />,
                    title: "Kegiatan Dakwah Selesai",
                    description: "Mengisi ceramah di masjid tentang pentingnya pendidikan",
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

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Kegiatan</CardTitle>
              <CardDescription>Kelola dan lihat laporan kegiatan ke-Muhammadiyah-an Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Daftar Kegiatan</h3>
                  <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Kegiatan Baru
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Tambah Laporan Kegiatan</DialogTitle>
                        <DialogDescription>
                          Isi formulir di bawah ini untuk menambahkan laporan kegiatan ke-Muhammadiyah-an
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="activity-date">Tanggal Kegiatan</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !activityForm.date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {activityForm.date ? format(activityForm.date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={activityForm.date}
                                onSelect={(date) => setActivityForm({ ...activityForm, date })}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="activity-description">Deskripsi Kegiatan</Label>
                          <Textarea
                            id="activity-description"
                            placeholder="Jelaskan kegiatan yang telah dilaksanakan..."
                            className="min-h-[120px]"
                            value={activityForm.description}
                            onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="activity-documentation">Dokumentasi (Foto/File)</Label>
                          <Input
                            id="activity-documentation"
                            type="file"
                            accept="image/*,.pdf,.doc,.docx"
                            onChange={(e) => setActivityForm({ ...activityForm, documentation: e.target.files?.[0] || null })}
                          />
                          <p className="text-xs text-muted-foreground">
                            Upload foto atau dokumen kegiatan (maksimal 5MB)
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsActivityDialogOpen(false)}>
                          Batal
                        </Button>
                        <Button
                          onClick={() => {
                            // Handle form submission here
                            console.log("Form submitted:", activityForm)
                            setIsActivityDialogOpen(false)
                            // Reset form
                            setActivityForm({ date: undefined, description: "", documentation: null })
                          }}
                        >
                          Simpan Kegiatan
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="overflow-hidden border rounded-lg">
                  <div className="grid grid-cols-4 p-3 font-medium bg-muted/50">
                    <div>Tanggal</div>
                    <div>Jenis Kegiatan</div>
                    <div>Deskripsi</div>
                    <div>Aksi</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        date: "20 Okt 2023",
                        type: "Pengajian Rutin",
                        description: "Mengisi materi tentang akhlak mulia",
                      },
                      {
                        date: "15 Okt 2023",
                        type: "Bakti Sosial",
                        description: "Pembagian sembako kepada masyarakat",
                      },
                      {
                        date: "10 Okt 2023",
                        type: "Dakwah",
                        description: "Ceramah tentang pendidikan Islam",
                      },
                      {
                        date: "5 Okt 2023",
                        type: "TPA Anak",
                        description: "Mengajar membaca Al-Quran",
                      },
                      {
                        date: "1 Okt 2023",
                        type: "Kajian Remaja",
                        description: "Diskusi tentang Islam dan teknologi",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="grid items-center grid-cols-4 p-3">
                        <div className="text-sm">{activity.date}</div>
                        <div className="text-sm font-medium">{activity.type}</div>
                        <div className="text-sm text-muted-foreground">{activity.description}</div>
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

        <TabsContent value="consultation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Konsultasi Pembimbing</CardTitle>
              <CardDescription>Lacak konsultasi dan bimbingan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Jadwal Konsultasi</h3>
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Jadwalkan Konsultasi
                  </Button>
                </div>

                <div className="overflow-hidden border rounded-lg">
                  <div className="grid grid-cols-5 p-3 font-medium bg-muted/50">
                    <div>Konsultasi</div>
                    <div>Tanggal & Waktu</div>
                    <div>Pembimbing</div>
                    <div>Status</div>
                    <div>Aksi</div>
                  </div>

                  <div className="divide-y">
                    {[
                      {
                        meeting: "Konsultasi #5",
                        date: "25 Okt 2023 • 14:00",
                        supervisor: "Dr. Ustadz Ahmad",
                        status: "Terjadwal",
                        statusColor: "blue",
                      },
                      {
                        meeting: "Konsultasi #4",
                        date: "10 Okt 2023 • 15:00",
                        supervisor: "H. Samsul Hadi",
                        status: "Selesai",
                        statusColor: "green",
                      },
                      {
                        meeting: "Konsultasi #3",
                        date: "25 Sep 2023 • 14:00",
                        supervisor: "Dr. Ustadz Ahmad",
                        status: "Selesai",
                        statusColor: "green",
                      },
                      {
                        meeting: "Konsultasi #2",
                        date: "10 Sep 2023 • 15:00",
                        supervisor: "H. Samsul Hadi",
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
                  <h3 className="mb-3 text-lg font-medium">Catatan Bimbingan Terbaru</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center text-xs font-medium rounded-full w-8 h-8 bg-primary/20">
                            UA
                          </div>
                          <div>
                            <p className="font-medium">Dr. Ustadz Ahmad, M.Pd.I.</p>
                            <p className="text-xs text-muted-foreground">Pembimbing Akademik</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">10 Okt 2023</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Kegiatan sudah berjalan dengan baik. Tingkatkan dokumentasi untuk setiap kegiatan dan
                        pastikan untuk membuat laporan yang lebih detail. Fokus pada dampak kegiatan terhadap
                        masyarakat dan perkembangan spiritual mahasiswa.
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center text-xs font-medium rounded-full w-8 h-8 bg-secondary/20">
                            HS
                          </div>
                          <div>
                            <p className="font-medium">H. Samsul Hadi, S.Ag.</p>
                            <p className="text-xs text-muted-foreground">Pembimbing Lapangan</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">5 Okt 2023</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Apresiasi untuk dedikasi dalam kegiatan TPA. Untuk kedepannya, coba libatkan lebih banyak
                        anak muda dalam kegiatan dakwah. Jangan lupa koordinasi dengan pengurus ranting untuk
                        kegiatan bakti sosial bulan depan.
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
              <CardTitle>Dokumentasi Kegiatan</CardTitle>
              <CardDescription>Kelola foto, video, dan dokumentasi lainnya dari kegiatan ke-Muhammadiyah-an</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Galeri Kegiatan</h3>
                  <Button>
                    <Upload className="w-4 h-4 mr-2" />
                    Unggah Foto/Video
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="relative overflow-hidden border rounded-lg group">
                      <img
                        src={`/placeholder.svg?height=200&width=200&text=Kegiatan+${index + 1}`}
                        alt={`Dokumentasi Kegiatan ${index + 1}`}
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
                  <h3 className="mb-3 text-lg font-medium">Dokumen Pendukung</h3>
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
                          name: "Proposal Kegiatan",
                          type: "PDF",
                          date: "1 Sep 2023",
                        },
                        {
                          name: "Surat Izin Kegiatan",
                          type: "PDF",
                          date: "5 Sep 2023",
                        },
                        {
                          name: "Daftar Hadir Peserta",
                          type: "XLSX",
                          date: "15 Sep 2023",
                        },
                        {
                          name: "Laporan Kegiatan Bulan September",
                          type: "DOCX",
                          date: "30 Sep 2023",
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
