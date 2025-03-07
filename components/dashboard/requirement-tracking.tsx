"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  RefreshCw,
  FileText,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  Building,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Status types
type RequirementStatus = "complete" | "in-progress" | "pending-review" | "not-started"

// Requirement interface
interface Requirement {
  id: string
  name: string
  description: string
  category: "document" | "course" | "exam" | "other"
  status: RequirementStatus
  dueDate?: string
  completedDate?: string
  notes?: string
}

export default function RequirementTracking() {
  const [activeTab, setActiveTab] = useState("semua")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "req-001",
      name: "Transkrip Nilai",
      description: "Transkrip nilai terbaru yang menunjukkan IPK dan jumlah SKS yang telah diselesaikan",
      category: "document",
      status: "complete",
      completedDate: "15 Agustus 2023",
    },
    {
      id: "req-002",
      name: "Kartu Rencana Studi (KRS)",
      description: "KRS semester berjalan yang telah disetujui oleh dosen pembimbing akademik",
      category: "document",
      status: "complete",
      completedDate: "10 Agustus 2023",
    },
    {
      id: "req-003",
      name: "Surat Keterangan Aktif",
      description: "Surat keterangan mahasiswa aktif dari universitas",
      category: "document",
      status: "complete",
      completedDate: "12 Agustus 2023",
    },
    {
      id: "req-004",
      name: "Minimal 110 SKS",
      description: "Telah menyelesaikan minimal 110 SKS dari total SKS program studi",
      category: "course",
      status: "complete",
      completedDate: "20 Juli 2023",
    },
    {
      id: "req-005",
      name: "IPK Minimal 2,75",
      description: "Memiliki Indeks Prestasi Kumulatif (IPK) minimal 2,75",
      category: "other",
      status: "complete",
      completedDate: "20 Juli 2023",
    },
    {
      id: "req-006",
      name: "Mata Kuliah Prasyarat",
      description: "Telah lulus semua mata kuliah prasyarat magang",
      category: "course",
      status: "in-progress",
      dueDate: "30 September 2023",
      notes: "Menunggu nilai akhir untuk 1 mata kuliah",
    },
    {
      id: "req-007",
      name: "Sertifikat Bahasa Inggris",
      description: "Sertifikat kemampuan bahasa Inggris (TOEFL/IELTS/setara)",
      category: "document",
      status: "pending-review",
      dueDate: "15 September 2023",
      notes: "Dokumen telah diunggah, menunggu verifikasi",
    },
    {
      id: "req-008",
      name: "Surat Persetujuan Orang Tua",
      description: "Surat persetujuan dari orang tua/wali untuk mengikuti program magang",
      category: "document",
      status: "not-started",
      dueDate: "20 September 2023",
    },
    {
      id: "req-009",
      name: "Pembayaran Biaya Magang",
      description: "Bukti pembayaran biaya administrasi magang",
      category: "other",
      status: "not-started",
      dueDate: "25 September 2023",
    },
    {
      id: "req-010",
      name: "Proposal Magang",
      description: "Proposal magang yang telah disetujui oleh dosen pembimbing",
      category: "document",
      status: "not-started",
      dueDate: "1 Oktober 2023",
    },
  ])

  // Calculate completion percentage
  const completedCount = requirements.filter((req) => req.status === "complete").length
  const totalCount = requirements.length
  const completionPercentage = Math.round((completedCount / totalCount) * 100)
  const allRequirementsComplete = completedCount === totalCount

  // Filter requirements based on active tab
  const filteredRequirements =
    activeTab === "semua"
      ? requirements
      : requirements.filter((req) => {
          if (activeTab === "selesai") return req.status === "complete"
          if (activeTab === "proses") return req.status === "in-progress"
          if (activeTab === "review") return req.status === "pending-review"
          if (activeTab === "belum") return req.status === "not-started"
          return true
        })

  // Handle refresh button click
  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call to refresh data
    setTimeout(() => {
      // For demo purposes, let's change one requirement status
      const updatedRequirements = [...requirements]
      const pendingIndex = updatedRequirements.findIndex((req) => req.status === "pending-review")
      if (pendingIndex !== -1) {
        updatedRequirements[pendingIndex].status = "complete"
        updatedRequirements[pendingIndex].completedDate = new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        delete updatedRequirements[pendingIndex].notes
      }
      setRequirements(updatedRequirements)
      setIsRefreshing(false)
    }, 1500)
  }

  // Get status badge
  const getStatusBadge = (status: RequirementStatus) => {
    switch (status) {
      case "complete":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Dalam Proses
          </Badge>
        )
      case "pending-review":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Menunggu Review
          </Badge>
        )
      case "not-started":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Belum Dimulai
          </Badge>
        )
      default:
        return null
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "document":
        return <FileText className="h-4 w-4 text-primary" />
      case "course":
        return <BookOpen className="h-4 w-4 text-primary" />
      case "exam":
        return <ClipboardCheck className="h-4 w-4 text-primary" />
      default:
        return <GraduationCap className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pelacakan Persyaratan
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Pantau status persyaratan akademik dan persiapan magang Anda</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Persyaratan</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ClipboardCheck className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCount}</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {completedCount} dari {totalCount} selesai
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progres</CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <div className="mt-2">
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Magang</CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Building className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">
              {allRequirementsComplete ? (
                <span className="text-green-500">Siap Magang</span>
              ) : (
                <span className="text-amber-500">Belum Siap</span>
              )}
            </div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">
                {allRequirementsComplete
                  ? "Anda dapat memilih lokasi magang"
                  : "Selesaikan semua persyaratan terlebih dahulu"}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden gradient-border card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tenggat Terdekat</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">15 September</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-muted-foreground">Sertifikat Bahasa Inggris</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Persyaratan</CardTitle>
            <CardDescription>Pantau dan kelola persyaratan akademik dan magang Anda</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Memperbarui..." : "Perbarui Status"}
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="semua" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="semua">Semua</TabsTrigger>
              <TabsTrigger value="selesai">Selesai</TabsTrigger>
              <TabsTrigger value="proses">Dalam Proses</TabsTrigger>
              <TabsTrigger value="review">Menunggu Review</TabsTrigger>
              <TabsTrigger value="belum">Belum Dimulai</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Persyaratan</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tenggat</TableHead>
                      <TableHead>Tanggal Selesai</TableHead>
                      <TableHead>Catatan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequirements.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{req.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">{req.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(req.category)}
                            <span className="capitalize">
                              {req.category === "document"
                                ? "Dokumen"
                                : req.category === "course"
                                  ? "Mata Kuliah"
                                  : req.category === "exam"
                                    ? "Ujian"
                                    : "Lainnya"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(req.status)}</TableCell>
                        <TableCell>
                          {req.dueDate ? (
                            <span
                              className={cn(
                                "text-sm",
                                new Date(req.dueDate) < new Date() && req.status !== "complete"
                                  ? "text-red-500 font-medium"
                                  : "text-muted-foreground",
                              )}
                            >
                              {req.dueDate}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {req.completedDate ? (
                            <span className="text-sm text-green-500">{req.completedDate}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {req.notes ? (
                            <span className="text-sm text-muted-foreground">{req.notes}</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

