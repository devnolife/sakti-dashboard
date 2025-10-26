"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Download,
  Upload,
  Send,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  QrCode,
  Shield,
  FileSignature,
  Users,
  Settings,
  History,
  Copy,
  Sparkles,
  Printer,
  Save,
  GraduationCap,
  UserCheck,
  Building,
  Award,
  Mail,
  Search
} from "lucide-react"

interface AcademicTemplate {
  id: string
  name: string
  type: string
  category: "academic" | "administrative" | "certificate"
  description: string
  requiredFields: string[]
  templatePath: string
  approvalLevel: "staff" | "prodi" | "dekan"
  estimatedTime: string
}

interface StudentDocument {
  id: string
  documentName: string
  studentName: string
  nim: string
  prodi: string
  semester: string
  status: "draft" | "pending_approval" | "approved" | "signed" | "completed" | "rejected"
  progress: number
  createdAt: string
  lastUpdated: string
  approver?: string
  downloadUrl?: string
}

export default function StaffTuDocumentGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [searchStudent, setSearchStudent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const academicTemplates: AcademicTemplate[] = [
    {
      id: "transcript-official",
      name: "Transkrip Nilai Resmi",
      type: "transcript",
      category: "academic",
      description: "Dokumen transkrip nilai resmi untuk keperluan akademik dan administratif",
      requiredFields: ["nama_mahasiswa", "nim", "prodi", "semester", "ipk", "keperluan"],
      templatePath: "templates/academic/transcript-official.docx",
      approvalLevel: "prodi",
      estimatedTime: "2-3 hari kerja"
    },
    {
      id: "certificate-graduation",
      name: "Surat Keterangan Lulus",
      type: "certificate",
      category: "certificate",
      description: "Surat keterangan kelulusan untuk mahasiswa yang telah menyelesaikan studi",
      requiredFields: ["nama_mahasiswa", "nim", "prodi", "tanggal_lulus", "ipk_akhir", "gelar"],
      templatePath: "templates/certificate/graduation.docx",
      approvalLevel: "dekan",
      estimatedTime: "3-5 hari kerja"
    },
    {
      id: "letter-active-student",
      name: "Surat Keterangan Mahasiswa Aktif",
      type: "letter",
      category: "administrative",
      description: "Surat keterangan status mahasiswa aktif untuk berbagai keperluan",
      requiredFields: ["nama_mahasiswa", "nim", "prodi", "semester", "keperluan"],
      templatePath: "templates/administrative/active-student.docx",
      approvalLevel: "staff",
      estimatedTime: "1-2 hari kerja"
    },
    {
      id: "internship-certificate",
      name: "Sertifikat KKP",
      type: "kkp",
      category: "certificate",
      description: "Sertifikat penyelesaian Kuliah Kerja Praktek",
      requiredFields: ["nama_mahasiswa", "nim", "prodi", "tempat_kkp", "periode_kkp", "nilai_kkp"],
      templatePath: "templates/certificate/kkp.docx",
      approvalLevel: "prodi",
      estimatedTime: "3-4 hari kerja"
    },
    {
      id: "recommendation-letter",
      name: "Surat Rekomendasi",
      type: "recommendation",
      category: "administrative",
      description: "Surat rekomendasi untuk keperluan beasiswa, magang, atau lanjut studi",
      requiredFields: ["nama_mahasiswa", "nim", "prodi", "ipk", "keperluan", "tujuan"],
      templatePath: "templates/administrative/recommendation.docx",
      approvalLevel: "prodi",
      estimatedTime: "2-3 hari kerja"
    },
    {
      id: "exam-permit",
      name: "Surat Izin Ujian",
      type: "exam",
      category: "academic",
      description: "Surat izin mengikuti ujian (skripsi/komprehensif)",
      requiredFields: ["nama_mahasiswa", "nim", "prodi", "jenis_ujian", "jadwal_ujian"],
      templatePath: "templates/academic/exam-permit.docx",
      approvalLevel: "prodi",
      estimatedTime: "1-2 hari kerja"
    }
  ]

  const mockStudentDocuments: StudentDocument[] = [
    {
      id: "DOC_STU_001",
      documentName: "Transkrip Nilai Resmi",
      studentName: "Ahmad Fauzi Rahman",
      nim: "2021123456",
      prodi: "Informatika",
      semester: "8",
      status: "completed",
      progress: 100,
      createdAt: "2024-01-15 09:00",
      lastUpdated: "2024-01-17 14:30",
      approver: "Dr. Jane Smith",
      downloadUrl: "/downloads/transcript_2021123456.pdf"
    },
    {
      id: "DOC_STU_002",
      documentName: "Surat Keterangan Mahasiswa Aktif",
      studentName: "Siti Nurhaliza",
      nim: "2021123457",
      prodi: "Informatika",
      semester: "6",
      status: "signed",
      progress: 85,
      createdAt: "2024-01-16 10:15",
      lastUpdated: "2024-01-16 16:45",
      approver: "Staff TU"
    },
    {
      id: "DOC_STU_003",
      documentName: "Sertifikat KKP",
      studentName: "Budi Santoso",
      nim: "2021123458",
      prodi: "Informatika",
      semester: "7",
      status: "pending_approval",
      progress: 45,
      createdAt: "2024-01-16 11:30",
      lastUpdated: "2024-01-16 11:30"
    }
  ]

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = academicTemplates.find(t => t.id === templateId)
    if (template) {
      const newFormData: Record<string, string> = {}
      template.requiredFields.forEach(field => {
        newFormData[field] = ""
      })
      setFormData(newFormData)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateDocument = async () => {
    setGenerating(true)
    setProgress(0)

    const steps = [
      { message: "Memvalidasi data mahasiswa...", duration: 1000 },
      { message: "Menyiapkan template dokumen...", duration: 1500 },
      { message: "Mengisi data ke template...", duration: 2000 },
      { message: "Menambahkan metadata akademik...", duration: 1000 },
      { message: "Menyiapkan untuk persetujuan...", duration: 1500 },
      { message: "Dokumen siap untuk review!", duration: 500 }
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.duration))
      currentProgress += 100 / steps.length
      setProgress(currentProgress)
    }

    setGenerating(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "signed": return <FileSignature className="w-4 h-4 text-blue-500" />
      case "approved": return <UserCheck className="w-4 h-4 text-indigo-500" />
      case "pending_approval": return <Clock className="w-4 h-4 text-yellow-500" />
      case "draft": return <FileText className="w-4 h-4 text-gray-500" />
      case "rejected": return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-600"
      case "signed": return "bg-blue-500/10 text-blue-600"
      case "approved": return "bg-indigo-500/10 text-indigo-600"
      case "pending_approval": return "bg-yellow-500/10 text-yellow-600"
      case "draft": return "bg-gray-500/10 text-gray-600"
      case "rejected": return "bg-red-500/10 text-red-600"
      default: return "bg-gray-500/10 text-gray-600"
    }
  }

  const getApprovalIcon = (level: string) => {
    switch (level) {
      case "staff": return <Users className="w-4 h-4" />
      case "prodi": return <GraduationCap className="w-4 h-4" />
      case "dekan": return <Building className="w-4 h-4" />
      default: return <UserCheck className="w-4 h-4" />
    }
  }

  const renderFormFields = () => {
    const template = academicTemplates.find(t => t.id === selectedTemplate)
    if (!template) return null

    return (
      <div className="space-y-4">
        {template.requiredFields.map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field} className="capitalize">
              {field.replace(/_/g, " ")} *
            </Label>
            {field.includes("keperluan") || field.includes("tujuan") ? (
              <Textarea
                id={field}
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Masukkan ${field.replace(/_/g, " ")}`}
                className="min-h-[80px]"
              />
            ) : field === "prodi" ? (
              <Select value={formData[field] || ""} onValueChange={(value) => handleInputChange(field, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Program Studi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informatika">Informatika</SelectItem>
                  <SelectItem value="sipil">Teknik Sipil</SelectItem>
                  <SelectItem value="elektro">Teknik Elektro</SelectItem>
                  <SelectItem value="mesin">Teknik Mesin</SelectItem>
                </SelectContent>
              </Select>
            ) : field === "semester" ? (
              <Select value={formData[field] || ""} onValueChange={(value) => handleInputChange(field, value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Semester" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 14 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Semester {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field}
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Masukkan ${field.replace(/_/g, " ")}`}
              />
            )}
          </div>
        ))}
      </div>
    )
  }

  const filteredTemplates = selectedCategory === "all"
    ? academicTemplates
    : academicTemplates.filter(template => template.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Academic Document Generation
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Generate official academic documents for students - Staff Tata Usaha
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="w-4 h-4 mr-2" />
            Student Lookup
          </Button>
          <Button variant="outline">
            <History className="w-4 h-4 mr-2" />
            Document History
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Pending Documents</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Awaiting Approval</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Completed Today</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Templates Available</p>
              <p className="text-2xl font-bold">{academicTemplates.length}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Academic Templates
            </CardTitle>
            <CardDescription>Choose a document template for student services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="administrative">Administrative</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                </SelectContent>
              </Select>

              <ScrollArea className="h-[450px]">
                <div className="space-y-2">
                  {filteredTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${selectedTemplate === template.id ? "bg-muted border-primary" : ""
                        }`}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getApprovalIcon(template.approvalLevel)}
                          <span className="text-xs capitalize">{template.approvalLevel}</span>
                        </div>
                      </div>
                      <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {template.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{template.estimatedTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Document Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Academic Document
            </CardTitle>
            <CardDescription>Fill in student information to generate the document</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="form" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="form">Student Form</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="approval">Approval</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-4">
                {selectedTemplate ? (
                  <div className="space-y-6">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Document will be processed through the official academic approval workflow with digital signatures.
                      </AlertDescription>
                    </Alert>

                    {/* Student Search */}
                    <div className="space-y-2">
                      <Label>Student Search</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Search by NIM or Name..."
                          value={searchStudent}
                          onChange={(e) => setSearchStudent(e.target.value)}
                        />
                        <Button variant="outline">
                          <Search className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {renderFormFields()}

                    {generating && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Processing document...</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="w-full" />
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={handleGenerateDocument}
                        disabled={generating || !Object.values(formData).every(v => v.trim())}
                        className="flex-1"
                      >
                        {generating ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Generate Document
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <GraduationCap className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Select Academic Template</h3>
                    <p className="text-muted-foreground">Choose a document template from the sidebar to start</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="border rounded-lg p-6 bg-muted/20">
                  <div className="text-center space-y-4">
                    <Eye className="w-12 h-12 mx-auto text-muted-foreground" />
                    <h3 className="text-lg font-medium">Document Preview</h3>
                    <p className="text-muted-foreground">
                      Preview will show the formatted document with student data
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="approval" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Approval Workflow</h3>
                  {selectedTemplate && (
                    <div className="space-y-3">
                      {(() => {
                        const template = academicTemplates.find(t => t.id === selectedTemplate)
                        const steps = template?.approvalLevel === "dekan"
                          ? ["Staff TU", "Prodi", "Dekan"]
                          : template?.approvalLevel === "prodi"
                            ? ["Staff TU", "Prodi"]
                            : ["Staff TU"]

                        return steps.map((step, index) => (
                          <div key={step} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium">{step}</p>
                              <p className="text-sm text-muted-foreground">Review and approval</p>
                            </div>
                          </div>
                        ))
                      })()}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Document Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF (Official)</SelectItem>
                        <SelectItem value="docx">Microsoft Word</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Priority Level</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent (1 day)</SelectItem>
                        <SelectItem value="normal">Normal (2-3 days)</SelectItem>
                        <SelectItem value="standard">Standard (5-7 days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="notify" defaultChecked />
                      <Label htmlFor="notify">Send notification to student</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="archive" defaultChecked />
                      <Label htmlFor="archive">Archive in student records</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="qr-verify" defaultChecked />
                      <Label htmlFor="qr-verify">Include QR verification code</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Recent Student Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Recent Student Documents
          </CardTitle>
          <CardDescription>Recently processed academic documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockStudentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h4 className="font-medium text-sm">{doc.documentName}</h4>
                    <p className="text-xs text-muted-foreground">
                      {doc.studentName} • {doc.nim} • {doc.prodi}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Updated: {doc.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status.replace(/_/g, " ")}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    {doc.downloadUrl && (
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
