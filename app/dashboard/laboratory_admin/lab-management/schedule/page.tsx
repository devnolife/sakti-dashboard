"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Users,
  MapPin,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react"

// Mock data for lab schedules
const labSchedules = [
  {
    id: 1,
    title: "Praktikum Jaringan Komputer",
    lab: "Lab Jaringan",
    instructor: "Dr. Ahmad Syahputra",
    assistant: "Budi Santoso",
    date: "2024-01-15",
    time: "08:00 - 10:00",
    duration: "2 jam",
    capacity: 25,
    enrolled: 23,
    status: "active",
    class: "TI-3A",
    semester: "Ganjil 2023/2024"
  },
  {
    id: 2,
    title: "Praktikum Basis Data",
    lab: "Lab Database",
    instructor: "Prof. Siti Nurhaliza",
    assistant: "Andi Pratama",
    date: "2024-01-15",
    time: "10:30 - 12:30",
    duration: "2 jam",
    capacity: 30,
    enrolled: 28,
    status: "active",
    class: "SI-2B",
    semester: "Ganjil 2023/2024"
  },
  {
    id: 3,
    title: "Praktikum Multimedia",
    lab: "Lab Multimedia",
    instructor: "Dr. Rini Wulandari",
    assistant: "Citra Dewi",
    date: "2024-01-15",
    time: "13:00 - 15:00",
    duration: "2 jam",
    capacity: 20,
    enrolled: 20,
    status: "full",
    class: "TI-4A",
    semester: "Ganjil 2023/2024"
  },
  {
    id: 4,
    title: "Praktikum Pemrograman Web",
    lab: "Lab Programming",
    instructor: "Ir. Joko Widodo",
    assistant: "Dani Ramdhani",
    date: "2024-01-16",
    time: "08:00 - 10:00",
    duration: "2 jam",
    capacity: 25,
    enrolled: 15,
    status: "available",
    class: "SI-3B",
    semester: "Ganjil 2023/2024"
  },
  {
    id: 5,
    title: "Praktikum Kecerdasan Buatan",
    lab: "Lab AI",
    instructor: "Dr. Maya Sari",
    assistant: "Eko Prasetyo",
    date: "2024-01-16",
    time: "14:00 - 16:00",
    duration: "2 jam",
    capacity: 20,
    enrolled: 0,
    status: "cancelled",
    class: "TI-4B",
    semester: "Ganjil 2023/2024"
  }
]

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  available: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  full: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
}

const statusIcons = {
  active: CheckCircle2,
  available: Clock,
  full: Users,
  cancelled: XCircle
}

export default function LabSchedulePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLab, setFilterLab] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterDate, setFilterDate] = useState("all")

  // Filter schedules
  const filteredSchedules = labSchedules.filter((schedule) => {
    const matchesSearch = schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         schedule.class.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLab = filterLab === "all" || schedule.lab === filterLab
    const matchesStatus = filterStatus === "all" || schedule.status === filterStatus
    const matchesDate = filterDate === "all" || schedule.date === filterDate
    
    return matchesSearch && matchesLab && matchesStatus && matchesDate
  })

  // Calculate statistics
  const stats = {
    total: labSchedules.length,
    active: labSchedules.filter(s => s.status === "active").length,
    available: labSchedules.filter(s => s.status === "available").length,
    full: labSchedules.filter(s => s.status === "full").length,
    cancelled: labSchedules.filter(s => s.status === "cancelled").length,
    totalEnrolled: labSchedules.reduce((sum, s) => sum + s.enrolled, 0),
    totalCapacity: labSchedules.reduce((sum, s) => sum + s.capacity, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Jadwal Laboratorium
          </span>
          <Calendar className="h-6 w-6 text-purple-500" />
        </h1>
        <p className="text-muted-foreground mt-2">Kelola jadwal praktikum dan penggunaan laboratorium</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Total Jadwal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-50">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">
              Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-50">{stats.active}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
              Penuh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900 dark:text-yellow-50">{stats.full}</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Kapasitas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-50">
              {stats.totalEnrolled}/{stats.totalCapacity}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-xl">Jadwal Praktikum</CardTitle>
              <p className="text-muted-foreground">Kelola dan pantau jadwal praktikum laboratorium</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari jadwal..."
                  className="pl-10 w-full sm:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Jadwal
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            <Select value={filterLab} onValueChange={setFilterLab}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Lab" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lab</SelectItem>
                <SelectItem value="Lab Jaringan">Lab Jaringan</SelectItem>
                <SelectItem value="Lab Database">Lab Database</SelectItem>
                <SelectItem value="Lab Multimedia">Lab Multimedia</SelectItem>
                <SelectItem value="Lab Programming">Lab Programming</SelectItem>
                <SelectItem value="Lab AI">Lab AI</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="available">Tersedia</SelectItem>
                <SelectItem value="full">Penuh</SelectItem>
                <SelectItem value="cancelled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterDate} onValueChange={setFilterDate}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tanggal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tanggal</SelectItem>
                <SelectItem value="2024-01-15">15 Jan 2024</SelectItem>
                <SelectItem value="2024-01-16">16 Jan 2024</SelectItem>
              </SelectContent>
            </Select>

            {(filterLab !== "all" || filterStatus !== "all" || filterDate !== "all") && (
              <Badge variant="secondary">
                {filteredSchedules.length} dari {labSchedules.length} jadwal
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Schedule Grid */}
          <div className="grid gap-4">
            {filteredSchedules.map((schedule) => {
              const StatusIcon = statusIcons[schedule.status as keyof typeof statusIcons]
              const enrollmentPercentage = (schedule.enrolled / schedule.capacity) * 100
              
              return (
                <div key={schedule.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{schedule.title}</h3>
                          <p className="text-sm text-muted-foreground">{schedule.class} - {schedule.semester}</p>
                        </div>
                        <Badge className={statusColors[schedule.status as keyof typeof statusColors]}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {schedule.status === 'active' ? 'Aktif' :
                           schedule.status === 'available' ? 'Tersedia' :
                           schedule.status === 'full' ? 'Penuh' : 'Dibatalkan'}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.lab}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(schedule.date).toLocaleDateString('id-ID')}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.enrolled}/{schedule.capacity} mahasiswa</span>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {schedule.instructor.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Dosen: {schedule.instructor}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 bg-blue-100">
                            <AvatarFallback className="text-xs text-blue-600">
                              {schedule.assistant.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">Asisten: {schedule.assistant}</span>
                        </div>
                      </div>
                      
                      {/* Enrollment Progress */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Kapasitas</span>
                          <span className="text-xs text-muted-foreground">{enrollmentPercentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              enrollmentPercentage >= 100 ? 'bg-red-500' :
                              enrollmentPercentage >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(enrollmentPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
            
            {filteredSchedules.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada jadwal ditemukan</h3>
                <p className="text-muted-foreground">Coba ubah filter pencarian atau tambah jadwal baru</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}