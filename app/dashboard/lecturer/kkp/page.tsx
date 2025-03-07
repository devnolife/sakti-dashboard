"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Building,
  AlertCircle,
  User,
  Download,
  Briefcase,
  PlayCircle,
  CheckCircle,
  RotateCcw,
  FileCheck,
} from "lucide-react"
import type { KkpApplication, KkpStatus } from "@/types/kkp"
import { getAllKkpApplications, getKkpApplicationById } from "@/app/actions/kkp-management"

export default function LecturerKkpManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<KkpStatus | "all">("all")
  const [applications, setApplications] = useState<KkpApplication[]>([])
  const [filteredApplications, setFilteredApplications] = useState<KkpApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<KkpApplication | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [evaluationNotes, setEvaluationNotes] = useState("")

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // In a real app, this would only fetch applications assigned to this lecturer
        const data = await getAllKkpApplications()

        // Filter to only show applications that have a supervisor assigned
        // In a real app, this would filter to only show applications assigned to this specific lecturer
        const supervisedApplications = data.filter((app) => app.supervisor)

        setApplications(supervisedApplications)
        setFilteredApplications(supervisedApplications)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Gagal mengambil data aplikasi KKP",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [toast])

  // Filter applications based on active tab and search query
  useEffect(() => {
    let filtered = applications

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter((app) => app.status === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (app) =>
          app.applicationNumber.toLowerCase().includes(query) ||
          app.title.toLowerCase().includes(query) ||
          app.student.name.toLowerCase().includes(query) ||
          app.student.nim.toLowerCase().includes(query) ||
          app.company.name.toLowerCase().includes(query),
      )
    }

    setFilteredApplications(filtered)
  }, [activeTab, searchQuery, applications])

  // Handle viewing application details
  const handleViewDetails = async (id: string) => {
    try {
      const application = await getKkpApplicationById(id)
      if (application) {
        setSelectedApplication(application)
        setShowDetailsDialog(true)
      } else {
        toast({
          title: "Error",
          description: "Aplikasi tidak ditemukan",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching application details:", error)
      toast({
        title: "Error",
        description: "Gagal mengambil detail aplikasi",
        variant: "destructive",
      })
    }
  }

  // Handle viewing document details
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowDocumentDialog(true)
  }

  // Get status badge
  const getStatusBadge = (status: KkpStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu Tinjauan
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
            Dalam Proses
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-purple-500/10 text-purple-500">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Selesai
          </Badge>
        )
      default:
        return null
    }
  }

  // Get document status badge
  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Menunggu
          </Badge>
        )
      case "verified":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Diverifikasi
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Ditolak
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
            Supervisi KKP
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola dan supervisi mahasiswa KKP yang ditugaskan</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as KkpStatus | "all")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="in-progress">Dalam Proses</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari aplikasi..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <Card className="overflow-hidden gradient-border">
        <CardHeader>
          <CardTitle>Mahasiswa KKP yang Disupervisi</CardTitle>
          <CardDescription>Kelola dan supervisi mahasiswa yang ditugaskan kepada Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <TabsContent value={activeTab} className="mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">ID Aplikasi</TableHead>
                    <TableHead className="w-[250px]">Judul</TableHead>
                    <TableHead>Mahasiswa</TableHead>
                    <TableHead>Perusahaan</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <RotateCcw className="h-8 w-8 text-muted-foreground mb-2 animate-spin" />
                          <p className="text-muted-foreground">Memuat aplikasi...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Tidak ada mahasiswa yang disupervisi ditemukan</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">{application.applicationNumber}</TableCell>
                        <TableCell>{application.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {application.student.avatar ? (
                              <img
                                src={application.student.avatar || "/placeholder.svg"}
                                alt={application.student.name}
                                className="h-6 w-6 rounded-full"
                              />
                            ) : (
                              <User className="h-6 w-6 text-muted-foreground" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{application.student.name}</p>
                              <p className="text-xs text-muted-foreground">{application.student.nim}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {application.company.logo ? (
                              <img
                                src={application.company.logo || "/placeholder.svg"}
                                alt={application.company.name}
                                className="h-6 w-6 rounded-full"
                              />
                            ) : (
                              <Building className="h-6 w-6 text-muted-foreground" />
                            )}
                            <span>{application.company.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs">
                              {new Date(application.startDate).toLocaleDateString("id-ID", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="text-xs text-muted-foreground">sampai</span>
                            <span className="text-xs">
                              {new Date(application.endDate).toLocaleDateString("id-ID", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(application.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(application.id)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      {selectedApplication && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                {selectedApplication.title}
              </DialogTitle>
              <DialogDescription>
                {selectedApplication.applicationNumber} • {selectedApplication.company.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Student Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Informasi Mahasiswa</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedApplication.student.avatar ? (
                          <img
                            src={selectedApplication.student.avatar || "/placeholder.svg"}
                            alt={selectedApplication.student.name}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <User className="h-12 w-12 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{selectedApplication.student.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedApplication.student.nim}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Jurusan:</span>
                          <span>{selectedApplication.student.major}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Semester:</span>
                          <span>{selectedApplication.student.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="truncate max-w-[150px]">{selectedApplication.student.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Telepon:</span>
                          <span>{selectedApplication.student.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedApplication.groupMembers && selectedApplication.groupMembers.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Anggota Kelompok</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {selectedApplication.groupMembers.map((member) => (
                            <div key={member.id} className="flex items-center gap-2">
                              <User className="h-6 w-6 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{member.name}</p>
                                <p className="text-xs text-muted-foreground">{member.nim}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Middle Column - Company and Application Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Informasi Perusahaan</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        {selectedApplication.company.logo ? (
                          <img
                            src={selectedApplication.company.logo || "/placeholder.svg"}
                            alt={selectedApplication.company.name}
                            className="h-12 w-12 rounded-full"
                          />
                        ) : (
                          <Building className="h-12 w-12 text-muted-foreground" />
                        )}
                        <div>
                          <p className="font-medium">{selectedApplication.company.name}</p>
                          <p className="text-sm text-muted-foreground">{selectedApplication.company.industry}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Alamat:</span>
                          <span className="text-right">{selectedApplication.company.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kota:</span>
                          <span>{selectedApplication.company.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Kontak Person:</span>
                          <span>{selectedApplication.company.contactPerson}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Telepon Kontak:</span>
                          <span>{selectedApplication.company.contactPhone}</span>
                        </div>
                        {selectedApplication.company.website && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Website:</span>
                            <a
                              href={
                                selectedApplication.company.website.startsWith("http")
                                  ? selectedApplication.company.website
                                  : `http://${selectedApplication.company.website}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.company.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Detail Aplikasi</h3>
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Deskripsi:</p>
                          <p className="text-sm">{selectedApplication.description}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tanggal Mulai:</span>
                          <span className="text-sm">
                            {new Date(selectedApplication.startDate).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Tanggal Selesai:</span>
                          <span className="text-sm">
                            {new Date(selectedApplication.endDate).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span>{getStatusBadge(selectedApplication.status)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Catatan Supervisi</h3>
                  <Card>
                    <CardContent className="p-4">
                      <Textarea
                        placeholder="Tambahkan catatan supervisi di sini..."
                        className="min-h-[150px]"
                        value={evaluationNotes}
                        onChange={(e) => setEvaluationNotes(e.target.value)}
                      />
                      <Button className="mt-2 w-full">Simpan Catatan</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Documents */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Dokumen</h3>
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {selectedApplication.documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">{document.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(document.uploadDate).toLocaleDateString("id-ID", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getDocumentStatusBadge(document.status)}
                            <Button variant="ghost" size="sm" onClick={() => handleViewDocument(document)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={document.url} target="_blank" rel="noopener noreferrer">
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                      {selectedApplication.documents.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-4">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Tidak ada dokumen ditemukan</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Document View Dialog */}
      {selectedDocument && (
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                {selectedDocument.name}
              </DialogTitle>
              <DialogDescription>
                Diunggah pada{" "}
                {new Date(selectedDocument.uploadDate).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Status:</span>
                {getDocumentStatusBadge(selectedDocument.status)}
              </div>
              {selectedDocument.notes && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Catatan:</p>
                  <p className="text-sm text-muted-foreground">{selectedDocument.notes}</p>
                </div>
              )}
              <div className="flex justify-center">
                <Button variant="outline" asChild className="w-full">
                  <a href={selectedDocument.url} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Lihat Dokumen
                  </a>
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Tutup
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
