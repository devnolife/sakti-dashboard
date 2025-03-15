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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface TitleSubmissionDetailsDialogProps {
  submission: {
    id: string
    studentName: string
    studentId: string
    title: string
    abstract: string
    submissionDate: string
    status: string
    similarity: number
    department: string
    supervisor: string
    keywords: string[]
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TitleSubmissionDetailsDialog({ submission, open, onOpenChange }: TitleSubmissionDetailsDialogProps) {
  const similarTitles = [
    {
      title: "Implementasi Deep Learning untuk Klasifikasi Citra Digital",
      author: "Rudi Hartono",
      year: 2021,
      similarity: 65,
    },
    {
      title: "Penerapan Convolutional Neural Networks untuk Deteksi Objek pada Video",
      author: "Sinta Dewi",
      year: 2022,
      similarity: 48,
    },
    {
      title: "Analisis Performa Algoritma YOLO dalam Deteksi Objek Real-Time",
      author: "Hendra Wijaya",
      year: 2020,
      similarity: 42,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Pengajuan Judul</DialogTitle>
          <DialogDescription>Tinjau detail pengajuan judul skripsi dan berikan keputusan.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detail Pengajuan</TabsTrigger>
            <TabsTrigger value="similarity">Analisis Kesamaan</TabsTrigger>
            <TabsTrigger value="decision">Keputusan</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={submission.studentName} />
                <AvatarFallback>{submission.studentName.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{submission.studentName}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{submission.studentId}</span>
                  <span>•</span>
                  <span>{submission.department}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Judul Skripsi</h3>
              <p className="text-base">{submission.title}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Abstrak</h3>
              <p className="text-sm text-muted-foreground">{submission.abstract}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Tanggal Pengajuan</h3>
                <p className="text-sm">{submission.submissionDate}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Dosen Pembimbing</h3>
                <p className="text-sm">{submission.supervisor}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Kata Kunci</h3>
              <div className="flex flex-wrap gap-2">
                {submission.keywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similarity" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Skor Kesamaan</CardTitle>
                <CardDescription>Hasil analisis kesamaan dengan judul skripsi yang sudah ada.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <span className="text-2xl font-bold">{submission.similarity}%</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {submission.similarity > 15 ? "Perhatian Diperlukan" : "Kesamaan Rendah"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {submission.similarity > 15
                        ? "Judul memiliki kesamaan yang cukup tinggi dengan judul yang sudah ada."
                        : "Judul memiliki kesamaan yang rendah dengan judul yang sudah ada."}
                    </p>
                  </div>
                </div>

                <h3 className="mb-2 font-semibold">Judul Serupa</h3>
                <div className="space-y-3">
                  {similarTitles.map((title, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{title.title}</h4>
                        <Badge variant={title.similarity > 60 ? "destructive" : "secondary"}>{title.similarity}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {title.author} • {title.year}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="decision" className="space-y-4 pt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Keputusan</CardTitle>
                <CardDescription>Berikan keputusan untuk pengajuan judul skripsi ini.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-500" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Pertimbangan</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        Pastikan untuk memeriksa kesamaan judul dengan teliti sebelum memberikan keputusan. Judul dengan
                        kesamaan tinggi mungkin perlu direvisi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 border-green-200 bg-green-50 hover:bg-green-100 dark:border-green-900 dark:bg-green-950 dark:hover:bg-green-900"
                  >
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
                    <div className="text-center">
                      <p className="font-semibold text-green-800 dark:text-green-300">Setujui</p>
                      <p className="text-xs text-green-700 dark:text-green-400">Judul diterima dan dapat dilanjutkan</p>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-24 flex-col gap-2 border-red-200 bg-red-50 hover:bg-red-100 dark:border-red-900 dark:bg-red-950 dark:hover:bg-red-900"
                  >
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
                    <div className="text-center">
                      <p className="font-semibold text-red-800 dark:text-red-300">Tolak</p>
                      <p className="text-xs text-red-700 dark:text-red-400">Judul ditolak dan perlu direvisi</p>
                    </div>
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Catatan (opsional)</h4>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Berikan catatan atau saran untuk pengajuan ini..."
                    rows={4}
                  ></textarea>
                </div>
              </CardContent>
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

