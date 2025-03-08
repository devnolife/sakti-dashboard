"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FileText, CheckCircle, XCircle, Clock, Eye, Download } from "lucide-react"

// Mock data for correspondence items
const correspondenceData = [
  {
    id: "corr-001",
    title: "Surat Kerjasama dengan Industri",
    type: "Kerjasama",
    sender: "Wakil Dekan 2",
    date: "2023-10-15",
    status: "pending",
    priority: "high",
  },
  {
    id: "corr-002",
    title: "Surat Pengangkatan Dosen Tetap",
    type: "Kepegawaian",
    sender: "Kepala HRD",
    date: "2023-10-14",
    status: "pending",
    priority: "medium",
  },
  {
    id: "corr-003",
    title: "Surat Persetujuan Anggaran Penelitian",
    type: "Keuangan",
    sender: "Wakil Dekan 2",
    date: "2023-10-13",
    status: "pending",
    priority: "high",
  },
  {
    id: "corr-004",
    title: "Surat Undangan Seminar Internasional",
    type: "Akademik",
    sender: "Wakil Dekan 1",
    date: "2023-10-12",
    status: "approved",
    priority: "medium",
  },
  {
    id: "corr-005",
    title: "Surat Keputusan Kelulusan Mahasiswa",
    type: "Akademik",
    sender: "Kepala Akademik",
    date: "2023-10-11",
    status: "approved",
    priority: "high",
  },
  {
    id: "corr-006",
    title: "Surat Permohonan Dana Kegiatan Mahasiswa",
    type: "Keuangan",
    sender: "Ketua BEM",
    date: "2023-10-10",
    status: "rejected",
    priority: "low",
  },
  {
    id: "corr-007",
    title: "Surat Persetujuan Jadwal Ujian",
    type: "Akademik",
    sender: "Wakil Dekan 1",
    date: "2023-10-09",
    status: "approved",
    priority: "medium",
  },
]

export function CorrespondenceApproval() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCorrespondence, setSelectedCorrespondence] = useState<string | null>(null)

  const pendingCorrespondence = correspondenceData.filter((item) => item.status === "pending")
  const approvedCorrespondence = correspondenceData.filter((item) => item.status === "approved")
  const rejectedCorrespondence = correspondenceData.filter((item) => item.status === "rejected")

  const filteredCorrespondence = correspondenceData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sender.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            Tinggi
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            Sedang
          </Badge>
        )
      case "low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            Rendah
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Persetujuan Surat</h2>
        <p className="text-muted-foreground mt-2">Kelola dan setujui surat-surat yang memerlukan tanda tangan Dekan</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-amber-100 shadow-md transition-all hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-800/50">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Menunggu Persetujuan</CardTitle>
                <CardDescription>Surat yang memerlukan tindakan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{pendingCorrespondence.length}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/50">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Disetujui</CardTitle>
                <CardDescription>Surat yang telah disetujui</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedCorrespondence.length}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-red-50 to-red-100 shadow-md transition-all hover:shadow-lg dark:from-red-950/40 dark:to-red-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-800/50">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Ditolak</CardTitle>
                <CardDescription>Surat yang ditolak</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedCorrespondence.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Surat</CardTitle>
              <CardDescription>Kelola dan tinjau surat yang memerlukan persetujuan</CardDescription>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari surat..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Menunggu</TabsTrigger>
              <TabsTrigger value="approved">Disetujui</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredCorrespondence.length > 0 ? (
                  filteredCorrespondence.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="grid gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.title}</p>
                          {getPriorityBadge(item.priority)}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">Tipe: {item.type}</span>
                          <span className="mr-2">•</span>
                          <span>Dari: {item.sender}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tanggal:{" "}
                          {new Date(item.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <div className="mt-2 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full hover:bg-primary/10 hover:text-primary"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Unduh
                          </Button>
                          {item.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full hover:bg-green-500/10 hover:text-green-500"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Setujui
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Tolak
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Tidak ada surat yang ditemukan</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingCorrespondence.length > 0 ? (
                  pendingCorrespondence
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.sender.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Tipe: {item.type}</span>
                            <span className="mr-2">•</span>
                            <span>Dari: {item.sender}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Tanggal:{" "}
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Unduh
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-green-500/10 hover:text-green-500"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Setujui
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Tolak
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Tidak ada surat yang menunggu persetujuan
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="space-y-4">
                {approvedCorrespondence.length > 0 ? (
                  approvedCorrespondence
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.sender.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Tipe: {item.type}</span>
                            <span className="mr-2">•</span>
                            <span>Dari: {item.sender}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Tanggal:{" "}
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Unduh
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Tidak ada surat yang disetujui</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="space-y-4">
                {rejectedCorrespondence.length > 0 ? (
                  rejectedCorrespondence
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.sender.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {getPriorityBadge(item.priority)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Tipe: {item.type}</span>
                            <span className="mr-2">•</span>
                            <span>Dari: {item.sender}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Tanggal:{" "}
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-blue-500/10 hover:text-blue-500"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Unduh
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Tidak ada surat yang ditolak</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

