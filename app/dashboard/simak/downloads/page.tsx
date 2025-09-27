"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Download,
  FileSpreadsheet,
  FileText,
  Code,
  Calendar,
  GraduationCap,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { jadwalKuliahAPI } from "@/lib/api/jadwal-kuliah"

interface ExportRequest {
  type: "schedule" | "courses" | "all-schedules"
  prodi_code?: string
  academic_year: string
  semester_type: "ganjil" | "genap"
  format: "xlsx" | "pdf" | "json"
}

export default function DownloadsPage() {
  const [exportRequest, setExportRequest] = useState<ExportRequest>({
    type: "schedule",
    academic_year: "2025-2026",
    semester_type: "ganjil",
    format: "xlsx"
  })
  const [isExporting, setIsExporting] = useState(false)
  const [exportHistory, setExportHistory] = useState([
    {
      id: 1,
      type: "schedule",
      prodi: "Teknik Informatika",
      format: "xlsx",
      size: "2.4 MB",
      status: "completed",
      created_at: "2025-09-25T10:30:00Z"
    },
    {
      id: 2,
      type: "all-schedules",
      prodi: "Semua Prodi",
      format: "pdf",
      size: "15.7 MB",
      status: "completed",
      created_at: "2025-09-24T16:20:00Z"
    }
  ])

  const handleExport = async () => {
    setIsExporting(true)

    try {
      let response: Response

      if (exportRequest.type === "schedule" && exportRequest.prodi_code) {
        response = await jadwalKuliahAPI.downloadSchedule(
          exportRequest.prodi_code,
          exportRequest.academic_year,
          exportRequest.semester_type,
          exportRequest.format
        )
      } else if (exportRequest.type === "all-schedules") {
        response = await jadwalKuliahAPI.downloadAllSchedules(
          exportRequest.academic_year,
          exportRequest.semester_type,
          exportRequest.format
        )
      } else {
        throw new Error("Invalid export configuration")
      }

      if (response.ok) {
        // Create download link
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `jadwal-${exportRequest.type}-${exportRequest.academic_year}-${exportRequest.semester_type}.${exportRequest.format}`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        // Add to history
        setExportHistory(prev => [{
          id: Date.now(),
          type: exportRequest.type,
          prodi: exportRequest.prodi_code || "Semua Prodi",
          format: exportRequest.format,
          size: `${(blob.size / 1024 / 1024).toFixed(1)} MB`,
          status: "completed",
          created_at: new Date().toISOString()
        }, ...prev])
      } else {
        throw new Error("Export failed")
      }
    } catch (error) {
      console.error("Export error:", error)
      alert("Gagal melakukan export. Silakan coba lagi.")
    } finally {
      setIsExporting(false)
    }
  }

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "xlsx": return <FileSpreadsheet className="w-4 h-4 text-green-500" />
      case "pdf": return <FileText className="w-4 h-4 text-red-500" />
      case "json": return <Code className="w-4 h-4 text-blue-500" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed": return <AlertCircle className="w-4 h-4 text-red-500" />
      default: return <Loader2 className="w-4 h-4 animate-spin" />
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Download & Export
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Export jadwal dan data dalam berbagai format
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Export Configuration */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-800 dark:text-blue-200">
                <Download className="w-5 h-5 mr-2" />
                Konfigurasi Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipe Export</label>
                  <Select
                    value={exportRequest.type}
                    onValueChange={(value: "schedule" | "courses" | "all-schedules") =>
                      setExportRequest({ ...exportRequest, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="schedule">Jadwal per Prodi</SelectItem>
                      <SelectItem value="all-schedules">Semua Jadwal</SelectItem>
                      <SelectItem value="courses">Data Mata Kuliah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {exportRequest.type === "schedule" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program Studi</label>
                    <Select
                      value={exportRequest.prodi_code || ""}
                      onValueChange={(value) => setExportRequest({ ...exportRequest, prodi_code: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Prodi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IF">Teknik Informatika</SelectItem>
                        <SelectItem value="SI">Sistem Informasi</SelectItem>
                        <SelectItem value="TE">Teknik Elektro</SelectItem>
                        <SelectItem value="TM">Teknik Mesin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tahun Akademik</label>
                  <Select
                    value={exportRequest.academic_year}
                    onValueChange={(value) => setExportRequest({ ...exportRequest, academic_year: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Semester</label>
                  <Select
                    value={exportRequest.semester_type}
                    onValueChange={(value: "ganjil" | "genap") =>
                      setExportRequest({ ...exportRequest, semester_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ganjil">Ganjil</SelectItem>
                      <SelectItem value="genap">Genap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Format Export</label>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={exportRequest.format === "xlsx" ? "default" : "outline"}
                    onClick={() => setExportRequest({ ...exportRequest, format: "xlsx" })}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <FileSpreadsheet className="w-6 h-6 mb-2 text-green-500" />
                    <span className="text-sm">Excel</span>
                    <span className="text-xs text-gray-500">(.xlsx)</span>
                  </Button>
                  <Button
                    variant={exportRequest.format === "pdf" ? "default" : "outline"}
                    onClick={() => setExportRequest({ ...exportRequest, format: "pdf" })}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <FileText className="w-6 h-6 mb-2 text-red-500" />
                    <span className="text-sm">PDF</span>
                    <span className="text-xs text-gray-500">(.pdf)</span>
                  </Button>
                  <Button
                    variant={exportRequest.format === "json" ? "default" : "outline"}
                    onClick={() => setExportRequest({ ...exportRequest, format: "json" })}
                    className="flex flex-col items-center p-4 h-auto"
                  >
                    <Code className="w-6 h-6 mb-2 text-blue-500" />
                    <span className="text-sm">JSON</span>
                    <span className="text-xs text-gray-500">(.json)</span>
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleExport}
                disabled={isExporting || (exportRequest.type === "schedule" && !exportRequest.prodi_code)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                size="lg"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Export Options */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setExportRequest({
                    type: "all-schedules",
                    academic_year: "2025-2026",
                    semester_type: "ganjil",
                    format: "xlsx"
                  })
                  handleExport()
                }}
              >
                <FileSpreadsheet className="w-4 h-4 mr-2 text-green-500" />
                All Schedules (Excel)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setExportRequest({
                    type: "all-schedules",
                    academic_year: "2025-2026",
                    semester_type: "ganjil",
                    format: "pdf"
                  })
                  handleExport()
                }}
              >
                <FileText className="w-4 h-4 mr-2 text-red-500" />
                All Schedules (PDF)
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setExportRequest({
                    type: "courses",
                    academic_year: "2025-2026",
                    semester_type: "ganjil",
                    format: "json"
                  })
                  handleExport()
                }}
              >
                <Code className="w-4 h-4 mr-2 text-blue-500" />
                Courses Data (JSON)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Riwayat Export
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {exportHistory.map((export_item) => (
              <div
                key={export_item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getFormatIcon(export_item.format)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {export_item.type === "schedule" ? `Jadwal ${export_item.prodi}` :
                        export_item.type === "all-schedules" ? "Semua Jadwal" : "Data Mata Kuliah"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {export_item.format.toUpperCase()} • {export_item.size} • {new Date(export_item.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center">
                    {getStatusIcon(export_item.status)}
                    <span className="ml-1 capitalize">{export_item.status}</span>
                  </Badge>
                  {export_item.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
