"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Search,
  Filter,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  FileCheck,
  Printer,
  Mail,
} from "lucide-react"

// Mock data for KKP requests
const kkpRequests = [
  {
    id: "KKP-2023-001",
    student: {
      id: "12345678",
      name: "Budi Santoso",
      program: "Informatika",
      semester: 7,
      email: "budi.santoso@example.com",
      phone: "081234567890",
    },
    title: "Pengembangan Sistem Informasi Manajemen Perpustakaan Berbasis Web",
    supervisor: "Dr. Ahmad Wijaya",
    submissionDate: "2023-09-15",
    status: "pending",
    documents: {
      proposal: true,
      transcripts: true,
      recommendation: true,
    },
    abstract:
      "Penelitian ini bertujuan untuk mengembangkan sistem informasi manajemen perpustakaan berbasis web yang dapat memudahkan pengelolaan koleksi buku, peminjaman, dan pengembalian. Sistem ini akan diimplementasikan menggunakan framework Laravel dan database MySQL.",
    letterGenerated: false,
  },
  {
    id: "KKP-2023-002",
    student: {
      id: "23456789",
      name: "Siti Rahma",
      program: "Sistem Informasi",
      semester: 8,
      email: "siti.rahma@example.com",
      phone: "082345678901",
    },
    title: "Analisis Keamanan Jaringan pada Infrastruktur Cloud Computing",
    supervisor: "Prof. Bambang Suryanto",
    submissionDate: "2023-09-10",
    status: "approved",
    documents: {
      proposal: true,
      transcripts: true,
      recommendation: true,
    },
    abstract:
      "Penelitian ini akan menganalisis aspek keamanan jaringan pada infrastruktur cloud computing dengan fokus pada identifikasi celah keamanan dan implementasi solusi untuk memitigasi risiko keamanan yang teridentifikasi.",
    letterGenerated: true,
    letterDate: "2023-09-20",
    letterNumber: "001/KKP/IX/2023",
  },
  {
    id: "KKP-2023-003",
    student: {
      id: "34567890",
      name: "Dian Permata",
      program: "Teknik Elektro",
      semester: 7,
      email: "dian.permata@example.com",
      phone: "083456789012",
    },
    title: "Implementasi Internet of Things untuk Monitoring Kualitas Udara",
    supervisor: "Dr. Ratna Dewi",
    submissionDate: "2023-09-12",
    status: "rejected",
    documents: {
      proposal: true,
      transcripts: true,
      recommendation: false,
    },
    abstract:
      "Penelitian ini akan mengimplementasikan teknologi Internet of Things (IoT) untuk membangun sistem monitoring kualitas udara real-time yang dapat diakses melalui aplikasi mobile dan web.",
    letterGenerated: false,
    rejectionReason: "Proposal kurang detail dan surat rekomendasi belum dilampirkan.",
  },
  {
    id: "KKP-2023-004",
    student: {
      id: "45678901",
      name: "Rudi Hartono",
      program: "Informatika",
      semester: 8,
      email: "rudi.hartono@example.com",
      phone: "084567890123",
    },
    title: "Pengembangan Aplikasi Mobile untuk Deteksi Penyakit Tanaman Padi",
    supervisor: "Dr. Eko Prasetyo",
    submissionDate: "2023-09-18",
    status: "in-review",
    documents: {
      proposal: true,
      transcripts: true,
      recommendation: true,
    },
    abstract:
      "Penelitian ini bertujuan untuk mengembangkan aplikasi mobile yang dapat mendeteksi penyakit pada tanaman padi menggunakan teknologi machine learning dan computer vision.",
    letterGenerated: false,
  },
  {
    id: "KKP-2023-005",
    student: {
      id: "56789012",
      name: "Maya Indah",
      program: "Sistem Informasi",
      semester: 7,
      email: "maya.indah@example.com",
      phone: "085678901234",
    },
    title: "Analisis Sentimen Pengguna Media Sosial Terhadap Kebijakan Pendidikan",
    supervisor: "Prof. Dewi Sartika",
    submissionDate: "2023-09-05",
    status: "approved",
    documents: {
      proposal: true,
      transcripts: true,
      recommendation: true,
    },
    abstract:
      "Penelitian ini akan menganalisis sentimen pengguna media sosial terhadap kebijakan pendidikan menggunakan teknik natural language processing dan machine learning.",
    letterGenerated: true,
    letterDate: "2023-09-15",
    letterNumber: "002/KKP/IX/2023",
  },
]

// Letter template
const letterTemplate = `
UNIVERSITAS TEKNOLOGI INDONESIA
FAKULTAS ILMU KOMPUTER
Jl. Pendidikan No. 123, Jakarta 12345
Telp: (021) 123-4567, Email: info@uti.ac.id

Nomor   : {{letterNumber}}
Perihal : Surat Persetujuan Kuliah Kerja Praktik (KKP)

Kepada Yth,
{{studentName}}
NIM: {{studentId}}
Program Studi {{program}}
Universitas Teknologi Indonesia

Dengan hormat,

Berdasarkan pengajuan proposal Kuliah Kerja Praktik (KKP) yang telah Saudara/i ajukan dengan judul:

"{{projectTitle}}"

Dengan ini kami menyatakan bahwa proposal tersebut telah DISETUJUI. Saudara/i dapat melaksanakan Kuliah Kerja Praktik sesuai dengan proposal yang telah diajukan di bawah bimbingan:

{{supervisorName}}

Kuliah Kerja Praktik dilaksanakan selama 3 bulan terhitung sejak tanggal surat ini diterbitkan. Setelah menyelesaikan Kuliah Kerja Praktik, Saudara/i diwajibkan untuk menyusun laporan dan melakukan presentasi hasil KKP.

Demikian surat persetujuan ini dibuat untuk digunakan sebagaimana mestinya.

Jakarta, {{letterDate}}

Hormat kami,

Dr. Hadi Santoso, M.Kom
Ketua Program Studi
`

interface StaffKKPDashboardProps {
  activeSection: string
}

export default function StaffKKPDashboard({ activeSection }: StaffKKPDashboardProps) {
  const [requests, setRequests] = useState(kkpRequests)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [letterContent, setLetterContent] = useState("")
  const [letterNumber, setLetterNumber] = useState("")
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false)
  const [isViewingLetter, setIsViewingLetter] = useState(false)

  // Filter requests based on search term and status filter
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Generate letter function
  const handleGenerateLetter = (request: any) => {
    setSelectedRequest(request)

    // Generate letter number
    const today = new Date()
    const letterNum = `${requests.filter((r) => r.letterGenerated).length + 1}`.padStart(3, "0")
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]
    const newLetterNumber = `${letterNum}/KKP/${romanMonths[month - 1]}/${year}`
    setLetterNumber(newLetterNumber)

    // Generate letter content from template
    const letterDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const content = letterTemplate
      .replace("{{letterNumber}}", newLetterNumber)
      .replace("{{studentName}}", request.student.name)
      .replace("{{studentId}}", request.student.id)
      .replace("{{program}}", request.student.program)
      .replace("{{projectTitle}}", request.title)
      .replace("{{supervisorName}}", request.supervisor)
      .replace("{{letterDate}}", letterDate)

    setLetterContent(content)
    setIsGeneratingLetter(true)
  }

  // View letter function
  const handleViewLetter = (request: any) => {
    setSelectedRequest(request)

    // Generate letter content from template
    const letterDate = new Date(request.letterDate).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const content = letterTemplate
      .replace("{{letterNumber}}", request.letterNumber)
      .replace("{{studentName}}", request.student.name)
      .replace("{{studentId}}", request.student.id)
      .replace("{{program}}", request.student.program)
      .replace("{{projectTitle}}", request.title)
      .replace("{{supervisorName}}", request.supervisor)
      .replace("{{letterDate}}", letterDate)

    setLetterContent(content)
    setIsViewingLetter(true)
  }

  // Save letter function
  const handleSaveLetter = () => {
    // Update the request with letter information
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === selectedRequest.id
          ? {
              ...req,
              letterGenerated: true,
              letterDate: new Date().toISOString().split("T")[0],
              letterNumber: letterNumber,
              status: "approved",
            }
          : req,
      ),
    )

    setIsGeneratingLetter(false)

    // Show success toast
    toast({
      title: "Letter Generated Successfully",
      description: `Approval letter for ${selectedRequest.student.name}'s KKP request has been generated.`,
      duration: 5000,
    })
  }

  // Approve request function
  const handleApproveRequest = (requestId: string) => {
    const request = requests.find((r) => r.id === requestId)
    if (request) {
      handleGenerateLetter(request)
    }
  }

  // Reject request function
  const handleRejectRequest = (requestId: string, reason = "Proposal tidak memenuhi kriteria.") => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: "rejected", rejectionReason: reason } : request,
      ),
    )

    toast({
      title: "Request Rejected",
      description: `KKP request from ${requests.find((r) => r.id === requestId)?.student.name} has been rejected.`,
      duration: 5000,
    })
  }

  // Set to review function
  const handleSetToReview = (requestId: string) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === requestId ? { ...request, status: "in-review" } : request)),
    )

    toast({
      title: "Request Set to Review",
      description: `KKP request from ${requests.find((r) => r.id === requestId)?.student.name} has been set to review.`,
      duration: 5000,
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "in-review":
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            In Review
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
            Manajemen KKP
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola dan proses permintaan Kuliah Kerja Praktik (KKP) mahasiswa</p>
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
                placeholder="Cari berdasarkan nama atau NIM..."
                className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="rounded-full">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in-review">Dalam Review</TabsTrigger>
              <TabsTrigger value="approved">Disetujui</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Mahasiswa</TableHead>
                      <TableHead>Judul KKP</TableHead>
                      <TableHead>Pembimbing</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Dokumen</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
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
                            <div>
                              <p className="font-medium">{request.student.name}</p>
                              <p className="text-xs text-muted-foreground">NIM: {request.student.id}</p>
                              <p className="text-xs text-muted-foreground">{request.student.program}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md">
                              <p className="font-medium truncate">{request.title}</p>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                    Lihat Abstrak
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>{request.title}</DialogTitle>
                                    <DialogDescription>
                                      Diajukan oleh: {request.student.name} ({request.student.id})
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 mt-4">
                                    <div>
                                      <h4 className="text-sm font-medium">Abstrak</h4>
                                      <p className="text-sm mt-1">{request.abstract}</p>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </TableCell>
                          <TableCell>{request.supervisor}</TableCell>
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
                                  className={`h-2 w-2 rounded-full ${request.documents.transcripts ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Transkrip</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`h-2 w-2 rounded-full ${request.documents.recommendation ? "bg-green-500" : "bg-red-500"}`}
                                ></div>
                                <span className="text-xs">Rekomendasi</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    Detail
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Detail Permintaan KKP</DialogTitle>
                                    <DialogDescription>ID Permintaan: {request.id}</DialogDescription>
                                  </DialogHeader>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="text-sm font-medium">Informasi Mahasiswa</h4>
                                        <div className="mt-2 space-y-2">
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Nama:</span>
                                            <span className="text-sm font-medium">{request.student.name}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">NIM:</span>
                                            <span className="text-sm font-medium">{request.student.id}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Program Studi:</span>
                                            <span className="text-sm font-medium">{request.student.program}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Semester:</span>
                                            <span className="text-sm font-medium">{request.student.semester}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Email:</span>
                                            <span className="text-sm font-medium">{request.student.email}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Telepon:</span>
                                            <span className="text-sm font-medium">{request.student.phone}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium">Status Dokumen</h4>
                                        <div className="mt-2 space-y-2">
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`h-3 w-3 rounded-full ${request.documents.proposal ? "bg-green-500" : "bg-red-500"}`}
                                            ></div>
                                            <span className="text-sm">Proposal KKP</span>
                                            {request.documents.proposal && (
                                              <Button variant="ghost" size="sm" className="h-6 ml-auto">
                                                <Download className="h-3 w-3 mr-1" />
                                                <span className="text-xs">Unduh</span>
                                              </Button>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`h-3 w-3 rounded-full ${request.documents.transcripts ? "bg-green-500" : "bg-red-500"}`}
                                            ></div>
                                            <span className="text-sm">Transkrip Nilai</span>
                                            {request.documents.transcripts && (
                                              <Button variant="ghost" size="sm" className="h-6 ml-auto">
                                                <Download className="h-3 w-3 mr-1" />
                                                <span className="text-xs">Unduh</span>
                                              </Button>
                                            )}
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`h-3 w-3 rounded-full ${request.documents.recommendation ? "bg-green-500" : "bg-red-500"}`}
                                            ></div>
                                            <span className="text-sm">Surat Rekomendasi</span>
                                            {request.documents.recommendation && (
                                              <Button variant="ghost" size="sm" className="h-6 ml-auto">
                                                <Download className="h-3 w-3 mr-1" />
                                                <span className="text-xs">Unduh</span>
                                              </Button>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="text-sm font-medium">Informasi KKP</h4>
                                        <div className="mt-2 space-y-2">
                                          <div>
                                            <span className="text-sm text-muted-foreground">Judul:</span>
                                            <p className="text-sm font-medium mt-1">{request.title}</p>
                                          </div>
                                          <div>
                                            <span className="text-sm text-muted-foreground">Pembimbing:</span>
                                            <p className="text-sm font-medium mt-1">{request.supervisor}</p>
                                          </div>
                                          <div>
                                            <span className="text-sm text-muted-foreground">Tanggal Pengajuan:</span>
                                            <p className="text-sm font-medium mt-1">{request.submissionDate}</p>
                                          </div>
                                          <div>
                                            <span className="text-sm text-muted-foreground">Status:</span>
                                            <div className="mt-1">{getStatusBadge(request.status)}</div>
                                            {request.status === "rejected" && (
                                              <p className="text-xs text-red-500 mt-1">{request.rejectionReason}</p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className="text-sm font-medium">Abstrak</h4>
                                        <p className="text-sm mt-2">{request.abstract}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <DialogFooter className="mt-6">
                                    {request.status === "pending" && (
                                      <>
                                        <Button variant="outline" onClick={() => handleSetToReview(request.id)}>
                                          <AlertCircle className="h-4 w-4 mr-1" />
                                          Set ke Review
                                        </Button>
                                        <Button variant="destructive" onClick={() => handleRejectRequest(request.id)}>
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Tolak
                                        </Button>
                                        <Button variant="default" onClick={() => handleApproveRequest(request.id)}>
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Setujui
                                        </Button>
                                      </>
                                    )}
                                    {request.status === "in-review" && (
                                      <>
                                        <Button variant="destructive" onClick={() => handleRejectRequest(request.id)}>
                                          <XCircle className="h-4 w-4 mr-1" />
                                          Tolak
                                        </Button>
                                        <Button variant="default" onClick={() => handleApproveRequest(request.id)}>
                                          <CheckCircle className="h-4 w-4 mr-1" />
                                          Setujui
                                        </Button>
                                      </>
                                    )}
                                    {request.status === "approved" && request.letterGenerated && (
                                      <Button variant="outline" onClick={() => handleViewLetter(request)}>
                                        <FileText className="h-4 w-4 mr-1" />
                                        Lihat Surat
                                      </Button>
                                    )}
                                    {request.status === "rejected" && (
                                      <Button variant="outline" onClick={() => handleSetToReview(request.id)}>
                                        <AlertCircle className="h-4 w-4 mr-1" />
                                        Set ke Review
                                      </Button>
                                    )}
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              {request.status === "pending" && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="default" size="sm">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Proses
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleSetToReview(request.id)}>
                                      <AlertCircle className="h-4 w-4 mr-2" />
                                      Set ke Review
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleApproveRequest(request.id)}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Setujui
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRejectRequest(request.id)}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Tolak
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}

                              {request.status === "in-review" && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="default" size="sm">
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Proses
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleApproveRequest(request.id)}>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Setujui
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleRejectRequest(request.id)}>
                                      <XCircle className="h-4 w-4 mr-2" />
                                      Tolak
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}

                              {request.status === "approved" && request.letterGenerated && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <FileText className="h-4 w-4 mr-1" />
                                      Surat
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Aksi Surat</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleViewLetter(request)}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Lihat Surat
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Download className="h-4 w-4 mr-2" />
                                      Unduh Surat
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Printer className="h-4 w-4 mr-2" />
                                      Cetak Surat
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Mail className="h-4 w-4 mr-2" />
                                      Kirim ke Mahasiswa
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}

                              {request.status === "rejected" && (
                                <Button variant="outline" size="sm" onClick={() => handleSetToReview(request.id)}>
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  Review Ulang
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

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Menampilkan {filteredRequests.length} dari {requests.length} permintaan
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Sebelumnya
              </Button>
              <Button variant="outline" size="sm" className="w-8 p-0">
                1
              </Button>
              <Button variant="outline" size="sm">
                Selanjutnya
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Letter Generation Dialog */}
      <Dialog open={isGeneratingLetter} onOpenChange={setIsGeneratingLetter}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Generate Surat Persetujuan KKP</DialogTitle>
            <DialogDescription>Tinjau dan edit surat persetujuan KKP sebelum menyimpan</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label htmlFor="letterNumber" className="text-sm font-medium">
                  Nomor Surat
                </label>
                <Input
                  id="letterNumber"
                  value={letterNumber}
                  onChange={(e) => setLetterNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium">Tanggal Surat</label>
                <Input value={new Date().toLocaleDateString("id-ID")} disabled className="mt-1" />
              </div>
            </div>
            <div>
              <label htmlFor="letterContent" className="text-sm font-medium">
                Isi Surat
              </label>
              <Textarea
                id="letterContent"
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="mt-1 font-mono text-sm"
                rows={20}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsGeneratingLetter(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveLetter}>
              <FileCheck className="h-4 w-4 mr-1" />
              Simpan Surat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Letter View Dialog */}
      <Dialog open={isViewingLetter} onOpenChange={setIsViewingLetter}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Surat Persetujuan KKP</DialogTitle>
            <DialogDescription>
              {selectedRequest?.id} - {selectedRequest?.student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 border p-6 bg-white rounded-lg">
            <pre className="whitespace-pre-wrap font-sans text-sm">{letterContent}</pre>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsViewingLetter(false)}>
              Tutup
            </Button>
            <Button variant="outline">
              <Printer className="h-4 w-4 mr-1" />
              Cetak
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Unduh
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-1" />
              Kirim ke Mahasiswa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast component for notifications */}
      <Toaster />
    </div>
  )
}

