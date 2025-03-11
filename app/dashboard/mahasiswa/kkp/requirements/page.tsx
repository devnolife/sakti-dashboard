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

export default function RequirementsPage() {
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
      name: "Proposal KKP",
      description: "Proposal rencana kegiatan KKP yang telah disetujui oleh dosen pembimbing",
      category: "document",
      status: "not-started",
      dueDate: "5 Oktober 2023",
    },
    {
      id: "req-009",
      name: "Ujian Kelayakan KKP",
      description: "Ujian untuk menentukan kelayakan mengikuti KKP",
      category: "exam",
      status: "not-started",
      dueDate: "10 Oktober 2023",
    },
  ])

  // Status count for progress bar
  const total = requirements.length
  const completed = requirements.filter((r) => r.status === "complete").length
  const inProgress = requirements.filter((r) => r.status === "in-progress").length
  const pendingReview = requirements.filter((r) => r.status === "pending-review").length
  const notStarted = requirements.filter((r) => r.status === "not-started").length
  
  // Progress percentage
  const progress = Math.round((completed / total) * 100)

  // Filter requirements based on active tab
  const filteredRequirements = requirements.filter((req) => {
    if (activeTab === "semua") return true
    if (activeTab === "selesai") return req.status === "complete"
    if (activeTab === "dalam-proses") return req.status === "in-progress"
    if (activeTab === "menunggu-verifikasi") return req.status === "pending-review"
    if (activeTab === "belum-dimulai") return req.status === "not-started"
    if (activeTab === "dokumen") return req.category === "document"
    if (activeTab === "mata-kuliah") return req.category === "course"
    if (activeTab === "ujian") return req.category === "exam"
    return true
  })

  // Simulated refresh function
  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  // Get status badge for requirement
  const getStatusBadge = (status: RequirementStatus) => {
    switch (status) {
      case "complete":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Dalam Proses
          </Badge>
        )
      case "pending-review":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Menunggu Verifikasi
          </Badge>
        )
      case "not-started":
        return (
          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-200">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Belum Dimulai
          </Badge>
        )
      default:
        return null
    }
  }

  // Get category icon for requirement
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "document":
        return <FileText className="h-4 w-4 text-primary" />
      case "course":
        return <BookOpen className="h-4 w-4 text-amber-500" />
      case "exam":
        return <ClipboardCheck className="h-4 w-4 text-green-500" />
      case "other":
        return <Building className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Persyaratan KKP
            </span>
          </h1>
          <p className="text-muted-foreground">
            Persyaratan wajib untuk mengikuti program Kuliah Kerja Praktik
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
          Perbarui
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Progres Persyaratan</CardTitle>
          <CardDescription>Ringkasan kemajuan persyaratan KKP Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Kemajuan</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Card className="border border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Selesai</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
                      {completed}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Dalam Proses</span>
                    </div>
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-200">
                      {inProgress}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium">Menunggu Verifikasi</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
                      {pendingReview}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-5 w-5 text-gray-500" />
                      <span className="text-sm font-medium">Belum Dimulai</span>
                    </div>
                    <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-200">
                      {notStarted}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Daftar Persyaratan</CardTitle>
          <CardDescription>Daftar lengkap semua persyaratan KKP</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="semua" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex h-auto flex-wrap space-x-2">
              <TabsTrigger value="semua" className="mb-2">
                Semua
              </TabsTrigger>
              <TabsTrigger value="selesai" className="mb-2">
                Selesai
              </TabsTrigger>
              <TabsTrigger value="dalam-proses" className="mb-2">
                Dalam Proses
              </TabsTrigger>
              <TabsTrigger value="menunggu-verifikasi" className="mb-2">
                Menunggu Verifikasi
              </TabsTrigger>
              <TabsTrigger value="belum-dimulai" className="mb-2">
                Belum Dimulai
              </TabsTrigger>
              <TabsTrigger value="dokumen" className="mb-2">
                Dokumen
              </TabsTrigger>
              <TabsTrigger value="mata-kuliah" className="mb-2">
                Mata Kuliah
              </TabsTrigger>
              <TabsTrigger value="ujian" className="mb-2">
                Ujian
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[350px]">Persyaratan</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Catatan</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequirements.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(req.category)}
                          <span className="text-sm">
                            {req.category === "document" && "Dokumen"}
                            {req.category === "course" && "Mata Kuliah"}
                            {req.category === "exam" && "Ujian"}
                            {req.category === "other" && "Lainnya"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                      <TableCell>
                        {req.completedDate && (
                          <div className="text-sm text-green-600">
                            Diselesaikan: {req.completedDate}
                          </div>
                        )}
                        {!req.completedDate && req.dueDate && (
                          <div className="text-sm text-amber-600">
                            Batas Waktu: {req.dueDate}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate text-sm text-muted-foreground">
                          {req.notes || "-"}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

