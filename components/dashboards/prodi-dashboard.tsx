"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, ClipboardCheck, TrendingUp } from "lucide-react"

interface ProdiDashboardProps {
  activeSection: string
}

export default function ProdiDashboard({ activeSection }: ProdiDashboardProps) {
  // For now, we'll just show a simple dashboard for all sections
  // In a real application, you would render different content based on activeSection

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dashboard Program Studi
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Kelola kurikulum, pantau kemajuan mahasiswa, dan kelola persetujuan magang.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa Aktif</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+8% dari tahun lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mata Kuliah Aktif</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Semester Genap 2023/2024</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Persetujuan Magang</CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <ClipboardCheck className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Menunggu persetujuan</span>
              <span className="ml-1 text-xs bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded-full">⏳ Pending</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Aktivitas terbaru di program studi Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Pendaftaran Mata Kuliah Semester Baru</p>
                <p className="text-xs text-muted-foreground">245 mahasiswa telah mendaftar untuk semester baru</p>
                <div className="mt-1">
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Berlangsung</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-secondary" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Revisi Kurikulum</p>
                <p className="text-xs text-muted-foreground">
                  Revisi kurikulum untuk tahun akademik 2024/2025 telah dimulai
                </p>
                <div className="mt-1">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Dalam Proses</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <ClipboardCheck className="h-5 w-5 text-accent" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Persetujuan Magang</p>
                <p className="text-xs text-muted-foreground">12 pengajuan magang baru memerlukan persetujuan Anda</p>
                <div className="mt-1">
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                    Memerlukan Tindakan
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

