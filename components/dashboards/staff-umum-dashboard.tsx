"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Mail,
  Receipt,
  GraduationCap,
  Pencil,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Calendar,
  FileSpreadsheet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface StaffUmumDashboardProps {
  activeSection: string
}

export default function StaffUmumDashboard({ activeSection }: StaffUmumDashboardProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Dashboard Administrasi Umum
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">Kelola urusan mahasiswa non-reguler dan korespondensi pimpinan.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Mahasiswa Non-Reguler</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">328</div>
            <div className="flex items-center mt-1">
              <GraduationCap className="w-3 h-3 mr-1 text-green-500" />
              <span className="text-xs text-green-500">+12% dari semester lalu</span>
            </div>
            <Link href="/dashboard/admin_umum/non-regular-students/records">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Lihat Data</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pembayaran Tertunda</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <Receipt className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <div className="flex items-center mt-1">
              <Clock className="w-3 h-3 mr-1 text-amber-500" />
              <span className="text-xs text-amber-500">Perlu diproses segera</span>
            </div>
            <Link href="/dashboard/admin_umum/non-regular-students/payments">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Proses Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Draft Surat</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
              <Pencil className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Menunggu persetujuan</span>
            </div>
            <Link href="/dashboard/admin_umum/correspondence/drafts">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola Draft</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Urusan Akademik</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mint/10">
              <GraduationCap className="w-4 h-4 text-mint" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Perlu ditindaklanjuti</span>
            </div>
            <Link href="/dashboard/admin_umum/non-regular-students/academic">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola Akademik</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Surat Pimpinan</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Mail className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Perlu disiapkan</span>
            </div>
            <Link href="/dashboard/admin_umum/correspondence/leadership">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Kelola Surat</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Laporan</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <FileSpreadsheet className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Laporan bulanan</span>
            </div>
            <Link href="/dashboard/admim_umum/reports">
              <Button variant="ghost" size="sm" className="justify-between w-full mt-3">
                <span className="text-xs">Lihat Laporan</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
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
            <div className="flex items-start gap-4 p-4 border rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 shrink-0">
                <Receipt className="w-5 h-5 text-red-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Verifikasi Pembayaran Mahasiswa Non-Reguler</p>
                <p className="text-xs text-muted-foreground">15 pembayaran memerlukan verifikasi segera</p>
                <div className="mt-1">
                  <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">Prioritas Tinggi</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 shrink-0">
                <Mail className="w-5 h-5 text-amber-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Draft Surat untuk Dekan</p>
                <p className="text-xs text-muted-foreground">
                  Surat undangan rapat koordinasi perlu diselesaikan hari ini
                </p>
                <div className="mt-1">
                  <span className="text-xs bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">
                    Tenggat Hari Ini
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border rounded-xl">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                <GraduationCap className="w-5 h-5 text-blue-500" />
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium">Pendaftaran Mahasiswa Non-Reguler</p>
                <p className="text-xs text-muted-foreground">10 pendaftaran baru perlu diproses</p>
                <div className="mt-1">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full">Dalam Proses</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Aktivitas dan tugas terbaru</CardDescription>
            </div>
            <div className="p-2 rounded-full bg-primary/10">
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="payments">Pembayaran</TabsTrigger>
              <TabsTrigger value="correspondence">Korespondensi</TabsTrigger>
              <TabsTrigger value="academic">Akademik</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran Diverifikasi</p>
                    <p className="text-xs text-muted-foreground">
                      Anda telah memverifikasi pembayaran dari Ahmad Rizky untuk semester genap
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 jam yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Draft Surat Selesai</p>
                    <p className="text-xs text-muted-foreground">
                      Draft surat untuk Wakil Dekan 1 telah selesai dan menunggu persetujuan
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">3 jam yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 shrink-0">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pendaftaran Baru</p>
                    <p className="text-xs text-muted-foreground">
                      5 pendaftaran mahasiswa non-reguler baru telah masuk
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Kemarin</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran Diverifikasi</p>
                    <p className="text-xs text-muted-foreground">
                      Anda telah memverifikasi pembayaran dari Ahmad Rizky untuk semester genap
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 jam yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran Diverifikasi</p>
                    <p className="text-xs text-muted-foreground">
                      Anda telah memverifikasi pembayaran dari Siti Nuraini untuk semester genap
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">4 jam yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 shrink-0">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pembayaran Ditolak</p>
                    <p className="text-xs text-muted-foreground">
                      Anda telah menolak pembayaran dari Budi Santoso karena bukti transfer tidak valid
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Kemarin</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="correspondence">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                    <Mail className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Draft Surat Selesai</p>
                    <p className="text-xs text-muted-foreground">
                      Draft surat untuk Wakil Dekan 1 telah selesai dan menunggu persetujuan
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">3 jam yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Surat Disetujui</p>
                    <p className="text-xs text-muted-foreground">
                      Surat undangan rapat koordinasi telah disetujui oleh Dekan
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Kemarin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                    <Pencil className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Draft Baru</p>
                    <p className="text-xs text-muted-foreground">
                      Anda telah membuat draft surat kerjasama dengan industri
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 hari yang lalu</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 shrink-0">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Pendaftaran Baru</p>
                    <p className="text-xs text-muted-foreground">
                      5 pendaftaran mahasiswa non-reguler baru telah masuk
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">Kemarin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jadwal Kuliah Diperbarui</p>
                    <p className="text-xs text-muted-foreground">
                      Jadwal kuliah untuk mahasiswa non-reguler semester genap telah diperbarui
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">2 hari yang lalu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border rounded-xl">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Jadwal Ujian</p>
                    <p className="text-xs text-muted-foreground">
                      Jadwal ujian tengah semester untuk mahasiswa non-reguler telah ditetapkan
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">3 hari yang lalu</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

