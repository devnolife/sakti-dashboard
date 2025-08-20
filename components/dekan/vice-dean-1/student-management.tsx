"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Award, Users, TrendingUp, Star, Brain, Heart } from "lucide-react"

interface Props {
  searchQuery?: string
  selectedDepartment?: string | null
}

export function StudentManagement({ searchQuery = "", selectedDepartment = null }: Props) {
  const mahasiswaAtRisk = [
    { nama: "Ahmad Rizki", npm: "20200001", prodi: "Teknik Pengairan", ipk: 2.1, semester: 8, alasan: "IPK rendah" },
    { nama: "Siti Aminah", npm: "20190045", prodi: "Teknik Elektro", ipk: 2.8, semester: 10, alasan: "Belum ambil skripsi" },
    { nama: "Budi Santoso", npm: "20200156", prodi: "Arsitektur", ipk: 3.0, semester: 6, alasan: "Keterlambatan KRS" },
  ]

  const prestasiData = [
    { nama: "Lina Kusuma", prestasi: "Juara 1 Lomba Programming", tingkat: "Internasional", tahun: "2024" },
    { nama: "Andi Wijaya", prestasi: "Best Paper Conference", tingkat: "Internasional", tahun: "2024" },
    { nama: "Maya Sari", prestasi: "Juara 2 Hackathon", tingkat: "Nasional", tahun: "2024" },
  ]

  const prodiStats = [
    { nama: "Teknik Pengairan", count: 568, percentage: 20, color: "from-blue-500 to-cyan-400", emoji: "🌊" },
    { nama: "Teknik Elektro", count: 712, percentage: 25, color: "from-yellow-500 to-orange-400", emoji: "⚡" },
    { nama: "Arsitektur", count: 625, percentage: 22, color: "from-purple-500 to-pink-400", emoji: "🏗️" },
    { nama: "Informatika", count: 854, percentage: 30, color: "from-green-500 to-emerald-400", emoji: "💻" },
    { nama: "Perencanaan Wilayah Kota", count: 88, percentage: 3, color: "from-red-500 to-rose-400", emoji: "🏙️" },
  ]

  return (
    <div className="space-y-6">
      {/* Modern Student Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Student Population */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Student Population 👥
                </CardTitle>
                <CardDescription className="text-blue-600/70">Total & gender distribution</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  2,847
                </div>
                <div className="text-sm font-medium text-blue-600">Total Students</div>
              </div>
              <div className="text-center space-y-2 p-4 rounded-xl bg-gradient-to-br from-pink-50 to-blue-50 dark:from-pink-950/20 dark:to-blue-950/20">
                <div className="flex justify-between text-sm">
                  <span className="text-pink-600 font-medium">👩 45%</span>
                  <span className="text-blue-600 font-medium">👨 55%</span>
                </div>
                <div className="text-xs text-gray-500">Gender ratio</div>
              </div>
            </div>

            <div className="space-y-3">
              {prodiStats.map((prodi, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {prodi.emoji} {prodi.nama}
                    </span>
                    <span className="font-bold text-blue-600">{prodi.count} ({prodi.percentage}%)</span>
                  </div>
                  <div className="relative">
                    <Progress value={prodi.percentage} className="h-2 bg-blue-100 dark:bg-blue-900/30" />
                    <div
                      className={`absolute inset-0 h-2 bg-gradient-to-r ${prodi.color} rounded-full transition-all duration-500`}
                      style={{ width: `${prodi.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Academic Performance */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Academic Performance 🧠
                </CardTitle>
                <CardDescription className="text-green-600/70">GPA & achievement stats</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  3.42
                </div>
                <div className="text-sm font-medium text-green-600">📊 Rata-rata IPK</div>
              </div>
              <div className="text-center space-y-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  3.61
                </div>
                <div className="text-sm font-medium text-blue-600">✨ Rata-rata IPS</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">🎯 Rasio SKS Lulus</span>
                  <span className="text-sm font-bold text-green-600">89%</span>
                </div>
                <div className="relative">
                  <Progress value={89} className="h-2 bg-green-100 dark:bg-green-900/30" />
                  <div className="absolute inset-0 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '89%' }} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">💰 Mahasiswa Beasiswa</span>
                  <span className="text-sm font-bold text-green-600">456 (16%)</span>
                </div>
                <div className="relative">
                  <Progress value={16} className="h-2 bg-green-100 dark:bg-green-900/30" />
                  <div className="absolute inset-0 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '16%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students At Risk - Modern Design */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Students at Risk ⚠️
            </h3>
            <p className="text-sm text-orange-600">Mahasiswa yang perlu perhatian khusus</p>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-orange-950/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              {mahasiswaAtRisk.map((mahasiswa, index) => (
                <div key={index} className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-orange-100 dark:border-orange-900/20 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">{mahasiswa.nama}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{mahasiswa.npm} • {mahasiswa.prodi}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${mahasiswa.ipk < 2.5
                          ? "bg-gradient-to-r from-red-500 to-rose-500"
                          : "bg-gradient-to-r from-orange-500 to-yellow-500"
                          } text-white border-0 font-semibold`}
                      >
                        IPK {mahasiswa.ipk}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">📚 Semester {mahasiswa.semester}</span>
                    <Badge variant="outline" className="text-orange-700 border-orange-300">
                      {mahasiswa.alasan}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student Achievements - Modern Design */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Student Achievements 🏆
            </h3>
            <p className="text-sm text-yellow-600">Prestasi terbaru mahasiswa</p>
          </div>
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50 dark:from-gray-900 dark:to-yellow-950/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              {prestasiData.map((prestasi, index) => (
                <div key={index} className="p-4 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-yellow-100 dark:border-yellow-900/20 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">{prestasi.nama}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{prestasi.prestasi}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-600">{prestasi.tahun}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Badge
                      className={`${prestasi.tingkat === "Internasional"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : prestasi.tingkat === "Nasional"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gradient-to-r from-green-500 to-emerald-500"
                        } text-white border-0 font-semibold`}
                    >
                      🏅 {prestasi.tingkat}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
