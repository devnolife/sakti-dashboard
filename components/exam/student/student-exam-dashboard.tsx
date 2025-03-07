"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExamProgress } from "./exam-progress"
import { ProposalExamTab } from "./proposal-exam-tab"
import { ResultExamTab } from "./result-exam-tab"
import { ClosingExamTab } from "./closing-exam-tab"
import { mockStudentExamData } from "./mock-student-exam-data"
import { BookOpen, GraduationCap, Award, BarChart3, Calendar, Clock, MapPin, User, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for exam schedules
const examSchedules = [
  {
    id: "sch-001",
    examType: "Ujian Proposal",
    title: "Analisis Pengaruh Teknologi Blockchain pada Sistem Keuangan",
    date: "2023-10-25",
    time: "10:00 - 12:00",
    location: "Ruang Seminar A1.2",
    status: "upcoming",
    committee: [
      { name: "Dr. Budi Santoso, M.Sc.", role: "Ketua" },
      { name: "Prof. Siti Rahayu, Ph.D.", role: "Anggota" },
      { name: "Dr. Ahmad Wijaya, M.T.", role: "Anggota" },
    ],
    notes: "Silakan mempersiapkan presentasi selama 20 menit dan sesi tanya jawab selama 40 menit.",
  },
  {
    id: "sch-002",
    examType: "Ujian Hasil",
    title: "Implementasi Machine Learning untuk Prediksi Cuaca",
    date: "2023-11-15",
    time: "13:00 - 15:00",
    location: "Ruang Seminar B2.3",
    status: "upcoming",
    committee: [
      { name: "Dr. Dewi Anggraini, M.Kom.", role: "Ketua" },
      { name: "Dr. Rudi Hartono, M.T.", role: "Anggota" },
      { name: "Prof. Joko Widodo, Ph.D.", role: "Anggota" },
    ],
    notes: "Pastikan untuk membawa semua dokumen pendukung dan hasil penelitian Anda.",
  },
  {
    id: "sch-003",
    examType: "Ujian Proposal",
    title: "Pengembangan Aplikasi Mobile untuk Monitoring Kesehatan",
    date: "2023-09-20",
    time: "08:00 - 10:00",
    location: "Ruang Seminar C3.1",
    status: "completed",
    committee: [
      { name: "Prof. Bambang Sutejo, Ph.D.", role: "Ketua" },
      { name: "Dr. Rina Wijaya, M.Kom.", role: "Anggota" },
      { name: "Dr. Hendra Gunawan, M.T.", role: "Anggota" },
    ],
    result: {
      score: 82,
      grade: "A-",
      feedback: "Proposal cukup baik dengan metodologi yang jelas. Perlu perbaikan pada bagian tinjauan pustaka.",
    },
    notes: "Revisi harus diselesaikan dalam 2 minggu.",
  },
  {
    id: "sch-004",
    examType: "Ujian Tertutup",
    title: "Analisis Keamanan Jaringan pada Infrastruktur Cloud",
    date: "2023-12-10",
    time: "10:00 - 12:00",
    location: "Ruang Rapat Dekanat",
    status: "upcoming",
    committee: [
      { name: "Prof. Agus Setiawan, Ph.D.", role: "Ketua" },
      { name: "Dr. Maya Purnama, M.Kom.", role: "Anggota" },
      { name: "Dr. Budi Santoso, M.Sc.", role: "Anggota" },
      { name: "Prof. Siti Rahayu, Ph.D.", role: "Anggota" },
      { name: "Dr. Ahmad Wijaya, M.T.", role: "Anggota" },
    ],
    notes: "Ujian tertutup akan dihadiri oleh 5 penguji. Pastikan untuk mempersiapkan presentasi komprehensif.",
  },
]

// Mock data for upcoming exams by month
const upcomingExamsByMonth = [
  {
    month: "Oktober 2023",
    exams: [
      {
        id: "sch-001",
        examType: "Ujian Proposal",
        title: "Analisis Pengaruh Teknologi Blockchain pada Sistem Keuangan",
        date: "2023-10-25",
        time: "10:00 - 12:00",
        location: "Ruang Seminar A1.2",
      },
    ],
  },
  {
    month: "November 2023",
    exams: [
      {
        id: "sch-002",
        examType: "Ujian Hasil",
        title: "Implementasi Machine Learning untuk Prediksi Cuaca",
        date: "2023-11-15",
        time: "13:00 - 15:00",
        location: "Ruang Seminar B2.3",
      },
    ],
  },
  {
    month: "Desember 2023",
    exams: [
      {
        id: "sch-004",
        examType: "Ujian Tertutup",
        title: "Analisis Keamanan Jaringan pada Infrastruktur Cloud",
        date: "2023-12-10",
        time: "10:00 - 12:00",
        location: "Ruang Rapat Dekanat",
      },
    ],
  },
]

export default function StudentExamDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [scheduleView, setScheduleView] = useState("calendar")
  const [selectedExam, setSelectedExam] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("all")

  const { proposalExam, resultExam, closingExam } = mockStudentExamData

  // Calculate overall progress
  const totalSteps = proposalExam.requirements.length + resultExam.requirements.length + closingExam.requirements.length
  const completedSteps =
    proposalExam.requirements.filter((req) => req.completed).length +
    resultExam.requirements.filter((req) => req.completed).length +
    closingExam.requirements.filter((req) => req.completed).length

  const overallProgress = Math.round((completedSteps / totalSteps) * 100)

  const handleViewDetails = (examId: string) => {
    const exam = examSchedules.find((e) => e.id === examId)
    if (exam) {
      setSelectedExam(exam)
      setIsDialogOpen(true)
    }
  }

  const filteredExams =
    selectedPeriod === "all"
      ? examSchedules
      : examSchedules.filter((exam) => {
          const examDate = new Date(exam.date)
          const today = new Date()

          if (selectedPeriod === "upcoming") {
            return examDate >= today && exam.status !== "completed"
          }
          if (selectedPeriod === "completed") {
            return exam.status === "completed"
          }
          if (selectedPeriod === "this-month") {
            return examDate.getMonth() === today.getMonth() && examDate.getFullYear() === today.getFullYear()
          }
          if (selectedPeriod === "next-month") {
            const nextMonth = new Date(today)
            nextMonth.setMonth(today.getMonth() + 1)
            return examDate.getMonth() === nextMonth.getMonth() && examDate.getFullYear() === nextMonth.getFullYear()
          }
          return true
        })

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border border-primary-100">
        <h1 className="text-3xl font-bold tracking-tight text-primary-800">Academic Examination Portal</h1>
        <p className="text-primary-600 mt-1">Track and manage your academic examination journey</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-14 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="proposal"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <BookOpen className="h-4 w-4" />
            <span>Proposal</span>
          </TabsTrigger>
          <TabsTrigger
            value="result"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Result</span>
          </TabsTrigger>
          <TabsTrigger
            value="closing"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <Award className="h-4 w-4" />
            <span>Closing</span>
          </TabsTrigger>
          <TabsTrigger
            value="schedule"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-primary-700 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary-800">{overallProgress}%</div>
                <p className="text-sm text-primary-600 mt-1">
                  {completedSteps}/{totalSteps} requirements completed
                </p>
              </CardContent>
            </Card>

            <ExamProgress
              title="Proposal Exam"
              icon={<BookOpen className="h-5 w-5" />}
              progress={Math.round(
                (proposalExam.requirements.filter((req) => req.completed).length / proposalExam.requirements.length) *
                  100,
              )}
              status={proposalExam.status}
              onClick={() => setActiveTab("proposal")}
              colorScheme="blue"
            />

            <ExamProgress
              title="Result Exam"
              icon={<GraduationCap className="h-5 w-5" />}
              progress={Math.round(
                (resultExam.requirements.filter((req) => req.completed).length / resultExam.requirements.length) * 100,
              )}
              status={resultExam.status}
              onClick={() => setActiveTab("result")}
              colorScheme="purple"
            />

            <ExamProgress
              title="Closing Exam"
              icon={<Award className="h-5 w-5" />}
              progress={Math.round(
                (closingExam.requirements.filter((req) => req.completed).length / closingExam.requirements.length) *
                  100,
              )}
              status={closingExam.status}
              onClick={() => setActiveTab("closing")}
              colorScheme="teal"
            />
          </div>

          <Card className="overflow-hidden border-muted">
            <CardHeader className="bg-muted/30 pb-3">
              <CardTitle className="text-lg font-medium">Upcoming Examinations</CardTitle>
              <CardDescription>Your scheduled examination sessions</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {proposalExam.scheduledDate || resultExam.scheduledDate || closingExam.scheduledDate ? (
                <div className="divide-y">
                  {proposalExam.scheduledDate && (
                    <div className="flex justify-between items-center p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800">Proposal Examination</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(proposalExam.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                        Scheduled
                      </div>
                    </div>
                  )}

                  {resultExam.scheduledDate && (
                    <div className="flex justify-between items-center p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                          <GraduationCap className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-purple-800">Result Examination</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(resultExam.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                        Scheduled
                      </div>
                    </div>
                  )}

                  {closingExam.scheduledDate && (
                    <div className="flex justify-between items-center p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-teal-800">Closing Examination</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(closingExam.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-sm bg-teal-50 text-teal-700 px-3 py-1 rounded-full border border-teal-200">
                        Scheduled
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                    <Calendar className="h-8 w-8 text-muted-foreground/60" />
                  </div>
                  <p>No examinations scheduled yet</p>
                  <p className="text-sm mt-1">Complete your requirements to schedule an examination</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Examination Timeline</CardTitle>
                <CardDescription>Your academic examination journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 relative mt-2">
                  <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-muted-foreground/20"></div>

                  <div className="relative pl-10">
                    <div className="absolute left-0 w-10 h-10 rounded-full bg-blue-100 border-4 border-background flex items-center justify-center z-10">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium">Proposal Examination</h3>
                    <p className="text-sm text-muted-foreground">Present your research proposal</p>
                    <div
                      className={`text-sm mt-1 ${proposalExam.status === "passed" ? "text-green-600" : "text-blue-600"}`}
                    >
                      {proposalExam.status === "passed" ? "Completed" : "In Progress"}
                    </div>
                  </div>

                  <div className="relative pl-10">
                    <div
                      className={`absolute left-0 w-10 h-10 rounded-full ${resultExam.status === "not-started" ? "bg-muted border-4 border-background" : "bg-purple-100 border-4 border-background"} flex items-center justify-center z-10`}
                    >
                      <GraduationCap
                        className={`h-5 w-5 ${resultExam.status === "not-started" ? "text-muted-foreground/40" : "text-purple-600"}`}
                      />
                    </div>
                    <h3
                      className={`font-medium ${resultExam.status === "not-started" ? "text-muted-foreground/60" : ""}`}
                    >
                      Result Examination
                    </h3>
                    <p
                      className={`text-sm ${resultExam.status === "not-started" ? "text-muted-foreground/60" : "text-muted-foreground"}`}
                    >
                      Present your research findings
                    </p>
                    <div
                      className={`text-sm mt-1 ${resultExam.status === "not-started" ? "text-muted-foreground/60" : "text-purple-600"}`}
                    >
                      {resultExam.status === "not-started"
                        ? "Not Started"
                        : resultExam.status === "passed"
                          ? "Completed"
                          : "In Progress"}
                    </div>
                  </div>

                  <div className="relative pl-10">
                    <div
                      className={`absolute left-0 w-10 h-10 rounded-full ${closingExam.status === "not-started" ? "bg-muted border-4 border-background" : "bg-teal-100 border-4 border-background"} flex items-center justify-center z-10`}
                    >
                      <Award
                        className={`h-5 w-5 ${closingExam.status === "not-started" ? "text-muted-foreground/40" : "text-teal-600"}`}
                      />
                    </div>
                    <h3
                      className={`font-medium ${closingExam.status === "not-started" ? "text-muted-foreground/60" : ""}`}
                    >
                      Closing Examination
                    </h3>
                    <p
                      className={`text-sm ${closingExam.status === "not-started" ? "text-muted-foreground/60" : "text-muted-foreground"}`}
                    >
                      Final thesis defense
                    </p>
                    <div
                      className={`text-sm mt-1 ${closingExam.status === "not-started" ? "text-muted-foreground/60" : "text-teal-600"}`}
                    >
                      {closingExam.status === "not-started"
                        ? "Not Started"
                        : closingExam.status === "passed"
                          ? "Completed"
                          : "In Progress"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Requirements Overview</CardTitle>
                <CardDescription>Track your examination requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Proposal Requirements</span>
                    </div>
                    <div className="text-sm">
                      {proposalExam.requirements.filter((r) => r.completed).length}/{proposalExam.requirements.length}{" "}
                      completed
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Result Requirements</span>
                    </div>
                    <div className="text-sm">
                      {resultExam.requirements.filter((r) => r.completed).length}/{resultExam.requirements.length}{" "}
                      completed
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                        <Award className="h-4 w-4 text-teal-600" />
                      </div>
                      <span className="font-medium">Closing Requirements</span>
                    </div>
                    <div className="text-sm">
                      {closingExam.requirements.filter((r) => r.completed).length}/{closingExam.requirements.length}{" "}
                      completed
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="proposal">
          <ProposalExamTab examData={proposalExam} />
        </TabsContent>

        <TabsContent value="result">
          <ResultExamTab examData={resultExam} proposalStatus={proposalExam.status} />
        </TabsContent>

        <TabsContent value="closing">
          <ClosingExamTab examData={closingExam} resultStatus={resultExam.status} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              defaultValue="calendar"
              value={scheduleView}
              onValueChange={setScheduleView}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="calendar">Kalender</TabsTrigger>
                <TabsTrigger value="list">Daftar</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-full sm:w-[200px]">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Ujian</SelectItem>
                  <SelectItem value="upcoming">Akan Datang</SelectItem>
                  <SelectItem value="this-month">Bulan Ini</SelectItem>
                  <SelectItem value="next-month">Bulan Depan</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {scheduleView === "calendar" && (
            <div className="space-y-6">
              {upcomingExamsByMonth.map((monthData) => (
                <div key={monthData.month}>
                  <h3 className="mb-4 text-lg font-medium">{monthData.month}</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {monthData.exams.map((exam) => (
                      <Card key={exam.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <Badge variant="outline" className="mb-1 w-fit">
                            {exam.examType}
                          </Badge>
                          <CardTitle className="line-clamp-1 text-base">{exam.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>
                                {new Date(exam.date).toLocaleDateString("id-ID", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                              <span>{exam.location}</span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full"
                            onClick={() => handleViewDetails(exam.id)}
                          >
                            Lihat Detail
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {scheduleView === "list" && (
            <Card>
              <CardHeader>
                <CardTitle>Daftar Jadwal Ujian</CardTitle>
                <CardDescription>Semua jadwal ujian yang telah dijadwalkan untuk Anda.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredExams.length === 0 ? (
                    <div className="rounded-md border border-dashed p-6 text-center">
                      <h3 className="text-lg font-medium">Tidak Ada Jadwal Ujian</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Tidak ada jadwal ujian yang sesuai dengan filter yang dipilih.
                      </p>
                    </div>
                  ) : (
                    filteredExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="mb-4 sm:mb-0">
                          <div className="flex items-center">
                            <Badge variant={exam.status === "completed" ? "secondary" : "outline"} className="mr-2">
                              {exam.examType}
                            </Badge>
                            {exam.status === "completed" && (
                              <Badge className="bg-green-500 hover:bg-green-600">Selesai</Badge>
                            )}
                          </div>
                          <h3 className="mt-1 text-base font-medium">{exam.title}</h3>
                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>{new Date(exam.date).toLocaleDateString("id-ID")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              <span>{exam.location}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(exam.id)}>
                          Detail
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {selectedExam && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Jadwal Ujian</DialogTitle>
              <DialogDescription>Informasi lengkap tentang jadwal ujian Anda.</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">
                  {selectedExam.examType}
                </Badge>
                <h2 className="text-xl font-semibold">{selectedExam.title}</h2>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Informasi Jadwal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0 text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>
                      Tanggal:{" "}
                      {new Date(selectedExam.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Waktu: {selectedExam.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Lokasi: {selectedExam.location}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Komite Penguji</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {selectedExam.committee.map((member: any, index: number) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{member.name}</span>
                      </div>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {selectedExam.status === "completed" && selectedExam.result && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Hasil Ujian</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Nilai:</span>
                      <span className="font-medium">{selectedExam.result.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Grade:</span>
                      <Badge>{selectedExam.result.grade}</Badge>
                    </div>
                    <div className="mt-2">
                      <p className="font-medium">Feedback:</p>
                      <p className="mt-1 rounded-md bg-muted p-3">{selectedExam.result.feedback}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedExam.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Catatan</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>{selectedExam.notes}</p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Tutup
                </Button>

                {selectedExam.status !== "completed" && (
                  <Button asChild>
                    <a
                      href="#"
                      onClick={() => {
                        setIsDialogOpen(false)
                        setActiveTab(
                          selectedExam.examType.includes("Proposal")
                            ? "proposal"
                            : selectedExam.examType.includes("Hasil")
                              ? "result"
                              : "closing",
                        )
                      }}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Lihat Persyaratan
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

