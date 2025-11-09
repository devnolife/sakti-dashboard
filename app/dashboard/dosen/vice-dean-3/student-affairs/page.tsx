"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, UserCheck, Search, Download, Eye, AlertTriangle, Award, BookOpen, ChevronLeft, ChevronRight, X, GraduationCap } from "lucide-react"

interface Student {
  id: string
  name: string
  nim: string
  prodi: string
  semester: number
  ipk: number
  sks?: number
  status: "active" | "cuti" | "graduated" | "probation"
  email?: string
  phone?: string
  address?: string
  angkatan?: string
  predicate?: string
  issue?: string
}

const mockStudents: Student[] = [
  { id: '1', name: 'Ahmad Fauzi', nim: '2019101001', prodi: 'Informatika', semester: 7, ipk: 3.65, status: 'active', email: 'ahmad.fauzi@student.edu', phone: '081234567890', angkatan: '2019' },
  { id: '2', name: 'Siti Nurhaliza', nim: '2020101002', prodi: 'Informatika', semester: 5, ipk: 3.42, status: 'active', email: 'siti.nurhaliza@student.edu', phone: '081234567891', angkatan: '2020' },
  { id: '3', name: 'Budi Santoso', nim: '2021101003', prodi: 'Informatika', semester: 3, ipk: 3.28, status: 'active', email: 'budi.santoso@student.edu', phone: '081234567892', angkatan: '2021' },
  { id: '4', name: 'Dewi Lestari', nim: '2019101004', prodi: 'Informatika', semester: 7, ipk: 3.85, status: 'active', email: 'dewi.lestari@student.edu', phone: '081234567893', angkatan: '2019' },
  { id: '5', name: 'Eko Prasetyo', nim: '2020101005', prodi: 'Informatika', semester: 5, ipk: 2.15, sks: 11, status: 'probation', issue: 'IPK Rendah', email: 'eko.prasetyo@student.edu', phone: '081234567894', angkatan: '2020' },
  { id: '6', name: 'Rina Wati', nim: '2019101006', prodi: 'Teknik Sipil', semester: 7, ipk: 3.52, status: 'active', email: 'rina.wati@student.edu', phone: '081234567895', angkatan: '2019' },
  { id: '7', name: 'Agus Setiawan', nim: '2020101007', prodi: 'Teknik Sipil', semester: 5, ipk: 3.38, status: 'active', email: 'agus.setiawan@student.edu', phone: '081234567896', angkatan: '2020' },
  { id: '8', name: 'Maya Sari', nim: '2021101008', prodi: 'Teknik Sipil', semester: 3, ipk: 3.45, status: 'active', email: 'maya.sari@student.edu', phone: '081234567897', angkatan: '2021' },
  { id: '9', name: 'Dian Pratama', nim: '2020101009', prodi: 'Teknik Sipil', semester: 5, ipk: 2.42, sks: 9, status: 'probation', issue: 'SKS Rendah', email: 'dian.pratama@student.edu', phone: '081234567898', angkatan: '2020' },
  { id: '10', name: 'Putri Ayu', nim: '2019101010', prodi: 'Arsitektur', semester: 7, ipk: 3.71, status: 'active', email: 'putri.ayu@student.edu', phone: '081234567899', angkatan: '2019' },
  { id: '11', name: 'Reza Firmansyah', nim: '2020101011', prodi: 'Arsitektur', semester: 5, ipk: 3.55, status: 'active', email: 'reza.firmansyah@student.edu', phone: '081234567900', angkatan: '2020' },
  { id: '12', name: 'Sari Indah', nim: '2021101012', prodi: 'Arsitektur', semester: 3, ipk: 3.62, status: 'active', email: 'sari.indah@student.edu', phone: '081234567901', angkatan: '2021' },
  { id: '13', name: 'Andi Wijaya', nim: '2019101013', prodi: 'Teknik Elektro', semester: 7, ipk: 3.48, status: 'active', email: 'andi.wijaya@student.edu', phone: '081234567902', angkatan: '2019' },
  { id: '14', name: 'Fitri Lestari', nim: '2020101014', prodi: 'Teknik Elektro', semester: 5, ipk: 3.32, status: 'active', email: 'fitri.lestari@student.edu', phone: '081234567903', angkatan: '2020' },
  { id: '15', name: 'Hendra Gunawan', nim: '2021101015', prodi: 'Teknik Elektro', semester: 3, ipk: 3.25, status: 'active', email: 'hendra.gunawan@student.edu', phone: '081234567904', angkatan: '2021' },
  { id: '16', name: 'Linda Susanti', nim: '2018101016', prodi: 'Informatika', semester: 8, ipk: 3.89, status: 'graduated', predicate: 'Cumlaude', email: 'linda.susanti@student.edu', phone: '081234567905', angkatan: '2018' },
  { id: '17', name: 'Rizki Ramadhan', nim: '2018101017', prodi: 'Arsitektur', semester: 8, ipk: 3.78, status: 'graduated', predicate: 'Cumlaude', email: 'rizki.ramadhan@student.edu', phone: '081234567906', angkatan: '2018' },
]

// Utility function to get initials from name
const getInitials = (name: string) => {
  const words = name.split(' ').filter(word => word.length > 0)
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Utility function to get consistent color based on string
const getAvatarColor = (str: string) => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-violet-500',
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function StudentAffairsPage() {
  const [students] = useState<Student[]>(mockStudents)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProdi, setSelectedProdi] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const openViewDialog = (student: Student) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  const activeStudents = students.filter(s => s.status === 'active')
  const probationStudents = students.filter(s => s.status === 'probation')
  const graduatedStudents = students.filter(s => s.status === 'graduated')

  const prodiList = [
    { name: 'Informatika', color: 'from-blue-500 to-cyan-500', icon: '💻' },
    { name: 'Teknik Sipil', color: 'from-green-500 to-emerald-500', icon: '🏗️' },
    { name: 'Arsitektur', color: 'from-purple-500 to-pink-500', icon: '🏛️' },
    { name: 'Teknik Elektro', color: 'from-amber-500 to-orange-500', icon: '⚡' },
    { name: 'PWK', color: 'from-indigo-500 to-blue-500', icon: '🗺️' },
  ]

  const getProdiStudents = (prodiName: string) => {
    return students.filter(s => s.prodi === prodiName)
  }

  const getProdiStats = (prodiName: string) => {
    const prodiStudents = getProdiStudents(prodiName)
    const active = prodiStudents.filter(s => s.status === 'active').length
    const probation = prodiStudents.filter(s => s.status === 'probation').length
    const avgIpk = prodiStudents.length > 0
      ? (prodiStudents.reduce((sum, s) => sum + s.ipk, 0) / prodiStudents.length).toFixed(2)
      : '0.00'
    const excellent = prodiStudents.filter(s => s.ipk >= 3.5).length

    return { total: prodiStudents.length, active, probation, avgIpk, excellent }
  }

  const filterStudents = (studentList: Student[]) => {
    let filtered = studentList

    if (selectedProdi !== 'all') {
      filtered = filtered.filter(s => s.prodi === selectedProdi)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(s => s.status === selectedStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nim.includes(searchQuery) ||
        s.prodi.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredStudents = filterStudents(students)
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kemahasiswaan</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitoring dan pengelolaan data kemahasiswaan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Overall Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-900">Total Mahasiswa</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{students.length}</div>
            <p className="text-xs text-blue-700/80 mt-1">Seluruh program studi</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-900">Mahasiswa Aktif</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{activeStudents.length}</div>
            <p className="text-xs text-green-700/80 mt-1">{((activeStudents.length / students.length) * 100).toFixed(1)}% dari total</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-amber-900">Perhatian Khusus</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{probationStudents.length}</div>
            <p className="text-xs text-amber-700/80 mt-1">Perlu monitoring</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-900">IPK ≥ 3.5</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Award className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{students.filter(s => s.ipk >= 3.5).length}</div>
            <p className="text-xs text-purple-700/80 mt-1">Prestasi excellent</p>
          </CardContent>
        </Card>
      </div>

      {/* Program Studi Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {prodiList.map((prodi, i) => {
          const stats = getProdiStats(prodi.name)
          return (
            <Card
              key={i}
              className={`overflow-hidden border-0 bg-gradient-to-br ${prodi.color} cursor-pointer hover:shadow-xl transition-all hover:scale-105`}
              onClick={() => setSelectedProdi(prodi.name)}
            >
              <CardHeader className="pb-3 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{prodi.icon}</span>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    {stats.total} mhs
                  </Badge>
                </div>
                <CardTitle className="text-base font-semibold leading-tight">{prodi.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="opacity-90 mb-1">Aktif</p>
                    <p className="text-2xl font-bold">{stats.active}</p>
                  </div>
                  <div className="text-right">
                    <p className="opacity-90 mb-1">IPK Avg</p>
                    <p className="text-2xl font-bold">{stats.avgIpk}</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                  <span className="opacity-90">Excellent: {stats.excellent}</span>
                  {stats.probation > 0 && (
                    <span className="bg-white/20 px-2 py-1 rounded text-xs">⚠️ {stats.probation}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIM, atau program studi..."
                className="pl-11 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedProdi} onValueChange={setSelectedProdi}>
              <SelectTrigger className="w-full md:w-[220px] h-12 text-base">
                <SelectValue placeholder="Program Studi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Semua Prodi</SelectItem>
                <SelectItem value="Informatika" className="text-base">💻 Informatika</SelectItem>
                <SelectItem value="Teknik Sipil" className="text-base">🏗️ Teknik Sipil</SelectItem>
                <SelectItem value="Arsitektur" className="text-base">🏛️ Arsitektur</SelectItem>
                <SelectItem value="Teknik Elektro" className="text-base">⚡ Teknik Elektro</SelectItem>
                <SelectItem value="PWK" className="text-base">🗺️ PWK</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[220px] h-12 text-base">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Semua Status</SelectItem>
                <SelectItem value="active" className="text-base">Aktif</SelectItem>
                <SelectItem value="probation" className="text-base">Perhatian Khusus</SelectItem>
                <SelectItem value="graduated" className="text-base">Lulus</SelectItem>
                <SelectItem value="cuti" className="text-base">Cuti</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              {filteredStudents.length} Mahasiswa Ditemukan
            </CardTitle>
            {(selectedProdi !== 'all' || selectedStatus !== 'all' || searchQuery !== '') && (
              <Button
                variant="ghost"
                size="default"
                onClick={() => {
                  setSelectedProdi('all')
                  setSelectedStatus('all')
                  setSearchQuery('')
                  setCurrentPage(1)
                }}
                className="text-base h-10"
              >
                <X className="h-5 w-5 mr-2" />
                Reset Filter
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-sm font-semibold h-14">Nama</TableHead>
                  <TableHead className="text-sm font-semibold h-14">NIM</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Program Studi</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Semester</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Angkatan</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">IPK</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Status</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.length > 0 ? (
                  paginatedStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-muted/30 h-20">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${getAvatarColor(student.name)} flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                            {getInitials(student.name)}
                          </div>
                          <div>
                            <p className="text-base font-semibold">{student.name}</p>
                            {student.issue && (
                              <p className="text-sm text-amber-600 flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-4 w-4" />
                                {student.issue}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-slate-100 text-slate-700 border border-slate-200 text-sm px-3 py-1">
                          {student.nim}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-blue-600 flex-shrink-0" />
                          <span className="text-sm font-medium">{student.prodi}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium text-muted-foreground">Sem {student.semester}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-medium text-muted-foreground">{student.angkatan}</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <span
                            className={`text-base font-bold ${
                              student.ipk >= 3.5
                                ? 'text-green-600'
                                : student.ipk >= 3.0
                                ? 'text-blue-600'
                                : 'text-orange-600'
                            }`}
                          >
                            {student.ipk.toFixed(2)}
                          </span>
                          {student.ipk >= 3.5 && (
                            <span className="text-xs text-green-600 font-medium">⭐ Excellent</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`text-sm px-3 py-1 border ${
                            student.status === 'active'
                              ? 'bg-green-100 text-green-700 border-green-200'
                              : student.status === 'probation'
                              ? 'bg-amber-100 text-amber-700 border-amber-200'
                              : student.status === 'graduated'
                              ? 'bg-blue-100 text-blue-700 border-blue-200'
                              : 'bg-gray-100 text-gray-700 border-gray-200'
                          }`}
                        >
                          {student.status === 'active' && 'Aktif'}
                          {student.status === 'probation' && 'Perhatian Khusus'}
                          {student.status === 'graduated' && 'Lulus'}
                          {student.status === 'cuti' && 'Cuti'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 px-4"
                          onClick={() => openViewDialog(student)}
                        >
                          <Eye className="h-5 w-5 mr-2" />
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Users className="h-14 w-14 mb-3 opacity-50" />
                        <p className="text-base font-medium">Tidak ada data mahasiswa ditemukan</p>
                        <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground font-medium">
                Menampilkan {startIndex + 1} - {Math.min(endIndex, filteredStudents.length)} dari {filteredStudents.length} data
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="h-10 px-4"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="h-10 w-10 text-base"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="h-10 px-4"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Status Mahasiswa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Aktif', count: activeStudents.length, color: 'bg-green-500' },
              { label: 'Perhatian Khusus', count: probationStudents.length, color: 'bg-amber-500' },
              { label: 'Lulus', count: graduatedStudents.length, color: 'bg-blue-500' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 text-sm font-medium">{stat.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full ${stat.color} flex items-center justify-end px-3`}
                    style={{ width: `${(stat.count / students.length) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{stat.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Distribusi IPK</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'IPK ≥ 3.5', count: students.filter(s => s.ipk >= 3.5).length, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
              { label: 'IPK 3.0 - 3.49', count: students.filter(s => s.ipk >= 3.0 && s.ipk < 3.5).length, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
              { label: 'IPK < 3.0', count: students.filter(s => s.ipk < 3.0).length, color: 'bg-gradient-to-r from-amber-500 to-orange-500' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-32 text-sm font-medium">{stat.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className={`h-full ${stat.color} flex items-center justify-end px-3`}
                    style={{ width: `${(stat.count / students.length) * 100}%` }}
                  >
                    <span className="text-xs font-medium text-white">{stat.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Per Program Studi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {prodiList.slice(0, 4).map((prodi, i) => {
              const stats = getProdiStats(prodi.name)
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-32 text-sm font-medium">{prodi.icon} {prodi.name}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${prodi.color} flex items-center justify-end px-3`}
                      style={{ width: `${(stats.total / students.length) * 100}%` }}
                    >
                      <span className="text-xs font-medium text-white">{stats.total}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Detail Mahasiswa
            </DialogTitle>
            <DialogDescription>Informasi lengkap mahasiswa</DialogDescription>
          </DialogHeader>

          {selectedStudent && (
            <div className="space-y-4 py-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Informasi Akademik
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 md:grid-cols-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Nama Lengkap</Label>
                    <p className="text-sm font-medium">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">NIM</Label>
                    <p className="text-sm font-medium">{selectedStudent.nim}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Program Studi</Label>
                    <p className="text-sm font-medium">{selectedStudent.prodi}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Angkatan</Label>
                    <p className="text-sm font-medium">{selectedStudent.angkatan}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Semester</Label>
                    <p className="text-sm font-medium">Semester {selectedStudent.semester}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">IPK</Label>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{selectedStudent.ipk}</p>
                      {selectedStudent.ipk >= 3.5 && (
                        <Badge className="text-xs bg-green-100 text-green-700">Excellent</Badge>
                      )}
                      {selectedStudent.ipk >= 3.0 && selectedStudent.ipk < 3.5 && (
                        <Badge className="text-xs bg-blue-100 text-blue-700">Good</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Status</Label>
                    <div>
                      <Badge className="text-xs">
                        {selectedStudent.status === 'active' && '✅ Aktif'}
                        {selectedStudent.status === 'cuti' && '⏸️ Cuti'}
                        {selectedStudent.status === 'probation' && '⚠️ Perhatian Khusus'}
                        {selectedStudent.status === 'graduated' && '🎓 Lulus'}
                      </Badge>
                    </div>
                  </div>
                  {selectedStudent.issue && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Catatan</Label>
                      <p className="text-sm font-medium text-amber-700">{selectedStudent.issue}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <p className="text-sm font-medium">{selectedStudent.email || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">No. Telepon</Label>
                    <p className="text-sm font-medium">{selectedStudent.phone || '-'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
