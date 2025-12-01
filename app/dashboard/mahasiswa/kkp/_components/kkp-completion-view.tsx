"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Award,
  FileText,
  Download,
  Calendar,
  MapPin,
  Users,
  Star,
  Building,
  Clock,
  Trophy,
  ExternalLink,
  FileCheck,
} from "lucide-react"
import Link from "next/link"

interface KkpCompletionData {
  applicationId: string
  applicationNumber: string
  title: string
  company: {
    name: string
    address: string
    city: string
  }
  startDate: Date
  endDate: Date
  completionDate: Date
  supervisor?: {
    name: string
    nip: string
  }
  groupMembers: Array<{
    name: string
    nim: string
  }>
  finalScore?: number
  grade?: string
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
    uploadDate: Date
  }>
}

interface KkpCompletionViewProps {
  data: KkpCompletionData
}

export function KkpCompletionView({ data }: KkpCompletionViewProps) {
  const durationInDays = Math.ceil(
    (data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  const durationInMonths = Math.ceil(durationInDays / 30)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              KKP Selesai
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Selamat! Anda telah menyelesaikan program Kuliah Kerja Praktik
          </p>
        </div>
      </div>

      {/* Completion Celebration Card */}
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-xl">
              <Trophy className="w-16 h-16 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-green-800 mb-2">
                Selamat Atas Kesuksesan Anda!
              </h2>
              <p className="text-lg text-green-700 mb-4">
                Anda telah berhasil menyelesaikan program KKP dengan baik
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge className="px-4 py-2 text-sm bg-green-600 text-white hover:bg-green-700">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Program Selesai
                </Badge>
                {data.finalScore && (
                  <Badge className="px-4 py-2 text-sm bg-emerald-600 text-white hover:bg-emerald-700">
                    <Star className="w-4 h-4 mr-2" />
                    Nilai: {data.finalScore} ({data.grade})
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* KKP Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary" />
              Informasi KKP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Nomor Aplikasi</p>
                  <p className="font-semibold">{data.applicationNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Lokasi KKP</p>
                  <p className="font-semibold">{data.company.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {data.company.address}, {data.company.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Periode Pelaksanaan</p>
                  <p className="font-semibold">
                    {data.startDate.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {data.endDate.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Durasi: {durationInMonths} bulan ({durationInDays} hari)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Tanggal Selesai</p>
                  <p className="font-semibold text-green-700">
                    {data.completionDate.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Tim & Pembimbing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.supervisor && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Dosen Pembimbing
                  </p>
                  <div className="p-3 border rounded-lg bg-primary/5">
                    <p className="font-semibold">{data.supervisor.name}</p>
                    <p className="text-sm text-muted-foreground">
                      NIP: {data.supervisor.nip}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Anggota Kelompok ({data.groupMembers.length} orang)
                </p>
                <div className="space-y-2">
                  {data.groupMembers.map((member, index) => (
                    <div
                      key={member.nim}
                      className="p-3 border rounded-lg bg-white flex items-center gap-3"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">
                          NIM: {member.nim}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Final Assessment */}
      {data.finalScore && (
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Penilaian Akhir</h2>
                <p className="text-sm text-muted-foreground">
                  Hasil evaluasi pelaksanaan KKP Anda
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-8 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl mb-4">
                  <span className="text-5xl font-bold text-white">
                    {data.finalScore}
                  </span>
                </div>
                <p className="text-2xl font-bold text-emerald-700">
                  Grade: {data.grade}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents */}
      {data.documents.length > 0 && (
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Dokumen KKP
            </CardTitle>
            <CardDescription>
              Download dokumen-dokumen terkait KKP Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border rounded-lg bg-white hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{doc.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Diunggah:{" "}
                          {doc.uploadDate.toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(doc.url, "_blank")}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <ExternalLink className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Langkah Selanjutnya</h2>
              <p className="text-sm text-muted-foreground">
                Hal-hal yang bisa Anda lakukan setelah menyelesaikan KKP
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/mahasiswa/kkp/certificate">
              <Button
                variant="outline"
                className="w-full h-auto py-6 justify-start"
              >
                <div className="flex flex-col items-start gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">Sertifikat KKP</p>
                    <p className="text-xs text-muted-foreground">
                      Download sertifikat penyelesaian
                    </p>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/dashboard/mahasiswa/kkp/documents">
              <Button
                variant="outline"
                className="w-full h-auto py-6 justify-start"
              >
                <div className="flex flex-col items-start gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">Arsip Dokumen</p>
                    <p className="text-xs text-muted-foreground">
                      Lihat semua dokumen KKP
                    </p>
                  </div>
                </div>
              </Button>
            </Link>

            <Link href="/dashboard/mahasiswa/feedback">
              <Button
                variant="outline"
                className="w-full h-auto py-6 justify-start"
              >
                <div className="flex flex-col items-start gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <p className="font-semibold">Berikan Feedback</p>
                    <p className="text-xs text-muted-foreground">
                      Evaluasi program KKP
                    </p>
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Congratulations Message */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-8 text-center">
          <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">
            Terima kasih atas dedikasi Anda!
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pengalaman KKP yang Anda dapatkan akan menjadi bekal berharga
            untuk karir profesional Anda di masa depan. Semoga sukses selalu!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
