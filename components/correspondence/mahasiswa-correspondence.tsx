"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye, Plus, Search, Calendar, Trash2 } from "lucide-react"
import { getStudentLetterRequests, deleteLetterRequest } from "@/app/actions/correspondence-actions"
import { formatDate } from "@/lib/utils"
import type { LetterRequest } from "@/types/correspondence"
import { LetterRequestDetails } from "./letter-request-details"
import { LetterCreationDialog } from "./letter-creation-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Define the component as a void element (no children)
type MahasiswaCorrespondenceProps = Record<string, never>


export function MahasiswaCorrespondence(_props: MahasiswaCorrespondenceProps) {
  const { user, isLoading: authLoading } = useAuth()
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [letterDialogOpen, setLetterDialogOpen] = useState(false)
  const [selectedLetterType, setSelectedLetterType] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Removed hardcoded userId
  const [studentId, setStudentId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStudentAndRequests() {
      try {
        if (!user?.id) return
        // Fetch student profile using authenticated user id
        const token = typeof window !== 'undefined' ? localStorage.getItem('session-token') : null
        const response = await fetch('/api/student/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ userId: user.id })
        })
        if (response.ok) {
          const student = await response.json()
          setStudentId(student.id)

          // Fetch letter requests
          const data = await getStudentLetterRequests(student.id)
          setRequests(data)
          setFilteredRequests(data)
        } else {
          console.error('Failed to load student profile')
        }
      } catch (error) {
        console.error("Error fetching student and letter requests:", error)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      if (!user?.id) {
        setLoading(false)
      } else {
        fetchStudentAndRequests()
      }
    }
  }, [authLoading, user?.id])

  useEffect(() => {
    // Apply filters
    let filtered = [...requests]

    // Filter by status if not "all"
    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter)
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
  }, [requests, searchQuery, statusFilter])

  const handleViewDetails = (request: LetterRequest) => {
    setSelectedRequest(request)
    setShowDetails(true)
  }

  const openLetterDialog = (type: string) => {
    setSelectedLetterType(type)
    setLetterDialogOpen(true)
  }

  const handleDeleteClick = (requestId: string) => {
    setRequestToDelete(requestId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteRequest = async (requestId: string) => {
    setIsDeleting(true)
    try {
      const result = await deleteLetterRequest(requestId)

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permohonan surat berhasil dihapus",
        })

        // Remove from local state
        setRequests(prev => prev.filter(req => req.id !== requestId))
        setFilteredRequests(prev => prev.filter(req => req.id !== requestId))
        setDeleteDialogOpen(false)
        setRequestToDelete(null)
      } else {
        toast({
          title: "Gagal",
          description: result.message || "Gagal menghapus permohonan surat",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error deleting letter request:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus permohonan",
        variant: "destructive"
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const confirmDelete = () => {
    if (requestToDelete) {
      handleDeleteRequest(requestToDelete)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="text-xs font-medium text-blue-600 border-blue-200 bg-blue-500/10 shrink-0 dark:text-blue-400 dark:border-blue-800">
            <Clock className="mr-1 h-2.5 w-2.5" />
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="text-xs font-medium bg-amber-500/10 text-amber-600 border-amber-200 shrink-0 dark:text-amber-400 dark:border-amber-800">
            <AlertCircle className="mr-1 h-2.5 w-2.5" />
            Diproses
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="text-xs font-medium text-green-600 border-green-200 bg-green-500/10 shrink-0 dark:text-green-400 dark:border-green-800">
            <CheckCircle className="mr-1 h-2.5 w-2.5" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-xs font-medium text-red-600 border-red-200 bg-red-500/10 shrink-0 dark:text-red-400 dark:border-red-800">
            <XCircle className="mr-1 h-2.5 w-2.5" />
            Ditolak
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-xs font-medium text-green-600 border-green-200 bg-green-500/10 shrink-0 dark:text-green-400 dark:border-green-800">
            <CheckCircle className="mr-1 h-2.5 w-2.5" />
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>
    }
  }

  const submittedRequests = requests.filter((req) => req.status === "submitted")
  const inReviewRequests = requests.filter((req) => req.status === "in-review")
  const approvedRequests = requests.filter((req) => req.status === "approved")
  const completedRequests = requests.filter((req) => req.status === "completed")
  const rejectedRequests = requests.filter((req) => req.status === "rejected")

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card key={i} className="overflow-hidden border-none shadow-sm">
              <CardHeader className="px-4 pt-4 pb-3">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-3 mt-1 w-36" />
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader className="px-5 pt-5 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-40 h-3 mt-1" />
              </div>
              <Skeleton className="rounded h-9 w-9" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pt-4 pb-5">
            <Skeleton className="w-full mb-4 h-9" />
            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-full h-20" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-3 mb-5 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Layanan Surat</h1>
          <p className="text-sm text-muted-foreground">Ajukan dan pantau status permohonan surat Anda</p>
        </div>

        <Button
          onClick={() => openLetterDialog("active")}
          className="gap-2 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary h-9"
        >
          <Plus className="w-4 h-4" />
          Buat Surat Baru
        </Button>
      </div>

      <div className="grid gap-3 mb-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        <Card className="overflow-hidden transition-all border-none shadow-sm bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-md dark:from-blue-950/40 dark:to-blue-900/40">
          <CardHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-800/50">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Diajukan</CardTitle>
                  <CardDescription className="text-xs">Menunggu review</CardDescription>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{submittedRequests.length}</div>
            </div>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-sm bg-gradient-to-br from-amber-50 to-amber-100 hover:shadow-md dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 dark:bg-amber-800/50">
                  <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Diproses</CardTitle>
                  <CardDescription className="text-xs">Sedang ditinjau</CardDescription>
                </div>
              </div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{inReviewRequests.length}</div>
            </div>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-sm bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-md dark:from-purple-950/40 dark:to-purple-900/40">
          <CardHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 dark:bg-purple-800/50">
                  <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Disetujui</CardTitle>
                  <CardDescription className="text-xs">Menunggu pembuatan</CardDescription>
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{approvedRequests.length}</div>
            </div>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-sm bg-gradient-to-br from-green-50 to-green-100 hover:shadow-md dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 dark:bg-green-800/50">
                  <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Selesai</CardTitle>
                  <CardDescription className="text-xs">Siap diunduh</CardDescription>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{completedRequests.length}</div>
            </div>
          </CardHeader>
        </Card>

        <Card className="overflow-hidden transition-all border-none shadow-sm bg-gradient-to-br from-red-50 to-red-100 hover:shadow-md dark:from-red-950/40 dark:to-red-900/40">
          <CardHeader className="px-4 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10 dark:bg-red-800/50">
                  <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Ditolak</CardTitle>
                  <CardDescription className="text-xs">Tidak disetujui</CardDescription>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{rejectedRequests.length}</div>
            </div>
          </CardHeader>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="px-5 pt-5 pb-4 border-b">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <CardTitle className="text-lg font-semibold">Daftar Permohonan</CardTitle>
              <CardDescription className="text-xs mt-0.5">Semua permohonan surat Anda</CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Cari permohonan..."
                  className="pl-8 h-9 w-full sm:w-[200px] text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[150px] text-sm">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="submitted">Diajukan</SelectItem>
                  <SelectItem value="in-review">Diproses</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 pt-4 pb-5">
          <div className="space-y-3">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <Card
                  key={request.id}
                  className="transition-all border shadow-sm group border-border/50 hover:border-primary/30 hover:shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-primary/10 shrink-0 group-hover:bg-primary/15">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <CardTitle className="text-base font-semibold leading-tight">{request.title}</CardTitle>
                          {getStatusBadge(request.status)}
                        </div>
                        <CardDescription className="mt-1 text-xs">{request.purpose}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(request.requestDate)}
                        </p>
                        {request.approvedDate && (
                          <p className="text-xs text-green-600 flex items-center gap-1.5 dark:text-green-400">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Disetujui {formatDate(request.approvedDate)}
                          </p>
                        )}
                        {request.completedDate && (
                          <p className="text-xs text-blue-600 flex items-center gap-1.5 dark:text-blue-400">
                            <FileText className="h-3.5 w-3.5" />
                            Selesai {formatDate(request.completedDate)}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(request)}
                          className="h-8 px-3 text-xs hover:bg-primary/10 hover:text-primary shrink-0"
                        >
                          <Eye className="mr-1.5 h-3.5 w-3.5" />
                          Detail
                        </Button>
                        {request.status === "submitted" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(request.id)}
                            className="h-8 px-3 text-xs hover:bg-destructive/10 hover:text-destructive shrink-0"
                          >
                            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                            Hapus
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="px-4 py-12 text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-muted/50">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="mb-1 text-base font-semibold">Tidak ada permohonan</h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  {searchQuery || statusFilter !== "all"
                    ? "Tidak ada permohonan surat yang sesuai dengan filter."
                    : "Anda belum mengajukan permohonan surat apapun."}
                </p>
                <Button onClick={() => openLetterDialog("active")} size="sm">
                  <Plus className="mr-1.5 h-4 w-4" />
                  Buat Permohonan Baru
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedRequest && (
        <LetterRequestDetails
          request={selectedRequest}
          open={showDetails}
          onClose={() => setShowDetails(false)}
          onDelete={handleDeleteRequest}
          role="mahasiswa"
        />
      )}

      <LetterCreationDialog
        open={letterDialogOpen}
        onOpenChange={setLetterDialogOpen}
        letterType={selectedLetterType}
        existingRequests={requests}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Permohonan Surat?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Permohonan surat akan dihapus secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

