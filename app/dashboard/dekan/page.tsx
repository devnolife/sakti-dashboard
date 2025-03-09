import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building, BarChart, DollarSign } from "lucide-react"

export default function DekanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Dekan</h2>
        <p className="text-muted-foreground">Selamat datang di dashboard manajemen fakultas.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Jurusan</TabsTrigger>
          <TabsTrigger value="budget">Anggaran</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,245</div>
                <p className="text-xs text-muted-foreground">+120 dari tahun lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jumlah Program Studi</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">1 program studi baru</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tingkat Kelulusan</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">+3% dari tahun lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Anggaran Fakultas</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 12.5M</div>
                <p className="text-xs text-muted-foreground">+8% dari tahun lalu</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Aktivitas Fakultas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="mb-2">• Rapat Pimpinan Fakultas - 10 Oktober 2023</p>
                  <p className="mb-2">• Persiapan Akreditasi - 15 Oktober 2023</p>
                  <p className="mb-2">• Kunjungan Industri - 20 Oktober 2023</p>
                  <p className="mb-2">• Evaluasi Kinerja Dosen - 25 Oktober 2023</p>
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
                  <p className="mb-2">• Dies Natalis Fakultas - 12 November 2023</p>
                  <p className="mb-2">• Wisuda Periode I - 20 November 2023</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Program Studi</CardTitle>
              <CardDescription>Daftar program studi di bawah fakultas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">Teknik</div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Informatika</p>
                        <p className="text-sm text-muted-foreground">Dr. Ahmad Fauzi</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">
                          Terakreditasi A
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Sistem Informasi</p>
                        <p className="text-sm text-muted-foreground">Dr. Siti Nurhaliza</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">
                          Terakreditasi A
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-md border">
                  <div className="bg-muted px-4 py-2 font-medium">Sains</div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Matematika</p>
                        <p className="text-sm text-muted-foreground">Dr. Budi Santoso</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">
                          Terakreditasi B
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">Fisika</p>
                        <p className="text-sm text-muted-foreground">Dr. Joko Widodo</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-md">
                          Terakreditasi B
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Anggaran</CardTitle>
              <CardDescription>Ringkasan anggaran fakultas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Anggaran Operasional</CardTitle>
                      <CardDescription>Tahun Akademik 2023/2024</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Total: Rp 5.2M</p>
                      <p>Terpakai: 45%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Anggaran Penelitian</CardTitle>
                      <CardDescription>Tahun Akademik 2023/2024</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Total: Rp 3.8M</p>
                      <p>Terpakai: 32%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Anggaran Pengembangan</CardTitle>
                      <CardDescription>Tahun Akademik 2023/2024</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Total: Rp 2.5M</p>
                      <p>Terpakai: 28%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Anggaran Kemahasiswaan</CardTitle>
                      <CardDescription>Tahun Akademik 2023/2024</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Total: Rp 1.0M</p>
                      <p>Terpakai: 52%</p>
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

