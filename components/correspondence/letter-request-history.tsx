"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Search, Eye } from "lucide-react"
import { History } from "lucide-react"
import { getStudentLetterRequests } from "@/app/actions/correspondence-actions"
import type { LetterRequest } from "@/types/correspondence"
import { LetterRequestDetails } from "./letter-request-details"

export function LetterRequestHistory() {
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // In a real app, we would get the student ID from the session
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
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = [...requests]

    // Filter by status
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
            Diajukan
          </Badge>
        )
      case "in-review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            Dalam Review
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            Ditolak
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            Selesai
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "in-review":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <History className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Riwayat Permohonan Surat</CardTitle>
              <CardDescription>Daftar semua permohonan surat yang pernah Anda ajukan</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                placeholder="Cari permohonan..."
                className="pl-10 rounded-full border-primary/20 focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] rounded-full border-primary/20">
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

          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {getStatusIcon(request.status)}
                  </div>
                  <div className="grid gap-1 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{request.title}</p>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-xs text-muted-foreground">{request.purpose}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        Diajukan pada{" "}
                        {new Date(request.requestDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      {request.approvedDate && (
                        <p className="text-xs text-muted-foreground flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                          Disetujui pada{" "}
                          {new Date(request.approvedDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                      {request.completedDate && (
                        <p className="text-xs text-muted-foreground flex items-center">
                          <FileText className="h-3 w-3 mr-1 text-blue-500" />
                          Selesai pada{" "}
                          {new Date(request.completedDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
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
              <div className="text-center py-4 text-muted-foreground">Tidak ada permohonan surat yang ditemukan</div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedRequest && (
        <LetterRequestDetails request={selectedRequest} open={showDetails} onClose={() => setShowDetails(false)} />
      )}
    </>
  )
}

