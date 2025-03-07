"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Info,
  FileText,
  Calendar,
  Building,
  ClipboardCheck,
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function KKPManagement({ userRole }: { userRole: string }) {
  const [activeTab, setActiveTab] = useState("informasi")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Kuliah Kerja Profesi & Plus
          </span>
        </h2>
        <p className="text-muted-foreground mt-2">Kelola dan pantau program Kuliah Kerja Profesi & Plus Anda</p>
      </div>

      {userRole === "admin" || userRole === "department_head" ? (
        <Button variant="outline" className="mt-4" asChild>
          <Link href="/admin/kkp-requests">
            <FileText className="h-4 w-4 mr-2" />
            Manage KKP Requests
          </Link>
        </Button>
      ) : null}

      <Tabs defaultValue="informasi" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="informasi" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            <span className="hidden sm:inline">Informasi</span>
          </TabsTrigger>
          <TabsTrigger value="persyaratan" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Persyaratan</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="instansi" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">Instansi</span>
          </TabsTrigger>
          <TabsTrigger value="riwayat" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Riwayat</span>
          </TabsTrigger>
        </TabsList>

        {/* Informasi Tab */}
        <TabsContent value="informasi" className="space-y-4">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <span>Tentang KKP & Plus</span>
              </CardTitle>
              <CardDescription>Informasi umum tentang program Kuliah Kerja Profesi & Plus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-lg font-semibold mb-2">Apa itu KKP & Plus?</h3>
                <p className="text-sm text-muted-foreground">
                  Kuliah Kerja Profesi & Plus (KKP) adalah program magang profesional yang dirancang untuk memberikan
                  pengalaman kerja nyata kepada mahasiswa di bidang studi mereka. Program ini memungkinkan mahasiswa
                  untuk menerapkan pengetahuan akademis mereka dalam lingkungan kerja profesional, mengembangkan
                  keterampilan praktis, dan membangun jaringan profesional.
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md bg-primary/10 p-3">
                    <h4 className="font-medium text-primary mb-1">Tujuan Program</h4>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Mengembangkan keterampilan profesional dalam lingkungan kerja nyata</li>
                      <li>Menerapkan pengetahuan akademis dalam konteks praktis</li>
                      <li>Membangun jaringan profesional dan industri</li>
                      <li>Meningkatkan prospek karir setelah lulus</li>
                    </ul>
                  </div>
                  <div className="rounded-md bg-secondary/10 p-3">
                    <h4 className="font-medium text-secondary mb-1">Manfaat Program</h4>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                      <li>Pengalaman kerja yang dapat ditambahkan ke CV</li>
                      <li>Pemahaman yang lebih baik tentang industri pilihan</li>
                      <li>Kesempatan untuk mendapatkan referensi profesional</li>
                      <li>Potensi tawaran pekerjaan dari instansi tempat magang</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-lg font-semibold mb-2">Pedoman Pelaksanaan</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Ukuran Kelompok</h4>
                      <p className="text-sm text-muted-foreground">
                        Setiap kelompok KKP harus terdiri dari 2 hingga 4 anggota. Pembentukan kelompok harus
                        diselesaikan sebelum pendaftaran program.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Periode Pelaksanaan</h4>
                      <p className="text-sm text-muted-foreground">
                        Program KKP tersedia mulai dari semester 7 untuk semester ganjil dan semester 8 untuk semester
                        genap.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Durasi Program</h4>
                      <p className="text-sm text-muted-foreground">
                        Program KKP berlangsung selama minimal 8 minggu (2 bulan) dengan minimal 20 jam kerja per
                        minggu.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">4</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Penilaian</h4>
                      <p className="text-sm text-muted-foreground">
                        Penilaian KKP didasarkan pada laporan akhir, evaluasi dari pembimbing instansi, dan presentasi
                        akhir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4 bg-card">
                <h3 className="text-lg font-semibold mb-2">Dokumen Penting</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Panduan Lengkap KKP & Plus</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-4 w-4 mr-1" />
                      Unduh
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Template Proposal KKP</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-4 w-4 mr-1" />
                      Unduh
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Template Laporan Akhir</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-4 w-4 mr-1" />
                      Unduh
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">Formulir Evaluasi Pembimbing</span>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <Download className="h-4 w-4 mr-1" />
                      Unduh
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Persyaratan Tab */}
        <TabsContent value="persyaratan" className="space-y-4">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>Persyaratan KKP & Plus</span>
              </CardTitle>
              <CardDescription>Persyaratan yang harus dipenuhi untuk mengikuti program KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-medium">Persyaratan Akademik</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Minimal telah menyelesaikan 100 SKS</p>
                        <p className="text-xs text-muted-foreground">
                          Mahasiswa harus telah menyelesaikan minimal 100 SKS dari total SKS program studi.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">IPK minimal 2,75</p>
                        <p className="text-xs text-muted-foreground">
                          Mahasiswa harus memiliki Indeks Prestasi Kumulatif (IPK) minimal 2,75.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Telah lulus mata kuliah prasyarat</p>
                        <p className="text-xs text-muted-foreground">
                          Mahasiswa harus telah lulus mata kuliah prasyarat sesuai dengan program studi masing-masing.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Terdaftar sebagai mahasiswa aktif</p>
                        <p className="text-xs text-muted-foreground">
                          Mahasiswa harus terdaftar sebagai mahasiswa aktif pada semester pelaksanaan KKP.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-medium">Persyaratan Administratif</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Formulir pendaftaran KKP</p>
                        <p className="text-xs text-muted-foreground">
                          Mengisi dan mengunggah formulir pendaftaran KKP yang telah ditandatangani.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Transkrip nilai terbaru</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah transkrip nilai terbaru yang menunjukkan IPK dan jumlah SKS yang telah
                          diselesaikan.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Surat persetujuan orang tua/wali</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah surat persetujuan dari orang tua/wali untuk mengikuti program KKP.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Bukti pembayaran biaya KKP</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah bukti pembayaran biaya administrasi KKP.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Proposal KKP</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah proposal KKP yang telah disetujui oleh dosen pembimbing.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-medium">Persyaratan Kelompok</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Ukuran kelompok 2-4 mahasiswa</p>
                        <p className="text-xs text-muted-foreground">
                          Setiap kelompok KKP harus terdiri dari minimal 2 dan maksimal 4 mahasiswa.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Berasal dari program studi yang sama</p>
                        <p className="text-xs text-muted-foreground">
                          Anggota kelompok harus berasal dari program studi yang sama.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Formulir pembentukan kelompok</p>
                        <p className="text-xs text-muted-foreground">
                          Mengisi dan mengunggah formulir pembentukan kelompok yang telah ditandatangani oleh semua
                          anggota.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base font-medium">Persyaratan Instansi</AccordionTrigger>
                  <AccordionContent className="space-y-2 pt-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Instansi terdaftar atau disetujui</p>
                        <p className="text-xs text-muted-foreground">
                          Instansi tempat KKP harus terdaftar dalam daftar instansi yang disetujui oleh universitas atau
                          mendapatkan persetujuan khusus.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Surat penerimaan dari instansi</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah surat penerimaan resmi dari instansi tempat KKP.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Profil instansi</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah profil instansi yang berisi informasi tentang instansi tempat KKP.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Data pembimbing instansi</p>
                        <p className="text-xs text-muted-foreground">
                          Mengunggah data pembimbing dari instansi tempat KKP.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Catatan Penting</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      Semua persyaratan di atas harus dipenuhi sebelum batas waktu pendaftaran KKP. Dokumen yang tidak
                      lengkap atau tidak memenuhi persyaratan akan menyebabkan penolakan pendaftaran KKP. Pastikan untuk
                      memeriksa kembali semua persyaratan dan dokumen sebelum mengirimkan pendaftaran.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium mb-3">Status Persyaratan Anda</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Persyaratan Akademik</p>
                        <p className="text-xs text-muted-foreground">IPK 3,8 | 120 SKS</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                      Terpenuhi
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Persyaratan Administratif</p>
                        <p className="text-xs text-muted-foreground">3 dari 5 dokumen diunggah</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                      Sebagian
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Persyaratan Kelompok</p>
                        <p className="text-xs text-muted-foreground">Belum membentuk kelompok</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                      Belum Terpenuhi
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Persyaratan Instansi</p>
                        <p className="text-xs text-muted-foreground">Belum memilih instansi</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                      Belum Terpenuhi
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-4">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Timeline Pelaksanaan KKP</span>
              </CardTitle>
              <CardDescription>Jadwal dan tenggat waktu penting dalam pelaksanaan program KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Progres KKP Anda</h3>
                  <span className="text-xs text-muted-foreground">2 dari 8 tahap selesai</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>

              <div className="relative border-l-2 border-primary/20 pl-6 pb-2 space-y-6">
                {/* Tahap 1 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Pendaftaran KKP</h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Selesai
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">1 - 15 Agustus 2023</p>
                  </div>
                  <p className="text-sm">
                    Mahasiswa mendaftar program KKP melalui sistem dan melengkapi persyaratan awal.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">Diselesaikan pada: 10 Agustus 2023</div>
                </div>

                {/* Tahap 2 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Pembentukan Kelompok</h3>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Selesai
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">16 - 31 Agustus 2023</p>
                  </div>
                  <p className="text-sm">
                    Mahasiswa membentuk kelompok yang terdiri dari 2-4 anggota dan mendaftarkan kelompok.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">Diselesaikan pada: 25 Agustus 2023</div>
                </div>

                {/* Tahap 3 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Pemilihan Instansi</h3>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
                        Dalam Proses
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">1 - 15 September 2023</p>
                  </div>
                  <p className="text-sm">
                    Kelompok memilih instansi tempat KKP dan mengajukan permohonan ke instansi tersebut.
                  </p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Tenggat waktu: 15 September 2023 (5 hari lagi)
                  </div>
                </div>

                {/* Tahap 4 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">4</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Pengajuan Proposal</h3>
                      <Badge variant="outline">Belum Dimulai</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">16 - 30 September 2023</p>
                  </div>
                  <p className="text-sm">
                    Kelompok menyusun dan mengajukan proposal KKP untuk disetujui oleh dosen pembimbing.
                  </p>
                </div>

                {/* Tahap 5 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">5</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Pelaksanaan KKP</h3>
                      <Badge variant="outline">Belum Dimulai</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">1 Oktober - 30 November 2023</p>
                  </div>
                  <p className="text-sm">
                    Mahasiswa melaksanakan KKP di instansi yang telah disetujui selama minimal 8 minggu.
                  </p>
                </div>

                {/* Tahap 6 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">6</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Penyusunan Laporan</h3>
                      <Badge variant="outline">Belum Dimulai</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">1 - 15 Desember 2023</p>
                  </div>
                  <p className="text-sm">
                    Mahasiswa menyusun laporan akhir KKP berdasarkan pengalaman dan hasil kerja selama KKP.
                  </p>
                </div>

                {/* Tahap 7 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">7</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Pengumpulan Laporan</h3>
                      <Badge variant="outline">Belum Dimulai</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">16 - 20 Desember 2023</p>
                  </div>
                  <p className="text-sm">
                    Mahasiswa mengumpulkan laporan akhir KKP yang telah disetujui oleh pembimbing.
                  </p>
                </div>

                {/* Tahap 8 */}
                <div className="relative">
                  <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-bold text-muted-foreground">8</span>
                  </div>
                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium">Presentasi Akhir</h3>
                      <Badge variant="outline">Belum Dimulai</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">21 - 31 Desember 2023</p>
                  </div>
                  <p className="text-sm">
                    Mahasiswa mempresentasikan hasil KKP di hadapan dosen penguji dan pembimbing.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Informasi Timeline</h4>
                    <p className="text-xs text-blue-700 mt-1">
                      Timeline di atas adalah timeline umum untuk program KKP semester ganjil. Timeline untuk semester
                      genap akan diumumkan pada awal semester. Perubahan timeline akan diinformasikan melalui pengumuman
                      resmi.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instansi Tab */}
        <TabsContent value="instansi" className="space-y-4">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                <span>Instansi Terdaftar</span>
              </CardTitle>
              <CardDescription>Daftar instansi yang terdaftar untuk program KKP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari instansi..."
                    className="w-full pl-8 rounded-full border-primary/20 focus-visible:ring-primary"
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      <SelectItem value="tech">Teknologi</SelectItem>
                      <SelectItem value="finance">Keuangan</SelectItem>
                      <SelectItem value="health">Kesehatan</SelectItem>
                      <SelectItem value="education">Pendidikan</SelectItem>
                      <SelectItem value="government">Pemerintahan</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Instansi 1 */}
                <Card className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">PT Teknologi Maju</CardTitle>
                          <CardDescription>Teknologi Informasi</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Tersedia</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">L</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Jakarta Selatan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">P</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Pengembangan Aplikasi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">K</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Kuota: 10 kelompok</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm">Lihat Detail</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Instansi 2 */}
                <Card className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Bank Nasional Indonesia</CardTitle>
                          <CardDescription>Perbankan & Keuangan</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Tersedia</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">L</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Jakarta Pusat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">P</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Analisis Keuangan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">K</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Kuota: 5 kelompok</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm">Lihat Detail</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Instansi 3 */}
                <Card className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Rumah Sakit Medika</CardTitle>
                          <CardDescription>Kesehatan</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">Terbatas</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">L</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Bandung</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">P</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Sistem Informasi Kesehatan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">K</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Kuota: 2 kelompok</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm">Lihat Detail</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Instansi 4 */}
                <Card className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Kementerian Pendidikan</CardTitle>
                          <CardDescription>Pemerintahan</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Tersedia</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">L</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Jakarta Pusat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">P</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Administrasi & Kebijakan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">K</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Kuota: 8 kelompok</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm">Lihat Detail</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Instansi 5 */}
                <Card className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">PT Media Digital</CardTitle>
                          <CardDescription>Media & Komunikasi</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Penuh</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">L</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Jakarta Barat</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">P</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Konten Digital</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">K</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Kuota: 0 kelompok</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" disabled>
                        Lihat Detail
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Instansi 6 */}
                <Card className="overflow-hidden">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">Universitas Pendidikan</CardTitle>
                          <CardDescription>Pendidikan</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Tersedia</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">L</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Yogyakarta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">P</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Teknologi Pendidikan</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-bold text-primary">K</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Kuota: 6 kelompok</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button size="sm">Lihat Detail</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Menampilkan 6 dari 24 instansi</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Sebelumnya
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 p-0">
                    4
                  </Button>
                  <Button variant="outline" size="sm">
                    Selanjutnya
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Riwayat Tab */}
        <TabsContent value="riwayat" className="space-y-4">
          <Card className="overflow-hidden gradient-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
                <span>Riwayat Pengajuan KKP</span>
              </CardTitle>
              <CardDescription>Riwayat pengajuan dan status KKP Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID Pengajuan</TableHead>
                      <TableHead>Instansi</TableHead>
                      <TableHead>Tanggal Pengajuan</TableHead>
                      <TableHead>Anggota Kelompok</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">KKP-2023-001</TableCell>
                      <TableCell>PT Teknologi Maju</TableCell>
                      <TableCell>10 Agustus 2023</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                            AS
                          </div>
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs">
                            RD
                          </div>
                          <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs">
                            FN
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-amber-500/10 text-amber-500">Dalam Proses</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">KKP-2022-045</TableCell>
                      <TableCell>Bank Nasional Indonesia</TableCell>
                      <TableCell>15 Februari 2022</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                            AS
                          </div>
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs">
                            RD
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-red-500/10 text-red-500">Ditolak</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">KKP-2021-112</TableCell>
                      <TableCell>Kementerian Pendidikan</TableCell>
                      <TableCell>5 Agustus 2021</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                            AS
                          </div>
                          <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs">
                            RD
                          </div>
                          <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs">
                            FN
                          </div>
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                            JK
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-500">Selesai</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6">
                <h3 className="text-base font-medium mb-4">Detail Pengajuan Terbaru</h3>
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">KKP-2023-001</h4>
                      <p className="text-xs text-muted-foreground">Diajukan pada 10 Agustus 2023</p>
                    </div>
                    <Badge className="bg-amber-500/10 text-amber-500">Dalam Proses</Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Informasi Instansi</h5>
                      <div className="rounded-md bg-muted p-3 text-sm">
                        <p className="font-medium">PT Teknologi Maju</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Jl. Teknologi No. 123, Jakarta Selatan
                          <br />
                          Bidang: Teknologi Informasi
                          <br />
                          Pembimbing: Ir. Budi Santoso, M.Kom
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Anggota Kelompok</h5>
                      <div className="rounded-md bg-muted p-3 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                              AS
                            </div>
                            <div>
                              <p className="text-xs font-medium">Andi Saputra (Ketua)</p>
                              <p className="text-xs text-muted-foreground">NIM: 12345678</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs">
                              RD
                            </div>
                            <div>
                              <p className="text-xs font-medium">Rina Dewi</p>
                              <p className="text-xs text-muted-foreground">NIM: 23456789</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs">
                              FN
                            </div>
                            <div>
                              <p className="text-xs font-medium">Farhan Nugraha</p>
                              <p className="text-xs text-muted-foreground">NIM: 34567890</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Status Pengajuan</h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Pengajuan Diterima</p>
                            <p className="text-xs text-muted-foreground">10 Agustus 2023</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Pengajuan KKP telah diterima dan sedang dalam proses verifikasi.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Verifikasi Dokumen</p>
                            <p className="text-xs text-muted-foreground">12 Agustus 2023</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Dokumen pengajuan telah diverifikasi dan dinyatakan lengkap.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Persetujuan Instansi</p>
                            <p className="text-xs text-muted-foreground">Dalam Proses</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Menunggu persetujuan dari instansi tempat KKP.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs font-bold text-muted-foreground">4</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Penerbitan Surat Tugas</p>
                            <p className="text-xs text-muted-foreground">Menunggu</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Surat tugas akan diterbitkan setelah mendapat persetujuan instansi.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-xs font-bold text-muted-foreground">5</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Pelaksanaan KKP</p>
                            <p className="text-xs text-muted-foreground">Menunggu</p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Pelaksanaan KKP akan dimulai sesuai jadwal yang ditentukan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Batalkan Pengajuan</Button>
                    <Button>Perbarui Dokumen</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

