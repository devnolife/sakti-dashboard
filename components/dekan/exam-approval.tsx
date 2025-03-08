"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, XCircle, Clock, Eye, Users, GraduationCap } from "lucide-react"

// Mock data for exam schedules
const examSchedulesData = [
  {
    id: "exam-001",
    title: "Ujian Proposal Skripsi",
    department: "Teknik Informatika",
    date: "2023-10-20",
    time: "09:00 - 12:00",
    location: "Ruang Sidang A",
    status: "pending",
    students: 15,
    examiners: ["Dr. Ahmad Fauzi", "Dr. Siti Nurhaliza", "Dr. Budi Santoso"],
  },
  {
    id: "exam-002",
    title: "Ujian Hasil Penelitian",
    department: "Sistem Informasi",
    date: "2023-10-22",
    time: "13:00 - 16:00",
    location: "Ruang Sidang B",
    status: "pending",
    students: 12,
    examiners: ["Dr. Joko Widodo", "Dr. Megawati", "Dr. Prabowo"],
  },
  {
    id: "exam-003",
    title: "Ujian Komprehensif",
    department: "Teknik Elektro",
    date: "2023-10-25",
    time: "09:00 - 17:00",
    location: "Aula Utama",
    status: "pending",
    students: 30,
    examiners: ["Dr. Susilo", "Dr. Yudhoyono", "Dr. Habibie", "Dr. Sukarno"],
  },
  {
    id: "exam-004",
    title: "Ujian Akhir Semester",
    department: "Matematika",
    date: "2023-11-05",
    time: "08:00 - 10:00",
    location: "Ruang 301-305",
    status: "approved",
    students: 120,
    examiners: ["Dr. Hatta", "Dr. Soeharto", "Dr. Soekarno"],
  },
  {
    id: "exam-005",
    title: "Ujian Tengah Semester",
    department: "Fisika",
    date: "2023-10-15",
    time: "10:00 - 12:00",
    location: "Ruang 201-205",
    status: "approved",
    students: 95,
    examiners: ["Dr. Wahid", "Dr. Gusdur", "Dr. Amien"],
  },
  {
    id: "exam-006",
    title: "Ujian Praktikum",
    department: "Kimia",
    date: "2023-10-18",
    time: "13:00 - 15:00",
    location: "Lab Kimia A",
    status: "rejected",
    students: 45,
    examiners: ["Dr. Megawati", "Dr. Prabowo"],
  },
]

export function ExamApproval() {
  const [searchQuery, setSearchQuery] = useState("")

  const pendingExams = examSchedulesData.filter((item) => item.status === "pending")
  const approvedExams = examSchedulesData.filter((item) => item.status === "approved")
  const rejectedExams = examSchedulesData.filter((item) => item.status === "rejected")

  const filteredExams = examSchedulesData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Calendar className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-200">
            Menunggu
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-200">
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-200">
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Persetujuan Jadwal Ujian</h2>
        <p className="text-muted-foreground mt-2">Kelola dan setujui jadwal ujian fakultas</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-amber-50 to-amber-100 shadow-md transition-all hover:shadow-lg dark:from-amber-950/40 dark:to-amber-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-800/50">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Menunggu Persetujuan</CardTitle>
                <CardDescription>Jadwal ujian yang perlu disetujui</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">{pendingExams.length}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-md transition-all hover:shadow-lg dark:from-green-950/40 dark:to-green-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-2 dark:bg-green-800/50">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Disetujui</CardTitle>
                <CardDescription>Jadwal ujian yang telah disetujui</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{approvedExams.length}</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-red-50 to-red-100 shadow-md transition-all hover:shadow-lg dark:from-red-950/40 dark:to-red-900/40">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-2 dark:bg-red-800/50">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Ditolak</CardTitle>
                <CardDescription>Jadwal ujian yang ditolak</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">{rejectedExams.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Jadwal Ujian</CardTitle>
              <CardDescription>Kelola dan tinjau jadwal ujian fakultas</CardDescription>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari jadwal ujian..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Menunggu</TabsTrigger>
              <TabsTrigger value="approved">Disetujui</TabsTrigger>
              <TabsTrigger value="rejected">Ditolak</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {filteredExams.length > 0 ? (
                  filteredExams.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="grid gap-1 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{item.title}</p>
                          {getStatusBadge(item.status)}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">Jurusan: {item.department}</span>
                          <span className="mr-2">•</span>
                          <span>Lokasi: {item.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">
                            Tanggal:{" "}
                            {new Date(item.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                          <span className="mr-2">•</span>
                          <span>Waktu: {item.time}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span className="mr-2">{item.students} Mahasiswa</span>
                          <span className="mr-2">•</span>
                          <span>{item.examiners.length} Penguji</span>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-full hover:bg-primary/10 hover:text-primary"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Lihat Detail
                          </Button>
                          {item.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full hover:bg-green-500/10 hover:text-green-500"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Setujui
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Tolak
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Tidak ada jadwal ujian yang ditemukan</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingExams.length > 0 ? (
                  pendingExams
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {getStatusBadge(item.status)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Jurusan: {item.department}</span>
                            <span className="mr-2">•</span>
                            <span>Lokasi: {item.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">
                              Tanggal:{" "}
                              {new Date(item.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span className="mr-2">•</span>
                            <span>Waktu: {item.time}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            <span className="mr-2">{item.students} Mahasiswa</span>
                            <span className="mr-2">•</span>
                            <span>{item.examiners.length} Penguji</span>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-green-500/10 hover:text-green-500"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Setujui
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Tolak
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Tidak ada jadwal ujian yang menunggu persetujuan
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="approved">
              <div className="space-y-4">
                {approvedExams.length > 0 ? (
                  approvedExams
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {getStatusBadge(item.status)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Jurusan: {item.department}</span>
                            <span className="mr-2">•</span>
                            <span>Lokasi: {item.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">
                              Tanggal:{" "}
                              {new Date(item.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span className="mr-2">•</span>
                            <span>Waktu: {item.time}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            <span className="mr-2">{item.students} Mahasiswa</span>
                            <span className="mr-2">•</span>
                            <span>{item.examiners.length} Penguji</span>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Tidak ada jadwal ujian yang disetujui</div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="rejected">
              <div className="space-y-4">
                {rejectedExams.length > 0 ? (
                  rejectedExams
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="grid gap-1 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">{item.title}</p>
                            {getStatusBadge(item.status)}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">Jurusan: {item.department}</span>
                            <span className="mr-2">•</span>
                            <span>Lokasi: {item.location}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span className="mr-2">
                              Tanggal:{" "}
                              {new Date(item.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span className="mr-2">•</span>
                            <span>Waktu: {item.time}</span>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Users className="h-3 w-3 mr-1" />
                            <span className="mr-2">{item.students} Mahasiswa</span>
                            <span className="mr-2">•</span>
                            <span>{item.examiners.length} Penguji</span>
                          </div>
                          <div className="mt-2 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">Tidak ada jadwal ujian yang ditolak</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

