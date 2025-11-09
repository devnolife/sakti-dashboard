"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, ClipboardCheck, Briefcase, ArrowRight, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function DocumentVerificationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verifikasi Dokumen</h1>
        <p className="text-muted-foreground">
          Pusat verifikasi dan persetujuan semua dokumen fakultas
        </p>
      </div>

      {/* Overview Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Menunggu</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">
              Semua kategori dokumen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disetujui Hari Ini</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">
              Dokumen terverifikasi
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bulan Ini</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-muted-foreground">
              Semua status
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Verification Categories */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Exam Documents */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <ClipboardCheck className="h-8 w-8 text-primary" />
              <Badge variant="destructive">12 Menunggu</Badge>
            </div>
            <CardTitle className="mt-4">Verifikasi Ujian</CardTitle>
            <CardDescription>
              Verifikasi dokumen ujian skripsi, proposal, dan komprehensif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Menunggu</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Disetujui Hari Ini</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Bulan Ini</span>
                <span className="font-semibold">156</span>
              </div>
            </div>
            <Link href="/dashboard/dosen/vice-dean-1/document-verification/exam">
              <Button className="w-full">
                Lihat Detail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* General Documents */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <FileText className="h-8 w-8 text-primary" />
              <Badge variant="destructive">8 Menunggu</Badge>
            </div>
            <CardTitle className="mt-4">Verifikasi Umum</CardTitle>
            <CardDescription>
              Verifikasi surat keterangan, ijin, dan dokumen administratif
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Menunggu</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Disetujui Hari Ini</span>
                <span className="font-semibold">15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Bulan Ini</span>
                <span className="font-semibold">234</span>
              </div>
            </div>
            <Link href="/dashboard/dosen/vice-dean-1/document-verification/general">
              <Button className="w-full">
                Lihat Detail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* KKP Documents */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Briefcase className="h-8 w-8 text-primary" />
              <Badge variant="destructive">2 Menunggu</Badge>
            </div>
            <CardTitle className="mt-4">Verifikasi KKP</CardTitle>
            <CardDescription>
              Verifikasi dokumen KKP dan persetujuan lokasi praktik
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Menunggu</span>
                <span className="font-semibold">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Disetujui Hari Ini</span>
                <span className="font-semibold">11</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Bulan Ini</span>
                <span className="font-semibold">177</span>
              </div>
            </div>
            <Link href="/dashboard/dosen/vice-dean-1/document-verification/kkp">
              <Button className="w-full">
                Lihat Detail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Riwayat verifikasi dokumen terbaru</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "Ujian",
                action: "Disetujui",
                document: "Dokumen Ujian Skripsi - Budi Santoso",
                time: "5 menit lalu",
                status: "approved"
              },
              {
                type: "Umum",
                action: "Disetujui",
                document: "Surat Keterangan Aktif - Ani Wijaya",
                time: "15 menit lalu",
                status: "approved"
              },
              {
                type: "KKP",
                action: "Disetujui",
                document: "Persetujuan Lokasi KKP - Dedi Pratama",
                time: "1 jam lalu",
                status: "approved"
              },
              {
                type: "Ujian",
                action: "Ditolak",
                document: "Dokumen Ujian Proposal - Eko Saputra",
                time: "2 jam lalu",
                status: "rejected"
              },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${activity.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div>
                    <p className="font-medium">{activity.document}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={activity.status === 'approved' ? 'default' : 'destructive'}>
                  {activity.action}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
