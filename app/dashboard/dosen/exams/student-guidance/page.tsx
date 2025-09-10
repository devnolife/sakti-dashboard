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
  FileCheck,
  Download,
  Briefcase,
  PlayCircle,
  CheckCircle,
  RotateCcw,
  Users,
  BookOpen,
} from "lucide-react"
import type { KkpApplication, KkpStatus } from "@/types/kkp"
import { getAllKkpApplications, getKkpApplicationById, updateKkpApplicationStatus } from "@/app/actions/kkp-management"

export default function StudentGuidanceListPage() {
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
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false)
  const [feedback, setFeedback] = useState("")

  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getAllKkpApplications()

        // Filter to only show applications assigned for guidance (mock)
        // In a real app, the API would handle this filtering
        const guidanceApplications = data.filter(
          (app) =>
            app.supervisor &&
            app.supervisor.id === "lec-001" &&
            (app.status === "approved" || app.status === "in-progress"),
        )

        setApplications(guidanceApplications)
        setFilteredApplications(guidanceApplications)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching applications:", error)
        toast({
          title: "Error",
          description: "Failed to fetch KKP applications",
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
          description: "Application not found",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching application details:", error)
      toast({
        title: "Error",
        description: "Failed to fetch application details",
        variant: "destructive",
      })
    }
  }

  // Get status badge
  const getStatusBadge = (status: KkpStatus) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            Pending Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500">
            <XCircle className="h-3.5 w-3.5 mr-1" />
            Rejected
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">
            <PlayCircle className="h-3.5 w-3.5 mr-1" />
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-purple-500/10 text-purple-500">
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            Completed
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
            List Bimbingan Mahasiswa
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Daftar mahasiswa yang dibimbing untuk KKP</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as KkpStatus | "all")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="in-progress">Sedang Berlangsung</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari bimbingan mahasiswa..."
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
          <CardTitle>Bimbingan KKP Mahasiswa</CardTitle>
          <CardDescription>Kelola dan monitor bimbingan KKP mahasiswa Anda</CardDescription>
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
                          <p className="text-muted-foreground">Memuat data bimbingan...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">Tidak ada data bimbingan ditemukan</p>
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
                          {new Date(application.startDate).toLocaleDateString("id-ID", {
                            month: "short",
                            day: "numeric",
                          })}
                          {" - "}
                          {new Date(application.endDate).toLocaleDateString("id-ID", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
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
                <BookOpen className="h-5 w-5 text-primary" />
                {selectedApplication.title}
              </DialogTitle>
              <DialogDescription>
                {selectedApplication.applicationNumber} • {selectedApplication.company.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Right Column - Company Information */}
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
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
    </div>
  )
}