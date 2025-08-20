"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Handshake, Building, GraduationCap, Globe, AlertTriangle, Users, MapPin, Calendar, Zap } from "lucide-react"

interface Props {
  searchQuery?: string
  selectedDepartment?: string | null
}

export function Partnerships({ searchQuery = "", selectedDepartment = null }: Props) {
  const kerjasamaData = [
    {
      mitra: "Universitas Teknologi Malaysia",
      jenis: "MoU",
      kategori: "PT Luar Negeri",
      tanggalMulai: "2022-03-15",
      tanggalBerakhir: "2025-03-15",
      status: "Aktif"
    },
    {
      mitra: "PT Telkom Indonesia",
      jenis: "MoA",
      kategori: "Industri",
      tanggalMulai: "2023-06-01",
      tanggalBerakhir: "2024-12-31",
      status: "Hampir Berakhir"
    },
    {
      mitra: "Institut Teknologi Bandung",
      jenis: "MoU",
      kategori: "PT Dalam Negeri",
      tanggalMulai: "2021-09-20",
      tanggalBerakhir: "2024-09-20",
      status: "Hampir Berakhir"
    },
    {
      mitra: "Kementerian Komunikasi dan Informatika",
      jenis: "MoA",
      kategori: "Pemerintah",
      tanggalMulai: "2023-01-10",
      tanggalBerakhir: "2026-01-10",
      status: "Aktif"
    },
  ]

  const realisasiKegiatan = [
    { kegiatan: "Joint Research AI", mitra: "UTM", mahasiswa: 5, dosen: 2, outcome: "2 Paper Internasional" },
    { kegiatan: "Magang Industri", mitra: "PT Telkom", mahasiswa: 25, dosen: 1, outcome: "Sertifikat Kompetensi" },
    { kegiatan: "Student Exchange", mitra: "ITB", mahasiswa: 8, dosen: 0, outcome: "Transfer Credit" },
    { kegiatan: "Guest Lecture", mitra: "Kominfo", mahasiswa: 150, dosen: 3, outcome: "Workshop Certificate" },
  ]

  const kerjasamaAkanBerakhir = kerjasamaData.filter(item => item.status === "Hampir Berakhir")

  return (
    <div className="space-y-6">
      {/* Modern Partnership Overview */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
            <Handshake className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Partnership Overview
            </h3>
            <p className="text-sm text-purple-600">Kerjasama strategis fakultas 🤝</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Partnership */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <Handshake className="w-6 h-6 text-white" />
                </div>
                <Zap className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  18
                </div>
                <div className="text-sm font-medium text-purple-600">🤝 Total Kerjasama</div>
                <div className="text-xs text-gray-500">15 MoU • 3 MoA</div>
              </div>
            </CardContent>
          </Card>

          {/* International */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <MapPin className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  6
                </div>
                <div className="text-sm font-medium text-blue-600">🌍 PT Luar Negeri</div>
                <div className="text-xs text-gray-500">4 aktif</div>
              </div>
            </CardContent>
          </Card>

          {/* Industry */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <Users className="w-5 h-5 text-orange-500 group-hover:text-orange-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  8
                </div>
                <div className="text-sm font-medium text-orange-600">🏭 Industri</div>
                <div className="text-xs text-gray-500">7 aktif</div>
              </div>
            </CardContent>
          </Card>

          {/* Domestic Universities */}
          <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <Calendar className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  4
                </div>
                <div className="text-sm font-medium text-green-600">🎓 PT Dalam Negeri</div>
                <div className="text-xs text-gray-500">3 aktif</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modern Alert for Expiring Partnerships */}
      {kerjasamaAkanBerakhir.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Urgent Alert ⚠️
              </h3>
              <p className="text-sm text-orange-600">{kerjasamaAkanBerakhir.length} partnerships expiring soon</p>
            </div>
          </div>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardContent className="p-6">
              <div className="space-y-3">
                {kerjasamaAkanBerakhir.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-orange-100 dark:border-orange-900/20">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">{item.mitra}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.kategori} • {item.jenis}</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      📅 {item.tanggalBerakhir}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Dokumen Kerjasama */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dokumen Kerjasama</CardTitle>
            <CardDescription>Status dan detail kerjasama aktif</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mitra</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Mulai</TableHead>
                  <TableHead>Berakhir</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kerjasamaData.map((kerjasama, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{kerjasama.mitra}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{kerjasama.jenis}</Badge>
                    </TableCell>
                    <TableCell>{kerjasama.kategori}</TableCell>
                    <TableCell>{kerjasama.tanggalMulai}</TableCell>
                    <TableCell>{kerjasama.tanggalBerakhir}</TableCell>
                    <TableCell>
                      <Badge variant={kerjasama.status === "Aktif" ? "default" : "destructive"}>
                        {kerjasama.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Distribusi Mitra */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Mitra</CardTitle>
            <CardDescription>Proporsi jenis mitra kerjasama</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Industri</span>
                <span>8 (44%)</span>
              </div>
              <Progress value={44} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>PT Luar Negeri</span>
                <span>6 (33%)</span>
              </div>
              <Progress value={33} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>PT Dalam Negeri</span>
                <span>4 (22%)</span>
              </div>
              <Progress value={22} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Pemerintah</span>
                <span>1 (6%)</span>
              </div>
              <Progress value={6} />
            </div>
          </CardContent>
        </Card>

        {/* Realisasi Kegiatan */}
        <Card>
          <CardHeader>
            <CardTitle>Realisasi Kegiatan</CardTitle>
            <CardDescription>Kegiatan yang telah dilaksanakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">188</div>
                  <div className="text-sm text-muted-foreground">Mahasiswa Terlibat</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">6</div>
                  <div className="text-sm text-muted-foreground">Dosen Terlibat</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-muted-foreground">Kegiatan Aktif</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail Realisasi Kegiatan */}
      <Card>
        <CardHeader>
          <CardTitle>Detail Realisasi Kegiatan</CardTitle>
          <CardDescription>Kegiatan kerjasama yang telah terlaksana</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kegiatan</TableHead>
                <TableHead>Mitra</TableHead>
                <TableHead>Mahasiswa</TableHead>
                <TableHead>Dosen</TableHead>
                <TableHead>Outcome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {realisasiKegiatan.map((kegiatan, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{kegiatan.kegiatan}</TableCell>
                  <TableCell>{kegiatan.mitra}</TableCell>
                  <TableCell className="text-center">{kegiatan.mahasiswa}</TableCell>
                  <TableCell className="text-center">{kegiatan.dosen}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{kegiatan.outcome}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
