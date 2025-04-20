"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CheckCircle2,
  FileText,
  Search,
  Filter,
  AlertCircle,
  Clock,
  Download,
  FileCheck,
  XCircle,
  ChevronDown,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useRole } from "@/context/role-context"
import { useRouter } from "next/navigation"

// Data contoh untuk permintaan KKP mahasiswa
const studentRequests = [
  {
    id: "REQ-2023-001",
    student: {
      id: "12345678",
      name: "Andi Saputra",
      avatar: "/placeholder.svg?height=40&width=40",
      program: "Informatika",
      semester: 7,
    },
    location: {
      name: "PT Teknologi Maju",
      address: "Jakarta Selatan",
      type: "Teknologi Informasi",
    },
    group: {
      id: "GRP-2023-001",
      members: [
        { id: "12345678", name: "Andi Saputra", role: "Ketua" },
        { id: "23456789", name: "Rina Dewi", role: "Anggota" },
        { id: "34567890", name: "Farhan Nugraha", role: "Anggota" },
      ],
    },
    submissionDate: "2023-09-10",
    status: "pending",
    documents: {
      proposal: true,
      parentalConsent: true,
      transcript: true,
      applicationLetter: false,
    },
    letterGenerated: false,
  },
  {
    id: "REQ-2023-002",
    student: {
      id: "23456789",
      name: "Rina Dewi",
      avatar: "/placeholder.svg?height=40&width=40",
      program: "Informatika",
      semester: 7,
    },
    location: {
      name: "PT Teknologi Maju",
      address: "Jakarta Selatan",
      type: "Teknologi Informasi",
    },
    group: {
      id: "GRP-2023-001",
      members: [
        { id: "12345678", name: "Andi Saputra", role: "Ketua" },
        { id: "23456789", name: "Rina Dewi", role: "Anggota" },
        { id: "34567890", name: "Farhan Nugraha", role: "Anggota" },
      ],
    },
    submissionDate: "2023-09-10",
    status: "pending",
    documents: {
      proposal: true,
      parentalConsent: true,
      transcript: true,
      applicationLetter: false,
    },
    letterGenerated: false,
  },
  // Data contoh lainnya...
]

export default function KKPRequestsPage() {
  const [requests, setRequests] = useState(studentRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const { role } = useRole()
  const router = useRouter()

  useEffect(() => {
    if (role !== "admin" && role !== "department_head") {
      router.push("/dashboard")
    }
  }, [role, router])

  if (role !== "admin" && role !== "department_head") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Memuat...</h2>
          <p className="text-muted-foreground">Mohon tunggu sementara kami memeriksa izin Anda.</p>
        </div>
      </div>
    )
  }

  // Filter permintaan berdasarkan kata pencarian dan filter status
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && request.status === "pending") ||
      (activeTab === "approved" && request.status === "approved") ||
      (activeTab === "rejected" && request.status === "rejected") ||
      (activeTab === "in-review" && request.status === "in-review")

    return matchesSearch && matchesStatus && matchesTab
  })

  // Fungsi untuk membuat surat
  const handleGenerateLetter = (requestId) => {
    // Simulasi pembuatan surat
    setRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === requestId ? { ...request, letterGenerated: true } : request)),
    )

    // Tampilkan pemberitahuan sukses
    toast({
      title: "Surat Berhasil Dibuat",
      description: `Surat persetujuan untuk permintaan ${requestId} telah dibuat.`,
      duration: 5000,
    })
  }

  // Fungsi untuk menyetujui permintaan
  const handleApproveRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: "approved", documents: { ...request.documents, applicationLetter: true } }
          : request,
      ),
    )

    toast({
      title: "Permintaan Disetujui",
      description: `Permintaan ${requestId} telah disetujui.`,
      duration: 5000,
    })
  }

  // Fungsi untuk menolak permintaan
  const handleRejectRequest = (requestId) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, status: "rejected", rejectionReason: "Dokumen tidak lengkap" }
          : request,
      ),
    )

    toast({
      title: "Permintaan Ditolak",
      description: `Permintaan ${requestId} telah ditolak.`,
      duration: 5000,
    })
  }

  // Mendapatkan lencana status
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Tertunda
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "in-review":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            Dalam Peninjauan
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pengelolaan Permintaan KKP
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Kelola permintaan KKP mahasiswa, tinjau dokumen, dan buat surat persetujuan
        </p>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span>Permintaan KKP Mahasiswa</span>
          </CardTitle>
          <CardDescription>Tinjau dan proses permintaan KKP mahasiswa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari berdasarkan nama atau ID..."
                className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter berdasarkan status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Tertunda</SelectItem>
                  <SelectItem value="in-review">Dalam Peninjauan</SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua Permintaan</TabsTrigger>
              <TabsTrigger value="pending">Tertunda</TabsTrigger>
              <TabsTrigger value="in-review">Dalam Peninjauan</TabsTrigger>
              <TabsTrigger value="approved">Disetujui</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Mahasiswa</TableHead>
                      <TableHead>ID Permintaan</TableHead>
                      <TableHead>Lokasi</TableHead>
                      <TableHead>Kelompok</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dokumen</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <AlertCircle className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground">Tidak ada permintaan ditemukan</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={request.student.avatar} alt={request.student.name} />
                                <AvatarFallback>
                                  {request.student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{request.student.name}</p>
                                <p className="text-xs text-muted-foreground">NIM: {request.student.id}</p>
                                <p className="text-xs text-muted-foreground">{request.student.program}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{request.id}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.location.name}</p>
                              <p className="text-xs text-muted-foreground">{request.location.address}</p>
                              <p className="text-xs text-muted-foreground">{request.location.type}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <div className="flex -space-x-2">
                                {request.group.members.slice(0, 3).map((member, index) => (
                                  <div
                                    key={member.id}
                                    className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs ring-2 ring-background"
                                    title={`${member.name} (${member.role})`}
                                  >
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </div>
                                ))}
                                {request.group.members.length > 3 && (
                                  <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs ring-2 ring-background">
                                    +{request.group.members.length - 3}
                                  </div>
                                )}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                                    <ChevronDown className="h-3 w-3" />
                                    <span className="sr-only">Lihat anggota kelompok</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuLabel>Anggota Kelompok</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {request.group.members.map((member) => (
                                    <DropdownMenuItem key={member.id}>
                                      <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                                          {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </div>
                                        <div>
                                          <p className="text-xs font-medium">{member.name}</p>
                                          <p className="text-xs text-muted-foreground">{member.role}</p>
                                        </div>
                                      </div>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                          <TableCell>{request.submissionDate}</TableCell>
                          <TableCell>
                            {getStatusBadge(request.status)}
                            {request.status === "rejected" && (
                              <div className="mt-1 text-xs text-red-500">{request.rejectionReason}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.proposal ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Proposal</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.parentalConsent ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Izin Orang Tua</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.transcript ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Transkrip</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.applicationLetter ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Surat Permohonan</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {request.status === "pending" && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleApproveRequest(request.id)}>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Setujui
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRejectRequest(request.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Tolak
                                  </Button>
                                </>
                              )}
                              {request.status === "approved" && !request.letterGenerated && (
                                <Button variant="default" size="sm" onClick={() => handleGenerateLetter(request.id)}>
                                  <FileCheck className="h-4 w-4 mr-1" />
                                  Buat Surat
                                </Button>
                              )}
                              {request.status === "approved" && request.letterGenerated && (
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Unduh Surat
                                </Button>
                              )}
                              {request.status === "in-review" && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleApproveRequest(request.id)}>
                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                    Setujui
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-200 hover:bg-red-50"
                                    onClick={() => handleRejectRequest(request.id)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Tolak
                                  </Button>
                                </>
                              )}
                              {request.status === "rejected" && (
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Lihat Detail
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Toaster />
    </div>
  )
}

