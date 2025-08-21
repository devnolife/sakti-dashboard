"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  X,
  Award,
  BookOpen,
  Star
} from "lucide-react"

interface KKPPlusStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "pending" | "cancelled"
  assignedTo: "mahasiswa" | "wd4" | "prodi"
  dueDate?: string
  completedDate?: string
}

interface KKPPlusRegistration {
  id: string
  studentName: string
  nim: string
  prodi: string
  gpa: number
  semester: number
  status: "registered" | "assigned" | "ongoing" | "completed"
  registrationDate: string
  assignedGroup?: string
  assignedLocation?: string
}

const kkpPlusSteps: KKPPlusStep[] = [
  {
    id: "1",
    title: "Pendaftaran KKP Plus",
    description: "Mahasiswa mendaftar program KKP Plus",
    status: "completed",
    assignedTo: "mahasiswa",
    completedDate: "2024-01-15"
  },
  {
    id: "2",
    title: "Review oleh WD 4",
    description: "WD 4 mereview pendaftaran dan persyaratan",
    status: "completed",
    assignedTo: "wd4",
    completedDate: "2024-01-17"
  },
  {
    id: "3",
    title: "Pembagian Kelompok",
    description: "WD 4 membagi mahasiswa ke dalam kelompok",
    status: "current",
    assignedTo: "wd4"
  },
  {
    id: "4",
    title: "Penentuan Lokasi",
    description: "WD 4 menentukan lokasi KKP untuk setiap kelompok",
    status: "pending",
    assignedTo: "wd4"
  },
  {
    id: "5",
    title: "Pemberitahuan & Briefing",
    description: "Briefing kepada mahasiswa terkait penempatan",
    status: "pending",
    assignedTo: "wd4"
  },
  {
    id: "6",
    title: "Pelaksanaan KKP Plus",
    description: "Mahasiswa melaksanakan KKP Plus di lokasi",
    status: "pending",
    assignedTo: "mahasiswa"
  },
  {
    id: "7",
    title: "Penilaian oleh Prodi",
    description: "Admin Prodi input nilai (terintegrasi SIMAK)",
    status: "pending",
    assignedTo: "prodi"
  },
  {
    id: "8",
    title: "Upload Lembar Penilaian",
    description: "Upload lembar penilaian ke sistem",
    status: "pending",
    assignedTo: "prodi"
  }
]

const mockRegistration: KKPPlusRegistration = {
  id: "kkpplus-001",
  studentName: "Ahmad Rahman",
  nim: "2021210001",
  prodi: "Teknik Informatika",
  gpa: 3.45,
  semester: 5,
  status: "assigned",
  registrationDate: "2024-01-15",
  assignedGroup: "Kelompok A - IT Solutions",
  assignedLocation: "PT. Digital Indonesia, Jakarta"
}

const getStepStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-800 border-green-300"
    case "current": return "bg-blue-100 text-blue-800 border-blue-300"
    case "pending": return "bg-gray-100 text-gray-600 border-gray-300"
    case "cancelled": return "bg-red-100 text-red-800 border-red-300"
    default: return "bg-gray-100 text-gray-600 border-gray-300"
  }
}

const getAssignedToColor = (assignedTo: string) => {
  switch (assignedTo) {
    case "mahasiswa": return "bg-blue-50 text-blue-700"
    case "wd4": return "bg-purple-50 text-purple-700"
    case "prodi": return "bg-green-50 text-green-700"
    default: return "bg-gray-50 text-gray-700"
  }
}

export default function KKPPlusWorkflow() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-6 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          KKP Plus Management
        </h1>
        <p className="text-gray-600 text-lg">
          Program KKP Plus - Dikelola oleh WD 4 dengan pembagian kelompok otomatis
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
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    Progress KKP Plus
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Alur: Daftar → Review WD4 → Kelompok → Lokasi → Briefing → Pelaksanaan → Nilai
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress Keseluruhan</span>
                  <span className="font-medium">2/8 tahap selesai</span>
                </div>
                <Progress value={25} className="h-3" />
              </div>

              {/* Workflow Steps */}
              <div className="space-y-4">
                {kkpPlusSteps.map((step, index) => (
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
                        <div className="flex flex-col items-center">
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : step.status === 'current' ? (
                            <Clock className="w-5 h-5 text-blue-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-gray-400" />
                          )}
                          {index < kkpPlusSteps.length - 1 && (
                            <div className={`w-0.5 h-6 mt-2 ${
                              step.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-800">{step.title}</h3>
                            <Badge className={`text-xs ${getAssignedToColor(step.assignedTo)}`}>
                              {step.assignedTo === 'mahasiswa' ? 'Mahasiswa' : 
                               step.assignedTo === 'wd4' ? 'WD 4' : 'Prodi'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
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
                      <Badge variant="outline" className={getStepStatusColor(step.status)}>
                        {step.status === 'completed' ? 'Selesai' : 
                         step.status === 'current' ? 'Sedang Berjalan' : 
                         'Menunggu'}
                      </Badge>
                    </div>
                    
                    {/* Special content for current step */}
                    {step.status === 'current' && step.id === '3' && (
                      <div className="mt-4 p-4 bg-white rounded-lg border">
                        <h4 className="font-medium text-gray-800 mb-3">Pembagian Kelompok (WD 4)</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-purple-800">Status Pembagian</span>
                              <Badge className="bg-purple-100 text-purple-800">
                                Dalam Proses
                              </Badge>
                            </div>
                            <p className="text-sm text-purple-700">
                              WD 4 sedang mengelompokkan 45 mahasiswa menjadi 9 kelompok berdasarkan program studi dan IPK
                            </p>
                          </div>
                          <div className="text-sm text-gray-600">
                            💡 Anda akan mendapat notifikasi setelah kelompok terbentuk
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Integration Info */}
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-indigo-800">Integrasi SIMAK</h4>
                    <p className="text-sm text-indigo-700 mt-1">
                      Penilaian akan langsung terintegrasi dengan SIMAK. Admin Prodi dapat input nilai 
                      dan upload lembar penilaian melalui sistem.
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
          {/* Registration Info */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-500" />
                Data Pendaftaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">NIM</span>
                    <span className="font-medium">{mockRegistration.nim}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nama</span>
                    <span className="font-medium">{mockRegistration.studentName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Program Studi</span>
                    <span className="font-medium">{mockRegistration.prodi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">IPK</span>
                    <span className="font-medium text-green-600">{mockRegistration.gpa}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Semester</span>
                    <span className="font-medium">{mockRegistration.semester}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      {mockRegistration.status === 'assigned' ? 'Sudah Ditempatkan' : 'Terdaftar'}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    Daftar: {new Date(mockRegistration.registrationDate).toLocaleDateString('id-ID')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assignment Info */}
          {mockRegistration.assignedGroup && (
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  Penempatan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <div className="font-medium text-indigo-800 mb-1">
                      {mockRegistration.assignedGroup}
                    </div>
                    <div className="text-sm text-indigo-700">
                      {mockRegistration.assignedLocation}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    ✅ Penempatan sudah dikonfirmasi oleh WD 4
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Requirements KKP Plus */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Persyaratan KKP Plus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { requirement: "IPK ≥ 3.00", status: "completed" },
                  { requirement: "Semester ≥ 5", status: "completed" },
                  { requirement: "Tidak sedang KKP reguler", status: "completed" },
                  { requirement: "Daftar online", status: "completed" },
                  { requirement: "Approval WD 4", status: "completed" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-700">
                      {item.requirement}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Download className="w-5 h-5 text-blue-500" />
                Dokumen & Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Panduan KKP Plus
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Format Laporan
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Lembar Penilaian
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}