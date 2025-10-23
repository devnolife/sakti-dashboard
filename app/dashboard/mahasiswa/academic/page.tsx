'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BookOpen, Calendar, FileText, Clock, Star, TrendingUp, Loader2, Users, Mail, Phone, Building } from "lucide-react"
import Link from "next/link"

interface Lecturer {
  id: string
  name: string
  nip: string
  position: string
  department: string
  email: string | null
  phone: string | null
  office: string | null
  expertise: string[]
}

interface AcademicData {
  student: {
    id: string
    name: string
    nim: string
    major: string
    department: string
    semester: number
    academicYear: string
    gpa: number | null
    status: string
  }
  academicAdvisor: {
    id: string
    name: string
    nip: string
    position: string
    department: string
    phone: string | null
    office: string | null
  } | null
  consultations: {
    id: string
    date: Date | string
    uraian: string
    keterangan: string
    paraf: boolean
    no: number
  }[]
  academicProgress: {
    totalCredits: number
    completedCredits: number
    requiredCredits: number
    progressPercentage: number
    requiredCoursesProgress: number
    electiveCoursesProgress: number
  }
  currentSemesterStats: {
    courses: number
    credits: number
    gpa: number | null
  }
}

export default function AcademicOverviewPage() {
  const [academicData, setAcademicData] = useState<AcademicData | null>(null)
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingLecturers, setLoadingLecturers] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('/api/student/academic')

        if (!response.ok) {
          throw new Error(`Failed to fetch academic data: ${response.status}`)
        }

        const data = await response.json()
        setAcademicData(data)
      } catch (error) {
        console.error('Error fetching academic data:', error)
        setError(error instanceof Error ? error.message : 'Failed to load academic data')
      } finally {
        setLoading(false)
      }
    }

    fetchAcademicData()
  }, [])

  const fetchLecturers = async () => {
    try {
      setLoadingLecturers(true)
      // TODO: Ganti dengan endpoint yang sesuai
      const response = await fetch('/api/lecturers')

      if (!response.ok) {
        throw new Error(`Failed to fetch lecturers: ${response.status}`)
      }

      const data = await response.json()
      setLecturers(data)
    } catch (error) {
      console.error('Error fetching lecturers:', error)
      // Set data dummy untuk sementara jika API belum ada
      setLecturers([
        {
          id: '1',
          name: 'Dr. John Doe, S.T., M.T.',
          nip: '197001011995031001',
          position: 'Lektor Kepala',
          department: 'Teknik Informatika',
          email: 'john.doe@university.ac.id',
          phone: '081234567890',
          office: 'Gedung A Lt. 3 R. 301',
          expertise: ['Artificial Intelligence', 'Machine Learning', 'Data Science']
        },
        {
          id: '2',
          name: 'Prof. Dr. Jane Smith, S.Kom., M.Sc.',
          nip: '196805151990032002',
          position: 'Guru Besar',
          department: 'Teknik Informatika',
          email: 'jane.smith@university.ac.id',
          phone: '081234567891',
          office: 'Gedung A Lt. 3 R. 302',
          expertise: ['Software Engineering', 'Web Development', 'Mobile Programming']
        }
      ])
    } finally {
      setLoadingLecturers(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto mb-4 animate-spin" />
          <p className="text-muted-foreground">Memuat data akademik...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 text-6xl">⚠️</div>
          <h3 className="mb-2 text-xl font-semibold">Gagal memuat data akademik</h3>
          <p className="mb-4 text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()}>Coba Lagi</Button>
        </div>
      </div>
    )
  }

  if (!academicData) {
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <div className="p-6 text-white shadow-sm bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
        <h1 className="mb-2 text-2xl font-bold">Ringkasan Akademik</h1>
        <p className="text-blue-100">Pantau progres dan pencapaian akademik Anda</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">IPK Saat Ini</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicData.student.gpa?.toFixed(2) || 'N/A'}</div>
            <p className="mt-1 text-xs text-muted-foreground">Semester {academicData.student.semester}</p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total SKS</CardTitle>
              <BookOpen className="w-4 h-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicData.academicProgress.totalCredits}</div>
            <p className="mt-1 text-xs text-muted-foreground">dari {academicData.academicProgress.requiredCredits} dibutuhkan</p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Konsultasi</CardTitle>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academicData.consultations.filter(c => c.paraf).length}/{academicData.consultations.length}</div>
            <p className="mt-1 text-xs text-muted-foreground">Selesai semester ini</p>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{academicData.student.status}</div>
            <p className="mt-1 text-xs text-muted-foreground">{academicData.student.academicYear}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview" className="gap-2">
            <Star className="w-4 h-4" />
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="w-4 h-4" />
            Dokumen
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Calendar className="w-4 h-4" />
            Jadwal
          </TabsTrigger>
          <TabsTrigger value="lecturers" className="gap-2" onClick={() => {
            if (lecturers.length === 0) {
              fetchLecturers()
            }
          }}>
            <Users className="w-4 h-4" />
            Dosen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 text-blue-600 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Academic Progress</CardTitle>
                  <CardDescription>Your journey towards graduation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Progres Keseluruhan</span>
                  <span className="text-muted-foreground">{academicData.academicProgress.progressPercentage}%</span>
                </div>
                <Progress value={academicData.academicProgress.progressPercentage} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Mata Kuliah Wajib</span>
                  <span className="text-muted-foreground">{academicData.academicProgress.requiredCoursesProgress}%</span>
                </div>
                <Progress value={academicData.academicProgress.requiredCoursesProgress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Mata Kuliah Pilihan</span>
                  <span className="text-muted-foreground">{academicData.academicProgress.electiveCoursesProgress}%</span>
                </div>
                <Progress value={academicData.academicProgress.electiveCoursesProgress} className="h-2" />
              </div>

              <div className="pt-4 border-t">
                <Link href="/dashboard/mahasiswa/academic/control-card">
                  <Button className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Kartu Kendali
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 text-green-600 bg-green-100 rounded-lg">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Konsultasi Terbaru</CardTitle>
                  <CardDescription>Pertemuan dengan dosen pembimbing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {academicData.consultations.slice(0, 3).map((consultation) => (
                  <div key={consultation.id} className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{consultation.uraian}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(consultation.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${consultation.paraf
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                        }`}>
                        {consultation.paraf ? 'Disetujui' : 'Menunggu'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{consultation.keterangan}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 text-orange-600 bg-orange-100 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Dokumen Akademik</CardTitle>
                  <CardDescription>Semua dokumen penting Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kartu Hasil Studi (KHS)</p>
                      <p className="text-sm text-muted-foreground">Semester 6 - Genap 2022/2023</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Unduh
                    </Button>
                  </div>
                </div>

                <div className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kartu Rencana Studi (KRS)</p>
                      <p className="text-sm text-muted-foreground">Semester 7 - Ganjil 2023/2024</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Unduh
                    </Button>
                  </div>
                </div>

                <div className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transkrip Nilai</p>
                      <p className="text-sm text-muted-foreground">Terakhir diperbarui: 15 September 2023</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Unduh
                    </Button>
                  </div>
                </div>

                <div className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kartu Kendali Akademik</p>
                      <p className="text-sm text-muted-foreground">Semester 7 - Ganjil 2023/2024</p>
                    </div>
                    <Link href="/dashboard/mahasiswa/academic/control-card">
                      <Button size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Lihat
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 text-purple-600 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Jadwal Konsultasi</CardTitle>
                  <CardDescription>Pertemuan mendatang dengan dosen pembimbing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {academicData.consultations.filter(c => !c.paraf).slice(0, 2).map((consultation) => (
                  <div key={consultation.id} className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{consultation.uraian}</p>
                        <p className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {new Date(consultation.date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })} - 10:00 WIB
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                        Terjadwal
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ruang Fakultas Lantai 3 - {academicData.academicAdvisor?.name || 'Dosen Pembimbing Akademik'}
                    </p>
                  </div>
                ))}

                {academicData.consultations.filter(c => !c.paraf).length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">Tidak ada konsultasi yang dijadwalkan</p>
                  </div>
                )}

                <div className="pt-4">
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Jadwalkan Pertemuan Baru
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lecturers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 text-indigo-600 bg-indigo-100 rounded-lg">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Daftar Dosen</CardTitle>
                  <CardDescription>Dosen pengajar di program studi Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingLecturers ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : lecturers.length === 0 ? (
                <div className="py-8 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="mb-4 text-muted-foreground">Belum ada data dosen</p>
                  <Button onClick={fetchLecturers} variant="outline">
                    Muat Data Dosen
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {lecturers.map((lecturer) => (
                    <div key={lecturer.id} className="p-4 transition-colors border rounded-lg hover:bg-muted/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{lecturer.name}</h3>
                          <p className="text-sm text-muted-foreground">NIP: {lecturer.nip}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded">
                              {lecturer.position}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-100 rounded">
                              {lecturer.department}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3 space-y-2">
                        {lecturer.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${lecturer.email}`} className="hover:text-primary hover:underline">
                              {lecturer.email}
                            </a>
                          </div>
                        )}
                        {lecturer.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${lecturer.phone}`} className="hover:text-primary hover:underline">
                              {lecturer.phone}
                            </a>
                          </div>
                        )}
                        {lecturer.office && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building className="w-4 h-4" />
                            <span>{lecturer.office}</span>
                          </div>
                        )}
                      </div>

                      {lecturer.expertise && lecturer.expertise.length > 0 && (
                        <div>
                          <p className="mb-2 text-sm font-medium">Bidang Keahlian:</p>
                          <div className="flex flex-wrap gap-2">
                            {lecturer.expertise.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
