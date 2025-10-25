"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bell,
  Send,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Notifikasi</h2>
          <p className="text-muted-foreground">
            Kelola notifikasi dan pengumuman sistem
          </p>
        </div>
        <Button>
          <Send className="w-4 h-4 mr-2" />
          Kirim Notifikasi
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Notifikasi</CardTitle>
            <Bell className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,452</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Terkirim</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,387</div>
            <p className="text-xs text-green-500">Berhasil dikirim</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-amber-500">Dalam antrian</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gagal</CardTitle>
            <AlertCircle className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-red-500">Perlu dikirim ulang</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/notifications/send">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-blue-500" />
                <CardTitle>Kirim Notifikasi</CardTitle>
              </div>
              <CardDescription>Kirim notifikasi ke pengguna</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Buat dan kirim notifikasi ke mahasiswa, dosen, atau staff
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/notifications/broadcast">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <CardTitle>Broadcast</CardTitle>
              </div>
              <CardDescription>Kirim ke banyak pengguna</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Kirim notifikasi massal berdasarkan role atau filter
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/notifications/templates">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <CardTitle>Template</CardTitle>
              </div>
              <CardDescription>Template notifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Kelola template untuk notifikasi yang sering digunakan
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/notifications/history">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <CardTitle>Riwayat</CardTitle>
              </div>
              <CardDescription>Riwayat notifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Lihat riwayat semua notifikasi yang pernah dikirim
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/notifications/statistics">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                <CardTitle>Statistik</CardTitle>
              </div>
              <CardDescription>Laporan notifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Lihat statistik pengiriman dan engagement notifikasi
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/notifications/settings">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <CardTitle>Pengaturan</CardTitle>
              </div>
              <CardDescription>Konfigurasi notifikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Atur preferensi dan channel notifikasi
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
