"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CorrespondenceTable } from "@/components/staff_tu/correspondence-table"
import { CorrespondenceFilters } from "@/components/correspondence/correspondence-filters"
import { LetterCreationDialog } from "@/components/correspondence/letter-creation-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, X, Mail } from "lucide-react"
import { LetterDetailView } from "@/components/correspondence/letter-detail-view"

// Types
import type { LetterRequest } from "@/types/correspondence"

// Mock data
const mockRequests: LetterRequest[] = [
  {
    id: "1",
    studentId: "1",
    studentName: "Ahmad Fauzi",
    studentNIM: "1234567890",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Untuk keperluan beasiswa",
    description: "Dibutuhkan untuk persyaratan pengajuan beasiswa PPA",
    requestDate: "2023-06-15T08:30:00Z",
    status: "completed",
    type: "active_student",
    attachments: [],
    studentMajor: "Teknik Informatika",
    approvalRole: "staff_tu",
  },
  {
    id: "2",
    studentId: "2",
    studentName: "Budi Santoso",
    studentNIM: "0987654321",
    title: "Surat Izin Penelitian",
    purpose: "Untuk keperluan penelitian tugas akhir",
    description: "Dibutuhkan untuk melakukan penelitian di PT. ABC",
    requestDate: "2023-06-14T10:15:00Z",
    status: "in-review",
    type: "research_permission",
    attachments: [],
    studentMajor: "Teknik Elektro",
    approvalRole: "prodi",
  },
  {
    id: "3",
    studentId: "3",
    studentName: "Citra Dewi",
    studentNIM: "2345678901",
    title: "Surat Keterangan Cuti",
    purpose: "Untuk keperluan cuti semester",
    description: "Dibutuhkan untuk mengajukan cuti semester ganjil 2023/2024",
    requestDate: "2023-06-13T14:45:00Z",
    status: "submitted",
    type: "leave_absence",
    attachments: [],
    studentMajor: "Psikologi",
    approvalRole: "staff_tu",
  },
  {
    id: "4",
    studentId: "4",
    studentName: "Dian Purnama",
    studentNIM: "3456789012",
    title: "Surat Rekomendasi Magang",
    purpose: "Untuk keperluan magang",
    description: "Dibutuhkan untuk melamar magang di Kementerian Komunikasi dan Informatika",
    requestDate: "2023-06-12T09:20:00Z",
    status: "approved",
    type: "internship_recommendation",
    attachments: [],
    studentMajor: "Ilmu Komunikasi",
    approvalRole: "prodi",
  },
  {
    id: "5",
    studentId: "5",
    studentName: "Eko Prasetyo",
    studentNIM: "4567890123",
    title: "Surat Keterangan Lulus",
    purpose: "Untuk keperluan melamar pekerjaan",
    description: "Dibutuhkan sebagai persyaratan melamar pekerjaan di PT. XYZ",
    requestDate: "2023-06-11T11:10:00Z",
    status: "rejected",
    type: "graduation_letter",
    attachments: [],
    studentMajor: "Manajemen",
    approvalRole: "staff_tu",
    rejectedReason: "Data tidak lengkap, mohon lengkapi transkrip nilai",
  },
  {
    id: "6",
    studentId: "6",
    studentName: "Fitri Handayani",
    studentNIM: "5678901234",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Untuk keperluan administrasi keluarga",
    description: "Dibutuhkan untuk persyaratan administrasi tunjangan orang tua",
    requestDate: "2023-06-10T13:25:00Z",
    status: "completed",
    type: "active_student",
    attachments: [],
    studentMajor: "Akuntansi",
    approvalRole: "staff_tu",
    approvedDate: "2023-06-12T10:30:00Z",
    completedDate: "2023-06-13T14:20:00Z",
  },
  {
    id: "7",
    studentId: "7",
    studentName: "Gunawan Wibisono",
    studentNIM: "6789012345",
    title: "Surat Rekomendasi Beasiswa",
    purpose: "Untuk keperluan beasiswa LPDP",
    description: "Dibutuhkan untuk melengkapi persyaratan beasiswa LPDP",
    requestDate: "2023-06-09T15:40:00Z",
    status: "in-review",
    type: "scholarship_recommendation",
    attachments: [],
    studentMajor: "Teknik Sipil",
    approvalRole: "staff_tu",
  },
  {
    id: "8",
    studentId: "8",
    studentName: "Hani Fujianti",
    studentNIM: "7890123456",
    title: "Surat Keterangan Nilai",
    purpose: "Untuk keperluan transfer kredit",
    description: "Dibutuhkan untuk mengajukan transfer kredit ke universitas lain",
    requestDate: "2023-06-08T10:05:00Z",
    status: "submitted",
    type: "transcript_request",
    attachments: [],
    studentMajor: "Sastra Inggris",
    approvalRole: "staff_tu",
  },
  {
    id: "9",
    studentId: "9",
    studentName: "Irfan Hakim",
    studentNIM: "8901234567",
    title: "Surat Izin Tidak Masuk Kuliah",
    purpose: "Untuk keperluan izin sakit",
    description: "Dibutuhkan untuk izin tidak mengikuti ujian karena sakit",
    requestDate: "2023-06-07T08:50:00Z",
    status: "approved",
    type: "leave_absence",
    attachments: [],
    studentMajor: "Kedokteran",
    approvalRole: "staff_tu",
    approvedDate: "2023-06-09T11:25:00Z",
  },
  {
    id: "10",
    studentId: "10",
    studentName: "Joko Widodo",
    studentNIM: "9012345678",
    title: "Surat Keterangan Aktif Kuliah",
    purpose: "Untuk keperluan visa",
    description: "Dibutuhkan untuk mengajukan visa studi ke luar negeri",
    requestDate: "2023-06-06T14:15:00Z",
    status: "completed",
    type: "active_student",
    attachments: [],
    studentMajor: "Hubungan Internasional",
    approvalRole: "staff_tu",
    approvedDate: "2023-06-08T09:45:00Z",
    completedDate: "2023-06-09T13:30:00Z",
  },
  {
    id: "11",
    studentId: "11",
    studentName: "Kartika Sari",
    studentNIM: "0123456789",
    title: "Surat Keterangan Lulus",
    purpose: "Untuk keperluan melamar pekerjaan",
    description: "Dibutuhkan untuk melamar pekerjaan di instansi pemerintah",
    requestDate: "2023-06-05T11:30:00Z",
    status: "in-review",
    type: "graduation_letter",
    attachments: [],
    studentMajor: "Ilmu Hukum",
    approvalRole: "staff_tu",
  },
  {
    id: "12",
    studentId: "12",
    studentName: "Lukman Hakim",
    studentNIM: "1234509876",
    title: "Surat Rekomendasi Penelitian",
    purpose: "Untuk keperluan penelitian",
    description: "Dibutuhkan untuk mengajukan penelitian di laboratorium universitas lain",
    requestDate: "2023-06-04T09:45:00Z",
    status: "submitted",
    type: "research_permission",
    attachments: [],
    studentMajor: "Kimia",
    approvalRole: "prodi",
  },
]

export function CorrespondenceStaffDashboard() {
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [filters, setFilters] = useState({
    status: "all",
    date: undefined as string | undefined,
  })
  const [selectedLetter, setSelectedLetter] = useState<LetterRequest | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "detail">("list")

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setRequests(mockRequests)
      setFilteredRequests(mockRequests)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter requests based on active tab and filters
  useEffect(() => {
    let filtered = [...requests]

    // Apply tab filter
    if (activeTab === "all") {
      // No filtering needed
    } else if (activeTab === "sent") {
      filtered = filtered.filter((r) => r.status === "completed")
    } else {
      filtered = filtered.filter((r) => r.status === activeTab)
    }

    // Apply status filter if not "all"
    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((r) => r.status === filters.status)
    }

    // Apply date filter if present
    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString()
      filtered = filtered.filter((r) => {
        const requestDate = new Date(r.requestDate).toDateString()
        return requestDate === filterDate
      })
    }

    setFilteredRequests(filtered)
  }, [activeTab, filters, requests])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setViewMode("list") // Reset to list view when changing tabs
  }

  // Handle filter change
  const handleFilterChange = (key: string, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Handle search
  const handleSearch = (query: string) => {
    if (!query) {
      // Reset to current filters
      let filtered = [...requests]

      if (activeTab !== "all") {
        if (activeTab === "sent") {
          filtered = filtered.filter((r) => r.status === "completed")
        } else {
          filtered = filtered.filter((r) => r.status === activeTab)
        }
      }

      if (filters.status && filters.status !== "all") {
        filtered = filtered.filter((r) => r.status === filters.status)
      }

      if (filters.date) {
        const filterDate = new Date(filters.date).toDateString()
        filtered = filtered.filter((r) => {
          const requestDate = new Date(r.requestDate).toDateString()
          return requestDate === filterDate
        })
      }

      setFilteredRequests(filtered)
      return
    }

    // Apply search on top of current filters
    let filtered = [...requests]

    if (activeTab !== "all") {
      if (activeTab === "sent") {
        filtered = filtered.filter((r) => r.status === "completed")
      } else {
        filtered = filtered.filter((r) => r.status === activeTab)
      }
    }

    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((r) => r.status === filters.status)
    }

    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString()
      filtered = filtered.filter((r) => {
        const requestDate = new Date(r.requestDate).toDateString()
        return requestDate === filterDate
      })
    }

    // Apply search query
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.studentName.toLowerCase().includes(query.toLowerCase()) ||
        r.studentNIM.toLowerCase().includes(query.toLowerCase()) ||
        r.purpose.toLowerCase().includes(query.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(query.toLowerCase())),
    )

    setFilteredRequests(filtered)
  }

  // Handle status change
  const handleStatusChange = (requestId: string, status: string, notes?: string) => {
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return {
          ...request,
          status,
          notes: notes || undefined,
        }
      }
      return request
    })

    setRequests(updatedRequests as LetterRequest[])

    // Update filtered requests based on current filters 
    let filtered = [...updatedRequests] as LetterRequest[]

    if (activeTab !== "all") {
      if (activeTab === "sent") {
        filtered = filtered.filter((r) => r.status === "completed")
      } else {
        filtered = filtered.filter((r) => r.status === activeTab)
      }
    }

    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((r) => r.status === filters.status)
    }

    if (filters.date) {
      const filterDate = new Date(filters.date).toDateString()
      filtered = filtered.filter((r) => {
        const requestDate = new Date(r.requestDate).toDateString()
        return requestDate === filterDate
      })
    }

    setFilteredRequests(filtered)
  }

  // Handle view letter detail
  const handleViewLetterDetail = (letter: LetterRequest) => {
    setSelectedLetter(letter)
    setViewMode("detail")
  }

  // Handle back to list view
  const handleBackToList = () => {
    setViewMode("list")
    setSelectedLetter(null)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-32 h-10" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  // Stats
  const pendingCount = requests.filter((r) => r.status === "submitted" || r.status === "in-review").length
  const approvedCount = requests.filter((r) => r.status === "approved").length
  const completedCount = requests.filter((r) => r.status === "completed").length
  const rejectedCount = requests.filter((r) => r.status === "rejected").length
  const totalCount = requests.length

  // If in detail view, show the letter detail component
  if (viewMode === "detail" && selectedLetter) {
    return <LetterDetailView letter={selectedLetter} onBack={handleBackToList} />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Korespondensi</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Surat
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="transition-all duration-200 bg-white dark:bg-card hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Permohonan</p>
                <h3 className="mt-1 text-2xl font-bold">{totalCount}</h3>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 bg-white dark:bg-card hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Menunggu Persetujuan</p>
                <h3 className="mt-1 text-2xl font-bold">{pendingCount}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900/30">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 bg-white dark:bg-card hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Disetujui</p>
                <h3 className="mt-1 text-2xl font-bold">{approvedCount}</h3>
              </div>
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                <CheckCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 bg-white dark:bg-card hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selesai</p>
                <h3 className="mt-1 text-2xl font-bold">{completedCount}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full dark:bg-green-900/30">
                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-200 bg-white dark:bg-card hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ditolak</p>
                <h3 className="mt-1 text-2xl font-bold">{rejectedCount}</h3>
              </div>
              <div className="p-3 bg-red-100 rounded-full dark:bg-red-900/30">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

 
      <CorrespondenceFilters filters={filters} onFilterChange={handleFilterChange} onSearch={handleSearch} />

      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-6 mb-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="submitted">Diajukan</TabsTrigger>
          <TabsTrigger value="in-review">Dalam Review</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="sent">Terkirim</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <CorrespondenceTable
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
            onViewLetterDetail={handleViewLetterDetail}
          />
        </TabsContent>
        <TabsContent value="submitted" className="mt-0">
          <CorrespondenceTable
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
            onViewLetterDetail={handleViewLetterDetail}
          />
        </TabsContent>
        <TabsContent value="in-review" className="mt-0">
          <CorrespondenceTable
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
            onViewLetterDetail={handleViewLetterDetail}
          />
        </TabsContent>
        <TabsContent value="approved" className="mt-0">
          <CorrespondenceTable
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
            onViewLetterDetail={handleViewLetterDetail}
          />
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          <CorrespondenceTable
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
            onViewLetterDetail={handleViewLetterDetail}
          />
        </TabsContent>
        <TabsContent value="sent" className="mt-0">
          <CorrespondenceTable
            requests={filteredRequests}
            onStatusChange={handleStatusChange}
            onViewLetterDetail={handleViewLetterDetail}
            showViewDetailButton={true}
          />
        </TabsContent>
      </Tabs>

      <LetterCreationDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  )
}

