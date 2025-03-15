"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Plus, Search, Calendar } from "lucide-react"
import { getStudentLetterRequests } from "@/app/actions/correspondence-actions"
import { formatDate } from "@/lib/utils"
import type { LetterRequest } from "@/types/correspondence"
import { LetterRequestDetails } from "./letter-request-details"
import { LetterCreationDialog } from "./letter-creation-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define the component as a void element (no children)
type MahasiswaCorrespondenceProps = Record<string, never>

export function MahasiswaCorrespondence(_props: MahasiswaCorrespondenceProps) {
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [letterDialogOpen, setLetterDialogOpen] = useState(false)
  const [selectedLetterType, setSelectedLetterType] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Use a hardcoded student ID for demo purposes
  const studentId = "std-001"

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getStudentLetterRequests(studentId)
        setRequests(data)
        setFilteredRequests(data)
      } catch (error) {
        console.error("Error fetching letter requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [studentId])

  useEffect(() => {
    // Apply filters
    let filtered = [...requests]

    // Filter by status if not "all"
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
    }

    // Filter by tab
    if (activeTab === "active") {
      filtered = filtered.filter((req) => req.status === "submitted" || req.status === "in-review")
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
          req.purpose.toLowerCase().includes(query) ||
          req.description.toLowerCase().includes(query),
      )
    }

    setFilteredRequests(filtered)
  }, [requests, searchQuery, statusFilter, activeTab])

  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setShowDetails(true)
  }

  const openLetterDialog = (type: string) => {
    setSelectedLetterType(type)
    setLetterDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200 font-medium">
            <Clock className="mr-1 h-3 w-3" />
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200 font-medium">
            <AlertCircle className="mr-1 h-3 w-3" />
            Dalam Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200 font-medium">
            <CheckCircle className="mr-1 h-3 w-3" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200 font-medium">
            <XCircle className="mr-1 h-3 w-3" />
            Ditolak
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200 font-medium">
            <CheckCircle className="mr-1 h-3 w-3" />
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const pendingRequests = requests.filter((req) => req.status === "submitted" || req.status === "in-review")
  const completedRequests = requests.filter((req) => req.status === "completed" || req.status === "approved")
  const rejectedRequests = requests.filter((req) => req.status === "rejected")

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-none shadow-md">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-md">
          <CardHeader className="border-b pb-3">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <Skeleton className="h-10 w-full mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Layanan Surat</h1>
          <p className="text-muted-foreground">Ajukan dan pantau status permohonan surat Anda</p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => openLetterDialog("active")}
            className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            <Plus className="h-4 w-4" />
            Buat Surat Baru
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 shadow-md transition-all hover:shadow-lg dark:from-blue-950/40 dark:to-blue-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-800/50">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Permohonan Aktif</CardTitle>
                <CardDescription>Permohonan yang sedang diproses</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pendingRequests.length}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/50">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Permohonan Selesai</CardTitle>
                <CardDescription>Permohonan yang telah disetujui</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completedRequests.length}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-red-50 to-red-100 shadow-md transition-all hover:shadow-lg dark:from-red-950/40 dark:to-red-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-800/50">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Permohonan Ditolak</CardTitle>
                <CardDescription>Permohonan yang ditolak</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedRequests.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md mb-6">
        <CardHeader className="border-b pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Permohonan Surat</CardTitle>
              <CardDescription>Daftar permohonan surat Anda</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                  <SelectItem value="submitted">Diajukan</SelectItem>
                  <SelectItem value="in-review">Dalam Review</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="active">Aktif</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="grid gap-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{request.title}</p>
                        {getStatusBadge(request.status)}
                      </div>
                      <p className="text-xs text-muted-foreground">{request.purpose}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                          Diajukan pada {formatDate(request.requestDate)}
                        </p>
                        {request.approvedDate && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                            Disetujui pada {formatDate(request.approvedDate)}
                          </p>
                        )}
                        {request.completedDate && (
                          <p className="text-xs text-muted-foreground flex items-center">
                            <FileText className="h-3 w-3 mr-1 text-blue-500" />
                            Selesai pada {formatDate(request.completedDate)}
                          </p>
                        )}
                      </div>
                      <div className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(request)}
                          className="rounded-full hover:bg-primary/10 hover:text-primary"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 px-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Tidak ada permohonan surat</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "all"
                      ? "Anda belum mengajukan permohonan surat apapun."
                      : activeTab === "active"
                        ? "Anda tidak memiliki permohonan surat yang sedang aktif."
                        : activeTab === "completed"
                          ? "Anda belum memiliki permohonan surat yang selesai."
                          : "Anda tidak memiliki permohonan surat yang ditolak."}
                  </p>
                  <Button onClick={() => openLetterDialog("active")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Permohonan Baru
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedRequest && (
        <LetterRequestDetails request={selectedRequest} open={showDetails} onClose={() => setShowDetails(false)} />
      )}

      <LetterCreationDialog
        open={letterDialogOpen}
        onOpenChange={setLetterDialogOpen}
        letterType={selectedLetterType}
      />
    </>
  )
}

