"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Award, Download, Printer, FlipHorizontal } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import LabCertificateTemplate from "@/components/certificates/lab-certificate-template"

export default function CertificatePreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showBack, setShowBack] = useState(false)

  // Get data from URL params or use default
  const name = searchParams.get('name') || "Ahmad Fauzi Rahman"
  const program = searchParams.get('program') || "Laboratorium Backend Development"
  const certificateId = searchParams.get('id') || `CERT-LAB-${new Date().getFullYear()}-001`

  const labCertData = {
    name: name,
    nim: "H071221001",
    program: program,
    achievement: program,
    date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
    finalScore: 92,
    meetingsAttended: 12,
    attendanceScore: 95,
    assignmentScore: 90,
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Docker"],
    certificateId: certificateId,
    instructorName: "Muhyiddin A.M Hayat, S.Kom., M.T",
    organizationName: "Laboratorium Informatika"
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Implement download logic here
    alert("Download feature will be implemented")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Navigation */}
      <div className="border-b bg-white shadow-sm print:hidden">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <div>
                  <h1 className="font-semibold text-lg">Preview Sertifikat</h1>
                  <p className="text-xs text-muted-foreground">{name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Preview
              </Badge>
              <Separator orientation="vertical" className="h-6" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowBack(!showBack)}
                className="gap-2"
              >
                <FlipHorizontal className="w-4 h-4" />
                {showBack ? "Lihat Depan" : "Lihat Belakang"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                size="sm"
                onClick={handlePrint}
                className="gap-2"
              >
                <Printer className="w-4 h-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Certificate Preview - Main */}
          <div className="lg:col-span-3">
            <Card className="shadow-xl print:shadow-none print:border-0">
              <CardContent className="p-0">
                <div className="bg-white rounded-lg overflow-hidden">
                  <LabCertificateTemplate
                    data={labCertData}
                    template="lab_certificate"
                    showBack={showBack}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel - Sidebar */}
          <div className="lg:col-span-1 space-y-4 print:hidden">
            {/* Certificate Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Informasi Sertifikat</CardTitle>
                <CardDescription className="text-xs">Detail data sertifikat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Nama Peserta</p>
                    <p className="font-medium">{labCertData.name}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">NIM</p>
                    <p className="font-medium">{labCertData.nim}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">Program</p>
                    <p className="font-medium">{labCertData.program}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">Tanggal Terbit</p>
                    <p className="font-medium">{labCertData.date}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground">Certificate ID</p>
                    <p className="font-mono text-xs font-medium">{labCertData.certificateId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Statistik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Nilai Akhir</span>
                    <Badge variant="default" className="bg-green-500">{labCertData.finalScore}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Kehadiran</span>
                    <Badge variant="secondary">{labCertData.attendanceScore}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Tugas</span>
                    <Badge variant="secondary">{labCertData.assignmentScore}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Pertemuan</span>
                    <Badge variant="outline">{labCertData.meetingsAttended}x</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Teknologi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {labCertData.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBack(!showBack)}
                  className="w-full gap-2"
                >
                  <FlipHorizontal className="w-4 h-4" />
                  {showBack ? "Lihat Sisi Depan" : "Lihat Sisi Belakang"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="w-full gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button
                  size="sm"
                  onClick={handlePrint}
                  className="w-full gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print Sertifikat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-0 {
            border: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
