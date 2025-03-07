import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, BarChart, ClipboardCheck } from "lucide-react"

export default function ProdiPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Program Studi</h2>
        <p className="text-muted-foreground">Selamat datang di dashboard manajemen program studi.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Kurikulum</TabsTrigger>
          <TabsTrigger value="students">Mahasiswa</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">320</div>
                <p className="text-xs text-muted-foreground">+15 dari semester lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mata Kuliah Aktif</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">5 mata kuliah baru</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Persetujuan Magang</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Perlu ditinjau</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tingkat Kelulusan</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground">+5% dari tahun lalu</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Aktivitas Program Studi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="mb-2">• Review Kurikulum - 15 Oktober 2023</p>
                  <p className="mb-2">• Rapat Dosen - 20 Oktober 2023</p>
                  <p className="mb-2">• Evaluasi Tengah Semester - 25 Oktober 2023</p>
                  <p className="mb-2">• Persiapan Akreditasi - 1 November 2023</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Pengumuman</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="mb-2">• Seminar Nasional - 5 November 2023</p>
                  <p className="mb-2">• Workshop Kurikulum - 10 November 2023</p>
                  <p className="mb-2">• Kunjungan Industri - 15 November 2023</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="curriculum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Kurikulum</CardTitle>
              <CardDescription>Daftar kurikulum yang sedang aktif dan dalam pengembangan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">Kurikulum Aktif</div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Kurikulum 2020</p>
                        <p className="text-sm text-muted-foreground">Informatika</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">Aktif</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Kurikulum 2021</p>
                        <p className="text-sm text-muted-foreground">Sistem Informasi</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">Pengembangan Kurikulum</div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Kurikulum 2024</p>
                        <p className="text-sm text-muted-foreground">Informatika</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                          Dalam Pengembangan
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kemajuan Mahasiswa</CardTitle>
              <CardDescription>Statistik kemajuan mahasiswa program studi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Angkatan 2020</CardTitle>
                      <CardDescription>Total: 85 mahasiswa</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Rata-rata IPK: 3.45</p>
                      <p>Tingkat Kelulusan: 92%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Angkatan 2021</CardTitle>
                      <CardDescription>Total: 90 mahasiswa</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Rata-rata IPK: 3.38</p>
                      <p>Tingkat Kelulusan: 88%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Angkatan 2022</CardTitle>
                      <CardDescription>Total: 75 mahasiswa</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Rata-rata IPK: 3.52</p>
                      <p>Tingkat Kelulusan: 95%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Angkatan 2023</CardTitle>
                      <CardDescription>Total: 70 mahasiswa</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Rata-rata IPK: 3.41</p>
                      <p>Tingkat Kelulusan: 90%</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

