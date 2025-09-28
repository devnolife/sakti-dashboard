"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamProgress } from "./exam-progress"
import { ProposalExamTab } from "./proposal-exam-tab-new"
import { ResultExamTab } from "./result-exam-tab-new" 
import { ClosingExamTab } from "./closing-exam-tab-new"
import { BookOpen, GraduationCap, Award, BarChart3, Calendar, Clock, MapPin, User, FileText, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface ExamData {
  id: string
  title: string
  type: string
  status: string
  abstract?: string
  submissionDate: string
  scheduledDate?: string
  completionDate?: string
  location?: string
  advisor1?: {
    id: string
    name: string
    nip: string
  }
  advisor2?: {
    id: string
    name: string
    nip: string
  }
  committees: Array<{
    id: string
    name: string
    role: string
    nip: string
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    status: string
    uploadDate: string
    verificationDate?: string
    fileUrl: string
    fileSize?: number
    notes?: string
  }>
  requirements: Array<{
    id: string
    title: string
    description: string
    completed: boolean
  }>
}

interface StudentExamApiData {
  proposalExam: ExamData | null
  resultExam: ExamData | null
  closingExam: ExamData | null
  allExams: ExamData[]
}

export default function StudentExamDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [examData, setExamData] = useState<StudentExamApiData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)

  useEffect(() => {
    fetchExamData()
  }, [])

  const fetchExamData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/student/exams')
      const result = await response.json()
      
      if (result.success) {
        setExamData(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch exam data",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching exam data:', error)
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading exam data...</span>
        </div>
      </div>
    )
  }

  if (!examData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">No exam data available</p>
          <Button onClick={fetchExamData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  const { proposalExam, resultExam, closingExam, allExams } = examData

  // Calculate overall progress
  const allRequirements = [
    ...(proposalExam?.requirements || []),
    ...(resultExam?.requirements || []),
    ...(closingExam?.requirements || [])
  ]
  const completedRequirements = allRequirements.filter(req => req.completed)
  const overallProgress = allRequirements.length > 0 
    ? Math.round((completedRequirements.length / allRequirements.length) * 100)
    : 0

  // Get upcoming exams (scheduled exams)
  const upcomingExams = allExams.filter(exam => 
    exam.scheduledDate && exam.status === 'scheduled'
  )

  const getProgressForExam = (exam: ExamData | null) => {
    if (!exam || !exam.requirements || exam.requirements.length === 0) return 0
    const completed = exam.requirements.filter(req => req.completed).length
    return Math.round((completed / exam.requirements.length) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'passed':
        return 'green'
      case 'scheduled':
        return 'blue'
      case 'pending':
      case 'applicant':
        return 'yellow'
      case 'failed':
      case 'rejected':
        return 'red'
      default:
        return 'gray'
    }
  }

  const handleScheduleClick = (exam: ExamData) => {
    setSelectedSchedule(exam)
    setIsScheduleDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard Ujian</h1>
        <p className="text-muted-foreground">Kelola dan pantau progress ujian akademik Anda</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-xl bg-muted p-1 text-muted-foreground">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="proposal"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <BookOpen className="w-4 h-4" />
            <span>Proposal</span>
          </TabsTrigger>
          <TabsTrigger
            value="result"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Hasil</span>
          </TabsTrigger>
          <TabsTrigger
            value="closing"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <Award className="w-4 h-4" />
            <span>Tutup</span>
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Jadwal</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-primary-700">
                  <BarChart3 className="w-5 h-5" />
                  Progres Keseluruhan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary-800">{overallProgress}%</div>
                <p className="mt-1 text-sm text-primary-600">
                  {completedRequirements.length}/{allRequirements.length} persyaratan selesai
                </p>
              </CardContent>
            </Card>

            <ExamProgress
              title="Ujian Proposal"
              icon={<BookOpen className="w-5 h-5" />}
              progress={getProgressForExam(proposalExam)}
              status={proposalExam?.status as any || 'pending'}
              onClick={() => setActiveTab("proposal")}
              colorScheme="blue"
            />

            <ExamProgress
              title="Ujian Hasil"
              icon={<GraduationCap className="w-5 h-5" />}
              progress={getProgressForExam(resultExam)}
              status={resultExam?.status as any || 'pending'}
              onClick={() => setActiveTab("result")}
              colorScheme="purple"
            />

            <ExamProgress
              title="Ujian Tutup"
              icon={<Award className="w-5 h-5" />}
              progress={getProgressForExam(closingExam)}
              status={closingExam?.status as any || 'pending'}
              onClick={() => setActiveTab("closing")}
              colorScheme="teal"
            />
          </div>

          <Card className="overflow-hidden border-muted">
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="text-lg font-medium">Ujian Mendatang</CardTitle>
              <CardDescription>Sesi ujian yang telah dijadwalkan untuk Anda</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {upcomingExams.length > 0 ? (
                <div className="divide-y">
                  {upcomingExams.map((exam) => (
                    <div
                      key={exam.id}
                      className="flex items-center justify-between p-4 transition-colors hover:bg-muted/20 cursor-pointer"
                      onClick={() => handleScheduleClick(exam)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          exam.type === 'proposal' ? 'text-blue-600 bg-blue-100' :
                          exam.type === 'result' ? 'text-purple-600 bg-purple-100' :
                          'text-teal-600 bg-teal-100'
                        }`}>
                          {exam.type === 'proposal' ? <BookOpen className="w-5 h-5" /> :
                           exam.type === 'result' ? <GraduationCap className="w-5 h-5" /> :
                           <Award className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className={`font-medium ${
                            exam.type === 'proposal' ? 'text-blue-800' :
                            exam.type === 'result' ? 'text-purple-800' :
                            'text-teal-800'
                          }`}>
                            {exam.type === 'proposal' ? 'Ujian Proposal' :
                             exam.type === 'result' ? 'Ujian Hasil' :
                             'Ujian Tutup'}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {exam.scheduledDate ? new Date(exam.scheduledDate).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) : 'Belum dijadwalkan'}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`${
                        getStatusColor(exam.status) === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        getStatusColor(exam.status) === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                        getStatusColor(exam.status) === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        getStatusColor(exam.status) === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                        {exam.status === 'scheduled' ? 'Terjadwal' :
                         exam.status === 'pending' ? 'Menunggu' :
                         exam.status === 'completed' ? 'Selesai' :
                         exam.status === 'passed' ? 'Lulus' :
                         exam.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Tidak ada ujian yang dijadwalkan</p>
                  <p className="text-sm">Silakan ajukan permohonan ujian terlebih dahulu</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Aktivitas Terkini</CardTitle>
              <CardDescription>Riwayat aktivitas ujian Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allExams.slice(0, 5).map((exam) => (
                  <div key={exam.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{exam.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Diajukan pada {new Date(exam.submissionDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <Badge variant="outline" className={`${
                      getStatusColor(exam.status) === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      getStatusColor(exam.status) === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                      getStatusColor(exam.status) === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      getStatusColor(exam.status) === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {exam.status === 'scheduled' ? 'Terjadwal' :
                       exam.status === 'pending' ? 'Menunggu' :
                       exam.status === 'completed' ? 'Selesai' :
                       exam.status === 'passed' ? 'Lulus' :
                       exam.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposal">
          <ProposalExamTab examData={proposalExam as any} onRefresh={fetchExamData} />
        </TabsContent>

        <TabsContent value="result">
          <ResultExamTab 
            examData={resultExam as any} 
            proposalStatus={proposalExam?.status as any}
            onRefresh={fetchExamData} 
          />
        </TabsContent>

        <TabsContent value="closing">
          <ClosingExamTab 
            examData={closingExam as any} 
            resultStatus={resultExam?.status as any}
            onRefresh={fetchExamData} 
          />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Ujian</CardTitle>
              <CardDescription>Daftar jadwal ujian yang telah ditetapkan</CardDescription>
            </CardHeader>
            <CardContent>
              {allExams.filter(exam => exam.scheduledDate).length > 0 ? (
                <div className="space-y-4">
                  {allExams
                    .filter(exam => exam.scheduledDate)
                    .sort((a, b) => new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime())
                    .map((exam) => (
                      <div
                        key={exam.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors cursor-pointer"
                        onClick={() => handleScheduleClick(exam)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            exam.type === 'proposal' ? 'bg-blue-100 text-blue-600' :
                            exam.type === 'result' ? 'bg-purple-100 text-purple-600' :
                            'bg-teal-100 text-teal-600'
                          }`}>
                            {exam.type === 'proposal' ? <BookOpen className="w-6 h-6" /> :
                             exam.type === 'result' ? <GraduationCap className="w-6 h-6" /> :
                             <Award className="w-6 h-6" />}
                          </div>
                          <div>
                            <h3 className="font-medium">{exam.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(exam.scheduledDate!).toLocaleDateString('id-ID')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(exam.scheduledDate!).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                              {exam.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {exam.location}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={`${
                          getStatusColor(exam.status) === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          getStatusColor(exam.status) === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                          getStatusColor(exam.status) === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          getStatusColor(exam.status) === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {exam.status === 'scheduled' ? 'Terjadwal' :
                           exam.status === 'pending' ? 'Menunggu' :
                           exam.status === 'completed' ? 'Selesai' :
                           exam.status === 'passed' ? 'Lulus' :
                           exam.status}
                        </Badge>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Belum ada jadwal ujian</p>
                  <p className="text-sm">Jadwal akan muncul setelah permohonan ujian disetujui</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Schedule Detail Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Jadwal Ujian</DialogTitle>
            <DialogDescription>
              Informasi lengkap mengenai jadwal ujian yang telah ditetapkan
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg">{selectedSchedule.title}</h3>
                <p className="text-muted-foreground">
                  {selectedSchedule.type === 'proposal' ? 'Ujian Proposal' :
                   selectedSchedule.type === 'result' ? 'Ujian Hasil' :
                   'Ujian Tertutup'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Tanggal & Waktu</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedSchedule.scheduledDate ? 
                        new Date(selectedSchedule.scheduledDate).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Belum dijadwalkan'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedSchedule.scheduledDate ? 
                        new Date(selectedSchedule.scheduledDate).toLocaleTimeString('id-ID', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Belum dijadwalkan'}
                    </div>
                    {selectedSchedule.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedSchedule.location}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <Badge variant="outline" className={`${
                    getStatusColor(selectedSchedule.status) === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    getStatusColor(selectedSchedule.status) === 'green' ? 'bg-green-50 text-green-700 border-green-200' :
                    getStatusColor(selectedSchedule.status) === 'yellow' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                    getStatusColor(selectedSchedule.status) === 'red' ? 'bg-red-50 text-red-700 border-red-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {selectedSchedule.status === 'scheduled' ? 'Terjadwal' :
                     selectedSchedule.status === 'pending' ? 'Menunggu Persetujuan' :
                     selectedSchedule.status === 'completed' ? 'Selesai' :
                     selectedSchedule.status === 'passed' ? 'Lulus' :
                     selectedSchedule.status}
                  </Badge>
                </div>
              </div>

              {selectedSchedule.committees && selectedSchedule.committees.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Tim Penguji</h4>
                  <div className="space-y-2">
                    {selectedSchedule.committees.map((member: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.role === 'chairman' ? 'Ketua Penguji' :
                             member.role === 'secretary' ? 'Sekretaris' : 'Anggota Penguji'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSchedule.advisor1 && (
                <div>
                  <h4 className="font-medium mb-3">Pembimbing</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{selectedSchedule.advisor1.name}</p>
                        <p className="text-xs text-muted-foreground">Pembimbing Utama</p>
                      </div>
                    </div>
                    {selectedSchedule.advisor2 && (
                      <div className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{selectedSchedule.advisor2.name}</p>
                          <p className="text-xs text-muted-foreground">Pembimbing Pendamping</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
