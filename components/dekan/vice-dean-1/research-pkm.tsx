"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Users, Award, FileText, Lightbulb, Target, TrendingUp, Star, Rocket } from "lucide-react"

interface Props {
  searchQuery?: string
  selectedDepartment?: string | null
}

export function ResearchPKM({ searchQuery = "", selectedDepartment = null }: Props) {
  const penelitianDosen = [
    { judul: "AI untuk Sistem Informasi", peneliti: "Dr. Ahmad", status: "Berjalan", jenis: "Hibah Nasional", tahun: "2024" },
    { judul: "Blockchain Technology", peneliti: "Prof. Siti", status: "Proposal", jenis: "Internal", tahun: "2024" },
    { judul: "IoT Smart City", peneliti: "Dr. Budi", status: "Selesai", jenis: "Internasional", tahun: "2023" },
  ]

  const pkmDosen = [
    { kegiatan: "Pelatihan IT untuk UMKM", mitra: "Koperasi Sejahtera", status: "Berjalan", luaran: "Sertifikat" },
    { kegiatan: "Sistem Informasi Desa", mitra: "Desa Makmur", status: "Selesai", luaran: "Aplikasi" },
    { kegiatan: "Workshop Coding", mitra: "SMK Teknologi", status: "Proposal", luaran: "Modul" },
  ]

  const penelitianMahasiswa = [
    { nama: "Andi Pratama", judul: "Machine Learning untuk Prediksi", jenis: "PKM-RSH", status: "Didanai" },
    { nama: "Lina Sari", judul: "Aplikasi Mobile Health", jenis: "PKM-KC", status: "Proposal" },
    { nama: "Budi Santoso", judul: "Smart Home System", jenis: "Skripsi", status: "Berjalan" },
  ]

  return (
    <div className="space-y-6">
      {/* Modern Research Overview */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Research & Innovation Hub
            </h3>
            <p className="text-sm text-blue-600">Pusat penelitian dan inovasi fakultas 🚀</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Faculty Research */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <Rocket className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  45
                </div>
                <div className="text-sm font-medium text-blue-600">🔬 Penelitian Dosen</div>
                <div className="text-xs text-gray-500">15 active • 12 proposals</div>
              </div>
            </CardContent>
          </Card>

          {/* Community Service */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <Target className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  23
                </div>
                <div className="text-sm font-medium text-green-600">🤝 PKM Dosen</div>
                <div className="text-xs text-gray-500">8 active partners</div>
              </div>
            </CardContent>
          </Card>

          {/* Student Projects */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <Star className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  32
                </div>
                <div className="text-sm font-medium text-purple-600">💡 PKM Mahasiswa</div>
                <div className="text-xs text-gray-500">18 funded projects</div>
              </div>
            </CardContent>
          </Card>

          {/* Publications */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  67
                </div>
                <div className="text-sm font-medium text-orange-600">📄 Publikasi</div>
                <div className="text-xs text-gray-500">23 SINTA • 12 Scopus</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Penelitian Dosen */}
        <Card>
          <CardHeader>
            <CardTitle>Penelitian Dosen</CardTitle>
            <CardDescription>Status penelitian yang sedang berjalan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hibah Nasional</span>
                  <span>15 penelitian</span>
                </div>
                <Progress value={60} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Internal</span>
                  <span>25 penelitian</span>
                </div>
                <Progress value={40} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Internasional</span>
                  <span>5 penelitian</span>
                </div>
                <Progress value={20} />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Peneliti</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jenis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {penelitianDosen.slice(0, 3).map((penelitian, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{penelitian.peneliti}</TableCell>
                    <TableCell>
                      <Badge variant={penelitian.status === "Berjalan" ? "default" : penelitian.status === "Selesai" ? "secondary" : "outline"}>
                        {penelitian.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{penelitian.jenis}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* PKM Dosen */}
        <Card>
          <CardHeader>
            <CardTitle>PKM Dosen</CardTitle>
            <CardDescription>Kegiatan pengabdian kepada masyarakat</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kegiatan</TableHead>
                  <TableHead>Mitra</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pkmDosen.map((pkm, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{pkm.kegiatan}</TableCell>
                    <TableCell className="text-sm">{pkm.mitra}</TableCell>
                    <TableCell>
                      <Badge variant={pkm.status === "Berjalan" ? "default" : pkm.status === "Selesai" ? "secondary" : "outline"}>
                        {pkm.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Penelitian & PKM Mahasiswa */}
      <Card>
        <CardHeader>
          <CardTitle>Penelitian & PKM Mahasiswa</CardTitle>
          <CardDescription>Program kreativitas mahasiswa dan tugas akhir</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">32</div>
              <div className="text-sm text-muted-foreground">Total PKM</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">18</div>
              <div className="text-sm text-muted-foreground">PKM Didanai</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-orange-600">156</div>
              <div className="text-sm text-muted-foreground">Skripsi/TA</div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Mahasiswa</TableHead>
                <TableHead>Judul</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {penelitianMahasiswa.map((penelitian, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{penelitian.nama}</TableCell>
                  <TableCell className="max-w-xs truncate">{penelitian.judul}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{penelitian.jenis}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={penelitian.status === "Didanai" ? "default" : penelitian.status === "Berjalan" ? "secondary" : "outline"}>
                      {penelitian.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Luaran Penelitian */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Luaran Penelitian</CardTitle>
            <CardDescription>Publikasi dan hak kekayaan intelektual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>SINTA 1-2</span>
                <span>23 artikel</span>
              </div>
              <Progress value={75} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Scopus</span>
                <span>12 artikel</span>
              </div>
              <Progress value={40} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Web of Science</span>
                <span>5 artikel</span>
              </div>
              <Progress value={20} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>HKI/Paten</span>
                <span>8 dokumen</span>
              </div>
              <Progress value={30} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Target & Pencapaian</CardTitle>
            <CardDescription>Progress terhadap target tahunan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Penelitian (Target: 50)</span>
                <span>45/50</span>
              </div>
              <Progress value={90} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>PKM (Target: 25)</span>
                <span>23/25</span>
              </div>
              <Progress value={92} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Publikasi (Target: 75)</span>
                <span>67/75</span>
              </div>
              <Progress value={89} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>PKM Mahasiswa (Target: 35)</span>
                <span>32/35</span>
              </div>
              <Progress value={91} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
