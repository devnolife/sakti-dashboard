"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  ArrowLeft,
  Maximize2,
  Eye,
  Award,
  Sparkles,
  GraduationCap,
  Layout
} from "lucide-react"
import { useRouter } from "next/navigation"
import CanvasCertificate from "@/components/certificates/canvas-certificate"
import CertificatePreview from "@/components/certificates/certificate-preview"
import CertificateDownload from "@/components/certificates/certificate-download"

// Sample data untuk setiap template
const certificateSamples = [
  {
    id: 1,
    templateKey: "ux_design_foundations" as const,
    name: "UX Design Foundations",
    category: "Professional Course",
    icon: Sparkles,
    color: "from-blue-500 to-purple-600",
    data: {
      recipientName: "Ahmad Fauzi Rahman",
      courseName: "UX Design Foundations",
      achievement: "UX Design Foundations",
      description: "The bearer of this certificate has successfully completed the UX Design Foundations course, which focuses on fundamental design principles and methodologies.",
      issueDate: "May 31, 2024",
      certificateId: "CERT-UX-2024-001", 
      signatory: "Founders, Uxcel",
      organization: "Lab Universitas"
    }
  },
  {
    id: 2,
    templateKey: "product_designer_1" as const,
    name: "Product Designer I",
    category: "Professional Certification",
    icon: Award,
    color: "from-amber-500 to-orange-600",
    data: {
      recipientName: "Siti Nurhaliza",
      courseName: "Product Designer I",
      achievement: "Product Designer I",
      description: "The bearer of this professional certificate has demonstrated a fundamental level of Product Design mastery and passed the core competencies for each design specialty.",
      issueDate: "June 15, 2024",
      certificateId: "CERT-PD1-2024-002", 
      signatory: "Founders, Uxcel",
      organization: "uxcel"
    }
  },
  {
    id: 3,
    templateKey: "academic" as const,
    name: "Template Academic",
    category: "Academic Achievement",
    icon: GraduationCap,
    color: "from-indigo-500 to-purple-700",
    data: {
      recipientName: "Budi Santoso",
      courseName: "Penghargaan Akademik Terbaik",
      achievement: "Mahasiswa Berprestasi",
      description: "Sertifikat ini diberikan kepada mahasiswa yang telah menunjukkan prestasi akademik yang luar biasa dalam bidang studi dan memiliki kontribusi positif untuk lingkungan kampus.",
      issueDate: new Date().toLocaleDateString('id-ID'),
      certificateId: "CERT-ACAD-2024-003", 
      signatory: "Dr. Rektor Universitas",
      organization: "Universitas Teknologi Indonesia"
    }
  },
  {
    id: 4,
    templateKey: "modern" as const,
    name: "Template Modern",
    category: "Corporate Training",
    icon: Layout,
    color: "from-violet-500 to-indigo-500",
    data: {
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
]

export default function CertificatePreviewPage() {
  const router = useRouter()
  const [selectedCertificate, setSelectedCertificate] = useState(certificateSamples[0])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const handleCanvasReady = (canvasElement: HTMLCanvasElement) => {
    setCanvas(canvasElement)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <h1 className="text-lg font-semibold">Preview Sertifikat</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedCertificate.name} - {selectedCertificate.data.recipientName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                <Maximize2 className="mr-2 h-4 w-4" />
                {isFullscreen ? "Exit" : "Fullscreen"}
              </Button>
              <CertificateDownload
                canvas={canvas}
                fileName={`certificate-${selectedCertificate.data.recipientName.toLowerCase().replace(/\s+/g, '-')}`}
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${isFullscreen ? 'fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col' : 'max-w-7xl mx-auto p-6'}`}>
        {isFullscreen && (
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">{selectedCertificate.name}</h2>
            <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
              ✕
            </Button>
          </div>
        )}

        <div className={`${isFullscreen ? 'flex-1 flex' : 'grid grid-cols-1 xl:grid-cols-4 gap-6'}`}>
          {/* Template Selector - Hidden in fullscreen */}
          {!isFullscreen && (
            <div className="xl:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Template Sertifikat</h3>
                  <div className="space-y-2">
                    {certificateSamples.map((cert) => {
                      const IconComponent = cert.icon
                      return (
                        <button
                          key={cert.id}
                          onClick={() => setSelectedCertificate(cert)}
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                            selectedCertificate.id === cert.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                              <IconComponent className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm">{cert.name}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {cert.data.recipientName}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Certificate Display */}
          <div className={`${isFullscreen ? 'flex-1 flex items-center justify-center p-8' : 'xl:col-span-3'}`}>
            <div className={`${isFullscreen ? '' : 'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'} flex justify-center items-center`}>
              <div className={`${isFullscreen ? 'max-w-5xl w-full' : ''}`}>
                {selectedCertificate.templateKey === "ux_design_foundations" || 
                 selectedCertificate.templateKey === "product_designer_1" ? (
                  <div className={`${isFullscreen ? 'scale-125' : 'scale-100'} transition-transform duration-300`}>
                    <CanvasCertificate
                      template={selectedCertificate.templateKey}
                      data={selectedCertificate.data}
                      width={800}
                      height={600}
                      onCanvasReady={handleCanvasReady}
                    />
                  </div>
                ) : (
                  <div className={`${isFullscreen ? 'scale-125' : 'scale-100'} transition-transform duration-300`}>
                    <CertificatePreview
                      template={selectedCertificate.templateKey}
                      data={selectedCertificate.data}
                      width={800}
                      height={600}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Info - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Informasi Penerima</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Nama:</span>
                        <span className="font-medium">{selectedCertificate.data.recipientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Pencapaian:</span>
                        <span className="font-medium">{selectedCertificate.data.achievement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tanggal:</span>
                        <span className="font-medium">{selectedCertificate.data.issueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Detail Sertifikat</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">ID:</span>
                        <span className="font-mono text-xs">{selectedCertificate.data.certificateId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Penerbit:</span>
                        <span className="font-medium">{selectedCertificate.data.organization}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Penandatangan:</span>
                        <span className="font-medium">{selectedCertificate.data.signatory}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Template Info</h4>
                    <div className="space-y-2 text-sm">
                      <Badge variant="outline">{selectedCertificate.category}</Badge>
                      <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                        {selectedCertificate.data.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}