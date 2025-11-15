"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Eye,
  FileUp,
  XCircle,
  CheckCircle,
  Clock,
  FileText,
  AlertCircle,
  Calendar,
  ArrowRight,
  RotateCcw,
} from "lucide-react"
import { getAllLetterRequests } from "@/app/actions/correspondence-actions"
import type { LetterRequest } from "@/types/correspondence"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { formatDate } from "@/lib/utils"

export function CorrespondenceDraftsManagement() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  // Helper function to reload data dengan filter
  const reloadRequests = async () => {
    const data = await getAllLetterRequests()

    // 🔍 DEBUG: Log semua data yang dimuat
    console.log('=== DEBUG: ALL LETTER REQUESTS ===', data)
    console.log('Total requests loaded:', data.length)

    // 🔍 DEBUG: Cek status setiap request
    data.forEach((req, index) => {
      console.log(`Request #${index + 1}:`, {
        id: req.id,
        title: req.title,
        status: req.status,
        statusType: typeof req.status,
        studentName: req.studentName,
        requestDate: req.requestDate
      })

      // Peringatkan jika status tidak valid
      const validStatuses = ['submitted', 'in_review', 'in-review', 'approved', 'completed', 'rejected']
      if (!validStatuses.includes(req.status)) {
        console.warn('⚠️ UNKNOWN STATUS DETECTED:', {
          id: req.id,
          status: req.status,
          fullData: req
        })
      }
    })

    // Simpan semua data untuk stats calculation
    setRequests(data)
    // Filter untuk display: hanya yang masih "submitted" (belum diteruskan)
    const pendingRequests = data.filter(req => req.status === "submitted")
    setFilteredRequests(pendingRequests)
  }

  // Load all letter requests
  useEffect(() => {
    async function loadRequests() {
      try {
        await reloadRequests()
      } catch (error) {
        console.error("Error loading requests:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data permohonan surat",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    loadRequests()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = [...requests]
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }
    // Filter by type
    if (typeFilter !== "all") {
      filtered = filtered.filter((req) => req.type === typeFilter)
    }

    // Filter by tab
    if (activeTab === "pending") {
      filtered = filtered.filter((req) => req.status === "submitted")
    } else if (activeTab === "processing") {
      filtered = filtered.filter((req) => req.status === "in_review" || req.status === "in-review")
    } else if (activeTab === "completed") {
      filtered = filtered.filter((req) => req.status === "completed" || req.status === "approved")
    } else if (activeTab === "rejected") {
      filtered = filtered.filter((req) => req.status === "rejected")
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (req) =>
          req.title.toLowerCase().includes(query) ||
          req.studentName.toLowerCase().includes(query) ||
          req.studentNIM.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query)
      )
    }

    setFilteredRequests(filtered)
  }, [requests, searchQuery, statusFilter, typeFilter, activeTab])

  const handleViewRequest = (requestId: string) => {
    router.push(`/dashboard/admin_umum/correspondence/drafts/${requestId}`)
  }

  // Calculate stats
  const stats = {
    total: requests.length,
    submitted: requests.filter(r => r.status === 'submitted').length,
    inReview: requests.filter(r => r.status === 'in_review').length,
    approved: requests.filter(r => r.status === 'approved').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length
  }

  // 🔍 DEBUG: Log stats dan status distribution
  console.log('=== STATS CALCULATION ===', stats)
  const statusDistribution = requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  console.log('Status Distribution:', statusDistribution)

  // Hitung unknown status
  const knownStatusCount = stats.submitted + stats.inReview + stats.approved + stats.completed + stats.rejected
  const unknownCount = stats.total - knownStatusCount
  if (unknownCount > 0) {
    console.warn(`⚠️ Found ${unknownCount} request(s) with UNKNOWN status!`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="font-medium text-blue-500 border-blue-200 bg-blue-500/10">
            <Clock className="w-3 h-3 mr-1" />
            Diajukan
          </Badge>
        )
      case "in_review":
      case "in-review": // Support both formats
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Diproses
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="font-medium text-purple-500 border-purple-200 bg-purple-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="font-medium text-green-500 border-green-200 bg-green-500/10">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="font-medium text-red-500 border-red-200 bg-red-500/10">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        // 🔍 DEBUG: Log status yang tidak dikenali
        console.error('🚨 UNKNOWN STATUS IN BADGE:', {
          status,
          statusType: typeof status,
          statusValue: status,
          statusJSON: JSON.stringify(status)
        })
        return (
          <Badge variant="outline" className="text-gray-600 border-gray-200 bg-gray-500/10">
            Unknown ({status})
          </Badge>
        )
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="w-full h-12" />
        <div className="grid gap-4 md:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="w-full h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Permohonan Surat Mahasiswa</h1>
          <p className="text-muted-foreground">Kelola dan teruskan permohonan surat dari mahasiswa</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-lg dark:from-slate-950/40 dark:to-slate-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50">
                <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Permohonan aktif</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-800/50">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-sm font-medium">Perlu Tinjau</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.submitted}</div>
            <p className="text-xs text-muted-foreground">Menunggu tindakan</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-800/50">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle className="text-sm font-medium">Diproses</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.inReview}</div>
            <p className="text-xs text-muted-foreground">Sedang ditinjau</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg dark:from-red-950/40 dark:to-red-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-full dark:bg-red-800/50">
                <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-sm font-medium">Ditolak</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">Tidak disetujui</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-md bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-800/50">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-sm font-medium">Selesai</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Surat tersedia</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Card */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <CardTitle>Daftar Permohonan</CardTitle>
              <CardDescription>Kelola permohonan surat dari mahasiswa</CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari permohonan..."
                  className="pl-9 w-full sm:w-[250px] rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="submitted">Perlu Ditinjau</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px] rounded-full">
                  <SelectValue placeholder="Filter Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenis</SelectItem>
                  <SelectItem value="active">Surat Aktif Kuliah</SelectItem>
                  <SelectItem value="leave">Surat Cuti</SelectItem>
                  <SelectItem value="payment">Surat Pembayaran</SelectItem>
                  <SelectItem value="custom">Surat Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto">
              <TabsTrigger value="all">Semua Permohonan</TabsTrigger>
              <TabsTrigger value="pending">Perlu Ditinjau</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-4 p-4 transition-all border shadow-sm rounded-xl border-border/50 bg-card hover:shadow-md"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="grid flex-1 gap-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium">{request.title}</p>
                          <p className="text-xs text-muted-foreground">{request.purpose}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Mahasiswa</p>
                          <p className="text-sm">{request.studentName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">NIM</p>
                          <p className="text-sm">{request.studentNIM}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Prodi</p>
                          <p className="text-sm">{request.studentMajor}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">Tanggal Ajukan</p>
                          <p className="text-sm">{formatDate(request.requestDate)}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewRequest(request.id)}
                          className="rounded-full hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="w-3 h-3 mr-2" />
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-muted">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">Tidak ada permohonan</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "all"
                      ? "Belum ada permohonan surat dari mahasiswa."
                      : activeTab === "pending"
                        ? "Tidak ada permohonan yang menunggu review."
                        : activeTab === "processing"
                          ? "Tidak ada permohonan yang sedang diproses."
                          : activeTab === "completed"
                            ? "Tidak ada permohonan yang telah selesai."
                            : "Tidak ada permohonan yang ditolak."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
