"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Search, Calendar, User, Clock, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExamTable } from "./exam-table"
import { ExamDetailsDialog } from "./exam-details-dialog"
import { CreateExamDialog } from "./create-exam-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import Link from "next/link"

// Types
import type { Exam } from "@/types/exam"

// Mock data
const mockExams: Exam[] = [
  {
    id: "1",
    title: "Analisis Performa Algoritma Machine Learning pada Data Tidak Seimbang",
    studentName: "Ahmad Fauzi",
    studentId: "1234567890",
    date: "2023-06-15T08:30:00Z",
    location: "Ruang Sidang A",
    status: "scheduled",
    type: "proposal",
    advisor1: {
      id: "a1",
      name: "Dr. Budi Santoso",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    committee: [
      {
        id: "c1",
        name: "Dr. Citra Dewi",
        role: "Ketua",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "c2",
        name: "Dr. Dian Purnama",
        role: "Penguji 1",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "2",
    title: "Implementasi Deep Learning untuk Deteksi Objek pada Video Streaming",
    studentName: "Budi Santoso",
    studentId: "0987654321",
    date: "2023-06-20T10:15:00Z",
    location: "Ruang Sidang B",
    status: "completed",
    type: "final",
    advisor1: {
      id: "a2",
      name: "Dr. Eko Prasetyo",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    advisor2: {
      id: "a3",
      name: "Dr. Fitri Handayani",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    committee: [
      {
        id: "c3",
        name: "Dr. Fitri Handayani",
        role: "Ketua",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "c4",
        name: "Dr. Gunawan Wibisono",
        role: "Penguji 1",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "c5",
        name: "Dr. Hani Fujianti",
        role: "Penguji 2",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
    documents: [
      {
        id: "doc-1",
        name: "Bukti Pembayaran Ujian",
        type: "payment_proof",
        status: "verified",
        uploadDate: "2023-05-15T08:30:00Z",
        verificationDate: "2023-05-16T10:15:00Z",
        fileUrl: "/placeholder.svg?height=400&width=300",
        fileSize: 1250000,
        isSystemGenerated: false,
      },
      {
        id: "doc-2",
        name: "Transkrip Nilai",
        type: "transcript",
        status: "verified",
        uploadDate: "2023-05-14T09:45:00Z",
        verificationDate: "2023-05-16T10:20:00Z",
        fileUrl: "/placeholder.svg?height=400&width=300",
        fileSize: 980000,
        isSystemGenerated: true,
      },
      {
        id: "doc-3",
        name: "Dokumen Proposal",
        type: "proposal",
        status: "unverified",
        uploadDate: "2023-05-16T14:20:00Z",
        fileUrl: "/placeholder.svg?height=400&width=300",
        fileSize: 3500000,
        isSystemGenerated: false,
      },
      {
        id: "doc-4",
        name: "Persetujuan Pembimbing",
        type: "supervisor_approval",
        status: "rejected",
        uploadDate: "2023-05-13T11:10:00Z",
        fileUrl: "/placeholder.svg?height=400&width=300",
        fileSize: 450000,
        notes: "Tanda tangan pembimbing tidak jelas. Mohon upload ulang dengan tanda tangan yang lebih jelas.",
        isSystemGenerated: false,
      },
    ],
  },
  {
    id: "3",
    title: "Pengembangan Sistem Rekomendasi Berbasis Collaborative Filtering",
    studentName: "Citra Dewi",
    studentId: "2345678901",
    date: "",
    location: "",
    status: "applicant",
    type: "proposal",
    advisor1: {
      id: "a3",
      name: "Dr. Irfan Hakim",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    committee: [],
  },
  {
    id: "4",
    title: "Analisis Sentimen pada Media Sosial Menggunakan Natural Language Processing",
    studentName: "Dian Purnama",
    studentId: "3456789012",
    date: "2023-06-30T09:00:00Z",
    location: "Ruang Sidang A",
    status: "scheduled",
    type: "result",
    advisor1: {
      id: "a4",
      name: "Dr. Joko Widodo",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    advisor2: {
      id: "a5",
      name: "Dr. Kartika Sari",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    committee: [
      {
        id: "c6",
        name: "Dr. Kartika Sari",
        role: "Ketua",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
      {
        id: "c7",
        name: "Dr. Lukman Hakim",
        role: "Penguji 1",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "5",
    title: "Optimasi Jaringan Saraf Tiruan untuk Prediksi Time Series",
    studentName: "Eko Prasetyo",
    studentId: "4567890123",
    date: "2023-07-05T11:30:00Z",
    location: "Ruang Sidang B",
    status: "cancelled",
    type: "proposal",
    advisor1: {
      id: "a5",
      name: "Dr. Maya Nabila",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    committee: [
      {
        id: "c8",
        name: "Dr. Nugroho Santoso",
        role: "Ketua",
        department: "Informatika",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    id: "6",
    title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan",
    studentName: "Faisal Rahman",
    studentId: "5678901234",
    date: "",
    location: "",
    status: "applicant",
    type: "result",
    advisor1: {
      id: "a6",
      name: "Dr. Olivia Putri",
      department: "Informatika",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    committee: [],
  },
]

interface ExamsDashboardProps {
  initialFilter?: string
  initialTab?: string
}

export function ExamsDashboard({ initialFilter = "all", initialTab = "all" }: ExamsDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [exams, setExams] = useState<Exam[]>([])
  const [filteredExams, setFilteredExams] = useState<Exam[]>([])
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [activeTab, setActiveTab] = useState(initialTab)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    type: initialFilter,
    date: undefined as Date | undefined,
  })

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setExams(mockExams)
      setFilteredExams(mockExams)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter exams based on active tab, search query, and filters
  useEffect(() => {
    let filtered = [...exams]

    // Apply tab filter
    if (activeTab !== "all") {
      filtered = filtered.filter((exam) => exam.status === activeTab)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (exam) =>
          exam.title.toLowerCase().includes(query) ||
          exam.studentName.toLowerCase().includes(query) ||
          exam.studentId.toLowerCase().includes(query) ||
          (exam.location && exam.location.toLowerCase().includes(query)),
      )
    }

    // Apply type filter
    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter((exam) => exam.type === filters.type)
    }

    // Apply date filter
    if (filters.date) {
      const filterDate = filters.date.toDateString()
      filtered = filtered.filter((exam) => {
        if (!exam.date) return false
        const examDate = new Date(exam.date).toDateString()
        return examDate === filterDate
      })
    }

    setFilteredExams(filtered)
  }, [activeTab, searchQuery, filters, exams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already applied via useEffect
  }

  const handleViewDetails = (exam: Exam) => {
    setSelectedExam(exam)
    setShowDetailsDialog(true)
  }

  const handleExamUpdate = (updatedExam: Exam) => {
    const updatedExams = exams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
    setExams(updatedExams)
    setSelectedExam(null)
  }

  const handleExamCreate = (newExam: Exam) => {
    setExams([...exams, newExam])
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setFilters({
      type: "all",
      date: undefined,
    })
  }

  // Stats
  const applicantCount = exams.filter((exam) => exam.status === "applicant").length
  const pendingCount = exams.filter((exam) => exam.status === "pending").length
  const scheduledCount = exams.filter((exam) => exam.status === "scheduled").length
  const completedCount = exams.filter((exam) => exam.status === "completed").length
  const cancelledCount = exams.filter((exam) => exam.status === "cancelled").length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="w-64 h-10" />
          <Skeleton className="w-32 h-10" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Ujian</h1>
          <p className="mt-1 text-muted-foreground">Kelola jadwal dan detail ujian mahasiswa</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/dashboard/staff_tu/exams/schedules">
            <Button 
              variant="outline"
              className="transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Lihat Jadwal
            </Button>
          </Link>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="transition-all duration-300 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Tambah Ujian
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/20 dark:to-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pendaftar</p>
                <h3 className="mt-2 text-3xl font-bold text-yellow-700 dark:text-yellow-400">{applicantCount}</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full dark:bg-yellow-900/30">
                <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Menunggu Persetujuan</p>
                <h3 className="mt-2 text-3xl font-bold text-blue-700 dark:text-blue-400">{pendingCount}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/30">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Terjadwal</p>
                <h3 className="mt-2 text-3xl font-bold text-indigo-700 dark:text-indigo-400">{scheduledCount}</h3>
              </div>
              <div className="p-3 bg-indigo-100 rounded-full dark:bg-indigo-900/30">
                <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selesai</p>
                <h3 className="mt-2 text-3xl font-bold text-green-700 dark:text-green-400">{completedCount}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/30">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 border-none shadow-md hover:shadow-lg bg-gradient-to-br from-red-50 to-white dark:from-red-950/20 dark:to-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dibatalkan</p>
                <h3 className="mt-2 text-3xl font-bold text-red-700 dark:text-red-400">{cancelledCount}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/30">
                <User className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search Field */}
          <div className="relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari ujian..."
                  className="pl-10 bg-white border shadow-sm dark:bg-card border-input focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Type Filter */}
          <div>
            <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
              <SelectTrigger className="bg-white border shadow-sm dark:bg-card border-input focus:ring-2 focus:ring-offset-0 focus:ring-blue-500">
                <SelectValue placeholder="Semua tipe ujian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua tipe ujian</SelectItem>
                <SelectItem value="proposal">Ujian Proposal</SelectItem>
                <SelectItem value="result">Ujian Hasil</SelectItem>
                <SelectItem value="final">Ujian Tutup</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Filter */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start w-full font-normal text-left bg-white border shadow-sm dark:bg-card border-input focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {filters.date ? format(filters.date, "PPP") : "Pilih tanggal"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={filters.date}
                  onSelect={(date) => handleFilterChange("date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Reset Filters Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            Reset filter
          </Button>
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="overflow-hidden bg-white border rounded-lg shadow-sm dark:bg-card border-border">
        <Tabs defaultValue={initialTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-4 pt-4">
            <TabsList className="grid w-full grid-cols-5 mb-4 bg-muted/50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="applicant"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Pendaftar
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Menunggu
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Terjadwal
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                Selesai
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <ExamTable exams={filteredExams} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="applicant" className="m-0">
            <ExamTable exams={filteredExams} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="pending" className="m-0">
            <ExamTable exams={filteredExams} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="scheduled" className="m-0">
            <ExamTable exams={filteredExams} onViewDetails={handleViewDetails} />
          </TabsContent>
          <TabsContent value="completed" className="m-0">
            <ExamTable exams={filteredExams} onViewDetails={handleViewDetails} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      {selectedExam && (
        <ExamDetailsDialog
          exam={selectedExam}
          open={showDetailsDialog}
          onOpenChange={setShowDetailsDialog}
          onExamUpdate={handleExamUpdate}
        />
      )}

      <CreateExamDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} onExamCreate={handleExamCreate} />
    </div>
  )
}

