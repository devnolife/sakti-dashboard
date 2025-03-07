"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Calendar, TrendingUp, CheckCircle } from "lucide-react"

interface StaffTUDashboardProps {
  activeSection: string
}

export default function StaffTUDashboard({ activeSection }: StaffTUDashboardProps) {
  // For now, we'll just show a simple dashboard for all sections
  // In a real application, you would render different content based on activeSection

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Dashboard Staff TU
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola data mahasiswa, dokumen, dan jadwal akademik.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Mahasiswa</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,245</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+5% dari semester lalu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dokumen Diproses</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <div className="flex items-center mt-1">
              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-xs text-green-500">32 selesai minggu ini</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jadwal Akademik</CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Acara dalam 30 hari ke depan</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tugas Mendesak</CardTitle>
          <CardDescription>Tugas yang memerlukan perhatian segera</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Verifikasi Dokumen Pendaftaran</p>
                <p className="text-xs text-muted-foreground">42 dokumen pendaftaran memerlukan verifikasi</p>
                <div className="mt-1">
                  <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Prioritas Tinggi</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5 text-amber-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Persiapan Jadwal Ujian</p>
                <p className="text-xs text-muted-foreground">
                  Jadwal ujian tengah semester perlu diselesaikan dalam 3 hari
                </p>
                <div className="mt-1">
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">Tenggat Dekat</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border p-4">
              <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Pembaruan Data Mahasiswa</p>
                <p className="text-xs text-muted-foreground">Data 78 mahasiswa perlu diperbarui sebelum akhir bulan</p>
                <div className="mt-1">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Dalam Proses</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

