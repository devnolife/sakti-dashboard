"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, ChevronDown, Users, Calendar, BarChart3 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Data contoh untuk partisipasi mahasiswa
const mockParticipationData = [
  {
    id: 1,
    labName: "Lab Jaringan Komputer",
    totalStudents: 120,
    attendanceRate: 92,
    completionRate: 88,
    avgScore: 85,
    participationTrend: [
      { month: "Jan", attendance: 90 },
      { month: "Feb", attendance: 92 },
      { month: "Mar", attendance: 88 },
      { month: "Apr", attendance: 94 },
      { month: "May", attendance: 96 },
    ],
  },
  {
    id: 2,
    labName: "Lab Sistem Basis Data",
    totalStudents: 95,
    attendanceRate: 88,
    completionRate: 82,
    avgScore: 78,
    participationTrend: [
      { month: "Jan", attendance: 85 },
      { month: "Feb", attendance: 87 },
      { month: "Mar", attendance: 90 },
      { month: "Apr", attendance: 88 },
      { month: "May", attendance: 90 },
    ],
  },
  {
    id: 3,
    labName: "Lab Sistem Operasi",
    totalStudents: 110,
    attendanceRate: 85,
    completionRate: 80,
    avgScore: 76,
    participationTrend: [
      { month: "Jan", attendance: 82 },
      { month: "Feb", attendance: 84 },
      { month: "Mar", attendance: 86 },
      { month: "Apr", attendance: 85 },
      { month: "May", attendance: 88 },
    ],
  },
  {
    id: 4,
    labName: "Lab Rekayasa Perangkat Lunak",
    totalStudents: 85,
    attendanceRate: 94,
    completionRate: 90,
    avgScore: 88,
    participationTrend: [
      { month: "Jan", attendance: 92 },
      { month: "Feb", attendance: 94 },
      { month: "Mar", attendance: 93 },
      { month: "Apr", attendance: 95 },
      { month: "May", attendance: 96 },
    ],
  },
  {
    id: 5,
    labName: "Lab Struktur Data",
    totalStudents: 130,
    attendanceRate: 90,
    completionRate: 85,
    avgScore: 82,
    participationTrend: [
      { month: "Jan", attendance: 88 },
      { month: "Feb", attendance: 90 },
      { month: "Mar", attendance: 89 },
      { month: "Apr", attendance: 91 },
      { month: "May", attendance: 92 },
    ],
  },
]

// Data contoh untuk partisipasi mahasiswa secara detail
const mockDetailedStudentData = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    nim: "1234567890",
    lab: "Lab Jaringan Komputer",
    attendance: 95,
    completionRate: 92,
    score: 88,
    status: "Sangat Baik",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    nim: "2345678901",
    lab: "Lab Jaringan Komputer",
    attendance: 90,
    completionRate: 85,
    score: 82,
    status: "Baik",
  },
  {
    id: 3,
    name: "Budi Santoso",
    nim: "3456789012",
    lab: "Lab Sistem Basis Data",
    attendance: 85,
    completionRate: 80,
    score: 75,
    status: "Cukup",
  },
  {
    id: 4,
    name: "Dewi Kartika",
    nim: "4567890123",
    lab: "Lab Sistem Basis Data",
    attendance: 92,
    completionRate: 88,
    score: 85,
    status: "Baik",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    nim: "5678901234",
    lab: "Lab Sistem Operasi",
    attendance: 78,
    completionRate: 75,
    score: 70,
    status: "Kurang",
  },
  {
    id: 6,
    name: "Fitri Handayani",
    nim: "6789012345",
    lab: "Lab Sistem Operasi",
    attendance: 88,
    completionRate: 82,
    score: 78,
    status: "Cukup",
  },
  {
    id: 7,
    name: "Gunawan Wibisono",
    nim: "7890123456",
    lab: "Lab Rekayasa Perangkat Lunak",
    attendance: 96,
    completionRate: 94,
    score: 90,
    status: "Sangat Baik",
  },
  {
    id: 8,
    name: "Hani Susanti",
    nim: "8901234567",
    lab: "Lab Rekayasa Perangkat Lunak",
    attendance: 93,
    completionRate: 90,
    score: 86,
    status: "Baik",
  },
  {
    id: 9,
    name: "Irfan Hakim",
    nim: "9012345678",
    lab: "Lab Struktur Data",
    attendance: 91,
    completionRate: 87,
    score: 84,
    status: "Baik",
  },
  {
    id: 10,
    name: "Joko Widodo",
    nim: "0123456789",
    lab: "Lab Struktur Data",
    attendance: 89,
    completionRate: 84,
    score: 80,
    status: "Cukup",
  },
]

// Fungsi untuk mendapatkan warna status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Sangat Baik":
      return "bg-green-100 text-green-800 hover:bg-green-200"
    case "Baik":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    case "Cukup":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    case "Kurang":
      return "bg-red-100 text-red-800 hover:bg-red-200"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
}

// Fungsi untuk mendapatkan warna batang berdasarkan tingkat kehadiran
const getBarColor = (attendance: number) => {
  if (attendance >= 90) return "#10b981" // hijau
  if (attendance >= 80) return "#3b82f6" // biru
  if (attendance >= 70) return "#f59e0b" // kuning
  return "#ef4444" // merah
}

export function StudentParticipation() {
  const [selectedLab, setSelectedLab] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("semester")
  const [selectedView, setSelectedView] = useState<"chart" | "table">("chart")

  // Filter data berdasarkan laboratorium yang dipilih
  const filteredLabData =
    selectedLab === "all" ? mockParticipationData : mockParticipationData.filter((lab) => lab.labName === selectedLab)

  // Filter data mahasiswa berdasarkan laboratorium yang dipilih
  const filteredStudentData =
    selectedLab === "all"
      ? mockDetailedStudentData
      : mockDetailedStudentData.filter((student) => student.lab === selectedLab)

  // Siapkan data untuk grafik perbandingan
  const comparisonData = mockParticipationData.map((lab) => ({
    name: lab.labName,
    attendance: lab.attendanceRate,
    completion: lab.completionRate,
    score: lab.avgScore,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analisis Partisipasi Mahasiswa</h2>
          <p className="text-muted-foreground">Analisis metrik partisipasi mahasiswa di berbagai laboratorium</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedLab} onValueChange={setSelectedLab}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Laboratorium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Laboratorium</SelectItem>
              {mockParticipationData.map((lab) => (
                <SelectItem key={lab.id} value={lab.labName}>
                  {lab.labName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">Semester Berjalan</SelectItem>
              <SelectItem value="year">Tahun Akademik</SelectItem>
              <SelectItem value="month">Bulan Terakhir</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Ekspor
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Ekspor sebagai PDF</DropdownMenuItem>
              <DropdownMenuItem>Ekspor sebagai Excel</DropdownMenuItem>
              <DropdownMenuItem>Ekspor sebagai CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Kartu Ringkasan Partisipasi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLabData.reduce((sum, lab) => sum + lab.totalStudents, 0)}</div>
            <p className="text-xs text-muted-foreground">Dari {filteredLabData.length} laboratorium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Kehadiran</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(filteredLabData.reduce((sum, lab) => sum + lab.attendanceRate, 0) / filteredLabData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedPeriod === "semester"
                ? "Semester Berjalan"
                : selectedPeriod === "year"
                  ? "Tahun Akademik"
                  : "Bulan Terakhir"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Penyelesaian</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(filteredLabData.reduce((sum, lab) => sum + lab.completionRate, 0) / filteredLabData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Penyelesaian tugas di semua laboratorium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(filteredLabData.reduce((sum, lab) => sum + lab.avgScore, 0) / filteredLabData.length)}
            </div>
            <p className="text-xs text-muted-foreground">Rata-rata skor performa</p>
          </CardContent>
        </Card>
      </div>

      {/* Pengalih Tampilan */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={selectedView === "chart" ? "default" : "outline"}
            className="rounded-l-md rounded-r-none"
            onClick={() => setSelectedView("chart")}
          >
            Tampilan Grafik
          </Button>
          <Button
            variant={selectedView === "table" ? "default" : "outline"}
            className="rounded-r-md rounded-l-none"
            onClick={() => setSelectedView("table")}
          >
            Tampilan Tabel
          </Button>
        </div>
      </div>

      {/* Grafik Partisipasi */}
      {selectedView === "chart" && (
        <Card>
          <CardHeader>
            <CardTitle>Perbandingan Metrik Partisipasi</CardTitle>
            <CardDescription>
              Membandingkan tingkat kehadiran, tingkat penyelesaian, dan nilai rata-rata di berbagai laboratorium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ChartContainer
                config={{
                  attendance: {
                    label: "Tingkat Kehadiran",
                    color: "hsl(var(--chart-1))",
                  },
                  completion: {
                    label: "Tingkat Penyelesaian",
                    color: "hsl(var(--chart-2))",
                  },
                  score: {
                    label: "Nilai Rata-rata",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="attendance" name="Tingkat Kehadiran" fill="var(--color-attendance)" />
                    <Bar dataKey="completion" name="Tingkat Penyelesaian" fill="var(--color-completion)" />
                    <Bar dataKey="score" name="Nilai Rata-rata" fill="var(--color-score)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabel Partisipasi */}
      {selectedView === "table" && (
        <Card>
          <CardHeader>
            <CardTitle>Partisipasi Mahasiswa Detail</CardTitle>
            <CardDescription>
              Metrik partisipasi individual mahasiswa untuk {selectedLab === "all" ? "semua laboratorium" : selectedLab}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead>Laboratorium</TableHead>
                  <TableHead className="text-right">Kehadiran</TableHead>
                  <TableHead className="text-right">Penyelesaian</TableHead>
                  <TableHead className="text-right">Nilai</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudentData.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.nim}</TableCell>
                    <TableCell>{student.lab}</TableCell>
                    <TableCell className="text-right">{student.attendance}%</TableCell>
                    <TableCell className="text-right">{student.completionRate}%</TableCell>
                    <TableCell className="text-right">{student.score}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Tren Partisipasi */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Partisipasi</CardTitle>
          <CardDescription>
            Tren kehadiran bulanan untuk {selectedLab === "all" ? "laboratorium terpilih" : selectedLab}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={
                  selectedLab === "all"
                    ? mockParticipationData[0].participationTrend
                    : mockParticipationData.find((lab) => lab.labName === selectedLab)?.participationTrend || []
                }
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="attendance" name="Tingkat Kehadiran">
                  {(selectedLab === "all"
                    ? mockParticipationData[0].participationTrend
                    : mockParticipationData.find((lab) => lab.labName === selectedLab)?.participationTrend || []
                  ).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.attendance)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

