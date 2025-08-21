"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import {
  Users,
  MapPin,
  FileText,
  Upload,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  User,
  Building,
  Mail,
  Phone,
  ArrowRight,
  Download,
  Eye,
  Edit,
  X
} from "lucide-react"

interface KKPWorkflowStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "pending" | "cancelled"
  dueDate?: string
  completedDate?: string
}

interface KKPTeam {
  id: string
  name: string
  members: {
    nim: string
    name: string
    role: "leader" | "member"
  }[]
  status: "draft" | "submitted" | "approved"
}

interface KKPLocation {
  id: string
  company: string
  address: string
  contactPerson: string
  email: string
  phone: string
  capacity: number
  taken: number
  description: string
  requirements: string[]
}

const workflowSteps: KKPWorkflowStep[] = [
  {
    id: "1",
    title: "Membuat Tim",
    description: "Bentuk tim KKP dengan maksimal 4 anggota",
    status: "completed",
    completedDate: "2024-01-10"
  },
  {
    id: "2", 
    title: "Input Lokasi Manual",
    description: "Input lokasi KKP secara manual (perusahaan/instansi)",
    status: "current"
  },
  {
    id: "3",
    title: "Pengajuan KKP",
    description: "Submit pengajuan dengan dokumen lengkap",
    status: "pending"
  },
  {
    id: "4",
    title: "Surat Otomatis",
    description: "Sistem generate surat permohonan otomatis",
    status: "pending"
  },
  {
    id: "5",
    title: "Upload Balasan",
    description: "Upload surat balasan dari perusahaan",
    status: "pending"
  },
  {
    id: "6",
    title: "Tercatat di Prodi",
    description: "Data KKP tercatat di sistem Prodi",
    status: "pending"
  },
  {
    id: "7",
    title: "SK Pembimbing",
    description: "Prodi menerbitkan SK pembimbing",
    status: "pending"
  },
  {
    id: "8",
    title: "SK Penarikan",
    description: "SK penarikan mahasiswa dari lokasi KKP",
    status: "pending"
  }
]

const mockTeam: KKPTeam = {
  id: "team-001",
  name: "Tim Innovators",
  members: [
    { nim: "2021210001", name: "Ahmad Rahman", role: "leader" },
    { nim: "2021210002", name: "Siti Fatimah", role: "member" },
    { nim: "2021210003", name: "Budi Santoso", role: "member" }
  ],
  status: "approved"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800 border-green-300"
    case "current": return "bg-blue-100 text-blue-800 border-blue-300"
    case "pending": return "bg-gray-100 text-gray-600 border-gray-300"
    case "cancelled": return "bg-red-100 text-red-800 border-red-300"
    default: return "bg-gray-100 text-gray-600 border-gray-300"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed": return <CheckCircle className="w-5 h-5 text-green-500" />
    case "current": return <Clock className="w-5 h-5 text-blue-500" />
    case "pending": return <Clock className="w-5 h-5 text-gray-400" />
    case "cancelled": return <X className="w-5 h-5 text-red-500" />
    default: return <Clock className="w-5 h-5 text-gray-400" />
  }
}

export default function EnhancedKKPWorkflow() {
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
          KKP Workflow Management
        </h1>
        <p className="text-gray-600 text-lg">
          Kelola proses KKP dari pembentukan tim hingga penarikan
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Workflow Progress */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Progress KKP
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Alur: Tim → Lokasi → Pengajuan → Surat → Balasan → Prodi → SK
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress Keseluruhan</span>
                  <span className="font-medium">1/8 tahap selesai</span>
                </div>
                <Progress value={12.5} className="h-3" />
              </div>

              {/* Workflow Steps */}
              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      step.status === 'current' 
                        ? 'border-blue-300 bg-blue-50' 
                        : step.status === 'completed'
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(step.status)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{step.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          {step.completedDate && (
                            <p className="text-xs text-green-600 mt-1">
                              Selesai: {new Date(step.completedDate).toLocaleDateString('id-ID')}
                            </p>
                          )}
                          {step.dueDate && step.status !== 'completed' && (
                            <p className="text-xs text-orange-600 mt-1">
                              Deadline: {new Date(step.dueDate).toLocaleDateString('id-ID')}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(step.status)}>
                        {step.status === 'completed' ? 'Selesai' : 
                         step.status === 'current' ? 'Sedang Berjalan' : 
                         step.status === 'cancelled' ? 'Dibatalkan' : 'Menunggu'}
                      </Badge>
                    </div>
                    
                    {step.status === 'current' && step.id === '2' && (
                      <div className="mt-4 p-4 bg-white rounded-lg border">
                        <h4 className="font-medium text-gray-800 mb-3">Input Lokasi KKP</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="company">Nama Perusahaan/Instansi</Label>
                              <Input 
                                id="company" 
                                placeholder="PT. Tech Innovate Indonesia"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="city">Kota</Label>
                              <Input 
                                id="city" 
                                placeholder="Jakarta"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="address">Alamat Lengkap</Label>
                            <Textarea 
                              id="address"
                              placeholder="Jl. Sudirman No. 123, Jakarta Pusat"
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="contact-person">Contact Person</Label>
                              <Input 
                                id="contact-person" 
                                placeholder="Nama PIC di perusahaan"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="contact-email">Email</Label>
                              <Input 
                                id="contact-email" 
                                type="email"
                                placeholder="contact@company.com"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">Nomor Telepon</Label>
                            <Input 
                              id="phone" 
                              placeholder="021-12345678"
                            />
                          </div>
                          
                          <div className="flex gap-3">
                            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Simpan Lokasi
                            </Button>
                            <Button variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Auto Cancel Warning */}
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800">Auto Cancel dalam 14 hari</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Pengajuan akan dibatalkan otomatis jika tidak ada progress dalam 14 hari. 
                      Sisa waktu: <strong>12 hari</strong>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Team Info */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Tim KKP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{mockTeam.name}</span>
                  <Badge className="bg-green-500 text-white">
                    {mockTeam.status === 'approved' ? 'Disetujui' : 'Draft'}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  {mockTeam.members.map((member, index) => (
                    <div key={member.nim} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm text-gray-800">{member.name}</p>
                        <p className="text-xs text-gray-600">{member.nim}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {member.role === 'leader' ? 'Ketua' : 'Anggota'}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Tim
                </Button>
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
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Template Surat
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Panduan KKP
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Dokumen
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Jadwal Konsultasi
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Requirements Checklist - Auto-integrated with SIMAK & Lab */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Persyaratan KKP (Auto Check)
              </CardTitle>
              <p className="text-xs text-gray-600 mt-1">
                Terhubung dengan SIMAK & Lab System
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { requirement: "Tim sudah dibentuk", status: "completed", source: "Internal" },
                  { requirement: "Lokasi sudah dipilih", status: "current", source: "Internal" },
                  { requirement: "IPK ≥ 2.75 (120 SKS)", status: "completed", source: "SIMAK" },
                  { requirement: "Praktikum selesai", status: "completed", source: "Lab System" },
                  { requirement: "Bebas tunggakan keuangan", status: "completed", source: "SIMAK" },
                  { requirement: "Proposal KKP", status: "pending", source: "Upload" },
                  { requirement: "Surat pengantar dari kampus", status: "pending", source: "Auto Generate" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : item.status === 'current' ? (
                        <Clock className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-gray-400" />
                      )}
                      <div>
                        <span className={`text-sm ${
                          item.status === 'completed' ? 'text-green-700' :
                          item.status === 'current' ? 'text-blue-700' :
                          'text-gray-600'
                        }`}>
                          {item.requirement}
                        </span>
                        <p className="text-xs text-gray-500">{item.source}</p>
                      </div>
                    </div>
                    {item.status === 'completed' && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        ✓ Valid
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-800">
                    Auto-refresh setiap 5 menit
                  </span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Sistem akan memperbarui status persyaratan secara otomatis
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Daily Report */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                Laporan Harian KKP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800">Status Laporan</span>
                    <Badge className="bg-orange-100 text-orange-800">
                      Menunggu KKP Dimulai
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    Laporan harian akan aktif setelah SK pembimbing terbit
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800 text-sm">Persyaratan Laporan:</h4>
                  <div className="space-y-1">
                    {[
                      "Upload laporan harian dalam format PDF",
                      "Tanda tangan pembimbing industri wajib",
                      "Maksimal upload H+1 setelah tanggal laporan",
                      "Minimal 80% laporan harus terkumpul"
                    ].map((req, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" disabled size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Laporan Harian
                  </Button>
                  <Button variant="outline" className="w-full" disabled size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Template Laporan
                  </Button>
                </div>
                
                <div className="text-xs text-gray-600 text-center">
                  📝 Laporan akan otomatis tersedia setelah KKP dimulai
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}