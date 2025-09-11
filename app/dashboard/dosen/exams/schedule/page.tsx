"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  FileText,
  Eye,
  Edit,
  Search,
  Filter,
  Plus,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  BookOpen,
  GraduationCap,
} from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface ExamSchedule {
  id: string
  examType: "proposal" | "seminar" | "sidang"
  studentName: string
  studentNim: string
  title: string
  date: string
  time: string
  location: string
  examinerRole: "pembimbing" | "penguji_1" | "penguji_2" | "ketua_penguji"
  status: "scheduled" | "completed" | "cancelled" | "rescheduled"
  notes?: string
}

// Mock data for exam schedules
const mockExamSchedules: ExamSchedule[] = [
  {
    id: "1",
    examType: "proposal",
    studentName: "Ahmad Fauzi",
    studentNim: "20210001",
    title: "Sistem Manajemen Inventori Berbasis Web untuk UKM",
    date: "2024-01-18",
    time: "09:00",
    location: "Ruang Sidang A",
    examinerRole: "pembimbing",
    status: "scheduled",
  },
  {
    id: "2",
    examType: "seminar",
    studentName: "Siti Nurhaliza",
    studentNim: "20210002",
    title: "Implementasi Machine Learning untuk Prediksi Penjualan",
    date: "2024-01-19",
    time: "10:30",
    location: "Ruang Sidang B",
    examinerRole: "penguji_1",
    status: "scheduled",
  },
  {
    id: "3",
    examType: "sidang",
    studentName: "Budi Santoso",
    studentNim: "20190005",
    title: "Aplikasi Mobile Monitoring Kesehatan Lansia",
    date: "2024-01-15",
    time: "14:00",
    location: "Ruang Sidang C",
    examinerRole: "penguji_2",
    status: "completed",
  },
  {
    id: "4",
    examType: "proposal",
    studentName: "Diana Putri",
    studentNim: "20210003",
    title: "Sistem Informasi Manajemen Sekolah Berbasis Cloud",
    date: "2024-01-20",
    time: "13:00",
    location: "Ruang Sidang A",
    examinerRole: "ketua_penguji",
    status: "scheduled",
  },
  {
    id: "5",
    examType: "seminar",
    studentName: "Eko Prasetyo",
    studentNim: "20200010",
    title: "Chatbot Customer Service Menggunakan Natural Language Processing",
    date: "2024-01-16",
    time: "11:00",
    location: "Ruang Sidang B",
    examinerRole: "pembimbing",
    status: "rescheduled",
  },
]

export default function ExamSchedulePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"all" | "scheduled" | "completed">("all")
  const [schedules, setSchedules] = useState<ExamSchedule[]>(mockExamSchedules)
  const [filteredSchedules, setFilteredSchedules] = useState<ExamSchedule[]>(mockExamSchedules)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSchedule, setSelectedSchedule] = useState<ExamSchedule | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [showCalendar, setShowCalendar] = useState(false)

  // Filter schedules based on active tab and search query
  useEffect(() => {
    let filtered = schedules

    // Filter by status
    if (activeTab === "scheduled") {
      filtered = filtered.filter((schedule) => schedule.status === "scheduled")
    } else if (activeTab === "completed") {
      filtered = filtered.filter((schedule) => schedule.status === "completed")
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (schedule) =>
          schedule.studentName.toLowerCase().includes(query) ||
          schedule.studentNim.toLowerCase().includes(query) ||
          schedule.title.toLowerCase().includes(query) ||
          schedule.location.toLowerCase().includes(query),
      )
    }

    // Filter by selected date
    if (selectedDate) {
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
      filtered = filtered.filter((schedule) => schedule.date === selectedDateStr)
    }

    setFilteredSchedules(filtered)
  }, [activeTab, searchQuery, selectedDate, schedules])

  const handleViewDetails = (schedule: ExamSchedule) => {
    setSelectedSchedule(schedule)
    setShowDetailsDialog(true)
  }

  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "proposal":
        return <Badge className="bg-blue-500/10 text-blue-500">Proposal</Badge>
      case "seminar":
        return <Badge className="bg-purple-500/10 text-purple-500">Seminar</Badge>
      case "sidang":
        return <Badge className="bg-green-500/10 text-green-500">Sidang</Badge>
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3 w-3 mr-1" />
            Terjadwal
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Selesai
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            Dibatalkan
          </Badge>
        )
      case "rescheduled":
        return (
          <Badge className="bg-orange-500/10 text-orange-500">
            <Clock className="h-3 w-3 mr-1" />
            Dijadwal Ulang
          </Badge>
        )
      default:
        return null
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "pembimbing":
        return <Badge variant="outline">Pembimbing</Badge>
      case "penguji_1":
        return <Badge variant="outline">Penguji 1</Badge>
      case "penguji_2":
        return <Badge variant="outline">Penguji 2</Badge>
      case "ketua_penguji":
        return <Badge variant="outline">Ketua Penguji</Badge>
      default:
        return null
    }
  }

  const getUpcomingCount = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return schedules.filter(
      (schedule) =>
        schedule.status === "scheduled" &&
        new Date(schedule.date) >= today &&
        new Date(schedule.date) <= nextWeek
    ).length
  }

  const getTodaySchedules = () => {
    const today = format(new Date(), "yyyy-MM-dd")
    return schedules.filter(
      (schedule) => schedule.date === today && schedule.status === "scheduled"
    ).length
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Jadwal Ujian
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola jadwal ujian sebagai pembimbing dan penguji</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hari Ini</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTodaySchedules()}</div>
            <p className="text-xs text-muted-foreground">ujian hari ini</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minggu Ini</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getUpcomingCount()}</div>
            <p className="text-xs text-muted-foreground">ujian mendatang</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jadwal</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schedules.length}</div>
            <p className="text-xs text-muted-foreground">semua jadwal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {schedules.filter((s) => s.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">ujian selesai</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "all" | "scheduled" | "completed")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="scheduled">Terjadwal</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari jadwal ujian..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <CalendarIcon className="h-4 w-4 mr-2" />
              {selectedDate ? format(selectedDate, "dd MMM yyyy", { locale: id }) : "Pilih Tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date)
                setShowCalendar(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {selectedDate && (
          <Button
            variant="ghost"
            onClick={() => setSelectedDate(undefined)}
            className="w-full md:w-auto"
          >
            Reset Filter
          </Button>
        )}
      </div>

      {/* Schedule List */}
      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Jadwal Ujian</CardTitle>
          <CardDescription>Daftar jadwal ujian sebagai pembimbing dan penguji</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSchedules.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">
                <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Tidak ada jadwal ujian ditemukan</p>
              </div>
            ) : (
              filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {getExamTypeBadge(schedule.examType)}
                        {getRoleBadge(schedule.examinerRole)}
                        {getStatusBadge(schedule.status)}
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{schedule.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{schedule.studentName} ({schedule.studentNim})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {format(new Date(schedule.date), "dd MMMM yyyy", { locale: id })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{schedule.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{schedule.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(schedule)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Schedule Details Dialog */}
      {selectedSchedule && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Detail Jadwal Ujian
              </DialogTitle>
              <DialogDescription>
                {selectedSchedule.examType.toUpperCase()} - {selectedSchedule.studentName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Informasi Mahasiswa</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nama:</span>
                        <span className="font-medium">{selectedSchedule.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">NIM:</span>
                        <span className="font-medium">{selectedSchedule.studentNim}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Jadwal Ujian</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tanggal:</span>
                        <span className="font-medium">
                          {format(new Date(selectedSchedule.date), "dd MMMM yyyy", { locale: id })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Waktu:</span>
                        <span className="font-medium">{selectedSchedule.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lokasi:</span>
                        <span className="font-medium">{selectedSchedule.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Detail Ujian</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jenis Ujian:</span>
                        <span>{getExamTypeBadge(selectedSchedule.examType)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Peran Anda:</span>
                        <span>{getRoleBadge(selectedSchedule.examinerRole)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span>{getStatusBadge(selectedSchedule.status)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedSchedule.notes && (
                    <div>
                      <h3 className="font-semibold mb-2">Catatan</h3>
                      <p className="text-sm text-muted-foreground">{selectedSchedule.notes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Judul</h3>
                <p className="text-sm">{selectedSchedule.title}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}