"use client"

import { DialogDescription } from "@/components/ui/dialog"
import { DialogTitle } from "@/components/ui/dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { DialogContent } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, FileText, Filter, Search, X, Download, BarChart3, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CorrespondenceTable } from "./correspondence-table"
import { LetterRequestDetails } from "./letter-request-details"
import { LetterTemplateForm } from "./letter-template-form"
import { getLetterRequestsForApproval, updateLetterRequestStatus } from "@/app/actions/correspondence-actions"
import type { LetterRequest, LetterStatus } from "@/types/correspondence"
import { toast } from "@/components/ui/use-toast"

export function CorrespondenceStaffDashboard() {
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isTemplateOpen, setIsTemplateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [currentTab, setCurrentTab] = useState("all")

  // Stats
  const pendingCount = requests.filter((r) => r.status === "submitted" || r.status === "in-review").length
  const approvedCount = requests.filter((r) => r.status === "approved").length
  const completedCount = requests.filter((r) => r.status === "completed").length
  const rejectedCount = requests.filter((r) => r.status === "rejected").length
  const totalCount = requests.length

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getLetterRequestsForApproval("staff_tu")
        setRequests(data)
        setFilteredRequests(data)
      } catch (error) {
        console.error("Error fetching letter requests:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data permohonan surat",
          variant: "destructive",
        })
      }
    }

    fetchRequests()
  }, [])

  useEffect(() => {
    let filtered = [...requests]

    // Apply tab filter
    if (currentTab === "pending") {
      filtered = filtered.filter((r) => r.status === "submitted" || r.status === "in-review")
    } else if (currentTab === "approved") {
      filtered = filtered.filter((r) => r.status === "approved")
    } else if (currentTab === "completed") {
      filtered = filtered.filter((r) => r.status === "completed")
    } else if (currentTab === "rejected") {
      filtered = filtered.filter((r) => r.status === "rejected")
    }

    // Apply status filter if not "all"
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter)
    }

    // Apply type filter if not "all"
    if (typeFilter !== "all") {
      filtered = filtered.filter((r) => r.type === typeFilter)
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.studentName.toLowerCase().includes(query) ||
          r.studentNIM.toLowerCase().includes(query) ||
          r.title.toLowerCase().includes(query) ||
          (r.description ? r.description.toLowerCase().includes(query) : false),
      )
    }

    setFilteredRequests(filtered)
  }, [requests, currentTab, statusFilter, typeFilter, searchQuery])

  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const handleStatusChange = async (requestId: string, newStatus: LetterStatus, notes?: string) => {
    try {
      const result = await updateLetterRequestStatus(requestId, newStatus, notes, "Admin Staff TU")

      if (result.success) {
        // Update local state
        setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: newStatus } : req)))

        toast({
          title: "Berhasil",
          description: result.message,
        })

        // Close the details dialog if open
        setIsDetailsOpen(false)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating letter request status:", error)
      toast({
        title: "Error",
        description: "Gagal memperbarui status permohonan surat",
        variant: "destructive",
      })
    }
  }

  const handleCreateTemplate = (requestId: string) => {
    const request = requests.find((r) => r.id === requestId)
    if (request) {
      setSelectedRequest(request)
      setIsTemplateOpen(true)
    }
  }

  const handleGenerateLetter = async (requestId: string, templateContent: string) => {
    // In a real app, this would generate a PDF and save it
    try {
      await updateLetterRequestStatus(requestId, "completed", undefined, "Admin Staff TU")

      // Update local state
      setRequests((prev) => prev.map((req) => (req.id === requestId ? { ...req, status: "completed" } : req)))

      toast({
        title: "Berhasil",
        description: "Surat berhasil dibuat dan siap untuk diunduh",
      })

      setIsTemplateOpen(false)
    } catch (error) {
      console.error("Error generating letter:", error)
      toast({
        title: "Error",
        description: "Gagal membuat surat",
        variant: "destructive",
      })
    }
  }

  const handleExportData = () => {
    // In a real app, this would export data to CSV/Excel
    toast({
      title: "Export Data",
      description: "Fitur export data sedang dalam pengembangan",
    })
  }

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold">Ringkasan Korespondensi</h3>
              <p className="text-muted-foreground">Anda memiliki {pendingCount} permohonan yang memerlukan perhatian</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
              <Button size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Lihat Laporan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-white dark:bg-card transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Permohonan</p>
                <h3 className="text-2xl font-bold mt-1">{totalCount}</h3>
              </div>
              <div className="rounded-full p-3 bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Menunggu Persetujuan</p>
                <h3 className="text-2xl font-bold mt-1">{pendingCount}</h3>
              </div>
              <div className="rounded-full p-3 bg-blue-100 dark:bg-blue-900/30">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Disetujui</p>
                <h3 className="text-2xl font-bold mt-1">{approvedCount}</h3>
              </div>
              <div className="rounded-full p-3 bg-amber-100 dark:bg-amber-900/30">
                <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Selesai</p>
                <h3 className="text-2xl font-bold mt-1">{completedCount}</h3>
              </div>
              <div className="rounded-full p-3 bg-green-100 dark:bg-green-900/30">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-card transition-all duration-200 hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ditolak</p>
                <h3 className="text-2xl font-bold mt-1">{rejectedCount}</h3>
              </div>
              <div className="rounded-full p-3 bg-red-100 dark:bg-red-900/30">
                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-white dark:bg-card border-b">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg font-semibold">Daftar Permohonan Surat</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama, NIM, atau judul surat..."
                className="pl-8 border-muted bg-background/50 focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] border-muted bg-background/50 focus:ring-primary/30">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="submitted">Diajukan</SelectItem>
                  <SelectItem value="in-review">Dalam Review</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[130px] border-muted bg-background/50 focus:ring-primary/30">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="active_student">Aktif Kuliah</SelectItem>
                  <SelectItem value="leave_absence">Cuti Kuliah</SelectItem>
                  <SelectItem value="loan_application">Pengajuan Pinjaman</SelectItem>
                  <SelectItem value="tuition_extension">Perpanjangan SPP</SelectItem>
                  <SelectItem value="internship_recommendation">Rekomendasi Magang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <div className="px-6 bg-white dark:bg-card border-b">
            <TabsList className="w-full justify-start border-b-0 bg-transparent h-12">
              <TabsTrigger
                value="all"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Menunggu Persetujuan
                {pendingCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {pendingCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger
                value="approved"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Disetujui
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Selesai
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Ditolak
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <CorrespondenceTable
              requests={filteredRequests}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              onCreateTemplate={handleCreateTemplate}
              role="staff_tu"
            />
          </TabsContent>

          <TabsContent value="pending" className="m-0">
            <CorrespondenceTable
              requests={filteredRequests}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              onCreateTemplate={handleCreateTemplate}
              role="staff_tu"
            />
          </TabsContent>

          <TabsContent value="approved" className="m-0">
            <CorrespondenceTable
              requests={filteredRequests}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              onCreateTemplate={handleCreateTemplate}
              role="staff_tu"
            />
          </TabsContent>

          <TabsContent value="completed" className="m-0">
            <CorrespondenceTable
              requests={filteredRequests}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              onCreateTemplate={handleCreateTemplate}
              role="staff_tu"
            />
          </TabsContent>

          <TabsContent value="rejected" className="m-0">
            <CorrespondenceTable
              requests={filteredRequests}
              onViewDetails={handleViewDetails}
              onStatusChange={handleStatusChange}
              onCreateTemplate={handleCreateTemplate}
              role="staff_tu"
            />
          </TabsContent>
        </Tabs>
      </Card>

      {/* Letter Request Details Dialog */}
      {selectedRequest && (
        <LetterRequestDetails
          request={selectedRequest}
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onStatusChange={handleStatusChange}
          onCreateTemplate={handleCreateTemplate}
          role="staff_tu"
        />
      )}

      {/* Letter Template Form Dialog */}
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Buat Surat</DialogTitle>
            <DialogDescription>Buat surat berdasarkan template yang tersedia</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <LetterTemplateForm
              request={selectedRequest}
              onSubmit={(content) => handleGenerateLetter(selectedRequest.id, content)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

