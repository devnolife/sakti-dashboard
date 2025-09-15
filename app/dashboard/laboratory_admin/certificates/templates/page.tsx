"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Award,
  Sparkles,
  GraduationCap,
  Layout,
  Eye,
  Download,
  Search,
  Grid3x3,
  List
} from "lucide-react"
import CanvasCertificate from "@/components/certificates/canvas-certificate"
import CertificateDownload from "@/components/certificates/certificate-download"
import CertificatePreview from "@/components/certificates/certificate-preview"

// Certificate templates dengan data yang lebih lengkap
const certificateTemplates = [
  {
    id: 1,
    name: "UX Design Foundations",
    description: "Template profesional dengan badge graduation cap dan border dotted yang elegan - Template Utama",
    category: "ux_design_foundations",
    templateKey: "ux_design_foundations" as const,
    color: "from-blue-500 to-purple-600",
    icon: Sparkles,
    tags: ["Professional", "Clean", "Academic", "Main Template"],
    difficulty: "Beginner",
    usage: "Kursus Design, Sertifikat Pelatihan",
    features: ["Dotted Border", "Graduation Badge", "Signature Line", "Issue Date"],
    isMainTemplate: true
  },
  {
    id: 2,
    name: "Product Designer I",
    description: "Template modern dengan hexagonal badge, QR code dan desain professional",
    category: "product_designer_1",
    templateKey: "product_designer_1" as const,
    color: "from-amber-500 to-orange-600",
    icon: Award,
    tags: ["Modern", "Professional", "Tech"],
    difficulty: "Advanced",
    usage: "Sertifikasi Profesi, Achievement Award",
    features: ["Hexagon Badge", "QR Code", "Organization Logo", "Certificate ID"],
    isMainTemplate: false
  },
  {
    id: 3,
    name: "Template Academic",
    description: "Desain khusus untuk institusi akademik Indonesia dengan nuansa formal",
    category: "academic",
    templateKey: "academic" as const,
    color: "from-indigo-500 to-purple-700",
    icon: GraduationCap,
    tags: ["Academic", "Formal", "Indonesian"],
    difficulty: "Intermediate",
    usage: "Universitas, Sekolah, Institusi Pendidikan",
    features: ["University Header", "Formal Layout", "Academic Seal", "Indonesian Text"],
    isMainTemplate: false
  },
  {
    id: 4,
    name: "Template Modern",
    description: "Desain kontemporer dengan gradien modern dan backdrop blur effect",
    category: "modern",
    templateKey: "modern" as const,
    color: "from-violet-500 to-indigo-500",
    icon: Layout,
    tags: ["Modern", "Gradient", "Contemporary"],
    difficulty: "Intermediate",
    usage: "Corporate Training, Workshop, Bootcamp",
    features: ["Gradient Design", "Backdrop Blur", "Modern Typography", "Clean Layout"],
    isMainTemplate: false
  }
]

// Sample data untuk setiap template
const templateSampleData = {
  ux_design_foundations: {
    recipientName: "Ahmad Fauzi Rahman",
    courseName: "UX Design Foundations",
    achievement: "UX Design Foundations",
    description: "The bearer of this certificate has successfully completed the UX Design Foundations course, which focuses on fundamental design principles and methodologies.",
    issueDate: "May 31, 2024",
    certificateId: "CERT-UX-2024-001", 
    signatory: "Founders, Uxcel",
    organization: "Lab Universitas"
  },
  product_designer_1: {
    recipientName: "Siti Nurhaliza",
    courseName: "Product Designer I",
    achievement: "Product Designer I",
    description: "The bearer of this professional certificate has demonstrated a fundamental level of Product Design mastery and passed the core competencies for each design specialty.",
    issueDate: "June 15, 2024",
    certificateId: "CERT-PD1-2024-002", 
    signatory: "Founders, Uxcel",
    organization: "uxcel"
  },
  academic: {
    recipientName: "Budi Santoso",
    courseName: "Penghargaan Akademik Terbaik",
    achievement: "Mahasiswa Berprestasi",
    description: "Sertifikat ini diberikan kepada mahasiswa yang telah menunjukkan prestasi akademik yang luar biasa dalam bidang studi dan memiliki kontribusi positif untuk lingkungan kampus.",
    issueDate: new Date().toLocaleDateString('id-ID'),
    certificateId: "CERT-ACAD-2024-003", 
    signatory: "Dr. Rektor Universitas",
    organization: "Universitas Teknologi Indonesia"
  },
  modern: {
    recipientName: "Diana Putri",
    courseName: "Digital Innovation Workshop",
    achievement: "Innovation Excellence",
    description: "This certificate recognizes completion of an intensive digital innovation program focusing on emerging technologies and creative problem-solving methodologies.",
    issueDate: new Date().toLocaleDateString('en-US'),
    certificateId: "CERT-MOD-2024-004", 
    signatory: "Digital Signature",
    organization: "Innovation Hub"
  }
}

export default function CertificateTemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1)
  const [canvasInstances, setCanvasInstances] = useState<Record<number, HTMLCanvasElement | null>>({})

  const handleCanvasReady = (templateId: number, canvas: HTMLCanvasElement) => {
    setCanvasInstances(prev => ({
      ...prev,
      [templateId]: canvas
    }))
  }

  // Filter templates and sort to show main template first
  const filteredTemplates = certificateTemplates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // Sort by main template first, then by ID
      if (a.isMainTemplate && !b.isMainTemplate) return -1
      if (!a.isMainTemplate && b.isMainTemplate) return 1
      return a.id - b.id
    })

  const categories = ["all", ...Array.from(new Set(certificateTemplates.map(t => t.category)))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Template Sertifikat
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Jelajahi dan pilih template sertifikat
        </p>
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500 hover:bg-blue-500 text-white">TEMPLATE UTAMA</Badge>
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              UX Design Foundations - Template yang direkomendasikan untuk semua sertifikat
            </span>
          </div>
        </div>
      </div>


      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari template..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Semua kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.slice(1).map((category) => (
              <SelectItem key={category} value={category}>
                {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Templates Gallery */}
        <div className="xl:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
                {filteredTemplates.map((template) => {
                  const IconComponent = template.icon
                  return (
                    <div
                      key={template.id}
                      className={`relative group cursor-pointer border rounded-lg transition-all hover:shadow-sm ${
                        selectedTemplate === template.id
                          ? "border-blue-500 shadow-sm"
                          : template.isMainTemplate
                          ? "border-blue-300 hover:border-blue-400"
                          : "border-gray-200 hover:border-gray-300"
                      } ${viewMode === "list" ? "flex gap-4" : ""}`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className={`${viewMode === "grid" ? "h-32" : "w-32 h-24"} ${template.isMainTemplate ? "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900" : "bg-gray-100 dark:bg-gray-800"} ${viewMode === "grid" ? "rounded-t-lg" : "rounded-l-lg"} flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
                        <IconComponent className={`h-8 w-8 ${template.isMainTemplate ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}`} />
                        {template.isMainTemplate && (
                          <div className="absolute top-1 left-1">
                            <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-xs px-1 py-0">
                              UTAMA
                            </Badge>
                          </div>
                        )}
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2">
                            <div className="bg-blue-500 rounded-full p-1">
                              <Eye className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-sm sm:text-base">{template.name}</h3>
                          <div className="flex gap-1">
                            {template.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                        
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Tingkat:</span>
                            <Badge variant="outline" className="text-xs">
                              {template.difficulty}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Penggunaan:</span>
                            <span className="text-right">{template.usage}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {template.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {template.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.features.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.open(`/dashboard/laboratory_admin/certificates/templates/${template.id}`, '_blank')}
                            className="flex-1"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Detail
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => window.open(`/dashboard/laboratory_admin/certificates/generate?template=${template.id}`, '_blank')}
                            className="flex-1"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Gunakan
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="xl:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedTemplate ? (
                <div className="space-y-4">
                  {(() => {
                    const template = certificateTemplates.find(t => t.id === selectedTemplate)
                    if (!template) return null

                    // Render preview untuk semua template dengan data yang sesuai
                    const templateData = templateSampleData[template.templateKey as keyof typeof templateSampleData]

                    return (
                      <div className="space-y-4">
                        <div className="transform scale-50 origin-top border rounded-lg overflow-hidden">
                          <CertificatePreview
                            template={template.templateKey}
                            data={templateData}
                            width={800}
                            height={600}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                          
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Kategori:</span>
                              <Badge variant="secondary">{template.category}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Tingkat:</span>
                              <span>{template.difficulty}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Sample Data:</span>
                              <span className="text-right font-medium">{templateData.recipientName}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Fitur Template:</h4>
                            <div className="grid grid-cols-2 gap-1">
                              {template.features.map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs justify-center">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => window.open(`/dashboard/laboratory_admin/certificates/templates/${template.id}`, '_blank')}
                              className="flex-1"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Lihat Detail
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={() => window.open(`/dashboard/laboratory_admin/certificates/generate?template=${template.id}`, '_blank')}
                              className="flex-1"
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Gunakan
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <Eye className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium mb-2">Pilih Template</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Klik template untuk melihat preview
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}