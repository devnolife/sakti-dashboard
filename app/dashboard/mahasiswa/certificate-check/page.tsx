"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import {
  Award,
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  FileText,
  Calendar,
  User,
  Printer,
  Eye,
  ExternalLink
} from "lucide-react"

interface Certificate {
  id: string
  type: "diploma" | "transcript" | "certificate"
  title: string
  issueDate: string
  verificationStatus: "verified" | "pending" | "expired" | "invalid"
  certificateNumber: string
  gpa?: number
  graduationDate?: string
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    type: "diploma",
    title: "Ijazah Sarjana Teknik Informatika",
    issueDate: "2024-07-15",
    verificationStatus: "verified",
    certificateNumber: "TI/S1/2024/001234",
    gpa: 3.67,
    graduationDate: "2024-07-15"
  },
  {
    id: "2",
    type: "transcript",
    title: "Transkrip Nilai Akademik",
    issueDate: "2024-07-10",
    verificationStatus: "verified",
    certificateNumber: "TR/TI/2024/001234",
    gpa: 3.67
  },
  {
    id: "3",
    type: "certificate",
    title: "Sertifikat Kompetensi Programming",
    issueDate: "2024-06-20",
    verificationStatus: "verified",
    certificateNumber: "CERT/PROG/2024/1234"
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "verified": return "bg-green-100 text-green-800 border-green-300"
    case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "expired": return "bg-red-100 text-red-800 border-red-300"
    case "invalid": return "bg-gray-100 text-gray-800 border-gray-300"
    default: return "bg-gray-100 text-gray-800 border-gray-300"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "verified": return <CheckCircle className="w-4 h-4" />
    case "pending": return <Clock className="w-4 h-4" />
    case "expired": 
    case "invalid": return <AlertCircle className="w-4 h-4" />
    default: return <Shield className="w-4 h-4" />
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "diploma": return <Award className="w-5 h-5 text-blue-500" />
    case "transcript": return <FileText className="w-5 h-5 text-green-500" />
    case "certificate": return <Shield className="w-5 h-5 text-purple-500" />
    default: return <FileText className="w-5 h-5 text-gray-500" />
  }
}

export default function CertificateCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Pengecekan Ijazah & Sertifikat
        </h1>
        <p className="text-gray-600 text-lg">
          Verifikasi dan kelola dokumen akademik Anda
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search & Verification */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Verification Form */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Verifikasi Dokumen
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Masukkan nomor dokumen untuk verifikasi
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doc-number">Nomor Dokumen</Label>
                  <Input 
                    id="doc-number" 
                    placeholder="Masukkan nomor ijazah/sertifikat"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doc-type">Jenis Dokumen</Label>
                  <select 
                    id="doc-type"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Pilih jenis dokumen</option>
                    <option value="diploma">Ijazah</option>
                    <option value="transcript">Transkrip</option>
                    <option value="certificate">Sertifikat</option>
                  </select>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Search className="w-4 h-4 mr-2" />
                Verifikasi Dokumen
              </Button>
            </CardContent>
          </Card>

          {/* My Certificates */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Award className="w-6 h-6 text-emerald-500" />
                Dokumen Saya
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                {mockCertificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        {getTypeIcon(cert.type)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{cert.title}</h3>
                          <p className="text-sm text-gray-600">
                            No. {cert.certificateNumber}
                          </p>
                          {cert.gpa && (
                            <p className="text-sm text-emerald-600 font-medium">
                              IPK: {cert.gpa}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(cert.verificationStatus)} flex items-center gap-1`}
                      >
                        {getStatusIcon(cert.verificationStatus)}
                        {cert.verificationStatus === "verified" ? "Terverifikasi" : "Pending"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        Diterbitkan: {new Date(cert.issueDate).toLocaleDateString('id-ID')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Lihat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Unduh
                        </Button>
                        <Button variant="outline" size="sm">
                          <Printer className="w-4 h-4 mr-1" />
                          Print
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                Ringkasan Dokumen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Dokumen</span>
                  <span className="font-bold text-2xl text-emerald-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Terverifikasi</span>
                  <span className="font-bold text-lg text-green-600">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status Kelulusan</span>
                  <Badge className="bg-green-500 text-white">Lulus</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Summary */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Ringkasan Akademik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">NIM</span>
                  <span className="font-medium">2021210001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Program Studi</span>
                  <span className="font-medium">Teknik Informatika</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IPK Akhir</span>
                  <span className="font-medium text-emerald-600">3.67</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal Lulus</span>
                  <span className="font-medium">15 Juli 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Predikat</span>
                  <Badge className="bg-yellow-500 text-white">Cum Laude</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Guide */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                Panduan Verifikasi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Dokumen asli selalu tersedia untuk diverifikasi</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Gunakan nomor dokumen resmi untuk pengecekan</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Lapor jika menemukan dokumen palsu</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Hubungi admin untuk bantuan verifikasi</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800">
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Unduh Ijazah Digital
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Unduh Transkrip
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Bagikan Profil Akademik
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Printer className="w-4 h-4 mr-2" />
                  Cetak Sertifikat
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Public Verification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-500" />
              Verifikasi Publik
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Pihak ketiga dapat memverifikasi keaslian dokumen akademik Anda melalui portal ini
            </p>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Cari Dokumen</h3>
                <p className="text-sm text-gray-600">
                  Masukkan nomor dokumen untuk verifikasi keaslian
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Verifikasi Otomatis</h3>
                <p className="text-sm text-gray-600">
                  Sistem akan memverifikasi dokumen secara real-time
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Unduh Laporan</h3>
                <p className="text-sm text-gray-600">
                  Dapatkan laporan verifikasi resmi untuk kebutuhan Anda
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}