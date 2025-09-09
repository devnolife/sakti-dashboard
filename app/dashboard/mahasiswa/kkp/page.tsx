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
import type { KkpApplication } from "@/types/kkp"
import { getAllKkpApplications } from "@/app/actions/kkp-management"
import Link from "next/link"

export default function StudentKkpDashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true when component mounts (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // In a real app, this would only fetch applications for the current student
        const data = await getAllKkpApplications()

        // Filter to only show applications for the current student (mock)
        // In a real app, the API would handle this filtering
        const studentApplications = data.filter((app) => app.student.nim === "1234567890")

        setApplications(studentApplications)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to fetch KKP applications",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    // Only run on the client side
    if (isMounted) {
      fetchApplications()
    }
  }, [toast, isMounted])

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Peninjauan
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-200 bg-blue-500/10">
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
            Sedang Berlangsung
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-purple-500 border-purple-200 bg-purple-500/10">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      default:
        return null
    }
  }

  // Only render content on the client side to prevent server errors
  if (!isMounted) {
    return null; // Return empty during server-side rendering
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              DashboardKKP
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

      {/* Current Application Status - Enhanced Modern UI */}
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
              <Button className="w-full mt-4 text-red-700 bg-white border border-red-200 shadow-sm hover:bg-red-50">
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

      {/* Process Timeline Section - Modernized UI */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Alur Proses KKP</h2>
              <p className="text-sm text-muted-foreground">Pantau perjalanan Anda melalui program KKP</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="relative">
            {/* Modern timeline with animation effects */}
            <div className="space-y-0">
              {/* Step 1 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-green-600 transition-transform bg-green-100 border border-green-200 rounded-full shadow-sm group-hover:scale-110">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div className="w-px h-full mt-2 bg-gradient-to-b from-green-500 to-green-300"></div>
                </div>
                <div className="pt-1 pb-8 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Pendaftaran & Pembentukan Kelompok</h3>
                    <Badge className="ml-3 text-green-700 bg-green-100 border-green-200 hover:bg-green-200">
                      Selesai
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Lengkapi pendaftaran individu, bentuk kelompok 2-4 mahasiswa, dan kirimkan formulir pendaftaran kelompok.
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    <span>Selesai pada 10 Oktober 2023</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-green-600 transition-transform bg-green-100 border border-green-200 rounded-full shadow-sm group-hover:scale-110">
                    <Building className="w-5 h-5" />
                  </div>
                  <div className="w-px h-full mt-2 bg-gradient-to-b from-green-300 to-yellow-300"></div>
                </div>
                <div className="pt-1 pb-8 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Pemilihan Lokasi & Persetujuan</h3>
                    <Badge className="ml-3 text-green-700 bg-green-100 border-green-200 hover:bg-green-200">
                      Selesai
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Pilih dari lokasi yang disetujui atau ajukan lokasi baru, kirimkan dokumentasi yang diperlukan untuk
                    persetujuan.
                  </p>
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" />
                    <span>Selesai pada 15 Oktober 2023</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-yellow-600 transition-transform bg-yellow-100 border border-yellow-200 rounded-full shadow-sm group-hover:scale-110 animate-pulse">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="w-px h-full mt-2 bg-gradient-to-b from-yellow-300 to-gray-300"></div>
                </div>
                <div className="pt-1 pb-8 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Penugasan Pembimbing</h3>
                    <Badge className="ml-3 text-yellow-700 bg-yellow-100 border-yellow-200 hover:bg-yellow-200">
                      Dalam Proses
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Pembimbing fakultas ditugaskan ke setiap kelompok, pertemuan konsultasi awal dijadwalkan.
                  </p>
                  <div className="flex items-center text-xs text-yellow-600">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Perkiraan selesai pada 25 Oktober 2023</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-gray-500 transition-transform bg-gray-100 border border-gray-200 rounded-full shadow-sm group-hover:scale-110">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="w-px h-full mt-2 bg-gray-200"></div>
                </div>
                <div className="pt-1 pb-8 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Pelaksanaan KKP</h3>
                    <Badge className="ml-3 text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200">
                      Belum Dimulai
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Lengkapi jam yang diperlukan di lokasi yang disetujui, ikuti pertemuan bimbingan rutin, kirimkan
                    laporan progres.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Dijadwalkan 1 November 2023 - 31 Januari 2024</span>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-gray-500 transition-transform bg-gray-100 border border-gray-200 rounded-full shadow-sm group-hover:scale-110">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div className="w-px h-full mt-2 bg-gray-200"></div>
                </div>
                <div className="pt-1 pb-8 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Pengumpulan Laporan Akhir</h3>
                    <Badge className="ml-3 text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200">
                      Belum Dimulai
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Siapkan dan kirimkan laporan akhir komprehensif yang mendokumentasikan kegiatan KKP, hasil pembelajaran, dan
                    pencapaian.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Tenggat waktu 7 Februari 2024</span>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-gray-500 transition-transform bg-gray-100 border border-gray-200 rounded-full shadow-sm group-hover:scale-110">
                    <PresentationIcon className="w-5 h-5" />
                  </div>
                  <div className="w-px h-full mt-2 bg-gray-200"></div>
                </div>
                <div className="pt-1 pb-8 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Presentasi Akhir</h3>
                    <Badge className="ml-3 text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200">
                      Belum Dimulai
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Presentasikan pengalaman dan hasil KKP kepada panel fakultas, tanggapi pertanyaan tentang pembelajaran dan
                    aplikasi.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Dijadwalkan 10-15 Februari 2024</span>
                  </div>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex group">
                <div className="flex flex-col items-center mr-4">
                  <div className="z-10 flex items-center justify-center w-10 h-10 text-gray-500 transition-transform bg-gray-100 border border-gray-200 rounded-full shadow-sm group-hover:scale-110">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <div className="pt-1 transition-transform group-hover:translate-x-1">
                  <div className="flex items-center mb-1">
                    <h3 className="text-lg font-semibold">Evaluasi & Penilaian</h3>
                    <Badge className="ml-3 text-gray-700 bg-gray-100 border-gray-200 hover:bg-gray-200">
                      Belum Dimulai
                    </Badge>
                  </div>
                  <p className="mb-2 text-muted-foreground">
                    Evaluasi akhir oleh pembimbing fakultas dan mentor industri, pemberian nilai dan penyediaan umpan balik.
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>Diharapkan pada 28 Februari 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KKP Information Section - Modernized UI */}
      <Card className="overflow-hidden border-none shadow-lg">
        <div className="p-6 bg-gradient-to-r from-secondary/10 to-primary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Info className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Informasi KKP</h2>
              <p className="text-sm text-muted-foreground">Informasi penting tentang program KKP</p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="p-5 transition-shadow bg-primary/5 rounded-xl hover:shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Apa itu KKP?</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Kuliah Kerja Profesi (KKP) adalah program magang profesional yang dirancang untuk memberikan mahasiswa
                  pengalaman nyata di bidang studi mereka. Program ini menggabungkan pembelajaran akademik dengan
                  aplikasi praktis dalam lingkungan profesional, memungkinkan mahasiswa mengembangkan keterampilan yang relevan
                  dengan industri dan membangun jaringan profesional.
                </p>
              </div>

              <div className="p-5 transition-shadow bg-secondary/5 rounded-xl hover:shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">Komposisi Kelompok</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Setiap kelompok KKP harus terdiri dari 2 hingga 4 anggota. Ukuran ini memungkinkan kolaborasi yang efektif
                  sambil memastikan setiap anggota memiliki tanggung jawab dan peluang pembelajaran yang signifikan. Kelompok
                  dengan kurang dari 2 atau lebih dari 4 anggota memerlukan persetujuan khusus dari koordinator KKP.
                </p>
              </div>
            </div>

            <div>
              <div className="p-5 transition-shadow bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl hover:shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <CalendarDays className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Jadwal Pelaksanaan</h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                        <span className="font-semibold text-primary">1</span>
                      </div>
                      <h4 className="font-medium">Semester Ganjil</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KKP dapat dilaksanakan selama Semester Ganjil mulai dari Semester 7. Periode pelaksanaan
                      biasanya berlangsung dari Agustus hingga Januari. Pendaftaran KKP Semester Ganjil dibuka pada Mei dan ditutup
                      pada Juli.
                    </p>
                  </div>

                  <div className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
                        <span className="font-semibold text-secondary">2</span>
                      </div>
                      <h4 className="font-medium">Semester Genap</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      KKP dapat dilaksanakan selama Semester Genap mulai dari Semester 8. Periode pelaksanaan
                      biasanya berlangsung dari Februari hingga Juli. Pendaftaran KKP Semester Genap dibuka pada November dan
                      ditutup pada Januari.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button variant="outline" className="transition-shadow bg-white shadow-sm hover:shadow-md" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/plus">
                      <Award className="w-4 h-4 mr-2" />
                      Program KKP Plus
                      <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
                    </Link>
                  </Button>

                  <Button variant="outline" className="transition-shadow bg-white shadow-sm hover:shadow-md" asChild>
                    <Link href="/dashboard/mahasiswa/kkp/faq">
                      <Info className="w-4 h-4 mr-2" />
                      KKP FAQ
                      <ExternalLink className="w-3 h-3 ml-2 opacity-70" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application History */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Pengajuan</CardTitle>
          <CardDescription>Pengajuan KKP Anda sebelumnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>ID</div>
              <div>Lokasi</div>
              <div>Periode</div>
              <div>Status</div>
              <div>Aksi</div>
            </div>
            <div className="divide-y">
              <div className="grid items-center grid-cols-5 p-4">
                <div className="text-sm">KKP-2022-0018</div>
                <div className="text-sm">PT Solusi Digital</div>
                <div className="text-sm">Jul - Des 2022</div>
                <div>
                  <Badge variant="outline" className="text-red-700 border-red-200 bg-red-50">
                    Ditolak
                  </Badge>
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    Lihat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border shadow-md md:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle>Akses Cepat</CardTitle>
            <CardDescription>Tautan langsung ke fitur KKP utama dan sumber daya</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <Button variant="outline" className="justify-start h-auto p-4" onClick={() => router.push("/dashboard/mahasiswa/kkp/locations")}>
                <div className="flex flex-col items-start gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Lokasi KKP</p>
                    <p className="text-xs text-muted-foreground">Jelajahi lokasi tempat KKP yang tersedia</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4" onClick={() => router.push("/dashboard/mahasiswa/kkp/documents")}>
                <div className="flex flex-col items-start gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Dokumen</p>
                    <p className="text-xs text-muted-foreground">Akses dan kelola semua dokumen KKP Anda</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4" onClick={() => router.push("/dashboard/mahasiswa/kkp/supervisors")}>
                <div className="flex flex-col items-start gap-2">
                  <UserCheck className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Pembimbing</p>
                    <p className="text-xs text-muted-foreground">Lihat informasi dosen pembimbing KKP</p>
                  </div>
                </div>
              </Button>

              <Button variant="outline" className="justify-start h-auto p-4" onClick={() => router.push("/dashboard/mahasiswa/kkp/info")}>
                <div className="flex flex-col items-start gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium">Panduan KKP</p>
                    <p className="text-xs text-muted-foreground">Baca panduan resmi tentang proses KKP</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

