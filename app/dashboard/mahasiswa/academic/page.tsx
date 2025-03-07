import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, GraduationCap, FileText, Clock } from "lucide-react"
import Link from "next/link"

export default function AcademicOverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ikhtisar Akademik</h1>
        <p className="text-muted-foreground mt-2">Informasi dan status akademik Anda</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-sm font-medium">IPK Saat Ini</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">3.75</div>
            <p className="text-xs text-muted-foreground mt-1">Semester 7</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <CardTitle className="text-sm font-medium">Total SKS</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground mt-1">dari 144 SKS</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardTitle className="text-sm font-medium">Konsultasi PA</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Clock className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">3/5</div>
            <p className="text-xs text-muted-foreground mt-1">Semester ini</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
            <CardTitle className="text-sm font-medium">Status Akademik</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Award className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">Aktif</div>
            <p className="text-xs text-muted-foreground mt-1">Semester Ganjil 2023/2024</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-background border h-11">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <GraduationCap className="h-4 w-4 mr-2" />
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <FileText className="h-4 w-4 mr-2" />
            Dokumen
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Calendar className="h-4 w-4 mr-2" />
            Jadwal Konsultasi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Progres Akademik</CardTitle>
              <CardDescription>Kemajuan studi Anda saat ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Total Progres</span>
                    <span className="text-sm font-medium">83%</span>
                  </div>
                  <Progress value={83} className="h-2 bg-primary/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Mata Kuliah Wajib</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2 bg-green-500/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Mata Kuliah Pilihan</span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-amber-500/20" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Konsultasi Akademik</span>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                  <Progress value={60} className="h-2 bg-secondary/20" />
                </div>

                <div className="pt-2">
                  <Link href="/dashboard/mahasiswa/academic/control-card">
                    <Button variant="outline" size="sm" className="w-full">
                      Lihat Kartu Kontrol
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Riwayat Konsultasi Terbaru</CardTitle>
              <CardDescription>Konsultasi dengan penasehat akademik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Konsultasi KRS Semester Ganjil</p>
                      <p className="text-sm text-muted-foreground">10 September 2023</p>
                    </div>
                    <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-xs font-medium">
                      Sudah Diparaf
                    </div>
                  </div>
                  <p className="text-sm mt-2">Pengambilan 21 SKS untuk semester ganjil 2023/2024</p>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Konsultasi Topik Tugas Akhir</p>
                      <p className="text-sm text-muted-foreground">25 September 2023</p>
                    </div>
                    <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-xs font-medium">
                      Sudah Diparaf
                    </div>
                  </div>
                  <p className="text-sm mt-2">Pembahasan ide awal untuk tugas akhir</p>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Konsultasi Progres Studi</p>
                      <p className="text-sm text-muted-foreground">10 Oktober 2023</p>
                    </div>
                    <div className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-xs font-medium">
                      Sudah Diparaf
                    </div>
                  </div>
                  <p className="text-sm mt-2">Evaluasi nilai UTS dan progres studi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Dokumen Akademik</CardTitle>
              <CardDescription>Dokumen penting terkait studi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Kartu Hasil Studi (KHS)</p>
                    <p className="text-sm text-muted-foreground">Semester 6 - Genap 2022/2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Unduh
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Kartu Rencana Studi (KRS)</p>
                    <p className="text-sm text-muted-foreground">Semester 7 - Ganjil 2023/2024</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Unduh
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Transkrip Nilai</p>
                    <p className="text-sm text-muted-foreground">Update terakhir: 15 September 2023</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Unduh
                  </Button>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Kartu Kontrol Penasehat Akademik</p>
                    <p className="text-sm text-muted-foreground">Semester 7 - Ganjil 2023/2024</p>
                  </div>
                  <Link href="/dashboard/mahasiswa/academic/control-card">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Lihat
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Jadwal Konsultasi</CardTitle>
              <CardDescription>Jadwal konsultasi dengan penasehat akademik</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Konsultasi Persiapan UAS</p>
                      <p className="text-sm text-muted-foreground">25 Oktober 2023 - 10:00 WIB</p>
                    </div>
                    <div className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded text-xs font-medium">Upcoming</div>
                  </div>
                  <p className="text-sm mt-2">Ruang Dosen Lt. 3 - Dr. Budi Santoso, M.Kom</p>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Konsultasi Rencana Semester Depan</p>
                      <p className="text-sm text-muted-foreground">10 November 2023 - 13:00 WIB</p>
                    </div>
                    <div className="bg-amber-500/10 text-amber-600 px-2 py-1 rounded text-xs font-medium">Upcoming</div>
                  </div>
                  <p className="text-sm mt-2">Ruang Dosen Lt. 3 - Dr. Budi Santoso, M.Kom</p>
                </div>

                <div className="pt-4">
                  <Button className="w-full">Jadwalkan Konsultasi Baru</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

