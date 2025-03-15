"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Calendar, FileText, CheckCircle2, Clock, AlertCircle, ChevronRight } from "lucide-react"

export default function ProdiExamRoleDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Peran Ketua Program Studi dalam Ujian
          </span>
        </h2>
        <p className="mt-2 text-muted-foreground">
          Tanggung jawab dan tugas Ketua Program Studi dalam proses ujian mahasiswa
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Role Cards */}
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Persetujuan Ujian</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-sm">
              <p>Menyetujui pengajuan ujian proposal, hasil, dan sidang mahasiswa</p>
              <div className="flex items-center mt-3">
                <Badge className="bg-amber-500/10 text-amber-500">
                  <Clock className="h-3.5 w-3.5 mr-1" />8 Menunggu Persetujuan
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Penunjukan Dosen Penguji</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10">
              <Users className="w-4 h-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-sm">
              <p>Menentukan dosen penguji yang sesuai dengan topik skripsi mahasiswa</p>
              <div className="flex items-center mt-3">
                <Badge className="text-blue-500 bg-blue-500/10">
                  <AlertCircle className="h-3.5 w-3.5 mr-1" />
                  12 Perlu Ditentukan
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Penjadwalan Ujian</CardTitle>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
              <Calendar className="w-4 h-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-2 text-sm">
              <p>Menyetujui jadwal ujian dan memastikan ketersediaan ruangan dan dosen</p>
              <div className="flex items-center mt-3">
                <Badge className="text-green-500 bg-green-500/10">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />5 Jadwal Disetujui
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="responsibilities">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="responsibilities">Tanggung Jawab</TabsTrigger>
          <TabsTrigger value="workflow">Alur Kerja</TabsTrigger>
          <TabsTrigger value="guidelines">Pedoman</TabsTrigger>
        </TabsList>

        <TabsContent value="responsibilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tanggung Jawab Utama</CardTitle>
              <CardDescription>Peran dan tanggung jawab Ketua Program Studi dalam proses ujian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Persetujuan Pengajuan Ujian</p>
                  <p className="text-xs text-muted-foreground">
                    Memeriksa dan menyetujui pengajuan ujian proposal, hasil, dan sidang dari mahasiswa berdasarkan
                    kelengkapan persyaratan akademik.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 shrink-0">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Penunjukan Dosen Pembimbing dan Penguji</p>
                  <p className="text-xs text-muted-foreground">
                    Menentukan dosen pembimbing dan penguji yang sesuai dengan bidang keahlian dan topik skripsi
                    mahasiswa.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 shrink-0">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Koordinasi Jadwal Ujian</p>
                  <p className="text-xs text-muted-foreground">
                    Mengkoordinasikan jadwal ujian dengan mempertimbangkan ketersediaan dosen penguji, ruangan, dan
                    periode akademik.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 shrink-0">
                  <FileText className="w-5 h-5 text-blue-500" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Evaluasi Kualitas Skripsi</p>
                  <p className="text-xs text-muted-foreground">
                    Memastikan kualitas skripsi mahasiswa sesuai dengan standar akademik program studi dan memberikan
                    rekomendasi perbaikan jika diperlukan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border rounded-xl">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 shrink-0">
                  <GraduationCap className="w-5 h-5 text-green-500" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Pengembangan Kebijakan Ujian</p>
                  <p className="text-xs text-muted-foreground">
                    Mengembangkan dan memperbarui kebijakan dan prosedur ujian untuk memastikan kualitas dan keselarasan
                    dengan visi program studi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alur Kerja Persetujuan Ujian</CardTitle>
              <CardDescription>Proses persetujuan ujian oleh Ketua Program Studi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative pb-8 pl-8 border-l-2 border-muted">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                <div className="mb-2">
                  <p className="text-sm font-medium">1. Pengajuan oleh Mahasiswa</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Mahasiswa mengajukan permohonan ujian melalui sistem dengan melampirkan dokumen yang diperlukan.
                  </p>
                </div>
              </div>

              <div className="relative pb-8 pl-8 border-l-2 border-muted">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                <div className="mb-2">
                  <p className="text-sm font-medium">2. Verifikasi oleh Admin Prodi</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Admin Prodi memverifikasi kelengkapan dokumen dan persyaratan administratif.
                  </p>
                </div>
              </div>

              <div className="relative pb-8 pl-8 border-l-2 border-muted">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                <div className="mb-2">
                  <p className="text-sm font-medium">3. Persetujuan Ketua Program Studi</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ketua Program Studi memeriksa dan menyetujui pengajuan berdasarkan kelayakan akademik.
                  </p>
                </div>
              </div>

              <div className="relative pb-8 pl-8 border-l-2 border-muted">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                <div className="mb-2">
                  <p className="text-sm font-medium">4. Penunjukan Dosen Penguji</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Ketua Program Studi menunjuk dosen penguji yang sesuai dengan topik skripsi.
                  </p>
                </div>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-muted"></div>
                <div className="mb-2">
                  <p className="text-sm font-medium">5. Penjadwalan Ujian</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Admin Prodi menjadwalkan ujian berdasarkan ketersediaan dosen penguji dan ruangan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pedoman Persetujuan Ujian</CardTitle>
              <CardDescription>Kriteria dan pertimbangan dalam menyetujui pengajuan ujian</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 space-y-3 border rounded-lg">
                <p className="text-sm font-medium">Kriteria Persetujuan Ujian Proposal</p>
                <ul className="pl-5 space-y-1 text-xs list-disc text-muted-foreground">
                  <li>Mahasiswa telah menyelesaikan minimal 100 SKS</li>
                  <li>Proposal telah disetujui oleh dosen pembimbing</li>
                  <li>Topik penelitian sesuai dengan bidang keilmuan program studi</li>
                  <li>Metodologi penelitian yang digunakan sesuai dengan standar akademik</li>
                  <li>Mahasiswa telah mengikuti seminar proposal minimal 5 kali</li>
                </ul>
              </div>

              <div className="p-4 space-y-3 border rounded-lg">
                <p className="text-sm font-medium">Kriteria Persetujuan Ujian Hasil</p>
                <ul className="pl-5 space-y-1 text-xs list-disc text-muted-foreground">
                  <li>Mahasiswa telah lulus ujian proposal</li>
                  <li>Penelitian telah dilaksanakan sesuai dengan proposal</li>
                  <li>Hasil penelitian telah disetujui oleh dosen pembimbing</li>
                  <li>Mahasiswa telah menyelesaikan minimal 75% dari keseluruhan skripsi</li>
                  <li>Mahasiswa telah mengikuti seminar hasil minimal 3 kali</li>
                </ul>
              </div>

              <div className="p-4 space-y-3 border rounded-lg">
                <p className="text-sm font-medium">Kriteria Persetujuan Ujian Sidang</p>
                <ul className="pl-5 space-y-1 text-xs list-disc text-muted-foreground">
                  <li>Mahasiswa telah lulus ujian hasil</li>
                  <li>Skripsi telah disetujui oleh dosen pembimbing</li>
                  <li>Mahasiswa telah menyelesaikan seluruh revisi dari ujian hasil</li>
                  <li>Mahasiswa telah menyelesaikan seluruh kewajiban akademik</li>
                  <li>Mahasiswa telah lulus uji plagiarisme dengan similarity index maksimal 20%</li>
                </ul>
              </div>

              <div className="p-4 space-y-3 border rounded-lg">
                <p className="text-sm font-medium">Pertimbangan Penunjukan Dosen Penguji</p>
                <ul className="pl-5 space-y-1 text-xs list-disc text-muted-foreground">
                  <li>Kesesuaian bidang keahlian dosen dengan topik skripsi</li>
                  <li>Beban kerja dosen dalam membimbing dan menguji</li>
                  <li>Ketersediaan dosen pada periode ujian</li>
                  <li>Distribusi penugasan yang merata di antara dosen program studi</li>
                  <li>Pengalaman dosen dalam topik penelitian terkait</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="outline" className="mr-2">
          Lihat Pedoman Lengkap
        </Button>
        <Button>
          Lihat Pengajuan Ujian
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

