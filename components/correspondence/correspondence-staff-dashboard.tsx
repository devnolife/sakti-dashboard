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
import { CheckCircle, Clock, FileText, X, Mail, Hash, Settings } from "lucide-react"
import { LetterDetailView } from "@/components/correspondence/letter-detail-view"
import { NumberingSystemCard } from "@/components/correspondence/numbering-system-card"
import { NumberingConfigDialog } from "@/components/correspondence/numbering-config-dialog"
import { NextNumbersCard } from "@/components/correspondence/next-numbers-card"
import { getLetterRequestsByProdi } from "@/app/actions/correspondence/letter-requests"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/hooks/use-toast"

// Types
import type { LetterRequest } from "@/types/correspondence"

export function CorrespondenceStaffDashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const { toast } = useToast()
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
  const [showNumberingConfig, setShowNumberingConfig] = useState(false)
  const [prodiId, setProdiId] = useState<string>("")

  // Fetch letter requests from database
  useEffect(() => {
    async function fetchLetterRequests() {
      if (authLoading || !user?.id) {
        return
      }

      try {
        setLoading(true)

        // Get staff_tu's prodi_id from user data
        const response = await fetch('/api/users/profile')
        if (!response.ok) {
          throw new Error('Failed to fetch user profile')
        }

        const userData = await response.json()
        const userProdiId = userData.staff_tu?.prodi_id

        if (!userProdiId) {
          toast({
            title: "Error",
            description: "Prodi ID tidak ditemukan untuk user ini",
            variant: "destructive",
          })
          setLoading(false)
          return
        }

        // Set prodi ID for next numbers card
        setProdiId(userProdiId)

        // Fetch letter requests for this prodi
        const data = await getLetterRequestsByProdi(userProdiId)
        setRequests(data)
        setFilteredRequests(data)
      } catch (error) {
        console.error("Error fetching letter requests:", error)
        toast({
          title: "Error",
          description: "Gagal mengambil data permohonan surat",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLetterRequests()
  }, [authLoading, user?.id, toast])

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
        <div className="flex gap-2">
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Buat Surat
          </Button>
        </div>
      </div>

      {/* Next Numbers Preview & Numbering System */}
      <div className="space-y-6">
        <NumberingSystemCard />
        {prodiId && <NextNumbersCard prodiId={prodiId} />}
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
          <TabsTrigger value="in-review">Diproses</TabsTrigger>
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

      <NumberingConfigDialog
        open={showNumberingConfig}
        onOpenChange={setShowNumberingConfig}
      />
    </div>
  )
}

