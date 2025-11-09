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
import { Users, Briefcase, TrendingUp, Search, Download, Eye, GraduationCap, MapPin, Award, Building2, DollarSign } from "lucide-react"

interface Alumni {
  id: string
  name: string
  nim: string
  prodi: string
  angkatan: string
  graduationYear: number
  ipk: number
  predicate: "Summa Cum Laude" | "Magna Cum Laude" | "Cum Laude" | "Sangat Memuaskan" | "Memuaskan"
  currentJob?: string
  company?: string
  position?: string
  salary?: number
  industry?: string
  city?: string
  employmentStatus: "employed" | "entrepreneur" | "continuing-study" | "unemployed"
  email?: string
  phone?: string
  linkedIn?: string
  achievements?: string
}

const mockAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Linda Susanti',
    nim: '2018101016',
    prodi: 'Informatika',
    angkatan: '2018',
    graduationYear: 2022,
    ipk: 3.89,
    predicate: 'Summa Cum Laude',
    currentJob: 'Software Engineer',
    company: 'Google Indonesia',
    position: 'Senior Software Engineer',
    salary: 35000000,
    industry: 'Technology',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'linda.susanti@gmail.com',
    phone: '081234567890',
    achievements: 'Best Graduate 2022, Published 2 research papers'
  },
  {
    id: '2',
    name: 'Rizki Ramadhan',
    nim: '2018101017',
    prodi: 'Arsitektur',
    angkatan: '2018',
    graduationYear: 2022,
    ipk: 3.78,
    predicate: 'Cum Laude',
    currentJob: 'Architect',
    company: 'Urbane Indonesia',
    position: 'Junior Architect',
    salary: 12000000,
    industry: 'Architecture',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'rizki.ramadhan@gmail.com',
    phone: '081234567891'
  },
  {
    id: '3',
    name: 'Ahmad Firdaus',
    nim: '2017101018',
    prodi: 'Informatika',
    angkatan: '2017',
    graduationYear: 2021,
    ipk: 3.92,
    predicate: 'Summa Cum Laude',
    currentJob: 'Tech Entrepreneur',
    company: 'TechStart Indonesia',
    position: 'CEO & Founder',
    salary: 50000000,
    industry: 'Technology',
    city: 'Bandung',
    employmentStatus: 'entrepreneur',
    email: 'ahmad.firdaus@techstart.id',
    phone: '081234567892',
    achievements: 'Founded startup with $500K funding'
  },
  {
    id: '4',
    name: 'Siti Rahma',
    nim: '2018101019',
    prodi: 'Teknik Sipil',
    angkatan: '2018',
    graduationYear: 2022,
    ipk: 3.65,
    predicate: 'Cum Laude',
    currentJob: 'Civil Engineer',
    company: 'PT Wijaya Karya',
    position: 'Site Engineer',
    salary: 15000000,
    industry: 'Construction',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'siti.rahma@gmail.com',
    phone: '081234567893'
  },
  {
    id: '5',
    name: 'Budi Hartono',
    nim: '2017101020',
    prodi: 'Teknik Elektro',
    angkatan: '2017',
    graduationYear: 2021,
    ipk: 3.55,
    predicate: 'Cum Laude',
    currentJob: 'Master Student',
    company: 'ITB',
    position: 'Research Assistant',
    industry: 'Education',
    city: 'Bandung',
    employmentStatus: 'continuing-study',
    email: 'budi.hartono@students.itb.ac.id',
    phone: '081234567894'
  },
  {
    id: '6',
    name: 'Dewi Anggraini',
    nim: '2018101021',
    prodi: 'Informatika',
    angkatan: '2018',
    graduationYear: 2022,
    ipk: 3.72,
    predicate: 'Cum Laude',
    currentJob: 'Data Scientist',
    company: 'Tokopedia',
    position: 'Data Scientist',
    salary: 28000000,
    industry: 'E-commerce',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'dewi.anggraini@tokopedia.com',
    phone: '081234567895'
  },
  {
    id: '7',
    name: 'Eko Prasetyo',
    nim: '2017101022',
    prodi: 'Arsitektur',
    angkatan: '2017',
    graduationYear: 2021,
    ipk: 3.68,
    predicate: 'Cum Laude',
    currentJob: 'Freelance Architect',
    position: 'Freelancer',
    salary: 18000000,
    industry: 'Architecture',
    city: 'Surabaya',
    employmentStatus: 'entrepreneur',
    email: 'eko.prasetyo@gmail.com',
    phone: '081234567896'
  },
  {
    id: '8',
    name: 'Fitri Handayani',
    nim: '2018101023',
    prodi: 'Teknik Sipil',
    angkatan: '2018',
    graduationYear: 2022,
    ipk: 3.45,
    predicate: 'Sangat Memuaskan',
    currentJob: 'Project Engineer',
    company: 'PT Adhi Karya',
    position: 'Junior Engineer',
    salary: 11000000,
    industry: 'Construction',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'fitri.handayani@gmail.com',
    phone: '081234567897'
  },
  {
    id: '9',
    name: 'Hendra Gunawan',
    nim: '2017101024',
    prodi: 'Informatika',
    angkatan: '2017',
    graduationYear: 2021,
    ipk: 3.81,
    predicate: 'Magna Cum Laude',
    currentJob: 'Backend Developer',
    company: 'Gojek',
    position: 'Backend Engineer',
    salary: 32000000,
    industry: 'Technology',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'hendra.gunawan@gojek.com',
    phone: '081234567898'
  },
  {
    id: '10',
    name: 'Indah Permata',
    nim: '2018101025',
    prodi: 'Teknik Elektro',
    angkatan: '2018',
    graduationYear: 2022,
    ipk: 3.58,
    predicate: 'Cum Laude',
    currentJob: 'Electrical Engineer',
    company: 'PT PLN',
    position: 'Engineer',
    salary: 13000000,
    industry: 'Energy',
    city: 'Jakarta',
    employmentStatus: 'employed',
    email: 'indah.permata@pln.co.id',
    phone: '081234567899'
  },
]

const predicateConfig = {
  'Summa Cum Laude': { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: '🏆' },
  'Magna Cum Laude': { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: '🥇' },
  'Cum Laude': { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: '🥈' },
  'Sangat Memuaskan': { color: 'bg-green-100 text-green-700 border-green-200', icon: '✓' },
  'Memuaskan': { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: '✓' },
}

const employmentStatusConfig = {
  employed: { label: 'Bekerja', color: 'bg-green-100 text-green-700 border-green-200', icon: Briefcase },
  entrepreneur: { label: 'Wirausaha', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: TrendingUp },
  'continuing-study': { label: 'Studi Lanjut', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: GraduationCap },
  unemployed: { label: 'Belum Bekerja', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Users },
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
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

export default function AlumniPage() {
  const [alumni] = useState<Alumni[]>(mockAlumni)
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProdi, setSelectedProdi] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  const openViewDialog = (alumnus: Alumni) => {
    setSelectedAlumni(alumnus)
    setIsViewDialogOpen(true)
  }

  const employedAlumni = alumni.filter(a => a.employmentStatus === 'employed')
  const entrepreneurAlumni = alumni.filter(a => a.employmentStatus === 'entrepreneur')
  const studyingAlumni = alumni.filter(a => a.employmentStatus === 'continuing-study')
  const cumLaudeAlumni = alumni.filter(a => a.predicate.includes('Cum Laude'))
  const avgSalary = employedAlumni.length > 0
    ? employedAlumni.reduce((sum, a) => sum + (a.salary || 0), 0) / employedAlumni.length
    : 0

  const filterAlumni = (alumniList: Alumni[]) => {
    let filtered = alumniList

    if (selectedProdi !== 'all') {
      filtered = filtered.filter(a => a.prodi === selectedProdi)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(a => a.employmentStatus === selectedStatus)
    }

    if (selectedYear !== 'all') {
      filtered = filtered.filter(a => a.graduationYear.toString() === selectedYear)
    }

    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.nim.includes(searchQuery) ||
        (a.company && a.company.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return filtered
  }

  const filteredAlumni = filterAlumni(alumni)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alumni</h1>
          <p className="text-xs text-muted-foreground mt-1">Data dan tracking alumni fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="h-3 w-3 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Overall Statistics Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-blue-900">Total Alumni</CardTitle>
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{alumni.length}</div>
            <p className="text-[10px] text-blue-700/80 mt-0.5">Seluruh alumni</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-green-900">Bekerja</CardTitle>
            <div className="p-1.5 bg-green-500/10 rounded-lg">
              <Briefcase className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{employedAlumni.length}</div>
            <p className="text-[10px] text-green-700/80 mt-0.5">{((employedAlumni.length / alumni.length) * 100).toFixed(1)}% dari total</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-purple-900">Wirausaha</CardTitle>
            <div className="p-1.5 bg-purple-500/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{entrepreneurAlumni.length}</div>
            <p className="text-[10px] text-purple-700/80 mt-0.5">Entrepreneur</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-amber-900">Cum Laude</CardTitle>
            <div className="p-1.5 bg-amber-500/10 rounded-lg">
              <Award className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">{cumLaudeAlumni.length}</div>
            <p className="text-[10px] text-amber-700/80 mt-0.5">Lulusan terbaik</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-cyan-50 to-cyan-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-cyan-900">Rata-rata Gaji</CardTitle>
            <div className="p-1.5 bg-cyan-500/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-cyan-900">{formatCurrency(avgSalary).replace(/,00$/, '')}</div>
            <p className="text-[10px] text-cyan-700/80 mt-0.5">Per bulan</p>
          </CardContent>
        </Card>
      </div>

      {/* Employment Status Cards */}
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(employmentStatusConfig).map(([key, config]) => {
          const Icon = config.icon
          const count = alumni.filter(a => a.employmentStatus === key).length
          const percentage = ((count / alumni.length) * 100).toFixed(1)

          return (
            <Card
              key={key}
              className="overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => setSelectedStatus(key)}
            >
              <CardHeader className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className="h-4 w-4 text-slate-600" />
                  <Badge className="bg-white/80 text-slate-700 border-slate-200 text-[10px] px-1.5 py-0">
                    {count}
                  </Badge>
                </div>
                <CardTitle className="text-xs font-semibold leading-tight text-slate-700">{config.label}</CardTitle>
                <p className="text-[10px] text-slate-600 mt-0.5">{percentage}% alumni</p>
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
                placeholder="Cari nama, NIM, atau perusahaan..."
                className="pl-9 h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                <SelectItem value="employed" className="text-sm">Bekerja</SelectItem>
                <SelectItem value="entrepreneur" className="text-sm">Wirausaha</SelectItem>
                <SelectItem value="continuing-study" className="text-sm">Studi Lanjut</SelectItem>
                <SelectItem value="unemployed" className="text-sm">Belum Bekerja</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full md:w-[150px] h-9 text-sm">
                <SelectValue placeholder="Tahun Lulus" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">Semua Tahun</SelectItem>
                <SelectItem value="2022" className="text-sm">2022</SelectItem>
                <SelectItem value="2021" className="text-sm">2021</SelectItem>
                <SelectItem value="2020" className="text-sm">2020</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="py-3">
          <CardTitle className="text-base font-semibold">
            {filteredAlumni.length} Alumni Ditemukan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs font-semibold h-10">Alumni</TableHead>
                  <TableHead className="text-xs font-semibold h-10">NIM</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Prodi</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">IPK</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Predikat</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Pekerjaan/Perusahaan</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Lokasi</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">Status</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlumni.length > 0 ? (
                  filteredAlumni.map((alumnus) => {
                    const predicateConf = predicateConfig[alumnus.predicate]
                    const statusConf = employmentStatusConfig[alumnus.employmentStatus]
                    const StatusIcon = statusConf.icon

                    return (
                      <TableRow key={alumnus.id} className="hover:bg-muted/30 h-14">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(alumnus.name)} flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
                              {getInitials(alumnus.name)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{alumnus.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                Lulus {alumnus.graduationYear}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-slate-100 text-slate-700 border border-slate-200 text-xs px-2 py-0.5">
                            {alumnus.nim}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="h-3 w-3 text-blue-600 flex-shrink-0" />
                            <span className="text-xs font-medium">{alumnus.prodi}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`text-sm font-bold ${
                            alumnus.ipk >= 3.75 ? 'text-yellow-600' : alumnus.ipk >= 3.5 ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {alumnus.ipk.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs px-2 py-0.5 border ${predicateConf.color}`}>
                            {predicateConf.icon} {alumnus.predicate}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {alumnus.currentJob && (
                            <div>
                              <p className="text-xs font-medium">{alumnus.position || alumnus.currentJob}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Building2 className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                <p className="text-[10px] text-muted-foreground">{alumnus.company || '-'}</p>
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {alumnus.city && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs">{alumnus.city}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-xs px-2 py-0.5 border ${statusConf.color}`}>
                            {statusConf.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => openViewDialog(alumnus)}
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
                        <Users className="h-10 w-10 mb-2 opacity-50" />
                        <p className="text-sm font-medium">Tidak ada data alumni ditemukan</p>
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
              const count = alumni.filter(a => a.prodi === prodi).length
              return (
                <div key={prodi} className="flex items-center gap-2">
                  <div className="w-28 text-xs font-medium">{prodi}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-end px-2"
                      style={{ width: `${(count / alumni.length) * 100}%` }}
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
            <CardTitle className="text-sm">Top Industries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {['Technology', 'Construction', 'Architecture', 'Education'].map((industry) => {
              const count = alumni.filter(a => a.industry === industry).length
              return (
                <div key={industry} className="flex items-center gap-2">
                  <div className="w-28 text-xs font-medium">{industry}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-end px-2"
                      style={{ width: `${(count / alumni.length) * 100}%` }}
                    >
                      <span className="text-[10px] font-medium text-white">{count}</span>
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
              Detail Alumni
            </DialogTitle>
            <DialogDescription>Informasi lengkap alumni</DialogDescription>
          </DialogHeader>

          {selectedAlumni && (
            <div className="space-y-4 py-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedAlumni.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{selectedAlumni.nim}</p>
                    </div>
                    <Badge className={`text-sm px-3 py-1 border ${employmentStatusConfig[selectedAlumni.employmentStatus].color}`}>
                      {employmentStatusConfig[selectedAlumni.employmentStatus].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Program Studi</Label>
                      <p className="text-sm font-medium">{selectedAlumni.prodi}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Angkatan</Label>
                      <p className="text-sm font-medium">{selectedAlumni.angkatan}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Tahun Lulus</Label>
                      <p className="text-sm font-medium">{selectedAlumni.graduationYear}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">IPK</Label>
                      <p className="text-sm font-medium">{selectedAlumni.ipk.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Predikat</Label>
                      <p className="text-sm font-medium">{selectedAlumni.predicate}</p>
                    </div>
                  </div>

                  {selectedAlumni.currentJob && (
                    <>
                      <hr />
                      <div>
                        <Label className="text-xs text-muted-foreground font-semibold">Informasi Pekerjaan</Label>
                        <div className="grid gap-3 md:grid-cols-2 mt-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">Posisi</Label>
                            <p className="text-sm font-medium">{selectedAlumni.position || selectedAlumni.currentJob}</p>
                          </div>
                          {selectedAlumni.company && (
                            <div>
                              <Label className="text-xs text-muted-foreground">Perusahaan</Label>
                              <p className="text-sm font-medium">{selectedAlumni.company}</p>
                            </div>
                          )}
                          {selectedAlumni.industry && (
                            <div>
                              <Label className="text-xs text-muted-foreground">Industri</Label>
                              <p className="text-sm font-medium">{selectedAlumni.industry}</p>
                            </div>
                          )}
                          {selectedAlumni.city && (
                            <div>
                              <Label className="text-xs text-muted-foreground">Lokasi</Label>
                              <p className="text-sm font-medium">{selectedAlumni.city}</p>
                            </div>
                          )}
                          {selectedAlumni.salary && (
                            <div>
                              <Label className="text-xs text-muted-foreground">Gaji</Label>
                              <p className="text-sm font-bold text-green-600">{formatCurrency(selectedAlumni.salary)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedAlumni.achievements && (
                    <>
                      <hr />
                      <div>
                        <Label className="text-xs text-muted-foreground">Pencapaian</Label>
                        <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-700 font-medium">{selectedAlumni.achievements}</p>
                        </div>
                      </div>
                    </>
                  )}

                  <hr />
                  <div>
                    <Label className="text-xs text-muted-foreground font-semibold">Kontak</Label>
                    <div className="grid gap-3 md:grid-cols-2 mt-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Email</Label>
                        <p className="text-sm font-medium">{selectedAlumni.email || '-'}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Telepon</Label>
                        <p className="text-sm font-medium">{selectedAlumni.phone || '-'}</p>
                      </div>
                    </div>
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
