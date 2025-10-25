"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  FileText,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Keuangan</h2>
          <p className="text-muted-foreground">
            Kelola pembayaran, anggaran, dan laporan keuangan
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Laporan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 2.5M</div>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5% dari bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pembayaran Lunas</CardTitle>
            <CreditCard className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">Mahasiswa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Tunggakan</CardTitle>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-red-500">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Anggaran Tersisa</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 1.2M</div>
            <p className="text-xs text-muted-foreground">Dari Rp 3M</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/payments/list">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-500" />
                <CardTitle>Pembayaran</CardTitle>
              </div>
              <CardDescription>Daftar pembayaran mahasiswa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Lihat dan kelola pembayaran SPP, lab, dan lainnya
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/payment-items">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                <CardTitle>Item Pembayaran</CardTitle>
              </div>
              <CardDescription>Kelola jenis pembayaran</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Atur item pembayaran seperti SPP, lab, ujian
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/budgets">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-500" />
                <CardTitle>Anggaran</CardTitle>
              </div>
              <CardDescription>Manajemen anggaran fakultas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Kelola alokasi anggaran per departemen
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/expenses">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <CardTitle>Pengeluaran</CardTitle>
              </div>
              <CardDescription>Pencatatan pengeluaran</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Catat dan monitor pengeluaran fakultas
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/financial-reports">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-500" />
                <CardTitle>Laporan Keuangan</CardTitle>
              </div>
              <CardDescription>Laporan dan analisis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Laporan bulanan, tahunan, dan analisis keuangan
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/payment-reminders">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                <CardTitle>Reminder</CardTitle>
              </div>
              <CardDescription>Pengingat pembayaran</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Kirim pengingat ke mahasiswa yang menunggak
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
