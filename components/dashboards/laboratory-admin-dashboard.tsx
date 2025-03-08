"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Beaker,
  BookOpen,
  Calendar,
  CheckCircle,
  ClipboardList,
  Clock,
  Database,
  FileText,
  Settings,
  PenToolIcon as Tool,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react"
import Link from "next/link"

interface LaboratoryAdminDashboardProps {
  activeSection?: string
}

export default function LaboratoryAdminDashboard({ activeSection }: LaboratoryAdminDashboardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Dashboard Admin Laboratorium
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Kelola laboratorium, peralatan, jadwal praktikum, dan asisten laboratorium.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Laboratorium</CardTitle>
            <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
              <Beaker className="h-4 w-4 text-cyan-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground mt-1">Laboratorium aktif</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendaftaran Praktikum</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <ClipboardList className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+12% dari minggu lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asisten Lab</CardTitle>
            <div className="h-8 w-8 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-indigo-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-muted-foreground mt-1">Asisten aktif</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pemeliharaan</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Tool className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-red-500 mt-1">Memerlukan perhatian segera</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="registrations">Pendaftaran</TabsTrigger>
          <TabsTrigger value="schedule">Jadwal</TabsTrigger>
          <TabsTrigger value="inventory">Inventaris</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Jadwal Hari Ini</CardTitle>
                <CardDescription>Praktikum yang berlangsung hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Praktikum Basis Data</p>
                      <p className="text-xs text-muted-foreground">08:00 - 10:00 • Lab Database</p>
                      <div className="mt-1">
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">
                          Berlangsung
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Praktikum Jaringan Komputer</p>
                      <p className="text-xs text-muted-foreground">13:00 - 15:00 • Lab Networking</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                          Akan Datang
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Praktikum Pemrograman Web</p>
                      <p className="text-xs text-muted-foreground">15:30 - 17:30 • Lab Programming</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                          Akan Datang
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pemeliharaan Terjadwal</CardTitle>
                <CardDescription>Jadwal pemeliharaan peralatan lab</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                      <Wrench className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Kalibrasi Perangkat Jaringan</p>
                      <p className="text-xs text-muted-foreground">Besok, 09:00 • Lab Networking</p>
                      <div className="mt-1">
                        <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                          Prioritas Tinggi
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Wrench className="h-5 w-5 text-amber-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Pembaruan Software Lab</p>
                      <p className="text-xs text-muted-foreground">3 hari lagi • Lab Programming</p>
                      <div className="mt-1">
                        <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                          Prioritas Sedang
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-xl border p-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Wrench className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium">Pengecekan Perangkat Keras</p>
                      <p className="text-xs text-muted-foreground">Minggu depan • Semua Lab</p>
                      <div className="mt-1">
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Terjadwal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Akses cepat ke fungsi utama</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/dashboard/laboratory_admin/registrations">
                    <Button className="w-full justify-start" variant="outline">
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Kelola Pendaftaran
                    </Button>
                  </Link>
                  <Link href="/dashboard/laboratory_admin/lab-management/schedule">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Atur Jadwal Lab
                    </Button>
                  </Link>
                  <Link href="/dashboard/laboratory_admin/lab-management/inventory">
                    <Button className="w-full justify-start" variant="outline">
                      <Database className="mr-2 h-4 w-4" />
                      Inventaris Lab
                    </Button>
                  </Link>
                  <Link href="/dashboard/laboratory_admin/lab-management/maintenance">
                    <Button className="w-full justify-start" variant="outline">
                      <Tool className="mr-2 h-4 w-4" />
                      Jadwalkan Pemeliharaan
                    </Button>
                  </Link>
                  <Link href="/dashboard/laboratory_admin/assistants">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Kelola Asisten
                    </Button>
                  </Link>
                  <Link href="/dashboard/laboratory_admin/reports">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Buat Laporan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="registrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pendaftaran Praktikum Terbaru</CardTitle>
              <CardDescription>Pendaftaran yang memerlukan persetujuan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-xl border p-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="grid gap-1 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Budi Santoso</p>
                      <p className="text-xs text-muted-foreground">2 jam yang lalu</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Praktikum Basis Data • Lab Database</p>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                        Menunggu Persetujuan
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Tolak
                        </Button>
                        <Button size="sm">Setujui</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border p-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <ClipboardList className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="grid gap-1 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Siti Rahma</p>
                      <p className="text-xs text-muted-foreground">3 jam yang lalu</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Praktikum Jaringan Komputer • Lab Networking</p>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                        Menunggu Persetujuan
                      </span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Tolak
                        </Button>
                        <Button size="sm">Setujui</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border p-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="grid gap-1 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">Ahmad Fauzi</p>
                      <p className="text-xs text-muted-foreground">5 jam yang lalu</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Praktikum Pemrograman Web • Lab Programming</p>
                    <div className="mt-1">
                      <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Disetujui</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/dashboard/laboratory_admin/registrations">
                  <Button variant="outline">Lihat Semua Pendaftaran</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Praktikum Minggu Ini</CardTitle>
              <CardDescription>Jadwal praktikum untuk semua laboratorium</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Senin</div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Praktikum Basis Data</p>
                        <p className="text-xs text-muted-foreground">08:00 - 10:00 • Lab Database</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Praktikum Algoritma</p>
                        <p className="text-xs text-muted-foreground">13:00 - 15:00 • Lab Programming</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Selasa</div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Praktikum Jaringan Komputer</p>
                        <p className="text-xs text-muted-foreground">09:00 - 11:00 • Lab Networking</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <div className="bg-muted px-4 py-2 font-medium">Rabu</div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Praktikum Pemrograman Web</p>
                        <p className="text-xs text-muted-foreground">10:00 - 12:00 • Lab Programming</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Praktikum Sistem Operasi</p>
                        <p className="text-xs text-muted-foreground">15:00 - 17:00 • Lab Systems</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/dashboard/laboratory_admin/practicum/schedule">
                  <Button variant="outline">Lihat Jadwal Lengkap</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Status Inventaris</CardTitle>
              <CardDescription>Ringkasan inventaris laboratorium</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Perangkat Komputer</p>
                      <p className="text-xs text-muted-foreground">120 unit</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Kondisi Baik</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                      <Tool className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Perangkat Jaringan</p>
                      <p className="text-xs text-muted-foreground">45 unit</p>
                    </div>
                  </div>
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                    Perlu Pemeliharaan
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                      <Settings className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Peralatan Lab</p>
                      <p className="text-xs text-muted-foreground">78 unit</p>
                    </div>
                  </div>
                  <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">3 Rusak</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Bahan Praktikum</p>
                      <p className="text-xs text-muted-foreground">250 item</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Stok Cukup</span>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/dashboard/laboratory_admin/lab-management/inventory">
                  <Button variant="outline">Kelola Inventaris</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Aktivitas terbaru di laboratorium</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-cyan-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Penambahan Asisten Lab Baru</p>
                <p className="text-xs text-muted-foreground">3 asisten lab baru telah ditambahkan untuk semester ini</p>
                <div className="mt-1">
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Selesai</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Database className="h-5 w-5 text-blue-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Pembaruan Inventaris Lab</p>
                <p className="text-xs text-muted-foreground">15 komputer baru telah ditambahkan ke Lab Programming</p>
                <div className="mt-1">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Dalam Proses</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Tool className="h-5 w-5 text-amber-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Pemeliharaan Perangkat Jaringan</p>
                <p className="text-xs text-muted-foreground">Pemeliharaan rutin perangkat jaringan di Lab Networking</p>
                <div className="mt-1">
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Dijadwalkan</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

