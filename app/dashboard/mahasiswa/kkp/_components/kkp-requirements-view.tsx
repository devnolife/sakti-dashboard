"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Upload,
  AlertCircle,
  BookOpen,
  Users,
  MapPin,
  CalendarDays,
  FileCheck,
  ArrowRight,
  Info,
  Building2,
  ClipboardList,
  HelpCircle,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Requirement {
  id: string
  title: string
  description: string
  type: string
  status: "completed" | "pending" | "rejected"
  uploadedAt?: Date
  notes?: string
}

interface KkpLocation {
  id: string
  name: string
  city: string
  province: string
  type: string
  available_slots?: number
}

interface KkpRequirementsViewProps {
  requirements: Requirement[]
  onUpload?: (requirementId: string) => void
}

export function KkpRequirementsView({ requirements, onUpload }: KkpRequirementsViewProps) {
  const completedCount = requirements.filter(r => r.status === "completed").length
  const totalCount = requirements.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const allCompleted = completedCount === totalCount
  const hasNoRequirements = requirements.length === 0

  // State for KKP locations
  const [kkpLocations, setKkpLocations] = useState<KkpLocation[]>([])
  const [loadingLocations, setLoadingLocations] = useState(true)

  // Fetch KKP locations
  useEffect(() => {
    const fetchKkpLocations = async () => {
      try {
        const response = await fetch('/api/kkp/locations')
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            // Transform API response to match component interface
            const transformed = result.data.map((loc: any) => ({
              id: loc.id,
              name: loc.name,
              city: loc.city || 'N/A',
              province: loc.province || 'N/A',
              type: loc.industry || 'Perusahaan',
              available_slots: loc.remaining || 0,
            }))
            setKkpLocations(transformed)
          }
        }
      } catch (error) {
        console.error('Error fetching KKP locations:', error)
      } finally {
        setLoadingLocations(false)
      }
    }

    fetchKkpLocations()
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "pending":
      default:
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Belum Selesai
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {hasNoRequirements ? "Dashboard KKP" : "Persyaratan KKP"}
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            {hasNoRequirements
              ? "Informasi lengkap tentang Kuliah Kerja Praktik (KKP)"
              : "Lengkapi semua persyaratan di bawah ini untuk dapat mendaftar KKP"
            }
          </p>
        </div>
      </div>

      {/* No Requirements Message */}
      {hasNoRequirements && (
        <Card className="border-amber-200 bg-amber-50/50 shadow-lg">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 rounded-full">
                <AlertCircle className="w-8 h-8 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Persyaratan Belum di Update</h3>
                <p className="text-muted-foreground">
                  Persyaratan KKP untuk program studi Anda belum dikonfigurasi oleh admin.
                  Namun, Anda tetap bisa melihat informasi penting tentang KKP di bawah ini.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informasi Tentang KKP - Always Visible */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Apa itu Kuliah Kerja Praktik (KKP)?</h2>
              <p className="text-sm text-muted-foreground">
                Informasi lengkap tentang program KKP
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Pengertian KKP
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kuliah Kerja Praktik (KKP) adalah kegiatan intrakurikuler yang dilaksanakan oleh mahasiswa
                dalam bentuk pengabdian kepada masyarakat dan pembelajaran di dunia kerja nyata. KKP bertujuan
                untuk memberikan pengalaman praktis kepada mahasiswa dalam menerapkan ilmu yang telah dipelajari
                di bangku kuliah ke dalam dunia kerja yang sesungguhnya.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-primary/5">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Tujuan KKP
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Mengaplikasikan teori ke praktik di lapangan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Meningkatkan soft skills dan hard skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Membangun jaringan profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Mempersiapkan diri memasuki dunia kerja</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg bg-secondary/5">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-secondary" />
                  Manfaat KKP
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Pengalaman kerja yang berharga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Sertifikat dari perusahaan/instansi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Peluang karir di masa depan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Memenuhi syarat kelulusan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lokasi KKP Tersedia - Always Visible */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Lokasi KKP Tersedia</h2>
              <p className="text-sm text-muted-foreground">
                Pilihan tempat pelaksanaan KKP untuk mahasiswa
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          {loadingLocations ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-muted-foreground">Memuat lokasi KKP...</span>
            </div>
          ) : kkpLocations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {kkpLocations.map((location) => (
                <div
                  key={location.id}
                  className="p-4 border rounded-lg hover:border-primary/50 transition-colors bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Building2 className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{location.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {location.city}, {location.province}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {location.type}
                        </Badge>
                        {location.available_slots && location.available_slots > 0 && (
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {location.available_slots} slot tersedia
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Building2 className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Belum Ada Lokasi Terdaftar</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Lokasi KKP akan ditampilkan di sini setelah dikonfigurasi oleh admin.
                Hubungi staff TU untuk informasi lebih lanjut.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Prosedur dan Timeline KKP - Always Visible */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <CalendarDays className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Prosedur dan Timeline KKP</h2>
              <p className="text-sm text-muted-foreground">
                Tahapan pelaksanaan KKP dari awal sampai selesai
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Persiapan dan Persyaratan",
                description: "Lengkapi semua persyaratan administrasi yang diperlukan",
                duration: "2-4 minggu sebelum KKP",
                icon: FileCheck,
                color: "blue",
              },
              {
                step: 2,
                title: "Pembentukan Kelompok",
                description: "Bentuk kelompok KKP (2-4 orang) dan pilih ketua kelompok",
                duration: "1-2 minggu sebelum KKP",
                icon: Users,
                color: "green",
              },
              {
                step: 3,
                title: "Pemilihan Lokasi",
                description: "Pilih lokasi KKP yang sesuai dengan minat dan jurusan",
                duration: "1-2 minggu sebelum KKP",
                icon: MapPin,
                color: "orange",
              },
              {
                step: 4,
                title: "Pengajuan KKP",
                description: "Submit formulir pengajuan KKP beserta dokumen pendukung",
                duration: "Setelah semua persyaratan lengkap",
                icon: FileText,
                color: "purple",
              },
              {
                step: 5,
                title: "Pelaksanaan KKP",
                description: "Laksanakan KKP sesuai jadwal dan buat laporan progres berkala",
                duration: "1-2 bulan (sesuai program)",
                icon: ClipboardList,
                color: "cyan",
              },
              {
                step: 6,
                title: "Penyelesaian dan Penilaian",
                description: "Submit laporan akhir dan dapatkan penilaian dari pembimbing",
                duration: "1-2 minggu setelah KKP",
                icon: CheckCircle2,
                color: "green",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className={`p-3 bg-${item.color}-100 rounded-full flex-shrink-0`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Tahap {item.step}
                    </Badge>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Catatan Penting</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pastikan semua persyaratan sudah lengkap sebelum mendaftar</li>
                  <li>• Koordinasi yang baik dengan anggota kelompok sangat penting</li>
                  <li>• Konsultasi rutin dengan dosen pembimbing wajib dilakukan</li>
                  <li>• Patuhi semua peraturan dan tata tertib di lokasi KKP</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      {!hasNoRequirements && (
      <Card className="border-none shadow-lg">
        <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <FileCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Progres Persyaratan</h2>
              <p className="text-sm text-muted-foreground">
                {completedCount} dari {totalCount} persyaratan telah diselesaikan
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Kelengkapan Dokumen</span>
                <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            {allCompleted ? (
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Selamat! Semua persyaratan sudah lengkap
                    </p>
                    <p className="mt-1 text-sm text-green-700">
                      Anda sudah dapat mengajukan permohonan KKP. Klik tombol di bawah untuk melanjutkan.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800">
                      Masih ada {totalCount - completedCount} persyaratan yang belum diselesaikan
                    </p>
                    <p className="mt-1 text-sm text-amber-700">
                      Harap lengkapi semua persyaratan untuk dapat mendaftar KKP.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Requirements List */}
      {!hasNoRequirements && (
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Daftar Persyaratan</CardTitle>
          <CardDescription>
            Upload dokumen-dokumen yang diperlukan untuk pendaftaran KKP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div
                key={requirement.id}
                className={`p-4 border rounded-lg transition-all ${
                  requirement.status === "completed"
                    ? "bg-green-50 border-green-200"
                    : requirement.status === "rejected"
                    ? "bg-red-50 border-red-200"
                    : "bg-white border-gray-200 hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        requirement.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : requirement.status === "rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span className="text-sm font-semibold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{requirement.title}</h3>
                        {getStatusBadge(requirement.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {requirement.description}
                      </p>
                      {requirement.uploadedAt && (
                        <p className="text-xs text-muted-foreground">
                          Diunggah pada: {requirement.uploadedAt.toLocaleDateString("id-ID")}
                        </p>
                      )}
                      {requirement.notes && requirement.status === "rejected" && (
                        <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
                          <p className="font-medium">Catatan:</p>
                          <p>{requirement.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    {requirement.status !== "completed" && (
                      <Button
                        size="sm"
                        variant={requirement.status === "rejected" ? "destructive" : "outline"}
                        onClick={() => onUpload?.(requirement.id)}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {requirement.status === "rejected" ? "Upload Ulang" : "Upload"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Call to Action */}
      {!hasNoRequirements && (
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Langkah Selanjutnya</h2>
              <p className="text-sm text-muted-foreground">
                Setelah semua persyaratan lengkap
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold">1. Bentuk Kelompok</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Cari anggota kelompok KKP (2-4 orang)
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold">2. Pilih Lokasi</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Tentukan tempat pelaksanaan KKP
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-primary/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold">3. Ajukan KKP</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Submit formulir pengajuan KKP
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/dashboard/mahasiswa/kkp/apply">
              <Button
                className="w-full shadow-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                size="lg"
                disabled={!allCompleted}
              >
                Ajukan Permohonan KKP
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            {!allCompleted && (
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Lengkapi semua persyaratan untuk dapat mengajukan KKP
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Information Section */}
      {!hasNoRequirements && (
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Informasi Penting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>
                Semua dokumen harus dalam format PDF dengan ukuran maksimal 5MB
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>
                Dokumen yang ditolak harus diupload ulang dengan perbaikan sesuai catatan
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>
                Verifikasi dokumen membutuhkan waktu 1-3 hari kerja
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              <p>
                Untuk pertanyaan lebih lanjut, hubungi staff TU Fakultas Teknik
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  )
}
