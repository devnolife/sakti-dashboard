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
  Save
} from "lucide-react"

interface DocumentTemplate {
  id: string
  name: string
  type: string
  prodi: string
  description: string
  requiredFields: string[]
  templatePath: string
  signers: number
}

interface GeneratedDocument {
  id: string
  name: string
  type: string
  prodi: string
  studentName: string
  nim: string
  status: "generating" | "signing" | "completed" | "error"
  progress: number
  createdAt: string
  signatures: number
  totalSignatures: number
}

export default function DocumentGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [recentDocuments, setRecentDocuments] = useState<GeneratedDocument[]>([])

  const templates: DocumentTemplate[] = [
    {
      id: "kkp-informatika",
      name: "Sertifikat KKP",
      type: "kkp",
      prodi: "informatika",
      description: "Sertifikat penyelesaian Kuliah Kerja Praktek untuk mahasiswa Informatika",
      requiredFields: ["nama_mahasiswa", "nim", "judul", "tempat_kkp", "periode"],
      templatePath: "templates/informatika/kkp.docx",
      signers: 3
    },
    {
      id: "transcript-informatika",
      name: "Transkrip Nilai",
      type: "transcript",
      prodi: "informatika",
      description: "Transkrip akademik resmi mahasiswa Informatika",
      requiredFields: ["nama_mahasiswa", "nim", "semester", "ipk"],
      templatePath: "templates/informatika/transcript.docx",
      signers: 2
    },
    {
      id: "certificate-informatika",
      name: "Surat Keterangan",
      type: "certificate",
      prodi: "informatika",
      description: "Surat keterangan mahasiswa aktif",
      requiredFields: ["nama_mahasiswa", "nim", "keperluan"],
      templatePath: "templates/informatika/certificate.docx",
      signers: 1
    },
    {
      id: "thesis-informatika",
      name: "Sertifikat Skripsi",
      type: "thesis",
      prodi: "informatika",
      description: "Sertifikat kelulusan skripsi",
      requiredFields: ["nama_mahasiswa", "nim", "judul_skripsi", "pembimbing"],
      templatePath: "templates/informatika/thesis.docx",
      signers: 4
    }
  ]

  const mockRecentDocuments: GeneratedDocument[] = [
    {
      id: "DOC_2024_001",
      name: "Sertifikat KKP - Ahmad Rizky",
      type: "kkp",
      prodi: "informatika",
      studentName: "Ahmad Rizky",
      nim: "2021123456",
      status: "completed",
      progress: 100,
      createdAt: "2024-01-15 10:30",
      signatures: 3,
      totalSignatures: 3
    },
    {
      id: "DOC_2024_002",
      name: "Transkrip Nilai - Siti Nurhaliza",
      type: "transcript",
      prodi: "informatika",
      studentName: "Siti Nurhaliza",
      nim: "2021123457",
      status: "signing",
      progress: 67,
      createdAt: "2024-01-15 11:15",
      signatures: 2,
      totalSignatures: 3
    },
    {
      id: "DOC_2024_003",
      name: "Surat Keterangan - Budi Santoso",
      type: "certificate",
      prodi: "informatika",
      studentName: "Budi Santoso",
      nim: "2021123458",
      status: "generating",
      progress: 25,
      createdAt: "2024-01-15 12:00",
      signatures: 0,
      totalSignatures: 1
    }
  ]

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = templates.find(t => t.id === templateId)
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

    // Simulate document generation process
    const steps = [
      { message: "Memvalidasi data...", duration: 1000 },
      { message: "Membuat dokumen...", duration: 2000 },
      { message: "Menambahkan tanda tangan digital...", duration: 1500 },
      { message: "Memverifikasi integritas...", duration: 1000 },
      { message: "Dokumen selesai!", duration: 500 }
    ]

    let currentProgress = 0
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.duration))
      currentProgress += 100 / steps.length
      setProgress(currentProgress)
    }

    // Add to recent documents
    const template = templates.find(t => t.id === selectedTemplate)
    if (template) {
      const newDocument: GeneratedDocument = {
        id: `DOC_${Date.now()}`,
        name: `${template.name} - ${formData.nama_mahasiswa}`,
        type: template.type,
        prodi: template.prodi,
        studentName: formData.nama_mahasiswa,
        nim: formData.nim,
        status: "completed",
        progress: 100,
        createdAt: new Date().toLocaleString(),
        signatures: template.signers,
        totalSignatures: template.signers
      }
      setRecentDocuments(prev => [newDocument, ...prev])
    }

    setGenerating(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "signing": return <FileSignature className="w-4 h-4 text-blue-500" />
      case "generating": return <Clock className="w-4 h-4 text-yellow-500" />
      case "error": return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-600"
      case "signing": return "bg-blue-500/10 text-blue-600"
      case "generating": return "bg-yellow-500/10 text-yellow-600"
      case "error": return "bg-red-500/10 text-red-600"
      default: return "bg-gray-500/10 text-gray-600"
    }
  }

  const renderFormFields = () => {
    const template = templates.find(t => t.id === selectedTemplate)
    if (!template) return null

    return (
      <div className="space-y-4">
        {template.requiredFields.map((field) => (
          <div key={field} className="space-y-2">
            <Label htmlFor={field} className="capitalize">
              {field.replace(/_/g, " ")} *
            </Label>
            {field === "judul" || field === "judul_skripsi" ? (
              <Textarea
                id={field}
                value={formData[field] || ""}
                onChange={(e) => handleInputChange(field, e.target.value)}
                placeholder={`Masukkan ${field.replace(/_/g, " ")}`}
                className="min-h-[80px]"
              />
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Document Generation
            </span>
          </h2>
          <p className="mt-2 text-muted-foreground">
            Generate official documents with digital signatures for Admin Umum
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <History className="mr-2 w-4 h-4" />
            View History
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 w-4 h-4" />
            Templates
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Template Selection */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <FileText className="w-5 h-5" />
              Document Templates
            </CardTitle>
            <CardDescription>Choose a document template to generate</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-2">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${selectedTemplate === template.id ? "bg-muted border-primary" : ""
                      }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="text-xs">
                        {template.type.toUpperCase()}
                      </Badge>
                      <div className="flex gap-1 items-center">
                        <Users className="w-3 h-3" />
                        <span className="text-xs">{template.signers}</span>
                      </div>
                    </div>
                    <h4 className="mb-1 text-sm font-medium">{template.name}</h4>
                    <p className="mb-2 text-xs text-muted-foreground">{template.description}</p>
                    <div className="flex gap-1 items-center">
                      <Badge variant="secondary" className="text-xs">
                        {template.prodi}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Document Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Sparkles className="w-5 h-5" />
              Generate Document
            </CardTitle>
            <CardDescription>Fill in the required information to generate the document</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="form" className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="form">Document Form</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-4">
                {selectedTemplate ? (
                  <div className="space-y-6">
                    <Alert>
                      <Shield className="w-4 h-4" />
                      <AlertDescription>
                        Document will be generated with EdDSA digital signature for authenticity verification.
                      </AlertDescription>
                    </Alert>

                    {renderFormFields()}

                    {generating && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Generating document...</span>
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
                            <Clock className="mr-2 w-4 h-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 w-4 h-4" />
                            Generate Document
                          </>
                        )}
                      </Button>
                      <Button variant="outline">
                        <Save className="mr-2 w-4 h-4" />
                        Save Draft
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-64 text-center">
                    <FileText className="mb-4 w-12 h-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Select a Template</h3>
                    <p className="text-muted-foreground">Choose a document template from the sidebar to start</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="p-6 rounded-lg border bg-muted/20">
                  <div className="space-y-4 text-center">
                    <Eye className="mx-auto w-12 h-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Document Preview</h3>
                    <p className="text-muted-foreground">
                      Preview will be available after filling the form
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Output Format</Label>
                    <Select defaultValue="pdf">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF (Recommended)</SelectItem>
                        <SelectItem value="docx">Microsoft Word</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Signature Level</Label>
                    <Select defaultValue="advanced">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic Signature</SelectItem>
                        <SelectItem value="advanced">Advanced (EdDSA)</SelectItem>
                        <SelectItem value="qualified">Qualified Signature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox id="watermark" defaultChecked />
                    <Label htmlFor="watermark">Add security watermark</Label>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Checkbox id="qr" defaultChecked />
                    <Label htmlFor="qr">Include QR code for verification</Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex gap-2 items-center">
            <History className="w-5 h-5" />
            Recent Documents
          </CardTitle>
          <CardDescription>Recently generated documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...mockRecentDocuments, ...recentDocuments].slice(0, 5).map((doc) => (
              <div key={doc.id} className="flex justify-between items-center p-3 rounded-lg border">
                <div className="flex gap-3 items-center">
                  {getStatusIcon(doc.status)}
                  <div>
                    <h4 className="text-sm font-medium">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {doc.nim} • {doc.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <QrCode className="w-4 h-4" />
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
