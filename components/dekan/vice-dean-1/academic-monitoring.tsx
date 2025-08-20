"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, BookOpen, Users, TrendingUp, Calendar, CheckCircle, Clock, Zap } from "lucide-react"

interface Props {
  searchQuery?: string
  selectedDepartment?: string | null
}

export function AcademicMonitoring({ searchQuery = "", selectedDepartment = null }: Props) {
  const prodiData = [
    { nama: "Teknik Pengairan", akreditasi: "A", tanggalBerakhir: "2025-12-31", mataKuliah: 145, color: "from-blue-500 to-cyan-400" },
    { nama: "Teknik Elektro", akreditasi: "A", tanggalBerakhir: "2024-06-30", mataKuliah: 132, color: "from-yellow-500 to-orange-400" },
    { nama: "Arsitektur", akreditasi: "B", tanggalBerakhir: "2026-03-15", mataKuliah: 128, color: "from-purple-500 to-pink-400" },
    { nama: "Informatika", akreditasi: "A", tanggalBerakhir: "2025-08-20", mataKuliah: 156, color: "from-green-500 to-emerald-400" },
    { nama: "Perencanaan Wilayah Kota", akreditasi: "B", tanggalBerakhir: "2024-11-10", mataKuliah: 142, color: "from-red-500 to-rose-400" },
  ]

  const dosenData = [
    { nama: "Prof. Dr. Ahmad Susanto", jabatan: "Guru Besar", bebanSKS: 12, rpsUpload: true },
    { nama: "Dr. Siti Nurhaliza", jabatan: "Lektor Kepala", bebanSKS: 16, rpsUpload: true },
    { nama: "Muhammad Rizki, M.Kom", jabatan: "Asisten Ahli", bebanSKS: 18, rpsUpload: false },
  ]

  // Filter data based on search and department
  const filteredProdiData = prodiData.filter(prodi => {
    const matchesSearch = prodi.nama.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = !selectedDepartment || prodi.nama.includes(selectedDepartment)
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="space-y-6">
      {/* Modern Program Studi Cards */}
      <div>
        <div className="flex gap-3 items-center mb-4">
          <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Program Studi
            </h3>
            <p className="text-sm text-gray-500">Status akreditasi dan mata kuliah aktif ✨</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProdiData.map((prodi, index) => (
            <Card key={index} className="overflow-hidden relative border-0 shadow-lg transition-all duration-300 group hover:shadow-xl hover:-translate-y-1">
              <div className={`absolute inset-0 bg-gradient-to-br ${prodi.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <CardHeader className="relative z-10 pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="mb-1 text-lg font-bold text-gray-800 dark:text-gray-100">
                      {prodi.nama}
                    </CardTitle>
                    <div className="flex gap-2 items-center">
                      <Badge
                        className={`${prodi.akreditasi === "A"
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                          : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                          } text-white border-0 font-semibold px-3 py-1`}
                      >
                        Akreditasi {prodi.akreditasi}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-2 rounded-xl bg-gradient-to-r ${prodi.color}`}>
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">📚 Mata Kuliah</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{prodi.mataKuliah} MK</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">⏰ Berakhir</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{prodi.tanggalBerakhir}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modern Performance Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Kinerja Dosen */}
        <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-lg dark:from-gray-900 dark:to-purple-950/20">
          <CardHeader className="pb-4">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Kinerja Dosen 👨‍🏫
                </CardTitle>
                <CardDescription className="text-purple-600/70">Performa & beban kerja</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🎯 Dosen Tetap</span>
                <span className="text-sm font-bold text-purple-600">47/52</span>
              </div>
              <div className="relative">
                <Progress value={90} className="h-2 bg-purple-100 dark:bg-purple-900/30" />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">📄 Upload RPS</span>
                <span className="text-sm font-bold text-purple-600">85%</span>
              </div>
              <div className="relative">
                <Progress value={85} className="h-2 bg-purple-100 dark:bg-purple-900/30" />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🏆 Capaian Pembelajaran</span>
                <span className="text-sm font-bold text-purple-600">78%</span>
              </div>
              <div className="relative">
                <Progress value={78} className="h-2 bg-purple-100 dark:bg-purple-900/30" />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Perkuliahan */}
        <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg dark:from-gray-900 dark:to-blue-950/20">
          <CardHeader className="pb-4">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  Monitoring Kelas 📊
                </CardTitle>
                <CardDescription className="text-blue-600/70">Kehadiran & evaluasi</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">👨‍🏫 Kehadiran Dosen</span>
                <span className="text-sm font-bold text-blue-600">92%</span>
              </div>
              <div className="relative">
                <Progress value={92} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">👨‍🎓 Kehadiran Mahasiswa</span>
                <span className="text-sm font-bold text-blue-600">87%</span>
              </div>
              <div className="relative">
                <Progress value={87} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">⭐ Evaluasi</span>
                <span className="text-sm font-bold text-blue-600">4.2/5.0</span>
              </div>
              <div className="relative">
                <Progress value={84} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                <div className="absolute inset-0 h-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modern Graduation Stats */}
      <div>
        <div className="flex gap-3 items-center mb-4">
          <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
              Graduation Analytics
            </h3>
            <p className="text-sm text-gray-500">Performa kelulusan mahasiswa 🎓</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* KTW Card */}
          <Card className="bg-gradient-to-br from-white to-green-50 border-0 shadow-lg transition-all duration-300 group dark:from-gray-900 dark:to-green-950/20 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <Zap className="w-5 h-5 text-green-500 transition-colors group-hover:text-green-600" />
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  78.5%
                </div>
                <div className="text-sm font-medium text-green-600">✨ KTW Angkatan 2020</div>
                <div className="text-xs text-gray-500">Kelulusan Tepat Waktu</div>
              </div>
            </CardContent>
          </Card>

          {/* Study Duration Card */}
          <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg transition-all duration-300 group dark:from-gray-900 dark:to-blue-950/20 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <Clock className="w-5 h-5 text-blue-500 transition-colors group-hover:text-blue-600" />
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                  4.2
                </div>
                <div className="text-sm font-medium text-blue-600">📅 Median Lama Studi</div>
                <div className="text-xs text-gray-500">Tahun rata-rata</div>
              </div>
            </CardContent>
          </Card>

          {/* Graduates Card */}
          <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-lg transition-all duration-300 group dark:from-gray-900 dark:to-purple-950/20 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-purple-500 transition-colors group-hover:text-purple-600" />
              </div>
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  247
                </div>
                <div className="text-sm font-medium text-purple-600">🎓 Lulusan Semester</div>
                <div className="text-xs text-gray-500">Fresh graduates</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
