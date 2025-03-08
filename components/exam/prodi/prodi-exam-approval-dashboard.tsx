"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThesisSubmissionsTable } from "./thesis-submissions-table"
import { ExamSchedulesTable } from "./exam-schedules-table"
import { SupervisorExaminerTable } from "./supervisor-examiner-table"
import { Button } from "@/components/ui/button"
import { Download, Filter, RefreshCw, ClipboardCheck, Calendar, Users, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockThesisSubmissions } from "./mock-thesis-submissions"
import { mockExamSchedules } from "./mock-exam-schedules"
import { mockSupervisorExaminerData } from "./mock-supervisor-examiner-data"

export function ProdiExamApprovalDashboard() {
  const [activeTab, setActiveTab] = useState("thesis-submissions")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [metrics, setMetrics] = useState({
    pendingThesis: 0,
    pendingSchedules: 0,
    pendingAssignments: 0,
    totalPending: 0,
  })

  // Calculate metrics from mock data
  useEffect(() => {
    const pendingThesis = mockThesisSubmissions.filter((s) => s.status === "pending").length
    const pendingSchedules = mockExamSchedules.filter((s) => s.verificationStatus === "pending").length
    const pendingAssignments = mockSupervisorExaminerData.filter((s) => s.status === "pending").length

    setMetrics({
      pendingThesis,
      pendingSchedules,
      pendingAssignments,
      totalPending: pendingThesis + pendingSchedules + pendingAssignments,
    })
  }, [])

  // Filter thesis submissions based on search query and status filter
  const filteredThesisSubmissions = mockThesisSubmissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.studentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || submission.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Filter exam schedules based on search query and status filter
  const filteredExamSchedules = mockExamSchedules.filter((schedule) => {
    const matchesSearch =
      schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.studentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || schedule.verificationStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  // Filter supervisor/examiner data based on search query and status filter
  const filteredSupervisorExaminerData = mockSupervisorExaminerData.filter((data) => {
    const matchesSearch =
      data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.studentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || data.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Persetujuan Ujian</h1>
          <p className="text-muted-foreground">Kelola persetujuan judul skripsi, jadwal ujian, dan penugasan dosen</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Menunggu Persetujuan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-blue-900">{metrics.totalPending}</div>
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-blue-700 mt-2">Memerlukan tindakan segera</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Judul Skripsi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-amber-900">{metrics.pendingThesis}</div>
              <ClipboardCheck className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-xs text-amber-700 mt-2">Menunggu persetujuan</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Jadwal Ujian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-emerald-900">{metrics.pendingSchedules}</div>
              <Calendar className="h-8 w-8 text-emerald-600" />
            </div>
            <p className="text-xs text-emerald-700 mt-2">Perlu verifikasi</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Penugasan Dosen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-purple-900">{metrics.pendingAssignments}</div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-purple-700 mt-2">Belum lengkap</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList className="mb-4 md:mb-0">
                <TabsTrigger value="thesis-submissions">Judul Skripsi</TabsTrigger>
                <TabsTrigger value="exam-schedules">Jadwal Ujian</TabsTrigger>
                <TabsTrigger value="supervisor-examiner">Pembimbing & Penguji</TabsTrigger>
              </TabsList>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Input
                    placeholder="Cari mahasiswa atau judul..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[250px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="pending">Menunggu Persetujuan</SelectItem>
                      <SelectItem value="approved">Disetujui</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                      <SelectItem value="revision">Perlu Revisi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <TabsContent value="thesis-submissions" className="m-0">
              <ThesisSubmissionsTable submissions={filteredThesisSubmissions} />
            </TabsContent>

            <TabsContent value="exam-schedules" className="m-0">
              <ExamSchedulesTable schedules={filteredExamSchedules} />
            </TabsContent>

            <TabsContent value="supervisor-examiner" className="m-0">
              <SupervisorExaminerTable data={filteredSupervisorExaminerData} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

