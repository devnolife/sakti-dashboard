"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Info,
  User,
  AlertCircle,
  ArrowRight,
  BookMarked,
  Bookmark,
} from "lucide-react"

export function AIKKomfrenDashboard() {
  const [examStatus, setExamStatus] = useState<
    "not_registered" | "registered" | "scheduled" | "completed" | "passed" | "failed"
  >("not_registered")

  // This would come from an API in a real application
  const studentData = {
    name: "Andi Wijaya",
    nim: "12345678",
    faculty: "Fakultas Ilmu Komputer",
    program: "Ilmu Komputer",
    semester: 6,
  }

  const renderStatusBadge = () => {
    switch (examStatus) {
      case "not_registered":
        return (
          <Badge variant="outline" className="text-gray-500">
            Belum Terdaftar
          </Badge>
        )
      case "registered":
        return (
          <Badge variant="outline" className="text-blue-500">
            Terdaftar
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="text-amber-500">
            Terjadwal
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-purple-500">
            Selesai
          </Badge>
        )
      case "passed":
        return <Badge className="bg-green-500">Lulus</Badge>
      case "failed":
        return <Badge variant="destructive">Tidak Lulus</Badge>
    }
  }

  const renderProgressStep = (
    step: number,
    title: string,
    description: string,
    status: "completed" | "current" | "upcoming",
  ) => (
    <div className="flex items-start gap-4">
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
          status === "completed"
            ? "bg-primary text-primary-foreground"
            : status === "current"
              ? "border-primary text-primary"
              : "border-muted-foreground/30 text-muted-foreground/30"
        }`}
      >
        {status === "completed" ? <CheckCircle2 className="h-4 w-4" /> : step}
      </div>
      <div className="space-y-1">
        <p
          className={`font-medium ${
            status === "completed"
              ? "text-primary"
              : status === "current"
                ? "text-foreground"
                : "text-muted-foreground/60"
          }`}
        >
          {title}
        </p>
        <p className={`text-sm ${status === "upcoming" ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Ujian AIK Komfren
          </span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Kelola proses Ujian AIK Komfren Anda mulai dari pendaftaran hingga penyelesaian.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="text-sm font-medium">Status Ujian</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{renderStatusBadge()}</div>
            <p className="text-xs text-muted-foreground mt-1">Pembaruan terakhir: Hari ini</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-secondary/5 to-secondary/10">
            <CardTitle className="text-sm font-medium">Pendaftaran</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{examStatus === "not_registered" ? "Belum Mulai" : "Selesai"}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {examStatus === "not_registered"
                ? "Daftar untuk memulai proses"
                : "Pendaftaran selesai pada 10/03/2025"}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-green-500/5 to-green-500/10">
            <CardTitle className="text-sm font-medium">Jadwal Ujian</CardTitle>
            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {examStatus === "not_registered" || examStatus === "registered" ? "Tertunda" : "15/03/2025"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {examStatus === "not_registered" || examStatus === "registered"
                ? "Menunggu penugasan jadwal"
                : "10:00 - Ruang 301"}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-500/5 to-amber-500/10">
            <CardTitle className="text-sm font-medium">Penguji</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <User className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">
              {examStatus === "not_registered" || examStatus === "registered" ? "Belum Ditugaskan" : "Dr. Ahmad"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {examStatus === "not_registered" || examStatus === "registered"
                ? "Penguji akan ditugaskan setelah pendaftaran"
                : "Departemen Studi Islam"}
            </p>
          </CardContent>
        </Card>
      </div>

      {examStatus === "not_registered" && (
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle>Mulai dengan Ujian AIK Komfren</AlertTitle>
          <AlertDescription>
            Anda belum terdaftar untuk Ujian AIK Komfren. Mulailah dengan menyelesaikan proses pendaftaran dan pembayaran.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/registration">
                Daftar Sekarang <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      {examStatus === "registered" && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-900/30 dark:text-blue-300">
          <Info className="h-4 w-4" />
          <AlertTitle>Pendaftaran Selesai</AlertTitle>
          <AlertDescription>
            Pendaftaran Anda telah diproses dengan sukses. Silakan tunggu jadwal ujian dan penugasan penguji Anda. Anda akan diberi tahu setelah jadwal tersedia.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
                Periksa Status Jadwal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      {examStatus === "scheduled" && (
        <Alert className="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-900/30 dark:text-amber-300">
          <Calendar className="h-4 w-4" />
          <AlertTitle>Ujian Telah Dijadwalkan</AlertTitle>
          <AlertDescription>
            Ujian AIK Komfren Anda telah dijadwalkan pada tanggal 15 Maret 2025 pukul 10:00 di Ruang 301. Penguji Anda adalah Dr. Ahmad dari Departemen Studi Islam. Harap tiba 15 menit sebelum waktu yang dijadwalkan.
          </AlertDescription>
          <div className="mt-4">
            <Button asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
                Lihat Detail Jadwal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      {(examStatus === "completed" || examStatus === "passed" || examStatus === "failed") && (
        <Alert
          className={
            examStatus === "passed"
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-300"
              : examStatus === "failed"
                ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-300"
                : "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-900/30 dark:text-purple-300"
          }
        >
          {examStatus === "passed" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : examStatus === "failed" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <AlertTitle>
            {examStatus === "passed" ? "Ujian Lulus" : examStatus === "failed" ? "Ujian Tidak Lulus" : "Ujian Selesai"}
          </AlertTitle>
          <AlertDescription>
            {examStatus === "passed"
              ? "Selamat! Anda telah berhasil lulus Ujian AIK Komfren. Sertifikat Anda akan segera tersedia."
              : examStatus === "failed"
                ? "Sayangnya, Anda tidak lulus Ujian AIK Komfren. Silakan hubungi penasihat akademik Anda untuk panduan mengulang ujian."
                : "Ujian Anda telah selesai dan sedang dievaluasi. Hasil akan segera tersedia."}
          </AlertDescription>
          <div className="mt-4">
            <Button
              asChild
              variant={examStatus === "passed" ? "default" : examStatus === "failed" ? "destructive" : "outline"}
            >
              <Link href="/dashboard/mahasiswa/aik-komfren/completion">
                Lihat Detail Ujian <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Kemajuan Ujian AIK Komfren</CardTitle>
          <CardDescription>Lacak kemajuan Anda dalam proses ujian AIK Komfren</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {renderProgressStep(
              1,
              "Pendaftaran & Pembayaran",
              "Daftar ujian dan bayar biaya konsumsi",
              examStatus !== "not_registered" ? "completed" : "current",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              2,
              "Penugasan Jadwal & Penguji",
              "Terima jadwal ujian dan informasi penguji",
              examStatus === "not_registered" ? "upcoming" : examStatus === "registered" ? "current" : "completed",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              3,
              "Persiapan Ujian",
              "Bersiap untuk ujian Anda menggunakan materi yang disediakan",
              examStatus === "not_registered" || examStatus === "registered"
                ? "upcoming"
                : examStatus === "scheduled"
                  ? "current"
                  : "completed",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              4,
              "Penyelesaian Ujian",
              "Selesaikan ujian dan kirimkan informasi yang diperlukan",
              examStatus === "not_registered" || examStatus === "registered" || examStatus === "scheduled"
                ? "upcoming"
                : examStatus === "completed"
                  ? "current"
                  : "completed",
            )}
            <div className="mx-4 h-5 border-l border-dashed border-muted-foreground/30"></div>
            {renderProgressStep(
              5,
              "Hasil & Sertifikasi",
              "Terima hasil ujian dan sertifikasi Anda",
              examStatus === "passed" || examStatus === "failed" ? "completed" : "upcoming",
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informasi Ujian</CardTitle>
            <CardDescription>Informasi penting tentang Ujian AIK Komfren</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              <span className="font-medium">Format Ujian:</span>
              <span>Ujian lisan tentang studi Islam</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Durasi:</span>
              <span>30-45 menit</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-medium">Materi:</span>
              <span>Al-Qur'an, Hadits, dan prinsip-prinsip Islam</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">Persyaratan:</span>
              <span>Minimal mahasiswa semester 4</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="#">Lihat Panduan Ujian Lengkap</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tindakan Cepat</CardTitle>
            <CardDescription>Kelola proses Ujian AIK Komfren Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/registration">
                <FileText className="mr-2 h-4 w-4" /> Pendaftaran & Pembayaran
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/schedule">
                <Calendar className="mr-2 h-4 w-4" /> Lihat Jadwal & Penguji
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/dashboard/mahasiswa/aik-komfren/completion">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Penyelesaian Ujian
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="#">
                <Bookmark className="mr-2 h-4 w-4" /> Materi Belajar
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

