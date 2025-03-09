"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BarChart, Award, TrendingUp } from "lucide-react"

interface DekanDashboardProps {
  activeSection: string
}

export default function DekanDashboard({ activeSection }: DekanDashboardProps) {
  // For now, we'll just show a simple dashboard for all sections
  // In a real application, you would render different content based on activeSection

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dashboard Dekan
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Pantau kinerja fakultas, analitik jurusan, dan manajemen fakultas.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fakultas</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Dari 15 jurusan</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5,280</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+12% dari tahun lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anggaran Tahunan</CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <BarChart className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp24,8M</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">72% dialokasikan</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hibah Penelitian</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp8,2M</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+15% dari tahun lalu</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kinerja Jurusan</CardTitle>
            <CardDescription>Perbandingan kinerja antar jurusan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Informatika</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "92%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Teknik Elektro</span>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "88%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Teknik Sipil</span>
                  <span className="text-sm font-medium">76%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "76%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Manajemen Bisnis</span>
                  <span className="text-sm font-medium">84%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "84%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rapat Mendatang</CardTitle>
            <CardDescription>Jadwal rapat penting dalam 2 minggu ke depan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border p-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Rapat Dewan Pengawas</p>
                  <p className="text-xs text-muted-foreground">Kamis, 10:00 - Ruang Rapat Utama</p>
                  <div className="mt-1">
                    <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">
                      Prioritas Tinggi
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border p-4">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                  <BarChart className="h-5 w-5 text-secondary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Tinjauan Anggaran Tahunan</p>
                  <p className="text-xs text-muted-foreground">Senin depan, 14:00 - Ruang Konferensi</p>
                  <div className="mt-1">
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full">Keuangan</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border p-4">
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Komite Hibah Penelitian</p>
                  <p className="text-xs text-muted-foreground">Rabu depan, 09:00 - Ruang Senat</p>
                  <div className="mt-1">
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">Penelitian</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

