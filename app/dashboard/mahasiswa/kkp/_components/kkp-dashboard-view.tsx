"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  CheckCircle,
  CheckCircle2,
  Clock,
  FileText,
  PlayCircle,
  Plus,
  XCircle,
  MapPin,
  CalendarDays,
  FileCheck,
  Info,
  Users,
  Calendar,
  Award,
  Briefcase,
  ClipboardList,
  PresentationIcon,
  Star,
  BookOpen,
  Building,
  UserCheck,
  FileSpreadsheet,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { kkpDataStore } from "@/lib/kkp-data-store"

interface KkpDashboardViewProps {
  applicationData: any // Type from KKP application
}

export function KkpDashboardView({ applicationData }: KkpDashboardViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)
  const [approvedDocument, setApprovedDocument] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Pengajuan Mahasiswa",
      description: "Pengajuan telah disubmit dengan lengkap",
      status: "completed",
      completedAt: new Date("2024-01-15")
    },
    {
      id: 2,
      title: "Verifikasi Staff TU",
      description: "Dokumen telah diverifikasi dan disetujui",
      status: "completed",
      completedAt: new Date("2024-01-18")
    },
    {
      id: 3,
      title: "Tanda Tangan Digital WD1",
      description: "Menunggu tanda tangan digital dari Wakil Dekan 1",
      status: "pending",
      completedAt: null
    },
    {
      id: 4,
      title: "Dokumen Resmi",
      description: "Dokumen KKP siap didownload",
      status: "pending",
      completedAt: null
    }
  ])

  useEffect(() => {
    setIsMounted(true)

    // Check for approved document
    const studentNim = "1234567890"
    const approvedApp = kkpDataStore.getApprovedApplicationWithDocument(studentNim)
    if (approvedApp && approvedApp.generatedDocument) {
      setApprovedDocument(approvedApp.generatedDocument)
    }
  }, [])

  // Periodically check for document updates
  useEffect(() => {
    const interval = setInterval(() => {
      const studentNim = "1234567890"
      const approvedApp = kkpDataStore.getApprovedApplicationWithDocument(studentNim)

      if (approvedApp && approvedApp.generatedDocument && !approvedDocument) {
        setApprovedDocument(approvedApp.generatedDocument)
        console.log("✅ REAL approved document detected from API:", approvedApp.generatedDocument)

        setSteps(prev => prev.map(step => {
          if (step.id === 3) {
            return {
              ...step,
              status: "completed",
              completedAt: new Date(),
              description: "Dokumen telah ditandatangani secara digital oleh WD1"
            }
          }
          if (step.id === 4) {
            return {
              ...step,
              status: "completed",
              completedAt: new Date(),
              description: `✅ REAL: ${approvedApp.generatedDocument?.message} - No. Surat: ${approvedApp.generatedDocument?.no_surat}`
            }
          }
          return step
        }))

        setCurrentStep(4)

        if (toast) {
          toast({
            title: "🎉 Dokumen KKP Selesai!",
            description: `REAL dari API: Dokumen dengan nomor surat ${approvedApp.generatedDocument?.no_surat} telah siap didownload.`,
          })
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [approvedDocument, currentStep, toast])

  if (!isMounted) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Dashboard KKP
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Kelola aplikasi dan progres Kuliah Kerja Praktik Anda
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/mahasiswa/kkp/requirements")}>
            <FileCheck className="w-4 h-4 mr-2" />
            Lihat Persyaratan
          </Button>
          <Button onClick={() => router.push("/dashboard/mahasiswa/kkp/apply")}>
            <Plus className="w-4 h-4 mr-2" />
            Ajukan KKP
          </Button>
        </div>
      </div>

      {/* Current Application Status */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-none shadow-lg md:col-span-2">
          <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Pengajuan Saat Ini</h2>
                <p className="text-sm text-muted-foreground">Status dan progres aplikasi KKP Anda yang aktif</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-5">
                <div className="p-4 transition-all bg-primary/5 rounded-xl hover:shadow-sm group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 transition-colors bg-white rounded-full shadow-sm group-hover:bg-primary/10">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">ID Pengajuan</span>
                    </div>
                    <div className="px-3 py-1 text-sm font-medium bg-white rounded-full shadow-sm">KKP-2023-0042</div>
                  </div>
                </div>

                <div className="p-4 transition-all bg-primary/5 rounded-xl hover:shadow-sm group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 transition-colors bg-white rounded-full shadow-sm group-hover:bg-primary/10">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">Lokasi</span>
                    </div>
                    <div className="px-3 py-1 text-sm font-medium bg-white rounded-full shadow-sm">
                      PT Teknologi Maju Indonesia
                    </div>
                  </div>
                </div>

                <div className="p-4 transition-all bg-primary/5 rounded-xl hover:shadow-sm group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 transition-colors bg-white rounded-full shadow-sm group-hover:bg-primary/10">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">Anggota Kelompok</span>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border-2 border-white rounded-full bg-secondary/20">
                        AS
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border-2 border-white rounded-full bg-primary/20">
                        BW
                      </div>
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border-2 border-white rounded-full bg-secondary/20">
                        RD
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 transition-all bg-primary/5 rounded-xl hover:shadow-sm group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 transition-colors bg-white rounded-full shadow-sm group-hover:bg-primary/10">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">Status</span>
                    </div>
                    <Badge className="px-3 py-1 text-yellow-800 bg-yellow-100 border-yellow-200 hover:bg-yellow-200">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Menunggu Persetujuan
                    </Badge>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/dashboard/mahasiswa/kkp/application">
                    <Button className="w-full transition-all shadow-md bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary hover:shadow-lg">
                      Lihat Detail Pengajuan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">PROGRES PENGAJUAN</h3>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    2 dari 4 Langkah
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 text-green-600 bg-green-100 border border-green-200 rounded-full shadow-sm">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-500 to-green-300 h-full"></div>
                      </div>
                      <div className="w-full p-3 rounded-lg shadow-sm bg-green-50">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Pengajuan Diajukan</p>
                          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                            Selesai
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-green-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          <p>15 Oktober 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 text-green-600 bg-green-100 border border-green-200 rounded-full shadow-sm">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-green-300 to-yellow-300 h-full"></div>
                      </div>
                      <div className="w-full p-3 rounded-lg shadow-sm bg-green-50">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Verifikasi Dokumen</p>
                          <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                            Selesai
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-green-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          <p>18 Oktober 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 text-yellow-600 bg-yellow-100 border border-yellow-200 rounded-full shadow-sm">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="absolute top-8 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-yellow-300 to-gray-300 h-full"></div>
                      </div>
                      <div className="w-full p-3 rounded-lg shadow-sm bg-yellow-50">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Persetujuan Pembimbing</p>
                          <Badge variant="outline" className="text-yellow-700 border-yellow-200 bg-yellow-50">
                            Dalam Proses
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-yellow-700">
                          <Clock className="w-3 h-3 mr-1" />
                          <p>Menunggu</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="z-10 flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 border border-gray-200 rounded-full shadow-sm">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="w-full p-3 rounded-lg shadow-sm bg-gray-50">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Penempatan Akhir</p>
                          <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50">
                            Belum Dimulai
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          <p>Jadwal: November 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-lg">
          <div className="p-6 bg-gradient-to-r from-red-500/10 via-red-400/5 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <CalendarDays className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Tenggat Waktu Berikutnya</h2>
                <p className="text-sm text-muted-foreground">Tenggat waktu penting Anda selanjutnya</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-red-500/10 animate-pulse">
                <Calendar className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">Pertemuan Pembimbing</h3>
              <p className="mt-1 text-sm text-muted-foreground">Jadwalkan pertemuan pertama Anda dengan pembimbing</p>
              <div className="flex items-center px-4 py-2 mt-3 text-red-700 rounded-full bg-red-50">
                <Clock className="w-4 h-4 mr-2" />
                Tenggat dalam 2 hari (25 Okt 2023)
              </div>
              <Button className="w-full mt-4 text-blue-700 bg-white border border-blue-200 shadow-sm hover:bg-blue-50">
                Jadwalkan Pertemuan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KKP Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Progres KKP</CardTitle>
          <CardDescription>Pantau progres keseluruhan Anda dalam program KKP</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Penyelesaian Persyaratan</span>
                <span className="text-sm font-medium">70%</span>
              </div>
              <Progress value={70} className="h-2" />
              <p className="text-xs text-muted-foreground">7 dari 10 persyaratan selesai</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Status Pengajuan</span>
                <span className="text-sm font-medium">50%</span>
              </div>
              <Progress value={50} className="h-2" />
              <p className="text-xs text-muted-foreground">Menunggu penugasan pembimbing</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Pelaksanaan</span>
                <span className="text-sm font-medium">0%</span>
              </div>
              <Progress value={0} className="h-2" />
              <p className="text-xs text-muted-foreground">Belum dimulai</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Progres Keseluruhan</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <Progress value={30} className="h-2" />
              <p className="text-xs text-muted-foreground">KKP dalam tahap awal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Status Timeline */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-800">📋 Status Pengajuan KKP</h2>
              <p className="text-sm text-blue-600">Pantau progres persetujuan aplikasi Anda</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isCompleted = step.status === "completed"
              const isInProgress = step.status === "in_progress"
              const isPending = step.status === "pending"

              if (step.id === 4 && steps[2].status === "pending") {
                return null
              }

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 ${
                    isCompleted
                      ? 'bg-green-50 border-green-200 transform scale-100'
                      : isInProgress
                        ? 'bg-blue-50 border-blue-200 transform scale-105 shadow-md'
                        : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isInProgress
                        ? 'bg-blue-500 text-white animate-pulse'
                        : 'bg-amber-500 text-white'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : isInProgress ? (
                      <Clock className="w-5 h-5 animate-spin" />
                    ) : (
                      <Clock className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold transition-colors duration-300 ${
                      isCompleted ? 'text-green-800' : isInProgress ? 'text-blue-800' : 'text-amber-800'
                    }`}>
                      {step.id}. {step.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isCompleted ? 'text-green-600' : isInProgress ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {step.description}
                    </p>
                    {step.completedAt && (
                      <p className="mt-1 text-xs text-gray-500">
                        Selesai: {step.completedAt.toLocaleDateString('id-ID')} {step.completedAt.toLocaleTimeString('id-ID')}
                      </p>
                    )}
                  </div>
                  <Badge className={`transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-100 text-green-700 border-green-300'
                      : isInProgress
                        ? 'bg-blue-100 text-blue-700 border-blue-300 animate-pulse'
                        : 'bg-amber-100 text-amber-700 border-amber-300'
                  }`}>
                    {isCompleted ? 'Selesai' : isInProgress ? 'Diproses' : 'Menunggu'}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Generated Document Card */}
      {approvedDocument && (
        <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <div className="p-6 bg-gradient-to-r from-green-500/10 to-green-600/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <FileCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800">📄 Dokumen KKP Resmi</h2>
                <p className="text-sm text-green-600">Dokumen telah ditandatangani dan siap digunakan</p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-white border border-green-200 rounded-xl">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Nomor Surat:</span>
                    </div>
                    <p className="p-2 font-mono text-sm border rounded bg-green-50">{approvedDocument.no_surat}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-800">Program Studi:</span>
                    </div>
                    <p className="p-2 text-sm border rounded bg-green-50">{approvedDocument.prodi}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  className="flex-1 text-white transition-all bg-green-600 shadow-lg hover:bg-green-700 hover:shadow-xl"
                  onClick={() => window.open(approvedDocument.downloadUrl, '_blank')}
                >
                  <FileCheck className="w-4 h-4 mr-2" />
                  Download Dokumen Resmi (.docx)
                </Button>

                <Button
                  variant="outline"
                  className="flex-1 text-green-700 border-green-300 hover:bg-green-50"
                  onClick={() => router.push("/dashboard/mahasiswa/kkp/documents")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Lihat Semua Dokumen
                </Button>
              </div>

              <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-green-600 mt-0.5" />
                  <div className="text-xs text-green-700">
                    <p className="mb-1 font-semibold">Catatan Penting:</p>
                    <ul className="space-y-1">
                      <li>• Dokumen ini telah ditandatangani secara digital oleh Wakil Dekan 1</li>
                      <li>• Gunakan dokumen ini sebagai surat pengantar resmi ke tempat KKP</li>
                      <li>• Simpan salinan dokumen untuk keperluan administrasi</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
