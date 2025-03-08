"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Briefcase, Calendar, MapPin, Award, FileText } from "lucide-react"
import { students, historicalStudents } from "./mock-data"

interface StudentDetailsDialogProps {
  studentId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentDetailsDialog({ studentId, open, onOpenChange }: StudentDetailsDialogProps) {
  // Find student from both active and historical students
  const student = students.find((s) => s.id === studentId) || historicalStudents.find((s) => s.id === studentId)

  if (!student) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-primary-50/30">
        <DialogHeader>
          <DialogTitle className="text-primary-700">Detail Mahasiswa</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang mahasiswa dan partisipasinya dalam program KKP Plus
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm"
            >
              Profil
            </TabsTrigger>
            <TabsTrigger
              value="program"
              className="data-[state=active]:bg-white data-[state=active]:text-primary-700 data-[state=active]:shadow-sm"
            >
              Program Kerja
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-square rounded-md bg-primary-100/50 flex items-center justify-center shadow-inner">
                  <User className="h-24 w-24 text-primary-300" />
                </div>
              </div>

              <div className="md:w-2/3 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-primary-700">{student.name}</h3>
                  <p className="text-muted-foreground">{student.nim}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary-500" />
                      <span>Jurusan: {student.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-secondary-500" />
                      <span>Semester: {student.semester}</span>
                    </div>
                    {student.teamName && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-accent" />
                        <span>Tim: {student.teamName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {student.startDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-mint" />
                        <span>
                          Mulai:{" "}
                          {new Date(student.startDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    {student.endDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-mint" />
                        <span>
                          Selesai:{" "}
                          {new Date(student.endDate).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    {student.grade && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span>Nilai: {student.grade}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2 text-primary-700">Status Program</h4>
                  <div className="flex items-center gap-2">
                    {student.status === "active" && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 shadow-sm">Aktif</Badge>
                    )}
                    {student.status === "completed" && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 shadow-sm">Selesai</Badge>
                    )}
                    {student.status === "pending" && (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 shadow-sm">Menunggu</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-primary-100 pt-4">
              <h4 className="text-sm font-medium mb-2 text-primary-700">Catatan Akademik</h4>
              <p className="text-sm text-muted-foreground">
                Mahasiswa ini telah menyelesaikan semua persyaratan akademik untuk mengikuti program KKP Plus. Memiliki
                nilai rata-rata yang baik dan telah menyelesaikan minimal 100 SKS.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="program" className="space-y-4 pt-4">
            {student.teamId ? (
              <>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{student.teamName}</h3>
                    <p className="text-sm text-muted-foreground">
                      Program kerja profesional yang diikuti oleh mahasiswa
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span>Program: Pengembangan Sistem Informasi Desa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>Lokasi: PT Teknologi Maju Indonesia</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>Pembimbing: Dr. Budi Santoso, M.Kom</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Periode: 1 Januari 2023 - 30 Juni 2023</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>Laporan: Sudah Dikumpulkan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Presentasi: Sudah Dilaksanakan</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Deskripsi Program</h4>
                    <p className="text-sm text-muted-foreground">
                      Program ini bertujuan untuk mengembangkan sistem informasi desa yang terintegrasi untuk membantu
                      pengelolaan administrasi desa. Sistem ini mencakup modul kependudukan, keuangan desa, aset desa,
                      dan pelayanan publik. Mahasiswa terlibat dalam analisis kebutuhan, perancangan sistem,
                      pengembangan aplikasi, dan implementasi di lapangan.
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Capaian Program</h4>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                      <li>Berhasil mengembangkan sistem informasi desa yang terintegrasi</li>
                      <li>Melakukan pelatihan kepada perangkat desa untuk penggunaan sistem</li>
                      <li>Mendokumentasikan proses pengembangan dan manual penggunaan</li>
                      <li>Melakukan evaluasi dan perbaikan berdasarkan umpan balik pengguna</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Mahasiswa belum terdaftar dalam program kerja KKP Plus</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

