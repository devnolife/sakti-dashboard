"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { getHardcodedUserId } from "@/lib/auth-utils"
import { submitLetterRequest } from "@/app/actions/correspondence-actions"
import { toast } from "@/hooks/use-toast"
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
  MapPin,
  Search,
  Shield
} from "lucide-react"

export default function SurveyLetterPage() {
  const [studentData, setStudentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    researchTitle: "",
    researchType: "",
    supervisor: "",
    targetLocation: "",
    targetInstitution: "",
    surveyDuration: "",
    surveyPurpose: "",
    ethicalClearance: false
  })

  useEffect(() => {
    async function fetchStudentData() {
      try {
        const userId = getHardcodedUserId()
        const response = await fetch('/api/student/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        })
        
        if (response.ok) {
          const student = await response.json()
          setStudentData(student)
        }
      } catch (error) {
        console.error("Error fetching student data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudentData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const result = await submitLetterRequest(
        'survey',
        'Surat Pengantar Survey',
        'Permohonan surat pengantar untuk kegiatan survey penelitian',
        `Permohonan surat pengantar survey untuk penelitian "${formData.researchTitle}" di ${formData.targetInstitution}`,
        {
          ...formData,
          studentMajor: studentData?.major,
          semester: studentData?.semester || '5'
        }
      )

      if (result.success) {
        toast({
          title: "Berhasil!",
          description: result.message,
        })
        // Reset form
        setFormData({
          researchTitle: "",
          researchType: "",
          supervisor: "",
          targetLocation: "",
          targetInstitution: "",
          surveyDuration: "",
          surveyPurpose: "",
          ethicalClearance: false
        })
      } else {
        toast({
          title: "Gagal",
          description: result.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Error submitting survey request:', error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengajukan permohonan",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Surat Pengantar Survey
        </h1>
        <p className="text-gray-600 text-lg">
          Pengajuan Surat Pengantar untuk Kegiatan Survey dan Penelitian
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Form Pengajuan Surat Pengantar Survey
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Untuk pengambilan data penelitian dan survey
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Data Peneliti */}
                <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-500" />
                  Data Peneliti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nim">NIM</Label>
                    <Input 
                      id="nim" 
                      value={studentData?.nim || "-"} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input 
                      id="name" 
                      value={studentData?.user?.name || "-"} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prodi">Program Studi</Label>
                    <Input 
                      id="prodi" 
                      value={studentData?.major || "-"} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input 
                      id="semester" 
                      value={studentData?.semester || "5"} 
                      disabled 
                      className="bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Data Penelitian */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  Data Penelitian
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="research-title">Judul Penelitian</Label>
                    <Input 
                      id="research-title" 
                      placeholder="Masukkan judul penelitian/skripsi"
                      value={formData.researchTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, researchTitle: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="research-type">Jenis Penelitian</Label>
                    <Select value={formData.researchType} onValueChange={(value) => setFormData(prev => ({ ...prev, researchType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis penelitian" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skripsi">Skripsi</SelectItem>
                        <SelectItem value="tugas-akhir">Tugas Akhir</SelectItem>
                        <SelectItem value="penelitian-mandiri">Penelitian Mandiri</SelectItem>
                        <SelectItem value="kkp">KKP</SelectItem>
                        <SelectItem value="lainnya">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Dosen Pembimbing</Label>
                    <Input 
                      id="supervisor" 
                      placeholder="Nama dosen pembimbing"
                      value={formData.supervisor}
                      onChange={(e) => setFormData(prev => ({ ...prev, supervisor: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              {/* Lokasi Survey */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Lokasi Survey
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-institution">Instansi/Perusahaan Tujuan</Label>
                    <Input 
                      id="target-institution" 
                      placeholder="Nama instansi/perusahaan yang akan disurvey"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-address">Alamat Lengkap</Label>
                    <Textarea 
                      id="target-address"
                      placeholder="Alamat lengkap lokasi survey..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="survey-date-start">Tanggal Mulai Survey</Label>
                      <Input 
                        id="survey-date-start" 
                        type="date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="survey-date-end">Tanggal Selesai Survey</Label>
                      <Input 
                        id="survey-date-end" 
                        type="date"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metodologi Survey */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  Metodologi & Data yang Dibutuhkan
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="survey-method">Metode Survey</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih metode survey" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wawancara">Wawancara</SelectItem>
                        <SelectItem value="kuesioner">Kuesioner</SelectItem>
                        <SelectItem value="observasi">Observasi</SelectItem>
                        <SelectItem value="dokumentasi">Dokumentasi</SelectItem>
                        <SelectItem value="kombinasi">Kombinasi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-needed">Data yang Dibutuhkan</Label>
                    <Textarea 
                      id="data-needed"
                      placeholder="Jelaskan jenis data yang akan dikumpulkan..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Jenis Data Pribadi yang Dikumpulkan</Label>
                    <div className="space-y-2">
                      {[
                        "Data demografis (nama, usia, jenis kelamin)",
                        "Data pekerjaan dan jabatan",
                        "Data kontak (email, telepon)",
                        "Data pendidikan",
                        "Data pendapat/opini",
                        "Lainnya"
                      ].map((dataType, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`data-${index}`} />
                          <Label htmlFor={`data-${index}`} className="text-sm">
                            {dataType}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Proposal */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-500" />
                  Upload Proposal Penelitian
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Upload proposal penelitian atau outline survey
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Format: PDF, maksimal 10MB
                  </p>
                </div>
              </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Search className="w-4 h-4 mr-2" />
                  {submitting ? "Mengajukan..." : "Ajukan Surat Pengantar Survey"}
                </Button>
              </form>
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
                Riwayat Pengajuan Survey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p className="font-medium text-gray-800">Survey PT. Tech Innovate</p>
                    <p className="text-sm text-gray-600">Diajukan: 10 Januari 2024</p>
                  </div>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Disetujui
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div>
                    <p className="font-medium text-gray-800">Survey Dinas Pendidikan</p>
                    <p className="text-sm text-gray-600">Diajukan: 5 Januari 2024</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Dalam Review
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Persyaratan */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Persyaratan Surat Pengantar Survey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Proposal penelitian yang sudah disetujui pembimbing",
                  "Outline atau instrumen survey",
                  "Surat pernyataan menjaga kerahasiaan data",
                  "Formulir pengajuan survey",
                  "Jadwal rencana pelaksanaan survey"
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Informasi Etika Penelitian */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Etika Pengumpulan Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• <strong>Informed Consent:</strong> Pastikan responden memahami tujuan survey</p>
                <p>• <strong>Anonymity:</strong> Jaga kerahasiaan identitas responden</p>
                <p>• <strong>Data Protection:</strong> Lindungi data pribadi sesuai regulasi</p>
                <p>• <strong>Voluntary:</strong> Partisipasi harus bersifat sukarela</p>
                <p>• <strong>No Harm:</strong> Pastikan survey tidak merugikan responden</p>
              </div>
            </CardContent>
          </Card>

          {/* Template Survey */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-500" />
                Template & Panduan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Template Proposal Survey
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Panduan Etika Penelitian
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Form Consent Responden
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}