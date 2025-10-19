"use client"

import { useState } from "react"
import { Calendar, Clock, FileCheck, GraduationCap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Available exam types
const availableExams = [
  {
    id: "proposal-exam",
    title: "Ujian Proposal",
    description: "Ujian untuk mempresentasikan proposal penelitian Anda",
    icon: Calendar,
    color: "bg-blue-500",
    requirements: [
      "Telah menyelesaikan minimal 100 SKS",
      "Telah lulus mata kuliah Metodologi Penelitian",
      "Memiliki proposal penelitian yang telah disetujui oleh pembimbing",
    ],
    available: true,
  },
  {
    id: "result-exam",
    title: "Ujian Hasil",
    description: "Ujian untuk mempresentasikan hasil penelitian Anda",
    icon: GraduationCap,
    color: "bg-purple-500",
    requirements: [
      "Telah lulus Ujian Proposal",
      "Telah menyelesaikan penelitian",
      "Memiliki draft hasil penelitian yang telah disetujui oleh pembimbing",
    ],
    available: false,
    reason: "Anda belum lulus Ujian Proposal",
  },
  {
    id: "closing-exam",
    title: "Ujian Tutup",
    description: "Ujian akhir untuk menyelesaikan penelitian Anda",
    icon: Users,
    color: "bg-teal-500",
    requirements: [
      "Telah lulus Ujian Hasil",
      "Telah menyelesaikan revisi penelitian",
      "Memiliki draft final yang telah disetujui oleh pembimbing",
    ],
    available: false,
    reason: "Anda belum lulus Ujian Hasil",
  },
]

// Mock data for supervisors
const supervisors = [
  { id: "1", name: "Dr. Budi Santoso, M.Sc." },
  { id: "2", name: "Prof. Siti Rahayu, Ph.D." },
  { id: "3", name: "Dr. Ahmad Wijaya, M.T." },
  { id: "4", name: "Dr. Dewi Anggraini, M.Kom." },
]

export function ExamRegistrationDashboard() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRegister = (examId: string) => {
    setSelectedExam(examId)
    setIsDialogOpen(true)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDialogOpen(false)

      // Reset form
      setSelectedDate("")
      setSelectedTime("")
      setSelectedSupervisor("")
      setNotes("")

      toast({
        title: "Pendaftaran Berhasil",
        description:
          "Pendaftaran ujian Anda telah berhasil diajukan. Silakan periksa status pendaftaran di halaman Pengajuan Saya.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Daftar Ujian</h1>
        <p className="text-muted-foreground">
          Pilih jenis ujian yang ingin Anda daftarkan dan ikuti langkah-langkah pendaftaran.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableExams.map((exam) => (
          <Card key={exam.id} className="overflow-hidden">
            <CardHeader className={`text-white ${exam.color}`}>
              <div className="flex items-center justify-between">
                <exam.icon className="h-6 w-6" />
                {exam.available ? (
                  <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs font-medium">
                    Tersedia
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-white/20 px-2 py-1 text-xs font-medium">
                    Tidak Tersedia
                  </span>
                )}
              </div>
              <CardTitle className="mt-2">{exam.title}</CardTitle>
              <CardDescription className="text-white/80">{exam.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <h4 className="mb-2 text-sm font-medium">Persyaratan:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {exam.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 mt-0.5 text-xs">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-4">
              {exam.available ? (
                <Button className="w-full" onClick={() => handleRegister(exam.id)}>
                  Daftar Sekarang
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  {exam.reason}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Pendaftaran Ujian</CardTitle>
          <CardDescription>Pelajari persyaratan dan prosedur pendaftaran ujian di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <h3 className="flex items-center text-base font-medium">
              <Calendar className="mr-2 h-5 w-5 text-blue-500" />
              Jadwal Pendaftaran
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Pendaftaran ujian dapat dilakukan 2 minggu sebelum periode ujian dimulai. Pastikan Anda mendaftar sebelum
              batas waktu untuk menghindari penundaan.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="flex items-center text-base font-medium">
              <FileCheck className="mr-2 h-5 w-5 text-purple-500" />
              Dokumen yang Diperlukan
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Siapkan dokumen berikut sebelum mendaftar: proposal/hasil penelitian, formulir persetujuan pembimbing, dan
              transkrip nilai terbaru.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="flex items-center text-base font-medium">
              <Clock className="mr-2 h-5 w-5 text-teal-500" />
              Proses Persetujuan
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Setelah mendaftar, pendaftaran Anda akan diproses dalam 3-5 hari kerja. Anda akan menerima notifikasi
              setelah pendaftaran disetujui.
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Daftar Ujian</DialogTitle>
            <DialogDescription>
              Lengkapi informasi di bawah ini untuk mendaftar ujian. Pastikan semua informasi yang Anda berikan sudah
              benar.
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="grid gap-4 px-1">
              <div className="grid gap-2">
                <Label htmlFor="exam-date">Tanggal Ujian yang Diinginkan</Label>
                <input
                  id="exam-date"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="exam-time">Waktu Ujian yang Diinginkan</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="exam-time">
                    <SelectValue placeholder="Pilih waktu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">08:00 - 10:00</SelectItem>
                    <SelectItem value="10:00">10:00 - 12:00</SelectItem>
                    <SelectItem value="13:00">13:00 - 15:00</SelectItem>
                    <SelectItem value="15:00">15:00 - 17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="supervisor">Pembimbing</Label>
                <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                  <SelectTrigger id="supervisor">
                    <SelectValue placeholder="Pilih pembimbing" />
                  </SelectTrigger>
                  <SelectContent>
                    {supervisors.map((supervisor) => (
                      <SelectItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea
                  id="notes"
                  placeholder="Tambahkan catatan atau informasi tambahan jika diperlukan"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid gap-2">
                <Label>Konfirmasi Persyaratan</Label>
                <RadioGroup defaultValue="confirm">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="confirm" id="confirm" />
                    <Label htmlFor="confirm" className="text-sm font-normal">
                      Saya menyatakan bahwa saya telah memenuhi semua persyaratan untuk ujian ini
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedDate || !selectedTime || !selectedSupervisor || isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Daftar Ujian"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
