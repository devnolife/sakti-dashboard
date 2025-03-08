"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Users,
  MapPin,
  Calendar,
  User,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
} from "lucide-react"
import { teams, getLocationName, getSupervisorName, getTeamMembers, locations, supervisors } from "./mock-data"

interface WorkProgramDetailsDialogProps {
  programId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WorkProgramDetailsDialog({ programId, open, onOpenChange }: WorkProgramDetailsDialogProps) {
  // Find program
  const program = teams.find((t) => t.id === programId)

  if (!program) return null

  const teamMembers = getTeamMembers(program.id)
  const locationName = getLocationName(program.location)
  const supervisorName = getSupervisorName(program.supervisorId)
  const location = locations.find((l) => l.id === program.location)
  const supervisor = supervisors.find((s) => s.id === program.supervisorId)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planning":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Perencanaan</span>
          </Badge>
        )
      case "ongoing":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Berjalan</span>
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Selesai</span>
          </Badge>
        )
      case "evaluated":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 flex items-center gap-1">
            <FileText className="h-3 w-3" />
            <span>Dievaluasi</span>
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-secondary-50/30">
        <DialogHeader>
          <DialogTitle className="text-secondary-700">Detail Program Kerja</DialogTitle>
          <DialogDescription>Informasi lengkap tentang program kerja KKP Plus</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary-700 data-[state=active]:shadow-sm"
            >
              Detail Program
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary-700 data-[state=active]:shadow-sm"
            >
              Anggota Tim
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="data-[state=active]:bg-white data-[state=active]:text-secondary-700 data-[state=active]:shadow-sm"
            >
              Lokasi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-secondary-700">{program.name}</h3>
              {getStatusBadge(program.status)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-secondary-500" />
                  <span>Program: {program.workProgram}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Lokasi: {locationName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary-500" />
                  <span>Pembimbing: {supervisorName}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-mint" />
                  <span>
                    Mulai:{" "}
                    {new Date(program.startDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-mint" />
                  <span>
                    Selesai:{" "}
                    {new Date(program.endDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-secondary-500" />
                  <span>Jumlah Anggota: {teamMembers.length} mahasiswa</span>
                </div>
              </div>
            </div>

            <div className="border-t border-secondary-100 pt-4">
              <h4 className="text-sm font-medium mb-2 text-secondary-700">Deskripsi Program</h4>
              <p className="text-sm text-muted-foreground">
                {program.workProgram} adalah program yang bertujuan untuk memberikan pengalaman kerja profesional kepada
                mahasiswa dalam lingkungan nyata. Program ini melibatkan kolaborasi dengan industri dan masyarakat untuk
                menyelesaikan masalah nyata menggunakan pengetahuan dan keterampilan yang diperoleh selama perkuliahan.
              </p>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Target dan Capaian</h4>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Mengembangkan solusi teknologi yang bermanfaat bagi masyarakat</li>
                <li>Meningkatkan keterampilan teknis dan soft skill mahasiswa</li>
                <li>Membangun jaringan dengan industri dan masyarakat</li>
                <li>Menerapkan pengetahuan teoritis dalam konteks praktis</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Timeline Program</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase Persiapan (2 minggu)</p>
                    <p className="text-xs text-muted-foreground">Analisis kebutuhan dan perencanaan program</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase Implementasi (3 bulan)</p>
                    <p className="text-xs text-muted-foreground">Pengembangan dan implementasi solusi</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase Evaluasi (2 minggu)</p>
                    <p className="text-xs text-muted-foreground">Pengujian, evaluasi, dan perbaikan</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Fase Pelaporan (1 minggu)</p>
                    <p className="text-xs text-muted-foreground">Dokumentasi dan presentasi hasil</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold">Anggota Tim {program.name}</h3>
            <p className="text-sm text-muted-foreground">Daftar mahasiswa yang tergabung dalam tim program kerja ini</p>

            <div className="space-y-4">
              {teamMembers.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">Belum ada anggota tim yang terdaftar</p>
              ) : (
                teamMembers.map((member) => (
                  <div key={member.id} className="flex items-start gap-4 p-3 border rounded-md">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h4 className="text-sm font-medium">{member.name}</h4>
                          <p className="text-xs text-muted-foreground">{member.nim}</p>
                        </div>
                        <Badge className="mt-1 sm:mt-0">{member.department}</Badge>
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Semester {member.semester} •{" "}
                        {member.status === "active" ? "Aktif" : member.status === "completed" ? "Selesai" : "Menunggu"}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-4 pt-4">
            {location ? (
              <>
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold">{location.name}</h3>
                  {location.isActive ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1"
                    >
                      <CheckCircle className="h-3 w-3" />
                      <span>Aktif</span>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Tidak Aktif</span>
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{location.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Alamat: {location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Kota: {location.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Provinsi: {location.province}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Kontak: {location.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>Telepon: {location.contactPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>Email: {location.contactEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Kapasitas dan Ketersediaan</h4>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Kapasitas: {location.capacity} mahasiswa</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Fasilitas</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Ruang kerja bersama</li>
                    <li>Akses internet berkecepatan tinggi</li>
                    <li>Peralatan dan perlengkapan kerja</li>
                    <li>Ruang rapat dan diskusi</li>
                    <li>Kantin dan area istirahat</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Informasi lokasi tidak tersedia</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

