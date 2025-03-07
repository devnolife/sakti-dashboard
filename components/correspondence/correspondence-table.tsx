"use client"

import { TableHeader } from "@/components/ui/table"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Download,
  Calendar,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
} from "lucide-react"
import { formatDate } from "@/lib/utils"
import { LetterRequestDetails } from "./letter-request-details"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Types
import type { LetterRequest } from "@/types/correspondence"

type SortField = "requestDate" | "title" | "status"
type SortDirection = "asc" | "desc"

interface CorrespondenceTableProps {
  requests: LetterRequest[]
  onViewDetails?: (request: LetterRequest) => void
  onStatusChange?: (requestId: string, status: string, notes?: string) => void
  onCreateTemplate?: (requestId: string) => void
  role?: string
}

export function CorrespondenceTable({
  requests = [],
  onViewDetails,
  onStatusChange,
  onCreateTemplate,
  role = "staff_tu",
}: CorrespondenceTableProps) {
  const [filteredRequests, setFilteredRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [sortField, setSortField] = useState<SortField>("requestDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const itemsPerPage = 10

  // Initialize with provided requests
  useEffect(() => {
    if (JSON.stringify(filteredRequests) !== JSON.stringify(requests)) {
      setFilteredRequests(requests)
      setLoading(false)
    }
  }, [requests, filteredRequests])

  // Apply sorting and filtering
  useEffect(() => {
    const filtered = requests.filter(
      (request) =>
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    const sorted = [...filtered]

    // Apply sorting
    sorted.sort((a, b) => {
      let aValue, bValue

      switch (sortField) {
        case "requestDate":
          aValue = new Date(a.requestDate).getTime()
          bValue = new Date(b.requestDate).getTime()
          break
        case "title":
          aValue = a.title
          bValue = b.title
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        default:
          aValue = new Date(a.requestDate).getTime()
          bValue = new Date(b.requestDate).getTime()
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // Only update state if the sorted array is different from the current filteredRequests
    if (JSON.stringify(sorted) !== JSON.stringify(filteredRequests)) {
      setFilteredRequests(sorted)
    }
  }, [requests, sortField, sortDirection, searchQuery])

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Handle view details
  const handleViewDetails = (request: LetterRequest) => {
    if (onViewDetails) {
      onViewDetails(request)
    } else {
      setSelectedRequest(request)
      setShowDetails(true)
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Status badge
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

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="bg-white dark:bg-card">
      <div className="rounded-md border-0">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead onClick={() => handleSort("requestDate")} className="cursor-pointer w-[140px]">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  Tanggal
                  <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="w-[180px]">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  Mahasiswa
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
                <div className="flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  Subjek
                  <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
                <div className="flex items-center">
                  Status
                  <ArrowUpDown className="ml-1 h-3 w-3 text-muted-foreground" />
                </div>
              </TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Tidak ada korespondensi yang ditemukan
                </TableCell>
              </TableRow>
            ) : (
              paginatedRequests.map((request) => (
                <TableRow key={request.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{formatDate(request.requestDate)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-primary/10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {getInitials(request.studentName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{request.studentName}</div>
                        <div className="text-xs text-muted-foreground">{request.studentNIM}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{request.title}</div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {request.purpose.length > 60 ? `${request.purpose.substring(0, 60)}...` : request.purpose}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(request)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </DropdownMenuItem>
                        {request.status === "completed" && (
                          <DropdownMenuItem className="cursor-pointer">
                            <Download className="mr-2 h-4 w-4" />
                            Unduh Surat
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, filteredRequests.length)} dari {filteredRequests.length} item
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Page</span>
            </Button>
            <div className="text-sm font-medium">
              Halaman {currentPage} dari {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        </div>
      )}

      {selectedRequest && (
        <LetterRequestDetails request={selectedRequest} open={showDetails} onClose={() => setShowDetails(false)} />
      )}
    </div>
  )
}

