"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react"
import { getStudentLetterRequests } from "@/app/actions/correspondence-actions"
import type { LetterRequest } from "@/types/correspondence"
import { LetterRequestDetails } from "./letter-request-details"

export function CorrespondenceDashboard() {
  const [requests, setRequests] = useState<LetterRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<LetterRequest | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // In a real app, we would get the student ID from the session
  const studentId = "std-001"

  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getStudentLetterRequests(studentId)
        setRequests(data)
      } catch (error) {
        console.error("Error fetching letter requests:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [])

  const pendingRequests = requests.filter((req) => req.status === "submitted" || req.status === "in-review")
  const completedRequests = requests.filter((req) => req.status === "completed" || req.status === "approved")
  const rejectedRequests = requests.filter((req) => req.status === "rejected")

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
      <div className="grid gap-4 md:grid-cols-3">
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

      <Card className="border-none shadow-md">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Permohonan Terbaru</CardTitle>
              <CardDescription>Status permohonan surat Anda</CardDescription>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Dalam Proses</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {requests.length > 0 ? (
                  requests.map((request) => (
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
                        <p className="text-xs text-muted-foreground">
                          Diajukan pada{" "}
                          {new Date(request.requestDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
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
                  <div className="text-center py-4 text-muted-foreground">Tidak ada permohonan surat</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
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
                        <p className="text-xs text-muted-foreground">
                          Diajukan pada{" "}
                          {new Date(request.requestDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
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
                  <div className="text-center py-4 text-muted-foreground">Tidak ada permohonan surat dalam proses</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4">
                {completedRequests.length > 0 ? (
                  completedRequests.map((request) => (
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
                        <p className="text-xs text-muted-foreground">
                          Diajukan pada{" "}
                          {new Date(request.requestDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
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
                  <div className="text-center py-4 text-muted-foreground">Tidak ada permohonan surat yang selesai</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="space-y-4">
                {rejectedRequests.length > 0 ? (
                  rejectedRequests.map((request) => (
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
                        <p className="text-xs text-muted-foreground">
                          Diajukan pada{" "}
                          {new Date(request.requestDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
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
                  <div className="text-center py-4 text-muted-foreground">Tidak ada permohonan surat yang ditolak</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedRequest && (
        <LetterRequestDetails request={selectedRequest} open={showDetails} onClose={() => setShowDetails(false)} />
      )}
    </>
  )
}

