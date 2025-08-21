"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  FileText,
  Download,
  Upload,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Building,
  MapPin
} from "lucide-react"

export default function TransferLetterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Surat Pindah
        </h1>
        <p className="text-gray-600 text-lg">
          Pengajuan Surat Keterangan Pindah Program Studi
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Pengajuan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Form Pengajuan Surat Pindah
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Isi data dengan lengkap dan benar
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Data Mahasiswa */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Data Mahasiswa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nim">NIM</Label>
                    <Input 
                      id="nim" 
                      value="2021210001" 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input 
                      id="name" 
                      value="Ahmad Rahman" 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="current-prodi">Program Studi Asal</Label>
                    <Input 
                      id="current-prodi" 
                      value="Teknik Informatika" 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input 
                      id="semester" 
                      value="5" 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Data Tujuan Pindah */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Building className="w-5 h-5 text-green-500" />
                  Tujuan Pindah
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-university">Universitas Tujuan</Label>
                    <Input 
                      id="target-university" 
                      placeholder="Masukkan nama universitas tujuan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-faculty">Fakultas Tujuan</Label>
                    <Input 
                      id="target-faculty" 
                      placeholder="Masukkan nama fakultas tujuan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-prodi">Program Studi Tujuan</Label>
                    <Input 
                      id="target-prodi" 
                      placeholder="Masukkan program studi tujuan"
                    />
                  </div>
                </div>
              </div>

              {/* Alasan Pindah */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Alasan Pindah
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="reason">Alasan Pindah</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih alasan pindah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal">Alasan Personal/Keluarga</SelectItem>
                      <SelectItem value="financial">Alasan Finansial</SelectItem>
                      <SelectItem value="academic">Alasan Akademik</SelectItem>
                      <SelectItem value="location">Kedekatan Lokasi</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="detail-reason">Penjelasan Detail</Label>
                  <Textarea 
                    id="detail-reason"
                    placeholder="Jelaskan alasan pindah secara detail..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Upload Berkas */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-500" />
                  Upload Berkas Pendukung
                </h3>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Upload Surat Penerimaan dari Universitas Tujuan
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Format: PDF, maksimal 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                <FileText className="w-4 h-4 mr-2" />
                Ajukan Surat Pindah
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Status & Informasi */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Status Pengajuan */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Status Pengajuan Terakhir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <p className="font-medium text-gray-800">Surat Pindah #SP-2024-001</p>
                    <p className="text-sm text-gray-600">Diajukan: 15 Januari 2024</p>
                  </div>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Dalam Review
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Pengajuan Diterima</p>
                      <p className="text-xs text-gray-600">15 Jan 2024, 10:30</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">Review Administrasi</p>
                      <p className="text-xs text-gray-600">16 Jan 2024, 14:20</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Persetujuan Prodi</p>
                      <p className="text-xs text-gray-500">Menunggu</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Persyaratan */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Persyaratan Surat Pindah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Surat penerimaan dari universitas tujuan",
                  "Transkrip nilai sementara",
                  "Surat keterangan tidak ada tunggakan",
                  "Formulir pengajuan pindah",
                  "Surat pernyataan orang tua/wali"
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informasi Penting */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Informasi Penting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Proses persetujuan surat pindah membutuhkan waktu 7-14 hari kerja</p>
                <p>• Mahasiswa harus menyelesaikan semua kewajiban administrasi</p>
                <p>• Surat pindah hanya dapat diajukan maksimal 2 kali dalam masa studi</p>
                <p>• Konsultasikan dengan pembimbing akademik sebelum mengajukan</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}