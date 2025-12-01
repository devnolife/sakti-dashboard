"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  Target,
  TrendingUp,
  ClipboardList,
  CheckCircle2,
  CalendarDays,
  FileCheck,
  Users,
  MapPin,
  FileText,
  Clock,
} from "lucide-react"

export default function InformasiKkpPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Informasi Kuliah Kerja Praktik (KKP)
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Panduan lengkap tentang program KKP Fakultas Teknik
          </p>
        </div>
      </div>

      {/* Informasi Tentang KKP */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Apa itu Kuliah Kerja Praktik (KKP)?</h2>
              <p className="text-sm text-muted-foreground">
                Informasi lengkap tentang program KKP
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Pengertian KKP
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Kuliah Kerja Praktik (KKP) adalah kegiatan intrakurikuler yang dilaksanakan oleh mahasiswa
                dalam bentuk pengabdian kepada masyarakat dan pembelajaran di dunia kerja nyata. KKP bertujuan
                untuk memberikan pengalaman praktis kepada mahasiswa dalam menerapkan ilmu yang telah dipelajari
                di bangku kuliah ke dalam dunia kerja yang sesungguhnya.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg bg-primary/5">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Tujuan KKP
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Mengaplikasikan teori ke praktik di lapangan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Meningkatkan soft skills dan hard skills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Membangun jaringan profesional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Mempersiapkan diri memasuki dunia kerja</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg bg-secondary/5">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-secondary" />
                  Manfaat KKP
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Pengalaman kerja yang berharga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Sertifikat dari perusahaan/instansi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Peluang karir di masa depan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>Memenuhi syarat kelulusan</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prosedur dan Timeline KKP */}
      <Card className="border-none shadow-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <CalendarDays className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Prosedur dan Timeline KKP</h2>
              <p className="text-sm text-muted-foreground">
                Tahapan pelaksanaan KKP dari awal sampai selesai
              </p>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Persiapan dan Persyaratan",
                description: "Lengkapi semua persyaratan administrasi yang diperlukan",
                duration: "2-4 minggu sebelum KKP",
                icon: FileCheck,
              },
              {
                step: 2,
                title: "Pembentukan Kelompok",
                description: "Bentuk kelompok KKP (2-4 orang) dan pilih ketua kelompok",
                duration: "1-2 minggu sebelum KKP",
                icon: Users,
              },
              {
                step: 3,
                title: "Pemilihan Lokasi",
                description: "Pilih lokasi KKP yang sesuai dengan minat dan jurusan",
                duration: "1-2 minggu sebelum KKP",
                icon: MapPin,
              },
              {
                step: 4,
                title: "Pengajuan KKP",
                description: "Submit formulir pengajuan KKP beserta dokumen pendukung",
                duration: "Setelah semua persyaratan lengkap",
                icon: FileText,
              },
              {
                step: 5,
                title: "Pelaksanaan KKP",
                description: "Laksanakan KKP sesuai jadwal dan buat laporan progres berkala",
                duration: "1-2 bulan (sesuai program)",
                icon: ClipboardList,
              },
              {
                step: 6,
                title: "Penyelesaian dan Penilaian",
                description: "Submit laporan akhir dan dapatkan penilaian dari pembimbing",
                duration: "1-2 minggu setelah KKP",
                icon: CheckCircle2,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors"
              >
                <div className="p-3 bg-primary/10 rounded-full flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      Tahap {item.step}
                    </Badge>
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Catatan Penting</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pastikan semua persyaratan sudah lengkap sebelum mendaftar</li>
                  <li>• Koordinasi yang baik dengan anggota kelompok sangat penting</li>
                  <li>• Konsultasi rutin dengan dosen pembimbing wajib dilakukan</li>
                  <li>• Patuhi semua peraturan dan tata tertib di lokasi KKP</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
