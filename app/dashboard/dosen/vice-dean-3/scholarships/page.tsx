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
import { Textarea } from "@/components/ui/textarea"
import { Award, Users, TrendingUp, Search, Download, Eye, Plus, CheckCircle, Clock, XCircle, GraduationCap, DollarSign, FileText } from "lucide-react"

interface Scholarship {
  id: string
  studentName: string
  nim: string
  prodi: string
  scholarshipType: "prestasi" | "kip" | "bbp-ppa" | "daerah" | "perusahaan" | "internal"
  scholarshipName: string
  amount: number
  semester: string
  year: number
  status: "pending" | "approved" | "rejected" | "disbursed"
  applicationDate: string
  ipk: number
  achievements?: string
  notes?: string
}

const mockScholarships: Scholarship[] = [
  {
    id: '1',
    studentName: 'Ahmad Fauzi',
    nim: '2019101001',
    prodi: 'Informatika',
    scholarshipType: 'prestasi',
    scholarshipName: 'Beasiswa Prestasi Akademik',
    amount: 5000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'approved',
    applicationDate: '2024-08-15',
    ipk: 3.85,
    achievements: 'Juara 1 Kompetisi Pemrograman Nasional 2024'
  },
  {
    id: '2',
    studentName: 'Siti Nurhaliza',
    nim: '2020101002',
    prodi: 'Informatika',
    scholarshipType: 'kip',
    scholarshipName: 'KIP Kuliah',
    amount: 12000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'disbursed',
    applicationDate: '2024-07-10',
    ipk: 3.65
  },
  {
    id: '3',
    studentName: 'Budi Santoso',
    nim: '2021101003',
    prodi: 'Informatika',
    scholarshipType: 'bbp-ppa',
    scholarshipName: 'BBP-PPA',
    amount: 4800000,
    semester: 'Ganjil',
    year: 2024,
    status: 'approved',
    applicationDate: '2024-08-20',
    ipk: 3.42
  },
  {
    id: '4',
    studentName: 'Dewi Lestari',
    nim: '2019101004',
    prodi: 'Informatika',
    scholarshipType: 'prestasi',
    scholarshipName: 'Beasiswa Unggulan',
    amount: 6000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'disbursed',
    applicationDate: '2024-08-12',
    ipk: 3.92,
    achievements: 'IPK > 3.75 selama 5 semester berturut-turut'
  },
  {
    id: '5',
    studentName: 'Rina Wati',
    nim: '2019101006',
    prodi: 'Teknik Sipil',
    scholarshipType: 'daerah',
    scholarshipName: 'Beasiswa Pemda Jakarta',
    amount: 8000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'approved',
    applicationDate: '2024-08-18',
    ipk: 3.58
  },
  {
    id: '6',
    studentName: 'Agus Setiawan',
    nim: '2020101007',
    prodi: 'Teknik Sipil',
    scholarshipType: 'perusahaan',
    scholarshipName: 'Beasiswa PT Semen Indonesia',
    amount: 10000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'disbursed',
    applicationDate: '2024-07-25',
    ipk: 3.71
  },
  {
    id: '7',
    studentName: 'Maya Sari',
    nim: '2021101008',
    prodi: 'Teknik Sipil',
    scholarshipType: 'kip',
    scholarshipName: 'KIP Kuliah',
    amount: 12000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'disbursed',
    applicationDate: '2024-07-15',
    ipk: 3.48
  },
  {
    id: '8',
    studentName: 'Putri Ayu',
    nim: '2019101010',
    prodi: 'Arsitektur',
    scholarshipType: 'internal',
    scholarshipName: 'Beasiswa Internal Universitas',
    amount: 4000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'approved',
    applicationDate: '2024-08-22',
    ipk: 3.67
  },
  {
    id: '9',
    studentName: 'Reza Firmansyah',
    nim: '2020101011',
    prodi: 'Arsitektur',
    scholarshipType: 'prestasi',
    scholarshipName: 'Beasiswa Prestasi Desain',
    amount: 5500000,
    semester: 'Ganjil',
    year: 2024,
    status: 'pending',
    applicationDate: '2024-09-05',
    ipk: 3.78,
    achievements: 'Juara 2 Kompetisi Desain Nasional'
  },
  {
    id: '10',
    studentName: 'Andi Wijaya',
    nim: '2019101013',
    prodi: 'Teknik Elektro',
    scholarshipType: 'perusahaan',
    scholarshipName: 'Beasiswa PLN',
    amount: 9000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'approved',
    applicationDate: '2024-08-08',
    ipk: 3.55
  },
  {
    id: '11',
    studentName: 'Fitri Lestari',
    nim: '2020101014',
    prodi: 'Teknik Elektro',
    scholarshipType: 'bbp-ppa',
    scholarshipName: 'BBP-PPA',
    amount: 4800000,
    semester: 'Ganjil',
    year: 2024,
    status: 'disbursed',
    applicationDate: '2024-08-17',
    ipk: 3.45
  },
  {
    id: '12',
    studentName: 'Hendra Gunawan',
    nim: '2021101015',
    prodi: 'Teknik Elektro',
    scholarshipType: 'internal',
    scholarshipName: 'Beasiswa Internal Universitas',
    amount: 4000000,
    semester: 'Ganjil',
    year: 2024,
    status: 'pending',
    applicationDate: '2024-09-10',
    ipk: 3.38
  },
]

const scholarshipTypeConfig = {
  prestasi: { label: 'Prestasi', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  kip: { label: 'KIP Kuliah', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  'bbp-ppa': { label: 'BBP-PPA', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  daerah: { label: 'Pemda', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-200' },
  perusahaan: { label: 'Perusahaan', color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700', borderColor: 'border-indigo-200' },
  internal: { label: 'Internal', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-100', textColor: 'text-pink-700', borderColor: 'border-pink-200' },
}

const statusConfig = {
  pending: { label: 'Menunggu', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock },
  approved: { label: 'Disetujui', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
  rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
  disbursed: { label: 'Dicairkan', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: DollarSign },
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const getInitials = (name: string) => {
  const words = name.split(' ').filter(word => word.length > 0)
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

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

export default function ScholarshipsPage() {
  const [scholarships] = useState<Scholarship[]>(mockScholarships)
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedProdi, setSelectedProdi] = useState("all")

  const openViewDialog = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship)
    setIsViewDialogOpen(true)
  }

  const pendingScholarships = scholarships.filter(s => s.status === 'pending')
  const approvedScholarships = scholarships.filter(s => s.status === 'approved')
  const disbursedScholarships = scholarships.filter(s => s.status === 'disbursed')
  const totalRecipients = scholarships.filter(s => s.status === 'approved' || s.status === 'disbursed').length
  const totalAmount = scholarships
    .filter(s => s.status === 'disbursed')
    .reduce((sum, s) => sum + s.amount, 0)

  const filterScholarships = (scholarshipList: Scholarship[]) => {
    let filtered = scholarshipList

    if (selectedType !== 'all') {
      filtered = filtered.filter(s => s.scholarshipType === selectedType)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(s => s.status === selectedStatus)
    }

    if (selectedProdi !== 'all') {
      filtered = filtered.filter(s => s.prodi === selectedProdi)
    }

    if (searchQuery) {
      filtered = filtered.filter(s =>
        s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.nim.includes(searchQuery) ||
        s.scholarshipName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredScholarships = filterScholarships(scholarships)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Beasiswa Mahasiswa</h1>
          <p className="text-xs text-muted-foreground mt-1">Pengelolaan dan monitoring beasiswa mahasiswa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="h-3 w-3 mr-1.5" />
            Export
          </Button>
          <Button size="sm" className="h-8 text-xs" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-3 w-3 mr-1.5" />
            Tambah
          </Button>
        </div>
      </div>

      {/* Overall Statistics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-blue-900">Total Pengajuan</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{scholarships.length}</div>
            <p className="text-[10px] text-blue-700/80 mt-0.5">Seluruh pengajuan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-amber-900">Menunggu</CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{pendingScholarships.length}</div>
            <p className="text-[10px] text-amber-700/80 mt-0.5">Perlu review</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-green-900">Penerima</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{totalRecipients}</div>
            <p className="text-[10px] text-green-700/80 mt-0.5">Mahasiswa</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-purple-900">Dicairkan</CardTitle>
            <div className="p-1.5 bg-purple-500/10 rounded-lg">
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{disbursedScholarships.length}</div>
            <p className="text-[10px] text-purple-700/80 mt-0.5">Beasiswa tersalurkan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-cyan-50 to-cyan-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-cyan-900">Total Dana</CardTitle>
            <div className="p-1.5 bg-cyan-500/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-cyan-900">{formatCurrency(totalAmount).replace(/,00$/, '')}</div>
            <p className="text-[10px] text-cyan-700/80 mt-0.5">Dana tersalurkan</p>
          </CardContent>
        </Card>
      </div>

      {/* Scholarship Type Cards */}
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(scholarshipTypeConfig).map(([key, config]) => {
          const count = scholarships.filter(s => s.scholarshipType === key).length
          const amount = scholarships
            .filter(s => s.scholarshipType === key && s.status === 'disbursed')
            .reduce((sum, s) => sum + s.amount, 0)

          return (
            <Card
              key={key}
              className={`overflow-hidden border-0 bg-gradient-to-br ${config.color} cursor-pointer hover:shadow-lg transition-all hover:scale-105`}
              onClick={() => setSelectedType(key)}
            >
              <CardHeader className="p-3 text-white">
                <div className="flex items-center justify-between mb-1.5">
                  <Award className="h-4 w-4" />
                  <Badge className="bg-white/20 text-white border-white/30 text-[10px] px-1.5 py-0">
                    {count}
                  </Badge>
                </div>
                <CardTitle className="text-xs font-semibold leading-tight">{config.label}</CardTitle>
                <p className="text-[10px] opacity-90 mt-0.5">{formatCurrency(amount).replace(/,00$/, '')}</p>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIM, atau nama beasiswa..."
                className="pl-9 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[180px] h-9 text-sm">
                <SelectValue placeholder="Jenis Beasiswa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">Semua Jenis</SelectItem>
                <SelectItem value="prestasi" className="text-sm">🏆 Prestasi</SelectItem>
                <SelectItem value="kip" className="text-sm">📚 KIP Kuliah</SelectItem>
                <SelectItem value="bbp-ppa" className="text-sm">💼 BBP-PPA</SelectItem>
                <SelectItem value="daerah" className="text-sm">🏛️ Pemda</SelectItem>
                <SelectItem value="perusahaan" className="text-sm">🏢 Perusahaan</SelectItem>
                <SelectItem value="internal" className="text-sm">🎓 Internal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProdi} onValueChange={setSelectedProdi}>
              <SelectTrigger className="w-full md:w-[180px] h-9 text-sm">
                <SelectValue placeholder="Program Studi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">Semua Prodi</SelectItem>
                <SelectItem value="Informatika" className="text-sm">💻 Informatika</SelectItem>
                <SelectItem value="Teknik Sipil" className="text-sm">🏗️ Teknik Sipil</SelectItem>
                <SelectItem value="Arsitektur" className="text-sm">🏛️ Arsitektur</SelectItem>
                <SelectItem value="Teknik Elektro" className="text-sm">⚡ Teknik Elektro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px] h-9 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">Semua Status</SelectItem>
                <SelectItem value="pending" className="text-sm">Menunggu</SelectItem>
                <SelectItem value="approved" className="text-sm">Disetujui</SelectItem>
                <SelectItem value="disbursed" className="text-sm">Dicairkan</SelectItem>
                <SelectItem value="rejected" className="text-sm">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-base font-semibold">
            {filteredScholarships.length} Beasiswa Ditemukan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs font-semibold h-10">Mahasiswa</TableHead>
                  <TableHead className="text-xs font-semibold h-10">NIM</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Prodi</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Beasiswa</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Jenis</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">IPK</TableHead>
                  <TableHead className="text-right text-xs font-semibold h-10">Nominal</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">Status</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredScholarships.length > 0 ? (
                  filteredScholarships.map((scholarship) => {
                    const typeConfig = scholarshipTypeConfig[scholarship.scholarshipType]

                    return (
                      <TableRow key={scholarship.id} className="hover:bg-muted/30 h-14">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(scholarship.studentName)} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
                              {getInitials(scholarship.studentName)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{scholarship.studentName}</p>
                              <p className="text-[10px] text-muted-foreground">
                                {scholarship.semester} {scholarship.year}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2 py-0.5">
                            {scholarship.nim}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-3 w-3 text-blue-600 flex-shrink-0" />
                            <span className="text-xs font-medium">{scholarship.prodi}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs font-medium">{scholarship.scholarshipName}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {formatDate(scholarship.applicationDate)}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs px-2 py-0.5 border ${typeConfig.bgColor} ${typeConfig.textColor} ${typeConfig.borderColor}`}>
                            {typeConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`text-sm font-bold ${
                            scholarship.ipk >= 3.5 ? 'text-green-600' : scholarship.ipk >= 3.0 ? 'text-blue-600' : 'text-orange-600'
                          }`}>
                            {scholarship.ipk.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="text-sm font-bold text-green-600">
                            {formatCurrency(scholarship.amount).replace(/,00$/, '')}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-xs px-2 py-0.5 border ${statusConfig[scholarship.status].color}`}>
                            {statusConfig[scholarship.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => openViewDialog(scholarship)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Award className="h-10 w-10 mb-2 opacity-50" />
                        <p className="text-sm font-medium">Tidak ada data beasiswa ditemukan</p>
                        <p className="text-xs mt-0.5">Coba ubah filter atau kata kunci pencarian</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-3 md:grid-cols-2">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Distribusi per Prodi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {['Informatika', 'Teknik Sipil', 'Arsitektur', 'Teknik Elektro'].map((prodi) => {
              const count = scholarships.filter(s => s.prodi === prodi && (s.status === 'approved' || s.status === 'disbursed')).length
              return (
                <div key={prodi} className="flex items-center gap-2">
                  <div className="w-28 text-xs font-medium">{prodi}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-end px-2"
                      style={{ width: `${(count / totalRecipients) * 100}%` }}
                    >
                      <span className="text-[10px] font-medium text-white">{count}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Status Pengajuan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Menunggu', count: pendingScholarships.length, color: 'bg-amber-500' },
              { label: 'Disetujui', count: approvedScholarships.length, color: 'bg-green-500' },
              { label: 'Dicairkan', count: disbursedScholarships.length, color: 'bg-blue-500' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2">
                <div className="w-28 text-xs font-medium">{stat.label}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                  <div
                    className={`h-full ${stat.color} flex items-center justify-end px-2`}
                    style={{ width: `${(stat.count / scholarships.length) * 100}%` }}
                  >
                    <span className="text-[10px] font-medium text-white">{stat.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Detail Beasiswa
            </DialogTitle>
            <DialogDescription>Informasi lengkap penerima beasiswa</DialogDescription>
          </DialogHeader>

          {selectedScholarship && (
            <div className="space-y-4 py-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{selectedScholarship.scholarshipName}</CardTitle>
                    <Badge className={`text-sm px-3 py-1 border ${statusConfig[selectedScholarship.status].color}`}>
                      {statusConfig[selectedScholarship.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Nama Mahasiswa</Label>
                      <p className="text-sm font-medium">{selectedScholarship.studentName}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">NIM</Label>
                      <p className="text-sm font-medium">{selectedScholarship.nim}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Program Studi</Label>
                      <p className="text-sm font-medium">{selectedScholarship.prodi}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">IPK</Label>
                      <p className="text-sm font-medium">{selectedScholarship.ipk.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Jenis Beasiswa</Label>
                      <p className="text-sm font-medium">
                        {scholarshipTypeConfig[selectedScholarship.scholarshipType].label}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Periode</Label>
                      <p className="text-sm font-medium">
                        {selectedScholarship.semester} {selectedScholarship.year}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Tanggal Pengajuan</Label>
                      <p className="text-sm font-medium">{formatDate(selectedScholarship.applicationDate)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Nominal Beasiswa</Label>
                      <p className="text-base font-bold text-green-600">
                        {formatCurrency(selectedScholarship.amount)}
                      </p>
                    </div>
                  </div>

                  {selectedScholarship.achievements && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Prestasi/Pencapaian</Label>
                      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-700 font-medium">{selectedScholarship.achievements}</p>
                      </div>
                    </div>
                  )}

                  {selectedScholarship.notes && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Catatan</Label>
                      <p className="text-sm mt-1">{selectedScholarship.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Tutup
            </Button>
            {selectedScholarship?.status === 'pending' && (
              <>
                <Button variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Tolak
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Setujui
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Tambah Penerima Beasiswa
            </DialogTitle>
            <DialogDescription>Tambahkan data penerima beasiswa baru</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="studentName">Nama Mahasiswa</Label>
                <Input id="studentName" placeholder="Nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nim">NIM</Label>
                <Input id="nim" placeholder="Nomor induk mahasiswa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prodi">Program Studi</Label>
                <Select>
                  <SelectTrigger id="prodi">
                    <SelectValue placeholder="Pilih prodi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Informatika">Informatika</SelectItem>
                    <SelectItem value="Teknik Sipil">Teknik Sipil</SelectItem>
                    <SelectItem value="Arsitektur">Arsitektur</SelectItem>
                    <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ipk">IPK</Label>
                <Input id="ipk" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholarshipType">Jenis Beasiswa</Label>
                <Select>
                  <SelectTrigger id="scholarshipType">
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prestasi">Prestasi</SelectItem>
                    <SelectItem value="kip">KIP Kuliah</SelectItem>
                    <SelectItem value="bbp-ppa">BBP-PPA</SelectItem>
                    <SelectItem value="daerah">Pemda</SelectItem>
                    <SelectItem value="perusahaan">Perusahaan</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholarshipName">Nama Beasiswa</Label>
                <Input id="scholarshipName" placeholder="Nama program beasiswa" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Nominal (Rp)</Label>
                <Input id="amount" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select>
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Pilih semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ganjil">Ganjil</SelectItem>
                    <SelectItem value="Genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="achievements">Prestasi/Pencapaian (Opsional)</Label>
              <Textarea id="achievements" placeholder="Deskripsi prestasi atau pencapaian" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Catatan (Opsional)</Label>
              <Textarea id="notes" placeholder="Catatan tambahan" rows={2} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Simpan Data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
