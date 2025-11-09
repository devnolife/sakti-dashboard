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
import { Calendar, Users, TrendingUp, Search, Download, Eye, Plus, CheckCircle, Clock, XCircle, MapPin, Award, Activity } from "lucide-react"

interface ActivityData {
  id: string
  title: string
  category: "lomba" | "seminar" | "workshop" | "bakti-sosial" | "olahraga" | "seni"
  organizer: string
  date: string
  location: string
  participants: number
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  description?: string
  coordinator?: string
  budget?: number
  achievements?: string
}

const mockActivities: ActivityData[] = [
  {
    id: '1',
    title: 'Kompetisi Pemrograman Nasional 2024',
    category: 'lomba',
    organizer: 'HMIF',
    date: '2024-12-15',
    location: 'Auditorium Utama',
    participants: 150,
    status: 'upcoming',
    coordinator: 'Budi Santoso',
    budget: 25000000,
    description: 'Kompetisi pemrograman tingkat nasional untuk mahasiswa',
    achievements: '3 tim lolos final nasional'
  },
  {
    id: '2',
    title: 'Seminar Teknologi AI & Machine Learning',
    category: 'seminar',
    organizer: 'Himpunan Mahasiswa',
    date: '2024-11-20',
    location: 'Ruang Seminar A',
    participants: 200,
    status: 'completed',
    coordinator: 'Dewi Lestari',
    budget: 15000000,
    description: 'Seminar dengan pembicara dari industri tech',
    achievements: 'Peserta mendapat sertifikat dan materi pembelajaran'
  },
  {
    id: '3',
    title: 'Workshop Digital Marketing',
    category: 'workshop',
    organizer: 'BEM Fakultas',
    date: '2024-11-25',
    location: 'Lab Komputer 3',
    participants: 80,
    status: 'ongoing',
    coordinator: 'Ahmad Fauzi',
    budget: 8000000,
    description: 'Pelatihan digital marketing untuk mahasiswa'
  },
  {
    id: '4',
    title: 'Bakti Sosial Desa Binaan',
    category: 'bakti-sosial',
    organizer: 'BEM Universitas',
    date: '2024-12-01',
    location: 'Desa Mekarsari',
    participants: 120,
    status: 'upcoming',
    coordinator: 'Siti Nurhaliza',
    budget: 20000000,
    description: 'Kegiatan pengabdian masyarakat di desa binaan'
  },
  {
    id: '5',
    title: 'Turnamen Futsal Antar Fakultas',
    category: 'olahraga',
    organizer: 'UKM Olahraga',
    date: '2024-12-10',
    location: 'Lapangan Futsal Kampus',
    participants: 180,
    status: 'upcoming',
    coordinator: 'Eko Prasetyo',
    budget: 12000000,
    description: 'Kompetisi futsal untuk mempererat tali persaudaraan'
  },
  {
    id: '6',
    title: 'Festival Seni & Budaya Kampus',
    category: 'seni',
    organizer: 'UKM Seni',
    date: '2024-11-18',
    location: 'Gedung Kesenian',
    participants: 250,
    status: 'completed',
    coordinator: 'Maya Sari',
    budget: 30000000,
    description: 'Pentas seni mahasiswa berbagai genre',
    achievements: 'Menghasilkan 15 karya seni terpilih'
  },
  {
    id: '7',
    title: 'Hackathon Smart City Solutions',
    category: 'lomba',
    organizer: 'HMIF',
    date: '2024-10-15',
    location: 'Gedung Innovation Center',
    participants: 100,
    status: 'completed',
    coordinator: 'Reza Firmansyah',
    budget: 18000000,
    achievements: '5 solusi inovatif untuk smart city'
  },
  {
    id: '8',
    title: 'Seminar Kewirausahaan Digital',
    category: 'seminar',
    organizer: 'Pusat Karir',
    date: '2024-11-10',
    location: 'Auditorium B',
    participants: 175,
    status: 'completed',
    coordinator: 'Putri Ayu',
    budget: 10000000,
    description: 'Seminar dengan pengusaha sukses bidang digital'
  },
  {
    id: '9',
    title: 'Workshop IoT & Robotika',
    category: 'workshop',
    organizer: 'Lab Robotika',
    date: '2024-12-05',
    location: 'Lab Robotika',
    participants: 60,
    status: 'upcoming',
    coordinator: 'Andi Wijaya',
    budget: 15000000,
    description: 'Pelatihan praktis IoT dan robotika'
  },
  {
    id: '10',
    title: 'Donor Darah Fakultas',
    category: 'bakti-sosial',
    organizer: 'PMR Kampus',
    date: '2024-11-05',
    location: 'Aula Fakultas',
    participants: 95,
    status: 'completed',
    coordinator: 'Linda Susanti',
    budget: 5000000,
    achievements: '95 kantong darah terkumpul'
  },
]

const categoryConfig = {
  lomba: { icon: Award, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  seminar: { icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-100', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  workshop: { icon: Activity, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-100', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  'bakti-sosial': { icon: Users, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-100', textColor: 'text-green-700', borderColor: 'border-green-200' },
  olahraga: { icon: Activity, color: 'from-red-500 to-pink-500', bgColor: 'bg-red-100', textColor: 'text-red-700', borderColor: 'border-red-200' },
  seni: { icon: Award, color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-100', textColor: 'text-indigo-700', borderColor: 'border-indigo-200' },
}

const statusConfig = {
  upcoming: { label: 'Akan Datang', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  ongoing: { label: 'Berlangsung', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  completed: { label: 'Selesai', color: 'bg-green-100 text-green-700 border-green-200' },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700 border-red-200' },
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
}

export default function ActivitiesPage() {
  const [activities] = useState<ActivityData[]>(mockActivities)
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const openViewDialog = (activity: ActivityData) => {
    setSelectedActivity(activity)
    setIsViewDialogOpen(true)
  }

  const upcomingActivities = activities.filter(a => a.status === 'upcoming')
  const ongoingActivities = activities.filter(a => a.status === 'ongoing')
  const completedActivities = activities.filter(a => a.status === 'completed')
  const totalParticipants = activities.reduce((sum, a) => sum + a.participants, 0)
  const totalBudget = activities.reduce((sum, a) => sum + (a.budget || 0), 0)

  const filterActivities = (activityList: ActivityData[]) => {
    let filtered = activityList

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(a => a.status === selectedStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredActivities = filterActivities(activities)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kegiatan Kemahasiswaan</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitoring dan pengelolaan kegiatan mahasiswa</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm" className="h-9" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Kegiatan
          </Button>
        </div>
      </div>

      {/* Overall Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-blue-900">Total Kegiatan</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{activities.length}</div>
            <p className="text-xs text-blue-700/80 mt-1">Seluruh kegiatan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-amber-900">Akan Datang</CardTitle>
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-900">{upcomingActivities.length}</div>
            <p className="text-xs text-amber-700/80 mt-1">Kegiatan mendatang</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-green-900">Selesai</CardTitle>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{completedActivities.length}</div>
            <p className="text-xs text-green-700/80 mt-1">Kegiatan terlaksana</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-purple-900">Total Peserta</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{totalParticipants}</div>
            <p className="text-xs text-purple-700/80 mt-1">Mahasiswa terlibat</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-cyan-50 to-cyan-100 border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-cyan-900">Total Anggaran</CardTitle>
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <TrendingUp className="h-5 w-5 text-cyan-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-900">{formatCurrency(totalBudget).replace(/,00$/, '')}</div>
            <p className="text-xs text-cyan-700/80 mt-1">Dana kegiatan</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon
          const count = activities.filter(a => a.category === key).length
          const categoryLabel = key === 'bakti-sosial' ? 'Bakti Sosial' : key.charAt(0).toUpperCase() + key.slice(1)

          return (
            <Card
              key={key}
              className={`overflow-hidden border-0 bg-gradient-to-br ${config.color} cursor-pointer hover:shadow-xl transition-all hover:scale-105`}
              onClick={() => setSelectedCategory(key)}
            >
              <CardHeader className="pb-3 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Icon className="h-6 w-6" />
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    {count}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold leading-tight">{categoryLabel}</CardTitle>
              </CardHeader>
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
                placeholder="Cari kegiatan, penyelenggara, atau lokasi..."
                className="pl-11 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[220px] h-12 text-base">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Semua Kategori</SelectItem>
                <SelectItem value="lomba" className="text-base">🏆 Lomba</SelectItem>
                <SelectItem value="seminar" className="text-base">👥 Seminar</SelectItem>
                <SelectItem value="workshop" className="text-base">🔧 Workshop</SelectItem>
                <SelectItem value="bakti-sosial" className="text-base">🤝 Bakti Sosial</SelectItem>
                <SelectItem value="olahraga" className="text-base">⚽ Olahraga</SelectItem>
                <SelectItem value="seni" className="text-base">�� Seni</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[220px] h-12 text-base">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-base">Semua Status</SelectItem>
                <SelectItem value="upcoming" className="text-base">Akan Datang</SelectItem>
                <SelectItem value="ongoing" className="text-base">Berlangsung</SelectItem>
                <SelectItem value="completed" className="text-base">Selesai</SelectItem>
                <SelectItem value="cancelled" className="text-base">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {filteredActivities.length} Kegiatan Ditemukan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border-2">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-sm font-semibold h-14">Kegiatan</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Kategori</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Penyelenggara</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Tanggal</TableHead>
                  <TableHead className="text-sm font-semibold h-14">Lokasi</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Peserta</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Status</TableHead>
                  <TableHead className="text-center text-sm font-semibold h-14">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => {
                    const config = categoryConfig[activity.category]
                    const Icon = config.icon
                    return (
                      <TableRow key={activity.id} className="hover:bg-muted/30 h-20">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="text-base font-semibold">{activity.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{activity.coordinator}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-sm px-3 py-1 border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
                            {activity.category === 'bakti-sosial' ? 'Bakti Sosial' : activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{activity.organizer}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm">{formatDate(activity.date)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm">{activity.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-base font-bold text-blue-600">{activity.participants}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-sm px-3 py-1 border ${statusConfig[activity.status].color}`}>
                            {statusConfig[activity.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 px-4"
                            onClick={() => openViewDialog(activity)}
                          >
                            <Eye className="h-5 w-5 mr-2" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Calendar className="h-14 w-14 mb-3 opacity-50" />
                        <p className="text-base font-medium">Tidak ada kegiatan ditemukan</p>
                        <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Detail Kegiatan
            </DialogTitle>
            <DialogDescription>Informasi lengkap kegiatan kemahasiswaan</DialogDescription>
          </DialogHeader>

          {selectedActivity && (
            <div className="space-y-4 py-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{selectedActivity.title}</CardTitle>
                    <Badge className={`text-sm px-3 py-1 border ${statusConfig[selectedActivity.status].color}`}>
                      {statusConfig[selectedActivity.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <Label className="text-xs text-muted-foreground">Kategori</Label>
                      <p className="text-sm font-medium">
                        {selectedActivity.category === 'bakti-sosial' ? 'Bakti Sosial' : selectedActivity.category.charAt(0).toUpperCase() + selectedActivity.category.slice(1)}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Penyelenggara</Label>
                      <p className="text-sm font-medium">{selectedActivity.organizer}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Tanggal</Label>
                      <p className="text-sm font-medium">{formatDate(selectedActivity.date)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Lokasi</Label>
                      <p className="text-sm font-medium">{selectedActivity.location}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Koordinator</Label>
                      <p className="text-sm font-medium">{selectedActivity.coordinator || '-'}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Jumlah Peserta</Label>
                      <p className="text-sm font-medium">{selectedActivity.participants} orang</p>
                    </div>
                    {selectedActivity.budget && (
                      <div>
                        <Label className="text-xs text-muted-foreground">Anggaran</Label>
                        <p className="text-sm font-medium">{formatCurrency(selectedActivity.budget)}</p>
                      </div>
                    )}
                  </div>

                  {selectedActivity.description && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Deskripsi</Label>
                      <p className="text-sm mt-1">{selectedActivity.description}</p>
                    </div>
                  )}

                  {selectedActivity.achievements && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Pencapaian</Label>
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">{selectedActivity.achievements}</p>
                      </div>
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
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Tambah Kegiatan Baru
            </DialogTitle>
            <DialogDescription>Tambahkan kegiatan kemahasiswaan baru</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Nama Kegiatan</Label>
                <Input id="title" placeholder="Masukkan nama kegiatan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lomba">Lomba</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="bakti-sosial">Bakti Sosial</SelectItem>
                    <SelectItem value="olahraga">Olahraga</SelectItem>
                    <SelectItem value="seni">Seni</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Penyelenggara</Label>
                <Input id="organizer" placeholder="Nama penyelenggara" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input id="location" placeholder="Lokasi kegiatan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participants">Jumlah Peserta</Label>
                <Input id="participants" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coordinator">Koordinator</Label>
                <Input id="coordinator" placeholder="Nama koordinator" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Anggaran (Rp)</Label>
                <Input id="budget" type="number" placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" placeholder="Deskripsi kegiatan" rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setIsAddDialogOpen(false)}>
              Simpan Kegiatan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
