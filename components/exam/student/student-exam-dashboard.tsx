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
      <div className="p-6 border bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border-primary-100">
        <h1 className="text-3xl font-bold tracking-tight text-primary-800">Portal Ujian Akademik</h1>
        <p className="mt-1 text-primary-600">Pantau dan kelola perjalanan ujian akademik Anda</p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 p-1 h-14 bg-muted/50 rounded-xl">
          <TabsTrigger
            value="overview"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-primary-600 rounded-lg"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Ringkasan</span>
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
            <span>Tertutup</span>
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
                  {completedSteps}/{totalSteps} persyaratan selesai
                </p>
              </CardContent>
            </Card>

            <ExamProgress
              title="Ujian Proposal"
              icon={<BookOpen className="w-5 h-5" />}
              progress={Math.round(
                (proposalExam.requirements.filter((req) => req.completed).length / proposalExam.requirements.length) *
                  100,
              )}
              status={proposalExam.status}
              onClick={() => setActiveTab("proposal")}
              colorScheme="blue"
            />

            <ExamProgress
              title="Ujian hasil"
              icon={<GraduationCap className="w-5 h-5" />}
              progress={Math.round(
                (resultExam.requirements.filter((req) => req.completed).length / resultExam.requirements.length) * 100,
              )}
              status={resultExam.status}
              onClick={() => setActiveTab("result")}
              colorScheme="purple"
            />

            <ExamProgress
              title="Ujian Tutup"
              icon={<Award className="w-5 h-5" />}
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
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="text-lg font-medium">Ujian Mendatang</CardTitle>
              <CardDescription>Sesi ujian yang telah dijadwalkan untuk Anda</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {proposalExam.scheduledDate || resultExam.scheduledDate || closingExam.scheduledDate ? (
                <div className="divide-y">
                  {proposalExam.scheduledDate && (
                    <div className="flex items-center justify-between p-4 transition-colors hover:bg-muted/20">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 text-blue-600 bg-blue-100 rounded-full">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800">Ujian Proposalination</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(proposalExam.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 text-sm text-blue-700 border border-blue-200 rounded-full bg-blue-50">
                        Scheduled
                      </div>
                    </div>
                  )}

                  {resultExam.scheduledDate && (
                    <div className="flex items-center justify-between p-4 transition-colors hover:bg-muted/20">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 text-purple-600 bg-purple-100 rounded-full">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-purple-800">Ujian hasilination</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(resultExam.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 text-sm text-purple-700 border border-purple-200 rounded-full bg-purple-50">
                        Scheduled
                      </div>
                    </div>
                  )}

                  {closingExam.scheduledDate && (
                    <div className="flex items-center justify-between p-4 transition-colors hover:bg-muted/20">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 text-teal-600 bg-teal-100 rounded-full">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-medium text-teal-800">Ujian Tutupination</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(closingExam.scheduledDate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 text-sm text-teal-700 border border-teal-200 rounded-full bg-teal-50">
                        Scheduled
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-muted">
                    <Calendar className="w-8 h-8 text-muted-foreground/60" />
                  </div>
                  <p>Belum ada ujian yang dijadwalkan</p>
                  <p className="mt-1 text-sm">Selesaikan persyaratan Anda untuk menjadwalkan ujian</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Linimasa Ujian</CardTitle>
                <CardDescription>Perjalanan ujian akademik Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mt-2 space-y-4">
                  <div className="absolute top-0 bottom-0 left-[19px] w-[2px] bg-muted-foreground/20"></div>

                  <div className="relative pl-10">
                    <div className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 bg-blue-100 border-4 rounded-full border-background">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium">Ujian Proposal</h3>
                    <p className="text-sm text-muted-foreground">Paparkan proposal penelitian Anda</p>
                    <div
                      className={`text-sm mt-1 ${proposalExam.status === "passed" ? "text-green-600" : "text-blue-600"}`}
                    >
                      {proposalExam.status === "passed" ? "Selesai" : "Sedang Berlangsung"}
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
                      Ujian Hasil
                    </h3>
                    <p
                      className={`text-sm ${resultExam.status === "not-started" ? "text-muted-foreground/60" : "text-muted-foreground"}`}
                    >
                      Paparkan hasil penelitian Anda
                    </p>
                    <div
                      className={`text-sm mt-1 ${resultExam.status === "not-started" ? "text-muted-foreground/60" : "text-purple-600"}`}
                    >
                      {resultExam.status === "not-started"
                        ? "Belum Dimulai"
                        : resultExam.status === "passed"
                          ? "Selesai"
                          : "Sedang Berlangsung"}
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
                      Ujian Tertutup
                    </h3>
                    <p
                      className={`text-sm ${closingExam.status === "not-started" ? "text-muted-foreground/60" : "text-muted-foreground"}`}
                    >
                      Sidang akhir
                    </p>
                    <div
                      className={`text-sm mt-1 ${closingExam.status === "not-started" ? "text-muted-foreground/60" : "text-teal-600"}`}
                    >
                      {closingExam.status === "not-started"
                        ? "Belum Dimulai"
                        : closingExam.status === "passed"
                          ? "Selesai"
                          : "Sedang Berlangsung"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Ikhtisar Persyaratan</CardTitle>
                <CardDescription>Pantau persyaratan ujian Anda</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Persyaratan Ujian Proposal</span>
                    </div>
                    <div className="text-sm">
                      {proposalExam.requirements.filter((r) => r.completed).length}/{proposalExam.requirements.length}{" "}
                      completed
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full">
                        <GraduationCap className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium">Persyaratan Ujian Hasil</span>
                    </div>
                    <div className="text-sm">
                      {resultExam.requirements.filter((r) => r.completed).length}/{resultExam.requirements.length}{" "}
                      completed
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full">
                        <Award className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="font-medium">Persyaratan Ujian Tutup</span>
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
                          <CardTitle className="text-base line-clamp-1">{exam.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
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
                              <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                              <span>{exam.location}</span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-4"
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
                    <div className="p-6 text-center border border-dashed rounded-md">
                      <h3 className="text-lg font-medium">Tidak Ada Jadwal Ujian</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Tidak ada jadwal ujian yang sesuai dengan filter yang dipilih.
                      </p>
                    </div>
                  ) : (
                    filteredExams.map((exam) => (
                      <div
                        key={exam.id}
                        className="flex flex-col p-4 border rounded-lg sm:flex-row sm:items-center sm:justify-between"
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
                          <div className="flex flex-wrap mt-2 text-sm gap-x-4 gap-y-1 text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{new Date(exam.date).toLocaleDateString("id-ID")}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{exam.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
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
                <CardContent className="pt-0 space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
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
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Waktu: {selectedExam.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                    <span>Lokasi: {selectedExam.location}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Penguji</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {selectedExam.committee.map((member: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-muted-foreground" />
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
                      <p className="p-3 mt-1 rounded-md bg-muted">{selectedExam.result.feedback}</p>
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
                      <FileText className="w-4 h-4 mr-2" />
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

