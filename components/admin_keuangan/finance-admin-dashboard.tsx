"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BarChart3, DollarSign, Users, FileText, ArrowUpRight, Download, Upload, PieChart } from "lucide-react"
import { PaymentStatistics } from "./payment-statistics"

export function FinanceAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
          <TabsTrigger value="statistics">Statistik</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Pembayaran</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 1.234.567.890</div>
                <p className="text-xs text-muted-foreground">+20,1% dari semester lalu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Mahasiswa Aktif</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.345</div>
                <p className="text-xs text-muted-foreground">+180 dari semester lalu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Tingkat Pembayaran</CardTitle>
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78,5%</div>
                <p className="text-xs text-muted-foreground">+5,2% dari semester lalu</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Pembayaran Tertunda</CardTitle>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">-12% dari semester lalu</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Ikhtisar Pembayaran</CardTitle>
                <CardDescription>Status pembayaran di semua program studi</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                  {/* Placeholder for chart */}
                  <div className="flex items-center justify-center w-full h-full border border-dashed rounded-md">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      <div className="text-sm font-medium">Status Pembayaran per Program</div>
                      <div className="text-xs text-muted-foreground">Menampilkan data untuk semester saat ini</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Statistik Program</CardTitle>
                <CardDescription>Distribusi pembayaran berdasarkan program studi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Placeholder for chart */}
                  <div className="flex items-center justify-center w-full h-full border border-dashed rounded-md">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <PieChart className="w-8 h-8 text-muted-foreground" />
                      <div className="text-sm font-medium">Distribusi Program</div>
                      <div className="text-xs text-muted-foreground">
                        Pengairan, Elektro, Arsitektur, Informatika, Perencanaan Wilayah
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Tindakan Cepat</CardTitle>
                <CardDescription>Tugas umum untuk pengelolaan pembayaran</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button asChild className="justify-between w-full">
                  <Link href="/dashboard/admin_keuangan/payments">
                    Kelola Pembayaran
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="justify-between w-full">
                  <Link href="/dashboard/admin_keuangan/payments/create">
                    Tambah Pembayaran Baru
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  Ekspor Data
                  <Download className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" className="justify-between w-full">
                  Impor Data
                  <Upload className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>Aktivitas pembayaran terbaru dalam sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <DollarSign className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Pembayaran{" "}
                          {i === 1
                            ? "dibuat"
                            : i === 2
                              ? "diperbarui"
                              : i === 3
                                ? "diproses"
                                : i === 4
                                  ? "diverifikasi"
                                  : "diekspor"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {i === 1
                            ? "Catatan pembayaran baru dibuat untuk NIM 2023001"
                            : i === 2
                              ? "Status pembayaran diperbarui untuk NIM 2023002"
                              : i === 3
                                ? "Pembayaran diproses untuk NIM 2023003"
                                : i === 4
                                  ? "Pembayaran diverifikasi untuk NIM 2023004"
                                  : "Data pembayaran diekspor ke Excel"}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {i === 1
                          ? "2 menit lalu"
                          : i === 2
                            ? "15 menit lalu"
                            : i === 3
                              ? "1 jam lalu"
                              : i === 4
                                ? "3 jam lalu"
                                : "5 jam lalu"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Lihat Semua Aktivitas
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <PaymentStatistics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan Keuangan</CardTitle>
              <CardDescription>Buat dan unduh laporan keuangan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "Ringkasan Pembayaran",
                  "Pembayaran Tertunggak",
                  "Analisis Program",
                  "Perbandingan Semester",
                  "Tren Pembayaran",
                  "Status Keuangan Mahasiswa",
                ].map((report) => (
                  <Card key={report}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{report}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-xs text-muted-foreground">
                        {report === "Ringkasan Pembayaran"
                          ? "Gambaran umum seluruh pembayaran pada periode ini"
                          : report === "Pembayaran Tertunggak"
                            ? "Daftar semua pembayaran tertunda dan terlambat"
                            : report === "Analisis Program"
                              ? "Analisis pembayaran berdasarkan program studi"
                              : report === "Perbandingan Semester"
                                ? "Bandingkan pembayaran antar semester"
                                : report === "Tren Pembayaran"
                                  ? "Tren pembayaran dari waktu ke waktu"
                                  : "Status keuangan terperinci untuk setiap mahasiswa"}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Buat Laporan
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

