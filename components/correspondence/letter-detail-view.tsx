"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText, Printer, Share2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { LetterRequest } from "@/types/correspondence"

interface LetterDetailViewProps {
  letter: LetterRequest
  onBack: () => void
}

export function LetterDetailView({ letter, onBack }: LetterDetailViewProps) {
  const [activeTab, setActiveTab] = useState("preview")

  // Function to get letter type display name
  const getLetterTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      active_student: "Surat Keterangan Aktif Kuliah",
      leave_absence: "Surat Cuti Kuliah",
      loan_application: "Surat Keterangan untuk Pengajuan Pinjaman",
      tuition_extension: "Surat Permohonan Perpanjangan Pembayaran SPP",
      internship_recommendation: "Surat Rekomendasi Magang",
      scholarship_recommendation: "Surat Rekomendasi Beasiswa",
      transcript_request: "Permohonan Transkrip Nilai",
      research_permission: "Surat Izin Penelitian",
      graduation_confirmation: "Surat Keterangan Lulus",
    }
    return typeMap[type] || type
  }

  // Mock letter content based on letter type
  const getLetterContent = () => {
    const currentDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })

    const letterNumber = `${Math.floor(Math.random() * 1000)}/UN.16.F07/AK/${new Date().getFullYear()}`

    switch (letter.type) {
      case "active_student":
        return `
          <div class="space-y-6">
            <div class="text-center">
              <h1 class="text-xl font-bold uppercase">SURAT KETERANGAN AKTIF KULIAH</h1>
              <p class="text-sm">Nomor: ${letterNumber}</p>
            </div>
            
            <p>Yang bertanda tangan di bawah ini:</p>
            
            <div class="pl-6 space-y-1">
              <p>Nama: Dr. Budi Santoso, M.Kom.</p>
              <p>NIP: 197505152000031002</p>
              <p>Jabatan: Wakil Dekan Bidang Akademik</p>
              <p>Fakultas: Ilmu Komputer</p>
              <p>Universitas: Universitas Negeri Jakarta</p>
            </div>
            
            <p>Dengan ini menerangkan bahwa:</p>
            
            <div class="pl-6 space-y-1">
              <p>Nama: ${letter.studentName}</p>
              <p>NIM: ${letter.studentNIM}</p>
              <p>Program Studi: ${letter.studentMajor}</p>
              <p>Fakultas: Ilmu Komputer</p>
              <p>Semester: ${letter.additionalInfo?.semester || "5"}</p>
            </div>
            
            <p>Adalah benar mahasiswa aktif Fakultas Ilmu Komputer Universitas Negeri Jakarta pada Semester Ganjil Tahun Akademik 2023/2024.</p>
            
            <p>Surat keterangan ini dibuat untuk keperluan ${letter.purpose}.</p>
            
            <div class="pt-10 text-right">
              <p>Jakarta, ${currentDate}</p>
              <p class="pt-16">Dr. Budi Santoso, M.Kom.</p>
              <p>NIP. 197505152000031002</p>
            </div>
          </div>
        `
      case "leave_absence":
        return `
          <div class="space-y-6">
            <div class="text-center">
              <h1 class="text-xl font-bold uppercase">SURAT KETERANGAN CUTI KULIAH</h1>
              <p class="text-sm">Nomor: ${letterNumber}</p>
            </div>
            
            <p>Yang bertanda tangan di bawah ini:</p>
            
            <div class="pl-6 space-y-1">
              <p>Nama: Dr. Budi Santoso, M.Kom.</p>
              <p>NIP: 197505152000031002</p>
              <p>Jabatan: Wakil Dekan Bidang Akademik</p>
              <p>Fakultas: Ilmu Komputer</p>
              <p>Universitas: Universitas Negeri Jakarta</p>
            </div>
            
            <p>Dengan ini menerangkan bahwa:</p>
            
            <div class="pl-6 space-y-1">
              <p>Nama: ${letter.studentName}</p>
              <p>NIM: ${letter.studentNIM}</p>
              <p>Program Studi: ${letter.studentMajor}</p>
              <p>Fakultas: Ilmu Komputer</p>
            </div>
            
            <p>Telah diberikan izin cuti kuliah pada Semester ${letter.additionalInfo?.semester || "Ganjil"} Tahun Akademik 2023/2024 terhitung mulai tanggal ${
              letter.additionalInfo?.startDate || "1 September 2023"
            } sampai dengan ${letter.additionalInfo?.endDate || "28 Februari 2024"}.</p>
            
            <p>Alasan cuti: ${letter.additionalInfo?.reason || letter.description}</p>
            
            <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
            
            <div class="pt-10 text-right">
              <p>Jakarta, ${currentDate}</p>
              <p class="pt-16">Dr. Budi Santoso, M.Kom.</p>
              <p>NIP. 197505152000031002</p>
            </div>
          </div>
        `
      default:
        return `
          <div class="space-y-6">
            <div class="text-center">
              <h1 class="text-xl font-bold uppercase">${getLetterTypeDisplay(letter.type)}</h1>
              <p class="text-sm">Nomor: ${letterNumber}</p>
            </div>
            
            <p>Yang bertanda tangan di bawah ini:</p>
            
            <div class="pl-6 space-y-1">
              <p>Nama: Dr. Budi Santoso, M.Kom.</p>
              <p>NIP: 197505152000031002</p>
              <p>Jabatan: Wakil Dekan Bidang Akademik</p>
              <p>Fakultas: Ilmu Komputer</p>
              <p>Universitas: Universitas Negeri Jakarta</p>
            </div>
            
            <p>Dengan ini menerangkan bahwa:</p>
            
            <div class="pl-6 space-y-1">
              <p>Nama: ${letter.studentName}</p>
              <p>NIM: ${letter.studentNIM}</p>
              <p>Program Studi: ${letter.studentMajor}</p>
              <p>Fakultas: Ilmu Komputer</p>
            </div>
            
            <p>${letter.description || "Deskripsi surat tidak tersedia."}</p>
            
            <p>Demikian surat ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
            
            <div class="pt-10 text-right">
              <p>Jakarta, ${currentDate}</p>
              <p class="pt-16">Dr. Budi Santoso, M.Kom.</p>
              <p>NIP. 197505152000031002</p>
            </div>
          </div>
        `
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Daftar Surat
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()} className="gap-2">
            <Printer className="w-4 h-4" />
            Cetak
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Unduh PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Bagikan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">{letter.title}</h3>
              <p className="text-sm text-muted-foreground">
                Dibuat pada {formatDate(letter.completedDate || letter.approvedDate || letter.requestDate)}
              </p>
            </div>
            <Badge variant="outline" className="px-3 py-1 text-green-500 border-green-200 rounded-full bg-green-500/10">
              Terkirim
            </Badge>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="preview">Pratinjau Surat</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="mt-4">
                <div className="border rounded-lg p-6 min-h-[60vh] bg-white shadow-sm">
                  <div
                    className="prose-sm prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: getLetterContent() }}
                  />
                </div>
              </TabsContent>
              <TabsContent value="metadata" className="mt-4">
                <div className="p-6 space-y-4 border rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Nomor Surat</h4>
                    <p className="text-base">
                      {Math.floor(Math.random() * 1000)}/UN.16.F07/AK/{new Date().getFullYear()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Jenis Surat</h4>
                    <p className="text-base">{getLetterTypeDisplay(letter.type)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tanggal Pengajuan</h4>
                    <p className="text-base">{formatDate(letter.requestDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tanggal Disetujui</h4>
                    <p className="text-base">{formatDate(letter.approvedDate || "")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tanggal Selesai</h4>
                    <p className="text-base">{formatDate(letter.completedDate || "")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Disetujui Oleh</h4>
                    <p className="text-base">{letter.approvedBy || "Admin Prodi"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tujuan</h4>
                    <p className="text-base">{letter.purpose}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Surat ini telah ditandatangani secara digital dan sah menurut ketentuan yang berlaku.
            </p>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Informasi Mahasiswa</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Nama</h4>
                <p className="text-base">{letter.studentName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">NIM</h4>
                <p className="text-base">{letter.studentNIM}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Program Studi</h4>
                <p className="text-base">{letter.studentMajor}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Fakultas</h4>
                <p className="text-base">{letter.studentFaculty || "Fakultas Ilmu Komputer"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Dokumen Terkait</h3>
            </CardHeader>
            <CardContent>
              {letter.attachments && letter.attachments.length > 0 ? (
                <ul className="space-y-2">
                  {letter.attachments.map((attachment) => (
                    <li key={attachment.id} className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{attachment.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Tidak ada dokumen terkait</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Riwayat Surat</h3>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-4 border-l border-primary/30">
                <div>
                  <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[6.5px]"></div>
                  <div className="pl-4">
                    <h4 className="text-sm font-medium">Permohonan Diajukan</h4>
                    <p className="text-xs text-muted-foreground">{formatDate(letter.requestDate)}</p>
                  </div>
                </div>
                <div>
                  <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[6.5px]"></div>
                  <div className="pl-4">
                    <h4 className="text-sm font-medium">Dalam Proses Review</h4>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(letter.reviewDate || letter.requestDate)}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[6.5px]"></div>
                  <div className="pl-4">
                    <h4 className="text-sm font-medium">Permohonan Disetujui</h4>
                    <p className="text-xs text-muted-foreground">{formatDate(letter.approvedDate || "")}</p>
                  </div>
                </div>
                <div>
                  <div className="absolute w-3 h-3 bg-background border-2 border-primary rounded-full -left-[6.5px]"></div>
                  <div className="pl-4">
                    <h4 className="text-sm font-medium">Surat Selesai</h4>
                    <p className="text-xs text-muted-foreground">{formatDate(letter.completedDate || "")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

