"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, TrendingUp, Award, AlertCircle, ArrowUpRight, ArrowDownRight, GraduationCap, BookOpen, Download } from "lucide-react"

export default function AcademicMonitoringPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Monitoring Akademik</h1>
          <p className="text-xs text-muted-foreground">Pantau kinerja akademik mahasiswa dan program studi</p>
        </div>
        <Button size="sm" className="h-8 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Download className="h-3 w-3 mr-1" />
          Ekspor Laporan
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50 dark:from-blue-950/40 dark:to-blue-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Total Mahasiswa</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Users className="h-3.5 w-3.5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-700">2,847</div>
            <p className="text-[10px] text-blue-600/80 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              +12% dari semester lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200/50 dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">IPK Rata-rata</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-700">3.42</div>
            <p className="text-[10px] text-green-600/80 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              +0.08 dari semester lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50 dark:from-purple-950/40 dark:to-purple-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Kelulusan Tepat Waktu</CardTitle>
            <div className="p-1.5 bg-purple-500/10 rounded-lg">
              <GraduationCap className="h-3.5 w-3.5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-700">78.5%</div>
            <p className="text-[10px] text-purple-600/80 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" />
              +3.2% dari tahun lalu
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50 dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium">Perhatian Khusus</CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-amber-700">23</div>
            <p className="text-[10px] text-amber-600/80">
              IPK &lt; 2.0 atau SKS &lt; 12
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-3">
        <TabsList className="h-9">
          <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
          <TabsTrigger value="by-prodi" className="text-xs">Per Prodi</TabsTrigger>
          <TabsTrigger value="students" className="text-xs">Mahasiswa Bermasalah</TabsTrigger>
          <TabsTrigger value="courses" className="text-xs">Mata Kuliah</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  Distribusi IPK
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: 'IPK > 3.5', value: 45, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
                  { label: 'IPK 3.0 - 3.5', value: 35, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
                  { label: 'IPK 2.5 - 3.0', value: 15, color: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
                  { label: 'IPK < 2.5', value: 5, color: 'bg-gradient-to-r from-red-500 to-rose-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-24 text-xs">{item.label}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div className={`h-full ${item.color} flex items-center justify-end px-2`} style={{ width: `${item.value}%` }}>
                        <span className="text-[10px] font-medium text-white">{item.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  Prestasi Akademik
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { name: 'Cumlaude', count: 45, color: 'text-yellow-600 bg-yellow-50' },
                  { name: 'Sangat Memuaskan', count: 123, color: 'text-blue-600 bg-blue-50' },
                  { name: 'Memuaskan', count: 67, color: 'text-green-600 bg-green-50' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Badge className={`${item.color} text-xs`}>{item.name}</Badge>
                    </div>
                    <span className="text-sm font-bold">{item.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="by-prodi" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { prodi: 'Informatika', students: 456, ipk: 3.45, color: 'from-blue-500 to-cyan-500' },
              { prodi: 'Teknik Sipil', students: 389, ipk: 3.38, color: 'from-green-500 to-emerald-500' },
              { prodi: 'Arsitektur', students: 267, ipk: 3.51, color: 'from-purple-500 to-pink-500' },
              { prodi: 'Teknik Elektro', students: 345, ipk: 3.42, color: 'from-amber-500 to-orange-500' },
              { prodi: 'PWK', students: 234, ipk: 3.39, color: 'from-indigo-500 to-blue-500' },
            ].map((prodi, i) => (
              <Card key={i} className={`overflow-hidden border-0 bg-gradient-to-br ${prodi.color}`}>
                <CardHeader className="pb-2 text-white">
                  <CardTitle className="text-sm font-semibold">{prodi.prodi}</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs opacity-90">Mahasiswa</p>
                      <p className="text-2xl font-bold">{prodi.students}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-90">IPK Rata-rata</p>
                      <p className="text-2xl font-bold">{prodi.ipk}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Daftar Mahasiswa Perlu Perhatian Khusus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'Ahmad Fauzi', nim: '123456789', ipk: 1.85, sks: 8, status: 'danger' },
                  { name: 'Siti Nurhaliza', nim: '123456790', ipk: 2.15, sks: 11, status: 'warning' },
                  { name: 'Budi Santoso', nim: '123456791', ipk: 2.42, sks: 9, status: 'warning' },
                ].map((student, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.nim}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">IPK</p>
                        <p className={`text-sm font-bold ${student.ipk < 2.0 ? 'text-red-600' : 'text-amber-600'}`}>
                          {student.ipk}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">SKS</p>
                        <p className={`text-sm font-bold ${student.sks < 12 ? 'text-red-600' : 'text-amber-600'}`}>
                          {student.sks}
                        </p>
                      </div>
                      <Badge variant={student.status === 'danger' ? 'destructive' : 'secondary'} className="text-xs">
                        {student.status === 'danger' ? 'Kritis' : 'Perhatian'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Mata Kuliah dengan Kelulusan Tertinggi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { course: 'Pemrograman Web', pass: 95, color: 'text-green-600' },
                  { course: 'Basis Data', pass: 92, color: 'text-green-600' },
                  { course: 'Algoritma Pemrograman', pass: 89, color: 'text-green-600' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-green-50">
                    <span className="text-xs font-medium">{item.course}</span>
                    <Badge className="bg-green-100 text-green-700 text-xs">{item.pass}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Mata Kuliah Perlu Evaluasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { course: 'Kalkulus Lanjut', pass: 65, color: 'text-red-600' },
                  { course: 'Struktur Data', pass: 68, color: 'text-red-600' },
                  { course: 'Fisika Teknik', pass: 72, color: 'text-amber-600' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-red-50">
                    <span className="text-xs font-medium">{item.course}</span>
                    <Badge variant="destructive" className="text-xs">{item.pass}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
