"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  FileText,
  FileType,
  FileCode,
  Send,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function LetterRequestsPage() {
  return (
    <div className="mt-20 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Surat Menyurat</h2>
          <p className="text-muted-foreground">
            Kelola permohonan surat, template, dan arsip surat
          </p>
        </div>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          Buat Surat Baru
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Permohonan</CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">Bulan ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Menunggu Persetujuan</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-amber-500">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Disetujui</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">210</div>
            <p className="text-xs text-green-500">Sudah diproses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Template Surat</CardTitle>
            <FileCode className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Template tersedia</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/admin/letter-requests/list">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <CardTitle>Permohonan Surat</CardTitle>
              </div>
              <CardDescription>Kelola permohonan surat masuk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Proses permohonan surat dari mahasiswa dan dosen
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/letter-types">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileType className="w-5 h-5 text-green-500" />
                <CardTitle>Jenis Surat</CardTitle>
              </div>
              <CardDescription>Kelola jenis dan kategori surat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Atur jenis surat, persyaratan, dan flow persetujuan
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/letter-templates">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-purple-500" />
                <CardTitle>Template Surat</CardTitle>
              </div>
              <CardDescription>Kelola template surat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Buat dan edit template surat untuk berbagai keperluan
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/letter-archive">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-amber-500" />
                <CardTitle>Arsip Surat</CardTitle>
              </div>
              <CardDescription>Arsip surat yang sudah diproses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Lihat dan cari arsip surat yang sudah diproses
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/letter-statistics">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                <CardTitle>Statistik</CardTitle>
              </div>
              <CardDescription>Laporan dan statistik surat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Lihat tren dan statistik pembuatan surat
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/admin/letter-settings">
          <Card className="transition-all cursor-pointer hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-orange-500" />
                <CardTitle>Pengaturan</CardTitle>
              </div>
              <CardDescription>Konfigurasi sistem surat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Atur format nomor surat, tanda tangan, dan lainnya
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
