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
import { Check, Calendar, MapPin, Clock, FileText, Users, MessageSquare } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ExamSchedule } from "./types"

interface ExamScheduleDetailsDialogProps {
  schedule: ExamSchedule
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExamScheduleDetailsDialog({ schedule, open, onOpenChange }: ExamScheduleDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details")
  const [notesText, setNotesText] = useState(schedule.notes || "")

  const handleVerify = () => {
    toast({
      title: "Jadwal diverifikasi",
      description: "Jadwal ujian telah berhasil diverifikasi",
    })
    onOpenChange(false)
    // In a real app, you would update the status in the database
  }

  const handleSaveNotes = () => {
    toast({
      title: "Catatan disimpan",
      description: "Catatan telah berhasil disimpan",
    })
    // In a real app, you would update the notes in the database
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Menunggu Verifikasi
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Terverifikasi
          </Badge>
        )
      case "rescheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Dijadwalkan Ulang
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Dibatalkan
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getExamTypeBadge = (type: string) => {
    switch (type) {
      case "proposal":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Proposal
          </Badge>
        )
      case "result":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Hasil
          </Badge>
        )
      case "final":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Tutup
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Detail Jadwal Ujian {getStatusBadge(schedule.verificationStatus)}
          </DialogTitle>
          <DialogDescription>Informasi lengkap jadwal ujian mahasiswa</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Detail
            </TabsTrigger>
            <TabsTrigger value="committee" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Komite Penguji
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Catatan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>{schedule.title}</CardTitle>
                <CardDescription>Detail jadwal ujian</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nama Mahasiswa</Label>
                    <div className="font-medium">{schedule.studentName}</div>
                  </div>
                  <div>
                    <Label>NIM</Label>
                    <div className="font-medium">{schedule.studentId}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Program Studi</Label>
                    <div className="font-medium">{schedule.program}</div>
                  </div>
                  <div>
                    <Label>Tipe Ujian</Label>
                    <div className="font-medium flex items-center gap-2">{getExamTypeBadge(schedule.examType)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Tanggal dan Waktu</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {schedule.scheduledDate
                        ? format(new Date(schedule.scheduledDate), "dd MMMM yyyy, HH:mm")
                        : "Belum dijadwalkan"}
                    </div>
                  </div>
                  <div>
                    <Label>Durasi</Label>
                    <div className="font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {schedule.duration} menit
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Lokasi</Label>
                  <div className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {schedule.location}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {schedule.verificationStatus === "pending" && (
                  <Button onClick={handleVerify}>
                    <Check className="mr-2 h-4 w-4" />
                    Verifikasi Jadwal
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="committee">
            <Card>
              <CardHeader>
                <CardTitle>Komite Penguji</CardTitle>
                <CardDescription>Daftar dosen penguji untuk ujian ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedule.committee && schedule.committee.length > 0 ? (
                    schedule.committee.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-md">
                        <Avatar>
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-muted-foreground italic">Belum ada dosen penguji yang ditugaskan</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Catatan</CardTitle>
                <CardDescription>Tambahkan catatan untuk jadwal ujian ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Catatan</Label>
                    <Textarea
                      id="notes"
                      placeholder="Tambahkan catatan..."
                      className="mt-1 min-h-[150px]"
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Kembali
                </Button>
                <Button onClick={handleSaveNotes}>Simpan Catatan</Button>
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

