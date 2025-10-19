"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, FileText, Info, Loader2, MoreHorizontal, User, Trash2, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface ExamSubmission {
  id: string
  examType: string
  title: string
  submittedDate: string
  scheduledDate?: string
  scheduledTime?: string
  status: string
  location?: string
  committee: Array<{
    name: string
    role: string
  }>
  notes: string
  result?: {
    score: number
    grade: string
    feedback: string
  }
  reason?: string
}

export function ExamSubmissionsDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<ExamSubmission | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [submissionToCancel, setSubmissionToCancel] = useState<string | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submissions, setSubmissions] = useState<ExamSubmission[]>([])

  useEffect(() => {
    fetchSubmissions()
  }, [activeTab])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const url = `/api/student/exams/submissions${activeTab !== 'all' ? `?status=${activeTab}` : ''}`
      const response = await fetch(url)
      const result = await response.json()
      
      if (result.success) {
        setSubmissions(result.data)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch submissions",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (submission: ExamSubmission) => {
    setSelectedSubmission(submission)
    setIsDialogOpen(true)
  }

  const handleCancelSubmission = async (id: string) => {
    setIsCancelling(true)

    try {
      const response = await fetch(`/api/student/exams/submissions?id=${id}`, {
        method: 'DELETE'
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Pengajuan ujian berhasil dibatalkan"
        })
        fetchSubmissions()
      } else {
        toast({
          title: "Error",
          description: result.error || "Gagal membatalkan pengajuan",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error cancelling submission:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membatalkan pengajuan",
        variant: "destructive"
      })
    } finally {
      setIsCancelling(false)
      setIsCancelDialogOpen(false)
      setSubmissionToCancel(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Disetujui'
      case 'completed':
        return 'Selesai'
      case 'pending':
        return 'Menunggu'
      case 'rejected':
        return 'Ditolak'
      default:
        return status
    }
  }

  const canCancel = (status: string) => {
    return ['pending'].includes(status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading submissions...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Pengajuan Ujian</h1>
        <p className="text-muted-foreground">Pantau status dan riwayat pengajuan ujian Anda</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">Menunggu</TabsTrigger>
          <TabsTrigger value="approved">Disetujui</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
          <TabsTrigger value="rejected">Ditolak</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Tidak ada pengajuan</h3>
                <p className="text-muted-foreground text-center">
                  {activeTab === 'all' 
                    ? 'Anda belum mengajukan ujian apapun'
                    : `Tidak ada pengajuan dengan status "${getStatusText(activeTab)}"`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{submission.title}</h3>
                          <Badge variant="outline" className={getStatusColor(submission.status)}>
                            {getStatusText(submission.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <FileText className="w-4 h-4" />
                          <span>{submission.examType}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Diajukan: {submission.submittedDate}</span>
                          </div>
                          {submission.scheduledDate && (
                            <>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>Dijadwalkan: {submission.scheduledDate}</span>
                              </div>
                              {submission.scheduledTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{submission.scheduledTime}</span>
                                </div>
                              )}
                            </>
                          )}
                        </div>

                        {submission.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                            <span className="font-medium">Lokasi:</span>
                            <span>{submission.location}</span>
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground">{submission.notes}</p>

                        {submission.result && (
                          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-green-800">Hasil Ujian:</span>
                              <Badge className="bg-green-100 text-green-800">
                                Nilai: {submission.result.score} ({submission.result.grade})
                              </Badge>
                            </div>
                            <p className="text-sm text-green-700">{submission.result.feedback}</p>
                          </div>
                        )}

                        {submission.reason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-700">{submission.reason}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(submission)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Detail
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(submission)}>
                              <Eye className="w-4 h-4 mr-2" />
                              Lihat Detail
                            </DropdownMenuItem>
                            {canCancel(submission.status) && (
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSubmissionToCancel(submission.id)
                                  setIsCancelDialogOpen(true)
                                }}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Batalkan
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Pengajuan Ujian</DialogTitle>
            <DialogDescription>
              Informasi lengkap mengenai pengajuan ujian Anda
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">{selectedSubmission.title}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className={getStatusColor(selectedSubmission.status)}>
                    {getStatusText(selectedSubmission.status)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{selectedSubmission.examType}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Tanggal Pengajuan</h4>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.submittedDate}</p>
                </div>
                {selectedSubmission.scheduledDate && (
                  <div>
                    <h4 className="font-medium mb-2">Tanggal Ujian</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedSubmission.scheduledDate}
                      {selectedSubmission.scheduledTime && ` • ${selectedSubmission.scheduledTime}`}
                    </p>
                  </div>
                )}
              </div>

              {selectedSubmission.location && (
                <div>
                  <h4 className="font-medium mb-2">Lokasi</h4>
                  <p className="text-sm text-muted-foreground">{selectedSubmission.location}</p>
                </div>
              )}

              {selectedSubmission.committee && selectedSubmission.committee.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Tim Penguji</h4>
                  <div className="space-y-2">
                    {selectedSubmission.committee.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedSubmission.result && (
                <div>
                  <h4 className="font-medium mb-3">Hasil Ujian</h4>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800">
                        Nilai: {selectedSubmission.result.score} ({selectedSubmission.result.grade})
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700">{selectedSubmission.result.feedback}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium mb-2">Catatan</h4>
                <p className="text-sm text-muted-foreground">{selectedSubmission.notes}</p>
              </div>

              {selectedSubmission.reason && (
                <div>
                  <h4 className="font-medium mb-2">Alasan Penolakan</h4>
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">{selectedSubmission.reason}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Batalkan Pengajuan Ujian</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin membatalkan pengajuan ujian ini? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => submissionToCancel && handleCancelSubmission(submissionToCancel)}
              disabled={isCancelling}
              className="bg-red-600 hover:bg-red-700"
            >
              {isCancelling ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Membatalkan...
                </>
              ) : (
                'Ya, Batalkan'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
