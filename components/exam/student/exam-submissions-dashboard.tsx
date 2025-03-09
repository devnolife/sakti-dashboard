"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, Info, Loader2, MoreHorizontal, User } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

// Mock data for exam submissions
const examSubmissions = [
  {
    id: "sub-001",
    examType: "Ujian Proposal",
    title: "Analisis Pengaruh Teknologi Blockchain pada Sistem Keuangan",
    submittedDate: "2023-10-15",
    scheduledDate: "2023-10-25",
    scheduledTime: "10:00 - 12:00",
    status: "approved",
    location: "Ruang Seminar A1.2",
    committee: [
      { name: "Dr. Budi Santoso, M.Sc.", role: "Ketua" },
      { name: "Prof. Siti Rahayu, Ph.D.", role: "Anggota" },
      { name: "Dr. Ahmad Wijaya, M.T.", role: "Anggota" },
    ],
    notes: "Silakan mempersiapkan presentasi selama 20 menit dan sesi tanya jawab selama 40 menit.",
  },
  {
    id: "sub-002",
    examType: "Ujian Hasil",
    title: "Analisis Pengaruh Teknologi Blockchain pada Sistem Keuangan",
    submittedDate: "2023-11-20",
    scheduledDate: "2023-12-05",
    scheduledTime: "13:00 - 15:00",
    status: "pending",
    notes: "Pengajuan Anda sedang dalam proses review oleh program studi.",
  },
  {
    id: "sub-003",
    examType: "Ujian Proposal",
    title: "Implementasi Machine Learning untuk Prediksi Cuaca",
    submittedDate: "2023-09-10",
    scheduledDate: "2023-09-20",
    scheduledTime: "08:00 - 10:00",
    status: "completed",
    location: "Ruang Seminar B2.3",
    committee: [
      { name: "Dr. Dewi Anggraini, M.Kom.", role: "Ketua" },
      { name: "Dr. Rudi Hartono, M.T.", role: "Anggota" },
      { name: "Prof. Joko Widodo, Ph.D.", role: "Anggota" },
    ],
    result: {
      score: 85,
      grade: "A",
      feedback: "Presentasi sangat baik dengan metodologi yang jelas. Perlu perbaikan minor pada bagian analisis data.",
    },
    notes: "Revisi harus diselesaikan dalam 2 minggu.",
  },
  {
    id: "sub-004",
    examType: "Ujian Tertutup",
    title: "Implementasi Machine Learning untuk Prediksi Cuaca",
    submittedDate: "2024-01-10",
    status: "rejected",
    reason: "Dokumen yang diajukan tidak lengkap. Silakan lengkapi dokumen dan ajukan kembali.",
    notes: "Silakan hubungi bagian akademik untuk informasi lebih lanjut.",
  },
]

export function ExamSubmissionsDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const filteredSubmissions =
    activeTab === "all"
      ? examSubmissions
      : examSubmissions.filter((sub) => {
          if (activeTab === "pending") return sub.status === "pending"
          if (activeTab === "approved") return sub.status === "approved"
          if (activeTab === "completed") return sub.status === "completed"
          if (activeTab === "rejected") return sub.status === "rejected"
          return true
        })

  const handleViewDetails = (submission: any) => {
    setSelectedSubmission(submission)
    setIsDialogOpen(true)
  }

  const handleCancelSubmission = (id: string) => {
    setIsCancelling(true)

    // Simulate API call
    setTimeout(() => {
      setIsCancelling(false)

      toast({
        title: "Pengajuan Dibatalkan",
        description: "Pengajuan ujian Anda telah berhasil dibatalkan.",
      })
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Disetujui</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Menunggu
          </Badge>
        )
      case "completed":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Selesai</Badge>
      case "rejected":
        return <Badge variant="destructive">Ditolak</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengajuan Ujian Saya</h1>
        <p className="text-muted-foreground">Lihat dan kelola semua pengajuan ujian yang telah Anda ajukan.</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="pending">Menunggu</TabsTrigger>
            <TabsTrigger value="approved">Disetujui</TabsTrigger>
            <TabsTrigger value="completed">Selesai</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" asChild>
            <a href="/dashboard/mahasiswa/exams/register">+ Daftar Ujian Baru</a>
          </Button>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                <Info className="w-10 h-10 text-muted-foreground/60" />
                <h3 className="mt-4 text-lg font-medium">Tidak Ada Pengajuan</h3>
                <p className="max-w-md mt-2 text-sm text-muted-foreground">
                  Anda belum memiliki pengajuan ujian dengan status ini. Klik tombol "Daftar Ujian Baru" untuk membuat
                  pengajuan baru.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex-1 p-6">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="mb-2">
                          {submission.examType}
                        </Badge>
                        {getStatusBadge(submission.status)}
                      </div>

                      <h3 className="text-lg font-medium">{submission.title}</h3>

                      <div className="grid grid-cols-1 gap-3 mt-4 text-sm sm:grid-cols-2">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Diajukan: {new Date(submission.submittedDate).toLocaleDateString("id-ID")}</span>
                        </div>

                        {submission.scheduledDate && (
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Dijadwalkan: {new Date(submission.scheduledDate).toLocaleDateString("id-ID")}</span>
                          </div>
                        )}
                      </div>

                      {submission.status === "rejected" && (
                        <div className="p-3 mt-4 text-sm text-red-800 rounded-md bg-red-50 dark:bg-red-950/50 dark:text-red-300">
                          <p className="font-medium">Alasan Penolakan:</p>
                          <p>{submission.reason}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end gap-2 p-4 border-t bg-muted/50 sm:border-l sm:border-t-0">
                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(submission)}>
                        Detail
                      </Button>

                      {submission.status === "pending" && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => handleCancelSubmission(submission.id)}
                              disabled={isCancelling}
                            >
                              {isCancelling ? (
                                <>
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  <span>Membatalkan...</span>
                                </>
                              ) : (
                                "Batalkan Pengajuan"
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedSubmission && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Pengajuan Ujian</DialogTitle>
              <DialogDescription>Informasi lengkap tentang pengajuan ujian Anda.</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{selectedSubmission.examType}</Badge>
                  {getStatusBadge(selectedSubmission.status)}
                </div>
                <h2 className="mt-2 text-xl font-semibold">{selectedSubmission.title}</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Informasi Pengajuan</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span>Diajukan: {new Date(selectedSubmission.submittedDate).toLocaleDateString("id-ID")}</span>
                    </div>

                    {selectedSubmission.scheduledDate && (
                      <>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>
                            Dijadwalkan: {new Date(selectedSubmission.scheduledDate).toLocaleDateString("id-ID")}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>Waktu: {selectedSubmission.scheduledTime}</span>
                        </div>
                      </>
                    )}

                    {selectedSubmission.location && (
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span>Lokasi: {selectedSubmission.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Status</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm">
                    {selectedSubmission.status === "rejected" ? (
                      <div className="p-3 text-sm text-red-800 rounded-md bg-red-50 dark:bg-red-950/50 dark:text-red-300">
                        <p className="font-medium">Alasan Penolakan:</p>
                        <p>{selectedSubmission.reason}</p>
                      </div>
                    ) : selectedSubmission.status === "pending" ? (
                      <div className="p-3 text-sm rounded-md bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300">
                        <p>{selectedSubmission.notes || "Pengajuan Anda sedang dalam proses review."}</p>
                      </div>
                    ) : selectedSubmission.status === "approved" ? (
                      <div className="p-3 text-sm text-green-800 rounded-md bg-green-50 dark:bg-green-950/50 dark:text-green-300">
                        <p>{selectedSubmission.notes || "Pengajuan Anda telah disetujui."}</p>
                      </div>
                    ) : (
                      <div className="p-3 text-sm text-blue-800 rounded-md bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300">
                        <p className="font-medium">Hasil Ujian:</p>
                        <p>
                          Nilai: {selectedSubmission.result?.score} ({selectedSubmission.result?.grade})
                        </p>
                        <p className="mt-2">Feedback: {selectedSubmission.result?.feedback}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {selectedSubmission.committee && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Penguji</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {selectedSubmission.committee.map((member: any, index: number) => (
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
              )}

              {selectedSubmission.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Catatan</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>{selectedSubmission.notes}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

