"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Award,
  Users,
  Download,
  Sparkles,
  CheckCircle,
  Clock,
  File,
  GraduationCap,
  Layout,
  User
} from "lucide-react"
import CertificatePreview from "@/components/certificates/certificate-preview"

// Certificate templates
const certificateTemplates = [
  {
    id: 1,
    name: "UX Design Foundations",
    templateKey: "ux_design_foundations" as const,
    icon: Sparkles
  },
  {
    id: 2,
    name: "Product Designer I",
    templateKey: "product_designer_1" as const,
    icon: Award
  },
  {
    id: 3,
    name: "Academic",
    templateKey: "academic" as const,
    icon: GraduationCap
  },
  {
    id: 4,
    name: "Modern",
    templateKey: "modern" as const,
    icon: Layout
  }
]

// Sample bulk data
const sampleBulkData = [
  { name: "Ahmad Fauzi", nim: "12345678", program: "Informatika", achievement: "Juara 1 Lomba Programming", date: "2024-01-15" },
  { name: "Siti Nurhaliza", nim: "23456789", program: "Sistem Informasi", achievement: "Best Presenter", date: "2024-01-15" },
  { name: "Budi Santoso", nim: "34567890", program: "Informatika", achievement: "Outstanding Student", date: "2024-01-15" }
]

export default function GenerateCertificatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [uploadMethod, setUploadMethod] = useState<"single" | "bulk">("single")
  const [bulkData, setBulkData] = useState<any[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  // Single certificate form data
  const [singleForm, setSingleForm] = useState({
    name: "",
    nim: "",
    program: "",
    achievement: "",
    date: "",
    description: ""
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setBulkData(sampleBulkData)
    }
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Buat Sertifikat
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Pilih template dan isi data untuk membuat sertifikat
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pilih Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {certificateTemplates.map((template) => {
                  const IconComponent = template.icon
                  return (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedTemplate === template.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                          : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Data Input */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Data Sertifikat</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={uploadMethod} onValueChange={(value: any) => setUploadMethod(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">
                    <User className="mr-2 h-4 w-4" />
                    Satuan
                  </TabsTrigger>
                  <TabsTrigger value="bulk">
                    <Users className="mr-2 h-4 w-4" />
                    Bulk
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="single" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        value={singleForm.name}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nim">NIM</Label>
                      <Input
                        id="nim"
                        placeholder="Nomor Induk Mahasiswa"
                        value={singleForm.nim}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, nim: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="program">Program Studi</Label>
                      <Select value={singleForm.program} onValueChange={(value) => setSingleForm(prev => ({ ...prev, program: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih program studi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="informatika">Informatika</SelectItem>
                          <SelectItem value="sistem-informasi">Sistem Informasi</SelectItem>
                          <SelectItem value="teknik-komputer">Teknik Komputer</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="achievement">Pencapaian</Label>
                      <Input
                        id="achievement"
                        placeholder="Juara 1 Lomba Programming"
                        value={singleForm.achievement}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, achievement: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Tanggal</Label>
                      <Input
                        id="date"
                        type="date"
                        value={singleForm.date}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        placeholder="Deskripsi pencapaian"
                        value={singleForm.description}
                        onChange={(e) => setSingleForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bulk" className="space-y-4 mt-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                    <h3 className="font-medium mb-2">Upload File Excel</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Drag & drop file Excel atau klik untuk browse
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls,.csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        <File className="mr-2 h-4 w-4" />
                        Pilih File
                      </Button>
                    </label>
                  </div>

                  {bulkData.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Preview Data ({bulkData.length} records)</h4>
                      <div className="max-h-48 overflow-auto space-y-2">
                        {bulkData.map((item, index) => (
                          <div key={index} className="border rounded p-3 text-sm">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-gray-600">{item.program} • {item.achievement}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTemplate && (singleForm.name || bulkData.length > 0) ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                    {(() => {
                      const template = certificateTemplates.find(t => t.id === selectedTemplate)
                      if (!template) return null

                      const previewData = uploadMethod === "single" ? {
                        recipientName: singleForm.name || "Nama Penerima",
                        courseName: singleForm.achievement || "Nama Prestasi",
                        description: singleForm.description || "Deskripsi pencapaian",
                        issueDate: singleForm.date || new Date().toLocaleDateString('id-ID'),
                        certificateId: "CERT-2024-001",
                        signatory: "Dr. Kepala Laboratorium",
                        organization: "Lab Universitas"
                      } : {
                        recipientName: bulkData[0]?.name || "Nama Penerima",
                        courseName: bulkData[0]?.achievement || "Nama Prestasi", 
                        description: "Sertifikat ini diberikan sebagai bentuk apresiasi atas pencapaian.",
                        issueDate: bulkData[0]?.date || new Date().toLocaleDateString('id-ID'),
                        certificateId: "CERT-2024-001",
                        signatory: "Dr. Kepala Laboratorium",
                        organization: "Lab Universitas"
                      }

                      return (
                        <div className="flex justify-center">
                          <div className="transform scale-75 origin-top">
                            <CertificatePreview
                              template={template.templateKey}
                              data={previewData}
                              width={600}
                              height={450}
                            />
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                  
                  {uploadMethod === "bulk" && bulkData.length > 1 && (
                    <div className="text-center text-sm text-gray-600">
                      Menampilkan preview untuk: <strong>{bulkData[0]?.name}</strong>
                      <br />
                      {bulkData.length - 1} sertifikat lainnya akan dibuat dengan format yang sama
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Award className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-2">Preview Sertifikat</h3>
                  <p className="text-gray-600 text-sm">
                    Pilih template dan isi data untuk melihat preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          {(selectedTemplate && ((uploadMethod === "single" && singleForm.name) || (uploadMethod === "bulk" && bulkData.length > 0))) && (
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Template: {certificateTemplates.find(t => t.id === selectedTemplate)?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        Data: {uploadMethod === "single" ? "1 sertifikat" : `${bulkData.length} sertifikat`}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>

                {isGenerating && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{generationProgress}%</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                  </div>
                )}

                {generationProgress === 100 && !isGenerating && (
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline">
                      Preview
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}