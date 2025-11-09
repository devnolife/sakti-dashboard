"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  UserCheck,
  GraduationCap,
  Briefcase,
  Award,
  Download,
  Search,
  Eye,
  TrendingUp,
  BookOpen,
  Clock,
  Target,
  BarChart3,
  Calendar
} from "lucide-react"

interface Employee {
  id: string
  name: string
  nip: string
  position: "dosen" | "tendik" | "admin"
  department: string
  status: "aktif" | "cuti" | "pensiun"
  educationLevel: "S1" | "S2" | "S3"
  jabatanFungsional?: string
  workYears: number
  certifications?: string[]
  performanceScore?: number
  researchCount?: number
  teachingHours?: number
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Dr. Ahmad Sulaiman, S.Kom., M.T.',
    nip: '198501012010011001',
    position: 'dosen',
    department: 'Informatika',
    status: 'aktif',
    educationLevel: 'S3',
    jabatanFungsional: 'Lektor Kepala',
    workYears: 14,
    certifications: ['Certified Educator', 'AWS Certified'],
    performanceScore: 92,
    researchCount: 25,
    teachingHours: 12
  },
  {
    id: '2',
    name: 'Ir. Siti Nurhaliza, M.T.',
    nip: '198703152011012002',
    position: 'dosen',
    department: 'Teknik Sipil',
    status: 'aktif',
    educationLevel: 'S2',
    jabatanFungsional: 'Lektor',
    workYears: 13,
    performanceScore: 88,
    researchCount: 18,
    teachingHours: 14
  },
  {
    id: '3',
    name: 'Dr. Budi Santoso, S.T., M.Eng.',
    nip: '198206102009011003',
    position: 'dosen',
    department: 'Arsitektur',
    status: 'aktif',
    educationLevel: 'S3',
    jabatanFungsional: 'Lektor Kepala',
    workYears: 15,
    performanceScore: 95,
    researchCount: 30,
    teachingHours: 10
  },
  {
    id: '4',
    name: 'Dewi Lestari, S.Kom., M.Kom.',
    nip: '199002202015012004',
    position: 'dosen',
    department: 'Informatika',
    status: 'aktif',
    educationLevel: 'S2',
    jabatanFungsional: 'Asisten Ahli',
    workYears: 9,
    performanceScore: 85,
    researchCount: 12,
    teachingHours: 16
  },
  {
    id: '5',
    name: 'Agus Setiawan, S.T.',
    nip: '198905152014031005',
    position: 'tendik',
    department: 'Lab Komputer',
    status: 'aktif',
    educationLevel: 'S1',
    workYears: 10,
    performanceScore: 87
  },
  {
    id: '6',
    name: 'Maya Sari, S.E.',
    nip: '199101102016012006',
    position: 'admin',
    department: 'Administrasi Umum',
    status: 'aktif',
    educationLevel: 'S1',
    workYears: 8,
    performanceScore: 90
  },
  {
    id: '7',
    name: 'Prof. Dr. Ir. Hendra Gunawan, M.Sc.',
    nip: '197508201998011007',
    position: 'dosen',
    department: 'Teknik Elektro',
    status: 'aktif',
    educationLevel: 'S3',
    jabatanFungsional: 'Guru Besar',
    workYears: 26,
    performanceScore: 98,
    researchCount: 45,
    teachingHours: 8
  },
  {
    id: '8',
    name: 'Linda Susanti, S.Si., M.T.',
    nip: '198809152013012008',
    position: 'dosen',
    department: 'Teknik Sipil',
    status: 'cuti',
    educationLevel: 'S2',
    jabatanFungsional: 'Lektor',
    workYears: 11,
    performanceScore: 86,
    researchCount: 15,
    teachingHours: 12
  },
]

const getInitials = (name: string) => {
  const words = name.split(' ').filter(word => word.length > 0 && !word.includes('.'))
  if (words.length === 0) return 'NA'
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
  ]
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

export default function SDMPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const totalEmployees = mockEmployees.length
  const dosenCount = mockEmployees.filter(e => e.position === 'dosen').length
  const tendikCount = mockEmployees.filter(e => e.position === 'tendik').length
  const adminCount = mockEmployees.filter(e => e.position === 'admin').length
  const s3Count = mockEmployees.filter(e => e.educationLevel === 'S3').length
  const avgPerformance = mockEmployees.reduce((sum, e) => sum + (e.performanceScore || 0), 0) / mockEmployees.filter(e => e.performanceScore).length

  const filterEmployees = (employees: Employee[]) => {
    let filtered = employees

    if (selectedPosition !== 'all') {
      filtered = filtered.filter(e => e.position === selectedPosition)
    }

    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(e => e.department === selectedDepartment)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(e => e.status === selectedStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.nip.includes(searchQuery)
      )
    }

    return filtered
  }

  const filteredEmployees = filterEmployees(mockEmployees)

  const departments = Array.from(new Set(mockEmployees.map(e => e.department)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen SDM</h1>
          <p className="text-sm text-muted-foreground mt-1">Pengelolaan sumber daya manusia fakultas</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="overflow-hidden border-l-4 border-l-blue-500">
          <CardHeader className="py-4 bg-gradient-to-br from-blue-50 to-blue-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-blue-900">Total SDM</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-sm text-muted-foreground mt-1">Pegawai aktif</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-purple-500">
          <CardHeader className="py-4 bg-gradient-to-br from-purple-50 to-purple-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-purple-900">Dosen</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <GraduationCap className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-purple-600">{dosenCount}</div>
            <p className="text-sm text-muted-foreground mt-1">{((dosenCount / totalEmployees) * 100).toFixed(0)}% dari total</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-green-500">
          <CardHeader className="py-4 bg-gradient-to-br from-green-50 to-green-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-green-900">Tendik</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-600">{tendikCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Tenaga kependidikan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-amber-500">
          <CardHeader className="py-4 bg-gradient-to-br from-amber-50 to-amber-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-amber-900">Doktor (S3)</CardTitle>
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-amber-600">{s3Count}</div>
            <p className="text-sm text-muted-foreground mt-1">{((s3Count / dosenCount) * 100).toFixed(0)}% dosen</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-l-4 border-l-cyan-500">
          <CardHeader className="py-4 bg-gradient-to-br from-cyan-50 to-cyan-100/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-cyan-900">Performa Avg</CardTitle>
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-cyan-600">{avgPerformance.toFixed(1)}</div>
            <p className="text-sm text-muted-foreground mt-1">Skor rata-rata</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-10">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="dosen" className="text-sm">Data Dosen</TabsTrigger>
          <TabsTrigger value="all" className="text-sm">Semua Pegawai</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Composition */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg font-semibold">Komposisi SDM</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Dosen</span>
                    <span className="text-sm font-bold">{dosenCount} orang</span>
                  </div>
                  <Progress value={(dosenCount / totalEmployees) * 100} className="h-3 [&>div]:bg-purple-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Tendik</span>
                    <span className="text-sm font-bold">{tendikCount} orang</span>
                  </div>
                  <Progress value={(tendikCount / totalEmployees) * 100} className="h-3 [&>div]:bg-green-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Admin</span>
                    <span className="text-sm font-bold">{adminCount} orang</span>
                  </div>
                  <Progress value={(adminCount / totalEmployees) * 100} className="h-3 [&>div]:bg-blue-500" />
                </div>
              </CardContent>
            </Card>

            {/* Education Level */}
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-lg font-semibold">Kualifikasi Pendidikan Dosen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {['S3', 'S2', 'S1'].map(level => {
                  const count = mockEmployees.filter(e => e.position === 'dosen' && e.educationLevel === level).length
                  return (
                    <div key={level}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">{level}</span>
                        <span className="text-sm font-bold">{count} dosen ({((count / dosenCount) * 100).toFixed(0)}%)</span>
                      </div>
                      <Progress
                        value={(count / dosenCount) * 100}
                        className={`h-3 ${
                          level === 'S3' ? '[&>div]:bg-amber-500' :
                          level === 'S2' ? '[&>div]:bg-blue-500' :
                          '[&>div]:bg-green-500'
                        }`}
                      />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="md:col-span-2">
              <CardHeader className="py-4">
                <CardTitle className="text-lg font-semibold">Distribusi Kinerja</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: 'Excellent', min: 90, color: 'from-green-500 to-emerald-500' },
                    { label: 'Good', min: 80, max: 89, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Fair', min: 70, max: 79, color: 'from-amber-500 to-orange-500' },
                    { label: 'Needs Improvement', max: 69, color: 'from-red-500 to-rose-500' },
                  ].map(category => {
                    const count = mockEmployees.filter(e =>
                      e.performanceScore &&
                      e.performanceScore >= (category.min || 0) &&
                      e.performanceScore <= (category.max || 100)
                    ).length
                    return (
                      <Card key={category.label} className={`overflow-hidden bg-gradient-to-br ${category.color} text-white`}>
                        <CardContent className="pt-6 text-center">
                          <p className="text-3xl font-bold">{count}</p>
                          <p className="text-sm mt-1 opacity-90">{category.label}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Dosen Tab */}
        <TabsContent value="dosen" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockEmployees.filter(e => e.position === 'dosen').map(dosen => (
              <Card key={dosen.id} className="overflow-hidden">
                <CardHeader className="py-4 bg-gradient-to-br from-purple-50 to-purple-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(dosen.name)} flex items-center justify-center text-white font-bold`}>
                      {getInitials(dosen.name)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base font-semibold leading-tight">{dosen.name}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">{dosen.nip}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Pendidikan</p>
                      <Badge className="mt-1 bg-amber-100 text-amber-700 border-amber-200">{dosen.educationLevel}</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Jabatan</p>
                      <p className="font-medium text-xs mt-1">{dosen.jabatanFungsional || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Departemen</p>
                      <p className="font-medium text-xs mt-1">{dosen.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Masa Kerja</p>
                      <p className="font-medium text-xs mt-1">{dosen.workYears} tahun</p>
                    </div>
                  </div>

                  {dosen.performanceScore && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Kinerja</span>
                        <span className="font-bold">{dosen.performanceScore}/100</span>
                      </div>
                      <Progress value={dosen.performanceScore} className="h-2" />
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t text-center">
                    {dosen.researchCount !== undefined && (
                      <div>
                        <p className="text-lg font-bold text-blue-600">{dosen.researchCount}</p>
                        <p className="text-xs text-muted-foreground">Penelitian</p>
                      </div>
                    )}
                    {dosen.teachingHours !== undefined && (
                      <div>
                        <p className="text-lg font-bold text-green-600">{dosen.teachingHours}</p>
                        <p className="text-xs text-muted-foreground">SKS</p>
                      </div>
                    )}
                    {dosen.certifications && (
                      <div>
                        <p className="text-lg font-bold text-purple-600">{dosen.certifications.length}</p>
                        <p className="text-xs text-muted-foreground">Sertifikat</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* All Employees Tab */}
        <TabsContent value="all" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="pt-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama atau NIP..."
                    className="pl-9 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="w-full md:w-[180px] h-10">
                    <SelectValue placeholder="Posisi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Posisi</SelectItem>
                    <SelectItem value="dosen">Dosen</SelectItem>
                    <SelectItem value="tendik">Tendik</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-full md:w-[200px] h-10">
                    <SelectValue placeholder="Departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Departemen</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full md:w-[150px] h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="cuti">Cuti</SelectItem>
                    <SelectItem value="pensiun">Pensiun</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Employee List */}
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-lg font-semibold">
                {filteredEmployees.length} Pegawai Ditemukan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredEmployees.map(employee => {
                  const positionConfig = {
                    dosen: { label: 'Dosen', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                    tendik: { label: 'Tendik', color: 'bg-green-100 text-green-700 border-green-200' },
                    admin: { label: 'Admin', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                  }

                  const config = positionConfig[employee.position]

                  return (
                    <Card key={employee.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-full ${getAvatarColor(employee.name)} flex items-center justify-center text-white font-bold`}>
                              {getInitials(employee.name)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{employee.name}</h3>
                                <Badge className={`text-xs px-2 py-0.5 border ${config.color}`}>
                                  {config.label}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span>{employee.nip}</span>
                                <span>•</span>
                                <span>{employee.department}</span>
                                {employee.jabatanFungsional && (
                                  <>
                                    <span>•</span>
                                    <span>{employee.jabatanFungsional}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">{employee.educationLevel}</Badge>
                            <p className="text-sm text-muted-foreground">{employee.workYears} tahun kerja</p>
                            {employee.performanceScore && (
                              <div className="mt-2">
                                <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                                  Performa: {employee.performanceScore}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {filteredEmployees.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground mt-3">Tidak ada pegawai ditemukan</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
