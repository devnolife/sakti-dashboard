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
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Dashboard Mahasiswa
          </span>
        </h1>
        <p className="mt-2 text-muted-foreground">Selamat datang kembali, Andi. Ini adalah ringkasan akademik Anda.</p>
      </div>

      <MahasiswaDashboard />

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
                <CardTitle className="text-sm font-medium">IPK Saat Ini</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">3.75</div>
                <div className="flex items-center mt-1">
                  <Badge variant="success" className="text-xs font-normal">
                    +0.15 dari semester lalu
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-secondary/5 to-secondary/10">
                <CardTitle className="text-sm font-medium">Kredit Saat Ini</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/20">
                  <BookOpen className="w-4 h-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">21</div>
                <p className="mt-1 text-xs text-muted-foreground">6 mata kuliah aktif</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-green-500/5 to-green-500/10">
                <CardTitle className="text-sm font-medium">Kehadiran</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20">
                  <Clock className="w-4 h-4 text-green-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">92%</div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="text-xs font-normal text-green-600 border-green-200 bg-green-500/10"
                  >
                    3 ketidakhadiran
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all border-none shadow-md hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
                <CardTitle className="text-sm font-medium">Tugas Mendatang</CardTitle>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20">
                  <CalendarDays className="w-4 h-4 text-amber-500" />
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">5</div>
                <div className="flex items-center mt-1">
                  <Badge
                    variant="outline"
                    className="text-xs font-normal bg-amber-500/10 text-amber-600 border-amber-200"
                  >
                    2 jatuh tempo minggu ini
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
                  <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Ujian Tengah Semester</p>
                      <p className="text-sm text-muted-foreground">15 Oktober 2023</p>
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
                      <p className="font-medium">Tugas Algoritma</p>
                      <p className="text-sm text-muted-foreground">10 Oktober 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                      Segera Berakhir
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Presentasi Kelompok</p>
                      <p className="text-sm text-muted-foreground">12 Oktober 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      Akan Datang
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10">
                      <BookOpen className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Praktikum Database</p>
                      <p className="text-sm text-muted-foreground">14 Oktober 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                      Akan Datang
                    </Badge>
                  </div>
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
                  <div className="p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
                        Penting
                      </Badge>
                      <p className="text-xs text-muted-foreground">5 Okt 2023</p>
                    </div>
                    <p className="font-medium">Libur Nasional</p>
                    <p className="mt-1 text-sm text-muted-foreground">17 Oktober 2023 - Semua kelas ditiadakan</p>
                  </div>

                  <div className="p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Acara
                      </Badge>
                      <p className="text-xs text-muted-foreground">3 Okt 2023</p>
                    </div>
                    <p className="font-medium">Seminar Karir</p>
                    <p className="mt-1 text-sm text-muted-foreground">20 Oktober 2023 - Auditorium Utama</p>
                  </div>

                  <div className="p-3 border rounded-lg bg-muted/50 border-border/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
                        Pendaftaran
                      </Badge>
                      <p className="text-xs text-muted-foreground">1 Okt 2023</p>
                    </div>
                    <p className="font-medium">Pendaftaran KKP Dibuka</p>
                    <p className="mt-1 text-sm text-muted-foreground">1 November 2023 - Daftar lebih awal</p>
                  </div>
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
                {[
                  {
                    title: "Algorithms & Data Structures",
                    instructor: "Dr. Budi Santoso",
                    credits: 3,
                    grade: "A-",
                    attendance: "13/14",
                    color: "primary",
                  },
                  {
                    title: "Advanced Database",
                    instructor: "Dr. Siti Aminah",
                    credits: 3,
                    grade: "B+",
                    attendance: "12/14",
                    color: "secondary",
                  },
                  {
                    title: "Web Programming",
                    instructor: "Prof. Joko Widodo",
                    credits: 3,
                    grade: "A",
                    attendance: "14/14",
                    color: "green-500",
                  },
                  {
                    title: "Computer Networks",
                    instructor: "Dr. Ahmad Dahlan",
                    credits: 3,
                    grade: "B",
                    attendance: "12/14",
                    color: "amber-500",
                  },
                  {
                    title: "Software Engineering",
                    instructor: "Dr. Maya Putri",
                    credits: 3,
                    grade: "A-",
                    attendance: "13/14",
                    color: "purple-500",
                  },
                  {
                    title: "Mobile Application Development",
                    instructor: "Prof. Hadi Wijaya",
                    credits: 3,
                    grade: "B+",
                    attendance: "12/14",
                    color: "blue-500",
                  },
                ].map((course, index) => (
                  <Card key={index} className="overflow-hidden transition-all border shadow-sm hover:shadow-md">
                    <div className={`h-2 bg-${course.color}`} />
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription>
                        {course.credits} SKS - {course.instructor}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Nilai:</span>
                        <span className="font-medium">{course.grade}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Kehadiran:</span>
                        <span className="font-medium">{course.attendance}</span>
                      </div>
                      <div className="mt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Lihat Detail
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Kemajuan Mata Kuliah</CardTitle>
              <CardDescription>Kemajuan Anda dalam mata kuliah saat ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Algorithms & Data Structures", progress: 75, color: "primary" },
                  { name: "Advanced Database", progress: 60, color: "secondary" },
                  { name: "Web Programming", progress: 90, color: "green-500" },
                  { name: "Computer Networks", progress: 65, color: "amber-500" },
                  { name: "Software Engineering", progress: 80, color: "purple-500" },
                  { name: "Mobile Application Development", progress: 70, color: "blue-500" },
                ].map((course, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{course.name}</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className={`h-2 bg-${course.color}/20`} />
                  </div>
                ))}
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
                {[
                  {
                    day: "Senin",
                    classes: [
                      { name: "Algorithms & Data Structures", time: "08:00 - 10:30", location: "Ruang 301" },
                      { name: "Advanced Database", time: "13:00 - 15:30", location: "Lab Komputer 2" },
                    ],
                    color: "primary",
                  },
                  {
                    day: "Selasa",
                    classes: [{ name: "Software Engineering", time: "09:00 - 11:30", location: "Ruang 305" }],
                    color: "secondary",
                  },
                  {
                    day: "Rabu",
                    classes: [
                      { name: "Web Programming", time: "10:00 - 12:30", location: "Lab Komputer 1" },
                      { name: "Mobile Application Development", time: "14:00 - 16:30", location: "Lab Komputer 3" },
                    ],
                    color: "green-500",
                  },
                  {
                    day: "Kamis",
                    classes: [],
                    color: "amber-500",
                  },
                  {
                    day: "Jumat",
                    classes: [{ name: "Computer Networks", time: "08:00 - 10:30", location: "Ruang 305" }],
                    color: "purple-500",
                  },
                ].map((day, index) => (
                  <div key={index} className="overflow-hidden border rounded-lg">
                    <div className={`bg-${day.color}/10 px-4 py-3 font-medium border-b`}>{day.day}</div>
                    <div className="p-4">
                      {day.classes.length > 0 ? (
                        <div className="space-y-4">
                          {day.classes.map((cls, idx) => (
                            <div key={idx} className="flex items-start justify-between p-3 rounded-lg bg-muted/50">
                              <div>
                                <p className="font-medium">{cls.name}</p>
                                <p className="text-sm text-muted-foreground">{cls.time}</p>
                              </div>
                              <div className="px-2 py-1 text-sm border rounded-md text-muted-foreground bg-background">
                                {cls.location}
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
                ))}
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

