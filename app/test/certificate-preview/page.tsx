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
  const certificateId = searchParams.get('id') || `001/LAB-INFORMATIKA/UNHAS/${new Date().getFullYear()}`

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
    // Show print instructions
    const printInstructions = `
📄 Panduan Print Sertifikat:

1. Pastikan ukuran kertas: A4 Landscape
2. Margin: None (0mm)
3. Background graphics: ON
4. Color: ON
5. Scale: 100%

Klik OK untuk melanjutkan ke Print Dialog
    `.trim()

    if (confirm(printInstructions)) {
      // Add a small delay to ensure styles are applied
      setTimeout(() => {
        window.print()
      }, 100)
    }
  }

  const handleDownload = () => {
    // Implement download logic here - for now show coming soon
    alert("📥 Fitur Download PDF akan segera hadir!\n\nUntuk saat ini, gunakan Print > Save as PDF dari browser Anda.")
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

            {/* Print Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-blue-900">
                  <Printer className="w-4 h-4" />
                  Panduan Print
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1 text-xs text-blue-800">
                  <p className="font-semibold">Setting Printer:</p>
                  <ul className="space-y-1 ml-3">
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>Ukuran: <strong>A4 Landscape</strong></span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>Margin: <strong>None (0mm)</strong></span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>Background: <strong>ON</strong></span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>Color: <strong>ON</strong></span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span>•</span>
                      <span>Scale: <strong>100%</strong></span>
                    </li>
                  </ul>
                </div>
                <Separator className="bg-blue-200" />
                <p className="text-xs text-blue-700">
                  💡 Untuk PDF: Print → Save as PDF
                </p>
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
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Printer className="w-4 h-4" />
                  Print Sertifikat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Print Styles */}
      <style jsx global>{`
        @media print {
          /* Page setup for A4 landscape */
          @page {
            size: A4 landscape;
            margin: 0;
          }

          /* Reset body and html */
          html, body {
            margin: 0;
            padding: 0;
            background: white !important;
            width: 297mm;
            height: 210mm;
          }

          /* Enable color printing */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide navigation and UI elements */
          .print\\:hidden,
          nav,
          header,
          footer,
          .no-print {
            display: none !important;
          }

          /* Remove shadows and borders from containers */
          .print\\:shadow-none {
            box-shadow: none !important;
          }

          .print\\:border-0 {
            border: 0 !important;
          }

          /* Main container adjustments */
          .container {
            max-width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          /* Card adjustments for print */
          .shadow-xl {
            box-shadow: none !important;
          }

          /* Remove all padding from main content wrapper */
          .min-h-screen {
            min-height: auto !important;
          }

          /* Grid adjustments */
          .grid {
            display: block !important;
          }

          .lg\\:col-span-3,
          .lg\\:col-span-4 {
            width: 100% !important;
            max-width: 100% !important;
          }

          /* Ensure certificate fills the page */
          .certificate-container {
            width: 297mm !important;
            height: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: visible !important;
          }

          /* Background and color preservation */
          .bg-gradient-to-br,
          .bg-gradient-to-r,
          .bg-white,
          [class*="bg-"],
          [class*="text-"],
          [class*="border-"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Font rendering */
          * {
            font-smoothing: antialiased;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Remove interactive elements */
          button,
          input,
          select,
          textarea,
          .cursor-pointer,
          [role="button"] {
            display: none !important;
          }

          /* Page breaks */
          .page-break {
            page-break-after: always;
            page-break-inside: avoid;
          }

          /* Ensure images print */
          img {
            max-width: 100% !important;
            page-break-inside: avoid;
          }

          /* SVG and graphics */
          svg {
            max-width: 100% !important;
          }

          /* Keep rounded corners for professional look */
          .rounded, .rounded-sm, .rounded-md, .rounded-lg, .rounded-xl, .rounded-2xl, .rounded-3xl, .rounded-full {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            /* Border radius is preserved */
          }

          /* Ensure proper spacing */
          .gap-6,
          .space-y-4,
          .space-y-8 {
            gap: 0 !important;
            margin: 0 !important;
          }

          /* Remove padding from outer containers */
          .px-4,
          .py-4,
          .py-8,
          .p-4,
          .p-0 {
            padding: 0 !important;
          }
        }

        /* Print preview mode (when using browser print preview) */
        @media screen {
          .print-preview-mode .print\\:hidden {
            opacity: 0.3;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  )
}
