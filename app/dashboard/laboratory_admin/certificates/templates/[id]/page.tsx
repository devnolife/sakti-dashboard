"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Award,
  Sparkles,
  GraduationCap,
  Layout,
  Eye,
  Download,
  ArrowLeft,
  Star,
  Palette,
  Type,
  Settings,
  Code,
  Layers,
  Edit,
  Copy,
  BookOpen,
  Zap
} from "lucide-react"
import CanvasCertificate from "@/components/certificates/canvas-certificate"
import CertificateDownload from "@/components/certificates/certificate-download"
import CertificatePreview from "@/components/certificates/certificate-preview"

// Certificate templates dengan data yang lebih lengkap
const certificateTemplates = [
  {
    id: 1,
    name: "UX Design Foundations",
    description: "Template profesional dengan badge graduation cap dan border dotted yang elegan. Desain ini mengutamakan kesederhanaan dan keterbacaan dengan menggunakan elemen visual yang clean dan modern.",
    category: "ux_design_foundations",
    templateKey: "ux_design_foundations" as const,
    color: "from-blue-500 to-purple-600",
    icon: Sparkles,
    tags: ["Professional", "Clean", "Academic"],
    difficulty: "Beginner",
    usage: "Kursus Design, Sertifikat Pelatihan",
    features: ["Dotted Border", "Graduation Badge", "Signature Line", "Issue Date"],
    designSpecs: {
      canvas: {
        width: 800,
        height: 600,
        background: "#f8f6ff",
        border: {
          width: 8,
          color: "#000000",
          radius: 20
        }
      },
      typography: {
        primary: "Inter",
        secondary: "Dancing Script",
        weights: [400, 500, 600, 700, 800]
      },
      colorPalette: {
        primary: "#6366f1",
        background: "#f8f6ff",
        text: "#000000",
        secondary: "#666666",
        accent: "#ffffff"
      }
    },
    useCases: [
      "Sertifikat penyelesaian kursus online",
      "Sertifikat pelatihan workshop",
      "Sertifikat seminar dan webinar",
      "Sertifikat program bootcamp"
    ],
    technicalInfo: {
      format: "HTML5 Canvas",
      resolution: "300 DPI",
      exportFormats: ["PNG", "PDF"],
      fontLoading: "Google Fonts API",
      printReady: true
    }
  },
  {
    id: 2,
    name: "Product Designer I",
    description: "Template modern dengan hexagonal badge, QR code dan desain professional yang cocok untuk sertifikasi profesi dan achievement award dalam bidang teknologi dan design.",
    category: "product_designer_1", 
    templateKey: "product_designer_1" as const,
    color: "from-amber-500 to-orange-600",
    icon: Award,
    tags: ["Modern", "Professional", "Tech"],
    difficulty: "Advanced",
    usage: "Sertifikasi Profesi, Achievement Award",
    features: ["Hexagon Badge", "QR Code", "Organization Logo", "Certificate ID"],
    designSpecs: {
      canvas: {
        width: 800,
        height: 600,
        background: "#f8f6ff",
        border: {
          width: 8,
          color: "#000000",
          radius: 20
        }
      },
      typography: {
        primary: "Inter",
        secondary: "Dancing Script",
        weights: [400, 500, 600, 700, 800]
      },
      colorPalette: {
        primary: "#6366f1",
        background: "#f8f6ff",
        text: "#000000",
        secondary: "#666666",
        accent: "#ffffff"
      }
    },
    useCases: [
      "Sertifikat kompetensi profesional",
      "Sertifikat pencapaian karir",
      "Sertifikat sertifikasi industri",
      "Sertifikat program magang"
    ],
    technicalInfo: {
      format: "HTML5 Canvas",
      resolution: "300 DPI",
      exportFormats: ["PNG", "PDF"],
      fontLoading: "Google Fonts API",
      printReady: true,
      qrCodeSupport: true
    }
  },
  {
    id: 3,
    name: "Template Academic",
    description: "Desain khusus untuk institusi akademik Indonesia dengan nuansa formal yang mengutamakan kredibilitas dan prestise institusi pendidikan.",
    category: "academic",
    templateKey: "academic" as const,
    color: "from-indigo-500 to-purple-700",
    icon: GraduationCap,
    tags: ["Academic", "Formal", "Indonesian"],
    difficulty: "Intermediate",
    usage: "Universitas, Sekolah, Institusi Pendidikan",
    features: ["University Header", "Formal Layout", "Academic Seal", "Indonesian Text"],
    designSpecs: {
      canvas: {
        width: 800,
        height: 600,
        background: "linear-gradient(to bottom right, #dbeafe, #e0e7ff)",
        border: {
          width: 4,
          color: "#4f46e5",
          radius: 15
        }
      },
      typography: {
        primary: "Inter",
        secondary: "Dancing Script",
        weights: [400, 500, 600, 700]
      },
      colorPalette: {
        primary: "#4f46e5",
        background: "#f3f4f6",
        text: "#1f2937",
        secondary: "#6b7280",
        accent: "#ffffff"
      }
    },
    useCases: [
      "Ijazah dan diploma",
      "Sertifikat kelulusan",
      "Sertifikat prestasi akademik",
      "Penghargaan mahasiswa berprestasi"
    ],
    technicalInfo: {
      format: "CSS-based rendering",
      resolution: "Print ready",
      exportFormats: ["PNG", "PDF"],
      localization: "Indonesian",
      institutionalBranding: true
    }
  },
  {
    id: 4,
    name: "Template Modern",
    description: "Desain kontemporer dengan gradien modern dan backdrop blur effect yang memberikan kesan futuristik dan teknologi terdepan.",
    category: "modern",
    templateKey: "modern" as const,
    color: "from-violet-500 to-indigo-500",
    icon: Layout,
    tags: ["Modern", "Gradient", "Contemporary"],
    difficulty: "Intermediate", 
    usage: "Corporate Training, Workshop, Bootcamp",
    features: ["Gradient Design", "Backdrop Blur", "Modern Typography", "Clean Layout"],
    designSpecs: {
      canvas: {
        width: 800,
        height: 600,
        background: "linear-gradient(to bottom right, #ede9fe, #e0e7ff)",
        border: {
          width: 2,
          color: "#8b5cf6",
          radius: 20
        }
      },
      typography: {
        primary: "Inter",
        secondary: "Dancing Script", 
        weights: [400, 500, 600, 700]
      },
      colorPalette: {
        primary: "#8b5cf6",
        background: "#faf5ff",
        text: "#1f2937",
        secondary: "#6b7280",
        accent: "#ffffff"
      }
    },
    useCases: [
      "Sertifikat pelatihan korporat",
      "Sertifikat workshop teknologi",
      "Sertifikat bootcamp programming",
      "Sertifikat program startup"
    ],
    technicalInfo: {
      format: "CSS-based rendering",
      resolution: "High resolution",
      exportFormats: ["PNG", "PDF"],
      modernEffects: true,
      responsiveDesign: true
    }
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

export default function TemplateDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [activeTab, setActiveTab] = useState("preview")

  const templateId = parseInt(params.id as string)
  const template = certificateTemplates.find(t => t.id === templateId)

  const handleCanvasReady = (canvasElement: HTMLCanvasElement) => {
    setCanvas(canvasElement)
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Template Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-4">Template dengan ID tersebut tidak tersedia.</p>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  const IconComponent = template.icon

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <IconComponent className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{template.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{template.category}</Badge>
                <Badge variant="outline">{template.difficulty}</Badge>
                {template.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="specs" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Spesifikasi
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Penggunaan
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Teknis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Preview Template
                  </CardTitle>
                  <p className="text-muted-foreground">Preview lengkap dari template sertifikat</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 flex justify-center">
                    {(() => {
                      const templateData = templateSampleData[template.templateKey as keyof typeof templateSampleData]
                      
                      if (template.templateKey === "ux_design_foundations" || template.templateKey === "product_designer_1") {
                        return (
                          <div className="transform scale-75 origin-center">
                            <CanvasCertificate
                              template={template.templateKey}
                              data={templateData}
                              width={800}
                              height={600}
                              onCanvasReady={handleCanvasReady}
                            />
                          </div>
                        )
                      } else {
                        // Gunakan CertificatePreview untuk template lain
                        return (
                          <div className="transform scale-75 origin-center">
                            <CertificatePreview
                              template={template.templateKey}
                              data={templateData}
                              width={800}
                              height={600}
                            />
                          </div>
                        )
                      }
                    })()}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <CertificateDownload
                      canvas={canvas}
                      fileName={`template-${template.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="w-fit"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Spesifikasi Desain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        Canvas
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dimensi:</span>
                          <span>{template.designSpecs.canvas.width} × {template.designSpecs.canvas.height}px</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Background:</span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded border" 
                              style={{ background: template.designSpecs.canvas.background }}
                            ></div>
                            <span className="font-mono text-xs">{template.designSpecs.canvas.background}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Border:</span>
                          <span>{template.designSpecs.canvas.border.width}px • {template.designSpecs.canvas.border.radius}px radius</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Type className="h-4 w-4" />
                        Tipografi
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Font Utama:</span>
                          <span>{template.designSpecs.typography.primary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Font Sekunder:</span>
                          <span>{template.designSpecs.typography.secondary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Font Weights:</span>
                          <span>{template.designSpecs.typography.weights.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Palet Warna
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.entries(template.designSpecs.colorPalette).map(([name, color]) => (
                          <div key={name} className="text-center">
                            <div 
                              className="w-12 h-12 rounded-lg border mx-auto mb-2"
                              style={{ backgroundColor: color }}
                            ></div>
                            <div className="text-xs">
                              <div className="font-medium capitalize">{name}</div>
                              <div className="text-muted-foreground font-mono">{color}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Panduan Penggunaan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Deskripsi Template</h3>
                      <p className="text-muted-foreground leading-relaxed">{template.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Kasus Penggunaan
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {template.useCases.map((useCase, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                            <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-gray-600 dark:text-gray-300 text-xs font-medium">{index + 1}</span>
                            </div>
                            <span className="text-sm">{useCase}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        Fitur Template
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Informasi Teknis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Format & Output</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Format Template:</span>
                            <span className="font-medium">{template.technicalInfo.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Resolusi:</span>
                            <span className="font-medium">{template.technicalInfo.resolution}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Export Format:</span>
                            <span className="font-medium">{template.technicalInfo.exportFormats.join(', ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Print Ready:</span>
                            <Badge variant={template.technicalInfo.printReady ? "default" : "secondary"}>
                              {template.technicalInfo.printReady ? "Ya" : "Tidak"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Fitur Khusus</h4>
                        <div className="space-y-2 text-sm">
                          {'qrCodeSupport' in template.technicalInfo && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">QR Code Support:</span>
                              <Badge variant="default">Ya</Badge>
                            </div>
                          )}
                          {'localization' in template.technicalInfo && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Lokalisasi:</span>
                              <span className="font-medium">{template.technicalInfo.localization}</span>
                            </div>
                          )}
                          {'institutionalBranding' in template.technicalInfo && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Institutional Branding:</span>
                              <Badge variant="default">Ya</Badge>
                            </div>
                          )}
                          {'modernEffects' in template.technicalInfo && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Modern Effects:</span>
                              <Badge variant="default">Ya</Badge>
                            </div>
                          )}
                          {'responsiveDesign' in template.technicalInfo && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Responsive Design:</span>
                              <Badge variant="default">Ya</Badge>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Font Loading:</span>
                            <span className="font-medium">{template.technicalInfo.fontLoading}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1">
          <div className="space-y-6 sticky top-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Kategori</label>
                    <p className="font-medium capitalize">{template.category.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Tingkat Kesulitan</label>
                    <p className="font-medium">{template.difficulty}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Rekomendasi Penggunaan</label>
                    <p className="text-sm">{template.usage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Aksi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full"
                    onClick={() => router.push(`/dashboard/laboratory_admin/certificates/generate?template=${template.id}`)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Gunakan Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Duplikat Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Contoh
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Template Serupa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certificateTemplates
                    .filter(t => t.id !== template.id && t.tags.some(tag => template.tags.includes(tag)))
                    .slice(0, 2)
                    .map((relatedTemplate) => {
                      const RelatedIcon = relatedTemplate.icon
                      return (
                        <div 
                          key={relatedTemplate.id} 
                          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                          onClick={() => router.push(`/dashboard/laboratory_admin/certificates/templates/${relatedTemplate.id}`)}
                        >
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                            <RelatedIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{relatedTemplate.name}</p>
                            <p className="text-xs text-muted-foreground">{relatedTemplate.difficulty}</p>
                          </div>
                        </div>
                      )
                    })
                  }
                  {certificateTemplates.filter(t => t.id !== template.id && t.tags.some(tag => template.tags.includes(tag))).length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Tidak ada template serupa
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}