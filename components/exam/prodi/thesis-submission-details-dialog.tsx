"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Check, X, AlertCircle, FileText, Users, MessageSquare } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ThesisSubmission } from "./types"

interface ThesisSubmissionDetailsDialogProps {
  submission: ThesisSubmission
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ThesisSubmissionDetailsDialog({ submission, open, onOpenChange }: ThesisSubmissionDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [feedbackText, setFeedbackText] = useState(submission.feedback || "")

  const handleApprove = () => {
    toast({
      title: "Judul disetujui",
      description: "Judul skripsi telah berhasil disetujui",
    })
    onOpenChange(false)
    // In a real app, you would update the status in the database
  }

  const handleReject = () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback diperlukan",
        description: "Harap berikan alasan penolakan sebelum menolak judul",
        variant: "destructive",
      })
      setActiveTab("feedback")
      return
    }

    toast({
      title: "Judul ditolak",
      description: "Judul skripsi telah ditolak",
    })
    onOpenChange(false)
    // In a real app, you would update the status in the database
  }

  const handleRequestRevision = () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Feedback diperlukan",
        description: "Harap berikan saran revisi sebelum meminta revisi",
        variant: "destructive",
      })
      setActiveTab("feedback")
      return
    }

    toast({
      title: "Revisi diminta",
      description: "Permintaan revisi judul skripsi telah dikirim",
    })
    onOpenChange(false)
    // In a real app, you would update the status in the database
  }

  const handleSaveFeedback = () => {
    toast({
      title: "Feedback disimpan",
      description: "Feedback telah berhasil disimpan",
    })
    // In a real app, you would update the feedback in the database
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Menunggu Persetujuan
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Ditolak
          </Badge>
        )
      case "revision":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Perlu Revisi
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Detail Pengajuan Judul {getStatusBadge(submission.status)}
          </DialogTitle>
          <DialogDescription>Informasi lengkap pengajuan judul skripsi mahasiswa</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Detail
            </TabsTrigger>
            <TabsTrigger value="similarity" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Kemiripan
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>{submission.title}</CardTitle>
                <CardDescription>Detail pengajuan judul skripsi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nama Mahasiswa</Label>
                    <div className="font-medium">{submission.studentName}</div>
                  </div>
                  <div>
                    <Label>NIM</Label>
                    <div className="font-medium">{submission.studentId}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Program Studi</Label>
                    <div className="font-medium">{submission.program}</div>
                  </div>
                  <div>
                    <Label>Tanggal Pengajuan</Label>
                    <div className="font-medium">{format(new Date(submission.submissionDate), "dd MMMM yyyy")}</div>
                  </div>
                </div>

                <div>
                  <Label>Abstrak</Label>
                  <div className="mt-1 text-sm">
                    <ScrollArea className="h-[150px] rounded-md border p-4">{submission.abstract}</ScrollArea>
                  </div>
                </div>

                <div>
                  <Label>Kata Kunci</Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {submission.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {submission.status === "pending" && (
                  <>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleRequestRevision}>
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Minta Revisi
                      </Button>
                      <Button variant="destructive" onClick={handleReject}>
                        <X className="mr-2 h-4 w-4" />
                        Tolak
                      </Button>
                    </div>
                    <Button onClick={handleApprove}>
                      <Check className="mr-2 h-4 w-4" />
                      Setujui
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="similarity">
            <Card>
              <CardHeader>
                <CardTitle>Analisis Kemiripan</CardTitle>
                <CardDescription>Hasil analisis kemiripan dengan judul skripsi yang sudah ada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>Tingkat Kemiripan Keseluruhan</div>
                    <Badge
                      variant="outline"
                      className={`${submission.similarityScore < 30 ? "bg-green-50 text-green-700 border-green-200" : submission.similarityScore < 70 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}
                    >
                      {submission.similarityScore}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Label>Judul Skripsi dengan Kemiripan Tertinggi</Label>
                    {submission.similarTheses && submission.similarTheses.length > 0 ? (
                      <div className="space-y-3">
                        {submission.similarTheses.map((thesis, index) => (
                          <div key={index} className="rounded-md border p-3">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{thesis.title}</div>
                              <Badge
                                variant="outline"
                                className={`${thesis.similarityPercentage < 30 ? "bg-green-50 text-green-700 border-green-200" : thesis.similarityPercentage < 70 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}
                              >
                                {thesis.similarityPercentage}%
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {thesis.author} ({thesis.year})
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground italic">Tidak ditemukan judul dengan kemiripan tinggi</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
                <CardDescription>Berikan feedback untuk pengajuan judul skripsi ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="feedback">Catatan dan Saran</Label>
                    <Textarea
                      id="feedback"
                      placeholder="Berikan feedback untuk mahasiswa..."
                      className="mt-1 min-h-[150px]"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Kembali
                </Button>
                <Button onClick={handleSaveFeedback}>Simpan Feedback</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

